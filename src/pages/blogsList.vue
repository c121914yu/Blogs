<template>
	<div class="bList">
		<header>
			<div 
				class="item"
				:class="activeNav===index ? 'active':''"
				v-for="(item,index) in navs"
				:key="index"
				@click="changeCategeroy(item,index)"
			>
				<p>{{item.text}}</p>
				<div class="amount">{{item.amount}}</div>
			</div>
		</header>
		
		<div class="list">
			<blogsCover 
			  class="blogs"
				v-for="(item,index) in blogsList"
				:key="index"
				:blog="item"
			>
			</blogsCover>
		</div>
	</div>
</template>

<script>
import {getBlogsList} from "../../static/axios/api.js"
import blogsCover from '../components/blogCov.vue'
export default{
	data(){
		return{
			navs : [],
			categeroy : '全部',
			activeNav : 0
		}
	},
	methods:{
		getList(){// 获取博客列表
			getBlogsList("")
			.then(res => {
				let data = res.data
				data.sort((a,b) => {
					return new Date(b.date).getTime() - new Date(a.date).getTime()
				})
				data.forEach(item => {
					item.tags = item.tags.split(",")
				})
				this.$store.state.blogsList = data
				console.log(data)
			})
		},
		initNavs(){
			this.navs = []
			const categeroies = this.$store.state.categeroy
			for(let i=0;i<categeroies.length-1;i++)
				this.navs.push({
					text : categeroies[i].text,
					amount : categeroies[i].amount
				})
			this.navs.unshift({
				text : "全部",
				amount : this.$store.state.article
			})
		},
		changeCategeroy(item,index){
			this.activeNav = index
			this.categeroy = item.text
		}
	},
	computed:{
		blogsList(){
			let list = this.$store.state.blogsList
			if(this.categeroy != "全部")
				list = list.filter(item => {
					return item.categeroy == this.categeroy
				})
			return list
		}
	},
	created(){
		this.getList()
		this.initNavs()
	},
	components:{
		blogsCover
	}
}
</script>

<style>
.bList{
	padding: 10px 20px;
	background-color: #F4F4F4;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.bList header{
	max-width: 1000px;
	margin-bottom: 15px;
	display: flex;
}
.bList header .item{
	margin-right: 30px;
	width: 100px;
	background-color: #FFFFFF;
	border-radius: 5px;
	padding: 5px;
	box-shadow: var(--box-shadow1);
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: var(--hover-speed);
}
.bList header .item p{
	flex: 1;
}
.bList header .item .amount{
	width: 30px;
	height: 30px;
	border-radius: 50%;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
}
.bList header .item:nth-child(1) .amount{
	background-color: var(--green2);
}
.bList header .item:nth-child(2) .amount{
	background-color: var(--origin);
}
.bList header .item:nth-child(3) .amount{
	background-color: var(--gray);
}
.bList header .item:nth-child(4) .amount{
	background-color: var(--blue);
}
.bList header .item.active{
	background-color: var(--green1);
	color: #FFFFFF;
}
.bList header .item:hover{
	transform: scale(1.1);
}

.bList .list{
	width: 100%;
	max-width: 1000px;
}
.bList .list .blogs{
	margin-bottom: 20px;
}
</style>
