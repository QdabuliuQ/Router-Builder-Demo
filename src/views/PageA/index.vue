<router>
  name: "PageA",
  import: {
    "@/utils/index": [
      "getTime",
      {
        name: "getDate",
        default: true
      }
    ]
  },
  beforeEnter: function(to, from , next) {
    getTime()
    getDate()
    next()
  }
</router>

<template>
  <div>
    <div>PageA</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PageA",
  mounted() {
    console.log("挂在");
  },
};
</script>

<style></style>
