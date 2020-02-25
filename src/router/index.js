import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '../pages/home.vue'
import categeory from '../pages/category.vue'
import tags from '../pages/tags.vue'

export default new Router({
  routes: [
    {path: '/',name: 'home',component: home},
    {path: '/categeory/:category',name: 'categeory',component: categeory},
    {path: '/tags/:tag',name: 'tags',component: tags},
    {path: '*',redirect:"/"}//错误定向
  ],
})
