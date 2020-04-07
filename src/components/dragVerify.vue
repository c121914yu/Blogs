<template>
	<div class="dragVer">
		<div class="range"></div>
		<div 
			class="drag" 
			@mousedown="beginDrag" 
		></div>
		<div class="progress"></div>
		<div class="dot"></div>
	</div>
</template>

<script>
var max,offset
export default{
	data(){
		return{
			range : 0,
			draging : false,
		}
	},
	watch:{
		range(data){
			if(data < 70)
				document.querySelector('.progress').style.width = data+3 + "%"
			else
				document.querySelector('.progress').style.width = data-2 + "%"
		}
	},
	methods:{
		beginDrag(e){
			const x = e.clientX
			const left = document.querySelector('.drag').offsetLeft
			offset = x - left
			this.draging = true
		},
		draged(){
			if(this.range > 98)
				this.$emit("login")
			this.draging = false
			document.querySelector('.drag').style.left = 0
			this.range = 0
		}
	},
	mounted() {
		max = document.querySelector('.dot').offsetLeft
		window.onmousemove = (e) => {
			if(!this.draging) return
			const x = e.clientX
			let left = x - offset
			if(left < 0)
				left = 0
			if(left > max)
				left = max
			document.querySelector('.drag').style.left = left + "px"
			this.range = +left / +max * 100
		}
		window.onmouseup = () => {
			if(!this.draging) return
			this.draged()
		}
	},
	beforeDestroy() {
		window.onmousemove = ""
		window.onmouseup = ""
	}
}
</script>

<style scoped>
.dragVer{
	position: relative;
	width: 100%;
	height: 20px;
	display: flex;
	align-items: center;
	border-radius: 10px;
	overflow: hidden;
}
.dragVer .range{
	position: absolute;
	width: 100%;
	height: 20px;
	background-color: #d9d9d9;
}
.dragVer .drag{
	position: absolute;
	height: 20px;
	width: 20px;
	background-color: #3eaf7c;
	border-radius: 50%;
	cursor: pointer;
	z-index: 999;
}
/* 填充背景 */
.dragVer .progress{
	background-color: rgba(90,216,166,0.7);
	height: 20px;
	width: 0;
	z-index: 1;
	border-radius: 10px;
}
.dragVer .dot{
	height: 20px;
	width: 20px;
	position: absolute;
	right: 0;
	z-index: -1;
}
</style>
