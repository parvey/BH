<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		
		<div class="scroller" ref="scroller">
			<vue-scroll :ops="ops" ref="vs" @refresh-start="getData"> 

			</vue-scroll>
		</div>

	</div>
</template>

<script>
	import {} from '@/api'
	import topHeader from '@/components/public/header.vue'
	export default{
		components:{
			topHeader
		},
		data(){
			return{
				topHeader:{
					title:'生息宝',
					isReturn:true,
					rtnRouter:'/assets'
				},
				ops:{
					vuescroll:{
						mode:'slide',
						pullRefresh:{
							enable:true,
							auto:true,
							tips:{								
						        deactive: '下拉刷新',
						        active: '释放刷新',
						        start: '',
						        beforeDeactive: '刷新成功'
							}
						},
						pushLoad:{
							enable:false
						}
					},
					bar:{
						background:'#00000',
						opacity:0
					}
				}
			}
		},
		created(){
		},
		methods:{
			//给scroll赋值高度
			getHeight(){
	            let bodyHeight = document.documentElement.clientHeight;
	            let scroller = this.$refs.scroller;
	            scroller.style.height = (bodyHeight-46)+"px";
			},
			getData(vsInstance, refreshDom, done){
				if(!done){
					this.$vux.loading.show({
					 text: ''
					})
				}
				setTimeout(()=>{
					console.log('1')
					if(done){
						done()
					}else{
						this.$vux.loading.hide()
					}
				},1000)
			}
		},
		mounted(){
			this.getHeight();

			//this.$refs['vs'].triggerRefreshOrLoad('refresh');
		}
	};
</script>
<style lang="less">

</style>