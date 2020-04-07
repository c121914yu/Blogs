<template>
	<div class="login">
		<div class="box">
			<h3 class="center">管理员登录</h3>
			<input type="password" placeholder="密码" v-model="password">
			<!-- <div class="btn" @click="login">登录</div> -->
			<dragVerify @login="login"></dragVerify>
		</div>
	</div>
</template>

<script>
import {managerLogin} from '../../static/axios/api.js'
import dragVerify from "./dragVerify.vue"
export default{
	data(){
		return{
			password : ""
		}
	},
	methods:{
		login(){
			managerLogin({password:this.password})
			.then(res => {
				localStorage.setItem('yjlmanager','121914yu')
				this.$emit('getBlogsInfo')
			})
		}
	},
	components:{
		dragVerify
	}
}
</script>

<style>
	.login{
		width: 100%;
		height: 100vh;
		background-color: #F4F4F4;
		user-select: none;
	}
	.login .box{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 30%;
		width: 300px;
		background-color: #FFFFFF;
		border-radius: 10px;
		box-shadow: var(--box-shadow1);
		padding: 10px;
	}
	.login .box input{
		margin-top: 5px;
		width: 100%;
		padding: 5px 10px;
		margin-bottom: 10px;
	}
	.login .box .btn{
		width: 50%;
		margin-left: 25%;
	}
</style>
