/* jshint esversion: 6 */

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import Boards from '@/components/Boards'
import SingleBoard from '@/components/SingleBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/boards/:id',
      name: 'SingleBoard',
      component: SingleBoard
    },
    {
      path: '/',
      name: 'Boards',
      component: Boards
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],

  mode: 'history'
})
