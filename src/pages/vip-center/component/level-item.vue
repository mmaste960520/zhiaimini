<template lang="pug">
  view.level-item(
    :class="{'high-light': userLevel === level, 'disable': userLevel !== level, 'del-line': userLevel > level}"
  ) {{ text }}
</template>
<script>
export default {
  props: {
    level: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    userLevel: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scope>
 .level-item {
   font-size: 22rpx;
 }
  .high-light {
    color: #7a482f;
  }
  .disable {
    color: #b3937c;
  }
  .del-line {
    color: #b3937c;
    text-decoration: line-through;
  }
</style>
