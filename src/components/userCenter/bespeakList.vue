<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<ul class="myRec-list myProject-list">
			<li v-for="(item,index) in tableData" :key="index">
				<img :src="item.icon" class="icon" :alt="item.project_name"/>
				<div class="top">
					<span class="account">名称：{{item.project_name}}</span>					
				</div>
				<div class="list" style="padding:2px 0">
					<div style="padding:2px 0">价格：{{item.price}}</div>
					<div style="padding:2px 0">预约时间{{item.create_time}}</div>
				</div>
				<div class="type">
					<div v-if="item.status == 1" style="color:rgba(39,205,127,1)">预约成功</div>
					<div v-else-if="item.status == -1" style="color:red">已取消</div>
					<div v-else>
						<span style="font-size:12px;margin:0 2px 0 0">预约中</span>
						<x-button type="warn" action-type="reset" class="btn" mini @click.native="handleCancel(item.reserve_id)">取消预约</x-button>
					</div>
				</div>
			</li>
		</ul>

		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>

		<confirm
			v-model="isWillCancel"
			title="确定取消预约吗？"
			@on-confirm="cancelOrder"
		>
		</confirm>

	</div>
</template>

<script>
	import {reserveRecordApi,reserveCancelApi} from '@/api'
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
					title:'预约列表',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[],
				isWillCancel:false,
				cancelId:''
			}
		},
		created(){
			this.reserveRecord()
		},
		methods:{
			reserveRecord(){
				reserveRecordApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
					}
				}).catch(()=>{})
			},
			handleCancel(reserve_id){
				this.isWillCancel = true;
				this.cancelId = reserve_id
			},
			cancelOrder(){
				reserveCancelApi({
					reserve_id:this.cancelId
				}).then((res)=>{
					if(res.code === 1){
						this.$message.success(res.message)
						this.reserveRecord()
					}else{
						this.$message.error(res.message)
					}
				}).catch(()=>{
					
				})
			}
		}
	}
</script>
