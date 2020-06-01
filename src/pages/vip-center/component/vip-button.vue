<template lang="pug">
  view.vip-button {{buttonContent}}
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    buttonContent: {
      type: String
    }
  }
}
</script>
<style lang="scss">
  .vip-button {
    width: 408rpx;
    height: 72rpx;
    font-size: 32rpx;
    color: rgb(113,66,16);
    text-align: center;
    line-height: 72rpx;
    margin: 0 auto ;
    border-radius: 36rpx;
    background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
  }
</style>
