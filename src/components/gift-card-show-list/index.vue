<template lang="pug">
  view.gift-card-show-list
    view.title 礼物卡包
    view.scrollauto(v-if="giftCardList")
      view.swiper
        swiper.u-wrp-bnr(@change="swiperChange", :autoplay="autoplay", :indicator-dots="indicatorDots", :interval="interval", :circular="circular", :current="swiperCurrent")
          block(v-for="(item,index) in emptyList", :key="index")
            swiper-item.swiper-item
              view.swiper-item-list
                view.top-list
                  view.for-map(v-for="(item,index) in giftCardList", :key="index", v-if="giftCardList", @click="openPages(item)")
                    img(:src="item.giftImageUrl")
                    view.words-tip {{item.giftName}}
                    view.price {{item.giftPrice}}
      //- 自定义指示点dot
      view.dots(v-if="giftCardList")
        block(v-for="(item,index) in emptyList", :key="index", :index="index")
          view.dot(:class="{'active': index == swiperCurrent}")
    view.empty-gift-card(v-if="!giftCardList")
</template>
<script>
export default {
  props: {
    giftCardList: {
      type: Array
    }
  },
  data () {
    return {
      emptyList: [
        {}
      ],
      interval: 3000, // 自动切换时间间隔
      duration: 400, // 滑动动画时长
      autoplay: false,
      circular: true, // 是否采用衔接滑动
      // 当前滑块
      swiperCurrent: 0,
      indicatorDots: false
    }
  },
  methods: {
  // 轮播图 指示点跟踪
    swiperChange (e) {
      // this.swiperCurrent = e.target.current // 获取当前轮播图片的下标, 可以给当前指示点加样式
      if (e.detail.source === 'touch') {
        this.swiperCurrent = e.detail.current
      }
      if (e.detail.source === 'autoplay') {
        this.swiperCurrent = e.detail.current
      }
    },
    openPages (items) {
      uni.navigateTo({
        url: `/pages/web-view/index?url=${items.link}`
      })
    }
  }
}
</script>
<style lang="scss" scope>
  .gift-card-show-list {
    .title {
      width: 160rpx;
      height: 31rpx;
      font-family: PingFang-SC-Medium;
      font-size: 32rpx;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40rpx;
      letter-spacing: 0rpx;
      color: #181b22;
      margin: 0 0 22rpx 26rpx;
    }
    .empty-gift-card {
      width: 150rpx;
      height: 180rpx;
      background-image: url($oss-path + '/ic_me_card_zanwu@2x.png');
      background-size: cover;
    }
    .swiper{
      .u-wrp-bnr {
        width: 593rpx;
        height: 460rpx;
        margin: 0 auto;
        .swiper-item-list {
          .top-list {
            width: 620rpx;
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            .for-map {
              height: 160rpx;
              padding: 25rpx 39rpx 29rpx 34rpx;
              margin: 0 2rpx 2rpx 0;
              text-align: center;
              background: #eeeef0;
              border-radius: 8rpx;
              img {
                width: 77rpx;
                height: 77rpx;
              }
              .words-tip {
                color: #818286;
                font-family: PingFang-SC-Medium;
                font-size: 20rpx;
                margin-top: 16rpx;
              }
              .price {
                color: #e1a45a;
                font-size: 24rpx;
                margin-top: 11rpx;
              }
            }
            .for-map:nth-child(4) {
              margin-right: 0;
            }
            .for-map:nth-child(8) {
              margin-right: 0;
            }
          }
        }
      }
    }
    .dots {
      margin-top: 8rpx;
      display: flex;
      justify-content: center;
      .dot{
        margin: 0 8rpx;
        width: 14rpx;
        height: 14rpx;
        background: #e2e2e2;
        border-radius: 8rpx;
        transition: all .6s;
      }
      .dot.active{
        width: 24rpx;
        background: #2aa6cc;
      }
    }
  }
</style>
