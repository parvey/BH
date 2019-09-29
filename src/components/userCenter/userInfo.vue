<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="userCert-wrap">
			<!-- <div class="pic-wrap">
				<div class="type">头像</div>
				<img :src="cert.avatar" alt="" class="pic" />
				<el-upload
                  action=""
                  :show-file-list="false"
                  style="display:inline-block"
                  :before-upload="beforeAvatarUpload">
				<el-button class="btn-upload"></el-button>
				</el-upload>
			</div> -->
			<group>
				<x-input type="text" v-model="cert.nickname" placeholder="请输入您的昵称" :show-clear="false" required name="nickname" ref="nickname"></x-input>
			</group>
			<!--
			<group>
				<x-address title="省市区" @on-hide="logHide" placeholder="请选择您的省市区" v-model="cert.province" :list="addressData"></x-address>
			</group>
			<group>
				<x-input type="text" v-model="cert.address" placeholder="请输入您的具体地址" :show-clear="false" required name="address" ref="address"></x-input>
			</group>
			-->
			<group>
				<x-input type="text" v-model="cert.address_mobile" placeholder="请输入您的联系方式" :show-clear="false" required name="address_mobile" ref="address_mobile"></x-input>
			</group>
			<group class="btn-wrap">
				<x-button :show-loading="loading" class="login-btn" @click.native="handleClickSub">提交资料</x-button>
			</group>
		</div>

	</div>
</template>

<script>
	import {API_ROOT,sysUploadApi,userAuthApi,getUserInfoApi,userProfileApi} from '@/api'
	import {Group,GroupTitle,XInput,XButton,Radio,XAddress,ChinaAddressV4Data} from 'vux'
	import topHeader from '@/components/public/header.vue'

	export default{
		components:{
			topHeader,
			Group,
			GroupTitle,
			XInput,
			XButton,
			Radio,
			XAddress
		},
		data(){
			return{
				loading:false,
				topHeader:{
					title:'个人信息',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				userInfo:'',
				cert:{
					avatar:'',
					nickname:'',
					province:[],
					address:'',
					address_mobile:''
				},
				sexList:[
					{key:'1',value:'男'},
					{key:'2',value:'女'}
				],
				addressData:ChinaAddressV4Data
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			console.log(this.userInfo)
			this.cert.avatar = this.userInfo.avatar;
			this.cert.nickname = this.userInfo.nickname;
			//this.cert.province.push(this.userInfo.address_province)
			//this.cert.province.push(this.userInfo.address_city)
			//this.cert.address = this.userInfo.address;
			this.cert.address_mobile = this.userInfo.address_mobile;
		},
		methods:{
			logHide(str){
				console.log(str)
			},
            //上传文件 - 审核
            beforeAvatarUpload(file){
            	let self = this;
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		          self.$vux.toast.text('上传头像图片只能是图片格式!');
		        }
		        if (!isLt2M) {
		          self.$vux.toast.text('上传图片大小不能超过 10MB!');
		        }
		        if(isJPG && isLt2M){
				    let formdata = new FormData();
				    formdata.append('file',file);
	            	sysUploadApi(formdata).then((res)=>{
	            		if(res.code === 1){
	            			this.cert.avatar = res.data.url
	            		}
	            	}).catch(()=>{})
		        }
		        return isJPG && isLt2M;
            },
            //提交资料
            handleClickSub(){
				this.loading = true;
				userProfileApi({
					//avatar:this.cert.avatar,
					nickname:this.cert.nickname,
					//address_province:this.cert.province[0],
					//address_city:this.cert.province[1],
					//address:this.cert.address,
					address_mobile:this.cert.address_mobile
				}).then((res)=>{
					if(res.code == 1){
						this.$vux.toast.text('资料修改成功');
						this.getUserInfo();
					}else{
						this.$vux.toast.text(res.message)
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
					}
				}).catch(()=>{})
			}
		}
	}
</script>
