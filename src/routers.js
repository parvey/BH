let routes = [
	{
		path:'/login',
		name:'登录',
		component: (resolve) => require(['./components/user/login.vue'], resolve)
	},
	{
		path:'/resetPassword',
		name:'忘记密码',
		component: (resolve) => require(['./components/user/resetPassword.vue'], resolve)
	},
	{
		path:'/register',
		name:'注册',
		component: (resolve) => require(['./components/user/register.vue'], resolve)
	},
	{
		path:'/home',
		name:'行情',
		component: (resolve) => require(['./components/Home/Home.vue'], resolve)
	},
	{
		path:'/userCenter',
		name:'个人中心',
		component: (resolve) => require(['./components/userCenter/userCenter.vue'], resolve)
	},
	{
		path:'/game',
		name:'游戏',
		component: (resolve) => require(['./components/Game/Game.vue'], resolve)
	},
	{
		path:'/assets',
		name:'资产',
		component: (resolve) => require(['./components/Assets/Assets.vue'], resolve)
	},
	{
		path:'/paymentCode',
		name:'收款码',
		component: (resolve) => require(['./components/Assets/paymentCode.vue'], resolve)
	},
	{
		path:'/myCard',
		name:'持有卡片',
		component: (resolve) => require(['./components/Assets/myCard.vue'], resolve)
	},
	{
		path:'/bao',
		name:'生息宝',
		component: (resolve) => require(['./components/Assets/bao.vue'], resolve)
	}
  ]

export default routes;
	