<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="scroller" ref="scroller">
			<vue-scroll :ops="ops" ref="vs" @refresh-start="getData" @refresh-before-deactivate="handleBeforeDeactivate"> 
				
				<ul class="game-list clearfix">
					<li v-for="(item,index) in dataList" :key="index">
						<img :src="item.icon" alt="" class="pic">
						<div class="b">
							<span class="t">价格：</span>
							<span class="c">{{item.price + ' QC'}}</span>
						</div>
						<div class="b">
							<span class="t">剩余数量：</span>
							<span class="c">{{item.surplus}}</span>
						</div>
						<div class="b">
							<span class="t">周期：</span>
							<span class="c">{{item.cycle + '天'}}</span>
						</div>
						<div class="b">
							<span class="t">奖励：</span>
							<span class="c">{{item.income + '%'}}</span>
						</div>
						<div class="btn" :class="getStatusClass(item.status)" @click="handleClickAction(item)">{{getStatus(item.status)}}</div>		
					</li>
				</ul>

			</vue-scroll>
		</div>
		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getProjectIndexApi,getProjectReserveApi} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'

	export default{
		components:{
			topHeader,
			tabbar
		},
		data(){
			return{
				topHeader:{
					title:'游戏',
					isReturn:false,
					rtnRouter:''
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
				statusList:[
					{
						id:0,
						name:'预约',
						class:'order'
					},
					{
						id:1,
						name:'已预约',
						class:'disabled'
					},
					{
						id:2,
						name:'领养',
						class:'buy'
					},
					{
						id:3,
						name:'已领养',
						class:'disabled'
					},
					{
						id:4,
						name:'繁殖中',
						class:'disabled'
					}
				]
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
	            scroller.style.height = (bodyHeight-99)+"px";
			},
			getData(vsInstance, refreshDom, done){
				if(!done){
					this.$vux.loading.show({
					 text: ''
					})
				}
				getProjectIndexApi({

				}).then((res)=>{
					if(res.code == 1){
						this.dataList = res.data.list
						if(done){
							setTimeout(()=>{
								done()
							},500)
						}else{
							this.$vux.loading.hide()
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
			getStatus(id){
				let obj = this.statusList.find((item)=>{
					return item.id == id
				})
				return obj.name
			},
			getStatusClass(id){
				let obj = this.statusList.find((item)=>{
					return item.id == id
				})
				return obj.class
			},
			handleClickAction(item){
				if(item.status == 0){
					getProjectReserveApi({
						project_id:item.project_id
					}).then((res)=>{
						if(res.code == 1){
							this.$vux.toast.text('预约成功')
							this.$refs['vs'].triggerRefreshOrLoad('refresh');
						}else{
							this.$vux.toast.text(res.message)
						}
					}).catch(()=>{
						
					})
				}
			}
		},
		mounted(){
			this.getHeight();

			//this.$refs['vs'].triggerRefreshOrLoad('refresh');
		}
	};
</script>
<style lang="less">
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
			.pic{
				display:block;
				width:1.6rem;
				height:1.6rem;
				object-fit:cover;
				margin:0 auto;
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