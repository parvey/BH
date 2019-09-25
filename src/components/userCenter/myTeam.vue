<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="contributionSum">佣金总和：{{contributionSum}}</div>
		<el-collapse accordion>
			<el-collapse-item v-for="(item,index) in dataList" :key="index">
				<template slot="title">
					<div class="myTeam-1nd">
						<div class="account">账号：{{item.account}}</div>
						<ul>
							<li>预约数量：{{item.reserve}}</li>
							<li>购买数量：{{item.buy}}</li>
							<li>邀请数量：{{item.child}}</li>
							<li>佣金数量：{{item.contribution}}</li>
						</ul>
						<div class="action">
							<span>注册时间：{{item.register_time}}</span>
							<span style="float:right">{{item.is_activate == 1 ? '已激活' : '未激活'}}</span>
						</div>
					</div>
				</template>
				<div class="myTeam-2rd">
					<ul>
						<li v-for="(item2,index2) in item.child_list">
							<div class="account">账号：{{item2.account}}</div>
							<ul>
								<li>预约数量：{{item2.reserve}}</li>
								<li>购买数量：{{item2.buy}}</li>
								<li>邀请数量：{{item2.child}}</li>
								<li>佣金数量：{{item2.contribution}}</li>
							</ul>
							<div class="action">
								<span>注册时间：{{item2.register_time}}</span>
								<span style="float:right">{{item2.is_activate == 1 ? '已激活' : '未激活'}}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-collapse-item>
		</el-collapse>
		
	</div>
</template>

<script>
	import {userChildtreeApi} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'我的团队',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				dataList:'',
				contributionSum:''
			}
		},
		created(){
			this.userChildtree()
		},
		methods:{
			userChildtree(){
				userChildtreeApi({}).then((res)=>{
					if(res.code === 1){
						this.dataList = res.data.list
						this.contributionSum = res.data.contribution_sum
					}
				}).catch(()=>{

				})
			}
		}
	}
</script>
<style>
.el-collapse{border:0px !important;}
.contributionSum{text-align:center;color:#fff;margin:0 0 10px;}
</style>