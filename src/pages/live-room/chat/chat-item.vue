<template lang="pug">
  view.chat-item(:class="type")
    //- notice
    template(v-if="type === 'notice'")
      span.icon
      span.tip 系统消息：
      span.msg {{ msg }}

    //- bubble
    template(v-if="type === 'bubble'")
      level.mg-right(:level="level")
      gps-icon.mg-right(:city="city", :trust="isGpsOpen")
      name.mg-right(:name="user", :gender="gender")
      span.mg-right.bubble-desc(:class="gender") 冒了个

    //- enter
    template(v-if="type === 'enter'")
      level.mg-right(:level="level")
      gps-icon.mg-right(:city="city", :trust="isGpsOpen")
      span.mg-right {{ user }}
      span.mg-right 进入房间

    //- at
    template(v-if="type === 'at'")
      name.mg-right(:name="user", :gender="gender")
      span.mg-right @
      name.mg-right(:name="at", :gender="atGender")
      span {{ msg }}

    //- text
    template(v-if="type === 'text'")
      level.mg-right(:level="level")
      gps-icon.mg-right(:city="city", :trust="isGpsOpen")
      name.mg-right(:name="user", :gender="gender")
      span :
      span {{ msg }}

    //- send gift
    view.content(v-if="type === 'send-gift'")
      span.mg-right 你送给
      name.mg-right(:name="user", :gender="gender")
      span.mg-right {{ giftName }}
      span.mg-right x {{ giftCount }}

    //- receive gift
    view.content(v-if="type === 'receive-gift'")
      name.mg-right(:name="user", :gender="gender")
      span.mg-right 送给
      name.mg-right(:name="receiveUser", :gender="receiveUserGender")
      span.mg-right {{ giftName }}
      span.mg-right x {{ giftCount }}
</template>
<script>
import Name from './name.vue'
import Level from '@/components/level'
import GpsIcon from '@/components/gps-icon'

export default {
  components: {
    Name,
    Level,
    GpsIcon
  },
  props: {
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return [
          'notice',
          'send-gift',
          'receive-gift',
          'bubble',
          'text',
          'at',
          'enter'
        ].indexOf(value) !== -1
      }
    },
    msg: {
      type: String,
      default: ''
    },
    giftName: {
      type: String,
      default: ''
    },
    giftCount: {
      type: Number,
      default: 1
    },
    user: {
      type: String,
      default: ''
    },
    receiveUser: {
      type: String,
      default: ''
    },
    at: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['', 'man', 'woman'].indexOf(value) !== -1
      }
    },
    receiveUserGender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['', 'man', 'woman'].indexOf(value) !== -1
      }
    },
    atGender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['', 'man', 'woman'].indexOf(value) !== -1
      }
    },
    city: {
      type: String,
      default: ''
    },
    isGpsOpen: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scope>
.chat-item {
  font-size: 30rpx;
  color: #FFF;
  padding: 10rpx 30rpx;
  .mg-right {
    margin-right: 10rpx;
  }
  &.enter {
    border-radius: 20rpx 0 0 20rpx;
    background: linear-gradient(90deg, rgba(66,165,190,1) 70%, rgba(255,255,255,0) 100%);
  }
  &.text {
    border-radius: 20rpx;
    background: rgba(0,9,22,0.3);
  }
  &.at {
    border-radius: 20rpx;
    background: linear-gradient(270deg, rgba(210,87,248,0.3) 52%, rgba(110,48,253,0.3) 100%);
  }
  &.bubble {
    border-radius: 20rpx;
    background: rgba(0,9,22,0.3);
    .bubble-desc {
      &:after {
        content: '';
        display: inline-block;
        vertical-align: top;
        margin-right: 8rpx;
        width: 40rpx;
        height: 40rpx;
        background-size: cover;
      }
      &.man {
        color: #88dfff;
        &:after {
          background-image: url($oss-path + '/ic_live_bubbling_male_style_1.png');
        }
      }
      &.woman {
        color: #ed7dad;
        &:after {
          background-image: url($oss-path + '/ic_live_bubbling_female_style_1.png');
        }
      }
    }
  }
  &.notice {
    border-radius: 20rpx;
    background: linear-gradient(90deg, rgba(52,169,223,0.6) 50%, rgba(35,151,224,0.6) 100%);
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-right: 8rpx;
      width: 40rpx;
      height: 40rpx;
      background-size: cover;
      background-image: url($oss-path + '/ic_live_notice_style_2.png');
    }
  }
  &.send-gift,
  &.receive-gift {
    border-radius: 20rpx;
    padding: 2rpx;
    line-height: 53rpx;
    box-shadow: 0 0 8rpx #c33dec;
    background: linear-gradient(0deg, #b10de4 50%, #ff6fcc 100%);
    .content {
      height: 100%;
      padding: 0 20rpx;
      border-radius: 20rpx;
      background: #1b2843;
    }
  }
}
</style>
