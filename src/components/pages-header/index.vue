<template lang="pug">
  view.header-box(:class="{transparent: transparent}")
    view.header(:style="statusBarHeight")
      view.go-back(v-if="text", @click="goBack")
        image.image(:src="gobackImg")
        text.text {{text}}
      view.title(v-if="title", :style="titleStyle")
        text.text {{title}}
      view(v-if="selectType").selectBtn
        text.text(
          v-for="(item,index) in selectType",
          :key="index", @click="selectTab(index)",
          :class="selectIndex===index?'selected': ''"
        ) {{item.type}}
          text.dot-icon(v-if="item.hint")
</template>
<script>
import { getHeaderInfo } from '@/utils/browserInformation'
export default {
  name: 'index',
  computed: {
    statusBarHeight () {
      return `height:${this.cBarTitleHeight}px; padding-top:${this.cBarTitlePaddingTop}px`
    }
  },
  props: {
    text: String,
    goBackPath: String,
    goBackPathType: {
      type: String,
      default: 'tab' // page || tab
    },
    selectType: Array,
    title: String,
    titleStyle: String,
    paddingTop: Number,
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      gobackImg: require('./images/grzliconfanhu.png'),
      selectIndex: 0,
      custom: uni.getMenuButtonBoundingClientRect(), // 胶囊位置
      cBarTitleHeight: 68,
      cBarTitlePaddingTop: 20
    }
  },
  methods: {
    selectTab (i) {
      this.selectIndex = i
      this.$emit('tabChange', i)
    },
    goBack () {
      if (this.goBackPath && this.goBackPathType === 'page') {
        uni.redirectTo({
          url: this.goBackPath
        })
      } else if (this.goBackPath && this.goBackPathType === 'tab') {
        uni.switchTab({
          url: this.goBackPath
        })
      } else {
        uni.navigateback()
      }
    }
  },
  created () {
    this.cBarTitleHeight = getHeaderInfo().cBarTitleHeight
    this.cBarTitlePaddingTop = getHeaderInfo().cBarTitlePaddingTop
  }

}
</script>
<style lang="scss">
.header-box{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1024;
  background-color: #253358;
  &.transparent {
    background-color: transparent;
  }
}
.header {
  box-sizing: border-box;
  color: #fff;
  font-size: 30rpx;
  position: relative;
  .go-back{
    width: 159rpx;
    line-height: 64rpx;
    background: rgba(0, 0, 0, .2);
    border-radius: 32rpx;
    border: solid 1rpx rgba(255, 255, 255, .2);
    padding-left: 28rpx;
    box-sizing: border-box;
    position: absolute;
    left: 12rpx;
    bottom: 15rpx;
    .image{
      display: inline-block;
      width: 34rpx;
      height: 46rpx;
      vertical-align: middle;
    }
  }
  .title{
    line-height: 110rpx;
    text-align: center;
  }
  .selectBtn{
    line-height: 50rpx;
    position: absolute;
    left: 12rpx;
    bottom: 15rpx;
    color: rgba(255, 255, 255, .7);
    .text{
      font-size: 28rpx;
      display: inline-block;
      padding: 0 20rpx;
      background-color: rgba(255, 255, 255, .1);
      border-radius: 25rpx;
      margin: 0 20rpx;
      position: relative;
      .dot-icon{
        display: inline-block;
        height:24rpx;
        width: 24rpx;
        border-radius: 50%;
        padding: 0;
        margin: 0;
        background: #f52859;
        position: absolute;
        top: -10rpx;
        right: -20rpx;;
      }
    }
    .selected {
      line-height: 60rpx;
      font-size: 34rpx;
      font-weight: 600;
      text-shadow: 0 4rpx 10rpx 0
      rgba(16, 23, 39, 0.4);
      background-image: linear-gradient(#f1c28c, #fce6bd);
      -webkit-background-clip: text;
      color: transparent;
      background-color: rgba(255, 255, 255, .1);
      box-shadow: 0 10rpx 20rpx 0 rgba(10, 17, 27, .1);
      border-radius: 30rpx;
    }
  }
}

</style>
