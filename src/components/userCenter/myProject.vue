<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<ul class="myRec-list myProject-list">
			<li v-for="(item,index) in tableData" :key="index">
				<img :src="item.icon" class="icon" :alt="item.name"/>
				<div class="top">
					<span class="account">玩家名称：{{item.name}}</span>	
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
				<x-button class="login-btn" @click.native="handleClickBuy(item)" v-if="item.status == 9">一键复投</x-button>
			</li>
		</ul>


		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>

		<confirm
			v-model="isSureBuy"
			title="确定购买该玩家吗？"
			@on-confirm="handleBuy"
		>
		</confirm>

	</div>
</template>

<script>
	import {getOrderRecordApi,orderBuyApi} from '@/api'
	import {XButton,Confirm} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Confirm,
			XButton
		},
		data(){
			return{
				topHeader:{
					title:'我的玩家',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[],
				isSureBuy:false,
				buyId:'',
				loading:false
			}
		},
		created(){
			this.getOrderRecord();
		},
		methods:{
			getOrderRecord(){
				getOrderRecordApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
					}
				}).catch(()=>{

				})
			},
			handleClickBuy(item){
				this.buyId = item.project_id
				this.isSureBuy = true
			},
			handleBuy(){
				if(this.loading) return false;
				this.loading = true
				orderBuyApi({
					project_id:this.buyId
				}).then((res)=>{
					if(res.code == 1){
						this.$message.success('恭喜您，购买成功！');
						this.getProject();
					}else{
						this.$message.error(res.message)
					}
					this.getOrderRecord();
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			}

		}
	}
</script>
