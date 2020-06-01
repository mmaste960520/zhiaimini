<template lang="pug">
  view.group.x-background
    view.container
      view(v-if="showSelect")
        pages-title(:title="PageTitle")
        invite-code.invite-code-input()
      view(v-else)
        pages-title(:title="Pagephone")
        phone-verifi()
</template>
<script>
import PagesTitle from '@/components/page-title/index'
import InviteCode from '@/components/invite-code/index'
import PhoneVerifi from '@/components/phone-verification-code/index'
export default {
  components: {
    PagesTitle,
    InviteCode,
    PhoneVerifi
  },
  data () {
    return {
      PageTitle: '请输入集团邀请码',
      Pagephone: '请输入手机号码',
      btnContent: '确认',
      showSelect: true
    }
  },
  created () {
  },
  methods: {
    showChange () {
      this.showSelect = false
    }
  },
  onShareAppMessage: function () {
    return {
      title: '关于我们',
      path: '/pages/count-down/index',
      success: (res) => {

      },
      fail: function (res) {
      }
    }
  }
}
</script>
<style lang="scss">
.group {
  height: 100vh;
  box-sizing: border-box;
  padding: 1rpx 31rpx 47rpx 33rpx;
  .container {
    height: 96vh;
    padding: 2rpx 0 0 0;
    box-sizing: border-box;
    border-radius: 24rpx;
    background: #fcfcfd;
    .btn {
      margin: 582rpx auto 178rpx;
      width: 262rpx;
      height: 72rpx;
      font-size: 32rpx;
      color: rgb(113,66,16);
      text-align: center;
      line-height: 72rpx;
      border-radius: 36rpx;
      background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
    }
  }
}
</style>
