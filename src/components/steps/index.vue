<template lang="pug">
  view.steps
    view.step(
      v-for="(step, index) in steps",
      :key="index",
      :class="{active: step}"
    )
</template>
<script>
export default {
  computed: {
    steps () {
      const steps = []
      for (let i = 0; i < this.total; i++) {
        steps.push(i < this.step)
      }
      return steps
    }
  },
  props: {
    step: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 3
    }
  }
}
</script>
<style lang="scss" scope>
.steps {
  text-align: center;
  .step {
    position: relative;
    display: inline-block;
    width: 22rpx;
    height: 22rpx;
    margin-left: 60rpx;
    background-color: #dbdbdf;
    border-radius: 50%;
    &:before {
      content: '';
      position: absolute;
      display: inline-block;
      top: 10rpx;
      right: 22rpx;
      height: 2px;
      width: 60rpx;
      background-color: #dbdbdf;
    }
    &:first-child {
      margin-left: 0;
      &:before {
        display: none;
      }
    }
    &.active,
    &.active:before {
      background-color: #deb175;
    }
  }
}
</style>
