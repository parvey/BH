<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="userCert-wrap">
			<group label-align="left">
				<x-input type="password" title="原密码" v-model="cert.pwd" placeholder="请输入原密码" :show-clear="false" required name="pwd" ref="pwd"></x-input>
			</group>
			<group label-align="left">
				<x-input type="password" title="新密码" v-model="cert.new_pwd" placeholder="请输入新密码" :show-clear="false" required name="new_pwd" ref="new_pwd"></x-input>
			</group>
			<group label-align="left">
				<x-input type="password" title="再次输入" v-model="cert.c_new_pwd" placeholder="确认新密码" :show-clear="false" required name="c_new_pwd" ref="c_new_pwd"></x-input>
			</group>
			<group class="btn-wrap">
				<x-button :show-loading="loading" class="login-btn" @click.native="handleClickSub">提交修改</x-button>
			</group>
		</div>

	</div>
</template>

<script>
	import {userChangepasswordApi} from '@/api'
	import {Group,GroupTitle,XInput,XButton,Radio,XAddress,ChinaAddressV4Data} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Group,
			GroupTitle,
			XInput,
			XButton,
			Radio,
			XAddress
		},
		data(){
			return{
				loading:false,
				topHeader:{
					title:'修改登录密码',
					isReturn:true,
					rtnRouter:'/setting'
				},
				userInfo:'',
				cert:{
					pwd:'',
					new_pwd:'',
					c_new_pwd:''

				}
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.cert.avatar = this.userInfo.avatar;
			this.cert.nickname = this.userInfo.nickname;
			this.cert.address_mobile = this.userInfo.address_mobile;
		},
		methods:{
            //提交资料
            handleClickSub(){
				//验证是否输入
				if(!this.$refs['pwd','new_pwd','c_new_pwd'].valid){
					this.$message.error('请输入密码')
				}else{
					this.loading = true;
					userChangepasswordApi({
						pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.pwd),
						new_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.new_pwd),
						c_new_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.c_new_pwd)
					}).then((res)=>{
						if(res.code == 1){
							this.$message.success('密码修改成功，请重新登录');
							router.push({path:'/login'});
						}else{
							this.$message.error(res.message)
						}
						this.loading = false;
					}).catch(()=>{
						this.loading = false;
					})
				}
            }
		}
	}
</script>
