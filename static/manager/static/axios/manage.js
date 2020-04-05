import { axios } from './request.js'

//get
export function getAction(url,params){
	return axios({
		url,
		method : "get",
		params
	})
}

export function postAction(url,data){
	return axios({
		url,
		method : "post",
		data
	})
}