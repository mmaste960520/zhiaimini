import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Room from './modules/room'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    Room
  }
})

export default store
