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
	import {userChangepaypasswordApi} from '@/api'
	import {Group,GroupTitle,XInput,XButton} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Group,
			GroupTitle,
			XInput,
			XButton
		},
		data(){
			return{
				loading:false,
				topHeader:{
					title:'修改支付密码',
					isReturn:true,
					rtnRouter:'/userCenter'
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
					this.$vux.toast.text('请输入密码')
				}else{
					this.loading = true;
					userChangepaypasswordApi({
						pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.pwd),
						new_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.new_pwd),
						c_new_pwd:this.$getCode('t='+new Date().getTime()+'&p='+this.cert.c_new_pwd)
					}).then((res)=>{
						if(res.code == 1){
							this.$vux.toast.text('支付密码修改成功！');
						}else{
							this.$vux.toast.text(res.message)
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
