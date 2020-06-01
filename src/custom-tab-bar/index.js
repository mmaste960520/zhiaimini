/* eslint-disable */
const oss = 'https://zajy-public.oss-cn-beijing.aliyuncs.com/miniapp'

Component({
  data: {
    selected: null,
    color: '#c2c2c2',
    selectedColor: '#f1c289',
    list: [
      {
      pagePath: '/pages/boutique-recommend/index',
      iconPath: oss + '/tob_icon_tj_1.png',
      selectedIconPath: oss + '/tob_icon_tj_0.png',
      text: '推荐'
      },
      {
      pagePath: '/pages/message/index',
      iconPath: oss +  '/tob_icon_xx_1.png',
      selectedIconPath: oss + '/tob_icon_xx_0.png',
      text: '消息'
      },
      {
        pagePath: '/pages/live/index',
        iconPath: oss + '/tob_icon_zb_1.png',
        selectedIconPath: oss + '/tob_icon_zb_0.png'
      },
      {
        pagePath: '/pages/official-subject-list/index',
        iconPath: oss + '/tob_icon_qz_1.png',
        selectedIconPath: oss + '/tob_icon_qz_0.png',
        text: '官方'
      },
      {
        pagePath: '/pages/user-center/index',
        iconPath: oss + '/tob_icon_wd_1.png',
        selectedIconPath: oss + '/tob_icon_wd_0.png',
        text: '我的'
      }
    ]
  },
  attached () {
  },
  methods: {
    switchTab (e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
