<template lang="pug">
  view.x-player(:style="{height: playerHeight + 'px'}")
    view.sofa(:style="{backgroundImage: 'url(' + liveAssets.livePlayerBg + ')', height: playerHeight + 'px'}")
      view.sofa-content
        view.topic(v-show="topic") 主播话题：{{ topic }}
    view.live-player(
      v-for="(player, index) in media",
      :style="{left: player.left + 'px', top: player.top + 'px', width: player.width + 'px', height: player.height + 'px', backgroundImage: 'url(' + liveAssets.livePlayerBg + ')'}",
      :key="index"
    )
      live-player(
        v-if="player.url"
        :src="player.url",
        mode="live",
        orientation="horizontal",
        object-fit="fillCrop",
        autoplay,
        :style="{width: player.width + 'px', height: player.height + 'px'}",
      )
      gallery.gallery(
        v-if="allUserMap[player.uid].isMic",
        :style="{height: playerHeight + 'px'}",
        :photos="photos"
      )
      div.user-info(@click="openUserCard(player.uid)")
        avatar.avatar-comp(
          :avatar="allUserMap[player.uid].avatar",
          :gender="allUserMap[player.uid].gender",
          :level="1"
        )
        div.info
          p.name {{ allUserMap[player.uid].name }}
          div.desc
            // span.item 挚爱值 1244
            // gps-icon.item(city="西安", :trust="true")

    //- 用户卡
    user-card(ref="userCard")
</template>
<script>
import fly from 'fly'
import { mapGetters } from 'vuex'
import Layouter from './layout.js'
import CONFIG from '@/config/common'
import { live as liveAssets } from '@/config/assets'
import UserCard from '@/components/user-card'
import GpsIcon from '@/components/gps-icon'
import Gallery from './gallery.vue'
import Avatar from './avatar.vue'
import paths from '@/config/paths'
const AgoraMiniappSDK = require('@/libs/agora-sdk.js')

export default {
  data () {
    return {
      client: null,
      layouter: null,
      media: [],
      playurl: '',
      liveAssets,
      playerHeight: 0,
      photos: [
        'http://zajy-public-test.oss-cn-beijing.aliyuncs.com/banner/1575439683969660.png',
        'http://zajy-public-test.oss-cn-beijing.aliyuncs.com/banner/1575439683969660.png',
        'http://zajy-public-test.oss-cn-beijing.aliyuncs.com/banner/1575439683969660.png'
      ]
    }
  },
  components: {
    UserCard,
    Gallery,
    Avatar,
    GpsIcon
  },
  props: {
    zhiaiRoomid: {
      type: String,
      default: ''
    },
    agoraChannelName: {
      type: String,
      default: ''
    },
    agoraChannelToken: {
      type: String,
      default: ''
    },
    agoraChannelAccount: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('Room', [
      'onlineUserMap',
      'onlineGuestUserMap'
    ]),
    allUserMap () {
      return Object.assign(this.onlineUserMap, this.onlineguestUserMap)
    }
  },
  methods: {
    initLayouter () {
      const systemInfo = uni.getSystemInfoSync()
      this.layouter = new Layouter(systemInfo.windowWidth, systemInfo.windowHeight / 2)
      this.playerHeight = systemInfo.windowHeight / 2
    },
    addMedia (mediaType, uid, url, options) {
      let media = this.media || []

      media.push({
        key: options.key,
        rotation: options.rotation,
        type: mediaType,
        uid: uid,
        url,
        left: 0,
        top: 0,
        width: 0,
        height: 0
      })

      this.media = this.syncLayout(media)
      console.log(media)
    },
    removeMedia (uid) {
      let media = this.media || []
      media = media.filter(item => item.uid !== uid)
      this.media = this.syncLayout(media)
    },
    updateMedia (uid, options) {
      let media = this.media || []

      const updatedIndex = media.findIndex(item => item.uid === uid)

      if (updatedIndex !== -1) {
        media[updatedIndex] = Object.assign(media[updatedIndex], options)
      }

      this.media = media
    },
    syncLayout (media) {
      let sizes = this.layouter.getSize(media.length)
      return media.map((item, index) => {
        const size = sizes[index]
        item.left = parseFloat(size.x).toFixed(2)
        item.top = parseFloat(size.y).toFixed(2)
        item.width = parseFloat(size.width).toFixed(2)
        item.height = parseFloat(size.height).toFixed(2)
        return item
      })
    },
    initAgoraChannel () {
      return new Promise((resolve, reject) => {
        this.client = new AgoraMiniappSDK.Client()
        this.client.setRole('audience')
        this.subscribeEvents(this.client)
        this.client.init(CONFIG.AGORA_APPID, () => {
          console.log('client init success')

          console.log(this.agoraChannelToken, this.agoraChannelName, this.agoraChannelAccount)
          this.client.join(this.agoraChannelToken, this.agoraChannelName, this.agoraChannelAccount, () => {
            console.log('client join channel success')
            resolve()
          }, error => {
            console.log('client join channel failed')
            console.log(error)
            reject(error)
          })
        }, error => {
          console.log('client init failed')
          console.log(error)
          reject(error)
        })
      })
    },
    subscribeEvents (client) {
      // stream-added
      client.on('stream-added', event => {
        console.log(event)
        let uid = event.uid
        const ts = new Date().getTime()

        client.subscribe(uid, (url, rotation) => {
          console.log(url)
          let media = this.media || []
          const matchItem = media.find(item => item.uid === uid)

          if (!matchItem) {
            this.addMedia(1, uid, url, {
              key: ts,
              rotation
            })
          } else {
            this.updateMedia(matchItem.uid, {
              url,
              key: ts
            })
          }
        })
      }, error => {
        console.log(`stream subscribed failed ${error}`)
      })
      // stream-removed
      client.on('stream-removed', event => {
        console.log(event)
        event.uid.forEach(id => {
          this.removeMedia(id)
        })
      })
      // update-url
      client.on('update-url', event => {
        console.log(event)
        const { uid, url } = event
        const ts = new Date().getTime()
        this.updateMedia(uid, {
          url,
          key: ts
        })
      })
    },
    openUserCard (uid) {
      // 暂时取消细节功能
      // this.$refs.userCard.open(uid)
    },
    initRoomInfo () {
      fly.post(paths.live.getLiveRoomInfo, {
        liveRoomId: this.zhiaiRoomid,
        viewer: '1'
      }).then(res => {
        console.log(res)
      })
    },
    destroy () {
      console.log('destroy live')
      this.client.leave()
      this.client.destroy()
    }
  },
  onReady () {
    this.initRoomInfo()
    this.initLayouter()

    // this.media = this.layouter.getSize(1)
    // console.log(this.media)

    this.initAgoraChannel().then(() => {
      console.log('进入直播间成功')
    }).catch(error => {
      console.log('进入直播间失败')
      uni.showToast({
        title: `${error.code}: 直播间初始化失败, 请退出重试`
      })
    })
  },
  beforeDestroy () {
    this.destroy()
  },
  mounted () {
  }
}
</script>
<style lang="scss" scope>
.x-player {
  .sofa {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 30rpx;
    font-size: 28rpx;
    color: #FFF;
    text-align: center;
    width: 50%;
    top: 0;
    left: 50%;
    box-sizing: border-box;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    .sofa-content {
      text-align: center;
    }
  }
  .gallery {
    position: absolute;
    font-size: 28rpx;
    color: #FFF;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
  }

  .live-player {
    position: absolute;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    .user-info {
      display: flex;
      position: absolute;
      left: 50rpx;
      bottom: 10rpx;
      height: 88rpx;
      background-image: linear-gradient(-90deg, rgba(14, 18, 27, 0) 0%, rgba(13, 19, 31, 0.32) 27%, rgba(11, 23, 42, 0.6) 46%, rgba(10, 26, 50, 0.7) 100%);
      .avatar-comp {
        display: inline-block;
        margin-left: -40rpx;
      }
      .info {
        font-size: 24rpx;
        color: #FFF;
        padding-left: 15rpx;
        padding-top: 5rpx;
        .name {
          font-size: 32rpx;
        }
        .desc {
          .item {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10rpx;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }
}
</style>
