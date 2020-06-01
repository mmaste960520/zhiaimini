<template lang="pug">
  view.unlogin
    view.left
      view.login-register(@click="toLogin") 登录/注册
      view.tip 登录后即可体验更多服务
    view.right
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toLogin () {
      uni.navigateTo({
        url: '/pages/phone-login/index'
      })
    }
  }
}
</script>
<style lang="scss">
  .unlogin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 15rpx;
    .left {
      .login-register {
        font-size: 40rpx;
        color: #101825;
      }
      .tip {
        font-size: 24rpx;
        color: #5b5c60;
        margin: 30rpx 0 0 0;
      }
    }
    .right {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 34rpx;
      text-align: center;
      line-height: 160rpx;
      font-size: 24rpx;
      color: #626366;
      border-radius: 80rpx;
      background: url($oss-path + '/ic_common_default_head_agender@2x.png') no-repeat center;
      background-size: cover;
    }
  }
</style>
