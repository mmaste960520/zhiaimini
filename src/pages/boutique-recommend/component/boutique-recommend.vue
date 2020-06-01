<template lang="pug">
  view.boutique-recommend(@click="toHomePage()")
    view.room-info
      view.title
        span.title-item.name {{ nickName }}
        level.title-item(v-if="userLevel > 0",:level="userLevel")
        gps-icon.gps(:city="isGpsOpen === '1' ? gpsCity : '未知'", :trust="isGpsOpen === '1'")
      view.tags.tags-fist-line
        span.tag {{ height }}cm
        span.tag {{ salary }}
        span.tag {{ occupation }}
      view.tags
        span.tag {{ city }}
        span.tag {{ edu }}
        span.tag {{ age }}岁
      view.personal-photo-list
        view(v-for="(item, index) in personalPhotoList", :key="index")
          img.list(:src="item.presignedUrl")
        view(v-if="personalPhotoList.length === 0")
          img.default-photo(:src="defaultPhoto")
      view.personalized-signature {{personalizedSignature}}
    view.anchor-avatar
      img.image(
        :src=" anchorAvatar != '' ? anchorAvatar : ''",
        :class="{'default-background-boy': anchorAvatar === '' && sex === '男', 'default-background-girl': anchorAvatar === '' && sex === '女'}"
        )
      view.living-tip(v-if="livingStatus === '1'", @click="toDetails()")
</template>
<script>
import Level from '@/components/level'
import GpsIcon from '@/components/gps-icon'
import domains from '@/config/domains'
// import appPages from '@/config/app-pages'
const { oss } = domains
export default {
  data () {
    return {
      defaultAnchorAvatarBoy: oss + '/ic_common_default_head_man.png',
      defaultAnchorAvatargirl: oss + '/ic_common_default_head_woman.png',
      livingImg: oss + '/ic_common_live_broadcast_state.png',
      myUid: uni.getStorageSync('uuid'),
      defaultPhoto: oss + '/ic_recommend_picture_empty@2x.png',
      accessToken: uni.getStorageSync('accessToken')
    }
  },
  props: {
    personalPhotoList: {
      type: Array
    },
    sex: {
      type: String,
      default: ''
    },
    livingStatus: {
      type: String,
      default: ''
    },
    isGpsOpen: {
      type: String,
      default: ''
    },
    gpsCity: {
      type: String,
      default: ''
    },
    userLevel: {
      type: Number,
      default: 1
    },
    anchorAvatar: {
      type: String,
      default: ''
    },
    nickName: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    edu: {
      type: String,
      default: ''
    },
    age: {
      type: String,
      default: ''
    },
    maxCount: {
      type: Number,
      default: 0
    },
    curCount: {
      type: Number,
      default: 0
    },
    zhiaiValue: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    salary: {
      type: String,
      default: ''
    },
    occupation: {
      type: String,
      default: ''
    },
    personalizedSignature: {
      type: String,
      default: ''
    },
    // 是否显示直播中 0：否 1：是
    isShowZhiaiValue: {
      type: String,
      default: ''
    },
    // 云信roomid
    roomid: {
      type: String,
      default: ''
    },
    // 业务房间ID
    zhiaiRoomid: {
      type: String,
      default: ''
    },
    anchorShowImg: {
      type: String,
      default: ''
    },
    currentLivingUid: {
      type: String,
      default: ''
    }
  },
  methods: {
    // cardClick () {
    //   uni.navigateTo({
    //     url: `/pages/live-room/index?roomid=${this.roomid}&zhiaiRoomid=${this.zhiaiRoomid}`
    //   })
    // },
    toHomePage () {
      const jumpUrl = encodeURIComponent(`https://zhiai.live/app-pages/personal-homepage.html?otherUid=${this.currentLivingUid}&myUid=${this.myUid}&accessToken=${this.accessToken}`)
      uni.navigateTo({
        url: `/pages/web-view/index?url=${jumpUrl}`
      })
      // console.log(this.currentLivingUid)
      // console.log(this.myUid)
    }
  },
  components: {
    Level,
    GpsIcon
  }
}
</script>
<style lang="scss" scope>
$card-height: 320rpx;

.boutique-recommend {
  position: relative;
  color: #FFF;
  font-size: 28rpx;
  height: $card-height;
  border-radius: 15rpx;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
  background: linear-gradient(180deg, rgba(36,43,64,1) 0%, rgba(53,63,88,1) 50%, rgba(48,59,87,1) 100%);
  margin-bottom: 46rpx;
  .anchor-avatar {
    position: absolute;
    top: -10rpx;
    left: 0;
    height: 332rpx;
    width: 300rpx;
    border-radius: 15rpx;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 20rpx;
    .image {
      height: 100%;
      width: 100%;
      border-radius: 20rpx;
      display: inline-block;
    }
    .default-background-boy {
      background-image: url($oss-path + '/ic_login_default_head_man_choice.png');
      background-size: cover;
    }
    .default-background-girl {
      background-image: url($oss-path + '/ic_common_default_head_woman.png');
      background-size: cover;
    }
    .living-tip {
      &:after {
        content: '';
        position: absolute;
        bottom: 0rpx;
        left: 0;
        width: 196rpx;
        height: 58rpx;
        border-bottom-left-radius: 15rpx;
        background-image: url($oss-path + '/ic_common_live_broadcast_state.png');
        background-size: cover;
      }
    }
  }
  .room-info {
    position: absolute;
    // left: $card-height + 30rpx;
    // top: $card-height / 2 + 10rpx;
    left: 320rpx;
    top: 30rpx;
    .title {
      display: flex;
      align-items: center;
      .title-item {
        display: inline-blcok;
        vertical-align: middle;
        margin-right: 10rpx;
      }
      .gps {
        margin-bottom: 6rpx;
      }
    }
    .tags {
      font-size: 22rpx;
      color: #e0e0e0;
      margin-top: 8rpx;
      margin-bottom: 16rpx;
      .tag {
        padding: 5rpx;
        margin-right: 10rpx;
        border-radius: 6rpx;
        background: rgba(255, 255, 255, 0.06);
      }
    }
    .tags-fist-line {
      .tag {
        background: none;
      }
    }
    .personalized-signature {
      width: 320rpx;
      height: 24rpx;
      line-height: 24rpx;
      font-size: 22rpx;
      color: #e0e0e0;
      margin-top: 26rpx;
      overflow: hidden;
    }
    .personal-photo {
      margin-top: 12rpx;
      height: 62rpx;
      width: 62rpx;
      background-image: url($oss-path + '/ic_recommend_picture_empty@2x.png');
      background-size: cover;
    }
    .personal-photo-list {
      margin-top: 12rpx;
      display: flex;
      height: 62rpx;
      width: 100%;
      .list {
        display: inline-block;
        width: 62rpx;
        height: 62rpx;
        border-radius: 12rpx;
        border: solid 2px rgba(255, 255, 255, 0.2);
        margin: 0 16rpx 0 0;
      }
      .default-photo {
        display: inline-block;
        width: 62rpx;
        height: 62rpx;
        border-radius: 12rpx;
        border: solid 2px rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
