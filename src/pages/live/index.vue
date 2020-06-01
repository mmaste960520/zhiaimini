<template lang="pug">
view.wrap.x-background(:style="{paddingTop: bodyPaddingTop}")
    page-header.header(:selectType="displayTabs", @tabChange="switchSubTabs")
    view.sub-tabs(:style="{top: subTabsTop}")
      view.sub-tab(
        v-for="(tab, index) in subTabs",
        :class="{active: index === subTabsIndex}",
        :key="index",
        @click="subTabClick(index)"
      ) {{ tab.name }}
    banner.banner(bannerDataType = 2)
    view.rooms
      room-card(
        v-for="room in list",
        :key="room.yunxinRoomId",
        :anchor-avatar="room.profilePhotoidURL",
        :sub-anchor-avatar="room.subAnchorHeadUrl",
        :guard-one="room.oneGuardHeadUrl",
        :guard-two="room.twoGuardHeadUrl",
        :nick-name="room.nickName",
        :city="room.liveCity",
        :edu="room.userEducation",
        :age="room.userAge",
        :level="room.charmLevel",
        :max-count="room.usersLimit",
        :cur-count="room.currentUserNum",
        :zhiai-value="room.charm",
        :is-show-zhiai-value="room.isShowCharm",
        :live-room-id="room.liveRoomId",
        :yunxin-roomid="room.yunxinRoomId",
        :uuid="room.uuid"
      )
</template>
<script>
import fly from 'fly'
import PageHeader from '@/components/pages-header'
import Banner from '@/components/offical-active-banner'
import RoomCard from './room-card'
import { getHeaderInfo } from '@/utils/browserInformation'
import paths from '@/config/paths'

export default {
  name: 'live',
  data () {
    return {
      title: 'Hello!',
      displayTabs: [],
      tabs: [],
      tabsIndex: 0,
      subTabs: [],
      subTabsIndex: 0,
      list: []
    }
  },
  components: {
    Banner,
    RoomCard,
    PageHeader
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
    fetchTabData () {
      fly.post(paths.live.getLiveRegions).then(res => {
        console.log(res)
        const { rsCode, rsObject } = res.data
        if (rsCode === '200') {
          this.tabs = rsObject.region
          this.displayTabs = this.tabs.map(item => {
            return {
              type: item.name
            }
          })
          this.subTabs = this.tabs[0].subregion || []

          this.updateList()
        }
      })
    },
    switchSubTabs (index) {
      this.tabsIndex = index
      this.subTabsIndex = 0
      this.subTabs = this.tabs[index].subregion || []
      this.updateList()
    },
    subTabClick (index) {
      this.subTabsIndex = index
      this.updateList()
    },
    updateList () {
      const tabID = this.tabs[this.tabsIndex].id
      const subTabID = this.subTabs.length && this.subTabs[this.subTabsIndex].id
      return new Promise(resolve => {
        this.fetchLiveList(tabID, subTabID).then(() => {
          resolve()
        })
      })
    },
    fetchLiveList (areaId, subAreaId) {
      return new Promise(resolve => {
        fly.post(paths.live.getLiveList, {
          index: 1,
          areaId,
          subAreaId
        }).then(async res => {
          const { rsCode, rsObject } = res.data
          if (rsCode === '200') {
            this.list = rsObject.liveRoomList
          }
          resolve()
        })
      })
    }
  },
  mounted () {
    this.fetchTabData()
  },
  onPullDownRefresh () {
    console.log('pull down...')
    this.updateList().then(() => {
      uni.stopPullDownRefresh()
    })
  }
}
</script>
<style lang="scss" scope>
.wrap {
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
.banner {
  margin: 0px 30rpx;
  padding: 0;
}
.rooms {
  padding: 30rpx 30rpx 0;
  .room-card {
    margin-bottom: 40rpx;
  }
}
</style>
