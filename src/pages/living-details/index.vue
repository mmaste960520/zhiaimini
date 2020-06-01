<template lang="pug">
  view.living-container.x-background
    //- view.living-details
    //-   view.scroll
    //-     view.living-timer 开播时间：{{startLivingTime}}
    //-     view.active-banner
    //-       image(:src="livingDetials.livingbanner")
    //-     view.active-sumarry
    //-       view.active-info.active-info {{livingDetials.activeIntroI}}
    //-       view.active-info.active-info {{livingDetials.activeIntroII}}
    //-       view.active-info.active-info {{livingDetials.activeIntroIII}}
    //-     view.last-relook(@click="toLastOrNext()") 上期回顾
    //-     view.next-forcast(@click="toLastOrNext()") 下期预告
    //-     view.finally-explain-authority
    //-       text.dot
    //-       text 最终解释权归挚爱家园所有
    //-   view.fixed
    //-     bottom-button.bottom-button(buttonContent="订阅")
    //-   view.mask
    view.living-details
      view.scroll
        view.living-timer 开播时间：{{startLivingTime}}
        view.active-banner
          image(:src="livingDetials.liveH5Url")
        view.active-sumarry
          view.active-info.active-info {{livingDetials.activeIntroI}}
          view.active-info.active-info {{livingDetials.activeIntroII}}
          view.active-info.active-info {{livingDetials.activeIntroIII}}
        view.last-relook(@click="toLastOrNext()") 上期回顾
        view.next-forcast(@click="toLastOrNext()") 下期预告
        view.finally-explain-authority
          text.dot
          text 最终解释权归挚爱家园所有
      view.fixed
        bottom-button.bottom-button(buttonContent="订阅")
      view.mask
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      livingDetials: Object,
      startLivingTime: ''
    }
  },
  onLoad (options) {
    this.livingDetials = JSON.parse(decodeURIComponent(options.item))
    this.startLivingTime = this.timeFormate(this.livingDetials.startTime)
  },
  methods: {
    toLastOrNext () {
      uni.navigateTo({
        url: '/pages/last-relook-next-forcast/index'
      })
    },
    timeFormate (time) {
      var date = new Date(time)
      var len = time.toString().length
      // 时间戳不足13位则在后面加零
      if (len < 13) {
        var sub = 13 - len
        sub = Math.pow(10, sub)
        date = new Date(time * sub)
      }
      var y = date.getFullYear() + '.'
      var M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M) + '.'
      var d = date.getDate()
      d = (d < 10 ? '0' + d : d) + ' '
      var h = date.getHours()
      h = (h < 10 ? '0' + h : h) + ':'
      var m = date.getMinutes()
      m = (m < 10 ? '0' + m : m) + ' '
      return y + M + d + h + m
    }
  }
}
</script>
<style lang="scss" scoped>
.living-container {
  padding: 0rpx 32rpx 32rpx;
  position: relative;
  .living-details {
    width: 92vw;
    padding: 32rpx 0 0;
    margin: 0 auto;
    position: relative;
    border-radius: 20rpx;
    background: #ffffff;
    .scroll::-webkit-scrollbar {
      display: none;
    }
    .scroll {
      height: 1027rpx;
      overflow: auto;
      position: relative;
      .living-timer {
        width: 497rpx;
        height: 31rpx;
        font-size: 32rpx;
        font-family: PingFang-SC-Medium;
        line-height: 32rpx;
        color: #181b22;
        margin: 0 0 36rpx 46rpx;
      }
      .active-banner {
        width: 606rpx;
        height: 240rpx;
        border-radius: 16rpx;
        margin: 0 auto;
        image {
          width: 100%;
          height: 100%;
          border-radius: 16rpx;
        }
      }
      .active-sumarry {
        margin: 38rpx auto 0;
        .active-info {
          width: 598rpx;
          color: #181b22;
          font-size: 28rpx;
          font-family: PingFang-SC-Medium;
          line-height: 48rpx;
          text-indent: 28rpx;
          letter-spacing: 2rpx;
          margin: 0 auto 10rpx;
        }
      }
      .last-relook,
      .next-forcast {
        color: #e5b584;
        font-size: 32rpx;
      }
      .last-relook {
        margin: 60rpx 0 40rpx 76rpx;
      }
      .next-forcast {
        margin: 0 0 0 76rpx;
      }
      .finally-explain-authority {
        height: 23rpx;
        line-height: 23rpx;
        font-size: 28rpx;
        color: #605f64;
        margin: 56rpx 0 42rpx 0;
        text {
          display: inline-block;
        }
        .dot {
          width: 18rpx;
          height: 18rpx;
          border-radius: 50%;
          background: #605f64;
          margin: 0 28rpx 0 76rpx;
        }
      }
    }
    .fixed {
      width: 92vw;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      position: fixed;
      // left: 4vw;
      bottom: 50rpx;
      background: #FFF;
    }
    .mask {
      position: fixed;
      width: 92vw;
      // left: 4vw;
      bottom: 0;
      height: 40vh;
      background-color: #FFF;
      z-index: -1;
    }
  }
}
</style>
