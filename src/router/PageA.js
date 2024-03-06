import PageAA from "./PageAA";
import getDate, { getTime } from "@/utils/index";
export default {
  path: "/PageA",
  name: "PageA",
  beforeEnter: function (to, from, next) {
    getTime();
    getDate();
    next();
  },
  component: () => import("@/views/PageA/index.vue"),
  children: [PageAA],
};
