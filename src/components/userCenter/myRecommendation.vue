<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<ul class="myRec-list">
			<li v-for="(item,index) in tableData" :key="index">
				<div class="top">
					<span class="account">账号：{{item.account}}</span>					
				</div>
				<div class="list">
					<span>预约数量：{{item.reserve}}</span>
					<span>购买数量：{{item.buy}}</span>
					<span>邀请数量：{{item.child}}</span>
				</div>
				<div class="type">
					<span class="register_time">{{item.register_time}}</span>
					<!-- <div v-if="item.is_activate == 1">已激活</div> -->
					<!-- <x-button type="warn" action-type="reset" class="btn" mini v-else @click.native="handleActivate(item.child_id)">激活</x-button> -->
				</div>
			</li>
		</ul>


		<div class="isNoData" v-if="tableData.length == 0">没有更多内容</div>

		<confirm
			v-model="isWillActivate"
			title="确定激活该账号吗？"
			@on-confirm="activateChild"
		>
		</confirm>

	</div>
</template>

<script>
	import {getUserChildApi,activateChildApi} from '@/api'
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
					title:'邀请的玩家',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				tableData:[],
				isWillActivate:false
			}
		},
		created(){
			this.getUserChild();
		},
		methods:{
			getUserChild(){
				getUserChildApi({}).then((res)=>{
					if(res.code === 1){
						this.tableData = res.data
					}
				}).catch(()=>{})
			},
			//激活
			handleActivate(childId){
				this.isWillActivate = true;
				this.activateChildId = childId;
			},
			activateChild(){
				activateChildApi({
					child_id:this.activateChildId
				}).then((res)=>{
					if(res.code === 1){
						this.$message.success('激活成功');
						this.getUserChild();
					}else{
						this.$message.error(res.msg)
					}
				}).catch(()=>{})
			}
		}
	}
</script>
