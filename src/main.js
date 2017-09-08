/* jshint esversion: 6 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import Axios from 'axios'
import App from './App'
import router from './router'

window.axios = Axios
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
