<template>
	<div class="musicList">
		<div 
			class="music"
			v-for="(item,index) in list"
			:key="index"
			@dblclick="deleteMusic(item,index)"
		>
			{{item.name}}
		</div>
		<label>
			<input type="file" class="file" @change="upFile"></input>
			<div class="btn">增加</div>
		</label>
	</div>
</template>

<script>
import {getUpToken,saveMusic,deleteMusic} from '../../static/axios/api.js'
var qiniu = require('qiniu-js')
export default{
	data(){
		return{
			list : [],
		}
	},
	methods:{
		upFile(e){
			const file = e.target.files[0]
			// 判断类型
			if(!/audio/.test(file.type)){
				alert("不是音频文件")
				return
			}
			// 查询是否有重复音乐
			let musicInfo = {
				name : file.name.replace(/\.mp3/g,""),
			}
			const musicList = this.$store.state.music
			for(let i=0;i<musicList.length;i++)
				if(musicList[i].name === musicInfo.name){
					alert("该音频已存在")
					return
				}
			
			const key = "music/" + file.name
			const config = {
			  useCdnDomain: true,//cdn加速
			  region: qiniu.region.z0 //华东区域
			}
			const putExtra = {
			  fname: file.name,
			  params: {},
			  mimeType: [file.type]
			}
			const observer = {
				next : (res) => {
					console.log(res.total.percent)
				},
				error : (err) => {
					this.$store.commit('setLoading',false)
					console.log(err)
				}, 
				complete : (res) => {
					this.$store.commit('setLoading',false)
					console.log("上传完成")
				}
			}
			var UpFile = () => {
				this.$store.commit('setLoading',true)
				// 同时更新数据库
				const data = {
					key : key,
					name : musicInfo.name,
					url : "http://blogs.jinlongyuchitang.cn/" + key
				}
				this.$store.state.music.push(data)
				this.$emit('updateMusic')
				
				saveMusic(data)
				.then(res => {
					this.$store.commit('setLoading',true)
				})
				
				let observable = qiniu.upload(file, key, upToken, putExtra, config)
				// 开始上传
				let subscription = observable.subscribe(observer)
			}
			
			let upToken = this.$store.state.upToken
			if(!upToken)
				getUpToken("")
				.then(res => {
					this.$store.state.upToken  = res.data
					upToken = this.$store.state.upToken
					UpFile()
				})
			else
				UpFile()
		},
		deleteMusic(item,index){
			deleteMusic({
				key : item.key,
				index
			})
			.then(res => {
				console.log(res)
			})
			this.$store.state.music.splice(index,1)
			this.$emit('updateMusic')
		}
	},
	mounted() {
		this.list = this.$store.state.music
	}
}
</script>

<style scoped>
.musicList{
	position: absolute;
	margin-top: 10px;
	min-width: 100px;
	max-width: 100vw;
	box-shadow: var(--box-shadow1);
	border-radius: 10px;
	background-color: #FFFFFF;
	overflow: hidden;
	z-index: 99;
}
.musicList .music{
	white-space: nowrap;
	text-align: center;
	padding: 5px;
	cursor: pointer;
	user-select: none;
}
.musicList .music:hover{
	background-color: var(--tint-gray);
}
.musicList .btn{
	width: 70%;
	margin: 5px 0;
	margin-left: 15%;
}
.musicList label .file{
	position: absolute;
	width: 1px;
	height: 1px;
	opacity: 0;
}
</style>
