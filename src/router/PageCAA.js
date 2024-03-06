import defaultIndexMethod, { index, abc as _abc } from "@/utils/demo";
export default {
  path: "/PageC/PageCA/PageCAA",
  beforeEnter: function (to, from, next) {
    index();
    defaultIndexMethod();

    next();
  },
  component: () => import("@/views/PageC/PageCA/PageCAA/index.vue"),
};
