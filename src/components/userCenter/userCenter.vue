<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="userCenter-top">
			<i class="icon"></i>
			<div class="nickName">+8613537721129</div>
			<div class="ID">BH ID:684840474</div>
		</div>

		<ul class="userCenter-nav">
			<li>
				<i></i>
			</li>
		</ul>
		


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
				userInfo:{},
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
			//this.getUserInfo();
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			//this.sysGePrice();
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
	};
</script>
<style lang="less">
	.userCenter-top{padding:.54rem 0 .54rem .35rem;background:#fff;position:relative;overflow:hidden;}
	.userCenter-top .icon{display:block;width:.9rem;height:.9rem;border-radius:100%;background:url('../../assets/images/logo.png') no-repeat center center / cover;float:left;margin:0 .27rem 0 0;}
	.userCenter-top .nickName{line-height:.37rem;font-weight:600;font-size:.26rem;color:#000;margin:.13rem 0 0 0;}
	.userCenter-top .ID{line-height:.32rem;color:#817f80;font-size:.22rem;}

	.userCenter-nav{
		li{
			i{
				display:block;width:.38rem;height:.38rem;background:url(../../assets/images/test/nav.png) no-repeat center center / cover;
			}
		}
	}

</style>
