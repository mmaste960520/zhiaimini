<template lang="pug">
  view.last-relook-next-forcast
    view.scroll
      view.living-timer 开播时间：{{livingDetials.estimateLivingTime}}
      view.active-banner
        image(:src="livingDetials.livingbanner")
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
</template>
<script>
import BottomButton from '@/components/vip-button'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    BottomButton
  },
  data () {
    return {
      livingDetials: {
        id: 2,
        headerImg: '',
        backgroundImg: oss + '/background.jpg',
        subTitle: '如何维系婚戏',
        title: '中国婚姻研究院副院长莅临讲座中国婚姻研究院副院长莅临讲座',
        mode: 'info',
        level: '',
        estimateLivingTime: '2019.01.05 14:30',
        livingbanner: oss + '/background.jpg',
        activeIntroI: '为营造团结协助、和谐发展的团队精神，丰富集团总部员工文体娱乐活动，展现昂扬奋进的精神风貌，10月13日集团机关工会组织总部员工开展户外登山活动，集团领导、总部员工46人参加活动。',
        activeIntroII: '本次登山活动，集团总部员工分3组进行。活动中各组员工都争前恐后，奋勇登山。活动当日参加活动的全体人员汇聚在帽儿山森林公园门口，9:46分从山门出发，沿山路而上，在登山过程中大家互相鼓励、互相帮助，顺利登上了最顶峰。',
        activeIntroIII: '通过这样形式新颖的活动，不仅使大家的身心在繁忙的工作之余得到缓冲和休息，同时也展示了集团机关职工团结协作、勇于攀登、不断追求新目标的良好风貌，进一步增强了集团的凝聚力。'
      }
    }
  },
  methods: {
    toLastOrNext () {
      uni.navigateTo({
        url: '/pages/last-relook-next-forcast/index'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .last-relook-next-forcast {
    padding: 32rpx 0 0;
    margin: 0 auto;
    position: relative;
    .scroll::-webkit-scrollbar {
      display: none;
    }
    .scroll {
      height: 1027rpx;
      overflow: auto;
      background: #f7f7f9;
      position: relative;
      .living-timer {
        width: 497rpx;
        height: 31rpx;
        font-size: 32rpx;
        font-family: PingFang-SC-Medium;
        line-height: 32rpx;
        color: #181b22;
        margin: 0 0 36rpx 78rpx;
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
        font-family: PingFang-SC-Medium;
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
      position: absolute;
      left: 146rpx;
      bottom: -127rpx;
      background: #ffffff;
      z-index: 10000;
      color: #181b22;
    }
  }
</style>
