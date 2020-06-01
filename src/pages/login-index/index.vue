<template lang="pug">
  view.background(v-bind:style="{background: backgroundUrl ,backgroundSize: 'cover'}")
    view.mark
    view.title(v-bind:style="{background: titleUrl ,backgroundSize: 'cover'}")
    view.button
      view.selected
        view(@click="phoneLogin") 注册/登陆
    view.details
      text 登录即同意
      text(@click="openWord()") 挚爱佳缘服务协议
      text 和
      text(@click="openWord(info)") 个人信息保护政策
</template>
<script>
import domains from '@/config/domains.js'
export default {
  name: 'login-index',
  data () {
    return {
      backgroundUrl: `url(${domains.oss}/background.png) no-repeat`,
      titleUrl: `url(${domains.oss}/title.png) no-repeat`
    }
  },
  methods: {
    phoneLogin () {
      uni.navigateTo({ url: '/pages/phone-login/index' })
    },
    openWord (Str) {
      if (Str === 'info') {
        uni.navigateTo({
          url: `/pages/web-view/index?url=http://zhiai.live/app-pages/protocols.html#/zhiaiServe`
        })
      } else {
        uni.navigateTo({
          url: `/pages/web-view/index?url=http://zhiai.live/app-pages/protocols.html#/protection`
        })
      }
    }
  },
  onShow: function () {
    const isLogin = uni.getStorageSync('uuid')
    // 登录了跳转
    if (isLogin) {
      uni.redirectTo({
        url: '/pages/boutique-recommend/index'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.background {
  height: 100vh;
  width: 100vw;
  position: relative;
  .mark{
    height:100%;
    width:100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
  }
  .title{
    height: 420rpx;
    width: 588rpx;
    background: #f60;
    z-index: 1;
    position: absolute;
    top: 199rpx;
    left: 126rpx;
  }
  .button {
    height: 72rpx;
    width:100%;
    position: absolute;
    bottom: 180rpx;
    .selected {
      display: flex;
      justify-content: center;
      view{
        line-height: 72rpx;
        width: 262rpx;
        background: linear-gradient(0deg,
        #daa873 0%,
        #fed094 100%);
        border-radius: 36rpx;
        color: #714210;
        font-size: 32rpx;
        text-align: center
        }
    }
  }
  .details {
    width: 100%;
    position: absolute;
    bottom: 80rpx;
    font-size: 20rpx;
    color: #ccc;
    text-align: center;
    text:nth-child(2n){
      color: #fbce93;
    }
  }
}
</style>
