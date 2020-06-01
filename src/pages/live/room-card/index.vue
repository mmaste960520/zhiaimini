<template lang="pug">
  view.room-card(@click="cardClick")
    view.room-info
      view.title
        span.title-item.name {{ nickName }}
        level.title-item(:level="level")
      view.tags
        span.tag {{ city }}
        span.tag {{ edu }}
        span.tag {{ age }}岁
    view.anchor-avatar(:style="{backgroundImage: 'url(' + urlDecode(anchorAvatar) + ')'}")
    view.sub-anchor-avatar(v-show="subAnchorAvatar", :style="{backgroundImage: 'url(' + urlDecode(subAnchorAvatar) + ')'}")
    view.guard
      view.guard-item
        img.img(:src="guardOne")
      view.guard-item
        img.img(:src="guardTwo")
</template>
<script>
import Level from '@/components/level'

export default {
  data () {
    return {
    }
  },
  props: {
    anchorAvatar: {
      type: String,
      default: ''
    },
    subAnchorAvatar: {
      type: String,
      default: ''
    },
    guardOne: {
      type: String,
      default: ''
    },
    guardTwo: {
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
    level: {
      type: Number,
      default: 0
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
    // 是否显示挚爱值 0：否 1：是
    isShowZhiaiValue: {
      type: String,
      default: ''
    },
    liveRoomId: {
      type: String,
      default: ''
    },
    // 业务房间ID
    yunxinRoomid: {
      type: String,
      default: ''
    },
    uuid: {
      type: String,
      default: ''
    }
  },
  methods: {
    urlDecode (value) {
      return decodeURIComponent(value)
    },
    cardClick () {
      uni.navigateTo({
        url: `/pages/live-room/index?yunxinRoomid=${this.yunxinRoomid}&liveRoomId=${this.liveRoomId}&uuid=${this.uuid}`
      })
    }
  },
  components: {
    Level
  }
}
</script>
<style lang="scss" scope>
$card-height: 268rpx;

.room-card {
  position: relative;
  color: #FFF;
  font-size: 28rpx;
  height: $card-height;
  border-radius: 15rpx;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
  background: linear-gradient(180deg, rgba(36,43,64,1) 0%, rgba(53,63,88,1) 50%, rgba(48,59,87,1) 100%);
  .anchor-avatar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: $card-height + 20rpx;
    width: $card-height + 20rpx;
    border-radius: 15rpx;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
    background-size: cover;
    background-position: center;
    background-color: gray;
  }
  .sub-anchor-avatar {
    position: absolute;
    top: -10rpx;
    right: 0;
    height: $card-height / 2;
    width: $card-height / 2;
    border-radius: 15rpx;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
    background: #FFF;
    background-size: cover;
  }
  .room-info {
    position: absolute;
    left: $card-height + 30rpx;
    top: $card-height / 2 + 10rpx;
    .title {
      .title-item {
        display: inline-blcok;
        vertical-align: middle;
        margin-right: 10rpx;
      }
    }
    .tags {
      font-size: 22rpx;
      color: #e0e0e0;
      .tag {
        padding: 5rpx;
        margin-right: 10rpx;
        border-radius: 6rpx;
        background: rgba(255, 255, 255, 0.06);
      }
    }
  }
}
</style>
