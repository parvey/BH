<template>
	<div class="header-container2">
		<x-header :title="data.title" :left-options="{showBack:data.isReturn,preventGoBack:data.isReturn,backText:''}" @on-click-back="rtnRouter" style='width:100%;background-color:#e60012;position:fixed;top:0px;left:0px;z-index:99'></x-header>
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
<style lang="less" scoped>
	.header-container2 /deep/ .vux-header .vux-header-title{color:#fff !important;}
	.header-container2 /deep/ .vux-header .vux-header-left .left-arrow:before{border:1px solid #fff;border-width:1px 0 0 1px;}
</style>
