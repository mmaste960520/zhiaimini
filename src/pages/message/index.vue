<template lang="pug">
  div.message.x-background
    web-view(src="https://zhiai.live/app-pages/downApp.html")
    //- div.wrap
    //-   div.coming-soon
    //-     p.text 请去app里查看消息内容
</template>
<script>
export default {
  name: 'message',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.wrap {
  height: 97vh;
  margin: 8rpx 32rpx 0;
  background: #f3f3f5;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .coming-soon {
    font-size: 30rpx;
    color: rgb(92, 94, 98);
    text-align: center;
    margin-top: -200rpx;
    &:before {
      content: '';
      display: block;
      width: 520rpx;
      height: 520rpx;
      background-image: url($oss-path + '/ic_common_lack_style_19@2x.png');
      background-size: cover;
    }
    .text {
      margin-top: -154rpx;
    }
  }
}
</style>
