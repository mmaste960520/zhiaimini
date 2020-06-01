<template lang="pug">
  web-view(v-if="url", :src="url")
</template>
<script>
export default {
  data () {
    return {
      title: '',
      url: ''
    }
  },
  methods: {
  },
  onLoad (options) {
    this.url = decodeURIComponent(options.url)
    this.title = options.title
  },
  onShareAppMessage () {
    return {
      title: this.title,
      path: `${this.$mp.page.route}?url=${this.url}`,
      success: (res) => {

      },
      fail: function (res) {
      }
    }
  }
}
</script>
<style lang="scss">
</style>
