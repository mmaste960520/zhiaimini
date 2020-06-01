<template lang="pug">
  view.banner
    view.scroll
      view.scrollauto
        view.swiper
          swiper.u-wrp-bnr(@change="swiperChange", :autoplay="autoplay", :indicator-dots="indicatorDots", :interval="interval", :circular="circular", :current="swiperCurrent")
            block(v-for="(item,index) in bannerData", :key="index")
              swiper-item
                image.u-img-slide(:src="(item.activityUrl)", @click="swipclick(item)")
        //- 自定义指示点dot
        view.dots
          block(v-for="(item,index) in bannerData", :key="index", :index="index")
            view.dot(:class="{'active': index == swiperCurrent}")
</template>
<script>
import fly from 'fly'
import domains from '@/config/domains'
const { oss } = domains
export default {
  data () {
    return {
      banner: [
        { 'url': oss + '/banner.png' },
        { 'url': oss + '/banner.png' },
        { 'url': oss + '/banner.png' },
        { 'url': oss + '/banner.png' }
      ],
      interval: 3000, // 自动切换时间间隔
      duration: 400, // 滑动动画时长
      autoplay: true,
      circular: true, // 是否采用衔接滑动
      // 当前滑块
      swiperCurrent: 0,
      indicatorDots: false,
      bannerData: []
    }
  },
  props: {
    bannerDataType: {
      type: Number
    },
    info: {
      type: Object,
      default () {
        return {}
      }
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
    swipclick (params) {
      // 每个banner对应一个跳转页面
      // uni.navigateTo({
      //   url: '/pages/living-details/index?item=' + encodeURIComponent(JSON.stringify(params))
      // })
      uni.navigateTo({
        url: '/pages/recommend-banner-detail/index?imgUrl=' + params.activityH5Url
      })
    },
    // 获取各种banner
    getChoicenessBanner (bannerType) {
      fly.post('/activity/activity/getBanner/getBannerActivityList', {
        bannerPlace: bannerType
      }).then(data => {
        if (data.data.rsCode === '200') {
          this.bannerData = data.data.rsObject
        }
      })
    }
  },
  created () {
    setTimeout(() => {
      this.getChoicenessBanner(this.bannerDataType)
    }, 500)
  }
}
</script>
<style lang="scss">
  .banner {
    padding: 20rpx 0 0 0;
    box-sizing: border-box;
    .scroll {
      position: relative;
      overflow: hidden;
      border-radius: 30rpx;
      .scrollauto {
        .swiper {
          // margin: 0 0 0 30rpx;
          .u-wrp-bnr {
            overflow: hidden;
            width: 700rpx;
            height: 260rpx;
            transform: translateY(0);
            border-radius: 30rpx;
            .u-img-slide {
              width: 100%;
              height: inherit;
              border-radius: 30rpx;
              object-fit: cover
            }
          }
        }
        // 自定义指示点位置样式
        .dots {
          margin-top: 28rpx;
          position: absolute;
          left: 291rpx;
          bottom: 10rpx;
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
              background: #656565;
            }
        }
      }
    }
  }
</style>
