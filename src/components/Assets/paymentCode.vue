<template>
	<div class="paymentCode-container">
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="paymentCode-wrap">
			<div class="top">
				<img :src="'eth' | getIcon" alt="">
				<span>ETH收款</span>
			</div>
			<div class="c1">无需添加好友，扫描二维码向我付款</div>
			<div class="c2">
				<vue-qr :text="invitUrl" :size="200" :margin="0" :dotScale="1"></vue-qr>
			</div>
			<div class="hint">
				注意：请仔细核对收款金额。
			</div>
		</div>


	</div>
</template>

<script>
	import {} from '@/api'
	import topHeader from '@/components/public/header2.vue'
	import VueQr from 'vue-qr'
	export default{
		components:{
			topHeader,
			VueQr
		},
		data(){
			return{
				topHeader:{
					title:'收款码',
					isReturn:true,
					rtnRouter:'/assets'
				},
				invitUrl:'https://www.zb.plus/'
			}
		},
		filters:{
			getIcon(name){
				return coinIcon(name)
			}
		},
		created(){
		},
		methods:{
		}
	};
</script>
<style lang="less">
	.paymentCode-container{
		height:100%;background:rgb(230, 0, 18);
		.paymentCode-wrap{
			padding:.1rem .4rem 0;
			width:6.98rem;
			background:#fff;
			border-radius:5px;
			box-shadow:0px 0px 1px rgba(0,0,0,0.1);
			margin:.4rem auto 0;
			.top{
				height:.71rem;line-height:.7rem;border-bottom:1px solid #f6f6f6;
				img{width:.36rem;vertical-align:middle;margin:0 .19rem 0 0}
				span{font-weight:600;color:#000;vertical-align:middle;}
			}
			.c1{height:.39rem;line-height:.39rem;text-align:center;font-size:.22rem;color:#b0a6a6;margin:.3rem 0 0 0;}
			.c2{
				width:3.3rem;
				height:3.3rem;
				position: relative;
				margin:.27rem auto 0;
				img{width:100%;height:100%;}
			}
			.hint{
				padding:.3rem 0;
				line-height:.3rem;
				color:#e70b1a;
				font-size:.22rem;
				border-top:1px solid #f6f6f6;
				margin:.48rem 0 0 0
			}
		}
	}
</style>
