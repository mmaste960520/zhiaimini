<template lang="pug">
  swiper.swiper(
    :autoplay="true"
  )
    swiper-item(v-for="(photo, index) in photos", :key="index")
      image.img(mode="aspectFill", :src="photo")
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    photos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="scss" scope>
.swiper {
  height: 100%;
  .img {
    height: 100%;
  }
}
</style>
