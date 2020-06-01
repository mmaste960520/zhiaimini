<template lang="pug">
  view.invite-code
    page-title(:PageTitle="PageTitle")
    view.receive-code
      input.fill-code(v-model="code")
    pages-btn.sure-btn(btnContent="确认", @click.native="inviteCode")
</template>
<script>
import fly from 'fly'
import PageTitle from '../page-title'
import PagesBtn from '@/components/page-button/index'
export default {
  components: {
    PageTitle,
    PagesBtn
  },
  data () {
    return {
      code: '',
      PageTitle: '请输入集团邀请码'
    }
  },
  methods: {
    inviteCode () {
      if (this.code === '') {
        uni.showToast({
          title: '请输入邀请码',
          icon: 'none'
        })
      }
      if (this.code !== '') {
        fly.post('/acc/login/inviteCodeVerify', {
          inviteCode: this.code
        }).then(data => {
          this.$store.commit('updateUserInfo', {
            inviteCode: this.code
          })
          this.nextPage()
        })
      }
    },
    nextPage () {
      uni.redirectTo({
        url: '/pages/user-type/personal/index'
      })
    }
  }
}
</script>
<style lang="scss">
  .invite-code {
    .receive-code {
      margin: 0 64rpx 680rpx 64rpx;
      .fill-code {
        box-sizing: border-box;
        width: 560rpx;
        height: 110rpx;
        padding: 0 44rpx;
        margin-top: -88rpx;
        color: #666d83;
        font-size: 32rpx;
        border-radius: 14rpx;
        border: 2rpx solid #e1e3e8;
      }
    }
  }
</style>
