<template lang="pug">
view.gift-card-background.x-background
  view.gift-card
    banner(bannerDataType = 4)
    view.recharge-service
      view.current-gift-ticket
        text.tip 礼品券
        text.count {{currentCountTicket}}
      view.number-list
        view.item(:class="{selected: curCardIndex === index}", @click="select(index)", v-for="(item, index) in rechargeItems", :key="index")
          view.top {{item.tips}}礼品券
          view.bottom {{item.money}}元
      view.appliy(@click="payNow") 立即支付
      view.bottom-notice
        text.unfocus 充值即同意
        text.jump-notice(@click="rechargeServiceAgree") 挚爱佳缘充值服务协议
</template>
<script>
import fly from 'fly'
import PageButton from '@/components/page-button'
import Banner from '@/components/banner'
import pay from '@/utils/pay'
import path from '../../config/paths'
// import appPages from '@/config/app-pages'
export default {
  components: {
    PageButton,
    Banner
  },
  data () {
    return {
      currentCountTicket: 0,
      // 默认选中充值卡
      curCardIndex: 0,
      rechargeItems: [
        { tips: '30', money: 10 },
        { tips: '60', money: 20 },
        { tips: '150', money: 50 },
        { tips: '300', money: 100 },
        { tips: '1500', money: 500 },
        { tips: '6000', money: 2000 }
      ],
      uuid: ''
    }
  },
  methods: {
    select (index) {
      this.curCardIndex = index
    },
    payNow () {
      if (this.curCardIndex === -1) {
        console.log('please')
        return
      }
      pay({
        orderContent: `{"userId":"${this.uuid}","balance":"1","orderId":""}`,
        totalFee: this.rechargeItems[this.curCardIndex].money,
        payScenario: '1',
        payType: 'wxmini',
        orderType: '5'
      }).then(data => {
        if (data.data.rsCode === '200') {
          this.updateGiftCard()
        }
      })
    },
    updateGiftCard () {
      fly.post(path.user.updateGiftCard, {
        userId: uni.getStorageSync('uuid')
      }).then(data => {
        console.log(data)
        if (data.data.rsCode === '200') {
          this.currentCountTicket = data.data.rsObject.coinBalance
        }
      })
    },
    rechargeServiceAgree () {
      uni.navigateTo({
        url: '/pages/web-view/index?url=http://zhiai.live/app-pages/protocols.html#/' + 'pay'
      })
    }
  },
  onShow () {
    this.updateGiftCard()
    this.uuid = uni.getStorageSync('uuid')
  }
}
</script>
<style lang="scss">
.gift-card-background {
  padding: 0rpx 32rpx 32rpx;
  .gift-card {
    padding: 20rpx 0 0 0;
    box-sizing: border-box;
    .recharge-service {
      min-height: 925rpx;
      margin: 20rpx 0 0 0rpx;
      padding: 54rpx 0 40rpx 0;
      box-sizing: border-box;
      background: #fff;
      border-radius: 20rpx;
      .current-gift-ticket {
        padding-left: 43rpx;
        margin-bottom: 55rpx;
        text {
          display: inline-block;
          color: #da9d56;
        }
        .tip {
          font-size: 38rpx;
          margin-right: 8rpx;
        }
        .count {
          font-size: 28px;
        }
      }
      .number-list {
        padding: 0 43rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 30%;
          height: 130rpx;
          box-sizing: border-box;
          padding: 22rpx 0 0 0;
          margin-bottom: 30rpx;
          border-radius: 20rpx;
          background: #efeff1;
          text-align: center;
          &.selected {
            border-radius: 20rpx;
            background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
          }
          .top {
            color: #101727;
            font-size: 28rpx;
            margin-bottom: 18rpx;
          }
          .bottom {
            color: #5b5b65;
            font-size: 24rpx;
          }
        }
      }
      .appliy {
        margin: 220rpx auto 0;
        width: 406rpx;
        height: 72rpx;
        color: #4f2f0c;
        line-height: 72rpx;
        text-align: center;
        border-radius: 36rpx;
        background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
      }
      .bottom-notice {
        margin-top: 40rpx;
        text-align: center;
        text {
          display: inline-block;
          font-size: 20rpx;
          color: #b3b4b7;
        }
        .jump-notice {
          margin-left: 8rpx;
          color: #c99345;
        }
      }
    }
  }
}
</style>
