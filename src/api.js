import axios from 'axios';
import qs from 'qs'

//export const API_ROOT = ''
//export const API_ROOT = 'XQ/api/'
//export const API_ROOT = 'http://uat.api.big-player.co/api/'
//export const API_ROOT = 'https://api.big-player.co/api/'
export const API_ROOT = 'http://bh.procase.wiki/api/'


/*-- 通用 --*/

//发送验证码
export const sysSendCodeApi = params => { return axios.post( API_ROOT + 'sys/sendcode/', qs.stringify(params));};

//获取用户信息
export const getUserInfoApi = params => { return axios.post( API_ROOT + 'user/info/', qs.stringify(params));};



/*-- 登录注册 --*/
//登录
export const userLoginApi = params => { return axios.post( API_ROOT + 'login/', qs.stringify(params));};

//注册
export const userRegisterApi = params => { return axios.post( API_ROOT + 'register/', qs.stringify(params));};

//重置密码
export const userForgetpwdApi = params => { return axios.post( API_ROOT + 'forgetpwd/', qs.stringify(params));};


/*-- 会员中心 --*/

//收益详情
export const getFundRecordApi = params => { return axios.post( API_ROOT + 'fund/record/', qs.stringify(params));};

//邀请的星球
export const getUserChildApi = params => { return axios.post( API_ROOT + 'user/child/', qs.stringify(params));};

//激活下级
export const activateChildApi = params => { return axios.post( API_ROOT + 'user/activate/', qs.stringify(params));};

export const sysUploadApi = params => { 
	return axios({
		url:API_ROOT + 'sys/uploadFile',
		data:params,
		method:'post',
		headers: { 
			'Content-Type': 'multipart/form-data'
		}
	});
};

//实名认证
export const userAuthApi = params => { return axios.post( API_ROOT + 'user/auth/', qs.stringify(params));};

//用户资料
export const userProfileApi = params => { return axios.post( API_ROOT + 'user/myProfile', qs.stringify(params));};

//提现
export const fundWithdrawApi = params => { return axios.post( API_ROOT + 'fund/withdraw', qs.stringify(params));};

//静态收益
export const awardProjectApi = params => { return axios.post( API_ROOT + 'award/project', qs.stringify(params));};

//团队收益
export const awardTeamApi = params => { return axios.post( API_ROOT + 'award/team', qs.stringify(params));};

//修改密码
export const userChangepasswordApi = params => { return axios.post( API_ROOT + 'user/changepassword', qs.stringify(params));};

//修改密码
export const userChangepaypasswordApi = params => { return axios.post( API_ROOT + 'user/changepaypassword', qs.stringify(params));};

//ETH兑换
export const sysGePriceApi = params => { return axios.post( API_ROOT + 'sys/getPrice', qs.stringify(params));};

//我的团队
export const userChildtreeApi = params => { return axios.post( API_ROOT + 'user/childtree', qs.stringify(params));};

//提现列表
export const fundWithdrawRecordApi = params => { return axios.post( API_ROOT + 'fund/withdrawRecord', qs.stringify(params));};

//取消提现
export const fundWithdrawCancelApi = params => { return axios.post( API_ROOT + 'fund/withdrawCancel', qs.stringify(params));};

//充值记录
export const fundRechargeRecordApi = params => { return axios.post( API_ROOT + 'fund/rechargeRecord', qs.stringify(params));};





/*-- 首页 --*/

//获取新闻列表
export const getIndexNewsApi = params => { return axios.post( API_ROOT + 'index/news/', qs.stringify(params));};


//获取价格走势
export const getIndexPricerendApi = params => { return axios.post( API_ROOT + 'index/pricetrend/', qs.stringify(params));};

//获取公告列表
export const getBulletinListApi = params => { return axios.post( API_ROOT + 'bulletin/', qs.stringify(params));};

//公告详情
export const getBulletinDtlApi = params => { return axios.post( API_ROOT + 'bulletin/detail/', qs.stringify(params));};

//banner
export const indexBannerApi = params => { return axios.post( API_ROOT + 'index/banner/', qs.stringify(params));};


/*-- 星球 --*/

//持有的星球
export const getOrderRecordApi = params => { return axios.post( API_ROOT + 'order/record/', qs.stringify(params));};

//所有星球
export const getProjectApi = params => { return axios.post( API_ROOT + 'project/', qs.stringify(params));};

//购买星球
export const orderBuyApi = params => { return axios.post( API_ROOT + 'order/buy/', qs.stringify(params));};

//预约列表
export const reserveRecordApi = params => { return axios.post( API_ROOT + 'reserve/record/', qs.stringify(params));};

//取消预约
export const reserveCancelApi = params => { return axios.post( API_ROOT + 'reserve/cancel/', qs.stringify(params));};

//预约
export const reserveApi = params => { return axios.post( API_ROOT + 'reserve/', qs.stringify(params));};

//export const untyingApi = params => { return axios.get( API_ROOT + 'dpf/untying/' + params.para.uid ); };

/*--游戏--*/
//列表
export const getGameListApi = params => { return axios.post( API_ROOT + 'game/', qs.stringify(params));};
