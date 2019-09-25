<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div>
			<img :src="pic" alt="客服微信" style="width:100%"/>
		</div>
	</div>
</template>

<script>
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'客服中心',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				pic:require('@/assets/images/content/custSrv.png')
			}
		},
		created(){
		},
		computed:{
		},
		methods:{
		}
	}
</script>
