const state = {
  onlineUserList: [],
  onlineGuestUserList: []
}

const mutations = {
  updateOnlineUserList (state, payload) {
    state.onlineUserList = payload
  },
  updateOnlineGuestUserList (state, payload) {
    state.onlineGuestUserList = payload
  }
}

const actions = {
}

const getters = {
  onlineUserMap: state => {
    const mapData = {}
    state.onlineUserList.forEach(user => {
      mapData[user.chatroomId] = user
    })
    return mapData
  },
  onlineGuestUserMap: state => {
    const mapData = {}
    state.onlineGuestUserList.forEach(user => {
      mapData[user.chatroomId] = user
    })
    return mapData
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
