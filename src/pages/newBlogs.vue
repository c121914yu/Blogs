<template>
	<div class="newBlogs">
		<header>
			<div class="title">
				<input 
					type="text" 
					placeholder="博客标题" 
					maxlength="100"
					spellcheck="false"
					v-model="article.title"
					@input="titleCount = article.title.length"
				>
				<span class="title-count">{{titleCount}}/100</span>
			</div>
			<label class="btn checkFile">
				<input type="file" class="file" @change="checkFile">
				<span>选择文件</span>
			</label>
			<button class="btn issue" @click="issue">发布博客</button>
		</header>
		
		<div class="grid">
			<div class="left">
				<input type="search" placeholder="作者" v-model="article.author">
				<Select
					style="margin: 15px 0;"
					placeholder="选择分类"
					:arrData="categeroy"
					v-model="article.categeroy"
				>
				</Select>
				<div class="tags">
					<p 
						:class="article.tags==='' ? 'remark' : ''"
						@click="checkTag=!checkTag"
					>
						{{article.tags==='' ? '选择标签':article.tags}}
					</p>
					<checkbox
						v-show="checkTag"
						@updateTags="updateTags"
					>
					</checkbox>
				</div>
			</div>
			<textarea
				class="brief" 
				spellcheck="false" 
				placeholder="简介"
				v-model="article.brief"
			>
			</textarea>
		</div>
	</div>
</template>

<script>
import Select from "../components/select.vue"
import checkbox from "../components/checkbox.vue"
import {addBlogs} from "../../static/axios/api.js"
export default{
	data(){
		return{
			titleCount : 0,
			categeroy : [],
		  checkTag : false,
			file : "",
			article : {
				title : "",
				brief : "",
				author : "yujinlong",
				categeroy : "",
				tags : ""
			}
		}
	},
	methods:{
		checkFile(e){
			const files = e.target.files
			if(files.length > 0){
				console.log(files[0])
				if(files[0].name === "blogs.md")
					this.file = files[0]
				else
					alert("选择文件错误")
			}
		},
		updateTags(e){
			this.article.tags = e
		},
		issue(){
			if(this.article.title === "")
				alert("标题为空")
			else if(this.article.brief === "")
				alert("简介为空")
			else if(this.article.author === "")
				alert("作者为空")
			else if(this.article.categeroy === "")
				alert("分类为空")
			else if(this.article.tags === "")
				alert("标签为空")
			else if(this.file === "")
				alert("文件为空")
			else{
				let formData = new FormData()
				formData.append("file",this.file)
				formData.append("param",JSON.stringify(this.article))
				addBlogs(formData)
				.then(res => {
					alert("发布成功")
				})
			}
		}
	},
	created(){
		this.$store.state.categeroy.forEach(item => {
			this.categeroy.push(item.text)
		})
		this.categeroy.splice(-1,1)
	},
	components:{
		Select,
		checkbox
	}
}
</script>

<style>

.newBlogs header{
	background-color: #F4F4F4;
	padding: 10px;
	width: 100%;
	display: flex;
	align-items: center;
}

.newBlogs header .title{
	margin: 0 10px;
	flex: 1;
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border: var(--border1);
	border-radius: 5px;
	padding: 0 5px;
}
.newBlogs header .title input{
	padding: 5px;
	border: none;
	flex: 1;
}
.newBlogs header .title input:focus{
	box-shadow: none;
}
.newBlogs header .title .title-count{
	font-size: 1.2em;
	margin: 0 5px;
	color: var(--green2);
}
.newBlogs header .btn{
	align-self: stretch;
	margin: 0 5px;
	transition: var(--hover-speed);
}
.newBlogs header .btn:hover{
	box-shadow: none;
	transform: scale(1.1);
}
.newBlogs header .btn.checkFile{
	background-color: var(--blue);
	font-size: 1em;
	color: #FFFFFF;
	display: flex;
	align-items: center;
}
.newBlogs header .btn .file{
	position: absolute;
	width: 1px;
	height: 1px;
	opacity: 0;
	cursor: pointer;
}


.newBlogs .grid{
	margin: 10px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 15px;
	user-select: none;
}

.newBlogs .grid .left{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.newBlogs .grid .left input{
	width: 100%;
	padding: 5px;
}
.newBlogs .grid .left .tags{
	padding: 5px;
	border: var(--border1);
	border-radius: 5px;
}
.newBlogs .grid .left .tags p{
	width: 100%;
	font-size: 1em;
	cursor: pointer;
}

.newBlogs .brief{
	height: 100%;
	resize: none;
	padding: 10px;
}
</style>
