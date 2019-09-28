<template>
	<div class="login-container">
		<topHeader ref="topHeader" :data="{title:'登录',isReturn:false}"></topHeader>
		<div class="login-wrap">
			<div style="text-align:center;margin:0 0 .8rem">
				<img :src="logo" alt="" style="width:1.46rem;" />
			</div>
			<group class="login-box">
				<x-input type="text" v-model="loginForm.userName" title="账号" placeholder="请输入账号" :show-clear="false" required name="userName" ref="userName">
					<!-- <div slot="label" class="icon icon-username"></div> -->
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.password" title="密码" placeholder="请输入密码" :show-clear="false" required name="password" ref="password"  @keyup.enter.native="handClickLogin">
					<!-- <div slot="label" class="icon icon-pwd"></div> -->
				</x-input>
			</group>
			<!--
			<group class="login-code">
				<x-input placeholder="验证码" required name="code" ref="code">
					<img slot="right-full-height" :src="loginForm.codeImg" @click="getCodeImg">
				</x-input>
			</group>
			-->
			<group>
				<x-button :show-loading="loading" class="login-btn" @click.native="handClickLogin">登录</x-button>
			</group>
			<div class="login-action">
				<a href="javascript:;" title="" @click="$router.push('/register')" style="float:left">免费注册</a>
				<a href="javascript:;" title="" @click="$router.push('/resetPassword')">忘记密码</a>
			</div>
		</div>
		<toast v-model="isError" type="text" width="20em">{{errorMsg}}</toast>
		<loading :show="loading" text="登录中"></loading>
	</div>
</template>

<script>
	import {userLoginApi,getUserInfoApi} from '@/api'
	import topHeader from '@/components/public/header.vue'
	import {XButton,Group,GroupTitle,XInput,Toast,Loading} from 'vux'
	export default{
		components: {
			XButton,
			Group,
			GroupTitle,
			XInput,
			Toast,
			topHeader,
			Loading
		},
		data(){
			return{
				loading:false,
				isError:false,
				errorMsg:'',
				loginForm:{
					userName:'',
					password:'',
					code:'',
					codeImg:'https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg'
				},
				logo:require('@/assets/images/logo.png')
			}
		},
		created(){
		},
		methods:{
			getCodeImg(){
				//换验证码图片
			},
			handClickLogin(){
				//验证是否输入
				let valid = true;
				this.errorMsg = ''
				if(!this.$refs.userName.valid){
					valid = false
					this.errorMsg = '请输入账号'
				}
				if(!this.$refs.password.valid){
					valid = false
					this.errorMsg += this.errorMsg == '' ? '请输入密码' : '、密码'
				}
				/*
				if(!this.$refs.code.valid){
					valid = false
					this.errorMsg += this.errorMsg == '' ? '请输入验证码' : '、验证码'
				}
				*/
				if(valid){
					this.loading = true;
					//调用登录接口
					userLoginApi({
						account:this.loginForm.userName,
						pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.password)
					}).then((res)=>{
						if(res.code == 1){
							sessionStorage.setItem('token', JSON.stringify(res.data.utoken));
							this.getUserInfo(res.data.utoken)
						}else{
							this.$vux.toast.text(res.message)
							this.loading = false;
						}
					}).catch(()=>{this.loading = false;})
				}else{
					this.$vux.toast.text(this.errorMsg)
				}
			},
			getUserInfo(token){
				getUserInfoApi({
				}).then((res)=>{
					if(res.code == 1){
						sessionStorage.setItem('userInfo', JSON.stringify(res.data));
						router.push({path:'/home'});
					}else{
						this.$vux.toast.text('请您稍后登录！')
						this.loading = false;
					}
				}).catch(()=>{})
			}
		}
	}
</script>
