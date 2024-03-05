const fs = require("fs");
const path = require("path");

// 读取配置文件
const customConfig = require(`${process.cwd()}\\router.config.js`);
const defaultConfig = {
  entry: "/src/views",
  output: "/src/router/index.js",
  importPrefix: "@/src/views",
  ignoreFolder: [],
  fileName: "index",
};
const mainConfig = {
  ...defaultConfig,
  ...customConfig,
};

// 判断是否正则表达式
const isRegExp = (v) => {
  return Object.prototype.toString.call(v) === "[object RegExp]";
};

const rootPath = process.cwd();

// 获取文件夹下面的 子文件夹和文件信息
const getFilesInfo = (filePath) => {
  let files = fs.readdirSync(filePath);
  const filesInfo = {};
  files.forEach(function (fileName) {
    const filedir = path.join(filePath, fileName); // 文件路径
    const stats = fs.statSync(filedir); // 获取文件信息
    filesInfo[fileName] = {
      type: stats.isFile() ? "file" : "dict",
      path: `\\${fileName}`,
      name: fileName,
      names: [
        ...filePath
          .replace(`${rootPath}\\src\\views`, "")
          .split("\\")
          .filter(Boolean),
        fileName,
      ],
      fullPath: filedir,
    };
  });
  return filesInfo;
};

// 获取文件 <router></router> 配置信息
const getRouterConfig = (content) => {
  const matches = [];
  let match;
  // 正则匹配 <router></router> 标签名称
  const reg = /<router>([\s\S]*?)<\/router>/g;
  // 可能匹配到多个 循环处理保存起来
  while ((match = reg.exec(content)) !== null) {
    matches.push(match[1]);
  }
  if (matches.length) {
    // 利用 eval 函数，将配置对象放入一个立即执行函数当中并且返回，就能快速将字符串转成一个对象
    const params = matches.map((match) =>
      eval(`(function(){return {${match}}})()`)
    );
    return params;
  }
  return null;
};

const readFileContent = async (filePath, dictInfo) => {
  try {
    const data = await fs.promises.readFile(
      `${filePath}\\${
        mainConfig.fileName === "<dictName>" ? dictInfo.name : "index"
      }.vue`,
      "utf-8"
    );
    const config = getRouterConfig(data);
    return config;
  } catch (err) {
    return null;
  }
};

// 将函数转为字符串保存
const conveyFunctionToString = (router) => {
  for (const key in router) {
    if (Object.hasOwnProperty.call(router, key)) {
      if (typeof router[key] === "function") {
        router[key] = `$$$${router[key].toString()}$$$`;
      } else if (router[key] && typeof router[key] === "object") {
        conveyFunctionToString(router[key]);
      }
    }
  }
  return router;
};

// 生成 import 导入语句
const getImportCode = (paths, name) => {
  return `$$$() => import('${mainConfig.importPrefix}/${
    paths.length ? paths.join("/") + "/" : ""
  }${mainConfig.fileName === "<dictName>" ? `${name}.vue` : "index"}.vue')$$$`;
};

// 生成路由配置对象
// routerConfig 多个路由信息
// defaultRouter 默认的路由信息
// dictInfo 当前文件夹信息
// dictList 子文件夹/子文件
const generateRouterConfig = async (
  routerConfig,
  defaultRouter,
  dictInfo,
  dictList
) => {
  let router = null;
  if (routerConfig) {
    router = [];
    for (const item of routerConfig) {
      conveyFunctionToString(item);
      router.push({
        ...defaultRouter,
        ...item,
        component: getImportCode(dictInfo.names, dictInfo.name),
      });
    }
  }
  // 遍历当前文件夹下的所有文件/子文件夹
  outer: for (const key in dictList) {
    // 遍历到原型上的属性 跳过
    if (!Object.hasOwnProperty.call(dictList, key)) continue;
    // 文件夹类型 递归遍历
    if (dictList[key].type === "dict") {
      for (const item of mainConfig.ignoreFolder) {
        if (typeof item === "string" || isRegExp(item)) {
          if (typeof item === "string" && item === dictList[key].name) {
            // 如果字符串 直接判断是否是要忽略的文件夹
            continue outer;
          }
          if (isRegExp(item) && item.test(dictList[key].name)) {
            // 如果是正则 直接判断是否是要忽略的文件夹
            continue outer;
          }
        }
      }
      // 继续递归调用查找，递归子文件夹
      const res = await readDictContent(dictList[key]);
      if (router) {
        for (const item of router) {
          if (!item.children) item.children = [];
          res && item.children.push(...res);
        }
      } else {
        router = res;
      }
    }
  }
  return router;
};

// 读取目录内容
async function readDictContent(dictInfo) {
  // 读取该文件夹下的子文件夹/文件
  const dictList = getFilesInfo(dictInfo.fullPath);
  if (JSON.stringify(dictList) === "{}") return null; // 空文件夹 直接返回 null
  if (
    dictList.hasOwnProperty(
      mainConfig.fileName === "<dictName>"
        ? `${dictInfo.name}.vue`
        : "index.vue"
    )
  ) {
    // 判断文件夹内部是否存在页面文件（index.vue / <dictName>.vue）
    const defaultRouter = {
      // 默认 router 配置
      path: dictInfo.names.length
        ? `/${dictInfo.names.join("/")}`
        : `/${dictInfo.name}`,
    };
    // 读取页面文件 查看是否存在 <router></router> 配置对象
    const customRouter = await readFileContent(dictInfo.fullPath);
    // 生成路由配置
    return generateRouterConfig(
      customRouter,
      defaultRouter,
      dictInfo,
      dictList
    );
  }
  return null;
}

const generateRouterTemplate = async (router) => {
  // 获取 packageJSON 文件 读取其 vue 的版本，生成不同的 router 文件
  const packageJSON = JSON.parse(
    await fs.promises.readFile(`${rootPath}\\package.json`, "utf-8")
  );
  if (packageJSON.dependencies) {
    // vue2 版本
    if (packageJSON.dependencies.vue.replace("^", "").split(".")[0] === "2") {
      return `
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  routes: ${router}
})
        `;
    } else {
      // vue3 版本
      return `
import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
	routes: ${router}
})

export default router
        `;
    }
  }

  const routerContent = `
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  routes: ${router}
})
  `;
  return routerContent;
};

// 生成 router 文件
const generateRouterFile = async (config) => {
  // 解析输出路径
  const paths = mainConfig.output.split("/").filter((item) => Boolean(item));
  const fileName = paths.pop(); // 先保存文件名称
  let fullPath = rootPath;
  for (const p of paths) {
    // 遍历路径
    fullPath += `//${p}`;
    try {
      // 判断是否存在文件夹
      await fs.promises.access(fullPath);
    } catch (err) {
      // 不存在则创建文件夹
      await fs.promises.mkdir(fullPath);
    }
  }
  // 通过 writeFile 方法将最终结果写入到对应路径的文件当中
  fs.promises.writeFile(
    `${fullPath}//${fileName}`,
    generateRouterTemplate(config)
  );
};

// 入口文件路径
const entryPath = mainConfig.entry.split("/").filter(Boolean).join("\\");
// 判断入口文件夹是否存在
if (fs.existsSync(`${rootPath}\\${entryPath}`)) {
  (async function () {
    const dictList = getFilesInfo(`${process.cwd()}\\${entryPath}`); // 获取path目录下的文件内容
    const router = []; // router 对象
    for (const key in dictList) {
      // 遍历子文件夹
      if (dictList.hasOwnProperty(key)) {
        if (dictList[key].type === "dict") {
          // 判断是否是文件夹类型
          const res = await readDictContent(dictList[key], []); // 递归搜索
          if (res) {
            // 将递归的结果存入 router 数组
            router.push(...res);
          }
        }
      }
    }
    // 将 router 内容写入到文件当中
    generateRouterFile(
      // 转为json 并且移除函数标识符
      JSON.stringify(router).replace(/"\$\$\$|\$\$\$"|\\r|\\n/g, "")
    );
    console.log("router file generation successful!");
  })();
} else {
  console.log("no exist");
}
