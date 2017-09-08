/* jshint esversion: 6 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import Axios from 'axios'
import swal from 'sweetalert'

import App from './App'
import router from './router'

window.axios = Axios
let axiosDefaults = require('axios/lib/defaults')
axiosDefaults.baseURL = 'http://webllo.dev'

window.swal = swal

Vue.use(Vuetify)
Vue.config.productionTip = false

window.Event = new Vue()

window.token = localStorage.getItem('token')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
