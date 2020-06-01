<template lang="pug">
  view.gender
    view.gentleman(@click="cardClick('男')")
      view.gentleman-header-img
        img(:src="headerImg.gentleman")
      view.remark()
        view.boler BOY
        view.sex 男性
    view.lady(@click="cardClick('女')")
      view.lady-header-img
        img(:src="headerImg.lady")
      view.remark
        view.boler GIRL
        view.sex 女性
</template>
<script>
import domains from '@/config/domains'
const { oss } = domains
export default {
  data () {
    return {
      headerImg: {
        gentleman: oss + '/ic_login_default_head_man_choice.png',
        lady: oss + '/ic_login_default_head_woman_choice.png'
      },
      borderChange: true
    }
  },
  methods: {
    cardClick (gender) {
      this.$emit('cardClick', gender)
    }
  }
}
</script>
<style lang="scss">
  .gender {
    margin: 0 68rpx 0 68rpx;
    .gentleman {
      width: 552rpx;
      height: 245rpx;
      border-radius: 24rpx;
      background: #e9eaee;
      border: 3rpx solid transparent;
      margin: 40rpx 0 56rpx 0;
      display: flex;
      justify-content: space-around;
      .gentleman-header-img {
        margin: 44rpx 0 35rpx 70rpx;
        img {
          width: 166rpx;
          height: 166rpx;
          border-radius: 40rpx;
        }
      }
    }
    .lady,
    .gentleman {
      .remark {
        margin: 74rpx 185rpx 79rpx 55rpx;
        .boler {
          font-size: 36rpx;
          color: rgb(81,153,234);
          margin: 0 0 18rpx 0;

        }
        .sex {
          font-size: 32rpx;
          color: rgb(38,52,89);
        }
      }
    }
    .lady {
      width: 552rpx;
      height: 245rpx;
      border-radius: 24rpx;
      border: 1rpx solid transparent;
      background: #e9eaee;
      margin: 0 0 56rpx 0;
      display: flex;
      justify-content: space-around;
      .lady-header-img {
        margin: 44rpx 0 35rpx 70rpx;
        img {
          width: 166rpx;
          height: 166rpx;
          border-radius: 40rpx;
        }
      }
      .remark {
        .boler {
          color: rgb(227,88,144);
        }
      }
    }
    .gentleman:active {
      border: 3rpx solid #deb175;
      background: #f3f7fd;
    }
    .lady:active {
      border: 3rpx solid #deb175;
      background: #fcf2f4;
    }
  }
</style>
