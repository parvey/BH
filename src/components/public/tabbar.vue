<template>
	<div>
		<div class="footer-cl"></div>
		<div style="width:100%;position:fixed;bottom:0px;left:0px;z-index:10;">
			<tabbar style="background:#fff" v-model="selected">
				<tabbar-item v-for="item in tabbarList" :key="item.id" :link="item.path">
					<img slot="icon" :src="item.icon">
					<img slot="icon-active" :src="item.curIcon">
					<span slot="label">{{item.name}}</span>
				</tabbar-item>
			</tabbar>
		</div>
	</div>
</template>

<script>
	import {Tabbar,TabbarItem,ViewBox} from 'vux'
	export default{
		components:{
			Tabbar,
			TabbarItem,
			ViewBox
		},
		data(){
			return{
				selected:0,
				tabbarList:[
					{
						id:'0',
						name:'行情',
						path:'/home',
						icon:require('@/assets/images/tabbar/home-1.png'),
						curIcon:require('@/assets/images/tabbar/home-2.png'),
					},
					{
						id:'1',
						name:'资产',
						path:'/assets',
						icon:require('@/assets/images/tabbar/star-1.png'),
						curIcon:require('@/assets/images/tabbar/star-2.png'),
					},
					{
						id:'2',
						name:'矿机',
						path:'/game',
						icon:require('@/assets/images/tabbar/game-1.png'),
						curIcon:require('@/assets/images/tabbar/game-2.png'),
					},
					{
						id:'3',
						name:'会员中心',
						path:'/userCenter',
						icon:require('@/assets/images/tabbar/userCenter-1.png'), 
						curIcon:require('@/assets/images/tabbar/userCenter-2.png'),
					}
				]
			}
		},
		created(){
			this.getIndex();
		},
		methods:{
			getIndex(){
				let nowPath = this.$route.path;
				let obj = this.tabbarList.find((item)=>{
					return item.path === nowPath
				})
				if(obj) this.selected = parseInt(obj.id)
			}
		}
	};
</script>
<style lang="less">
	.weui-tabbar{box-shadow:0px 0px 2px rgba(0,0,0,.2)}
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#e50007 !important;}
	.weui-tabbar__label{font-size:12px !important;}
	.weui-tabbar:before{display:none;}
</style>
