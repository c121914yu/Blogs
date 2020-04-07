import {
	getAction,
	postAction
} from './manage.js'

const getInfo = (params) => getAction("tools/getInfo",params)
const getBlogsList = (params) => getAction("tools/getBlogsList",params)
const getUpToken = (params) => getAction("tools/getUpToken",params)

const managerLogin = (data) => postAction("/tools/managerLogin",data)
const setMyInfo = (data) => postAction("/tools/setMyInfo",data)
const saveMusic = (data) => postAction("/tools/saveMusic",data)
const deleteMusic = (data) => postAction("/tools/deleteMusic",data)

export {
	getInfo,
	getBlogsList,
	getUpToken,
	managerLogin,
	setMyInfo,
	saveMusic,
	deleteMusic
}