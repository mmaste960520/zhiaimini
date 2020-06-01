<template lang="pug">
  view.chat-wrap
    online-list.online-list(:online-list="onlineGuestUserList")
    view.chat-list
      //- chat-item.chat-item(type="notice", msg="即行业短信，通常是由用户主动触发后收到的短信内容或者有明确的发送目标。不带营销字眼。")
      //- chat-item.chat-item(type="bubble", user="Felix", gender="man", :level="1", city="西安")
      //- chat-item.chat-item(type="bubble", user="Dan", gender="woman", :level="2", city="北京")
      //- chat-item.chat-item(type="enter", user="Felix", gender="man", :level="1", city="西安")
      //- chat-item.chat-item(type="at", user="Felix", gender="man", at="Dan", at-gender="woman", msg="哈喽")
      //- chat-item.chat-item(type="text", user="Felix", gender="man", :level="3", city="西安", msg="我今天没吃药")
      //- chat-item.chat-item(type="send-gift", user="Felix", gender="man", gift-name="法拉利", :gift-count="3")
      //- chat-item.chat-item(type="receive-gift", user="Felix", gender="man", gift-name="法拉利", :gift-count="2", receive-user="你")
      //- chat-item.chat-item(type="receive-gift", user="Dan", gender="woman", gift-name="法拉利", :gift-count="1", receive-user="主播")

      chat-item.chat-item(
        v-for="(item, index) in chatList", :key="index",
        :type="item.type",
        :msg="item.msg",
        :user="item.user",
        :gender="item.gender",
        :level="item.level",
        :city="item.city",
        :is-gps-open="item.isGpsOpen",
        :at="item.at",
        :at-gender="item.atGender",
        :gift-name="item.giftName",
        :gift-count="item.giftCount",
        :receive-user="item.receiveUser"
      )
    view.ctrl-area
      button.chat(open-type="launchApp", app-parameter="wechat") 聊天请前往APP
      gifts
      view.apply(@click="updateQueueList") 申请上麦
      button#room-share-btn.share(open-type="share", :data-roomid="liveRoomid") 分享

    view.download
</template>
<script>
import SDK from '@/libs/NIM_Web_SDK_weixin_v7.0.0'
import CONFIG from '@/config/common'
import ChatItem from './chat-item.vue'
import OnlineList from './online-list.vue'
import Gifts from './gifts.vue'
import fieldsMap from './fieldsMap.js'
import { mapState, mapMutations } from 'vuex'

let nim = null
let chatroomInstance = null

export default {
  data () {
    return {
      nim: null,
      chatroom: null,
      updateMembersTimer: null,
      chatList: [],
      account: uni.getStorageSync('accid'),
      token: uni.getStorageSync('accidToken')
    }
  },
  props: {
    yunxinRoomid: {
      type: String,
      default: ''
    },
    liveRoomid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('Room', [
      'onlineUserList',
      'onlineGuestUserList'
    ])
  },
  methods: {
    ...mapMutations('Room', [
      'updateOnlineUserList',
      'updateOnlineGuestUserList'
    ]),
    sendMsg () {
      chatroomInstance.sendText({
        text: 'hello',
        done (error, msg) {
          console.log(error)
          console.log(msg)
        }
      })
    },
    updateMembers () {
      const _this = this
      if (chatroomInstance) {
        chatroomInstance.getChatroomMembers({
          guest: false,
          limit: 100,
          done (error, obj) {
            if (!error) {
              console.log(obj)
              const onlineUserList = obj.members.map(item => {
                const custom = (item.custom && JSON.parse(item.custom)) || {}
                return {
                  chatroomId: item.chatroomId,
                  name: item.nick,
                  avatar: item.avatar,
                  gender: fieldsMap.userSex[custom.userSex] || 'man',
                  isGuard: !!Number(custom.isProtect)
                }
              }).filter(item => item.avatar)
              _this.updateOnlineUserList(onlineUserList)
            }
            console.log(error)
          }
        })
        chatroomInstance.getChatroomMembers({
          guest: true,
          limit: 100,
          done (error, obj) {
            if (!error) {
              console.log(obj)
              const onlineUserList = obj.members.map(item => {
                const custom = (item.custom && JSON.parse(item.custom)) || {}
                return {
                  chatroomId: item.chatroomId,
                  name: item.nick,
                  avatar: item.avatar,
                  gender: fieldsMap.userSex[custom.userSex] || 'man',
                  isGuard: !!Number(custom.isProtect)
                }
              }).filter(item => item.avatar)
              _this.updateOnlineGuestUserList(onlineUserList)
            }
            console.log(error)
          }
        })
      }
    },
    updateQueueList () {
      chatroomInstance.queueList({
        done (error, obj, content) {
          if (error) {
            console.log(error)
            return
          }
          console.log(content)
        }
      })
    },
    onChatroomConnect (obj) {
      console.log('聊天室已连接')
      // 在线用户更新
      this.updateMembers()
      this.updateMembersTimer = setInterval(() => {
        this.updateMembers()
      }, 5000)
    },
    onChatroomError (error, obj) {
      console.log('onChatroomError')
      console.log(error, obj)
    },
    checkChatListLength () {
      if (this.chatList.length > 30) {
        this.chatList.shift()
      }
    },
    // 添加文本消息
    addTextToChatList (msg) {
      this.chatList.push({
        type: 'text',
        user: msg.nickName,
        gender: fieldsMap.userSex[msg.userSex],
        level: Number(msg.userLevel),
        city: msg.gpsCity || msg.liveCity,
        isGpsOpen: !!Number(msg.isGpsOpen),
        msg: msg.message
      })
    },
    // 送礼
    addGiftToChatList ({ userInfo, data }) {
      this.chatList.push({
        type: 'receive-gift',
        giftName: data.giftName,
        giftCount: data.count,
        user: userInfo.sendNick,
        gender: fieldsMap.userSex[userInfo.sendSex],
        receiveUser: userInfo.receiveNick,
        receiveUserGender: fieldsMap.userSex[userInfo.receiveSex]
      })
    },
    // 冒泡
    addBubbleToChatList ({ userInfo, data }) {
      this.chatList.push({
        type: 'bubble',
        user: userInfo.sendNick,
        gender: fieldsMap.userSex[userInfo.sendSex],
        level: Number(userInfo.sendLevel),
        city: userInfo.sendCity,
        isGpsOpen: !!Number(userInfo.sendIsGpsOpen)
      })
    },
    // at
    addAtToChatList ({ userInfo, data }) {
      this.chatList.push({
        type: 'at',
        user: userInfo.sendNick,
        gender: fieldsMap.userSex[userInfo.sendSex],
        at: userInfo.receiveNick,
        atGender: fieldsMap.userSex[userInfo.receiveSex],
        msg: userInfo.message
      })
    },
    // 系统消息
    addNoticeToChatList ({ userInfo, data }) {
      this.chatList.push({
        type: 'notice',
        msg: userInfo.message
      })
    },
    // 进入房间
    addEnterToChatList ({ userInfo, data }) {
      this.chatList.push({
        type: 'enter',
        user: userInfo.sendNick,
        gender: fieldsMap.userSex[userInfo.sendSex],
        level: Number(data.userLevel),
        city: data.liveCity
      })
    },
    onChatroomMsgs (msgs) {
      console.log(msgs)
      msgs.forEach(msg => {
        switch (msg.type) {
          case 'notification': {
            console.log('notice')
            break
          }
          // 文本消息
          case 'text': {
            const msgData = JSON.parse(msg.text)
            this.checkChatListLength()
            this.addTextToChatList(msgData)
            break
          }
          case 'custom': {
            console.log('custom')
            // 解析自定义消息
            const content = JSON.parse(msg.content)
            console.log(content)
            // 消息列表长度检查
            this.checkChatListLength()

            // 1. 礼物
            if (content.messageType === 1) {
              this.addGiftToChatList(content)
            }
            // 2. 冒泡
            if (content.messageType === 2) {
              this.addBubbleToChatList(content)
            }
            // 3: at
            if (content.messageType === 3) {
              this.addAtToChatList(content)
            }
            // 4. 系统
            if (content.messageType === 4) {
              this.addNoticeToChatList(content)
            }
            // 5. 进入房间
            if (content.messageType === 5) {
              this.addEnterToChatList(content)
            }
            // 6. 音视频切换
            if (content.messageType === 6) {
            }
            // 7. 上麦人员变化
            if (content.messageType === 7) {
            }
            // 8. 主播下线
            if (content.messageType === 8) {
            }
            // 9. 直播间设置发生变化
            if (content.messageType === 9) {
            }
            break
          }
          default: {
            console.log('unknow type')
            break
          }
        }
      })
    },
    onChatroomDisconnect (error) {
      console.log(error)
    },
    onChatroomWillReconnect (obj) {
      console.log(obj)
    },
    getChatroomInstance (add) {
      chatroomInstance = SDK.Chatroom.getInstance({
        appKey: CONFIG.YUNXIN_APP_KEY,
        account: this.account,
        token: this.token,
        chatroomId: this.yunxinRoomid,
        chatroomAddresses: add,
        onconnect: this.onChatroomConnect,
        onerror: this.onChatroomError,
        onwillreconnect: this.onChatroomWillReconnect,
        ondisconnect: this.onChatroomDisconnect,
        onmsgs: this.onChatroomMsgs
      })
    },
    onConnect () {
      console.log('云信连接成功')
      console.log(this)
      const vm = this
      nim.getChatroomAddress({
        chatroomId: this.yunxinRoomid,
        done (error, obj) {
          console.log('-----done-----')
          console.log(error)
          console.log(obj)
          vm.getChatroomInstance(obj.address)
        }
      })
    },
    init () {
      const _this = this
      console.log(this)
      nim = SDK.NIM.getInstance({
        appKey: CONFIG.YUNXIN_APP_KEY,
        account: _this.account,
        token: _this.token,
        db: false,
        onconnect: _this.onConnect,
        onwillreconnect (obj) {
          console.log('onwillreconnect...')
          console.log(obj)
        },
        ondisconnect (error) {
          console.log('ondisconnect...')
          console.log(error)
        },
        onerror (error) {
          console.log('onerror...')
          console.log(error)
        }
      })
    },
    destroy () {
      console.log('destroy chatroom')
      chatroomInstance.disconnect()
      nim.destroy()
      clearInterval(this.updateMembersTimer)
    }
  },
  components: {
    ChatItem,
    OnlineList,
    Gifts
  },
  beforeDestroy () {
    this.destroy()
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scope>
.chat-wrap {
  padding: 20rpx;
  box-sizing: border-box;
  .online-list {
    height: 80rpx;
  }
  .chat-list {
    padding-right: 25%;
    height: calc(50vh - 200rpx);
    overflow-y: auto;
    .chat-item {
      display: block;
      margin-bottom: 20rpx;
    }
  }
  .download {
    position: fixed;
    bottom: 130rpx;
    right: 20rpx;
    width: 150rpx;
    height: 150rpx;
    background-size: cover;
    background-image: url($oss-path + '/ic_common_download_app.png');
  }
  .ctrl-area {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    padding:0 20rpx;
    height: 100rpx;
    width: 100vw;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    height: 100rpx;
    color: rgba(255, 255, 255, 0.6);
    .chat {
      font-size: 28rpx;
      display: inline-block;
      text-align: center;
      min-width: 252rpx;
      height: 81rpx;
      line-height: 81rpx;
      border: solid 1px rgba(255, 255, 255, 0.2);
      border-radius: 40rpx;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.1);
    }
    .apply {
      display: inline-block;
      text-align: center;
      width: 139rpx;
      height: 65rpx;
      line-height: 65rpx;
      border-radius: 32rpx;
      background: linear-gradient(-30deg, #34a6e2 0%, #34cbc0 100%);
    }
    .share {
      font-size: 28rpx;
      display: inline-block;
      padding: 0;
      text-align: center;
      width: 159rpx;
      height: 65rpx;
      line-height: 65rpx;
      border-radius: 32rpx;
      color: rgba(255, 255, 255, 0.6);
      background: #5ac53a;
      &:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 10rpx;
        width: 40rpx;
        height: 40rpx;
        background-size: cover;
        background-image: url($oss-path + '/ic_common_qq_style_1.png');
      }
    }
  }
}
</style>
