<template lang="pug">
view.vip-container.x-background
  view.vip-center
    vip-header-info-card.vip-header-info-card(:vipUserInfo = "vipUserInfo", :userHeaderImgUrl = "userHeaderImgUrl", :expireDate = "expireDate")
    view.serious-purchase-card
      view(v-for="(item, index) in seriousPurchaseCard", :key="index", :class="currentIndex === index ? 'selected-list' : 'list-vip'", @click="selectCard(index)")
        view.card-type {{item.cardName}}
        view.original-price (原{{item.price}}元)
        view.rank-price(v-for="(item, indexRank) in item.displayDataList", :key="indexRank")
          level-item(:text="item", :level="indexRank +1", :userLevel="vipLevel")
        view.curren-price
          text.dollar ￥
          view {{item.discountPrice}}
        view(:class="currentIndex === index ? 'selected-icon' : 'unseletced-icon'")
    view.vip-button
      vip-button(v-if="vipUserInfo.isVip ==='0'",buttonContent="立即开通", @click.native="showModal")
      vip-button(v-if="vipUserInfo.isVip ==='1'", buttonContent="立即续费", @click.native="showModal")
    view.vip-privilege
      view.title 会员特权
      view.container
        view.list(v-for="(item, index) in listItem", :key="index", @click="toVipAuthority(index)")
          view.icon
            image(:src="item.icon")
          view.words {{item.words}}
    view.background-screen(v-if="showModalStatus")
    view.bottom-toast(:animation="animationData", v-if="showModalStatus")
      view.top-handler
        view.selected-methods 请选择支付方式
        view.close
          image(:src="closeIcon", @click="hideModal")
      view.methods(v-for="(payMethod, index) in payMethods", :class="payMethod.className", @click="choosePayMethod(index)", :key="index")
        view.tip
          view.icon
            image(:src= "payMethod.icon")
          view.words(:class="{'noenough-set-grey' : isGiftEnough=== false && index === 0}") {{ payMethod.name }}
            text.gift-card-noenough(v-if="isGiftEnough === false && index === 0") (余额不足)
        view(:class="{'selected-status': index === currentPayMethod, 'unselected-status' : index !== currentPayMethod, 'set-grey' : isGiftEnough=== false && index === 0 }", @click="choosePayMethod(index)")
      view.vip-button-purchase
        vip-button(buttonContent="确认支付", @click.native="pay")
</template>
<script>
import fly from 'fly'
import VipHeaderInfoCard from './component/vip-header-info-card'
import VipButton from './component/vip-button'
import LevelItem from './component/level-item'
import GpsIcon from '@/components/gps-icon'
import domains from '@/config/domains'
import path from '../../config/paths'
// import appPages from '@/config/app-pages'
import pays from '@/utils/pay'
const { oss } = domains
export default {
  components: {
    VipHeaderInfoCard,
    VipButton,
    GpsIcon,
    LevelItem
  },
  data () {
    return {
      hideFlag: true, // true-隐藏 false-显示
      animationData: {},
      // 控制弹性显示
      showModalStatus: false,
      closeIcon: oss + '/ic_live_close_style_4.png',
      selectedIcon: oss + '/ic_common_members_select_1.png',
      listItem: [
        { icon: oss + '/ic_me_news_style_3@2x.png', words: '解锁消息发送', id: 1 },
        { icon: oss + '/ic_me_live_style_3@2x.png', words: '免费畅享直播', id: 2 },
        { icon: oss + '/ic_me_member_style_3@2x.png', words: '专属会员标识', id: 3 },
        { icon: oss + '/ic_me_head_portrait_style_3@2x.png', words: '更多头像展示', id: 4 },
        { icon: oss + '/ic_me_screen_style_3@2x.png', words: '更多筛选条件', id: 5 },
        { icon: oss + '/ic_me_Photo_style_3@2x.png', words: '照片批量上传', id: 6 }
      ],
      status: 'open',
      payMethods: [
        {
          className: 'gift-card',
          key: '4',
          name: '礼品券',
          icon: oss + '/new-ic_common_payment_devotion_value@2x.png'
        },
        {
          className: 'weixin',
          key: '5',
          name: '微信',
          icon: oss + '/new-ic_common_payment_wechat@2x.png'
        }
      ],
      seriousPurchaseCard: [],
      vipUserInfo: {},
      userHeaderImgUrl: '',
      cityName: '',
      isGPS: '',
      userLevel: '1',
      // 会员等级
      vipLevel: 0,
      // 支付方式
      currentPayMethod: -1,
      // 当前用户账户礼品券余额
      currentCountTicket: 0,
      // 当前vipcard价格
      currentVipCardMoney: 0,
      // 当前vipcard下表 默认会员卡
      currentIndex: 0,
      expireDate: '',
      uuid: '',
      vipCardId: ''
    }
  },
  computed: {
    isGiftEnough () {
      const curCardMoney = this.seriousPurchaseCard[this.currentIndex] ? this.seriousPurchaseCard[this.currentIndex].discountPrice : 0
      return this.currentCountTicket > curCardMoney
    }
  },
  watch: {
    isGiftEnough (newval, oldval) {
      // 礼品券是否充足
      if (newval) {
        this.currentPayMethod = 0
        this.currentVipCardMoney = this.seriousPurchaseCard[this.currentIndex].discountPrice
      }
      if (!newval) {
        this.currentPayMethod = 1
        this.currentVipCardMoney = this.seriousPurchaseCard[this.currentIndex].discountPrice
      }
    }
  },
  methods: {
    selectCard (index) {
      this.currentIndex = index
    },
    choosePayMethod (index) {
      if (!this.isGiftEnough && index === 0) {
        return
      }
      this.currentPayMethod = index
    },
    pay () {
      const orderType = this.payMethods[this.currentPayMethod].key
      const payTypeMap = {
        4: 'zhiai',
        5: 'wxmini'
      }
      pays({
        // cardId: 对应会员卡 id
        orderContent: `{"userId":"${this.uuid}","realUserId":"23840252","orderId":"","cardId": ${this.seriousPurchaseCard[this.currentIndex].id}}`,
        // 4 礼品券 5.微信小程序
        orderType: orderType,
        // 礼品券 :"zhiai"，微信小程序 “wxmini”
        payType: payTypeMap[orderType],
        // 支付金额
        totalFee: this.seriousPurchaseCard[this.currentIndex].discountPrice,
        // 1、充值；2、开通续费
        payScenario: 2
      }).then(data => {
        this.hideModal()
        this.getUserCardInfo()
      }).catch(error => {
        console.log(error)
      })
    },
    toVipAuthority (params) {
      const jumpUrl = encodeURIComponent(`http://zhiai.live/app-pages/member.html#${params}`)
      uni.navigateTo({
        url: `/pages/web-view/index?url=${jumpUrl}`
      })
    },
    showModal () {
      if (this.currentIndex < 0) {
        return
      }
      if (this.currentIndex !== '-1') {
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
      }
    },
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
    },
    // 会员有效期格式化
    vipTimerFotmate (time) {
      var date = new Date(time)
      var len = time.toString().length
      if (len < 13) {
        var sub = 13 - len
        sub = Math.pow(10, sub)
        date = new Date(time * sub)
      }
      var y = date.getFullYear() + '年'
      var M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M) + '月'
      var d = date.getDate()
      d = (d < 10 ? '0' + d : d) + '日'
      return y + M + d
    },
    // 获取用户信息
    getUserInfo () {
      fly.post(path.user.getUserInfo).then(data => {
        if (data.data.rsCode === '200') {
          this.vipUserInfo = data.data.rsObject
          this.vipLevel = Number(data.data.rsObject.userLevel)
          const bucketName = data.data.rsObject.profilePhotoid.split(';')[0]
          const filePath = data.data.rsObject.profilePhotoid.split(';')[1]
          if (bucketName && filePath) {
            fly.post(path.oss.getOssUrl, {
              bucketName: bucketName,
              filePath: filePath
            }).then(data => {
              if (data.data.rsCode === '200') {
                this.userHeaderImgUrl = data.data.rsObject
              }
            })
          }
        }
      })
    },
    // 获取会员卡列表
    getRechargeCardList () {
      fly.post(path.user.getRechargeCardList, {
        userId: uni.getStorageSync('uuid')
      }).then(data => {
        if (data.data.rsCode === '200') {
          this.seriousPurchaseCard = data.data.rsObject
        }
      })
    },
    // 获取会员时效信息
    getUserCardInfo () {
      fly.post(path.user.getUserCardInfo, {
        userIds: uni.getStorageSync('uuid')
      }).then(data => {
        if (data.data.rsCode === '200') {
          this.expireDate = this.vipTimerFotmate(data.data.rsObject[0].expireDate)
        }
      })
    },
    // 获取当前用户礼品券余额
    getBalance () {
      fly.post(path.user.getBalance, {
        userId: uni.getStorageSync('uuid')
      }).then(data => {
        if (data.data.rsCode === '200') {
          this.currentCountTicket = data.data.rsObject.coinBalance / 3
        }
      })
    }
  },
  onShow () {
    this.getUserInfo()
    this.getRechargeCardList()
    this.getUserCardInfo()
    this.getBalance()
    this.uuid = uni.getStorageSync('uuid')
  }
}
</script>
<style lang="scss" scope>
.vip-container {
  padding: 0rpx 32rpx 6rpx;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  .vip-center {
    padding: 56rpx 20rpx 20rpx;
    background: #fff;
    border-radius: 20rpx;
    box-sizing: border-box;
    .serious-purchase-card::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
    .serious-purchase-card {
      overflow-x: auto;
      white-space: nowrap;
      margin: 30rpx 0 0 0;
      padding: 26rpx 0;
      box-sizing: border-box;
      .selected-list {
        width: 179rpx;
        height: 246rpx;
        margin-right: 20rpx;
        border-radius: 12rpx;
        display: inline-block;
        padding: 22rpx 10rpx 10rpx 14rpx;
        position: relative;
        background: url($oss-path + '/bg_common_members_1.png');
        background-size: cover;
        .card-type {
          font-size: 24rpx;
          color: #794932;
          margin: 0 0 4rpx 0;
        }
        .original-price {
          font-size: 20rpx;
          color: #b49882;
          margin-bottom: 8rpx;
          text-decoration:line-through;
        }
        .original-price {
          margin-bottom: 24rpx;
        }
        .rank-price {
          margin-bottom: 4rpx;
        }
        .curren-price {
          color: #7b492e;
          font-size: 38rpx;
          display: flex;
          float: right;
          padding-right: 18rpx;
          margin-top: 8rpx;
          .dollar {
            display: inline-block;
            font-size: 26rpx;
          }
        }
        .selected-icon {
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          top: -20rpx;
          right: -20rpx;
          background: url($oss-path + '/ic_common_members_select_1.png');
          background-size: cover;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .unseletced-icon {
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          top: -20rpx;
          right: -20rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .list-vip {
        width: 179rpx;
        height: 246rpx;
        margin-right: 20rpx;
        border-radius: 12rpx;
        display: inline-block;
        padding: 22rpx 10rpx 10rpx 14rpx;
        position: relative;
        background: url($oss-path + '/bg_common_members_2.png');
        background-size: cover;
        .card-type {
          font-size: 24rpx;
          color: #794932;
          margin: 0 0 4rpx 0;
        }
        .original-price {
          font-size: 20rpx;
          color: #b49882;
          margin-bottom: 8rpx;
          text-decoration:line-through;
        }
        .original-price {
          margin-bottom: 24rpx;
        }
        .rank-price {
          margin-bottom: 4rpx;
        }
        .curren-price {
          color: #7b492e;
          font-size: 38rpx;
          display: flex;
          float: right;
          padding-right: 18rpx;
          margin-top: 8rpx;
          .dollar {
            display: inline-block;
            font-size: 26rpx;
          }
        }
        .selected-icon {
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          top: -20rpx;
          right: -20rpx;
          background: url($oss-path + '/ic_common_members_select_1.png');
          background-size: cover;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .unseletced-icon {
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          top: -20rpx;
          right: -20rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .vip-button {
      margin: 50rpx auto 52rpx;
      width: 406rpx;
      height: 72rpx;
    }
    .vip-privilege {
      .title {
        font-size: 32rpx;
        margin-left: 27rpx;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 40rpx 0 40rpx 0;
        .list {
          width: 200rpx;
          // height: 186rpx;
          box-sizing: border-box;
          padding-bottom: 20rpx;
          .icon {
            width: 60rpx;
            height: 60rpx;
            margin: 28rpx auto 0;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .words {
            color: #676f84;
            font-size: 24rpx;
            text-align: center;
            margin: 30rpx 0 0 0;
          }
        }
        .list:nth-child(1),
        .list:nth-child(2) {
          border-right: 1rpx solid #e7e7e9;
          border-bottom: 1rpx solid #e7e7e9;
        }
        .list:nth-child(4),
        .list:nth-child(5) {
          border-right: 1rpx solid #e7e7e9;
        }
        .list:nth-child(3) {
          border-bottom: 1rpx solid #e7e7e9;
        }
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
      height: 536rpx;
      width: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2000;
      background: #fff;
      padding: 40rpx 56rpx 0 56rpx;
      box-sizing: border-box;
      border-radius: 20rpx 20rpx 0 0;
      .top-handler {
        display: flex;
        align-items: center;
        margin-bottom: 48rpx;
        justify-content: space-between;
        .close {
          width: 40rpx;
          height: 40rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .methods {
        height: 120rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tip {
          display: flex;
          align-items: center;
          .icon {
            width: 80rpx;
            height: 80rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .words {
            height: 31rpx;
            width: 300rpx;
            font-size: 32rpx;
            margin-left: 32rpx;
            .gift-card-noenough {
              display: inline-block;
              margin-left: 12rpx;
            }
          }
          .noenough-set-grey {
            color: #bcbdbf;
          }
        }
        .pay-icon {
          width: 28rpx;
          height: 28rpx;
        }
        .selected-status {
          width: 34rpx;
          height: 34rpx;
          background: url($oss-path + '/ic_common_selector_select_1@2x.png');
          background-size: cover;
        }
        .unselected-status {
          width: 34rpx;
          height: 34rpx;
          background: url($oss-path + '/ic_common_selector_unchecked_1.png');
          background-size: cover;
        }
        .set-grey {
          width: 34rpx;
          height: 34rpx;
          background: grey;
          opacity: 0;
        }
      }
      .vip-button-purchase {
        margin: -8rpx auto 0;
        width: 406rpx;
        height: 72rpx;
      }
      .gift-card {
        border-top: 1rpx solid #f6f6f6;
        border-bottom: 1rpx solid #f6f6f6;
      }
      .weixin {
        border-bottom: 1rpx solid #f6f6f6;
      }
    }
  }
}
</style>
