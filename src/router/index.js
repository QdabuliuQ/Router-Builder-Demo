import Router from "vue-router";
import Vue from "vue";
import router from "./router";

// Router-Builder 使用
// 1、如果没有安装 Router-Builder 依赖，则终端执行 npm i router-builder -D
// 2、安装完毕后，终端执行 npx router-builder
// 最后文件会自动生成
// 约定式路由文件结构可以参考 src/views 目录
// 路由配置可以查看 VUE 文件内容

Vue.use(Router);
export default new Router({
  mode: "hash",
  routes: router,
});
