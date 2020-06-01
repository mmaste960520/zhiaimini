<template lang="pug">
  view.wrap
    page-header(text="大厅", go-back-path="/pages/live/index", :transparent="true")
    div.x-player-wrap
      x-player.x-player-comp(
        v-if="agoraChannelToken",
        :agora-channel-token="agoraChannelToken",
        :agora-channel-name="agoraChannelName",
        :agora-channel-account="agoraChannelAccount",
        :zhiai-roomid="liveRoomId",
        :topic="liveRoomInfo.topic"
      )
    chat.chat-comp(
      :yunxin-roomid="yunxinRoomid",
      :live-roomid="liveRoomId"
    )
</template>
<script>
import fly from 'fly'
import PageHeader from '@/components/pages-header'
import XPlayer from './x-player'
import Chat from './chat'
import paths from '@/config/paths'

export default {
  data () {
    return {
      timer: null,
      yunxinRoomid: 0,
      liveRoomId: 0,
      uuid: 0,
      agoraChannelToken: '',
      agoraChannelName: '',
      agoraChannelAccount: '',
      liveRoomInfo: {
        topic: ''
      }
    }
  },
  methods: {
    getJoinStatus () {
      return new Promise((resolve, reject) => {
        fly.post(paths.live.getJoinStatus, {
          liveRoomId: this.liveRoomId
        }).then(res => {
          const { data } = res
          if (data.rsObject.isJoined) {
            reject(Error('joined'))
            return
          }
          resolve('unjoined')
        }).catch(() => {
          resolve('joined')
        })
      })
    },
    joinLiveRoom () {
      this.getJoinStatus().then(() => {
        fly.post(paths.live.joinLiveRoom, {
          liveRoomId: this.liveRoomId
        }).then(res => {
          const { data } = res
          this.agoraChannelToken = data.rsObject.agoraChannleToken
          this.agoraChannelName = data.rsObject.agoraChannleName
          this.agoraChannelAccount = data.rsObject.agoraChannleAccount
          this.liveRoomInfo.topic = data.rsObject.liveRoomInfo.topic
        })
      }).catch(() => {
        fly.post(paths.live.joinLiveRoom, {
          liveRoomId: this.liveRoomId
        }).then(res => {
          const { data } = res
          this.agoraChannelToken = data.rsObject.agoraChannleToken
          this.agoraChannelName = data.rsObject.agoraChannleName
          this.agoraChannelAccount = data.rsObject.agoraChannleAccount
          this.liveRoomInfo.topic = data.rsObject.liveRoomInfo.topic
        })
        this.roomLimit()
      })
    },
    roomLimit () {
      uni.showToast({
        title: '您已达到小程序观看直播上限，请下载 App 继续观看',
        icon: 'none',
        duration: 3000
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 3000)
    },
    open () {
      this.$refs.userCard.open()
    },
    close () {
      this.$refs.userCard.close()
    }
  },
  components: {
    PageHeader,
    XPlayer,
    Chat
  },
  onLoad ({ yunxinRoomid, liveRoomId, uuid }) {
    this.yunxinRoomid = yunxinRoomid
    this.liveRoomId = liveRoomId
    this.uuid = uni.getStorageSync('uuid')
  },
  mounted () {
    this.joinLiveRoom()

    // 直播间十分钟观看限制
    this.timer = setTimeout(() => {
      this.roomLimit()
    }, 1000 * 60 * 10)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  onShareAppMessage: function (data) {
    console.log(data)
    if (data.from === 'button' && data.target.id === 'user-card') {
      const uid = data.target.dataset.uid
      return {
        title: '用户详情',
        path: 'pages/count-down/index?uid=' + uid,
        success: (res) => {
        },
        fail: function (res) {
        }
      }
    }
    if (data.from === 'button' && data.target.id === 'room-share-btn') {
      const roomid = data.target.dataset.roomid
      return {
        title: '来看看 Ta 的直播间吧',
        path: 'pages/live-room/index?liveRoomId=' + roomid,
        success: (res) => {
        },
        fail: function (res) {
        }
      }
    }
    return {
      title: '来看看 Ta 的直播间吧',
      path: `/pages/live-room/index?yunxinRoomid=${this.yunxinRoomid}&liveRoomId=${this.liveRoomId}`,
      success: (res) => {

      },
      fail: function (res) {
      }
    }
  }
}
</script>
<style lang="scss" scope>
.wrap {
  background-color: #263657;
  height: 100vh;
  .x-player-wrap {
    display: block;
    height: 50vh;
  }
  .chat-comp {
    display: block;
    height: 50vh;
    overflow-y: hidden;
  }
}
</style>
