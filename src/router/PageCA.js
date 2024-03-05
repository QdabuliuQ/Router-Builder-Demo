import PageCAA from "./PageCAA";
import format, { getType } from "@/utils/index";
export default {
  path: "/D:\\code\\demo02\\src\\views\\PageC/PageCA",
  name: "PageCA",
  component: () =>
    import("@/views/D:\\code\\demo02\\src\\views\\PageC/PageCA/index.vue"),
  children: [
    PageCAA,
    {
      path: "/D:\\code\\demo02\\src\\views\\PageC\\PageCA/PageCAB",
      test: function () {},
      component: () =>
        import(
          "@/views/D:\\code\\demo02\\src\\views\\PageC\\PageCA/PageCAB/index.vue"
        ),
    },
  ],
};
