

//接口域名
// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099';
// #endif

//接口对象
const Interface = {
	spt_GetcouponByuserId:{
		value: Url + '/api/bc/GetcouponByuserId',
		name:'包车订单-优惠券列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_scenicSpotSetOrder:{
		value: Url + '/api/app/scenicSpotSetOrder',
		name:'包车订单-H5提交订单',
		method:'POST',
		pages:["BCFW//bf_information.vue"]
	},
	
	spt_AddtouristOrder:{
		value: Url + '/api/Chartered/AddCharteredOrder_Passenger',
		name:'包车订单-APP提交订单',
		method:'POST',
		pages:["BCFW/bf_information.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/Chartered/QueryCharteredOrderByUserID_Passenger',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_RequestTickets:{
		value: Url + '/api/Chartered/QuerySpecialLineOrder_Passenger',
		name:'订单-去支付',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	
	spt_CancelTickets:{
		value: Url + '/api/Chartered/CancelCharteredOrder_Passenger',
		name:'订单-取消',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue","order/OrderList.vue"]
	},
	
	spt_DeleteTickets:{
		value: Url + '/api/Chartered/DeleteCharteredOrder_Passenger',
		name:'订单-删除',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_Pay:{
		value: Url + '/api/Pay/getCommonPayparameter',
		name:'订单-请求支付参数',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	spt_CheckPayState:{
		value: Url + '/api/Chartered/CharteredOrderPay_Passenger',
		name:'订单-去支付-出票',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	
	fw_selectSpecialLine:{
		value: Url + '/api/Chartered/GetCharteredAllLine_Passenger',
		name:'包车-选择专线',
		method:'POST',
		pages:["BCFW/bf_choice.vue"]
	},
	
	fw_privateLineSearch:{
		value: Url + '/api/Chartered/GetCharteredLineByLineName_Passenger',
		name:'包车-选择专线搜索',
		method:'POST',
		pages:["BCFW/bf_choice.vue"]
	},
	
	fw_selectVehicle:{
		value: Url + '/api/Chartered/GetVehicleType_Passenger',
		name:'包车-选择车辆',
		method:'POST',
		pages:["BCFW/bf_choiceVehicleType.vue"]
	},
	
	fw_charterDetails:{
		value: Url + '/api/Chartered/QueryCharteredOrderByOrderNumber_Passenger',
		name:'包车-详情',
		method:'POST',
		pages:["BCFW/bf_charterMap.vue"]
	}
	
}

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat',
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
]

// 接口声明区
export default {
	Interface,
	InterfaceAddress,
}
