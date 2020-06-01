<template lang="pug">
  view.online-avatar(:class="[gender, {'is-guard': isGuard}]")
    img.avatar-img(:src="avatar")
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['man', 'woman'].indexOf(value) !== -1
      }
    },
    isGuard: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scope>
$avatar-size: 60rpx;

.online-avatar {
  position: relative;
  display: inline-block;
  padding: 2rpx;
  width: $avatar-size;
  height: $avatar-size;
  border-radius: 50%;
  &.man {
    background: linear-gradient(-30deg, #4ee6ff 0%, #2cfff5 67%);
  }
  &.woman {
    background: linear-gradient(-30deg, #ea3f80 0%, #ff9b5e 100%);
  }
  &.is-guard:after {
    position: absolute;
    content: '';
    display: block;
    right: -6rpx;
    bottom: -6rpx;
    width: 35rpx;
    height: 35rpx;
    background-size: cover;
    background-image: url($oss-path + '/ic_live_guard_small_style_1.png');
  }
  .avatar-img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
