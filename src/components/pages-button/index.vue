<template lang="pug">
  view.pages-button {{content}}
</template>
<script>
export default {
  props: {
    content: String
  }
}
</script>
<style lang="scss">
  .pages-button {
    width: 406rpx;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    background: #e6e7eb;
    border-radius: 36px;
    color: #714210;
    z-index: 10;
  }
</style>
