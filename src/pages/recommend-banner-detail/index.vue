<template lang="pug">
  view.banner-details(:style="{ 'background-image': 'url(' + bannerDetaiImg + ')','background-repeat':'no-repeat 0px 0px','background-size':'cover' }")
</template>
<script>
export default {
  data () {
    return {
      bannerDetaiImg: ''
    }
  },
  onLoad (option) {
    this.bannerDetaiImg = option.imgUrl
  }
}
</script>
<style lang="scss" scope>
  .banner-details {
    min-width: 100vw;
    min-height: 128vh;
  }
</style>
