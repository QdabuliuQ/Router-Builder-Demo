import defaultIndexMethod, { index, abc as _abc } from "demo";
export default {
  path: "/D:\\code\\demo02\\src\\views\\PageC\\PageCA/PageCAA",
  beforeEnter: function () {
    index();
    defaultIndexMethod();
  },
  component: () =>
    import(
      "@/views/D:\\code\\demo02\\src\\views\\PageC\\PageCA/PageCAA/index.vue"
    ),
};
