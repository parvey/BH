<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="scroller" ref="scroller">
			<vue-scroll :ops="ops" ref="vs" @refresh-start="getData" @refresh-before-deactivate="handleBeforeDeactivate">

				<ul class="myRec-list myProject-list">
					<li v-for="(item,index) in dataList" :key="index">
						<img :src="item.icon" class="icon" :alt="item.name"/>
						<div class="top">
							<span class="account">{{item.name}}</span>	
							<span style="float:right">当前收益：<span style="color:red">{{item.income_sum}}</span></span>				
						</div>
						<div class="list">
							<span>价格：{{item.price}}</span>
							<span>每日收益：{{item.income}}</span>					
						</div>
						<div class="type">
							<p>购买时间：{{item.buy_time}}</p>
							<p>过期时间：{{item.expire_time}}</p>
						</div>
						<x-button class="login-btn">生息中...</x-button>
					</li>
				</ul>

			</vue-scroll>
		</div>

	</div>
</template>

<script>
	import {getOrderRecordApi} from '@/api'
	import {XButton} from 'vux'
	import topHeader from '@/components/public/header.vue'
	export default{
		components:{
			topHeader,
			XButton
		},
		data(){
			return{
				topHeader:{
					title:'我的矿机',
					isReturn:true,
					rtnRouter:'/assets'
				},
				dataList:[],
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
				ceshi:{
					pic:require('@/assets/images/test/game-1.jpg')
				}
			}
		},
		created(){
			this.getData()
		},
		methods:{
			//给scroll赋值高度
			getHeight(){
	            let bodyHeight = document.documentElement.clientHeight;
	            let scroller = this.$refs.scroller;
	            scroller.style.height = (bodyHeight-46)+"px";
			},
			getData(vsInstance, refreshDom, done){
				if(!done) this.$vux.loading.show()
				getOrderRecordApi({

				}).then((res)=>{
					if(res.code === 1){
						this.dataList = res.data.list
						setTimeout(()=>{
							console.log('1')
							if(done){
								done()
							}else{
								this.$vux.loading.hide()
							}
						},500)
					}
				}).catch(()=>{

				})
			},
			handleBeforeDeactivate(vm, refreshDom, done){
				setTimeout(() => {
					done();
				},500);
			}
		},
		mounted(){
			this.getHeight();

			//this.$refs['vs'].triggerRefreshOrLoad('refresh');
		}
	};
</script>
<style lang="less" scoped>
	.game-list{
		padding:0 3%;
		li{
			list-style:none;
			width:47%;
			padding:.1rem 0 .2rem;
			box-shadow:0px 0px 2px rgba(0,0,0,0.2);
			border-radius:5px;
			position:relative;
			margin:10px 1.5% 0;
			float:left;
			.name{font-size:.22rem;position:absolute;left:.2rem;top:1.38rem;}
			.pic{
				display:block;
				width:1.6rem;
				height:1.6rem;
				object-fit:cover;
				border-radius:100%;
				margin:0 auto .1rem;
			}
			.b{
				padding:0 .2rem;
				font-size:.2rem;
				margin:.05rem 0 0 0;
				.t{color:#a0a1a7;}
				.c{color:#333;}
			}
			.btn{
				display:block;
				height:.5rem;
				line-height:.5rem;
				text-align:center;
				color:#fff;				
				border-radius:5px;
				margin:.2rem .2rem 0;
			}
			.btn.disabled{background:#a0a1a7;}
			.btn.order{background:#e6a23c}
			.btn.buy{background:#e50007;}
		}
	}
</style>