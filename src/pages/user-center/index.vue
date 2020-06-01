<template lang="pug">
  view.user-center-background.x-background
    view.user-center
      view.user-gender-colour-bar
      view.user-card(v-if="isLogin")
        user-card(:uerCardInfo = "uerCardInfo", :userHeaderImgUrl= "userHeaderImgUrl", :sex="sex")
      view.user-card-unlogin(v-if="!isLogin")
        user-card-unlogin(@click.native="toLogin")
      //- view.charm-progress-bar
      //-   charm-progress-bar(v-if="isLogin", :level="Number(uerCardInfo.charmLevel)", :maxLimit="Number(uerCardInfo.charmNextValue)", :current="Number(uerCardInfo.charm) ? Number(uerCardInfo.charm) : 1")
      //- view.service-items(@click.native="isLogin ? toLogin() : ''")
      //-   user-service-item.user-service-item(:text="item.text", :icon="item.icon", :path=" isLogin === true ? item.path : '' ", v-for="(item, index) in serviceItems", :key="index")
      view.pages-button
        pages-button(content="退出登录", v-if="isLogin", @click.native="exitLoginToast")
      //- 底部弹窗
      //- 屏幕背景变暗的背景
      view.background-screen(v-if="showModalStatus")
      //- 弹出框
      view.bottom-toast(:animation="animationData", v-if="showModalStatus")
        //- 写弹窗里面的逻辑
        view.toast-content 确定要退出登录吗？
        view.cancel-sure
          view.cancel(@click.native="closeToast") 否
          view.sure(@click="exitLoginHandler") 是
      view.color-belt(:class="{'color-belt-boy': sex === '男', 'color-belt-girl' : sex === '女', 'color-belt-boy': isLogin === false }")
</template>
<script>
import fly from 'fly'
import { mapGetters } from 'vuex'
import UserCard from './component/user-info-card'
import UserCardUnlogin from './component/user-info-card-unlogin'
// import CharmProgressBar from './component/charm-progress-bar'
import UserServiceItem from './user-service-item'
import GiftCardShowList from '@/components/gift-card-show-list'
import PagesButton from '@/components/pages-button'
import path from '../../config/paths'
import domains from '@/config/domains'
import appPages from '@/config/app-pages'
import { logout } from '@/utils/account'
const { oss } = domains

export default {
  name: 'center',
  components: {
    UserCard,
    UserCardUnlogin,
    // CharmProgressBar,
    UserServiceItem,
    GiftCardShowList,
    PagesButton
  },
  data () {
    return {
      hideFlag: true, // true-隐藏 false-显示
      animationData: {},
      showModalStatus: false,
      serviceItems: [
        {
          icon: oss + '/ic_me_wallet_style_1@2x.png',
          text: '我的背包',
          path: '/pages/user-package/index?url=/pages/user-package/index'
        },
        {
          icon: oss + '/ic_me_discount_recharge_1@2x.png',
          text: '优惠充值',
          path: '/pages/gift-card/index'
        },
        {
          icon: oss + '/ic_me_vip_style_1@2x.png',
          text: '会员中心',
          path: '/pages/vip-center/index'
        },
        {
          icon: oss + '/ic_me_activity_style_1@2x.png',
          text: '我的活动',
          path: '/pages/web-view/index?url=' + appPages.myActive
        },
        {
          icon: oss + '/ic_me_opinion_feedback_1@2x.png',
          text: '意见反馈',
          path: '/pages/web-view/index?url=' + appPages.feedback
        },
        {
          icon: oss + '/ic_me_account_cancellation_1@2x.png',
          text: '账号注销',
          path: ''
        }
      ],
      sex: '男',
      level: 2,
      maxLimit: 20000,
      current: 9000,
      uerCardInfo: {},
      userHeaderImgUrl: '',
      uuid: ''
    }
  },
  computed: {
    ...mapGetters({
      'isLogin': 'User/isLogin',
      'isVisitor': 'User/isVisitor'
    })
  },
  methods: {
    // 未登录点击那里都是跳转到登录
    toLogin () {
      uni.navigateTo({
        url: '/pages/official-subject-list/index'
      })
    },
    exitLoginToast () {
      this.showModal()
    },
    closeToast () {
      this.hideModal()
    },
    exitLoginHandler () {
      // 退出操作
      logout()
      this.hideModal()
      this.updateUUID()
    },
    showModal () {
      var animation = uni.createAnimation({
        duration: 90,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.animationData = animation.export()
      this.showModalStatus = true
      setTimeout(function () {
        animation.translateY(0).step()
        this.animationData = animation.export()
      }.bind(this), 40)
    },
    hideModal () {
      var animation = uni.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.animationData = animation.export()
      setTimeout(function () {
        animation.translateY(0).step()
        this.animationData = animation.export()
        this.showModalStatus = false
      }.bind(this), 200)
    },
    // 获取当前用户infocard信息
    getUserInfo () {
      fly.post(path.user.getUserInfo).then(data => {
        if (data.data.rsCode === '200') {
          this.uerCardInfo = data.data.rsObject
          this.sex = data.data.rsObject.userSex
          this.userHeaderImgUrl = data.data.rsObject.auditPhotoidURL
          // const bucketName = data.data.rsObject.profilePhotoid.split(';')[0]
          // const filePath = data.data.rsObject.profilePhotoid.split(';')[1]
          // if (bucketName && filePath) {
          //   fly.post(path.oss.getOssUrl, {
          //     bucketName: bucketName,
          //     filePath: filePath
          //   }).then(data => {
          //     if (data.data.rsCode === '200') {
          //       this.userHeaderImgUrl = data.data.rsObject
          //     }
          //   })
          // }
        }
      })
    },
    updateUUID () {
      this.uuid = uni.getStorageSync('uuid')
    }
  },
  onPageShow () {
    const _this = this.$mp.page
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 4
      })
    }
  },
  onShow () {
    this.updateUUID()
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.user-center-background{
  padding: 0rpx 32rpx 32rpx;
  position: relative;
  .user-center {
    box-sizing: border-box;
    padding: 8rpx 32rpx 0;
    position: relative;
    background: #eeeff2;
    border-radius: 20rpx;
    min-height: 97vh;
    .user-card {
      margin-top: 96rpx;
    }
    .user-card-unlogin {
      margin: 120rpx 0 146rpx 0;
    }
    .service-items {
      margin: 70rpx 0 0 0;
      width: 616rpx;
      padding: 36rpx 0 15rpx;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-top: 1rpx solid #e6e7eb;
      margin: 0 auto;
      .user-service-item {
        width: 33.3%;
        margin-bottom: 30rpx;
        border-bottom: 1rpx solid #e6e7eb;
        padding-bottom: 40rpx;
      }
    }
    .charm-progress-bar {
      margin: 16rpx 0 72rpx 0rpx;
    }
    .gift-card-show-list {
      margin-bottom: 150rpx;
    }
    .pages-button {
      margin-top: 120rpx;
      display: flex;
      justify-content: center;
    }
    .background-screen {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.2;
      overflow: hidden;
      z-index: 1000;
      color: #fff;
    }
    /*对话框 */
    .bottom-toast {
      height: 279rpx;
      width: 606rpx;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      margin: auto;
      z-index: 2000;
      background: #fff;
      // padding: 74rpx 56rpx 0 56rpx;
      box-sizing: border-box;
      border-radius: 20rpx;
      .toast-content {
        font-size: 32rpx;
        color: #101727;
        margin: 74rpx auto 74rpx;
        text-align: center;
      }
      .cancel-sure {
        width: 606rpx;
        line-height: 74rpx;
        font-size: 25rpx;
        color: #deb175;
        display: flex;
        justify-content: space-between;
        border-top: 1rpx solid #f6f6f6;
        box-sizing: border-box;
        padding: 0 86rpx;
      }
      .cancel {
        border-right: 1rpx solid #f6f6f6;
        padding-right: 140rpx;
      }
      .sure {
        padding-left: 140rpx;
      }
      .cancel,
      .sure {
        width: 50%;
        text-align: center;
      }
    }
    .color-belt {
      width: 100%;
      height: 60rpx;
      background-image: url($oss-path + '/bg_common_ribbon_male@2x.png');
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    .color-belt-boy{
      width: 100%;
      height: 60rpx;
      background-image: url($oss-path + '/bg_common_ribbon_male@2x.png');
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    .color-belt-girl{
      width: 100%;
      height: 60rpx;
      background-image: url($oss-path + '/bg_common_ribbon_female@2x.png');
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
