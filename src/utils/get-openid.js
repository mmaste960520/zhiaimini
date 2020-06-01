import fly from 'fly'
import paths from '@/config/paths'

/**
 * 获取 openid
 *
 * @returns {string} openid
 */
function getOpenID () {
  return new Promise((resolve, reject) => {
    uni.login({
      success (res) {
        let openId = uni.getStorageSync('openid')
        if (openId) {
          return resolve(openId)
        }
        fly.post(paths.wechat.jscodeToSession, {
          code: res.code
        }).then(res => {
          const { data } = res
          if (data.rsCode === '200') {
            const openid = data.rsObject.openid
            uni.setStorageSync('openid', openid)
            resolve(openid)
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  })
}

export {
  getOpenID
}
