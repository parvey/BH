<template>
	<div style="height:100%;">		
		<div class="star-container">
			<div class="userName">{{userInfo.name == "" ? '匿名' : userInfo.name}}</div>
			<div class="my-USDT">QC:{{userInfo.usdt_amount}}</div>

			<div class="noOrderRecord" v-if="orderRecordList.length == 0">您还没购买玩家</div>
			
			<div class="xinqiu"></div>
			
			<div class="star-footer">
				<!-- <div class="surplus">今日剩余购买数：{{surplus}}</div> -->
				<!-- <div class="type">玩家预约总数量：{{reserve_sum}}</div> -->
				<!-- <div class="btn" @click="goBespeakist">预约玩家</div> -->
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide v-for="(item,index) in project" :key="index">
						<div class="swiper-box" @click="goDtl(item)">
							<div class="pic"><img :src="item.icon == 'http://www.socstar.cc' ? pic : item.icon" alt=""/></div>
							<div class="name">{{item.name}}</div>
							<div class="price">价格：{{item.price}}</div>
							<div class="look">查看</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>


		</div>
		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getOrderRecordApi,getProjectApi} from '@/api'
	import {} from 'vux'
	import tabbar from '@/components/public/tabbar.vue'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'

	export default{
		components:{
			tabbar,
			swiper,
			swiperSlide
		},
		data(){
			return{
				userInfo:'',
				orderRecordList:[],
				project:[],
				surplus:'',//剩余数量
				reserve_sum:'',
				reserve_num:'',
				swiperOption:{
					slidesPerView:3,
					spaceBetween:'2%'
				},
				pic:require('@/assets/images/content/star_defult_image.png')
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.getOrderRecord();
			this.getProject();
		},
		methods:{
			getOrderRecord(){
				getOrderRecordApi({}).then((res)=>{
					if(res.code === 1){
						this.orderRecordList = res.data.list;
					}
				}).catch(()=>{

				})
			},
			getProject(){
				getProjectApi({}).then((res)=>{
					if(res.code === 1){
						this.project = res.data.list
						this.surplus = res.data.surplus_sum
						this.reserve_sum = res.data.reserve_sum
					}
				}).catch(()=>{

				})
			},
			goDtl(item){
				this.$router.push({path:'/StarDtl',query:{item:JSON.stringify(item)}});
			},
			goBespeakist(){
				this.$router.push({path:'/StarOrder'});
			}
		}
	}
</script>