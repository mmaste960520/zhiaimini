<template lang="pug">
  view.offical-card(v-if="info", :style="{ 'background': 'url(' + info.liveH5Url + ') no-repeat center center', 'background-size': '100% 100%'}")
    view.bottom-content
      view.header-img(v-if="info.headerUrl != ''")
        image(:src="info.headerUrl")
      view.content
        view.sub-title {{info.liveTitle}}
          view.level(v-if="info.userLevel")
            level(:level="info.userLevel")
        view.title-has-header-img(v-if="info.headerUrl") {{info.liveSubTitle}}
        view.title(v-if="!info.headerUrl") {{info.liveSubTitle}}
      view.current-status-live(v-if="info.liveStatus === '1'", @click="toPersonalHomePage")
        text 进入直播
        image(:src="zhiboicon")
      view.current-status-info(v-if="info.liveStatus === '2'", @click="toDetailsInfo(info.liveId)")
        text 查看详情
</template>
<script>
import Level from '@/components/level'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    Level
  },
  data () {
    return {
      zhiboicon: oss + '/zhibo.png',
      myUid: uni.getStorageSync('uuid')
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 跳转至个人主页
    toPersonalHomePage () {
      const jumpUrl = encodeURIComponent(`http://zhiai.live/app-pages/personal-homepage.html?otherUid=${this.info.uuid}&myUid=${this.myUid}`)
      uni.navigateTo({
        url: `/pages/web-view/index?url=${jumpUrl}`
      })
    },
    // 跳转至直播详情
    toDetailsInfo (params) {
      uni.navigateTo({
        url: '/pages/web-view/index?url=https://dev.zhiai.live/app-pages/live-detail.html#/' + Number(params)
      })
    }
  }
}
</script>
<style lang="scss">
  .offical-card {
    width: 700rpx;
    height: 340rpx;
    border-radius: 28rpx;
    position: relative;
    margin: 40rpx 0 0 0;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
    .bottom-content {
      width: 700rpx;
      height: 104rpx;
      padding: 0 0 0 14rpx;
      display: flex;
      position: absolute;
      bottom: 14rpx;
      .header-img {
        width: 100rpx;
        height: 100rpx;
        z-index: 1000;
        border-radius: 28rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        margin: 20rpx 0 0 12rpx;
        .title,
        .sub-title,
        .title-has-header-img {
          color: #fffffd;
        }
        .title {
          font-size: 20rpx;
          width: 380rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title-has-header-img {
          font-size: 20rpx;
          width: 300rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sub-title {
          font-size: 28rpx;
          font-weight: bold;
          margin: 0 0 6rpx 0;
          .level {
            display: inline-block;
            margin: 0 0 0 10rpx;
            width: 86rpx;
            height: 37rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .current-status-live,
      .current-status-info {
        width: 160rpx;
        height: 52rpx;
        text-align: center;
        font-size: 22rpx;
        line-height: 52rpx;
      }
      .current-status-live {
        color: #ebf0f6;
        background: url($oss-path + '/live.png') no-repeat;
        background-size: cover;
        position: absolute;
        right: 36rpx;
        bottom: 34rpx;
        text {
          display: inline-block;
          margin: 0 6rpx 0 0;
        }
        image {
          width: 22rpx;
          height: 22rpx;
          display: inline-block;
        }
      }
      .current-status-info {
        color: #ffffff;
        background: url($oss-path + '/info.png') no-repeat;
        background-size: cover;
        position: absolute;
        right: 36rpx;
        bottom: 34rpx;
      }
    }
  }
</style>
