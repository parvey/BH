import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routers'
import axios from 'axios'
import qs from 'qs'
import store from './store/store'
import './assets/css/common.less'
import {LoadingPlugin,AlertPlugin,ToastPlugin} from 'vux' //vux全局组件
//import ElementUI from 'element-ui'; //element-ui
//import 'element-ui/lib/theme-chalk/index.css';
import JsEncrypt from 'jsencrypt'; //RSA加密
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播
import vuescroll from 'vuescroll';//滚动条
import './assets/js/common'

Vue.config.productionTip = false
Vue.use(VueRouter);
const router = new VueRouter({routes})//引入路由
Vue.use(Vuex); //引入状态管理

//注册vux插件
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

Vue.use(vuescroll)

//注册ElementUi组件
//Vue.use(ElementUI);
//Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

//RSA加密
Vue.prototype.$getCode = function(password){
	let encrypt = new JsEncrypt();
	encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAymKes320OlfmKUSVAr7TxsudsYbdqJAxTCumftqkQu+TeJqUnrzZsyTBdkgJ74lLN/onc7NLu2Q3L0T503yttEZv3tpb7AV+B06SN2r7SWWHKRh07Mt+trtttp2s/8rpo89QH0r3z7xyQ1jSQEMbF1ObZCD073McI3UX6JPJppCzy4EXqIpMoa4xb2sf8YFDkzjsaeEh10drrPZBJwQigHC2io0ZGtyLQ8JBaFhu5z4Tq0KQY8i+Bpsu4q9/k0Q69ToAdhjun3vXQkXYZd7eps12Zimew9cFirsQ7nl4mfHcA41/6D5T1BkEM2+55BTNKAXqfIY2PoCWefQQG5qmowIDAQAB')
	let data = encrypt.encrypt(password)
	return data
}

Vue.use(VueAwesomeSwiper)

/*-- axios拦截 --*/

//设置文件上传拦截
var instance = axios.create({
	baseURL:'',
	timeout:180000000,
	headers: {'Content-Type':'multipart/form-data'}
});
Vue.prototype.instance = instance;
axios.interceptors.request.use(
	config => {
		if(JSON.parse(sessionStorage.getItem('token'))){
			config.headers.utoken = JSON.parse(sessionStorage.getItem('token'));
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
)
axios.interceptors.response.use(
	response => {
		if(response.data.code == '10003'){
			store.state.isLoginOut = !store.state.isLoginOut;
			router.push({path:'/login'});
		}else{
			if(response.data.code !== undefined){
				return response.data
			}else{
				return response.data.data
			}			
		}
	}
)

instance.interceptors.request.use(
	config => {
		if(JSON.parse(sessionStorage.getItem('token'))){
			config.headers.utoken = JSON.parse(sessionStorage.getItem('token'));
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
)
instance.interceptors.response.use(
	response => {
		if(response.data.code == '10003'){
			store.state.isLoginOut = true;
			router.push({path:'/login'});
		}else{
			if(response.data.code !== undefined){
				return response.data
			}else{
				return response.data.data
			}			
		}
	}
)


//获取可跳转页面路径
let routePath = [];
(function traverse(node) {
    node.forEach(i => {        
        if(i.path != '/') routePath.push(i.path);
        i.children && traverse(i.children)
    })
})(routes);

//路由跳转前的判断
// router.beforeEach((to, from, next) => {
// 	let toPath = to.path;
// 	let user = JSON.parse(sessionStorage.getItem('token'));//是否登录
// 	if(!user){
// 		if(toPath == '/login' || toPath == '/register' || toPath == '/resetPassword'){
// 			next();
// 			return false;
// 		}else{
// 			next({path: '/login'})
// 		}
// 	}else if(user){
// 		if(toPath == '/login' || toPath == '/register' || toPath == '/resetPassword'){ //跳转后登出的页面
// 			sessionStorage.removeItem('token');
// 			sessionStorage.removeItem('userInfo');
// 			next();
// 		}else if(routePath.indexOf(toPath) == -1){
// 			next(false)
// 			if(to.path == '/' && from.path == '/') next({path: '/Home'})
// 		}else{
// 			next();
// 		}
// 	}
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.router = router;
window.axios = axios;
window.qs = qs;
 