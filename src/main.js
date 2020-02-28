import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios//全局使用axios

/* 使用代码高亮 */
import hljs from 'highlight.js'
import 'highlight.js/styles/solarized-light.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
