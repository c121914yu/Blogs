import {
	getAction,
	postAction
} from './manage.js'

const managerLogin = (data) => postAction("/tools/managerLogin",data)
const getBlogsList = (params) => getAction("tools/getInfo",params)
const setMyInfo = (data) => postAction("/tools/setMyInfo",data)

export {
	managerLogin,
	getBlogsList,
	setMyInfo
}