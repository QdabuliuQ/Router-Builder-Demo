<router>
  import: {
    "@/utils/index": [
      "getType",
      {
        name: "getDate",
        default: true
      },
      {
        name: "format",
        default: true
      }
    ]
  },
  test: () => {}
</router>

<template>
  <div>PageCAB</div>
</template>

<script>
export default {};
</script>

<style></style>
