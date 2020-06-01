
// 给访问者赋值类型0： 游客
// 添加游客模式
const setVisitor = () => {
  uni.setStorageSync('visitor', '0')
}
// 销毁游客类型
const deleteVisitor = () => {
  uni.setStorageSync('visitor', '')
}
// 获取访问者类型
const getVisitor = () => {
  return uni.getStorageSync('visitor')
}
export {
  setVisitor,
  deleteVisitor,
  getVisitor
}
