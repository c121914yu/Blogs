<template>
<div class="musicBox" @mouseleave="showBox=false">
	<i 
		class="iconfont icon-music picture"
		@mouseenter="showBox=true"
	>
  </i>
	<div class="box" v-show="showBox">
		<div id="animate"></div>
		<!-- <audio id="audio" :src="audio.url"></audio> -->
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
var N = 128
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
			showBox : true,
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
			Audio : '',
			Analyser : '',
			playing : false,
			setVal : true
		}
	},
	methods:{
		playMusic(){
			this.loadAudio()
			var scene = new THREE.Scene()
			var group = new THREE.Group()
			for(let i=0;i<N/2;i++){
			  let geometry = new THREE.Geometry()
			  let material = new THREE.MeshLambertMaterial({
			    color : 0x3eaf7c
			  })
				let p1 = new THREE.Vector3(i*7 - N/4*7,-15,0)
				let p2 = new THREE.Vector3(p1.x,15,0)
				geometry.vertices.push(p1,p2)
				let line = new THREE.Line(geometry,material)
			  group.add(line)
			}
			scene.add(group)
			var ambient = new THREE.AmbientLight(0xffffff)
			scene.add(ambient);
			var point = new THREE.PointLight(0xffffff,1)
			point.position.set(200,200,100)
			scene.add(point)
			var point2 = new THREE.PointLight(0xffffff,1)
			point2.position.set(-200,200,100)
			scene.add(point2)
			var width = 240
			var height = 80
			var k = width / height
			var s = 70
			var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1500)
			camera.position.set(0, 0,500)
			camera.lookAt(scene.position)
			var renderer = new THREE.WebGLRenderer()
			renderer.setSize(width, height)
			renderer.setClearColor(0xffffff, 1)
			document.getElementById('animate').appendChild(renderer.domElement)
			
			const render = () => {
			  renderer.render(scene, camera)
			  requestAnimationFrame(render)
			  if(this.Analyser && this.Audio.isPlaying){
			    var arr = this.Analyser.getFrequencyData()
			    group.children.forEach((elem, index) => {
			      elem.scale.y = arr[index] / 80 + 1
			    })
					// if(!this.setVal)
					// 		return
					// let duration = this.Audio.buffer.duration
					// let currentTime = this.Audio.source.context.currentTime
					// let minutes = parseInt(currentTime / 60, 10)
					// let seconds = parseInt(currentTime % 60)
					// this.audio.currentMinutes = minutes
					// this.audio.currentSeconds = seconds
					// if(minutes < 10)
					// 	this.audio.currentMinutes = '0' + minutes
					// if(seconds < 10)
					// 	this.audio.currentSeconds = '0' + seconds
					// this.audio.value = currentTime / duration
					// document.querySelector('.progress').style.width = this.audio.value*94 + '%'
			  }
			}
			render()
		},
		loadAudio(){
			const listener = new THREE.AudioListener()
			this.Audio = new THREE.Audio(listener)
			const audioLoader = new THREE.AudioLoader()
			audioLoader.load(this.audio.url,buffer => {
			  this.Audio.setBuffer(buffer)
				this.Analyser = new THREE.AudioAnalyser(this.Audio,2*N)
				this.audio.minutes = parseInt(buffer.duration / 60, 10)
				this.audio.seconds = parseInt(buffer.duration % 60)
				this.Audio.play()
				this.playing = true
			})
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
			this.Audio.stop()
			this.loadAudio()
		},
		dragTime(e){
			const value = e.target.value
			const duration = this.Audio.buffer.duration
			const minutes = parseInt(value * duration / 60, 10)
			const seconds = parseInt(value * duration % 60)
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
			if(this.playing)
				this.Audio.pause()
			else
				this.Audio.play()
			this.playing = !this.playing
		},
		changeTime(e){
			const value = e.target.value
			const duration = this.Audio.buffer.duration
			console.log(this.Audio.gain)
			this.setVal = true
			
		}
	},
	mounted() {
		urls.sort(() => {
			return 0.5-Math.random()
		})
		this.audio.url = urls[currentUrl].url
		this.audio.name = urls[currentUrl].name
		this.playMusic()
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
	max-width: 300px;
	left: -220px;
	top: 0;
	width: 200px;
	padding: 5px;
	background-color: #FFFFFF;
	box-shadow: var(--box-shadow1);
	border-radius: 5px;
}
.musicBox .box #animate{
	width: 100%;
	height: 80px;
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
