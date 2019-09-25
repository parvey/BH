<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<ul class="myRec-list">
			<li v-for="(item,index) in tableData" :key="index">
				<div class="top">
					<span class="account">时间：{{formatDate(item.create_time)}}</span>					
				</div>
				<div class="list" style="padding:5px 0">
					<div style="padding:2px 0">QC数量：{{item.amount}}</div>
					<div style="padding:2px 0">	ETH数量：{{item.eth_amount}}</div>
				</div>
				<div class="type">
					<div v-if="item.status == 1" style="color:rgba(39,205,127,1)">提现成功</div>
					<div v-else-if="item.status == -1" style="color:red">已取消提现</div>
					<div v-else>
						<span style="font-size:12px;margin:0 2px 0 0">处理中</span>
						<x-button type="warn" action-type="reset" class="btn" mini @click="handleClickCancel(item.withdraw_id)">取消提现</x-button>
					</div>
				</div>
			</li>
		</ul>

		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>

		<confirm
			v-model="isWillCancel"
			title="确定取消提现吗？"
			@on-confirm="cancelOrder"
		>
		</confirm>

	</div>
</template>

<script>
	import {fundWithdrawRecordApi,fundWithdrawCancelApi} from '@/api'
	import {XTable,XButton,Confirm} from 'vux'
	import topHeader from '@/components/public/header.vue'
	export default{
		components:{
			XTable,
			XButton,
			Confirm,
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'提现记录',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[],
				isWillCancel:false,
				withdraw_id:''
			}
		},
		created(){
			this.fundWithdrawRecord()
		},
		methods:{
			fundWithdrawRecord(){
				fundWithdrawRecordApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
					}
				}).catch(()=>{

				})
			},
			handleClickCancel(id){
				this.withdraw_id = id
				this.isWillCancel = true;
			},
			cancelOrder(){
				fundWithdrawCancelApi({
					withdraw_id:this.withdraw_id
				}).then((res)=>{
					if(res.code === 1){
						this.$message.success(res.message);
						this.fundWithdrawRecord()
					}else{
						this.$message.error(res.message);
					}
				}).catch(()=>{

				})
			},
			formatDate(date){
				let nowDate = date.toString().length < 13 ? new Date(date*1000) : new Date(date);
				let year = nowDate.getFullYear();
				let month = nowDate.getMonth() + 1;
				let day = nowDate.getDate();
				let hours = nowDate.getHours();
				let minutes = nowDate.getMinutes();
				let seconds = nowDate.getSeconds();
				return year + '-' + formateNum(month) + '-' + formateNum(day);
				function formateNum(val){return val < 10 ? '0' + val : val}
			}  
		}
	}
</script>
