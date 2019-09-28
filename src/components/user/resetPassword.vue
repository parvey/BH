<template>
	<div class="login-container">
		<topHeader ref="topHeader" :data="{title:'重置密码',isReturn:true,rtnRouter:'/login'}"></topHeader>
		<div class="login-wrap reg-wrap">
			<group class="login-box">
				<x-input type="text" v-model="loginForm.userName" placeholder="请输入您的手机号码" :show-clear="false" is-type="china-mobile" required name="userName" ref="userName">
				</x-input>
			</group>
			<group class="login-code">
				<x-input v-model="loginForm.code" placeholder="请输入验证码" required name="code" ref="code">
					<x-button slot="right" type="primary" mini @click.native="getCode">{{loginForm.isCountDown ? (loginForm.countDown + '秒后重新获取') : '发送验证码'}}</x-button>
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.password" placeholder="请输入您的新密码" :show-clear="false" required name="password" ref="password">
					
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.checkPassword" placeholder="请确认密码" :show-clear="false" required name="checkPassword" ref="checkPassword">
					
				</x-input>
			</group>
			<group>
				<x-button :show-loading="loading" class="login-btn" @click.native="handClickRestPwd">确定</x-button>
			</group>
		</div>
		<toast v-model="isError" type="text" width="20em">{{errorMsg}}</toast>
	</div>
</template>

<script>
	import {userForgetpwdApi,sysSendCodeApi} from '@/api'
	import topHeader from '@/components/public/header.vue'
	import {XButton,Group,GroupTitle,XInput,Toast} from 'vux'
	export default{
		components: {
			XButton,
			Group,
			GroupTitle,
			XInput,
			Toast,
			topHeader
		},
		data(){
			return{
				loading:false,
				isError:false,
				errorMsg:'',
				loginForm:{
					userName:'',
					password:'',
					checkPassword:'',
					code:'',
					countDown:60,
					isCountDown:false
				}
			}
		},
		created(){
		},
		methods:{
			getCode(){
				if(!this.$refs.userName.valid){
					this.$vux.toast.text('请输入正确的手机号码')
					return false;
				}
				if(!this.loginForm.isCountDown){
					this.loginForm.isCountDown = true;
					//发送验证码
					sysSendCodeApi({
						account:this.loginForm.userName,
						type:'2'
					}).then((res)=>{
						if(res.code === 1){
							this.$vux.toast.text('验证码发送成功');
							let total = 60;
							let countDownInterval = setInterval(()=>{
								this.loginForm.countDown = total--
								if(total === 0){
									clearInterval(countDownInterval)
									this.loginForm.isCountDown = false;
									this.loginForm.countDown = 60;
								}
							},1000)
						}else{
							this.$vux.toast.text(res.message)
							this.loginForm.isCountDown = false;
						}
					}).catch(()=>{})
				}
			},
			handClickRestPwd(){
				//验证是否输入
				let valid = true;
				this.errorMsg = ''
				if(!this.$refs['code','password','checkPassword'].valid){
					valid = false;
					this.errorMsg = '请输入您的资料'
				}else{
					if(!this.$refs.userName.valid){
						valid = false;
						this.errorMsg = '请输入正确的手机号码'
					}else if(this.loginForm.password !== this.loginForm.checkPassword){
						valid = false;
						this.errorMsg = '两次密码不一致'
					}
				}
				if(valid){
					this.loading = true;
					userForgetpwdApi({
						account:this.loginForm.userName,
						verify_code:this.loginForm.code,
						pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.password),
						c_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.checkPassword)
					}).then((res)=>{
						if(res.code === 1){
							this.$vux.toast.text('密码重置成功，请登录！');
							router.push({path:'/login'});
						}else{
							this.$vux.toast.text(res.message)
						}
						this.loading = false;
					}).catch(()=>{this.loading = false;})
				}else{
					this.$vux.toast.text(this.errorMsg)
				}
			}
		}
	}
</script>
