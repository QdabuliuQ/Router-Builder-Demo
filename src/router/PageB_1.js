export default {
  path: "/PageB-1",
  name: "PageB-1",
  component: () => import("@/views/PageB/index.vue"),
  children: [
    {
      path: "/PageB-1/PageBA",
      component: () => import("@/views/PageB/PageBA/index.vue"),
      children: [
        {
          path: "/PageB-1/PageBA/PageBAA",
          component: () => import("@/views/PageB/PageBA/PageBAA/index.vue"),
        },
      ],
    },
    {
      path: "/PageB-1/PageBB",
      component: () => import("@/views/PageB/PageBB/index.vue"),
    },
  ],
};
