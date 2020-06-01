<template lang="pug">
  view.code
    view.input
      view.phone-number
        view +86
        input(v-model="phone", maxlength="13", placeholder ="请输入手机号")
      view.code-number
        view.title 输入密码
        input(:password="btnSwitch", v-model="password", placeholder ="请输入密码", maxlength="18")
        view.switch(:class="btnSwitch ? 'password' : 'text' ", @click="passwordSitch")
    view.hint(@click="goBack") 忘记密码请使用手机登录
    view.btn
      view(@click="goLogin") 登录
    view.details
      text 登录即同意
      text(@click="openWord()") 挚爱佳缘服务协议
      text 和
      text(@click="openWord(info)") 个人信息保护政策
</template>
<script>
import { sha256 } from 'js-sha256'
import { mapActions } from 'vuex'
export default {
  name: 'pass',
  data () {
    return {
      fromData: {
        phone: '',
        password: ''
      },
      password: '',
      btnSwitch: true,
      phone: '',
      phoneRule: /^1[3456789]\d{9}$/ // 电话正则
    }
  },
  watch: {
    phone (n, o) {
      this.phone = n.replace(/(^\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  methods: {
    ...mapActions({
      passwordLogin: 'User/passwordLogin'
    }),
    goBack () {
      this.$emit('codeLogin', 0)
    },
    passwordSitch () {
      this.btnSwitch = !this.btnSwitch
    },
    goLogin () {
      this.fromData.phone = this.phone.replace(/\s*/g, '')
      if (!this.phoneRule.test(this.fromData.phone)) {
        return this.Toast('请输入正确手机号')
      }
      if (!this.password) {
        return this.Toast('请输入密码')
      }
      this.fromData.password = sha256(this.password)
      this.passwordLogin(this.fromData)
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
    },

    Toast (str) {
      uni.showToast({
        title: str,
        duration: 2000,
        icon: 'none'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.code{
  width:100%;
  min-height: calc( 100vh - 160rpx);  background: #fff;
  border-radius: 24rpx;
  box-sizing: border-box;
  padding: 50rpx 70rpx;
  position: relative;
  .input{
    font-size: 32rpx;
    color: rgba(26, 34,59, .8);
    line-height: 120rpx;
    .phone-number{
      border-bottom: 1px solid rgba(26, 34, 59, .1);
      display: flex;
      view {
        text-align: center;
        width: 25%;
      }
      input{
        font-size: 32rpx;
        height: 120rpx;
        width: 75%
      }
    }
    .code-number{
      border-bottom: 1px solid rgba(26, 34, 59, .1);
      display: flex;
      align-items: center;
      .title {
        text-align: center;
        width: 30%;
        font-size: 28rpx;
        color: #263459;
        opacity: 0.8;
      }
      input{
        font-size: 32rpx;
        height: 120rpx;
        width: 70%;
      }
      .switch{
        height: 40rpx;
        width: 60rpx;
      }
      .password{
        background: url("https://zajy-public.oss-cn-beijing.aliyuncs.com/miniapp/ic_common_display_disable_style_2.png") no-repeat;
        background-size: contain;
      }
      .text{
        background: url("https://zajy-public.oss-cn-beijing.aliyuncs.com/miniapp/ic_common_display_enable_style_2.png") no-repeat;
        background-size: contain;
      }
    }
  }
  .hint{
    margin-top: 28rpx;
    font-size: 24rpx;
    color: rgba(26, 34, 59, .8);
  }
  .btn{
    margin-top: 410rpx;
    height: 75rpx;
    color: #714210;
    font-size: 32rpx;
    text-align: center;
    position: absolute;
    bottom: 25%;
    right: 0;
    left: 0;
    view{
      line-height: 72rpx;
      width: 550rpx;
      display: inline-block;
      background-image: linear-gradient(0deg,
      #daa873 0%,
      #fed094 100%);
      border-radius: 36px;
    }
  }
  .details {
    position: absolute;
    bottom: 30rpx;
    right: 0;
    left: 0;
    font-size: 20rpx;
    color: #ccc;
    text-align: center;
    text:nth-child(2n){
      color: #fbce93;
    }
  }
}
</style>
