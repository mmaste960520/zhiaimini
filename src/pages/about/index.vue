<template lang="pug">
  view.container.x-background
    view.about
      view.scroll
        view.scrollauto
          view.swiper
            swiper.u-wrp-bnr(@change="swiperChange", :autoplay="autoplay", :indicator-dots="indicatorDots", :interval="interval", :circular="circular", :current="swiperCurrent")
              block(v-for="(item,index) in banner", :key="index")
                swiper-item
                  image.u-img-slide(:src="(item.url)", @click="swipclick(index)")
          //- 自定义指示点dot
          view.dots
            block(v-for="(item,index) in banner", :key="index", :index="index")
              view.dot(:class="{'active': index == swiperCurrent}")
          view.item-list
            view.container(v-for="(item,index) in itemList", :key="index")
              image.tip-img(:src="(item.url)")
              view.tip-title {{item.title}}
          view.explain
            view.list.list-o
              view.header-tip 我们是
              view.content 最安全、最高效、最透明、最纯净的相亲网站。挚爱佳缘会对会员的资料进行严格的审核和排查，坚决捍卫会员的隐私，同时争取做到从源头杜绝网络诈骗等犯罪活动的形成，避免对我们的会员造成伤害
            view.list.list-t
              view.header-tip 我们有
              view.content 多种多样，好玩有趣的线下活动，让您在线下也可以拓展自己异性圈子，早日找到挚爱
            view.list.list-tt
              view.header-tip 我们有
              view.content 线上的星愿值可以兑换婚嫁礼包，让您在我们这里不但可以找到对象，还可以嫁的更好
        view.fixed
            navigator.nav(url="/pages/user-type/personal/index" open-type="navigate")
              view.download() 立即注册
        view.mask
</template>
<script>
// import fly from 'fly'
import PagesCard from '../../components/pages-card'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    PagesCard
  },
  created () {
    // 请求后台首次打开接口获取banner图片
    // 循环后台给的图片数据
    // fly.post('').then(data => {
    //   this.imgUrls = data
    // })
    // uni.login({
    //   success (res) {
    //     if (res.code) {
    //       // 发起网络请求
    //       uni.request({
    //         url: '',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  data () {
    return {
      imgUrls: [],
      banner: [
        { 'url': oss + '/banner1.jpg' },
        { 'url': oss + '/banner2.jpg' },
        { 'url': oss + '/banner3.jpg' },
        { 'url': oss + '/banner4.jpg' }
      ],
      itemList: [
        { 'url': oss + '/safety.png', title: '安全' },
        { 'url': oss + '/men.png', title: '真实' },
        { 'url': oss + '/gg.png', title: '婚嫁礼包' },
        { 'url': oss + '/flower.png', title: '线下沙龙' }
      ],
      interval: 3000, // 自动切换时间间隔
      duration: 400, // 滑动动画时长
      autoplay: true,
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
    swipclick (index) {
      // 每个banner对应一个跳转页面
      // this.$router.open({
      //   url: this.imgUrls[index].url
      // })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '关于我们',
      path: 'pages/count-down/index',
      success: (res) => {

      },
      fail: function (res) {
      }
    }
  }
}
</script>
<style lang="scss">
.container {
  .about {
    position: relative;
    margin: 0 auto;
    width: 92vw;
    .scroll {
      position: relative;
      background: rgb(255,255,255);
      border-radius: 30rpx;
      padding-bottom: 150rpx;
      overflow: hidden;
      .scrollauto {
        .swiper {
          .u-wrp-bnr {
            overflow: hidden;
            border-radius: 30rpx 30rpx 0 0;
            width: 100%;
            height: 265rpx;
            background: #f0f0f0;
            transform: translateY(0);
            .u-img-slide {
              width: 100%;
              height: inherit;
            }
          }
        }
        // 自定义指示点位置样式
        .dots {
          margin-top: 28rpx;
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
        .item-list {
          margin-top: 43rpx;
          display: flex;
          justify-content: space-around;
          padding: 0 60rpx;
          .container {
            text-align: center;
            .tip-img {
              width: 76rpx;
              height: 76rpx;
            }
            .tip-title {
              text-align: center;
              font-size: 24rpx;
              color: #9498a6;
            }
          }
        }
        .explain {
          margin: 62rpx 69rpx 0 62rpx;
          .list {
            width: 555rpx;
            height: 220rpx;
            border-bottom: 1rpx solid#e3e5e9;
            .header-tip {
              color: #666e83;
              font-size: 28rpx;
              line-height: 36rpx;
              margin-top: 38rpx;
            }
            .content {
              color: #666e83;
              font-size: 24rpx;
              line-height: 36rpx;
              margin-top: 20rpx;
            }
          }
          .list.list-t,
          .list.list-tt {
            width: 555rpx;
            height: 154rpx;
          }
        }
      }
    }
    .mask {
      position: fixed;
      width: 92vw;
      left: 4vw;
      bottom: 0;
      height: 40vh;
      background-color: #FFF;
      z-index: -1;
    }
    .fixed {
      width: 92vw;
      position: fixed;
      left: 4vw;
      bottom: 40rpx;
      .nav {
        width: 441rpx;
        height: 72rpx;
        margin: 0 auto;
        border-radius: 36rpx;
        .download {
          width: 441rpx;
          height: 72rpx;
          color: #714210;
          font-size: 32rpx;
          text-align: center;
          line-height: 72rpx;
          border-radius: 36rpx;
          background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
        }
        .download:active {
          color: #b27e41;
          background: linear-gradient(#ffd6a3 30%, #ffd6a3 60%, #ffd6a3 100%);
        }
      }
    }
  }
}
</style>
