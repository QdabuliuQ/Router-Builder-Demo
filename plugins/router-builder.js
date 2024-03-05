const defaultConfig = {
  entry: "/src/views",
  output: "/src/router/index.js",
  importPrefix: "@/src/views",
  ignoreFolder: [],
  fileName: "index",
};

export default function RouterBuilder(config) {
  const currentConfig = {
    ...defaultConfig,
    ...config,
  };
  const files = require.context(`@/views/`, true, /\.vue$/);
  const components = {};

  // 遍历files对象，构建components键值
  files.keys().forEach((key) => {
    components[key.replace(/(\.\/|\.vue)/g, "")] = files(key);
  });

  console.log(components);
}
