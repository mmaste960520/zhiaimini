<template lang="pug">
  view.wrap.x-background(:style="{paddingTop: bodyPaddingTop}")
    page-header.header(:selectType="displayTabs", @tabChange="switchSubTabs")
    view.show-content-recommend(v-if="tabsIndex === 0")
      view.banner
        banner(bannerDataType = 1)
      view.card
        card.card-list(
          v-for="(item, index) in anchorInfo",
          :key="index",
          :city="item.liveCity.split('-')[0]",
          :nickName="item.nickName",
          :edu="item.userEducation",
          :age="item.userAge",
          :occupation="item.profession.split('|')[0]",
          :height="item.userHeight",
          :salary="item.userMonthIncome",
          :personalizedSignature="item.soliloquy",
          :anchorAvatar="item.profilePhotoidURL",
          :isShowZhiaiValue="item.isShowZhiaiValue",
          :livingImg="item.livingImg",
          :anchorShowImg="anchorShowImg",
          :userLevel="Number(item.userLevel)",
          :gpsCity="item.gpsCity",
          :isGpsOpen="item.isGpsOpen",
          :livingStatus="item.liveState",
          :sex="item.userSex",
          :personalPhotoList= "item.photos",
          :currentLivingUid="item.uuid"
        )
    view.show-personal-dynamic(v-if="tabsIndex === 1")
      view.wrap
        view.coming-soon
          p.text 更多功能正在开发中
          p.text 敬请期待...
</template>
<script>
import fly from 'fly'
import path from '../../config/paths'
import Banner from '@/components/offical-active-banner'
import Card from './component/boutique-recommend'
import PageHeader from '@/components/pages-header'
import { getHeaderInfo } from '@/utils/browserInformation'
export default {
  name: 'boutique-recommend',
  components: {
    Banner,
    Card,
    PageHeader
  },
  data () {
    return {
      anchorInfo: [],
      title: 'Hello!',
      displayTabs: [],
      tabs: ['精选推荐', '个人动态'],
      tabsIndex: 0,
      subTabs: [],
      // 下拉刷新
      hasMoreData: true,
      isRefreshing: false,
      isLoadingMoreData: false,
      defaultLevel: 1,
      pageNum: 1
    }
  },
  computed: {
    subTabsTop () {
      return getHeaderInfo().cBarTitleHeight + 'px'
    },
    bodyPaddingTop () {
      const subTabsHeight = this.subTabs.length ? 20 : 0
      return getHeaderInfo().cBarTitleHeight + subTabsHeight + 'px'
    }
  },
  methods: {
    tabChange (index) {
      console.log(index)
    },
    switchSubTabs (index) {
      this.tabsIndex = index
      if (this.tabsIndex === 0) {
        this.getRecommendUsersInfoList()
      }
      if (this.tabsIndex === 1) {
        uni.navigateTo({
          url: '/pages/message/index'
        })
      }
    },
    selectTab () {
      this.displayTabs = this.tabs.map(item => {
        return {
          type: item
        }
      })
    },
    // 获取推荐游客用户信息列表
    getRecommendUsersInfoList () {
      this.pageNum++
      fly.post(path.user.getRecommendUsersInfoPage, {
        liveVideo: 1,
        index: this.pageNum,
        pageSize: 50
      }).then(data => {
        // 用户登录
        if (data.data.rsCode === '200') {
          this.anchorInfo = data.data.rsObject.userList
        }
      })
    }
  },
  // 上滑动刷新 数据暂时不多将pagesize暂时改为50，此生命周期暂时注销
  // onReachBottom () {
  //   this.getRecommendUsersInfoList()
  // },

  created () {
    this.selectTab()
    // 这是登录 有UUID  列表页面需要刷新下才会有数据
    setTimeout(() => {
      this.getRecommendUsersInfoList()
    }, 500)
  }
}
</script>
<style lang="scss" scope>
  .wrap {
    height: 100vh;
    padding: 0 26rpx;
    .show-content-recommend {
      .banner {
        margin: 0 0 39rpx 0;
      }
      .card {
        margin-top: 36rpx;
      }
    }
    .show-personal-dynamic {
      .wrap {
        height: 97vh;
        background: #f3f3f5;
        margin-top: 22rpx;
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
            width: 300rpx;
            height: 300rpx;
            background-image: url($oss-path + '/ic_common_lack_style_16.png');
            background-size: cover;
          }
          .text {
            font-size: 28rpx;
            color: #afb0b3;
          }
        }
      }
    }
    .sub-tabs {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 30rpx;
      color: #d2d3d5;
      display: flex;
      margin-bottom: 10rpx;
      padding-left: 27rpx;
      overflow-x: auto;
      background-color: #253358;
      z-index: 999;
      &::-webkit-scrollbar {
        display: none;
      }
      .sub-tab {
        margin-right: 45rpx;
        white-space: nowrap;
        &.active {
          color: #f1c28c;
        }
      }
    }
  }
</style>
