import Fly from 'flyio/dist/npm/wx'
import domains from '@/config/domains'
import { getDeviceUid } from '@/utils/get-device-uid'

const { prodBaseUrl, devBaseUrl } = domains
const request = new Fly()

request.config.baseURL = process.env.NODE_ENV === 'production' ? prodBaseUrl : devBaseUrl

request.interceptors.request.use(request => {
  // 测试uuid
  // request.headers['uuid'] = '88800001'
  request.headers['deviceUid'] = getDeviceUid()
  request.headers['channel'] = '2'
  request.headers['platform'] = 'zajy_mp_1'
  request.headers['requestTimes'] = Date.now()
  request.headers['accessToken'] = uni.getStorageSync('accessToken')
  request.headers['uuid'] = uni.getStorageSync('uuid')
  return request
})

request.interceptors.response.use(
  (response) => {
    // 此处判断如果引物uuid失效的话跳转登陆页面,暂时业务简单先这样处理，业务复杂之后另作处理
    if (response.data.rsCode === '501') {
      uni.redirectTo({
        url: '/pages/login-index/index'
      })
    }
    return response
  },
  (err) => {
    const { response, status } = err
    const message = (response && response.data && response.data.error) || err.message
    uni.showToast({
      title: `服务错误: ${message}, CODE: ${status}`,
      icon: 'none'
    })
    return Promise.reject(err)
  }
)

export default request
