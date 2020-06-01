<template lang="pug">
view.user-card(v-show="isOpen", :class="{closing: isClosing}")
  view.avatar(
    :style="{backgroundImage: 'url(' + userInfo.avatar + ')'}"
  )
  view.title
    span.title-item.name {{ userInfo.name }}
    level.title-item(:level="userInfo.level")
    gps-icon.title-item(:city="userInfo.gpsCity", :trust="userInfo.isGpsOpen")
  view.zhiai-value
    span.label 挚爱值：
    span.value {{ userInfo.zhiaiValue }}
  view.tags
    span.tag {{ userInfo.liveCity }}
    span.tag {{ userInfo.age }}岁
    span.tag {{ userInfo.edu }}
  view.slogan {{ userInfo.slogan }}
  view.actions
    span.btn.send-msg 发私信
    span.btn 个人主页
    span.btn + 关注
  button#user-card.share(open-type="share", data-uid="123") 分享
  view.close(@click="close")
</template>
<script>
import fly from 'fly'
import Level from '@/components/level'
import GpsIcon from '@/components/gps-icon'
import paths from '@/config/paths'

export default {
  data () {
    return {
      isOpen: false,
      isClosing: false,
      userInfo: {
        name: '',
        avatar: '',
        level: 0,
        zhiaiValue: '',
        liveCity: '',
        gpsCity: '',
        isGpsOpen: 0,
        edu: '',
        age: '',
        slogan: ''
      }
    }
  },
  props: {
    uid: {
      type: Number
    }
  },
  components: {
    Level,
    GpsIcon
  },
  methods: {
    open (uid) {
      const apiPath = paths.user.getUserInfo
      fly.post(apiPath, {
        uuid: uid
      }).then(res => {
        const { data } = res
        this.isOpen = true
        console.log(data)
        if (data.rsCode === '200') {
          const {
            nickName,
            userLevel,
            liveCity,
            gpsCity,
            userEducation,
            soliloquy,
            userAge,
            charm,
            isGpsOpen,
            profilePhotoid
          } = data.rsObject

          this.userInfo.name = nickName
          this.userInfo.avatar = profilePhotoid || 'https://i2.hdslb.com/bfs/face/60e57dba02f8847893d4e70ec11607f88174b629.jpg'
          this.userInfo.level = Number(userLevel)
          this.userInfo.zhiaiValue = charm
          this.userInfo.liveCity = liveCity
          this.userInfo.gpsCity = gpsCity
          this.userInfo.isGpsOpen = Number(isGpsOpen)
          this.userInfo.edu = userEducation
          this.userInfo.age = userAge
          this.userInfo.slogan = soliloquy
        }
      }).catch(error => {
        console.log(error)
      })
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>
<style lang="scss" scope>
.user-card {
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  padding: 70rpx 40rpx;
  transform: translate(-50%, -50%);
  width: 90vw;
  box-sizing: border-box;
  background: #FFF;
  border-radius: 20rpx;
  animation: .3s bounceIn;
  z-index: 999;
  &.closing {
    animation: .3s bounceOut;
  }
  .avatar {
    width: 136rpx;
    height: 136rpx;
    margin: 0 auto 20rpx;
    border-radius: 50%;
    background-color: gray;
    background-size: cover;
  }
  .title {
    margin-bottom: 20rpx;
    .title-item {
      margin-right: 10rpx;
    }
    .name {
      font-size: 34rpx;
      font-weight: bold;
      color: #101727;
    }
  }
  .zhiai-value {
    color: #f53c70;
    margin-bottom: 20rpx;
    .label {
      font-size: 25rpx;
      font-weight: bold;
    }
    .value {
      font-size: 27rpx;
    }
  }
  .tags {
    font-size: 22rpx;
    color: #101727;
    margin-bottom: 46rpx;
    .tag {
      padding: 5rpx 10rpx;
      margin-right: 20rpx;
      background: #f4f5f5;
      border-radius: 20rpx;
    }
  }
  .slogan {
    font-size: 26rpx;
    color: lighten(#101727, 20%);
    margin-bottom: 70rpx;
  }
  .share {
    position: absolute;
    display: block;
    height: 52rpx;
    line-height: 52rpx;
    padding: 0 20rpx;
    top: 100rpx;
    right: 0;
    font-size: 20rpx;
    color: #FFF;
    background-image: linear-gradient(0deg, #4e89ea 0%, #ad8ceb 100%);
    border-radius: 26rpx 0 0 26rpx;
    &:before {
      display: inline-block;
      content: '';
      vertical-align: middle;
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
      background: url($oss-path + '/share.png');
      background-size: cover;
    }
  }
  .close {
    position: absolute;
    display: inline-block;
    top: -20rpx;
    right: -20rpx;
    width: 40rpx;
    height: 40rpx;
    background: url($oss-path + '/ic_live_close_style_1.png');
    background-size: cover;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    .btn {
      display: inline-block;
      font-size: 30rpx;
      color: #FFF;
      border-radius: 30rpx;
      padding: 0 40rpx;
      height: 60rpx;
      line-height: 60rpx;
      background: linear-gradient(0deg, #34a6e2 0%, #34cbc0 100%);
      &.send-msg {
        color: #21aeca;
        border: #34cbc0 2rpx solid;
        height: 56rpx;
        line-height: 56rpx;
        border-radius: 30rpx;
        background: #FFF;
      }
    }
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bounceOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
