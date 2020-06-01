<script>
import { getVisitorData } from '@/utils/set-visitor'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      updateUserInfo: 'User/updateUserInfo'
    })
  },
  onLaunch: function (options) {
    try {
      const keys = uni.getStorageInfoSync().keys
      let data = {}
      keys.forEach(item => {
        data[item] = uni.getStorageSync(item)
      })
      this.updateUserInfo(data)
    } catch (e) {
      console.log(e)
    }
  },
  onShow (options) {
    const PATH = options.path
    const isLogin = uni.getStorageSync('uuid')
    // 进入登陆页 且 已登陆
    if (PATH === 'pages/login-index/index' && isLogin) {
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/boutique-recommend/index'
        })
      }, 1000)
    }
    // 进入非登陆页 且 未登陆
    if (PATH !== 'pages/login-index/index' && !isLogin) {
      getVisitorData()
    }
  },
  onHide: function () {
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
.x-background{
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(37,51,88,1) 30%, rgba(195,196,198,1) 100%);
    z-index: -1;
  }
}
</style>
