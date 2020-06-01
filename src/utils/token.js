import fly from 'fly'
import paths from '@/config/paths'
import store from '@/store'
function setStorage (data) {
  // 预定义合法值+
  const types = ['accessToken', 'accid', 'agoraAccid', 'phone', 'uuid', 'accidToken', 'openid', 'visitor']

  Object.keys(data).forEach(key => {
    if (types.includes(key)) {
      uni.setStorageSync(key, data[key])
    }
  })
}
// 销毁本地所有的缓存
function clearAccessToken () {
  return new Promise((resolve, reject) => {
    fly.post(paths.account.userLogout).then(res => {
      if (res.data.rsCode === '200') {
        uni.showToast({
          title: '退出成功',
          duration: 2000,
          icon: 'none'
        })
        uni.clearStorageSync()
        store.commit('User/clearUserInfo')
        resolve('200')
      } else {
        uni.showToast({
          title: '退出失败',
          duration: 2000,
          icon: 'none'
        })
      }
    }).catch(err => {
      reject(err)
      uni.showToast({
        title: '系统异常请稍后',
        duration: 2000,
        icon: 'none'
      })
      console.log(err)
    })
  })
}

// 判断token是否过期
function upDateTokenStatus () {
  uni.getStorage({
    key: 'token',
    success: function (res) {
      // console.log(res.data)
    }
  })
  // 获取token有效期
  const expiration = uni.getStorage({
    key: 'expirs',
    success: function (res) {
      // console.log(res.data)
    }
  })
  // 现在的时间
  const nowTimer = Date.parse(new Date()) // 拿到现在时间
  // 两个时间比较
  if (expiration < nowTimer) { // 过期了，清空缓存
    uni.removeStorageSync('expirs') // 清空缓存
    // wx.redirectTo({
    //   url: '../login/login'
    // }) // 跳转到登录
  }
}
export {
  upDateTokenStatus,
  clearAccessToken,
  setStorage
}
