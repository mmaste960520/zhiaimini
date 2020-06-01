<template lang="pug">
  view.charm-progress-bar(:class=" current > 0 ? 'charm-progress-bar' : 'hide-charm-progress-bar'")
    view.back-img(:class="'level-background' + level")
    view.progress
      view.progress-bar(:style="{width: percentage}", :class="'level-background-size' + level")
    view.number(:class="'level'+level") {{currentShow}}/{{maxLimitShow}}
</template>
<script>
// import domains from '@/config/domains'
// const { oss } = domains
export default {
  data () {
    return {
    }
  },
  props: {
    level: {
      type: Number
    },
    current: {
      type: Number
    },
    maxLimit: {
      type: Number
    },
    currentShow: {
      type: String
    },
    maxLimitShow: {
      type: String
    }
  },
  computed: {
    percentage () {
      return (Math.round(this.current / this.maxLimit * 10000) / 100.00 + '%') // 小数点后两位
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
  .charm-progress-bar {
    display: flex;
    align-items: center;
    .back-img {
      width: 132rpx;
      height: 40rpx;
      line-height: 40rpx;
      margin-right: 8rpx;
    }
    .level-background1 {
      background: url($oss-path + '/ic_common_devotion_level_1@2x.png') no-repeat center;
      background-size: 132rpx 38rpx;
      background-size: cover;
    }
    .level-background2 {
      background: url($oss-path + '/ic_common_devotion_level_2@2x.png') no-repeat center;
      background-size: 80rpx 38rpx;
      background-size: cover;
    }
    .level-background3 {
      background: url($oss-path + '/ic_common_devotion_level_3@2x.png') no-repeat center;
      background-size: 80rpx 38rpx;
      background-size: cover;
    }
    .level-background4 {
      background: url($oss-path + '/ic_common_devotion_level_4@2x.png') no-repeat center;
      background-size: 80rpx 38rpx;
      background-size: cover;
    }
    .level-background5 {
      background: url($oss-path + '/ic_common_devotion_level_5@2x.png') no-repeat center;
      background-size: 80rpx 38rpx;
      background-size: cover;
    }
    .level-background6 {
      background: url($oss-path + '/ic_common_devotion_level_6@2x.png') no-repeat center;
      background-size: 80rpx 38rpx;
      background-size: cover;
    }
    .progress {
      width: 160rpx;
      height: 15rpx;
      border: 1rpx solid #c2c2c2;
      border-radius: 8rpx;
      .progress-bar {
        height: 15rpx;
        border-radius: 8rpx;
      }
      .level-background-size1 {
        background-image: linear-gradient(90deg, rgba(255,94,117,1) 0%, rgba(221,46,114,1) 50%);
        background-size: 200rpx 100%;
      }
      .level-background-size2 {
        background-image: linear-gradient(90deg, rgba(172,32,172,1) 0%, rgba(110,0,173,1) 50%);
        background-size: 200rpx 100%;
      }
      .level-background-size3 {
        background-image: linear-gradient(90deg, rgba(67,82,231,1) 0%, rgba(152,25,195,1) 50%);
        background-size: 200rpx 100%;
      }
      .level-background-size4 {
        background-image: linear-gradient(90deg, rgba(39,169,234,1) 0%, rgba(40,198,223,1) 50%);
        background-size: 200rpx 100%;
      }
      .level-background-size5 {
        background-image: linear-gradient(90deg, rgba(53,104,222,1) 0%, rgba(50,169,240,1) 50%);
        background-size: 200rpx 100%;
      }
      .level-background-size6 {
        background-image: linear-gradient(90deg, rgba(200,115,81,1) 0%, rgba(162,69,29,1) 50%);
        background-size: 200rpx 100%;
      }
    }
    .number {
      margin-left: 14rpx;
      font-size: 24rpx;
      width: 160rpx;
    }
    .level1 {
      color: #e93f71;
    }
    .level2 {
      color: #b402c0;
    }
    .level3 {
      color: #8342ed;
    }
    .level4 {
      color: #28ade9;
    }
    .level5 {
      color: #3883e7;
    }
    .level6 {
      color: #ce6f49;
    }
  }
  .hide-charm-progress-bar {
    display: none;
  }
</style>
