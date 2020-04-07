import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import {store} from './store'

const echarts = require('echarts')
Vue.prototype.$echarts = echarts

/* 使用代码高亮 */
import hljs from 'highlight.js'
import 'highlight.js/styles/solarized-light.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

new Vue({
  el: '#app',
	store,
  router,
  render: h => h(App)
})
