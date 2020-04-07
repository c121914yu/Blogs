<template>
	<div 
		class="nav"
		:class="$store.state.hideNav ? 'hidden':''"
	>
		<router-link
			class="link"
			:class="index === current ? 'active' : ''"
			v-for="(item,index) in navs"
			:key="index"
			:to="{name:item.name}"
		>
			<i class="iconfont" :class="item.icon"></i>
			<span>{{item.text}}</span>
		</router-link>
	</div>
</template>

<script>
export default{
	data(){
		return{
			current : 0,
			navs : [
				{text:"首页",name:'home',icon:"icon-home"},
				{text:"博客管理",name:'blogsList',icon:"icon-list"},
				{text:"写文章",name:'newBlogs',icon:"icon-xie"}
			]
		}
	},
	watch:{
		"$route" : 'routeChange'
	},
	methods:{
		routeChange(){
			const name = this.$route.name
			switch(name){
				case 'home':this.current=0;break;
				case 'blogsList':this.current=1;break;
				case 'newBlogs':this.current=2;break;
			}
		}
	},
	created() {
		this.routeChange()
	}
}
</script>

<style>
.nav{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
	width: 170px;
	height: 100vh;
	background-color: #5d7092;
	box-shadow: var(--box-shadow1);
	transition: var(--transition-speed);
}
.nav.hidden{
	transform: translateX(-105%);
}

.nav .link{
	margin: 2px 0;
	padding: 15px 0;
	color: #F4F4F4;
	display: block;
	align-items: center;
	text-align: center;
	border-left: 3px solid transparent;
}
.nav .link:hover{
	background-color: rgba(0,0,0,0.3);
}
.nav .link.active{
	background-color: rgba(0,0,0,0.3);
	border-color: var(--green1);
}
.nav .link i{
	font-size: 1.3em;
	color: var(--green1);
}

@media (max-width:800px) {
	.nav{
		width: 130px;
	}
}
</style>
