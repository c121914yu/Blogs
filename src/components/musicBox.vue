<template>
<div class="musicBox" @mouseleave="showBox=false">
	<i 
		class="iconfont icon-music picture"
		@mouseenter="showBox=true"
	>
  </i>
	<div class="box" v-show="showBox">
		<audio id="audio" :src="audio.url" @canplay="playMusic" @ended="endMusic"></audio>
		<header>
			<p class="name">{{audio.name}}</p>
			<p class="time">{{audio.currentMinutes}}:{{audio.currentSeconds}}/{{audio.minutes}}:{{audio.seconds}}</p>
			<div class="progress"></div>
			<input
				type="range" 
				class="range" 
				:value='audio.value' 
				min="0" max="1" step="0.001" 
				@mousedown="setVal=false" 
				@input="dragTime"
				@change="changeTime"
			>
		</header>
		
		<div class="btns">
			<i class="iconfont icon-last" @click="switchMusic(-1)"></i>
			<i class="iconfont icon-start" v-if="!playing" @click="musicSet()"></i>
			<i class="iconfont icon-pause" v-else @click="musicSet()"></i>
			<i class="iconfont icon-next" @click="switchMusic(1)"></i>
		</div>
	</div>
</div>
</template>

<script>
var audioInterval
var urls = [
	{
		name : "司南 - 冬眠",
		url : 'http://blogs.jinlongyuchitang.cn/music/%E5%8F%B8%E5%8D%97%20-%20%E5%86%AC%E7%9C%A0.ogg'
	},
	{
		name : "G.E.M. 邓紫棋 - 很久以后",
		url : 'http://blogs.jinlongyuchitang.cn/music/G.E.M.%20%E9%82%93%E7%B4%AB%E6%A3%8B%20-%20%E5%BE%88%E4%B9%85%E4%BB%A5%E5%90%8E.ogg'
	},
	{
		name : "程响 - 世界这么大还是遇见你",
		url : 'http://blogs.jinlongyuchitang.cn/music/%E7%A8%8B%E5%93%8D%20-%20%E4%B8%96%E7%95%8C%E8%BF%99%E4%B9%88%E5%A4%A7%E8%BF%98%E6%98%AF%E9%81%87%E8%A7%81%E4%BD%A0.ogg'
	},
	{
		name : "阿冗 - 你的答案",
		url : 'http://blogs.jinlongyuchitang.cn/music/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.ogg'
	},
]
var currentUrl = 0
export default{
	data(){
		return{
			showBox : false,
			currentUrl : 0,
			audio : {
				url : '',
				name : '',
				minutes : '00',
				seconds : '00',
				currentMinutes : '00',
				currentSeconds : '00',
				value : 0
			},
			playing : false,
			setVal : true
		}
	},
	methods:{
		playMusic(){
			const audio = document.getElementById('audio')
			this.audio.minutes = parseInt(audio.duration / 60, 10)
			this.audio.seconds = parseInt(audio.duration % 60)
			audioInterval = setInterval(() => { 
				if(!this.setVal)
					return
				const minutes = parseInt(audio.currentTime / 60, 10)
				const seconds = parseInt(audio.currentTime % 60)
				this.audio.currentMinutes = minutes
				this.audio.currentSeconds = seconds
				if(minutes < 10)
					this.audio.currentMinutes = '0' + minutes
				if(seconds < 10)
					this.audio.currentSeconds = '0' + seconds
				this.audio.value = audio.currentTime / audio.duration
				document.querySelector('.progress').style.width = this.audio.value*94 + '%'
			},1000)
			audio.play()
			this.playing = true
		},
		endMusic(){
			clearInterval(audioInterval)
			this.switchMusic(1)
		},
		switchMusic(e){
			if(e === 1 &&  currentUrl === urls.length-1)
				currentUrl = 0
			else if(e === -1 && currentUrl === 0)
				currentUrl = urls.length-1
			else
				currentUrl += e
			this.audio.url = urls[currentUrl].url
			this.audio.name = urls[currentUrl].name
		},
		dragTime(e){
			const value = e.target.value
			const minutes = parseInt(value * audio.duration / 60, 10)
			const seconds = parseInt(value * audio.duration % 60)
			this.audio.currentMinutes = minutes
			this.audio.currentSeconds = seconds
			if(minutes < 10)
				this.audio.currentMinutes = '0' + minutes
			if(seconds < 10)
				this.audio.currentSeconds = '0' + seconds
			this.audio.value = value
			document.querySelector('.progress').style.width = this.audio.value*95 + '%'
		},
		musicSet(){
			const audio = document.getElementById('audio')
			if(this.playing)
				audio.pause()
			else
				audio.play()
			this.playing = !this.playing
		},
		changeTime(e){
			const value = e.target.value
			const audio = document.getElementById('audio')
			audio.currentTime = value * audio.duration
			this.setVal = true
		}
	},
	mounted() {
		urls.sort(() => {
			return 0.5-Math.random()
		})
		this.audio.url = urls[currentUrl].url
		this.audio.name = urls[currentUrl].name
	}
}
</script>

<style>
.musicBox{
	position: absolute;
	z-index: 99;
	right: 20px;
	top: 10px;
}
.musicBox .picture{
	/* rotate对inline元素不起作用，转化成block */
	display: block;
	font-size: 1.8em;
	color: var(--green1);
	cursor: pointer;
	animation: musicRotate 5s linear infinite;
}
@keyframes musicRotate{
	from{
		transform: rotate(0);
	}
	to{
		transform: rotate(360deg);
	}
}

.musicBox .box{
	position: absolute;
	min-width: 250px;
	left: -220px;
	top: 0;
	width: 200px;
	padding: 5px;
	background-color: #FFFFFF;
	box-shadow: var(--box-shadow1);
	border-radius: 5px;
}
.musicBox .box header{
	text-align: center;
}
.musicBox .box header .time{
	margin-bottom: 5px;
	font-size: 0.9em;
	color: var(--green2);
}

.musicBox .box .btns{
	margin-top: 15px;
	display: flex;
	justify-content: center;
}
.musicBox .box .btns i{
	margin: 0 15px;
	font-size: 1.5em;
	cursor: pointer;
}
.musicBox .box .btns i.icon-last,
.musicBox .box .btns i.icon-next{
	color: var(--font-dark-remark);
}
.musicBox .box .btns i.icon-pause,
.musicBox .box .btns i.icon-start{
	color: var(--green2);
}

/* 去掉默认样式 */
.range{
	-webkit-appearance: none;
	width: 100%;
	border: none;
	position: absolute;
	left: 0;
}
.range:focus{
	box-shadow: none;
}
.range::-webkit-slider-runnable-track{
	height: 5px;
	border-radius: 20px;
	background-color: var(--tint-gray);
	z-index: 0;
}  
/* 滑块修改样式 */
.range::-webkit-slider-thumb{
	-webkit-appearance: none;
	height: 13px;
	width: 13px;
	margin-top: -4px;
	background-color: var(--green2);
	border-radius: 50%;
	cursor: pointer;
}
.progress{
	background-color: var(--green1);
	height: 5px;
	width: 0;
	border-radius: 20px;
	position: absolute;
	overflow: hidden;
	z-index: 1;
	cursor: pointer;
}
.progress:hover{
	z-index: 0;
}
</style>
