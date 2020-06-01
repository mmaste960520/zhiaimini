<template lang="pug">
  view.user-info-card
    view.relative-info
      view.row-I
        text.user-name {{uerCardInfo.nickName ? uerCardInfo.nickName : '用户' + uerCardInfo.uuid}}
        view.articles
          view(:class="uerCardInfo.userLevel > 0 ? 'user-rank' : 'hide-rank'")
            level(:level="uerCardInfo.userLevel > 0 ? uerCardInfo.userLevel : 1")
          view.current-gps-position
            gps-icon(:city="uerCardInfo.isGpsOpen === '1' ? uerCardInfo.gpsCity : '未知'", :trust="uerCardInfo.isGpsOpen === '1'")
      view.user-id ID:{{uerCardInfo.uuid ? uerCardInfo.uuid : '123456'}}
      view.good-evaluate-num
        view.space.icon
          image(:src="meiliIcon")
        view.space.title 好评度
        view.space.amount {{uerCardInfo.praise ? uerCardInfo.praise : 0}}
      view.charm-progress-bar
        charm-progress-bar(:level="Number(uerCardInfo.charmLevel)", :maxLimit="Number(uerCardInfo.charmNextValue)", :current="Number(uerCardInfo.charm)", :currentShow="uerCardInfo.charmZh", :maxLimitShow="uerCardInfo.charmNextValueZh")
      view.base-info
        text.address(v-if="uerCardInfo.liveCity", :class="uerCardInfo.liveCity ? 'show-border' : 'hide-border'") {{uerCardInfo.liveCity}}
        text.education(v-if="uerCardInfo.userEducation", :class="uerCardInfo.userEducation ? 'show-border' : 'hide-border'") {{uerCardInfo.userEducation}}
        text.age(v-if="uerCardInfo.userAge", :class="uerCardInfo.userAge > 0 ? 'show-border' : 'hide-border'") {{uerCardInfo.userAge}}岁
    view.header-img
      //- img(:src="userHeaderImgUrl ? userHeaderImgUrl : (sex === '男' ? defaultHeaderBoy : defaultHeaderGirl)", @click="showModal")
      img(:src="userHeaderImgUrl ? userHeaderImgUrl : defaultHeaderBoy", @click="showModal")
    //- 底部弹窗
    //- 屏幕背景变暗的背景
    view.background-screen(v-if="showModalStatus")
    //- 弹出框
    view.bottom-toast(:animation="animationData", v-if="showModalStatus")
      view.handle-tip 上传头像
      view.attention-tip (以下照片将无法通过审核)
      view.forbidden-photo
        view.img-list(v-for="(item, index) in photo", :key="index")
          image(:src="item.src", mode="aspecFill")
      view.camera(@click="camera") 拍照
      view.album(@click="album") 从相册选取
      view.cancel
        text(@click="hideModal") 取消
</template>
<script>
import GpsIcon from '@/components/gps-icon'
import Level from '@/components/level'
import domains from '@/config/domains'
import CharmProgressBar from './charm-progress-bar'
const { oss } = domains
export default {
  components: {
    GpsIcon,
    Level,
    CharmProgressBar
  },
  props: {
    uerCardInfo: {
      type: Object
    },
    userHeaderImgUrl: {
      type: String
    },
    sex: {
      type: String
    }
  },
  data () {
    return {
      hideFlag: true, // true-隐藏 false-显示
      animationData: {},
      showModalStatus: Boolean,
      photo: [
        { src: oss + '/bg_me_nonstandard_photo_1@2x.png' },
        { src: oss + '/bg_me_nonstandard_photo_2@2x.png' },
        { src: oss + '/bg_me_nonstandard_photo_3@2x.png' },
        { src: oss + '/bg_me_nonstandard_photo_4@2x.png' },
        { src: oss + '/bg_me_nonstandard_photo_5@2x.png' }
      ],
      tempFilePaths: oss + '/header-img.jpg',
      level1icon: oss + '/me_icon_level1.png',
      meiliIcon: oss + '/meiliicon.png',
      fileList: [],
      photoids: [],
      file: '',
      unLoadImgUrl: '',
      defaultHeaderBoy: oss + '/ic_common_default_head_man.png',
      defaultHeaderGirl: oss + '/ic_common_default_head_woman@2x.png'
    }
  },
  methods: {
    // 拍照
    camera () {
      uni.chooseImage({
        count: 1, // 默认9 一次可以选几张
        sizeType: ['original', 'compressed'], // 以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 拍照
        success: function (res) {
          const imgUrl = res.tempFilePaths
          uni.navigateTo({
            url: '/pages/user-photo-tailor/index?path=' + imgUrl[0]
          })
        }
      })
      this.hideModal()
    },
    // 从本地相册选取
    album () {
      uni.chooseImage({
        count: 1, // 默认9 一次可以选几张
        sizeType: ['original', 'compressed'], // 以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        success: function (res) {
          const imgUrl = res.tempFilePaths
          uni.navigateTo({
            url: '/pages/user-photo-tailor/index?path=' + imgUrl[0]
          })
        }
      })
      this.hideModal()
    },
    // 显示对话框
    showModal () {
      var animation = uni.createAnimation({
        duration: 90,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.animationData = animation.export()
      this.showModalStatus = true
      setTimeout(function () {
        animation.translateY(0).step()
        this.animationData = animation.export()
      }.bind(this), 40)
    },
    // - 隐藏对话框
    hideModal () {
      var animation = uni.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.animationData = animation.export()
      setTimeout(function () {
        animation.translateY(0).step()
        this.animationData = animation.export()
        this.showModalStatus = false
      }.bind(this), 200)
    }
  }
}
</script>
<style lang="scss" scoped>
  .user-info-card {
    display: flex;
    justify-content: space-between;
    .relative-info {
      .row-I {
        display: flex;
        color: #101727;
        margin-bottom: 6rpx;
        .user-name {
          font-size: 38rpx;
          font-weight: bolder;
        }
        .articles {
          display: flex;
          justify-content: center;
          align-items: center;
          .user-rank {
            display: inline-block;
            width: 60rpx;
            height: 54rpx;
            margin: 0 8rpx;
            image {
              width: 66rpx;
              height: 68rpx;
            }
          }
          .hide-rank {
            display: none;
          }
          .current-gps-position {
            height: 24rpx;
            line-height: 24rpx;
            margin-left: 8rpx;
            .position {
              width: 60rpx;
              height: 22rpx;;
              font-size: 15rpx;
            }
          }
        }
      }
      .user-id {
        color: #8f9094;
        font-size: 26rpx;
        margin-bottom: 18rpx;
      }
      .good-evaluate-num {
        width: 200rpx;
        line-height: 24rpx;
        margin-bottom: 16rpx;
        color: #8f9094;
        font-size: 24rpx;
        display: flex;
        .space {
          margin-right: 4rpx;
        }
        .icon {
          display: inline-block;
          width: 28rpx;
          height: 30rpx;
          background-size: cover;
          background-repeat: no-repeat;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .charm-progress-bar {
        margin-bottom: 12rpx;
      }
      .base-info {
        width: 300rpx;
        display: flex;
        margin-bottom: 72rpx;
        .show-border {
          height: 32rpx;
          padding: 5rpx 9rpx;
          font-size: 22rpx;
          text-align: center;
          line-height: 32rpx;
          color: #51565c;
          display: block;
          background: #d9dade;
          border-radius: 8rpx;
          margin-right: 6rpx;
        }
        .hide-border {
          display: none;
        }
      }
    }
    .header-img {
      img {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
      }
    }
    .background-screen {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.2;
      overflow: hidden;
      z-index: 1000;
      color: #fff;
    }
    /*对话框 */
    .bottom-toast {
      height: 700rpx;
      width: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2000;
      background: #fff;
      padding: 40rpx 0 0 0;
      border-radius: 20rpx 20rpx 0 0;
      .handle-tip {
        width: 140rpx;
        height: 26rpx;
        line-height: 26rpx;
        font-size: 28rpx;
        color: #86898e;
        margin: 0 auto;
        text-align: center;
      }
      .attention-tip {
        height: 20rpx;
        line-height: 20rpx;
        color: #101727;
        font-size: 20rpx;
        opacity: 0.6;
        text-align: center;
        margin: 38rpx auto 0;
      }
      .forbidden-photo {
        display: flex;
        justify-content: space-around;
        margin: 22rpx 0 0 0;
        padding: 0 74rpx;
        .img-list {
          width: 100rpx;
          height: 100rpx;
          background-color: #eeeeee;
          border-radius: 20rpx;
          image {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
          }
        }
      }
      .camera,
      .album,
      .cancel {
        width: 600rpx;
        height: 108rpx;
        font-size: 32rpx;
        line-height: 108rpx;
        color: #101727;
        text-align: center;
        margin: 0 auto;
      }
      .camera {
        margin: 44rpx auto 0;
        border-top: 1rpx solid #f6f6f6;
        border-bottom: 1rpx solid #f6f6f6;
      }
      .album {
        margin: 2rpx auto 0;
        border-bottom: 1rpx solid #f6f6f6;
      }
      .cancel {
        color: #909195;
        margin: 10rpx auto 0;
        text {
          display: inline-block;
          width: 113rpx;
          height: 108rpx;
        }
      }
    }
    .picture{
      height:250rpx;
      width: 250rpx;
      position: relative;
      image{
        height:100%;
        width: 100%;
        position: absolute;
        top:0;
        left: 0;
        border-radius: 50%;
      }
    }
  }
</style>
