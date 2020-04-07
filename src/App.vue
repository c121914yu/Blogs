<template>
  <div v-if="!firstLoad">
		<loading v-if="$store.state.loading"></loading>
		<Nav></Nav>
		<keep-alive>
			<router-view class="view"/>
		</keep-alive>
  </div>
	<login v-else @getBlogsInfo="getBlogsInfo"></login>
</template>

<script>
import loading from './components/loading.vue'
import Nav from "./components/nav.vue"
import login from './components/login.vue'
import {getInfo} from "../static/axios/api.js"

export default {
	data(){
		return{
			firstLoad : true
		}
	},
	methods:{
		getBlogsInfo(){
			getInfo("")
			.then(res => {
				const data = res.data
				// console.log(data)
				this.$store.state.myInfo = {
					email : data.email,
					github : data.github,
					name : data.name
				}
				this.$store.state.article = data.article
				this.$store.state.categeroy = data.categeroy
				this.$store.state.music = data.music
				this.$store.state.statistics = data.statistics
				data.statistics.sort((a,b) => {//时间先后排序
					return new Date(a.date) - new Date(b.date)
				})
				data.categeroy.forEach(item => {
					this.$store.state.tags = this.$store.state.tags.concat(item.tags)
				})
				this.firstLoad = false
			})
		}
	},
	created() {
		const cookie = localStorage.getItem("yjlmanager")
		if(cookie === "121914yu")
			this.getBlogsInfo()
	},
	components:{
		loading,
		Nav,
		login
	}
}
</script>

<style>
@import url("../static/common.css");
@import url("../static/icon/iconfont.css");
.view{
	margin-left: 170px;
	min-height: 101vh;
}
@media (max-width:800px) {
	.view{
		margin-left: 130px;
	}
}
</style>
