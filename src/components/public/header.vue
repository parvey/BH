<template>
	<div>
		<x-header :title="data.title" :left-options="{showBack:data.isReturn,preventGoBack:data.isReturn,backText:''}" @on-click-back="rtnRouter" style='width:100%;background-color:#fff;position:fixed;top:0px;left:0px;z-index:99'></x-header>
		<div class="header-cl"></div>
	</div>
</template>

<script>
	import {} from '@/api'
	import {XHeader} from 'vux'
	export default{
		components:{
			XHeader
		},
		data(){
			return{
			}
		},
		props:['data'],
		created(){
		},
		methods:{
			rtnRouter(){
				if(this.data['rtnRouter'] === undefined || this.data['rtnRouter'] === '' || this.data['rtnRouter'] === null) return false;
				this.$router.push(this.data.rtnRouter)
			}
		}
	};
</script>
<style lang="less">
	.vux-header .vux-header-title{color:#000 !important;}
</style>
