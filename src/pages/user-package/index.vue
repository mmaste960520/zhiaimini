<template lang="pug">
view.container-package.x-background
  view.user-package
    banner(bannerDataType = 3)
    view.container
      view.base-info
        text.user-name {{userInfo.nickName ? userInfo.nickName : '用户' + userInfo.uuid}}
        view.articles
          view(:class="userInfo.userLevel > 0 ? 'user-rank' : 'hide-rank'")
            level(:level="userInfo.userLevel")
          view.current-gps-position
            gps-icon(:city="userInfo.isGpsOpen === '1' ? userInfo.gpsCity : '未知'", :trust="userInfo.isGpsOpen === '1'")
      view.package-small-card-one
        package-small-card(cardType="礼品券", :cardNumber="giftNumber", showPurchase= 1)
      view.package-small-card-two
        package-small-card(cardType="实物券", :cardNumber="starBalance", showPurchase= 0)
      view.gift-card-show-list
        gift-card-show-list(:giftCardList="cardList")
</template>
<script>
import fly from 'fly'
import path from '../../config/paths'
import Banner from '@/components/banner'
import PackageSmallCard from './component/package-small-card'
import GiftCardShowList from '@/components/gift-card-show-list'
import GpsIcon from '@/components/gps-icon'
import Level from '@/components/level'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    Banner,
    PackageSmallCard,
    GiftCardShowList,
    GpsIcon,
    Level
  },
  data () {
    return {
      level1icon: oss + '/me_icon_level1.png',
      cardList: [],
      giftNumber: '0',
      starBalance: '0',
      userInfo: ''
    }
  },
  onShow () {
    // 获取用户信息
    fly.post(path.user.getUserInfo).then(data => {
      if (data.data.rsCode === '200') {
        this.userInfo = data.data.rsObject
      }
    })
    // 礼物卡包信息
    fly.post(path.user.userPackage).then(data => {
      if (data.data.rsCode === '200') {
        this.cardList = data.data.rsObject.giftCard
      }
    })
    fly.post(path.user.updateGiftCard, {
      userId: uni.getStorageSync('uuid')
    }).then(data => {
      if (data.data.rsCode === '200') {
        this.giftNumber = data.data.rsObject.coinBalance
        this.starBalance = data.data.rsObject.starBalance
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.container-package {
  padding: 20rpx 32rpx 32rpx;
  position: relative;
  box-sizing: border-box;
  .user-package {
    .container {
      min-height: 84vh;
      margin-top: 21rpx;
      background: #fff;
      border-radius: 20rpx;
      padding: 38rpx 26rpx 42rpx;
      box-sizing: border-box;
      .base-info {
        display: flex;
        color: #101727;
        margin: 0 0 20rpx 22rpx;
        .user-name {
          font-size: 40rpx;
          display: inline-block;
          margin-right: 8rpx;
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
            .position {
              width: 60rpx;
              height: 22rpx;;
              font-size: 15rpx;
            }
          }
        }
      }
      .package-small-card-one {
        margin-bottom: 10rpx;
      }
      .gift-card-show-list {
        margin: 50rpx 0 0rpx 0;
      }
    }
  }
}
</style>
