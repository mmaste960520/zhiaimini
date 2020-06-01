/**
 * 获取小程序的自定义头部的高度
 * cBarTitleHeight header高度
 * cBarTitlePaddingTop padding-top高度
 */
const custom = uni.getMenuButtonBoundingClientRect() // 胶囊位置
function getHeaderInfo () {
  let data = {
    cBarTitleHeight: 68,
    cBarTitlePaddingTop: 20
  }

  const info = uni.getSystemInfoSync()
  let sH = info.statusBarHeight
  let bH = custom.bottom * 2 - custom.height - sH
  data.cBarTitleHeight = bH < data.cBarTitleHeight ? data.cBarTitleHeight : bH
  data.cBarTitlePaddingTop = sH
  return data
}

export {
  getHeaderInfo
}
