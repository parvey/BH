<template>
	<div class="game-container">
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<iframe :src="url">
		</iframe>
	</div>
</template>

<script>
	import {} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'游戏',
					isReturn:true,
					rtnRouter:'/Game'
				},
				url:''
			}
		},
		created(){
			this.url = JSON.parse(this.$route.query.item).url
			this.topHeader.title = JSON.parse(this.$route.query.item).name
		},
		methods:{
		}
	}
</script>
