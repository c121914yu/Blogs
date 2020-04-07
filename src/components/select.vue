<template>
	<div 
		class="select" 
		:class="active ? 'active':''"
		@click="setStatus(!active)"
	>
		<p :class="current===''?'remark':''">{{current==='' ? placeholder : current}}</p>
		<i class="iconfont icon-down"></i>
		<div class="content">
			<div 
				class="item"
				:class="current===item ? 'current':''"
				v-for="(item,index) in arrData"
				:key="index"
				@click="current = item"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			height : 0,
			array : [],
			active : false,
			current : this.value
		}
	},
	props:{
		placeholder : {
			type : String,
			default : ""
		},
		arrData : {
			type : Array,
			default : () => {
				return ["无数据"]
			}
		},
		value : {
			type : String,
			default : ""
		}
	},
	watch:{
		current(newData){
			this.$emit('input', newData)
		}
	},
	methods:{
		setStatus(type){
			this.active = type
			if(type)
				document.querySelector(".content").style.height = this.height + "px"
			else
				document.querySelector(".content").style.height = "0px"
		},
	},
	beforeRouteEnter(to,from,next) {
		next(vm => {
			vm.height = 45 * vm.arrData.length
			document.body.onclick = (e) => {
				if(!document.querySelector('.select').contains(e.target))
				  vm.setStatus(false)
			}
		})
	},
	beforeRouteUpdate(to,from,next) {
		document.body.onclick = ""
		next()
	}
}
</script>

<style scoped>
.select{
	width: 100%;
	border: var(--border1);
	border-radius: 5px;
	padding: 5px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.select .remark{
	font-size: 1em;
}
.select i{
	position: absolute;
	right: 2px;
	transition: var(--hover-speed);
}
.select.active{
	border-color: var(--green1);
	box-shadow: 0 0 2px var(--green1);
}
.select.active i{
	transform: rotate(180deg);
}

.select .content{
	align-self: flex-start;
	position: absolute;
	top: 40px;
	left: 0;
	width: 100%;
	height: 0;
	background-color: #FFFFFF;
	box-shadow: var(--box-shadow1);
	border-radius: 5px;
	z-index: 10;
	overflow: hidden;
	transition: var(--hover-speed);
}
.select .content .item{
	height: 45px;
	line-height: 45px;
	text-align: center;
}
.select .content .item.current,
.select .content .item:hover{
	background-color: rgba(90,216,166,0.5);
}
</style>
