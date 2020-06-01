<template lang="pug">
  view.open-vip-details.x-background
    view.container
      view.scroll
        view.vip-item(v-for="(item, index) in info", :key="index")
          view.top
            view.icon
              image(:src="item.icon")
            view.vip-title {{item.title}}
          view.vip-tip 特权介绍
          view.summary-intro {{item.content}}
          view.photo
            image(:src='item.img')
      view.mask
</template>
<script>
import domains from '@/config/domains'
const { oss } = domains
export default {
  data () {
    return {
      info: [
        {
          title: '解锁消息发送',
          icon: oss + '/vip1.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        },
        {
          title: '免费畅享直播',
          icon: oss + '/vip2.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        },
        {
          title: '专属会员表示',
          icon: oss + '/vip3.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        },
        {
          title: '更多头像展示',
          icon: oss + '/vip4.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        },
        {
          title: '更多删选条件',
          icon: oss + '/vip5.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        },
        {
          title: '照片批量上传',
          icon: oss + '/vip6.png',
          tip: '特权介绍',
          content: '开通家长帮VIP后，在条件允许的情况下，您在家长帮社区上的昵称会变身成红色。火辣的红，让您在万千用户中更醒目、更有范儿！',
          img: oss + '/background.jpg'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .open-vip-details {
    padding: 0rpx 32rpx 32rpx;
    position: relative;
    .container {
      position: relative;
      .scroll {
        border-radius: 20rpx;
        padding: 0 40rpx 120rpx;
        background: #ffffff;
        position: relative;
        .vip-item {
          margin: 50rpx 0 0 0;
          .top {
            display: flex;
            height: 102rpx;
            align-items: center;
            border-bottom: 1rpx solid #e7e7e9;
            margin-bottom: 40rpx;
            .icon {
              width: 46rpx;
              height: 46rpx;
              image {
                width: 100%;
                height: 100%;
              }
            }
            .vip-title {
              color: #c99345;
              font-size: 32rpx;
              margin-left: 18rpx;
              font-family: PingFang-SC-Medium;
            }
          }
          .vip-tip {
            color: #5e616a;
            font-size: 28rpx;
            margin-bottom: 28rpx;
          }
          .summary-intro {
            font-family: PingFang-SC-Regular;
            font-size: 28rpx;
            color: #0f1829;
            line-height: 48rpx;
            margin-bottom: 46rpx;
          }
          .photo {
            width: 606rpx;
            height: 266rpx;
            border-radius: 20rpx;
            margin: 0 auto;
            image {
              width: 100%;
              height: 100%;
              border-radius: 20rpx;
            }
          }
        }
      }
      .fixed-button {
        width: 92vw;
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 4vw;
        bottom: 0rpx;
        background: #FFF;
      }
      .mask {
        position: fixed;
        height: 120rpx;
        width: 92vw;
        left: 4vw;
        bottom: 0;
        height: 40vh;
        z-index: -1;
      }
    }
  }
</style>
