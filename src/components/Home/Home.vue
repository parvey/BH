<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="market-wrap">		
			<div class="market-top">本行情由第三方交易所提供。</div>
			<div class="market-theader">名称/最新价/涨跌幅</div>
			<div class="market-cl"></div>
			<div class="market-tbody">
				<vue-scroll :ops="ops" ref="vs" @refresh-start="getData" @refresh-before-deactivate="handleBeforeDeactivate"> 
					<ul>

						<li v-for="(item,key,index) in tableData" :key="index">
							<i class="icon" :style="{backgroundImage:'url('+ getIcon(key) +')'}"></i>
							<div class="coin">
								<span style="text-transform:uppercase">{{key}}</span> /
								<span class="unit">QC</span>
							</div>
							<div class="price">${{item.last}}</div>
							<div class="trend" :class="item | getTrendClass">{{item | getTrend}}%</div>
						</li>


					</ul>
				</vue-scroll>
			</div>
		</div>


		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getIndexMarketApi} from '@/api'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'

	export default{
		components:{
			topHeader,
			tabbar
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
				tableData:[],
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
				}
			}
		},
		filters:{
			getTrend(item){
				let num = Math.round(((item.last - item.low) / item.last) * 1000) / 1000
				return num >= 0 ? '+' + num : '-' + num
			},
			getTrendClass(item){
				let num = Math.round(((item.last - item.low) / item.last) * 1000) / 1000
				return num >= 0 ? 'rise' : 'fall'
			}
		},
		created(){
			//this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.getData()
		},
		methods:{
			getData(vsInstance, refreshDom, done){
				/*
				setTimeout(()=>{
					console.log('1')
					if(done){
						done()
					}else{
						this.$vux.loading.hide()
					}
				},1000)
				*/
				getIndexMarketApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
						if(done){
							setTimeout(()=>{
								done()
							},500)
						}
					}
				}).catch(()=>{

				})
			},
			handleBeforeDeactivate(vm, refreshDom, done){
				setTimeout(() => {
					done();
				},500);
			},
			getIcon(name){
				return coinIcon(name)
			}
		},
		mounted(){
			document.querySelector('.market-tbody').style.height = document.querySelector('body').offsetHeight - document.querySelector('.market-top').offsetHeight - document.querySelector('.market-theader').offsetHeight - 99 + 'px'


			//初始化获取数据
			//this.$refs['vs'].triggerRefreshOrLoad('refresh');

		}
	};
</script>
<style lang="less">
	.market-wrap{position:relative;}
	.market-top{width:100%;padding:0 .35rem;height:.62rem;line-height:.62rem;color:#ada9aa;font-size:.22rem;background:#f2f2f2;}
	.market-theader{width:100%;padding:.12rem 0 0 .35rem;line-height:.64rem;color:#ada9aa;font-size:.22rem;}
	// .market-cl{display:block;height:1.38rem;}
	.market-tbody{
		position:relative;
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