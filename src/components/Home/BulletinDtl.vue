<template>
	<div style="height:100%;">
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="bulletin-content">
			<!-- {{content}} -->
		</div>

	</div>
</template>

<script>
	import {getBulletinDtlApi} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'',
					isReturn:true,
					rtnRouter:'/Home'
				},
				content:''
			}
		},
		created(){
			this.topHeader.title = this.$route.query.title
			this.getBulletinDtl()
		},
		methods:{
			getBulletinDtl(){
				getBulletinDtlApi({
					info_id:this.$route.query.id
				}).then((res)=>{
					if(res.code === 1){
						document.querySelector('.bulletin-content').innerHTML = res.data.content;
					}
				}).catch(()=>{

				})
			}
		}
	}
</script>
