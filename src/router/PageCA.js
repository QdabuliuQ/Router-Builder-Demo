import PageCAA from "./PageCAA";
import format, { getType } from "@/utils/index";
export default {
  path: "/PageC/PageCA",
  name: "PageCA",
  component: () => import("@/views/PageC/PageCA/index.vue"),
  children: [
    PageCAA,
    {
      path: "/PageC/PageCA/PageCAB",
      test: function () {},
      component: () => import("@/views/PageC/PageCA/PageCAB/index.vue"),
    },
  ],
};
