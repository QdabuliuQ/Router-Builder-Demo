import PageAA from "./PageAA";
import PageB_1 from "./PageB_1";
import PageCA from "./PageCA";
import getDate, { getTime } from "@/utils/index";
export default [
  {
    path: "/PageA",
    name: "PageA",
    beforeEnter: function (to, from, next) {
      getTime();
      getDate();
      next();
    },
    component: () => import("@/views/PageA/index.vue"),
    children: [PageAA],
  },
  PageB_1,
  {
    path: "/PageB-2",
    name: "PageB-2",
    component: () => import("@/views/PageB/index.vue"),
    children: [
      {
        path: "/PageB-2/PageBA",
        component: () => import("@/views/PageB/PageBA/index.vue"),
        children: [
          {
            path: "/PageB-2/PageBA/PageBAA",
            component: () => import("@/views/PageB/PageBA/PageBAA/index.vue"),
          },
        ],
      },
      {
        path: "/PageB-2/PageBB",
        component: () => import("@/views/PageB/PageBB/index.vue"),
      },
    ],
  },
  {
    path: "/PageC",
    component: () => import("@/views/PageC/index.vue"),
    children: [
      PageCA,
      {
        path: "/PageC/PageCB",
        component: () => import("@/views/PageC/PageCB/index.vue"),
      },
      {
        path: "/PageC/PageCC",
        component: () => import("@/views/PageC/PageCC/index.vue"),
      },
    ],
  },
];
