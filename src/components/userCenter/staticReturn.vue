<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<tab active-color='#0679fc' :animate="false">
			<tab-item @on-item-click="onItemClick('/profitDtl')">我的收益</tab-item>
			<tab-item selected @on-item-click="onItemClick('/staticReturn')">静态收益</tab-item>
			<tab-item @on-item-click="onItemClick('/teamProfit')">团队收益</tab-item>
		</tab>
		<x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
			<thead>
				<tr>
					<th>名称</th>
					<th>收益</th>
					<th>日期</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in tableData" :key="index">
					<td>{{item.project_name}}</td>
					<td>{{item.amount}}</td>
					<td>{{item.date}}</td>
				</tr>
				<tr>
					<td style="text-align:center;" colspan="3">奖励总和:{{award_sum}}</td>
				</tr>
			</tbody>
		</x-table>
		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>
	</div>
</template>

<script>
	import {awardProjectApi} from '@/api'
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
					title:'静态收益',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[]
			}
		},
		created(){
			this.awardProject();
		},
		methods:{
			awardProject(){
				awardProjectApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
						this.award_sum = res.data.award_sum
					}
				}).catch(()=>{

				})
			},
			onItemClick(path){
				router.push({path:path});
			}
		}
	}
</script>
