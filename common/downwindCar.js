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

	const Url = 'https://zntc.145u.net:9099'; //https请求

//接口对象
const Interface = {
	//GET-POST
	GetHitchhiker_Passenger:{
		value: Url + '/api/Hitchhiker/GetHitchhiker_Passenger',
		name:'旅客端-获取全部顺风车线路',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	GetHitchhikerByLineID_Passenger:{
		value: Url + '/api/Hitchhiker/GetHitchhikerByLineID_Passenger',
		name:'旅客端-根据线路ID获取顺风车线路',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	AddHitchhikerOrder_Passenger:{
		value: Url + '/api/Hitchhiker/AddHitchhikerOrder_Passenger',
		name:'旅客端-添加顺风车订单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	QueryHitchhikerOrder_Passenger:{
		value: Url + '/api/Hitchhiker/QueryHitchhikerOrder_Passenger',
		name:'旅客端-根据订单ID获取顺风车订单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	CancelHitchhikerOrder_Passenger:{
		value: Url + '/api/Hitchhiker/CancelHitchhikerOrder_Passenger',
		name:'旅客端-取消订单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	HitchhikerOrderOrderPay_Passenger:{
		value: Url + '/api/Hitchhiker/HitchhikerOrderOrderPay_Passenger',
		name:'旅客端-支付完成改变订单状态',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	DeleteHitchhikerOrder_Passenger:{
		value: Url + '/api/Hitchhiker/DeleteHitchhikerOrder_Passenger',
		name:'旅客端-删除订单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	QueryHitchhikerOrderByUserID_Passenger:{
		value: Url + '/api/Hitchhiker/QueryHitchhikerOrderByUserID_Passenger',
		name:'旅客端-根据用户ID订单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
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