import PageA from "./PageA";
import PageB_1 from "./PageB_1";
import PageCA from "./PageCA";

export default [
  PageA,
  PageB_1,
  {
    path: "PageB-2",
    name: "PageB-2",
    component: () => import("@/views/PageB/index.vue"),
    children: [
      {
        path: "/D:\\code\\demo02\\src\\views\\PageB/PageBA",
        component: () =>
          import(
            "@/views/D:\\code\\demo02\\src\\views\\PageB/PageBA/index.vue"
          ),
      },
    ],
  },
  {
    path: "/PageC",
    component: () => import("@/views/PageC/index.vue"),
    children: [
      PageCA,
      {
        path: "/D:\\code\\demo02\\src\\views\\PageC/PageCB",
        component: () =>
          import(
            "@/views/D:\\code\\demo02\\src\\views\\PageC/PageCB/index.vue"
          ),
      },
      {
        path: "/D:\\code\\demo02\\src\\views\\PageC/PageCC",
        component: () =>
          import(
            "@/views/D:\\code\\demo02\\src\\views\\PageC/PageCC/index.vue"
          ),
      },
    ],
  },
];
