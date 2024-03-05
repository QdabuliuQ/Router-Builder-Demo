export default {
  path: "PageB-1",
  name: "PageB-1",
  component: () => import("@/views/PageB/index.vue"),
  children: [
    {
      path: "/D:\\code\\demo02\\src\\views\\PageB/PageBA",
      component: () =>
        import("@/views/D:\\code\\demo02\\src\\views\\PageB/PageBA/index.vue"),
    },
  ],
};
