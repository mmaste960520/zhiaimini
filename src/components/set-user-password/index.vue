<template lang="pug">
  view.user-password
    view.input-phone
      text.phone-btn +86
      input.phone(maxlength="13", type="number", :value="userPhoneNumber",disabled="disabled")
    view.set-password
      text.tip 输入密码
      input.fist-input(placeholder="请输入6~18位密码", @blur="inputPassword", :password="changeSelect", v-model="password.first", maxlength="18")
      image(:src="showHideEye.first", @click="changeShow", v-if="changeBimg")
      image(:src="showHideEye.again", @click="changeShow", v-else)
    view.sure-password
      text.tip 确认密码
      input.again-input(@blur="againPassword", :password="changeSelectAgain", v-model="password.again", maxlength="18")
      image(:src="showHideEye.first", @click="changeShowAgain", v-if="changeBimgAgain")
      image(:src="showHideEye.again", @click="changeShowAgain", v-else)
</template>
<script>
import domains from '@/config/domains'
const { oss } = domains
export default {
  data () {
    return {
      password: {
        first: '',
        again: ''
      },
      firstWord: '',
      againWord: '',
      forbidden: false,
      changeSelect: true,
      changeSelectAgain: true,
      changeBimg: true,
      changeBimgAgain: true,
      // again是闭眼 first是睁眼
      showHideEye: {
        first: oss + '/again.png',
        again: oss + '/first.png'
      }
    }
  },
  computed: {
    userPhoneNumber () {
      const phone = uni.getStorageSync('phone')
      const arr = phone.replace(/(^\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
      return arr
    }
  },
  watch: {
    password: {
      handler (data) {
        this.$emit('change', data)
      },
      deep: true
    }
  },
  methods: {
    inputPassword (e) {
      this.firstWord = e.detail.value
      // this.firstWord = this.password.first
      // 密码为6-18位，只能大小写字母，数字，不可使用特殊符号
      const reg = /^[a-zA-Z0-9]{6,18}$/
      if (!reg.test(this.firstWord)) {
        uni.showToast({
          title: '请输入6-18位非特殊字符的密码',
          icon: 'none'
        })
      }
    },
    againPassword (e) {
      this.againWord = e.detail.value
      this.finish()
    },
    finish (e) {
      // 判断是否两次都输入
      if (!this.firstWord || !this.againWord) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      }
    },
    changeShow () {
      this.changeSelect = !this.changeSelect
      this.changeBimg = !this.changeBimg
    },
    changeShowAgain () {
      this.changeSelectAgain = !this.changeSelectAgain
      this.changeBimgAgain = !this.changeBimgAgain
    }
  }
}
</script>
<style lang="scss">
  .user-password {
    margin: 7rpx 64rpx 248rpx 60rpx;
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
        left: 31rpx;
        top: 31rpx;
      }
      .phone {
        color: #263459;
        // color: #666d83;
        margin-left: 107rpx;
        padding-left: 30rpx;
      }
    }
    .sure-password,
    .set-password {
      width: 100%;
      color: #333;
      box-sizing: border-box;
      padding: 30rpx 30rpx 30rpx 10rpx;
      border-bottom: 1rpx solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      line-height: 26rpx;
      .tip {
        width: 150rpx;
        height: 26rpx;
        color: #676e84;
        font-size: 28rpx;
      }
      image {
        width: 38px;
        height: 38px;
      }
      input {
        padding-left: 20rpx;
        font-size: 28rpx;
      }
    }
    .sure-btn {
      width: 262rpx;
      height: 72rpx;
      font-size: 32rpx;
      text-align: center;
      line-height: 72rpx;
      color: #714210;
      margin: 108rpx auto 0;
      border-radius: 36rpx;
      background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
    }
  }
</style>
