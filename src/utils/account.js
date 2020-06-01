import { clearAccessToken } from '@/utils/token'

function logout () {
  clearAccessToken()
  uni.redirectTo({
    url: '/pages/login-index/index'
  })
}

export {
  logout
}
