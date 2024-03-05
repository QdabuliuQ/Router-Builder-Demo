<router>
  module: "PageCAA",
  import: {
    "demo": [
      "index",
      {
        name: "abc",
        alias: "_abc"
      },
      {
        name: "defaultIndexMethod",
        default: true
      }
    ]
  },
  beforeEnter: function() {
    index()
    defaultIndexMethod()
  }
</router>

<template>
  <div>PageCAA</div>
</template>

<script>
export default {};
</script>

<style></style>
