/* 接口参数区 */
// 示例

const GaoDeWebKey = [
	"2348ba1d476b5e44917533b65583f969", 
	"1df2cef2c0e71acc0ed1e90d5bf6431a"
]

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'https://zntc.145u.net:9099/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'https://zntc.145u.net:9099/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'https://zntc.145u.net:9099/api/zhcx/getLonLatRangeVehiclePosition',
]

//旅客端出租车接口配置

//接口域名
//接口域名
// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099'; //https请求
// #endif

//接口对象
const Interface = {
	//GET-POST
	AddExpressOrder_Passenger:{
		value: Url + '/api/taxi/AddExpressOrder_Passenger',
		name:'旅客端-出租车下单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	SearchExpressOrderByOrderNum_Passenger:{
		value:Url + '/api/taxi/SearchExpressOrderByOrderNum_Passenger',
		name:'旅客端-等车时候根据订单号查询出租车快车订单',
		method:'POST',
		page:["CZC/CallAndDrive.nvue"]
	},
	CancelExpressOrderByOrderNum_Passenger:{
		value:Url + '/api/taxi/CancelExpressOrderByOrderNum_Passenger',
		name:'旅客端-根据订单号取消订单',
		method:'POST',
		page:["CZC/CallAndDrive.nvue","order/OrderList"]
	},
	addPassengerOneTouchAlarm:{
		value:Url + '/api/taxi/addPassengerOneTouchAlarm',
		name:'旅客端-一键报警',
		method:'POST',
		page:["CZC/CallAndDrive.nvue","CZC/WaitTakeOrder"]
	},
	addPassengerEvaluate_Passenger:{
		value:Url + '/api/taxi/addPassengerEvaluate_Passenger',
		name:'旅客端-添加评价',
		method:'POST',
		page:["CZC/OrderDetail.nvue","CZC/SpecialLineDetail.nvue"]
	},
	InputAmountExpressOrder_Driver: {
		value: Url + '/api/taxi/InputAmountExpressOrder_Driver',
		name: '旅客端-出租车-订单支付',
		method: 'POST', //GET-POST
		pages: []
	},
	getAddressByLocation:{
		value:'https://restapi.amap.com/v3/geocode/regeo',
		name: '旅客端-地址逆解析、高德Api',
		method: 'Get', //GET-POST
		key: '59d14ab081f6bd5d41c1254a75a6ccf0', //高德key
		pages: []
	}
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}
// 接口声明区
export default {
	GaoDeWebKey,
	InterfaceAddress,
	Interface,
	dateFormat
}