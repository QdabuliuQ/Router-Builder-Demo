import PageAA from "./PageAA";
import getDate, { getTime } from "@/utils/index";
export default {
  path: "/PageA",
  name: "PageA",
  beforeEnter: function () {
    getTime();
    getDate();
  },
  component: () => import("@/views/PageA/index.vue"),
  children: [PageAA],
};
