<template lang="pug">
  view.vip-header-info-card
    view.header-img
      image(:src="userHeaderImgUrl ? userHeaderImgUrl: defaultHeaderBoy")
    view.middle-right
      view.articles
        view.user-name {{vipUserInfo.nickName ? vipUserInfo.nickName : '用户' + vipUserInfo.uuid}}
        view.user-rank(v-if="vipUserInfo.isVip ==='1'")
          level(:level="vipUserInfo.userLevel")
        view.gps-position
          gps-icon(:city="vipUserInfo.isGpsOpen === '1' ? vipUserInfo.gpsCity : '未知'", :trust="vipUserInfo.isGpsOpen === '1'")
        view.vip-validity(v-if="vipUserInfo.isVip ==='1'") 会员期至 {{expireDate}}
      view.vip-status
        view.vip-status-no-open(v-if="vipUserInfo.isVip ==='0'") 未开通
        view.vip-status-renew(v-if="vipUserInfo.isVip ==='1'", :style="{'margin-left':validity === true ? '10rpx':'20rpx'}") 续费
</template>
<script>
import GpsIcon from '@/components/gps-icon'
import Level from '@/components/level'
import domains from '@/config/domains'
const { oss } = domains
export default {
  components: {
    GpsIcon,
    Level
  },
  data () {
    return {
      validity: true,
      defaultHeaderBoy: oss + '/ic_common_default_head_man.png',
      defaultHeaderGirl: oss + '/ic_common_default_head_woman@2x.png'
    }
  },
  props: {
    vipUserInfo: {
      type: Object
    },
    userHeaderImgUrl: {
      type: String
    },
    expireDate: {
      type: String
    }
  }
}
</script>
<style lang="scss">
  .vip-header-info-card {
    display: flex;
    align-items: center;
    padding-left: 10rpx;
    .header-img {
      width: 90rpx;
      height: 90rpx;
      border-radius: 20rpx;
      margin: 0 14rpx 0 0;
      image {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
      }
    }
    .middle-right {
      display: flex;
      align-items: center;
      .articles {
        display: flex;
        flex-wrap: wrap;
        width: 430rpx;
        .user-name {
          margin: 0 14rpx 0 0;
        }
        .user-rank {
          width: 60rpx;
          height: 54rpx;
          image {
            width: 66rpx;
            height: 68rpx;
          }
        }
        .gps-position {
          margin-left: 4rpx;
        }
        .vip-validity{
          font-size: 20rpx;
          color: #c3c2c3;
        }
      }
      .vip-status-no-open {
        font-size: 24rpx;
        color: #b8bbc4;
        margin-left: -4rpx;
      }
      .vip-status-renew {
        font-size: 24rpx;
        color: #d5ad79;
      }
    }
  }
</style>
