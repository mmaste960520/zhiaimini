<template lang="pug">
  view.small-card
    text.card-type {{cardType}}
    text.card-number {{cardNumber}}
    text.purchase(v-if="showPurchase === 1", @click="toPurchaseCard", :style="{ 'margin-left': cardNumber !== '0' ? '124rpx':'246rpx' }") 获取礼品券
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toPurchaseCard () {
      uni.navigateTo({
        url: '/pages/gift-card/index'
      })
    }
  },
  props: {
    cardType: String,
    cardNumber: String,
    showPurchase: Number
  }
}
</script>
<style lang="scss">
  .small-card {
    width: 634rpx;
    height: 120rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 0 21rpx;
    border-radius: 20rpx;
    background: #e7e8ea;
    text {
      color: #e1a45a;
      display: inline-block;
    }
    .card-type {
      font-size: 32rpx;
      margin: 0 22rpx 0 0;
    }
    .card-number {
      font-weight: bold;
      font-size: 46rpx;
    }
    .purchase {
      width: 204rpx;
      height: 56rpx;
      font-size: 28rpx;
      line-height: 56rpx;
      text-align: center;
      background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
      border-radius: 36px;
      color: #714210;
    }
  }
</style>
