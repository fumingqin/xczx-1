// 引用模板代码
const Interface = {
	
	address:{
		// 公众号
		// #ifdef H5
			Url : 'http://zntc.145u.net', //综合出行
		// #endif
		// 小程序/APP
		// #ifndef H5
			// Url : 'https://zntc.145u.net:9099',
			Url : 'https://zntc.145u.net:9099', //综合出行
		// #endif
	},
	
	system:{
		applyName:'南平综合出行',
		// appName:'专线购票小程序', //仅用于微信授权登录
		appName:'南平综合出行', //仅用于微信授权登录
		// #ifdef H5
			openidtype:'公众号',
		// #endif
		// #ifdef MP-WEIXIN
			openidtype:'小程序',
		// #endif
		// #ifdef APP-PLUS
			openidtype:'APP',
		// #endif
			
			imageApplicationType:'XCX',//全局图片接口应用类型，用于请求全局图片使用
			
	}
}

const appConfig={  //AppId,AppSecret配置
	wxConfig:{
		name:'小程序的Appid',
		// wxAppId:'wxb9df0ad8d98f94a1', //专线购票
		wxAppId:'wx37b8f978e30050e4', //南平综合出行
	},
	H5Config:{
		name:'公众号的Appid和App秘钥',
		H5AppId:'wx0ddb1b8b3ed8ee80',
		H5AppSecret:'9091290458d85ff3a014198275d1d6d5',
	},
	local:{
		url:'http://zntc.145u.net/h55/#/',
		name:'公众号请求地址',
	},
}

// 接口声明区
export default {
	Interface,
	appConfig
}
