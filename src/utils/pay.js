/**
 * 支付组件
 */
import md5 from 'js-md5'
import fly from 'fly'
import { randomLetter } from '@/utils/random'

export default function pay (data) {
  const payType = data.payType
  return new Promise((resolve, reject) => {
    // 创建订单
    fly.post('/pay/pay/createPay/createPayOrder', {
      order_content: data.orderContent,
      order_type: data.orderType,
      pay_type: data.payType,
      total_fee: data.totalFee,
      pay_scenario: data.payScenario,
      open_id: uni.getStorageSync('openid')
    }).then(res => {
      const { data } = res
      // 微信支付
      if (data.rsObject && data.rsCode === '200' && payType === 'wxmini') {
        const { prepayId } = data.rsObject
        console.log(prepayId)

        // 准备支付请求数据
        const provider = 'wxpay'
        const timeStamp = String(Date.now())
        const nonceStr = randomLetter(32)
        const packageValue = `prepay_id=${prepayId}`
        const signType = 'MD5'
        const string = `appId=wx854adc87836e4e1e&nonceStr=${nonceStr}&package=${packageValue}&signType=MD5&timeStamp=${timeStamp}&key=17d38893f21211e9a2b00235d2b38928`
        const paySign = md5(string).toUpperCase()

        // 唤起微信支付
        uni.requestPayment({
          provider,
          timeStamp,
          nonceStr,
          package: packageValue,
          signType,
          paySign,
          success (res) {
            console.log(res)
            resolve(res)
          },
          fail (res) {
            console.log(res)
            reject(res)
          }
        })
        return
      }
      // 礼品券
      if (data && data.rsCode === '200' && payType === 'zhiai') {
        uni.showToast({
          title: '支付成功',
          icon: 'none'

        })
        return resolve(res)
      }
      uni.showToast({
        title: data.rsMsg,
        icon: 'none'
      })
    }).catch(e => {
      reject(e)
    })
  })
}
