<template lang="pug">
  view.count-down(:style="{backgroundImage:`url(${BackgroundImage})`,backgroundSize: 'cover'}")
    view.timer 上线倒计时
    view.conut-day(v-if="dayShow")
      view.day-num {{countDay}}
        text.day 天
    view.user-select(v-if="state === 'register'")
      navigator.group(url="../user-type/group/index" open-type="navigate")
        btn-pages(:btnContent="group")
      navigator.personal(url='/pages/user-type/personal/index')
        btn-pages(:btnContent="personal")
    view.about(v-if="state === 'register'")
      navigator(url='/pages/about/index')
        text 关于我们
    view.registered(v-if="state === 'finish'") 注册成功
</template>
<script>
import fly from 'fly'
import path from '../../config/paths'
import BtnPages from '../../components/page-button'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    BtnPages
  },
  data () {
    return {
      group: '集团用户',
      personal: '个人用户',
      about: '关于我们',
      countDay: '',
      BackgroundImage: oss + '/count.png',
      state: 'register',
      dayShow: true
    }
  },
  // 请求后台获取上线时倒计时
  onShow () {
    this.fetchCountdownDate()
    this.initStatus()
  },
  methods: {
    initStatus () {
      const token = uni.getStorageSync('token')
      const result = uni.getStorageSync('result')
      if (token && result === '0') {
        this.state = 'finish'
        uni.setNavigationBarTitle({
          title: ''
        })
      }
    },
    fetchCountdownDate () {
      fly.post(path.countDown).then(data => {
        if (data.data.rsCode === '200') {
          this.countDay = Number(data.data.rsObject.countdownDate)
        } else if (data.data.rsCode === '503') {
          uni.showToast({
            title: '服务器繁忙',
            icon: 'none'
          })
        } else {
          this.dayShow = false
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '关于我们',
      path: '/pages/count-down/index',
      success: (res) => {
      }
    }
  }
}
</script>
<style lang="scss">
  .count-down {
    margin: 0 auto;
    padding-top: 44rpx;
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: hidden;
    .timer {
      font-size: 36rpx;
      text-align: center;
      color: #ffffff;;
    }
    .conut-day {
    text-align: center;
    margin-top: 200rpx;
      .day-num {
        font-size: 400rpx;
        color: #ffffff;
      }
      .day {
        font-size: 48rpx;
        color: #ffffff;
      }
     }
     .user-select {
       display: flex;
       justify-content: space-around;
       padding: 0 92rpx;
       position: absolute;
       bottom: 185rpx;
       left: 10rpx;
      .group {
        margin-right: 41rpx;
      }
     }
     .about {
       position: absolute;
       left: 328rpx;
       bottom: 78rpx;
       font-size: 28rpx;
       color: #fcce93;
       border-bottom: 1rpx solid #fcce93;
     }
    .registered {
      width: 262rpx;
      height: 72rpx;
      position: absolute;
      top: 911rpx;
      left: 244rpx;
      color: #ffffff;
      font-size: 40rpx;
      text-align: center;
    }
  }
</style>
