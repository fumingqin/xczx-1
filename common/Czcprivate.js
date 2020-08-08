/* 专线出租车 */
/* 接口参数区 */
// 示例

//接口域名
const Url = 'https://zntc.145u.net:9099';
//接口对象
const Interface = {
	//GET-POST
	GetSpecialLine:{
		value: Url + '/api/SpecialLine/GetSpecialLine_Passenger',
		name:'旅客端-获取专线车线路信息',
		method:'GET',
		pages:["Home/ChooseSite.nvue"]
	},
	GetSpecialLineByLineID:{
		value: Url + '/api/SpecialLine/GetSpecialLineByLineID_Passenger',
		name:'旅客端-根据线路ID获取线路信息',
		method:'POST',
		pages:["CZC/PrivateTaxiPayment.vue"]
	},
	AddSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/AddSpecialLineOrder_Passenger',
		name:'旅客端-添加订单',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	CancelSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/CancelSpecialLineOrder_Passenger',
		name:'旅客端-取消订单',
		method:'POST',
		pages:["order/OrderList","CZC/PrivateTaxiPayment.vue","CZC/WaitTakeOrder"]
	},
	getCommonPayparameter:{ 
		value: Url+'/api/Pay/getCommonPayparameter',
		name:'旅客端-获取支付信息',
		method:'POST', 
		pages:["CZC/PrivateTaxiPayment.vue"]
	},
	BouncePay:{
		value: Url+'/api/Pay/BouncePay',
		name:'旅客端-退款',
		method:'POST', 
		pages:["CZC/OrderList","CZC/WaitTakeOrder"]
	},
	CheckPayState:{
		value: Url+'/api/Pay/CheckPayState',
		name:'旅客端-检测支付是否成功',
		method:'POST', 
		pages:["order/OrderList","CZC/PrivateTaxiPayment","CZC/WaitTakeOrder"]
	},
	SpecialLineOrderPay_Passenger:{
		value: Url+'/api/ly/SpecialLineOrderPay_Passenger',
		name:'旅客端-订单支付完成',
		method:'POST', 
		pages:["CZC/PrivateTaxiPayment.vue"]
	},
	QuerySpecialLineOrderByUserID_Passenger:{
		value: Url + '/api/SpecialLine/QuerySpecialLineOrderByUserID_Passenger',
		name:'旅客端-根据用户ID查询订单',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	QuerySpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/QuerySpecialLineOrder_Passenger',
		name:'旅客端-根据订单ID查询订单',
		method:'POST',
		pages:["CZC/WaitTakeOrder.nvue","CZC/SpecialLineDetail.nvue"]
	},
	SpecialLineOrderPay_Passenger:{
		value: Url + '/api/SpecialLine/SpecialLineOrderPay_Passenger',
		name:'旅客端-支付完成',
		method:'POST',
		pages:["CZC/PrivateTaxiPayment.nvue"]
	},
	DeleteSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/DeleteSpecialLineOrder_Passenger',
		name:'旅客端-删除订单',
		method:'POST',
		pages:["order/OrderList"]
	},
}


// 接口声明区
export default {
	Interface,
}