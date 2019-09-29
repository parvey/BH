<template>
	<div style="height:100%;">
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="starDtl-icon">
			<img :src="item.icon == 'http://www.socstar.cc' ? pic : item.icon" alt=""/>
		</div>

		<div class="starDtl-wrap">
			<div class="name">玩家：{{item.name}}</div>
			<ul class="list">
				<li>价格：{{item.price}}</li>
				<li>剩余数量：{{item.surplus}}</li>
				<li>周期：{{item.cycle}}</li>
				<li>奖励：{{item.income}}</li>
				<!-- <li>预约数量：{{item.reserve_num}}</li> -->
			</ul>
			<div class="buy-btn" @click="isBuy = true">购买</div>
			<!-- <div class="buy-btn" @click="isReserve = true" v-if="item.surplus == 0">预约</div> -->
		</div>

		<confirm
			v-model="isBuy"
			:title="confirmMsg"
			@on-confirm="handleBuy"
		>
		</confirm>

		<confirm
			v-model="isReserve"
			title="确定预约购买该玩家吗？"
			@on-confirm="handleReserve"
		>
		</confirm>

	</div>
</template>

<script>
	import {getBulletinDtlApi,orderBuyApi,getProjectApi,getUserInfoApi,reserveApi} from '@/api'
	import {Confirm} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Confirm
		},
		data(){
			return{
				topHeader:{
					title:'',
					isReturn:true,
					rtnRouter:'/Star'
				},
				item:'',
				pic:require('@/assets/images/content/star_defult_image.png'),
				confirmMsg:'',
				isBuy:false,
				loading:false,
				isReserve:false
			}
		},
		created(){
			this.item = JSON.parse(this.$route.query.item)
			this.topHeader.title = this.item.name
			this.confirmMsg = '您确认花费' + this.item.price + 'QC购买吗？'
			//this.topHeader.title = this.$route.query.title
		},
		methods:{
			handleBuy(){
				if(this.loading) return false;
				this.loading = true
				orderBuyApi({
					project_id:this.item.project_id
				}).then((res)=>{
					if(res.code == 1){
						this.$vux.toast.text('恭喜您，购买成功！');
						this.getProject();
					}else{
						this.$vux.toast.text(res.message)
					}
					this.getUserInfo();
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			},
			getProject(){
				getProjectApi({}).then((res)=>{
					if(res.code === 1){
						let obj = res.data.list.find((item)=>{
							return item.project_id == this.item.project_id
						})
						if(obj) this.item = obj
					}
				}).catch(()=>{})
			},
			getUserInfo(token){
				getUserInfoApi({
				}).then((res)=>{
					if(res.code == 1){
						sessionStorage.setItem('userInfo', JSON.stringify(res.data));
					}
				}).catch(()=>{})
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
