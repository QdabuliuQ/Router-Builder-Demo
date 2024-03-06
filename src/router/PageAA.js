export default {
  path: "/PageA/PageAA",
  name: "PageAA",
  meta: { title: "PageAA title" },
  component: () =>
    import(/* webpackChunkName: 'PageAA' */ "@/views/PageA/PageAA/index.vue"),
};
