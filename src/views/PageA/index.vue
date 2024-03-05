<router>
  module: "PageA",
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
  beforeEnter: function() {
    getTime()
    getDate()
  }
</router>

<template>
  <div>PageA</div>
</template>

<script>
export default {};
</script>

<style></style>
