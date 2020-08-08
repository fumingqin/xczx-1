//接口域名
// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099';
// #endif

//接口对象
const Interface = {	
	spt_scenicSpotSetOrder:{
		value: Url + '/api/person/InsertuserImage',
		name:'站点拍照提交',
		method:'POST',
		pages:["GRZX/printSubmit.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/person/getuserImageByuserId',
		name:'站点拍照提交列表',
		method:'POST',
		pages:["GRZX/prctureList.vue"]
	},
	
	spt_charterDetails:{
		value: Url + '/api/person/getuserImageDetailBynumber',
		name:'站点拍照提交-详情',
		method:'POST',
		pages:["GRZX/printDetails.vue"]
	},
	spt_charterUpdate:{
		value: Url + '/api/person/UpdateuserImage',
		name:'站点拍照修改',
		method:'POST',
		pages:["GRZX/printSubmit.vue"]
	}
	
}

// 接口声明区
export default {
	Interface,
}
