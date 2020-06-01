<template lang="pug">
  view.avatar(:class="[gender]")
    img.avatar-img(:src="avatar")
    level.level(:level="level")
</template>
<script>
import Level from '@/components/level'

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
    level: {
      type: Number,
      default: 0
    },
    gender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['man', 'woman'].indexOf(value) !== -1
      }
    }
  },
  components: {
    Level
  }
}
</script>
<style lang="scss" scope>
$avatar-size: 80rpx;

.avatar {
  position: relative;
  display: inline-block;
  padding: 4rpx;
  width: $avatar-size;
  height: $avatar-size;
  border-radius: 50%;
  &.man {
    background: linear-gradient(-30deg, #4ee6ff 0%, #2cfff5 67%);
  }
  &.woman {
    background: linear-gradient(-30deg, #ea3f80 0%, #ff9b5e 100%);
  }
  .avatar-img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .level {
    position: absolute;
    right: -18rpx;
    bottom: -14rpx;
  }
}
</style>
