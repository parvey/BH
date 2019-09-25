<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>

		<!-- 现货账户 -->
		<div class="atsCen-container">
			<div class="UCform-box">
				<span class="type">可用余额</span>
				<div class="value">
					<span class="num">{{userInfo.usdt_amount}}</span>
					<span class="unit">QC</span>
				</div>
			</div>
			<div class="UCform-box">
				<span class="type">提现数量</span>
				<input type="text" v-model="amount" placeholder="请输入提币数量" class="text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onpaste="this.value=this.value.replace(/[^\d.]/g,'')"/>
				<span class="conversion" v-if="amount !== '' && !isNaN(amount)">≈ {{conversion}}ETH</span>
			</div>
			<div class="UCform-box UCform-select">
				<span class="type">提现地址</span>
				<input type="text" placeholder="请输入ETH钱包地址" class="text" v-model="address" />
			</div>
			<div class="UCform-box">
				<span class="type">支付密码</span>
				<input type="password" placeholder="请输入您的支付密码" class="text" v-model="paypwd" />
			</div>
			<div style="font-size:12px;color:#ff5555;margin:5px 0 0 0;">注：提现手续费5QC</div>

			<button class="btn UCform-sub" @click="handleClickSub" :disabled="loading">确认提币</button>
		</div>

		<confirm
			v-model="isSure"
			title="确定提现吗？"
			@on-confirm="handleFundWithdraw"
		>
		</confirm>

	</div>
</template>

<script>
	import {fundWithdrawApi,sysGePriceApi} from '@/api'
	import {Confirm} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Confirm
		},
		data(){
			return{
				topHeader:{
					title:'提现',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				userInfo:'',
				amount:'',
				address:'',
				paypwd:'',
				isSure:false,
				loading:false,
				eth:''
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.sysGePrice()
		},
		computed:{
			conversion(){
				return (this.amount / parseFloat(this.eth)).toFixed(3)
			}
		},
		methods:{
			handleClickSub(){
				if(this.amount === ''){
					this.$message.error('请输入提现数量')
					return false;
				}else if(this.amount > this.userInfo.usdt_amount){
					this.$message.error('您的余额不足！');
					return false;
				}else if(this.address == ''){
					this.$message.error('请输入提现地址')
					return false;
				}else if(this.paypwd == ''){
					this.$message.error('请输入支付密码')
					return false;
				}else{
					this.isSure = true
				}
			},
			handleFundWithdraw(){
				this.loading = true;
				fundWithdrawApi({
					amount:this.amount,
					address:this.address,
					paypwd:this.$getCode('t='+new Date().getTime()+'&p='+this.paypwd)
				}).then((res)=>{
					if(res.code === 1){
						this.$message.success(res.message)
						this.getUserInfo();
					}else{
						this.$message.error(res.message)
					}
					this.loading = false;
				}).catch(()=>{
					this.loading = false;
				})
			},
			getUserInfo(token){
				getUserInfoApi({
				}).then((res)=>{
					if(res.code == 1){
						sessionStorage.setItem('userInfo', JSON.stringify(res.data));
						this.userInfo = res.data
					}
				}).catch(()=>{})
			},
			sysGePrice(){
				sysGePriceApi({}).then((res)=>{
					if(res.code === 1){
						this.eth = res.data.eth;
					}
				}).catch(()=>{

				})
			}
		}
	}
</script>
