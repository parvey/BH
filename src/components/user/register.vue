<template>
	<div class="login-container login-container2">
		<topHeader ref="topHeader" :data="{title:'会员注册',isReturn:true,rtnRouter:'/login'}"></topHeader>
		<div class="login-wrap reg-wrap">
			<group class="login-box">
				<x-input type="text" v-model="loginForm.userName" title="账号" placeholder="请输入您的手机号码" :show-clear="false" is-type="china-mobile" required name="userName" ref="userName">
				</x-input>
			</group>
			<group class="login-code">
				<x-input v-model="loginForm.code" title="验证码" placeholder="请输入验证码" required name="code" ref="code">
					<x-button slot="right" type="primary" mini @click.native="getCode">{{loginForm.isCountDown ? (loginForm.countDown + '秒后重新获取') : '发送验证码'}}</x-button>
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="text" v-model="loginForm.invitCode" title="邀请码" placeholder="请输入邀请码" :show-clear="false" name="invitCode" ref="invitCode">
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.payPassword" title="支付密码" placeholder="请输入支付密码" :show-clear="false" required name="payPassword" ref="payPassword">					
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.checkPayPassword" title="确认密码" placeholder="请确认支付密码" :show-clear="false" required name="checkPayPassword" ref="checkPayPassword">					
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.password" title="登录密码" placeholder="请输入您的密码" :show-clear="false" required name="password" ref="password">
				</x-input>
			</group>
			<group class="login-box">
				<x-input type="password" v-model="loginForm.checkPassword" title="确认密码" placeholder="请确认密码" :show-clear="false" required name="checkPassword" ref="checkPassword">
				</x-input>
			</group>
			<group>
				<x-button :show-loading="loading" class="login-btn" @click.native="handClickRegister">注册</x-button>
			</group>
		</div>
		<toast v-model="isError" type="text" width="20em">{{errorMsg}}</toast>
	</div>
</template>

<script>
	import {userRegisterApi,sysSendCodeApi} from '@/api'
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
					invitCode:'',
					payPassword:'',
					checkPayPassword:'',
					countDown:60,
					isCountDown:false
				}
			}
		},
		created(){
			this.loginForm.invitCode = this.$route.query.invite_code == undefined ? '' : this.$route.query.invite_code
		},
		methods:{
			getCode(){
				if(!this.$refs.userName.valid){
					this.$message.error('请输入正确的手机号码')
					return false;
				}
				if(!this.loginForm.isCountDown){
					this.loginForm.isCountDown = true;
					//发送验证码
					sysSendCodeApi({
						account:this.loginForm.userName,
						type:'1'
					}).then((res)=>{
						if(res.code === 1){
							this.$message.success('验证码发送成功');
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
							this.$message.error(res.message)
							this.loginForm.isCountDown = false;
						}
					}).catch(()=>{})
				}
			},
			handClickRegister(){
				//验证是否输入
				let valid = true;
				this.errorMsg = ''
				if(!this.$refs['code','payPassword','checkPayPassword','password','checkPassword'].valid){
					valid = false;
					this.errorMsg = '请输入您的注册资料'
				}else{
					if(!this.$refs.userName.valid){
						valid = false;
						this.errorMsg = '请输入正确的手机号码'
					}else if(this.loginForm.payPassword !== this.loginForm.checkPayPassword){
						valid = false;
						this.errorMsg = '两次支付密码不一致'
					}else if(this.loginForm.password !== this.loginForm.checkPassword){
						valid = false;
						this.errorMsg = '两次密码不一致'
					}
				}
				if(valid){
					this.loading = true;
					userRegisterApi({
						account:this.loginForm.userName,
						verify_code:this.loginForm.code,
						pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.password),
						c_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.checkPassword),
						pay_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.payPassword),
						c_pay_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.loginForm.checkPayPassword),
						invite:this.loginForm.invitCode
					}).then((res)=>{
						console.log(res)
						if(res.code == 1){
							this.$message.success('恭喜您，注册成功！');
							router.push({path:'/login'});
						}else{
							this.$message.error(res.message)
						}
						this.loading = false;
					}).catch(()=>{
						this.loading = false;
					})

				}else{
					//this.isError = true;
					this.$message.error(this.errorMsg)
				}
			}
		}
	}
</script>
