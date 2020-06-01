<template lang="pug">
  view.active-details.x-background
    view 活动详情
</template>
<script>
export default {
  data () {
    return {
    }
  },
  onLoad (options) {
    console.log(JSON.parse(decodeURIComponent(options.item)))
  }
}
</script>
<style lang="scss">
  .active-details {
    padding: 0rpx 32rpx 32rpx;
    position: relative;
  }
</style>
