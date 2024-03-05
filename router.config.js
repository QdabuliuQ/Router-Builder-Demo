module.exports = {
  entry: "/src/views", // 读取文件路径入口

  output: "/src/router/router.js", // 路由文件输出路径

  importPrefix: "@/views", // 组件导入前缀

  // 忽略的文件夹 该文件夹以下的内容都不会参与扫描
  // 参数类型可以是 字符串 或者 正则
  // 命中的文件夹不会被参与生成路由 也会包括其子文件夹
  // ignoreFolder: [/ma.+/],

  // 文件夹下的文件名称，通常是页面文件
  fileName: "index", // 文件名称
};