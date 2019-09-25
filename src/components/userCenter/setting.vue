<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<ul class="set-nav">
			<li v-for="item in navList" :key="item.id" @click="goPath(item.path)">
				<img :src="item.icon" alt="" class="icon"/>
				<div class="name">{{item.name}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'设定',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				navList:[
					{
						id:0,
						name:'实名认证',
						icon:require('@/assets/images/icon/nav-cert.png'),
						path:'/userCert'
					},
					{
						id:1,
						name:'个人信息设置',
						icon:require('@/assets/images/icon/nav-userInfo.png'),
						path:'/userInfo'
					},
					{
						id:2,
						name:'修改登录密码',
						icon:require('@/assets/images/icon/nav-modify.png'),
						path:'/resetPwd'
					},
					{
						id:3,
						name:'修改支付密码',
						icon:require('@/assets/images/icon/nav-modify.png'),
						path:'/resetPayPwd'
					}
				]
			}
		},
		created(){
		},
		methods:{
			//跳转
			goPath(path){
				router.push({path:path});
			}
		}
	}
</script>
