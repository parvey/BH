<template>
	<div>
		<topHeader ref="topHeader" :data="topHeader"></topHeader>
		<div class="myInvit-container">
			<div class="myInvit-contain">
				<img :src="logo" alt="" class="logo" />
				<div class="c1">大玩家</div>
				<div class="c2">快来大玩家赚QC</div>
				<div id="qrcode">
					<vue-qr :text="invitUrl" :size="200" :margin="0" :dotScale="1"></vue-qr>
				</div>
				<div class="c3">扫一扫注册</div>
				<div class="c4">邀请码：{{userInfo.invite_code}}</div>
				<div class="c5">
					<input type="text" class="text" :value="invitUrl"/>
					<div class="btn" :data-clipboard-text="invitUrl" @click="copy">复制链接</div>
				</div>
				<div class="c6" @click="downloadFile">邀请玩家</div>
				<div class="c7">说明：点击邀请玩家按钮可以保存图片二维码，然后把二维码图片分享邀请会员</div>
			</div>		
		</div>
	</div>
</template>
 
<script>
	import {} from '@/api'
	import {} from 'vux'
	import topHeader from '@/components/public/header.vue'
	import Clipboard from 'clipboard';
	import VueQr from 'vue-qr'

	export default{
		components:{
			topHeader,
			VueQr
		},
		data(){
			return{
				topHeader:{
					title:'邀请玩家',
					isReturn:true,
					rtnRouter:'/userCenter'
				},
				userInfo:'',
				logo:require('@/assets/images/logo.png'),
				invitUrl:''
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			this.invitUrl = 'https://' + window.location.host + '/#/register?invite_code=' + this.userInfo.invite_code			
		},
		methods:{
			//复制
			copy(){
				var clipboard = new Clipboard('.c5 .btn');
				clipboard.on('success',e=>{
					this.$message.success('复制成功');
					clipboard.destroy();
				})
				clipboard.on('error',e=>{
					this.$message.error('请手动复制');
					clipboard.destroy();
				})
			},
			downloadFile() { 
				this.$message.success('请长按二维码保存图片')
				/*
				//下载base64图片
				let content = document.getElementById('qrcode').getElementsByTagName('img')[0].src
			    var base64ToBlob = function(code) {
			        let parts = code.split(';base64,');
			        let contentType = parts[0].split(':')[1];
			        let raw = window.atob(parts[1]);
			        let rawLength = raw.length;
			        let uInt8Array = new Uint8Array(rawLength);
			        for(let i = 0; i < rawLength; ++i) {
			            uInt8Array[i] = raw.charCodeAt(i);
			        }
			        return new Blob([uInt8Array], {
			            type: contentType
			        });
			    };
			    let aLink = document.createElement('a');
			    let blob = base64ToBlob(content); //new Blob([content]);
			    let evt = document.createEvent("HTMLEvents");
			    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
			    aLink.download = '邀请注册';
			    aLink.href = URL.createObjectURL(blob);
			    aLink.click();
			    */
			}			


		},
		mounted(){
		}
	}
</script>10.



