<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<div class="assets-container" ref="scroller">
			<vue-scroll :ops="ops" ref="vs" @refresh-start="getData">
			
				<div class="my_assets">
					<div class="top">我的资产(QC)</div>
					<div class="num">0</div>
					<div class="num2">≈0.00USDT</div>
				</div>

				<div class="assets-wrap" ref="wrap">
					<div class="assets_list">
						<div class="box">ETH 0%</div>
						<div class="box">USDT 0%</div>
					</div>
					<div class="nav_list">
						<div class="top">BH Play</div>
						<ul class="clearfix">
							<li v-for="(item,index) in navList" :key="index" @click="$router.push(item.path)">
								<img :src="item.icon" alt="" class="icon">
								<span class="name">{{item.name}}</span>
							</li>
						</ul>
					</div>
					<div class="my_assets_list">
						<div class="top">资产</div>
						<ul>
							<li>
								<i class="icon" :style="{backgroundImage:'url('+pic+')'}"></i>
								<div class="b_1">
									<div class="c_1">ETH</div>
									<div class="c_2">$0.99</div>
								</div>
								<div class="b_2">
									<div class="c_1">0</div>
									<div class="c_2">$0.00</div>
								</div>
							</li>
							<li>
								<i class="icon" :style="{backgroundImage:'url('+pic+')'}"></i>
								<div class="b_1">
									<div class="c_1">ETH</div>
									<div class="c_2">$0.99</div>
								</div>
								<div class="b_2">
									<div class="c_1">0</div>
									<div class="c_2">$0.00</div>
								</div>
							</li>
							<li>
								<i class="icon" :style="{backgroundImage:'url('+pic+')'}"></i>
								<div class="b_1">
									<div class="c_1">ETH</div>
									<div class="c_2">$0.99</div>
								</div>
								<div class="b_2">
									<div class="c_1">0</div>
									<div class="c_2">$0.00</div>
								</div>
							</li>
						</ul>
					</div>
				</div>


			</vue-scroll>
		</div>
		


		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {} from '@/api'
	import {XHeader} from 'vux'
	import topHeader from '@/components/public/header2.vue'
	import tabbar from '@/components/public/tabbar.vue'

	export default{
		components:{
			topHeader,
			tabbar,
			XHeader
		},
		data(){
			return{
				topHeader:{
					title:'资产',
					isReturn:false,
					rtnRouter:''
				},
				userInfo:'',
				ops:{
					vuescroll:{
						mode:'slide',
						pullRefresh:{
							enable:true,
							auto:true,
							tips:{								
						        deactive: '下拉刷新',
						        active: '释放刷新',
						        start: '',
						        beforeDeactive: '刷新成功'
							}
						},
						pushLoad:{
							enable:false
						}
					},
					bar:{
						background:'#00000',
						opacity:0
					}
				},
				navList:[
					{
						name:'收款码',
						icon:require('@/assets/images/content/assets-1.png'),
						path:'/paymentCode'
					},
					{
						name:'持有卡片',
						icon:require('@/assets/images/content/assets-2.png'),
						path:''
					},
					{
						name:'生息宝',
						icon:require('@/assets/images/content/assets-3.png'),
						path:''
					},
					{
						name:'资产业绩',
						icon:require('@/assets/images/content/assets-4.png'),
						path:''
					}
				],
				pic:require('@/assets/images/test/coin-icon3.png')
			}
		},
		created(){
		},
		methods:{
			//给scroll赋值高度
			getHeight(){
	            let bodyHeight = document.documentElement.clientHeight;
	            let scroller = this.$refs.scroller;
	            let wrap = this.$refs.wrap
	            scroller.style.height = (bodyHeight-99)+"px";
	            wrap.style.minHeight = (bodyHeight - 99 - document.querySelector('.my_assets').offsetHeight) + "px"
			},
			getData(vsInstance, refreshDom, done){
				if(!done){
					this.$vux.loading.show({
					 text: ''
					})
				}
				setTimeout(()=>{
					console.log('1')
					if(done){
						done()
					}else{
						this.$vux.loading.hide()
					}
				},1000)
			}
		},
		mounted(){
			this.getHeight()
		}
	};
</script>
<style lang="less" scoped>
	.assets-container{position:relative;background:#e60012;}

	.my_assets{
		height:2.7rem;
		padding:.25rem .55rem 0;
		color:#fff;
		background:#e60012;
		.top{height:.48rem;line-height:.48rem;font-size:.28rem;}
		.num{height:.6rem;line-height:.6rem;font-size:.52rem;font-weight:600;margin:.1rem 0 0 0;}
		.num2{height:.38rem;line-height:.38rem;font-size:.26rem;opacity:0.8;}
	}

	.assets-wrap{
		padding:0 .28rem .4rem;background:#fff;
		.assets_list{
			height:.55rem;
			padding:.09rem .28rem 0;background:#fff;border-top-left-radius:10px;border-top-right-radius:10px;box-shadow:0px -1px 1px rgba(0, 0, 0, 0.2);position:relative;top:-.54rem;
			.box{
				width:50%;
				padding:.1rem 0 .1rem .19rem;color:#b7b7b7;font-size:.22rem;line-height:.22rem;position:relative;float:left;
				&:before{content:"";display:block;width:.1rem;height:.1rem;border-radius:100%;background:#ff6ad1;position:absolute;left:0px;top:50%;transform:translateY(-50%);}
				&:nth-child(2):before{background:#ffdc64}
			}
		}
	}

	.nav_list{
		.top{padding:0 .21rem;height:.42rem;line-height:.42rem;font-weight:600;font-size:.24rem;}
		ul{
			li{
				list-style:none;
				padding:.45rem 0 .45rem 1.1rem;
				width:3.35rem;
				border-radius:5px;
				box-shadow:0px 0px 2px rgba(0,0,0,0.2);
				position:relative;
				margin:.24rem 0 0 0;
				&:nth-child(2n-1){float:left;}
				&:nth-child(2n){float:right;}
				img{display:block;width:.55rem;height:.55rem;border-radius:100%;position:absolute;left:.28rem;top:50%;transform:translateY(-50%);}
				.name{height:.36rem;line-height:.36rem;font-weight:600;font-size:.24rem;}
			}
		}
	}

	.my_assets_list{
		margin:.4rem 0 0 0;
		.top{padding:0 .21rem;height:.42rem;line-height:.42rem;font-weight:600;font-size:.24rem;}
		ul{
			li{
				list-style:none;
				padding:.24rem 0 .22rem .77rem;
				height:1.26rem;
				border-radius:5px;
				box-shadow:0px 0px 2px rgba(0,0,0,0.2);
				position:relative;
				margin:.24rem 0 0 0;
				.icon{display:block;width:.45rem;height:.45rem;background-repeat:no-repeat;background-position:center center;background-size:cover;position:absolute;left:.17rem;top:50%;transform:translateY(-50%);}
				.b_1{
					width:1.25rem;float:left;
					.c_1{height:.42rem;line-height:.42rem;color:#000;font-size:.26rem;}
					.c_2{height:.38rem;line-height:.38rem;color:#706868;font-size:.24rem;}
				}
				.b_2{
					float:left;
					.c_1{height:.42rem;line-height:.42rem;color:#000;font-size:.26rem;}
					.c_2{height:.38rem;line-height:.38rem;color:#706868;font-size:.24rem;}
				}
			}
		}
	}


</style>