<template lang="pug">
  view.pages-title {{title}}
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="scss">
  .pages-title {
    font-size: 24px;
    font-weight: bold;
    color: rgb(38,52,89);
    padding: 38px 0 34px 33px;
    box-sizing: border-box;
  }
</style>
