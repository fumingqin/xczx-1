import Vue from 'vue'
import App from './App'
import Ctky from 'common/Ctky.js' //传统客运
import Czc from 'common/Czc.js'   //出租车
import GrzxInter from 'common/Grzx.js' //个人中心
import Lyfwfmq from 'common/LYFW/LyfwFmq.js' //旅游服务-傅洺钦
import Lyfwcwd from 'common/LYFW/LyfwCwd.js' //旅游服务-蔡伟达
// import store from 'common/login.js' //登录
import BcfwZyx from 'common/BCFW/BcfwZyx.js' //包车服务-郑育兴
import zyx from 'common/ZYX.js'
import Sceniclist from 'common/scenicSpotDistribution.js' //旅游服务-景区目录
import ChangeImage from 'common/changeImage.js' //更换图片
import oSit from 'common/overallSituation.js' //全局js文件
import Zxgp from 'common/zxgp.js' //专线购票

Vue.config.productionTip = false

Vue.prototype.$oSit=oSit;  //全局文件
Vue.prototype.$Czc=Czc;  //出租车
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心
Vue.prototype.$ChangeImage=ChangeImage; //更换图片
Vue.prototype.$Zxgp=Zxgp; //专线购票
App.mpType = 'app'


const app = new Vue({
    ...App
})


//模拟异步请求数据 - 传统客运
const ctky = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Ctky[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 出租车
const czc = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Czc[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 个人中心
const grzx = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(GrzxInter[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 旅游服务
const lyfwfmq = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Lyfwfmq[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 旅游服务
const lyfwcwd = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Lyfwcwd[type]);
		}, 500)
	})
}



//模拟异步请求数据 - 旅游服务
const sceniclist = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Sceniclist[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 包车服务
const bcfwzyx = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(BcfwZyx[type]);
		}, 500)
	})
}

const zyxinfo = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(zyx[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 专线购票
const zxgp = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Zxgp[type]);
		}, 500)
	})
}

Vue.prototype.$api = {ctky,czc,grzx,lyfwfmq,lyfwcwd,sceniclist,bcfwzyx,zyxinfo,zxgp};
app.$mount()
