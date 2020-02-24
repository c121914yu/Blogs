import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '../pages/home.vue'

export default new Router({
  routes: [
    {path: '/',name: 'home',component: home},
    {path: '*',redirect:"/"}//错误定向
  ]
})
