<template>
<div class="musicBox">
	<i 
		class="iconfont icon-music"
		@mouseenter="showBox=true"
	>
  </i>
	<div class="box" v-show="showBox" @mouseleave="showBox=false">
		<div class="animate">
			<div
				class="item"
				v-for="item in 32"
				:key="item"
			>
			</div>
		</div>
		<header>
			<p class="name">{{audio.name}}</p>
			<p class="time">{{audio.currentMinutes}}:{{audio.currentSeconds}}/{{audio.minutes}}:{{audio.seconds}}</p>
			<div class="progress"></div>
			<input
				type="range" 
				class="range" 
				:value='audio.value' 
				min="0" max="1" step="0.001" 
				@mousedown="setTime=true" 
				@touchstart="setTime=true"
				@input="dragTime"
				@change="changeTime"
			>
		</header>
		
		<div class="btns">
			<i class="iconfont icon-last" @click="switchMusic(-1)"></i>
			<i class="iconfont icon-start" v-if="!playing" @click="musicPlay()"></i>
			<i class="iconfont icon-pause" v-else @click="musicPlay()"></i>
			<i class="iconfont icon-next" @click="switchMusic(1)"></i>
		</div>
	</div>
</div>
</template>

<script>
var source,audioCtx,analyser,offect=0
var firstLoad = true
var urls
var currentUrl = 0
export default{
	data(){
		return{
			showBox : false,
			currentUrl : 0,
			audio : {},
			playing : false,
			setTime : false,
			buffer : ''
		}
	},
	methods:{
		initAudio(){
			document.querySelector('.progress').style.width = 0
			this.audio = {
				url : urls[currentUrl].url,
				name : urls[currentUrl].name,
				minutes : '00',
				seconds : '00',
				currentMinutes : '00',
				currentSeconds : '00',
				value : 0
			}
			offect = 0
			this.setTime = false
			this.playing = false
		},
		loadMusic(){
			this.initAudio()
			// 初始化audio API
			let AudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new AudioContext() //实例化AudioContext对象
			var dataArray
			
			// 请求音频文件，以二进制格式返回
			this.$axios.get(this.audio.url,{responseType:'arraybuffer'})
			.then(res => {
				// 解码二进制文件
				audioCtx.decodeAudioData(res.data,(buffer) => {
					this.buffer = buffer
					this.setSource()
					// 创建接受数组
					dataArray = new Uint8Array(analyser.frequencyBinCount)
					// 获取音频时长
					this.audio.minutes = parseInt(buffer.duration / 60, 10)
					this.audio.seconds = parseInt(buffer.duration % 60)
					// 开始播放
					source.start()
					if(firstLoad)
						audioCtx.suspend()
					else
						this.playing = true
					firstLoad = false
					draw()
				})
			})
			
			const doms = document.querySelectorAll('.animate .item')
			const draw = () => {
				requestAnimationFrame(draw)
				if(!this.playing) return
				analyser.getByteFrequencyData(dataArray)//傅里叶计算
				
				doms.forEach((item,i) => {
					item.style.height = `${dataArray[i]/8 + 30}px`
				})
				
				// 更新进度
				if(this.setTime) return
				const currentTime = audioCtx.currentTime + offect
				const minutes = parseInt(currentTime / 60, 10)
				const seconds = parseInt(currentTime % 60)
				this.audio.currentMinutes = minutes
				this.audio.currentSeconds = seconds
				if(minutes < 10)
					this.audio.currentMinutes = '0' + minutes
				if(seconds < 10)
					this.audio.currentSeconds = '0' + seconds
				this.audio.value = currentTime / source.buffer.duration
				document.querySelector('.progress').style.width = this.audio.value*94 + '%'
			}
			draw()
		},
		setSource(){
			// 创建音频解析器
			analyser = audioCtx.createAnalyser()
			// 计算频域信号时使用的 FFT，值为需要可视化的数量的两倍
			analyser.fftSize = 64
			// 创建播放节点
			source = audioCtx.createBufferSource()
			// 填充音频buffer数据
			source.buffer = this.buffer
			// 连接节点
			source.connect(analyser)
			analyser.connect(audioCtx.destination)
			// 播放结束事件
			source.onended = () => {
				if(audioCtx.currentTime > 0)
					this.switchMusic(1)
			}
		},
		switchMusic(e){
			if(!this.playing) return
			if(e === 1 &&  currentUrl === urls.length-1)
				currentUrl = 0
			else if(e === -1 && currentUrl === 0)
				currentUrl = urls.length-1
			else
				currentUrl += e
			source.stop()
			this.loadMusic()
		},
		dragTime(e){
			const value = e.target.value
			// 更新当前时间
			const minutes = parseInt(value * source.buffer.duration / 60, 10)
			const seconds = parseInt(value * source.buffer.duration % 60)
			this.audio.currentMinutes = minutes
			this.audio.currentSeconds = seconds
			if(minutes < 10)
				this.audio.currentMinutes = '0' + minutes
			if(seconds < 10)
				this.audio.currentSeconds = '0' + seconds
			this.audio.value = value
			document.querySelector('.progress').style.width = this.audio.value*95 + '%'
		},
		changeTime(e){
			const value = e.target.value
			offect = value * this.buffer.duration
			source.stop()
			audioCtx = new AudioContext()
			this.setSource()
			source.start(0,offect)
			this.playing = true
			this.setTime = false
		},
		musicPlay(){
			if(this.playing)
				audioCtx.suspend()
			else
				audioCtx.resume()
			this.playing = !this.playing
		},
	},
	mounted() {
		urls = global.blogsInfo.music
		urls.sort(() => {
			return 0.5-Math.random()
		})
		this.loadMusic()
	},
	beforeDestroy() {
		this.initAudio()
		source.stop()
		audioCtx.close()
	}
}
</script>

<style>
.musicBox{
	position: absolute;
	z-index: 99;
	right: 15px;
	margin-top: 60px;
}
.musicBox .icon-music{
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

.musicBox .box .animate{
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	overflow: hidden;
}
.musicBox .box .animate .item{
	width: 2px;
	height: 30px;
	background-color: var(--green1);
	border-radius: 4px;
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
	left: 0;
}
.range:focus{
	box-shadow: none;
}
/* 进度条样式 */
.range::-webkit-slider-runnable-track{
	height: 5px;
	border-radius: 20px;
	background-color: var(--tint-gray);
	z-index: 0;
}  
/* 滑块样式 */
.range::-webkit-slider-thumb{
	-webkit-appearance: none;
	height: 13px;
	width: 13px;
	margin-top: -4px;
	background-color: var(--green2);
	border-radius: 50%;
	cursor: pointer;
}
/* 填充背景 */
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
