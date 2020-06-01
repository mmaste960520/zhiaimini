import { setVisitor } from '@/utils/visitor'
import { setStorage } from '@/utils/token'
import fly from 'fly'
import paths from '@/config/paths'

// 获取游客登陆数据
function getVisitorData () {
  return new Promise((resolve) => {
    fly.post(paths.account.visitorAuth).then(res => {
      if (res.data.rsCode === '200') {
        let data = res.data.rsObject
        setVisitor()
        setStorage(data)
        resolve('1')
      }
    }).catch(err => {
      console.log(err)
    })
  })
}

export {
  getVisitorData
}
