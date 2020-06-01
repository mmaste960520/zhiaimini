<template lang="pug">
  view.content
    button(@click="login") Login
</template>
<script>
import fly from 'fly'
import paths from '@/config/paths'

export default {
  data () {
    return {
      title: 'Hello!'
    }
  },
  methods: {
    login () {
      uni.login({
        success (res) {
          fly.post(paths.wechat.jscodeToSession, {
            code: res.code
          }).then(res => {
            console.log(res)
            const { data } = res
            console.log(data)
            if (data.rsCode === '200') {
              console.log(data.rsObject.openid)
              uni.setStorageSync('openid', data.rsObject.openid)
            }
          })
        }
      })
    }
  },
  onPageShow () {
    const _this = this.$mp.page
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 0
      })
    }
  }
}
</script>
<style lang="scss" scope>
.content {
  color: red;
}
</style>
