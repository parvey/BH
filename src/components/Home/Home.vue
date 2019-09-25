<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<!--
		<swiper :list="bannerList"></swiper>
		<swiper auto height="40px" direction="vertical" :interval=2000 class="index-news" :show-dots="false">
			<swiper-item v-for="(item,index) in newsList" :key="index"><p>{{item.title}}</p></swiper-item>
		</swiper>
		<div class="index-data">
			<div class="contain">
				<div class="box">
					<div class="type">当前QC</div>
					<div class="num">{{userInfo.usdt_amount}}</div>
				</div>
				<div class="box">
					<div class="type">QC记录</div>
					<div class="num">{{userInfo.usdt_award_sum}}</div>
				</div>
			</div>
		</div>
		<div class="index-chart">
			<div class="type">ETH价格走向</div>
			<div class="box" id="priceChart" style="width:100%;height:133px;"></div>
		</div>
		<ul class="index-notice">
			<li v-for="(item,index) in BulletinList" :key="index" @click="goBulletinDtl(item)">
				<a href="#" title="">
					<div class="title">{{item.title}}</div>
					<div class="time">{{item.create_time}}</div>
				</a>
			</li>
		</ul>
		-->

		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getIndexNewsApi,getIndexPricerendApi,getBulletinListApi,indexBannerApi} from '@/api'
	import {Swiper,SwiperItem} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'
	import echarts from 'echarts'

	export default{
		components:{
			topHeader,
			tabbar,
			Swiper,
			SwiperItem
		},
		data(){
			return{
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
			this.indexBanner();
			this.getBulletinList()
			this.getIndexNews();
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
			this.initChart();

		}
	}
</script>