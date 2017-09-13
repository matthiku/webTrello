/* jshint esversion: 6 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import Axios from 'axios'
import swal from 'sweetalert'

import App from './App'
import router from './router'

/*
    HTTP request/response handling
*/
window.axios = Axios
let axiosDefaults = require('axios/lib/defaults')
axiosDefaults.baseURL = 'http://webllo.dev'
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
  }, function (error) {
    // Do something with response error
  if (error.response) {
    if (error.response.data.message) {
      swal('Backend Error:', JSON.stringify(error.response.data.message).replace(/{|}|\[|\]/g, '\n'), 'error')
    } else {
      swal('Backend Error:', JSON.stringify(error.response).replace(/{|}|\[|\]/g, '\n'), 'error')
    }
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
  console.log(error.config)
    return Promise.reject(error)
  })

/*
    Sweeet Alerts
*/
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
