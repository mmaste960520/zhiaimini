<template lang="pug">
  view.online-list
    span.count {{ onlineList.length }}
    view.list
      online-avatar.item(
        v-for="(item, index) in onlineList",
        :key="index",
        :gender="item.gender",
        :is-guard="item.isGuard",
        :avatar="item.avatar"
      )
</template>
<script>
import OnlineAvatar from './online-avatar.vue'

export default {
  data () {
    return {
    }
  },
  props: {
    onlineList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    OnlineAvatar
  }
}
</script>
<style lang="scss" scope>
.online-list {
  display: flex;
  flex-wrap: nowrap;
  height: 68rpx;
  line-height: 68rpx;
  margin-bottom: 12rpx;
  white-space: nowrap;
  border-radius: 30rpx 0 0 30rpx;
  background-image: linear-gradient(90deg, #587189 10%, rgba(255, 255, 255, 0) 40%);
  .count {
    font-size: 22rpx;
    vertical-align: middle;
    color: #ffe199;
    margin: 0 20rpx;
    &:before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 35rpx;
      height: 35rpx;
      background-size: cover;
      background-image: url($oss-path + '/ic_live_room_number_style_1.png');
    }
  }
  .list {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      margin-right: 10rpx;
      vertical-align: middle;
    }
  }
}
</style>
