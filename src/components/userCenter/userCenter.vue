<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="userCenter-container">
			<div class="userCenter-top">
				<img :src="userInfo.avatar" alt="" class="avatar" />
				<div class="nickName">{{userInfo.name == "" ? '匿名' : userInfo.name}}</div>
				<div class="phone">{{userInfo.mobile}}</div>
				<div class="balance">我的QC：{{userInfo.usdt_amount}}</div>
				 <div v-if="userInfo.is_activate == 1">已激活</div>
				<x-button type="warn" action-type="reset" class="btn" mini v-else @click.native="handleActivate">激活</x-button>
			</div>
			<div class="usercenter-wallet">
				<div class="top">我的钱包</div>
				<div class="type">转入ETH地址：</div>
				<div class="adress" :data-clipboard-text="userInfo.usdt_recharge_address" @click="copy">{{userInfo.usdt_recharge_address == '' ? '暂无ETH地址' : userInfo.usdt_recharge_address}}</div>
				<div style="font-size:12px;margin:3px 0 0 0;">当前兑换比例：1ETH = {{eth}}QC</div>
			</div>
			<ul class="usercenter-list">
				<li v-for="item in navList" :key="item.id" @click="goPath(item.path)">
					<img :src="item.icon" alt="" class="icon"/>
					<div class="name">{{item.name}}</div>
				</li>
			</ul>
			<div class="usercenter-exit" @click="isLoginOut = true">退出</div>
		</div>
		<tabbar ref="tabbar"></tabbar>

		<confirm
			v-model="isLoginOut"
			title="您确定退出吗？"
			@on-confirm="handleLoginOut"
		>
		</confirm>

		<confirm
			v-model="isWillActivate"
			title="确定激活该账号吗？"
			@on-confirm="activateChild"
		>
		</confirm>

	</div>
</template>

<script>
	import {getUserInfoApi,activateChildApi,sysGePriceApi} from '@/api'
	import {Panel,Confirm,XButton} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'
	import Clipboard from 'clipboard';

	export default{
		components:{
			Panel,
			Confirm,
			XButton,
			topHeader,
			tabbar
		},
		data(){
			return{
				topHeader:{
					title:'会员中心',
					isReturn:false,
					rtnRouter:''
				},
				userInfo:'',
				navList:[
					{
						id:8,
						name:'我的玩家',
						icon:require('@/assets/images/icon/nav-myProject.png'),
						path:'/myProject'
					},
					// {
					// 	id:5,
					// 	name:'预约列表',
					// 	icon:require('@/assets/images/icon/nav-bespeakList.png'),
					// 	path:'/bespeakList'
					// },
					{
						id:0,
						name:'我的收益',
						icon:require('@/assets/images/icon/nav-profit.png'),
						path:'/profitDtl'
					},
					// {
					// 	id:1,
					// 	name:'我推荐的会员',
					// 	icon:require('@/assets/images/icon/nav-rec.png'),
					// 	path:'/myRecommendation'
					// },
					{
						id:2,
						name:'邀请会员',
						icon:require('@/assets/images/icon/nav-invit.png'),
						path:'/myInvitCode'
					},
					{
						id:9,
						name:'我的团队',
						icon:require('@/assets/images/icon/nav-myTeam.png'),
						path:'/myTeam'
					},
					{
						id:3,
						name:'提现',
						icon:require('@/assets/images/icon/nav-withdrawals.png'),
						path:'/withdrawals'
					},
					{
						id:11,
						name:'提现记录',
						icon:require('@/assets/images/icon/nav-withdrawalsList.png'),
						path:'/withdrawalsList'
					},
					{
						id:11,
						name:'充值记录',
						icon:require('@/assets/images/icon/nav-withdrawalsList.png'),
						path:'/depositList'
					},
					// {
					// 	id:6,
					// 	name:'静态收益',
					// 	icon:require('@/assets/images/icon/nav-profit.png'),
					// 	path:'/staticReturn'
					// },
					{
						id:4,
						name:'设定',
						icon:require('@/assets/images/icon/nav-set.png'),
						path:'/setting'
					},
					{
						id:10,
						name:'客服中心',
						icon:require('@/assets/images/icon/nav-custSrvCenter.png'),
						path:'/custSrvCenter'
					}
					// {
					// 	id:7,
					// 	name:'团队收益',
					// 	icon:require('@/assets/images/icon/nav-profit.png'),
					// 	path:'/teamProfit'
					// }
				],
				isLoginOut:false,
				isWillActivate:false,
				eth:''
			}
		},
		created(){
			this.getUserInfo();
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.sysGePrice();
		},
		methods:{
			//登出
			handleLoginOut(){
				router.push({path:'/login'});
			},
			//跳转
			goPath(path){
				router.push({path:path});
			},
			//复制
			copy(){
				var clipboard = new Clipboard('.usercenter-wallet .adress');
				clipboard.on('success',e=>{
					this.$message.success('复制成功');
					clipboard.destroy();
				})
				clipboard.on('error',e=>{
					this.$message.error('请手动复制');
					clipboard.destroy();
				})
			},
			getUserInfo(token){
				getUserInfoApi({
				}).then((res)=>{
					if(res.code == 1){
						sessionStorage.setItem('userInfo', JSON.stringify(res.data));
						this.userInfo = res.data
					}
				}).catch(()=>{})
			},
			//激活
			handleActivate(){
				this.isWillActivate = true;
			},
			activateChild(){
				activateChildApi({}).then((res)=>{
					if(res.code === 1){
						this.$message.success('激活成功');
						this.getUserChild();
					}else{
						this.$message.error(res.message)
					}
				}).catch(()=>{})
			},
			sysGePrice(){
				sysGePriceApi({}).then((res)=>{
					if(res.code === 1){
						this.eth = res.data.eth;
					}
				}).catch(()=>{

				})
			}
		}
	}
</script>
