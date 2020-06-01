<template lang="pug">
  view.code
    view.input
      view.phone-number
        view +86
        input(v-model="phone", maxlength="13", placeholder ="请输入手机号")
      view.code-number
        view.istrue-background(v-show="show", @click="securityCode") 获取验证码
        view(v-show="!show") {{count}} s后重新获取
        input(type="text", v-model="fromData.code", placeholder ="请输入验证码")
    view.btn
      view(@click="phoneLogin") 登录
    view.weixin
      image(:src="imgUrl+'/ic_register_wechat_passageway@2x.png'", @click="weixinLogin")
    view.details
      text 登录即同意
      text(@click="openWord()") 挚爱佳缘服务协议
      text 和
      text(@click="openWord(info)") 个人信息保护政策
</template>
<script>
import domains from '@/config/domains.js'
import { mapActions } from 'vuex'
import { getOpenID } from '@/utils/get-openid'
export default {
  name: 'code',
  data () {
    return {
      imgUrl: domains.oss,
      phoneRule: /^1[3456789]\d{9}$/, // 电话正则
      fromData: {
        phone: '',
        code: '',
        codeId: '',
        isOneKey: '0'
      },
      count: '', // 倒计时时间
      show: true, // 发起请求按钮的状态
      phone: '',
      thirdAuth: {}
    }
  },
  watch: {
    phone (n, o) {
      this.phone = n.replace(/(^\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  methods: {
    ...mapActions({
      phoneLoginx: 'User/phoneLoginx',
      getCode: 'User/getCode',
      weixinLoginx: 'User/weixinLoginx'
    }),
    // 获取手机验证码验证手机号
    securityCode () {
      this.fromData.phone = this.phone.replace(/\s*/g, '')
      if (!this.phoneRule.test(this.fromData.phone)) {
        return this.Toast('请输入正确手机号')
      }
      this.getCodeTime()
    },
    // 获取验证码倒计时
    getCodeTime () {
      const TIME_COUNT = 59
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      // 拿vuex中方法返回的code
      this.getCode(this.fromData.phone).then(res => {
        this.fromData.codeId = res
      })
    },
    // 微信验证登录
    async weixinLogin () {
      uni.showLoading({
        title: '加载中'
      })
      const data = await getOpenID()
      uni.hideLoading()
      this.weixinLoginx(data)
    },

    // 手机号验证码登陆
    phoneLogin () {
      this.fromData.phone = this.phone.replace(/\s*/g, '')
      if (!this.phoneRule.test(this.fromData.phone)) {
        return this.Toast('请输入正确手机号')
      }
      if (!this.fromData.codeId) {
        return this.Toast('请输入验证码')
      }
      this.phoneLoginx(this.fromData)
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
    // 弹框
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
  min-height: calc( 100vh - 160rpx);
  background: #fff;
  border-radius: 24rpx;
  box-sizing: border-box;
  padding: 50rpx 70rpx;
  position: relative;
  .input{
    font-size: 32rpx;
    color: rgba(26, 34,59, .8);
    .phone-number{
      border-bottom: 1px solid rgba(26, 34, 59, .1);
      display: flex;
      line-height: 120rpx;
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
      position: relative;
      view {
        text-align: center;
        min-width: 141rpx;
        padding: 5rpx;
        line-height: 44rpx;
        background: rgba(0, 0, 0, .1);
        border-radius: 24rpx;
        font-size: 20rpx;
        position: absolute;
        right: 30rpx;
        top: 35rpx;
      }
      input{
        height: 120rpx;
        width: 60%;
        padding-left: 20rpx;
        font-size: 32rpx;
      }
      .istrue-background{
        background: linear-gradient(0deg,
        #daa873 0%,
        #fed094 100%);
      }
    }
  }
  .weixin{
    height: 76rpx;
    position: absolute;
    bottom: 10%;
    right: 0;
    left: 0;
    text-align: center;
    image{
      height: 76rpx;
      width: 76rpx;
      border-radius: 50%;
    }
  }
  .btn{
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
