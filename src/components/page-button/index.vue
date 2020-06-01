<template lang="pug">
view.pages-btn(:class="[size, { disabled: disabled }]") {{btnContent}}
  slot
</template>
<script>
export default {
  props: {
    btnContent: String,
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'small'].indexOf(value) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .pages-btn {
    width: 262rpx;
    height: 72rpx;
    font-size: 32rpx;
    color: rgb(113,66,16);
    text-align: center;
    line-height: 72rpx;
    margin: -83rpx auto 0;
    border-radius: 36rpx;
    background: linear-gradient(#f9ca90 30%, #eabb83 60%, #dcab76 100%);
    &.small {
      width: 202rpx;
      height: 56rpx;
      line-height: 56rpx;
      font-size: 20rpx;
      border-radius: 26rpx;
    }
    &.disabled {
      background: #e2e2e2;
    }
    &:active {
      color: #b27e41;
      background: linear-gradient(#ffd6a3 30%, #ffd6a3 60%, #ffd6a3 100%);
    }
  }
</style>
