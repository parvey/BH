import Vue from 'vue'
import store from '@/store/store'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
let vm = new Vue()

export function coinIcon(name){
	let coinList = [
		{
			name:'btc',
			icon:require('@/assets/images/coin/btc.png')
		},
		{
			name:'ada',
			icon:require('@/assets/images/coin/ada.png')
		},
		{
			name:'dash',
			icon:require('@/assets/images/coin/dash.png')
		},
		{
			name:'eos',
			icon:require('@/assets/images/coin/eos.png')
		},
		{
			name:'eth',
			icon:require('@/assets/images/coin/eth.png')
		},
		{
			name:'ltc',
			icon:require('@/assets/images/coin/ltc.png')
		},
		{
			name:'neo',
			icon:require('@/assets/images/coin/neo.png')
		},
		{
			name:'usdt',
			icon:require('@/assets/images/coin/usdt.png')
		},
		{
			name:'xlm',
			icon:require('@/assets/images/coin/xlm.png')
		},
		{
			name:'xrp',
			icon:require('@/assets/images/coin/xrp.png')
		},
		{
			name:'zb',
			icon:require('@/assets/images/coin/zb.png')
		},
		{
			name:'bh',
			icon:require('@/assets/images/coin/bh.png')
		}
	]
	let coinObj = coinList.find((item)=>{
		return item.name == name
	})
	return coinObj ? coinObj.icon : ''
}


export function isCert(){
	let is_auth = JSON.parse(sessionStorage.getItem('userInfo')).is_auth
	if(is_auth == 0){
		store.state.isCert = !store.state.isCert;
		return false
	}else if(is_auth == -1){
		vm.$vux.toast.text('实名认证审核中')
		return false
	}else if(is_auth == 1){
		return true
	}
}

window.coinIcon = coinIcon
window.isCert = isCert