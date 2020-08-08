//司机端全局参数定义

//接口域名
const Url = 'https://zntc.145u.net:9099';

//接口对象
const Interface = {
	addPassengerPosition : {
		value: Url + '/api/zhcx/addPassengerPosition',
		name:'旅客端定时实时上报位置',
		method:'GET',//GET-POST
		pages:["Jdt-zhcx/App.vue"]
	},
	AddEmergencyContact:{
		value: Url + '/api/person/AddEmergencyContact',
		name:'旅客端定时实时上报位置',
		method:'POST',//GET-POST
		pages:[]
	},
	GetInsuranceCheckState:{
		value: Url + '/api/Business/GetInsuranceCheckState',
		name:'获取业务参数接口',
		method:'POST',//GET-POST
		pages:[]
	},
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

// 接口声明区
export default {
	Interface,
	dateFormat
}