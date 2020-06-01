<template lang="pug">
  view.container
    view.input-phone
      text.phone-btn +86
      view.virtual-input(@click="control()")
        view {{formatePhone}}
        view.cursor(v-if="isPhoneNumberFocus")
    view.verifi-code
      input.code(maxlength="6", v-model="rcode", type="number")
      view.code-btn(@click="sendCode", :class="isCodebtnActive ? 'active' : 'forbidden'") {{codebtnText}}
    view.page-btn
      pages-btn(:btnContent="btnContent", @click.native="saveInfo")
    view.show-input
      input.phone(maxlength="11", :adjust-position="false", v-model="displayPhoneNumber", type="number", :focus="isPhoneNumberFocus", @blur="phoneNumberBlur")
</template>
<script>
import PagesBtn from '../page-button'
import paths from '../../config/paths'
import fly from 'fly'
import { setStorage } from '@/utils/token'
import { mapActions } from 'vuex'
export default {
  components: {
    PagesBtn
  },
  data () {
    return {
      displayPhoneNumber: '',
      isCodeSending: false,
      second: 0,
      btnContent: '确认',
      codeId: '',
      receiveCode: '',
      rcode: '',
      accessToken: '',
      submitLock: false,
      timer: '',
      phoneReg: /^1[3456789]\d{9}$/,
      status: false,
      isPhoneNumberFocus: false
    }
  },
  computed: {
    inviteCode () {
      return ''
    },
    phoneNumber () {
      return this.displayPhoneNumber.replace(/[ /d]/g, '')
    },
    formatePhone () {
      const arr = this.displayPhoneNumber.split('')
      if (arr.length >= 3) {
        arr.splice(3, 0, ' ')
      }
      if (arr.length >= 9) {
        arr.splice(8, 0, ' ')
      }
      return arr.join('')
    },
    isCodebtnActive () {
      return this.displayPhoneNumber.length === 11 &&
        this.phoneReg.test(this.displayPhoneNumber) &&
        !this.isCodeSending
    },
    codebtnText () {
      return this.isCodeSending ? `${this.second}重新获取` : '获取验证码'
    }
  },
  watch: {
    phoneNumber (num, old) {
      if (num.length === 11) {
        this.status = true
      }
      if (this.phoneReg.test(num)) {
        this.changeBtn = false
      }
    }
  },
  methods: {
    ...mapActions({
      weixinPhone: 'User/weixinPhone'
    }),
    // 调用后台接口 给用户发送验证码
    requireCode () {
      fly.post(paths.requireVerificationCode, {
        codeType: '1',
        phone: this.phoneNumber
      }).then(data => {
        this.codeId = data.data.rsObject.codeId
        setStorage({ 'phone': this.phoneNumber })
      })
    },
    sendCode () {
      if (!this.status || this.isCodeSending) {
        return
      }
      if (this.phoneNumber.length !== 11) {
        return uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
      }
      if (!this.phoneReg.test(this.phoneNumber)) {
        return uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
      }
      // 发送验证码请求
      this.requireCode()
      this.isCodeSending = true
      this.second = 60
      this.timer = setInterval(() => {
        this.second--
        if (this.second <= 0) {
          this.isCodeSending = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    saveInfo () {
      if (!this.phoneNumber) {
        return uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
      }
      if (!this.phoneReg.test(this.phoneNumber)) {
        return uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
      }
      // 获取验证码但没输入
      if (!this.rcode) {
        return uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
      }

      // 将用户手机号 验证发送给后台
      const data = {
        phone: this.phoneNumber,
        accType: '1',
        code: this.rcode,
        codeId: this.codeId || '',
        isOneKey: '0',
        openid: uni.getStorageSync('openid')
      }
      this.weixinPhone(data)
    },
    nextPage () {
      uni.redirectTo({
        url: '/pages/improve-info/index'
      })
    },
    control () {
      this.isPhoneNumberFocus = true
    },
    phoneNumberBlur (e) {
      this.isPhoneNumberFocus = false
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
  .container {
    margin: -2rpx 64rpx 0 60rpx;
    .input-phone {
      width: 100%;
      color: #333;
      box-sizing: border-box;
      padding: 30rpx;
      border-bottom: 1rpx solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .phone-btn {
        padding-right: 30rpx;
        color: #666d83;
        border-right: 2rpx solid #e1e3e8;
        position: absolute;
        left: -2rpx;
        top: 31rpx;
      }
      .virtual-input {
        width: 628rpx;
        height: 66rpx;
        color: rgb(38,52,89);
        margin-left: 107rpx;
        display: flex;
        .cursor {
          width: 2rpx;
          height: 50rpx;
          background: #666d83;
          @keyframes blink {
            50% { opacity: 0; }
          }
          animation: blink 1s infinite step-start;
        }
      }
    }
    .verifi-code {
      width: 100%;
      color: #333;
      box-sizing: border-box;
      padding: 30rpx;
      border-bottom: 1rpx solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .code-btn {
        width: 202rpx;
        height: 56rpx;
        text-align: center;
        line-height: 56rpx;
        font-size: 20rpx;
        border-radius: 26rpx;
        background: #e2e2e2;
        &.active {
          color: rgb(113,66,16);
          background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
          &:active {
            color: #b27e41;
            background: linear-gradient(#ffd6a3 30%, #ffd6a3 60%, #ffd6a3 100%);
          }
        }
      }
    }
    .page-btn {
      margin-top: 410rpx;
    }
    .show-input {
      position: fixed;
      top: -100rpx;
      opacity: 0;
      color: transparent;
      z-index: -999;
    }
  }
</style>
