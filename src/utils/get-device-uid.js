import { randomLowerLetter, randomUpperLetter, randomNumber } from '@/utils/random'

/**
 * 获取设备 UID
 *
 * @returns {string} 设备 UID
 */
function getDeviceUid () {
  let deviceUid = uni.getStorageSync('deviceUid')

  if (!deviceUid) {
    // Web 端 uid 规则：WE + 八位大写字母 + 八位数字 + 八位小写字母 + 八位数字
    deviceUid = `MP${randomUpperLetter(8)}${randomNumber(8)}${randomLowerLetter(8)}${randomNumber(8)}`
    uni.setStorageSync('deviceUid', deviceUid)
  }

  return deviceUid
}

export {
  getDeviceUid
}
