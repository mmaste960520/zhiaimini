<template lang="pug">
  view.active-card(:style="{ 'background': 'url(' + info.activityUrl + ') no-repeat center center', 'background-size': '100% 100%'}")
    view.bottom-content
      view.content
        view.sub-title {{info.activityName}}
        view.title {{info.activitySubName}}
      view.data-timer(v-if="activityStartTimer") {{activityStartTimer}}
</template>
<script>
export default {
  data () {
    return {
      activityStartTimer: ''
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    activityStartTime () {
      return this.info.activityStartTime
    }
  },
  methods: {
    TimerFotmate (timestamp) {
      const valid = (new Date(timestamp)).getTime() > 0
      if (!valid) {
        return ''
      }
      var date = new Date(timestamp)
      var len = timestamp.toString().length
      if (len < 13) {
        var sub = 13 - len
        sub = Math.pow(10, sub)
        date = new Date(timestamp * sub)
      }
      var y = date.getFullYear() + '.'
      var M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M) + '.'
      var d = date.getDate()
      d = (d < 10 ? '0' + d : d) + ''
      return y + M + d
    }
  },
  created () {
    this.activityStartTimer = this.TimerFotmate(this.activityStartTime)
  }
}
</script>
<style lang="scss">
  .active-card {
    width: 700rpx;
    height: 340rpx;
    border-radius: 28rpx;
    position: relative;
    margin: 40rpx 0 0 0;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
    .bottom-content {
      width: 700rpx;
      height: 104rpx;
      padding: 0 0 0 14rpx;
      display: flex;
      position: absolute;
      bottom: 14rpx;
      .content {
        margin: 20rpx 0 0 12rpx;
        .title,
        .sub-title,
        .title-has-header-img {
          color: #fffffd;
        }
        .title {
          font-size: 20rpx;
          width: 420rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sub-title {
          font-size: 28rpx;
          font-weight: bold;
          margin: 0 0 6rpx 0;
          width: 400rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .data-timer {
        width: 160rpx;
        height: 52rpx;
        text-align: center;
        font-size: 22rpx;
        line-height: 52rpx;
        color: #ebf0f6;
        background: url($oss-path + '/live.png') no-repeat;
        background-size: cover;
        position: absolute;
        right: 36rpx;
        bottom: 20rpx;
        text {
          display: inline-block;
          margin: 0 6rpx 0 0;
        }
        image {
          width: 22rpx;
          height: 22rpx;
          display: inline-block;
        }
      }
    }
  }
</style>
