export default {
  path: "/D:\\code\\demo02\\src\\views\\PageA/PageAA",
  name: "PageAA",
  meta: { title: "PageAA title" },
  component: () =>
    import(
      /* webpackChunkName: 'PageAA' */ "@/views/D:\\code\\demo02\\src\\views\\PageA/PageAA/index.vue"
    ),
};
