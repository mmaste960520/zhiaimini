<template lang="pug">
  view.user-service-item(@click="onClick()")
    view.icon
      img(:src="icon")
    view.words-tip {{text}}
</template>
<script>
export default {
  props: {
    icon: String,
    text: String,
    path: String
  },
  methods: {
    onClick () {
      if (this.path) {
        uni.navigateTo({
          url: this.path
        })
      }
      if (this.path === '') {
        uni.showToast({
          title: `请拨打客服电话4001-1314-99进行注销`,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .user-service-item {
    height: 97rpx;
    text-align: center;
    .icon {
        img {
          width: 50rpx;
          height: 56rpx;
        }
    }
    .words-tip {
      font-size: 24rpx;
    }
  }
</style>
