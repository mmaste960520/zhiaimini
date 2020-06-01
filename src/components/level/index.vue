<template lang="pug">
span.level-icon(v-if="Number(level) > 0", :style="{BackgroundImage: 'url(' + levelPic + ')'}")
</template>
<script>
import domains from '@/config/domains'

export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  computed: {
    levelPic () {
      return `${domains.oss}/me_icon_level${this.level}.png`
    }
  }
}
</script>
<style lang="scss" scope>
$size: 60rpx;

.level-icon {
  display: inline-block;
  width: $size;
  height: $size;
  vertical-align: middle;
  background-size: cover;
}
</style>
