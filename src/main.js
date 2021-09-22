import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import VueParticles from 'vue-particles'
import Prism from "prismjs"
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$http=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
