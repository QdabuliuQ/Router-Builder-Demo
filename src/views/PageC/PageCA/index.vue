<router>
  name: "PageCA",
  module: "PageCA",
  import: {
    "@/utils/index": [
      "getType",
      {
        name: "getDate",
        default: true
      },
    ]
  },
</router>

<template>
  <div>
    <div>PageCA</div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
