<template>
	<div class="home">
		<header class="card">
			<span>欢迎回来,璡龙鱼管理系统</span>
			<span class="date">{{today}}</span>
		</header>
		
		<div class="card">
			<div class="title">
				<h4>个人资料</h4>
				<button class="btn" @click="setMyInfo">保存</button>
			</div>
			<div 
				class="input"
				v-for="(item,index) in myInfo"
				:key="index"
			>
				<p>{{item.text}}：</p>
				<input type="text" spellcheck="false" v-model="$store.state.myInfo[item.model]">
			</div>
		</div>
		
		<div class="card">
			<h4>概览</h4>
			<div class="count">
				<div 
					class="item"
					v-for="(item,index) in count"
					:key="index"
					v-if="index!=4"
				>
					<p>{{item.text}}</p>
					<p class="amount">{{item.amount}}</p>
				</div>
				<div 
					class="item" 
					@mouseenter="showMusic=true"
					@mouseleave="showMusic=false"
				>
					<p>{{count[4].text}}</p>
					<p class="amount">{{count[4].amount}}</p>
					<setMusic	v-if="showMusic" @updateMusic="updateMusic">
					</setMusic>
				</div>
			</div>
		</div>
		
		<div class="card">
			<h4>图表数据</h4>
			<div class="chart">
				<lineChart v-if="visitor.X" :chartData="visitor"></lineChart>
				<lineChart v-if="writed.X" :chartData="writed"></lineChart>
			</div>
		</div>
	</div>
</template>

<script>
import {setMyInfo} from '../../static/axios/api.js'
import setMusic from '../components/setMusic.vue'
import lineChart from '../components/lineChart.vue'

export default{
	data(){
		return{
			today : "",
			myInfo : [
				{text:"姓名",model:"name"},
				{text:"邮箱",model:"email"},
				{text:"github",model:"github"},
			],
			count : [],
			showMusic : false,
			visitor : {
				id : "visitor",
				name : "访客量",
				color : "#5ad8a6"
			},
			writed : {
				id : "writed",
				name : "博客数量",
				color : "#5b8ff9"
			}
		}
	},
	methods:{
		initData(){
			this.count = [
				{text:"今日访客",amount:this.$store.state.statistics[this.$store.state.statistics.length-1].visitor},
				{text:"博客",amount:this.$store.state.article},
				{text:"分类",amount:this.$store.state.categeroy.length},
				{text:"标签",amount:this.$store.state.tags.length},
				{text:"音乐",amount:this.$store.state.music.length}
			]
			const statistics = [...this.$store.state.statistics]
			const date = [] 
			const visitor = []
			const writed = []
			statistics.forEach(item => {
				date.push(item.date)
				visitor.push(item.visitor)
				writed.push(item.blogs)
			})
			this.visitor.X = date
			this.visitor.data = visitor
			this.writed.X = date
			this.writed.data = writed
		},
		updateMusic(){
			this.count[this.count.length-1].amount = this.$store.state.music.length
			console.log(this.count[this.count.length-1])
		},
		setMyInfo(){
			setMyInfo(this.$store.state.myInfo)
			.then(res => {
				console.log(res.data)
			})
		}
	},
	created() {
		const date = new Date()
		let weeks = ["日", "一", "二", "三", "四", "五", "六"]
		this.today = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} 星期${weeks[date.getDay()]}`
		this.initData()
	},
	components:{
		setMusic,
		lineChart
	}
}
</script>

<style>
.home{
	background-color: #F4F4F4;
	padding: 10px;
}

.home .card{
	margin: 0 auto 15px auto;
	padding: 5px;
	background-color: #FFFFFF;
	border-radius: 5px;
	box-shadow: var(--box-shadow1);
}
.home .card h4{
	padding: 5px;
	border-bottom: var(--border2);
}
.home .card .title{
	width: 100%;
	border-bottom: var(--border2);
	display: flex;
	align-items: center;
}
.home .card .title .btn{
	margin-left: 15px;
	height: 25px;
}

.home header .date{
	margin-left: 10px;
	color: var(--green2);
}

.home .count{
	margin-top: 5px;
	display: grid;
	grid-template-columns: repeat(5,1fr);
	grid-gap: 10px;
}
.home .count .item{
	padding: 10px;
	text-align: center;
	background-color: #F4F4F4;
	border-radius: 5px;
	position: relative;
}
.home .count .item p{
	margin: 5px 0;
	cursor: default;
}
.home .count .item .amount{
	font-size: 1.6em;
	font-weight: 500;
	color: var(--green2);
}

.home .input{
	margin: 10px 0;
	padding: 5px;
	display: flex;
}
.home .input p{
	width: 80px;
}
.home .input input{
	padding: 0 5px;
	flex: 1;
	max-width: 400px;
}

.home .chart{
	margin-top: 5px;
	display: grid;
	grid-template-columns: repeat(2,1fr);
	grid-gap: 10px;
}

@media (max-width:1000px) {
	.home .count{
		grid-template-columns: repeat(3,1fr);
	}
	.home .chart{
		grid-template-columns: repeat(1,1fr);
	}
}
</style>
