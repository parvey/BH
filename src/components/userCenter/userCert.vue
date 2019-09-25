<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="cert-status">
			<div v-if="userInfo.is_auth == -2"><i class="el-icon-error" style="color:red"></i>您的实名认证失败！</div>
			<div v-else-if="userInfo.is_auth == 0"><i class="el-icon-warning" style="color:red"></i>您暂未实名认证！</div>
			<div v-else-if="userInfo.is_auth == -1"><i class="el-icon-info" style="color:#10AEFF"></i>实名认证审核中！</div>
			<div v-else><i class="el-icon-success" style="color:#098807"></i>您已实名认证成功！</div>
		</div>

		<div class="userCert-wrap">
			<group>
				<x-input type="text" v-model="cert.name" placeholder="请输入您的姓名" :show-clear="false" required name="name" ref="name"></x-input>
			</group>
			<group>
				<x-input type="text" v-model="cert.id_num" placeholder="请输入您的身份证" :show-clear="false" required name="id_num" ref="id_num"></x-input>
			</group>
			<!-- <div class="pic-wrap">
				<div class="type">身份证正面</div>
				<img :src="cert.IDcardPic1" alt="" class="pic" />
				<el-upload
                  action=""
                  :show-file-list="false"
                  style="display:inline-block"
                  :before-upload="beforeAvatarUploadIDcard1">
				<el-button class="btn-upload"></el-button>
				</el-upload>
			</div>
			<div class="pic-wrap">
				<div class="type">身份证反面</div>
				<img :src="cert.IDcardPic2" alt="" class="pic" />
				<el-upload
                  action=""
                  :show-file-list="false"
                  style="display:inline-block"
                  :before-upload="beforeAvatarUploadIDcard2">
				<el-button class="btn-upload"></el-button>
				</el-upload>
			</div> -->
			<!--
			<group>
				<x-input type="text" v-model="cert.bank_card" placeholder="请输入您的银行卡号码" :show-clear="false" required name="bank_card" ref="bank_card"></x-input>
			</group>
			<group>
				<x-input type="text" v-model="cert.bank_name" placeholder="请输入您的开户银行" :show-clear="false" required name="bank_name" ref="bank_name"></x-input>
			</group>
			<div class="pic-wrap">
				<div class="type">微信收款码</div>
				<img :src="cert.wxpay_img" alt="" class="pic" />
				<el-upload
                  action=""
                  :show-file-list="false"
                  style="display:inline-block"
                  :before-upload="beforeAvatarUploadWXpay">
				<el-button class="btn-upload"></el-button>
				</el-upload>
			</div>
			<div class="pic-wrap">
				<div class="type">支付宝收款码</div>
				<img :src="cert.alipay_img" alt="" class="pic" />
				<el-upload
                  action=""
                  :show-file-list="false"
                  style="display:inline-block"
                  :before-upload="beforeAvatarUploadAlipay">
				<el-button class="btn-upload"></el-button>
				</el-upload>
			</div>
			-->
			<group class="btn-wrap">
				<x-button :show-loading="loading" class="login-btn" @click.native="handleClickSub">提交资料</x-button>
			</group>
		</div>

	</div>
</template>

<script>
	import {API_ROOT,sysUploadApi,userAuthApi,getUserInfoApi} from '@/api'
	import {Group,GroupTitle,XInput,XButton} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Group,
			GroupTitle,
			XInput,
			XButton
		},
		data(){
			return{
				loading:false,
				topHeader:{
					title:'实名认证',
					isReturn:true,
					rtnRouter:'/setting'
				},
				userInfo:'',
				cert:{
					name:'',
					id_num:'',
					bank_card:'',
					bank_name:'',
					wxpay_img:'',
					alipay_img:'',
					IDcardPic1:'',
					IDcardPic2:''
				}
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.cert.name = this.userInfo.name;
			this.cert.id_num = this.userInfo.id_num;
			//this.cert.bank_card = this.userInfo.bank_card;
			//this.cert.bank_name = this.userInfo.bank_name;
			//this.cert.wxpay_img = this.userInfo.wxpay_img;
			//this.cert.alipay_img = this.userInfo.alipay_img;
		},
		methods:{
            //上传文件 - 审核
            beforeAvatarUploadWXpay(file){
            	let self = this;
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		          self.$message.error('上传图片只能是图片格式!');
		        }
		        if (!isLt2M) {
		          self.$message.error('上传图片大小不能超过 10MB!');
		        }
		        if(isJPG && isLt2M){
				    let formdata = new FormData();
				    formdata.append('file',file);
	            	sysUploadApi(formdata).then((res)=>{
	            		if(res.code === 1){
	            			this.cert.wxpay_img = res.data.url
	            		}
	            	}).catch(()=>{})
		        }
		        return isJPG && isLt2M;
            },
            //上传文件 - 审核
            beforeAvatarUploadAlipay(file){
            	let self = this;
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		          self.$message.error('上传图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          self.$message.error('上传图片大小不能超过 10MB!');
		        }
		        if(isJPG && isLt2M){
				    let formdata = new FormData();
				    formdata.append('file',file);
	            	sysUploadApi(formdata).then((res)=>{
	            		if(res.code === 1){
	            			this.cert.alipay_img = res.data.url
	            		}
	            	}).catch(()=>{})
		        }
		        return isJPG && isLt2M;
            },
            //提交资料
            handleClickSub(){
				//验证是否输入
				let valid = true;
				this.errorMsg = ''
				if(!this.$refs['name','id_num'].valid){
					valid = false;
					this.errorMsg = '请输入您的实名资料'
				}
				if(valid){
					this.loading = true;
					userAuthApi({
						name:this.cert.name,
						id_num:this.cert.id_num,
						id_card_front:this.cert.IDcardPic1,
						id_card_back:this.cert.IDcardPic2
						//bank_card:this.cert.bank_card,
						//bank_name:this.cert.bank_name,
						//wxpay_img:this.cert.wxpay_img,
						//alipay_img:this.cert.alipay_img
					}).then((res)=>{
						if(res.code == 1){
							this.$message.success('资料已提交，审核中！');
							this.getUserInfo();
						}else{
							this.$message.error(res.message)
						}
						this.loading = false;
					}).catch(()=>{
						this.loading = false;
					})

				}else{
					//this.isError = true;
					this.$message.error(this.errorMsg)
				}
            },
			getUserInfo(token){
				getUserInfoApi({
				}).then((res)=>{
					if(res.code == 1){
						sessionStorage.setItem('userInfo', JSON.stringify(res.data));
					}
				}).catch(()=>{})
			},
			beforeAvatarUploadIDcard1(file){
            	let self = this;
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		          self.$message.error('上传图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          self.$message.error('上传图片大小不能超过 10MB!');
		        }
		        if(isJPG && isLt2M){
				    let formdata = new FormData();
				    formdata.append('file',file);
	            	sysUploadApi(formdata).then((res)=>{
	            		if(res.code === 1){
	            			this.cert.IDcardPic1 = res.data.url
	            		}
	            	}).catch(()=>{})
		        }
		        return isJPG && isLt2M;
            },
			beforeAvatarUploadIDcard2(file){
            	let self = this;
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		          self.$message.error('上传图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          self.$message.error('上传图片大小不能超过 10MB!');
		        }
		        if(isJPG && isLt2M){
				    let formdata = new FormData();
				    formdata.append('file',file);
	            	sysUploadApi(formdata).then((res)=>{
	            		if(res.code === 1){
	            			this.cert.IDcardPic2 = res.data.url
	            		}
	            	}).catch(()=>{})
		        }
		        return isJPG && isLt2M;
            }
		}
	}
</script>
