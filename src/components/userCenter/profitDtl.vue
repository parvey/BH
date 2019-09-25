<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<tab active-color='#0679fc' :animate="false">
			<tab-item selected @on-item-click="onItemClick('/profitDtl')">我的收益</tab-item>
			<tab-item @on-item-click="onItemClick('/staticReturn')">静态收益</tab-item>
			<tab-item @on-item-click="onItemClick('/teamProfit')">团队收益</tab-item>
		</tab>
		<x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
			<tbody>
				<tr v-for="(item,index) in tableData" :key="index">
					<td>{{item.amount}}{{item.coin}}</td>
					<td>{{item.type}}</td>
					<td>{{item.create_time}}</td>
				</tr>
			</tbody>
		</x-table>
		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>
	</div>
</template>

<script>
	import {getFundRecordApi} from '@/api'
	import {XTable,Tab,TabItem} from 'vux'
	import topHeader from '@/components/public/header.vue'
	export default{
		components:{
			XTable,
			topHeader,
			Tab, 
			TabItem
		},
		data(){
			return{
				topHeader:{
					title:'我的收益',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[]
			}
		},
		created(){
			this.getFundRecord()
		},
		methods:{
			getFundRecord(){
				getFundRecordApi({
				}).then((res)=>{
					if(res.code == 1){
						this.tableData = res.data.list
					}
				}).catch(()=>{})
			},
			onItemClick(path){
				router.push({path:path});
			}
		}
	}
</script>
