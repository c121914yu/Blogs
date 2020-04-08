import axios from 'axios'
import {store} from '../../src/store.js'

// 创建实例
const service = axios.create({
	baseURL : "http://localhost:5000",
	// baseURL : "http://49.232.38.113:5000",
	timeout : 6000
})

// 请求拦截
service.interceptors.request.use(req => {
	store.commit('setLoading',true)
	return req
},(err) => {
	return Promise.reject(err)
})

// // 错误处理
const error = (err) => {
	if(err.response){
		alert(`错误码:${err.response.status},${err.response.data}`)
	}
	store.commit('setLoading',false)
	return Promise.reject(err)
}

// // 响应拦截
service.interceptors.response.use(res => {
	store.commit('setLoading',false)
	return res
},error)

export{
	service as axios
} 