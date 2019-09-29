<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="userCenter-top">
			<i class="icon"></i>
			<div class="nickName">{{userInfo.name == "" ? '匿名' : userInfo.name}}</div>
			<div class="ID">{{userInfo.mobile}}</div>
			<div class="go" @click="goPath('/userInfo')"></div>
		</div>
		
		<div class="userCenter-nav" v-for="(item,index) in navList2" :key="index">
			<div class="top">
				<span class="c" v-if="item.name != ''">{{item.name}}</span>
			</div>
			<ul v-if="item.child.length > 0">
				<li v-for="(item2,index2) in item.child" :key="index2" @click="goPath(item2.path)">
					<i :style="{backgroundImage:'url('+item2.icon+')'}"></i>
					<span class="name">{{item2.name}}</span>
				</li>
			</ul>
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
				navList2:[
					{
						name:'',
						child:[
							{
								name:'邀请码',
								path:'/myInvitCode',
								icon:require('@/assets/images/content/userCenter/nav-1.png')
							},
							{
								name:'在线客服',
								path:'/custSrvCenter',
								icon:require('@/assets/images/content/userCenter/nav-2.png')
							}
						]
					},
					{
						name:'密码设置',
						child:[
							{
								name:'登录密码',
								path:'/resetPwd',
								icon:require('@/assets/images/content/userCenter/nav-3.png')
							},
							{
								name:'交易密码',
								path:'/resetPayPwd',
								icon:require('@/assets/images/content/userCenter/nav-4.png')
							}
						]
					},
					{
						name:'安全设置',
						child:[
							{
								name:'实名认证',
								path:'/userCert',
								icon:require('@/assets/images/content/userCenter/nav-5.png')
							}
						]
					}
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
					this.$vux.toast.text('复制成功');
					clipboard.destroy();
				})
				clipboard.on('error',e=>{
					this.$vux.toast.text('请手动复制');
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
						this.$vux.toast.text('激活成功');
						this.getUserChild();
					}else{
						this.$vux.toast.text(res.message)
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
			},
			goPath(path){
				this.$router.push({path:path})
			}
		}
	};
</script>
<style lang="less">
	.userCenter-top{
		padding:.54rem 0 .54rem .35rem;background:#fff;position:relative;overflow:hidden;
		.icon{display:block;width:.9rem;height:.9rem;border-radius:100%;background:url('../../assets/images/logo.png') no-repeat center center / cover;float:left;margin:0 .27rem 0 0;}
		.nickName{line-height:.37rem;font-weight:600;font-size:.26rem;color:#000;margin:.13rem 0 0 0;}
		.ID{line-height:.32rem;color:#817f80;font-size:.22rem;}
		.go{display:block;height:100%;width:1rem;background:url(../../assets/images/icon/icon-go2.png) no-repeat right center / .14rem auto;position:absolute;right:.26rem;top:0px;}
	}

	.userCenter-nav{
		// border-top:.24rem solid #f2f2f2;
		.top{
			padding:.13rem 0 .13rem .36rem;
			background:#f2f2f2;
			.c{display:block;line-height:.4rem;height:.4rem;color:#797979;font-size:.28rem;}
		}
		ul{
			padding:0 0 0 .4rem;
			li{
				display:block;
				padding:0 0 0 .8rem;
				border-top:1px solid #f2f2f2;
				position:relative;
				&:first-child{border-top:0px;}
				i{
					display:block;
					width:.38rem;
					height:.38rem;
					//background:url(../../assets/images/test/nav.png) no-repeat center center / cover;
					background-repeat:no-repeat;
					background-size:cover;
					background-position:center center;
					position:absolute;
					left:0px;
					top:.24rem;
				}
				.name{display:block;color:#000;font-size:.26rem;line-height:.88rem;}
			}
		}
	}

</style>
