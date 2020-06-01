import Vue from 'vue'
import App from './App'
import store from './store'
// import token from './utils/token'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
  // ,
  // token
})
app.$mount()
