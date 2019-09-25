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
	}
  ]

export default routes;
	