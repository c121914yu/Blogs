<template>
	<div class="checkbox">
		<div class="arr">
			<div
				class="tag"
				:class="checked.indexOf(item)>-1 ? 'checked' : ''"
				v-for="(item,index) in tags"
				:key="index"
				@click="chooseTag(item)"
				@dblclick="removeTag(index)"
			>
				{{item}}
			</div>
		</div>
		<div class="newTag">
			<input type="text" placeholder="新标签" v-model="newTag">
			<button class="btn" @click="addTag">添加</button>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			tags : [...this.$store.state.tags],
			checked : [],
			newTag : ""
		}
	},
	watch:{
		checked(data){
			this.$emit("updateTags",data.join(','))
		}
	},
	methods:{
		addTag(){
			if(this.newTag != ""){
				this.tags.push(this.newTag)
				this.checked.push(this.newTag)
				this.newTag = ""
			}
		},
		removeTag(index){
			const tag = this.tags[index]
			if(this.$store.state.tags.indexOf(tag) === -1){
				this.tags.splice(index,1)
				this.checked.find((item,i) => {
					if(item === tag){
						this.checked.splice(i,1)
						return true
					}
				})
			}
		},
		chooseTag(item){
			let index
			const check = this.checked.find((checked,i) => {
				if(item === checked){
					index = i
					return true
				}
			})
			if(!check)
				this.checked.push(item)
			else
				this.checked.splice(index,1)
		}
	},
}
</script>

<style scoped="scoped">
.checkbox{
	position: absolute;
	margin-top: 10px;
	left: 0;
	width: 100%;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: var(--box-shadow1);
}
.checkbox .arr{
	display: flex;
	flex-wrap: wrap;
}
.checkbox .arr .tag{
	margin: 5px;
	padding: 0 10px;
	background-color: #e9e9e9;
	border-radius: 10px;
	cursor: pointer;
}
.checkbox .arr .tag:hover{
	background-color: rgba(62,175,124,0.6);
	color: #FFFFFF;
}
.checkbox .arr .tag.checked{
	background-color: var(--green1);
	color: #FFFFFF;
}

.checkbox .newTag{
	margin: 10px;
	display: flex;
}
.checkbox .newTag button{
	margin-left: 10px;
	white-space: nowrap;
}
</style>
