<template>
	<div class="game-container">
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<ul class="game-list" v-if="dataList.length > 0">
			<li v-for="(item,index) in dataList" :key="index" @click="goToplay(item)">
				<img :src="item.img"/>
				<div class="name"></div>
			</li>
		</ul>
		<div class="isNoData" v-else></div>
		<tabbar ref="tabbar"></tabbar>
	</div>
</template>

<script>
	import {getGameListApi} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import tabbar from '@/components/public/tabbar.vue'

	export default{
		components:{
			topHeader,
			tabbar
		},
		data(){
			return{
				topHeader:{
					title:'游戏',
					isReturn:false,
					rtnRouter:''
				},
				dataList:[]
			}
		},
		created(){
			this.getGameList();
		},
		methods:{
			getGameList(){
				getGameListApi({}).then((res)=>{
					if(res.code === 1){
						this.dataList = res.data;
					}
				}).catch(()=>{

				})
			},
			goToplay(row){
				this.$router.push({path:'/GameDtl',query:{item:JSON.stringify({
					name:row.name,
					url:row.url
				})}});
			}
		}
	}
</script>
