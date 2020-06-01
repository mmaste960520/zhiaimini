<template lang="pug">
span.gps-icon(:class="{trust: trust}") {{ city }}
</template>
<script>
export default {
  props: {
    city: {
      type: String,
      default: ''
    },
    trust: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scope>
.gps-icon {
  display: inline-block;
  font-size: 20rpx;
  color: #333333;
  height: 30rpx;
  padding: 0 10rpx;
  line-height: 30rpx;
  vertical-align: middle;
  border-radius: 8rpx;
  background: linear-gradient(329deg, rgba(181,181,181,1) 0%, rgba(221,221,221,1) 100%);
  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    margin-right: 8rpx;
    width: 20rpx;
    height: 20rpx;
    background-image: url($oss-path + '/me_icon_gpsdz_2.png');
    background-size: cover;
  }
  &.trust {
    color: #FFF;
    background: linear-gradient(329deg, rgba(75,107,245,1) 0%, rgba(210,87,248,1) 100%);
    &:before {
      background-image: url($oss-path + '/me_icon_gpsdz_1.png');
    }
  }
}
</style>
