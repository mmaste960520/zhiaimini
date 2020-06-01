import fly from 'fly'
import paths from '@/config/paths'
import { setStorage } from '@/utils/token'
import { deleteVisitor } from '@/utils/visitor'
import { getOpenID } from '@/utils/get-openid'

const state = {
  uuid: '',
  accidToken: '',
  agoraAccid: '',
  accid: '',
  accessToken: '',
  visitor: '',
  phone: '',
  openid: ''
}

const mutations = {
  // 向state中存储数据
  async updateUserInfo (state, payload) {
    let openid = await getOpenID()
    payload.openid = openid
    Object.keys(payload).map(key => {
      state[key] = payload[key]
    })
    setStorage(payload)
  },
  clearUserInfo (state) {
    Object.keys(state).forEach((item) => {
      state[item] = ''
    })
  }
}

const actions = {
  // 手机验证码登陆
  phoneLoginx ({ commit, state }, datas) {
    fly.post(paths.codeAuth, datas).then(res => {
      if (res.data.rsCode === '200') {
        deleteVisitor()
        let data = res.data.rsObject
        // 0：用户是登陆 1：用户待绑定手机号 2：用户待完善信息
        if (data.isFirstJoin === '1') {
          inviteCodeVerify({
            inviteCode: uni.getStorageSync('shareUid'),
            inviteType: '3',
            channelType: '1',
            channelName: '微信'
          }, data.uuid)
        }
        commit('updateUserInfo', data)
        if (data.result === '0') {
          goBoutiqueRecommen()
        }
        if (data.result === '2') {
          goBoutiqueRecommen()
        }
      } else {
        Toast('验证码错误')
      }
    }).catch(err => {
      Toast('服务拥挤请稍后再试')
      console.log(err)
    })
  },
  // 微信登陆
  weixinLoginx ({ commit, state }, data) {
    fly.post(paths.account.thirdAuth, {
      isOneKey: '1',
      accType: '1',
      openid: data
    }).then(res => {
      if (res.data.rsCode === '200') {
        deleteVisitor()
        let data = res.data.rsObject
        // 0：用户是登陆 1：用户待绑定手机号 2：用户待完善信息
        if (data.result === '0') {
          goBoutiqueRecommen()
          commit('updateUserInfo', data)
        }
        if (data.result === '1') {
          goUserTypePersonal()
        }
        if (data.result === '2') {
          goBoutiqueRecommen()
          commit('updateUserInfo', data)
        }
      } else {
        Toast(res.data.rsMsg)
      }
    }).catch(err => {
      Toast('服务拥挤请稍后再试')
      console.log(err)
    })
  },
  // 微信绑定手机
  weixinPhone ({ commit, state }, datas) {
    fly.post(paths.account.thirdAuth, datas).then(res => {
      const { data } = res
      // 验证码输入判断
      if (data.rsCode === '413') {
        uni.showToast({
          title: '验证码输入错误',
          icon: 'none'
        })
      }
      if (data.rsCode === '200') {
        deleteVisitor()
        const result = data.rsObject.result
        if (data.isFirstJoin === '1') {
          inviteCodeVerify({
            inviteCode: uni.getStorageSync('shareUid'),
            inviteType: '3',
            channelType: '1',
            channelName: '微信'
          }, data.uuid)
        }
        commit('updateUserInfo', data.rsObject)
        // 2 0 换位
        if (result === '2') {
          goBoutiqueRecommen()
        }
        if (result === '0') {
          goBoutiqueRecommen()
        }
      } else {
        Toast(res.data.rsMsg)
      }
    }).catch(err => {
      Toast('服务拥挤请稍后再试')
      console.log(err)
    })
  },
  // 手机密码登陆
  passwordLogin ({ commit, state }, datas) {
    fly.post(paths.account.accountAuth, datas).then(res => {
      if (res.data.rsCode === '200') {
        deleteVisitor()
        let data = res.data.rsObject
        commit('updateUserInfo', data)
        if (data.result === '0') {
          goBoutiqueRecommen()
        }
      } else {
        Toast(res.data.rsMsg)
      }
    }).catch(err => {
      Toast('服务拥挤请稍后再试')
      console.log(err)
    })
  },
  // 退出登陆
  logOut ({ commit, state }, data) {

  },
  // 获取验证码
  getCode ({ commit, state }, phone) {
    return new Promise((resolve) => {
      fly.post(paths.requireVerificationCode, {
        codeType: '0',
        phone
      }).then(res => {
        let data = res.data
        if (data.rsCode === '200') {
          resolve(data.rsObject.codeId)
        } else {
          Toast(data.rsMsg)
        }
      }).catch(err => {
        Toast('服务拥挤请稍后再试')
        console.log(err)
      })
    })
  }

}

const getters = {
  // 登陆状态
  isLogin: state => {
    return !!state.uuid
  },
  // 是否为游客模式
  isVisitor: state => {
    return !!state.visitor
  }
}

// 跳转首页
function goBoutiqueRecommen () {
  return uni.switchTab({
    url: '/pages/boutique-recommend/index'
  })
}
// // 跳转完善信息页面
// function goImproveInfo () {
//   return uni.navigateTo({
//     url: '/pages/improve-info/index'
//   })
// }
// 注册成功后，将被邀请人,绑定关系
function inviteCodeVerify (data, uuid) {
  return new Promise((resolve, reject) => {
    fly.request(paths.account.inviteCodeVerify, data, {
      method: 'post',
      headers: {
        uuid
      }
    }).then(res => {
      let data = res.data
      if (data.rsCode === '200') {
        resolve('success')
      }
    }).catch(err => {
      Toast('服务拥挤请稍后再试')
      console.log(err)
    })
  })
}
// 绑定手机号页面
function goUserTypePersonal () {
  return uni.navigateTo({
    url: '/pages/user-type/personal/index'
  })
}
// 弹窗
function Toast (str) {
  uni.showToast({
    title: str,
    duration: 2000,
    icon: 'none'
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
