<template lang="pug">
  view.active-area-list.x-background
     offical-active-banner.offical-active-banner(bannerDataType = 7)
     active-card.active-card(v-for="(item, index) in cardInfo", :key="index", :info="cardInfo[index]", @click.native="toActiveDetails(item)")
</template>
<script>
import OfficalActiveBanner from '@/components/offical-active-banner'
import ActiveCard from './component/active-card'
export default {
  components: {
    OfficalActiveBanner,
    ActiveCard
  },
  data () {
    return {
    }
  },
  methods: {
    toActiveDetails (params) {
      uni.navigateTo({
        url: '/pages/active-area-list/active-details?item=' + encodeURIComponent(JSON.stringify(params))
      })
    }
  }
}
</script>
<style lang="scss">
  .active-area-list {
    padding: 0 26rpx;
    .offical-active-banner {
      margin: 0 0 39rpx 0;
    }
    .active-card {

    }
  }
</style>
