import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '../pages/home.vue'
import blogsList from '../pages/blogsList.vue'
import newBlogs from '../pages/newBlogs.vue'

export default new Router({
  routes: [
		{
			path: '/tools/manager',
			name: 'home',
			component: home
		},
		{
			path: '/tools/manager/blogsList',
			name: 'blogsList',
			component: blogsList
		},
		{
			path: '/tools/manager/newBlogs',
			name: 'newBlogs',
			component: newBlogs
		},
		{path: '*',redirect:"/tools/manager"}//错误定向
	],
	mode : "history"
})
