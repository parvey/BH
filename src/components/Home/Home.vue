<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="market-wrap">		
			<div class="market-top">本行情由第三方交易所提供。</div>
			<div class="market-theader">名称/最新价/涨跌幅</div>
			<div class="market-cl"></div>
			<div class="market-tbody">
				<ul>
					<li v-for="(item,index) in 20" :key="index">
						<i class="icon" :style="{backgroundImage:'url('+icon+')'}"></i>
						<div class="coin">
							<span>YBT</span>/
							<span class="unit">USDT</span>
						</div>
						<div class="price">$4.13</div>
						<div class="trend rise">+1.069%</div>
					</li>
				</ul>
			</div>
		</div>


		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getIndexNewsApi,getIndexPricerendApi,getBulletinListApi,indexBannerApi} from '@/api'
	import {Swiper,SwiperItem} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'

	export default{
		components:{
			topHeader,
			tabbar,
			Swiper,
			SwiperItem
		},
		data(){
			return{
				icon:require('@/assets/images/test/coin-icon3.png'),
				topHeader:{
					title:'行情',
					isReturn:false,
					rtnRouter:''
				},
				userInfo:'',
				newsList:[],			
				bannerList:[
				/*
					{
						url:'javascript:;',
						img:require('@/assets/images/banner/index-bnr1.jpg'),
						title:''
					},
					{
						url:'javascript:;',
						img:require('@/assets/images/banner/index-bnr1.jpg'),
						title:''
					}
					*/
				],
				BulletinList:[]
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			//this.indexBanner();
			//this.getBulletinList()
			//this.getIndexNews();
		},
		methods:{
			//banner
			indexBanner(){
				indexBannerApi({}).then((res)=>{
					if(res.code === 1){
						this.bannerList = res.data.list
					}
				}).catch(()=>{})
			},
			//获取新闻
			getIndexNews(){
				getIndexNewsApi({

				}).then((res)=>{
					if(res.code === 1){
						this.newsList = res.data.list
					}
				}).catch(()=>{})
			},
			//价格走势
			initChart(){
				getIndexPricerendApi({}).then((res)=>{
					if(res.code == 1){
						let dateList = [],
							dataList = [];
						for(var i in res.data){
							dateList.push(res.data[i].date);
							dataList.push(parseInt(res.data[i].price));
						}
						var priceChart = echarts.init(document.getElementById('priceChart'))
						priceChart.setOption({
							xAxis: {
								type: 'category',
								boundaryGap: false,
								splitLine:{
									show:false
								},
								data:dateList,
								axisLabel:{
									interval:0,
									textStyle:{
										color:'#bababa',
										fontSize:10
									}
								}
							},
							yAxis: {
								min:(Math.min.apply(null, dataList) - 0.2000).toFixed(2),
								max:(Math.max.apply(null, dataList) + 0.2000).toFixed(2),
								type: 'value',
								splitLine:{
									show:false
								},
								axisLabel:{
									textStyle:{
										color:'#bababa'
									}
								}
							},
						    grid: {
						        left: '0',
						        right: '18',
						        bottom: '0',
						        top:'20',
						        containLabel: true
						    },
							series:[
								{
									type:'line',
									itemStyle: {
										normal: {
											color: 'rgba(2,141,198,1)'
										}
									},
									areaStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: 'rgba(255,255,255,0.2)'
											}, {
												offset: 1,
												color: 'rgba(2,141,198,.8)'
											}])
										}
									},
						            label: {
						                normal: {
						                    show: true,
						                    position: 'top'
						                }
						            },
									data:dataList
								}
							]
						})
					}
				}).catch(()=>{

				})
			},
			//公告列表
			getBulletinList(){
				getBulletinListApi({}).then((res)=>{
					if(res.code === 1){
						this.BulletinList = res.data.list
					}
				}).catch(()=>{

				})
			},
			//跳转公告详情
			goBulletinDtl(item){
				this.$router.push({path:'/BulletinDtl',query:{id:item.info_id,title:item.title}});
			}
		},
		mounted(){
			//价格走势		
			//this.initChart();
			console.log('1')
			console.log()
			document.querySelector('.market-tbody').style.height = document.querySelector('body').offsetHeight - document.querySelector('.market-top').offsetHeight - document.querySelector('.market-theader').offsetHeight - 99 + 'px'

		}
	};
</script>
<style lang="less">
	.market-wrap{position:relative;}
	.market-top{width:100%;padding:0 .35rem;height:.62rem;line-height:.62rem;color:#ada9aa;font-size:.22rem;background:#f2f2f2;}
	.market-theader{width:100%;padding:.12rem 0 0 .35rem;line-height:.64rem;color:#ada9aa;font-size:.22rem;}
	// .market-cl{display:block;height:1.38rem;}
	.market-tbody{
		overflow-x:hidden;
		overflow-y:auto;
		ul{
			li{
				height:1.16rem;padding:0 0 0 1.08rem;border-top:1px solid #f6f4f4;position:relative;
				.icon{display:block;width:.44rem;height:.44rem;border-radius:100%;background-repeat:no-repeat;background-size:cover;background-position:center center;position:absolute;left:.3rem;top:.36rem;}
				.coin{padding:.24rem 0 0 0;line-height:.35rem;font-size:.24rem;color:#000;
					.unit{color:#a5a5a5;font-size:.22rem;}
				}
				.price{line-height:.35rem;font-size:.24rem;color:#000;}
				.trend{display:block;width:1.52rem;height:.54rem;line-height:.54rem;text-align:center;color:#fff;font-size:.24rem;border-radius:.05rem;position:absolute;right:.35rem;top:.31rem;}
				.trend.rise{background:#3ab479;}
				.trend.fall{background:#fc0016;}
			}
		}
	}
</style>