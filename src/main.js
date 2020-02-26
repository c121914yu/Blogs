import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios//全局使用axios

//引入github修饰md文件样式
import 'github-markdown-css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
