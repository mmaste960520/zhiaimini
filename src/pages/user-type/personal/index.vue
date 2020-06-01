<template lang="pug">
  view.group.x-background
    view.item
       pages-title.title(:title="PageTitle")
       phone-verifi
</template>
<script>
import PagesTitle from '@/components/page-title/index'
import PhoneVerifi from '@/components/phone-verification-code/index'
export default {
  components: {
    PagesTitle,
    PhoneVerifi
  },
  data () {
    return {
      PageTitle: '请输入手机号码'
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
    padding: 1rpx 31rpx 46rpx 33rpx;
    .item {
      height: 96vh;
      padding: 6rpx 0 0 0;
      border-radius: 24rpx;
      background: #fcfcfd;
    }
  }
</style>
