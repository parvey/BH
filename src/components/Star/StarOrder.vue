<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<ul class="myRec-list myProject-list">
			<li v-for="(item,index) in tableData" :key="index">
				<img :src="item.icon" class="icon" :alt="item.project_name"/>
				<div class="top">
					<span class="account">名称：{{item.name}}</span>					
				</div>
				<div class="list" style="padding:2px 0">
					<div style="padding:2px 0">价格：{{item.price}}</div>
					<div style="padding:2px 0">剩余数量：{{item.surplus}}</div>
					<div style="padding:2px 0">周期：{{item.cycle}}</div>
					<div style="padding:2px 0">奖励：{{item.income}}</div>
					<div style="padding:2px 0">预约数量：{{item.reserve_num}}</div>
				</div>
				<div class="type">
					<div>
						<x-button type="warn" action-type="reset" class="btn" mini @click.native="handleClickReserve(item)" >预约购买</x-button>
					</div>
				</div>
			</li>
		</ul>

		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>

		<confirm
			v-model="isReserve"
			title="确定预约购买该玩家吗？"
			@on-confirm="handleReserve"
		>
		</confirm>

	</div>
</template>

<script>
	import {getProjectApi,reserveApi} from '@/api'
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
					rtnRouter:'/Star'
				},
				tableData:[],
				isReserve:false,
				loading:false,
				item:''
			}
		},
		created(){
			this.getProject()
		},
		methods:{
			getProject(){
				getProjectApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data.list
						this.surplus = res.data.surplus_sum
						this.reserve_sum = res.data.reserve_sum
					}
				}).catch(()=>{

				})
			},
			handleClickReserve(item){
				this.item = item
				this.isReserve = true
			},
			handleReserve(){
				if(this.loading) return false;
				this.loading = true
				reserveApi({
					project_id:this.item.project_id
				}).then((res)=>{
					if(res.code == 1){
						this.$vux.toast.text('恭喜您，预约成功！');
						this.getProject();
					}else{
						this.$vux.toast.text(res.message)
					}
					this.getUserInfo();
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			}
		}
	}
</script>
