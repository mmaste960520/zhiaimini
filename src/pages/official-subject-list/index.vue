<template lang="pug">
view.wrap.x-background(:style="{paddingTop: bodyPaddingTop}")
  web-view(src="https://zhiai.live/app-pages/downApp.html")
    //- page-header.header(:selectType="displayTabs", @tabChange="switchSubTabs")
    //- view.show-content-offical(v-if="tabsIndex === 0")
    //-   offical-active-banner.offical-active-banner(bannerDataType = 6)
    //-   offical-card(v-for="(item, index) in cardInfo", :key="index", :info="cardInfo[index]")
    //- view.show-content-active(v-if="tabsIndex === 1")
    //-   offical-active-banner.offical-active-banner(bannerDataType = 7)
    //-   active-card.active-card(v-for="(item, index) in ActiveCardInfo", :key="index", :info="ActiveCardInfo[index]", @click.native="toActiveDetails(item.id)")
</template>
<script>
import fly from 'fly'
import PageHeader from '@/components/pages-header'
import officalCard from './component/offical-card'
import ActiveCard from './component/active-card'
// import appPages from '@/config/app-pages'
import { getHeaderInfo } from '@/utils/browserInformation'
import officalActiveBanner from '@/components/offical-active-banner'
import path from '../../config/paths'
export default {
  name: 'live',
  data () {
    return {
      cardInfo: [],
      ActiveCardInfo: [],
      title: 'Hello!',
      displayTabs: [],
      tabs: ['官方专题', '活动专区'],
      tabsIndex: 0,
      subTabs: []
    }
  },
  components: {
    PageHeader,
    officalActiveBanner,
    officalCard,
    ActiveCard
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
        this.getOfficalList()
      }
      if (this.tabsIndex === 1) {
        this.getActiveList()
      }
    },
    selectTab () {
      this.displayTabs = this.tabs.map(item => {
        return {
          type: item
        }
      })
    },
    // 获取官方专题列表
    getOfficalList () {
      fly.post(path.activity.getOfficialLiveList, {}).then(data => {
        if (data.data.rsCode === '200') {
          this.cardInfo = data.data.rsObject
        }
      })
    },
    // 获取活动专区列表
    getActiveList () {
      fly.post(path.activity.getOfficialActivityList, {}).then(data => {
        if (data.data.rsCode === '200') {
          this.ActiveCardInfo = data.data.rsObject
        }
      })
    },
    // 跳转活动详情H5页面
    toActiveDetails (params) {
      const jumpUrl = encodeURIComponent(`http://zhiai.live/app-pages/active-detail.html#/${Number(params)}`)
      uni.navigateTo({
        url: `/pages/web-view/index?url=${jumpUrl}`
      })
    }
  },
  mounted () {
    this.selectTab()
    this.getOfficalList()
  }
}
</script>
<style lang="scss" scope>
.wrap {
  height: 100vh;
  padding: 0 26rpx;
  .show-content-offical {
    .offical-active-banner {
      margin: 0 0 39rpx 0;
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
