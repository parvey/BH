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
					<div v-if="item.status == 1" style="color:rgba(39,205,127,1)">{{item.status_text}}</div>
					<div v-else-if="item.status == -1" style="color:red">{{item.status_text}}</div>
					<div v-else>
						<span style="font-size:12px;margin:0 2px 0 0">{{item.status_text}}</span>
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
	import {fundRechargeRecordApi} from '@/api'
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
					title:'充值记录',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[]
			}
		},
		created(){
			this.fundRechargeRecord()
		},
		methods:{
			fundRechargeRecord(){
				fundRechargeRecordApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
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
