<template lang="pug">
view.gifts
  view.gift-item(
    v-for="gift in giftList",
    :key="gift.giftId",
    :style="{backgroundImage: 'url(' + gift.giftImageUrl + ')'}",
    @click="sendGift(gift.giftId, gift.practicalPrice)"
  )
</template>
<script>
import fly from 'fly'
import paths from '@/config/paths'
// import pay from '@/utils/pay'

export default {
  data () {
    return {
      giftList: []
    }
  },
  props: {
  },
  methods: {
    sendGift (giftId, practicalPrice) {
      console.log(giftId)
      // 暂时去除送礼功能
      return uni.showToast({
        title: '请下载挚爱佳缘 App 使用送礼功能'
      })
      // const orderContent = {
      //   giftId,
      //   targetUserIds: '88800003',
      //   sourceUserId: '88800003',
      //   sceneType: 'live',
      //   sceneValue: '7be08407700543a781bcc158d7bfb568',
      //   giftNum: 1,
      //   subSceneValue: '',
      //   giftOrderId: ''
      // }
      // pay({
      //   orderContent: JSON.stringify(orderContent),
      //   orderType: '5',
      //   payType: 'zhiai',
      //   payScenario: '6',
      //   totalFee: practicalPrice
      // })
    },
    initGiftList () {
      fly.post(paths.gift.getGiftListByArea, {
        liveReginonId: '2'
      }).then(res => {
        console.log(res)
        const { data } = res
        if (data.rsCode === '200') {
          this.giftList = data.rsObject.filter(item => {
            return item.useGift === 'shortcut'
          }).slice(0, 2)
        }
      })
    }
  },
  mounted () {
    this.initGiftList()
  }
}
</script>
<style lang="scss" scope>
.gifts {
  display: inline-block;
  .gift-item {
    display: inline-block;
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    background-size: cover;
    &:first-child {
      margin-right: 7rpx;
    }
  }
}
</style>
