<template lang="pug">
  view.x-background
    view.tabBtn
      span(v-for="(item,index) in titleArray", :key="index", :class="switcherIndex===index?'selected': ''", @click="selected(index)") {{item}}
    view.form
      code-x(v-if="switcherIndex === 0")
      pass-word(v-if="switcherIndex === 1", @codeLogin="codeLoginState")
</template>
<script>
import CodeX from './modules/code'
import PassWord from './modules/pass'
export default {
  name: 'phone-login',
  components: {
    CodeX,
    PassWord
  },
  data () {
    return {
      titleArray: ['手机登陆', '密码登录'],
      switcherIndex: 0
    }
  },
  methods: {
    selected (index) {
      this.switcherIndex = index
    },
    codeLoginState (i) {
      this.switcherIndex = i
    }
  }
}
</script>
<style lang="scss" scoped>
.tabBtn{
  width: 45%;
  line-height: 100rpx;
  padding-left: 92rpx;
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
  color: #ccc;
  .selected{
  transform: scale(1.3);
  color: #ffca86;
  text-shadow: 0px 2px 10px rgba(25, 31, 42, 0.8);
  position: relative;
  &::after{
    content:"";
    width: 26rpx;
    height: 4rpx;
    background-color: #eab785;
    box-shadow: 0 6rpx 10rpx 0
      rgba(96, 84, 75, 0.4);
    border-radius: 2px;
    position:absolute;
    bottom: 15rpx;
    z-index:1;
    left: 45%;
    }
  }
}
.form{
  overflow: hidden;
  padding: 10rpx 26rpx;
}
</style>
