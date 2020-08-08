//弹框须知文本
const notice = {
	status: 1, //1成功/0失败提示返回值
	data: {
		explain: '预订时间：最晚需在出行当天18:00前购票 \n 有效时间：指定购买日期起，1日有效',
		way: '1、本产品每个账号每天限购一张，购买APP订单中的二维码检票入园即可 \n 2、费用包含：成人票一张、竹筏票一张 \n 3、本产品不支持代购或转售，仅限购票人本人使用。因代购或转售无法入园申请退改，不退不改。',
		date: '周一至周日 09:00~18:00',
		policy: '1、70岁以上老年人凭老年证免费 \n 2、身高80厘米以下免票 \n 3、身高80-120厘米儿童票价半折 \n 4、身高120以上儿童全票',
		rule: '该产品未使用且在有效期内支持随时退，过期不退不改，敬请谅解！如需取消，请登录APP账号申请取消，经核实 未使用且在有效期内，可免费取消。如需 改期，请申请取消后重新预订。',
		security: '1.本票仅为乘坐使用，不作为报销凭证 \n 2.本票仅供一人使用、当趟有效，逾期作废 \n 3.请勿携带贵重物品乘坐竹筏 \n 4.在行筏过程中严禁站立或行走拍照 \n 5.在雷雨、大风、能见度差等条件下停筏 \n 6.竹筏在行驶中或未停稳时，严禁强行登、下筏 \n 7.严禁下河游泳，戏水 \n 8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏 \n 9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣 \n 10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏 \n 11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整 \n 12.咨询电话：0599-8030999 投诉电话：0599-8030995',
	},
	msg: '提示' 
}


//接口域名
// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099';
// #endif



//引入模板
	// url:$lyfw.Interface.spt_tl_six.value,
	// method:$lyfw.Interface.spt_tl_six.method,
	// import $lyfw from '../../../common/LYFW/LyfwFmq.js' //引用路径

//接口对象
const Interface = {
	//GET-POST
	//----------------------------------------景区门票-------------------------------------------
	spt_GetticketSearchByrequestArea_Six:{
		value: Url + '/api/ly/GetticketSearchByrequestArea_Six',
		name:'景区列表-六宫格',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketSearchByrequestArea:{
		value: Url + '/api/ly/GetticketSearchByrequestArea',
		name:'景区列表-景区列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketSearchBysearchValue:{
		value: Url + '/api/ly/GetticketSearchBysearchValue',
		name:'景区列表-搜索',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketDetailByticketId:{
		value: Url + '/api/ly/GetticketDetailByticketId',
		name:'景区门票-详情',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsDetails.vue"]
	},
	
	spt_GetticketSecurityByticketIde:{
		value: Url + '/api/ly/GetticketSecurityByticketId',
		name:'景区门票-门票须知',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_GetcouponByuserId:{
		value: Url + '/api/ly/GetcouponByuserId',
		name:'景区门票-优惠券列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_AddtouristOrder:{
		value: Url + '/api/ly/AddtouristOrder',
		name:'景区门票-提交订单',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/ly/RequestTicketsList',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_RequestTicketsListDetail:{
		value: Url + '/api/ly/RequestTicketsListDetail',
		name:'订单详情',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderDetails.vue","LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_getIsPaySuccess:{
		value: Url + '/api/ly/getIsPaySuccess',
		name:'订单-去支付-查询是否出票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	spt_RequestTickets:{
		value: Url + '/api/ly/RequestTickets',
		name:'订单-去支付-出票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	spt_CancelTickets:{
		value: Url + '/api/ly/CancelTickets',
		name:'订单-取消',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_BounceTickets:{
		value: Url + '/api/ly/BounceTickets',
		name:'订单-退票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_DeleteTickets:{
		value: Url + '/api/ly/DeleteTickets',
		name:'订单-删除',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_Pay:{
		value: Url + '/api/ly/Pay',
		name:'订单-请求支付参数（景区门票专用）',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	
	spt_getCommonPayparameter:{
		value: Url + '/api/Pay/getCommonPayparameter',
		name:'订单-请求支付参数（通用）',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	
	//----------------------------------------旅游产品-------------------------------------------
	lyky_GetticketSearchByrequestArea_Six:{
		value: Url + '/api/lyky/GetticketSearchByrequestArea_Six',
		name:'旅游产品-六宫格',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_ticketsList.vue"]
	},
	
	lyky_GetticketSearchByrequestArea:{
		value: Url + '/api/lyky/GetticketSearchByrequestArea',
		name:'旅游产品-景区列表',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_ticketsList.vue"]
	},
	
	lyky_GetticketSearchBysearchValue:{
		value: Url + '/api/lyky/GetticketSearchBysearchValue',
		name:'旅游产品-搜索',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_ticketsList.vue"]
	},
	
	lyky_GetticketDetailByticketId:{
		value: Url + '/api/lyky/GetticketDetailByticketId',
		name:'旅游产品-详情',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_ticketsDetails.vue"]
	},
	
	lyky_GetticketSecurityByticketIde:{
		value: Url + '/api/lyky/GetticketSecurityByticketId',
		name:'旅游产品-门票须知',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_orderAdd.vue"]
	},
	
	lyky_GetcouponByuserId:{
		value: Url + '/api/lyky/GetcouponByuserId',
		name:'旅游产品-优惠券列表',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_orderAdd.vue"]
	},
	
	lyky_AddtouristOrder:{
		value: Url + '/api/lyky/AddtouristOrder',
		name:'旅游产品-提交订单',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_orderAdd.vue"]
	},
	
	lyky_RequestTicketsList:{
		value: Url + '/api/lyky/RequestTicketsList',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	lyky_RequestTicketsListDetail:{
		value: Url + '/api/lyky/RequestTicketsListDetail',
		name:'订单详情',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_orderDetails.vue","LYFW/tourismProducts/tp_selectivePayment.vue","order/OrderList.vue"]
	},
	
	lyky_getIsPaySuccess:{
		value: Url + '/api/lyky/getIsPaySuccess',
		name:'订单-去支付-查询是否出票',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue"]
	},
	
	lyky_RequestTickets:{
		value: Url + '/api/lyky/RequestTickets',
		name:'订单-去支付-出票',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue"]
	},
	
	lyky_CancelTickets:{
		value: Url + '/api/lyky/CancelTickets',
		name:'订单-取消',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue","order/OrderList.vue"]
	},
	
	lyky_BounceTickets:{
		value: Url + '/api/lyky/BounceTickets',
		name:'订单-退票',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue","order/OrderList.vue"]
	},
	
	lyky_DeleteTickets:{
		value: Url + '/api/lyky/DeleteTickets',
		name:'订单-删除',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	lyky_Pay:{
		value: Url + '/api/lyky/Pay',
		name:'订单-请求支付参数（景区门票专用）',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue"]
	},
	
	lyky_GetScheduleByDateStartStationEndStation:{
		value: Url + '/api/lyky/GetScheduleByDateStartStationEndStation',
		name:'订单 - 获取班次发车信息',
		method:'POST',
		pages:["pages_LYFW/pages/LYFW/tourismProducts/tp_chooseShuttle"]
	},
	
	lyky_BindGoInfo:{
		value: Url + '/api/lyky/BindGoInfo',
		name:'订单 - 绑定去程班次信息）',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue"]
	},
	
	lyky_BindBackInfo:{
		value: Url + '/api/lyky/BindBackInfo',
		name:'订单-绑定回程班次信息',
		method:'POST',
		pages:["LYFW/tourismProducts/tp_selectivePayment.vue"]
	},
	
	qg_GetImage:{
		value: Url + '/api/zhcx/getImage',
		name:'全局-请求静态图片',
		method:'POST',
		pages:["pages/Home/guidePage.vue"]
	},
	
	//--------------------------------跟团游-------------------------------
	gt_travelDetails:{
		value: Url + '/api/ly/GetGroupTourDetailBycontentId',
		name:'跟团游详情页-产品介绍-费用说明-预订须知',
		method:'POST',
		pages:["LYFW/currency/travelDetails"]
	},
	
	gt_travelDetails2:{
		value: Url + '/api/ly/GetGroupTourScheduleBycontentId',
		name:'跟团游详情页-行程安排',
		method:'POST',
		pages:["LYFW/currency/travelDetails"]
	},
	
	gt_groupTourList:{
		value: Url + '/api/ly/GetGroupTour',
		name:'跟团游列表',
		method:'POST',
		pages:["LYFW/groupTour/groupTourList"]
	},
	
	gt_groupTourList2:{
		value: Url + '/api/ly/GetGroupTourByGroupTitle',
		name:'跟团游列表-搜索',
		method:'POST',
		pages:["LYFW/groupTour/groupTourList"]
	},
	
	//--------------------------------自由行-------------------------------
	zyx_GetFreeTourByRegionWeixin:{
		value: Url + '/api/ly/GetFreeTourByRegionWeixin',
		name:'自由行-列表',
		method:'POST',
		pages:["pages_LYFW/pages/LYFW/independentTravel/it_list"]
	},
	
	zyx_GetFreeTourByRegionWeixinTitle:{
		value: Url + '/api/ly/GetFreeTourByRegionWeixinTitle',
		name:'自由行-搜索',
		method:'POST',
		pages:["pages_LYFW/pages/LYFW/independentTravel/it_list"]
	},
	
	zyx_GetCityInfo:{
		value: Url + '/api/ly/GetCityInfo',
		name:'自由行-地区列表',
		method:'POST',
		pages:["pages_LYFW/pages/LYFW/independentTravel/it_list"]
	},
	
	person_addComplaint:{
		value: Url + '/api/person/addComplaint',
		name:'订单 - 投诉',
		method:'POST',
		pages:["pages/order/complaint"]
	},
	//--------------------------------旅游服务首页-咨询-------------------------------
	currency_zhly:{
		value: Url + '/api/person/getNews',
		name:'旅游服务首页 - 咨询',
		method:'POST',
		pages:["pages/LYFW/currency/ho_zhly"]
	},
	home_InformationDetails:{
		value: Url + '/api/person/AddNewsCount',
		name:'旅游服务首页 - 咨询详情提高浏览',
		method:'POST',
		pages:["pages/Home/InformationDetails"]
	},
	home_InformationDetails2:{
		value: Url + '/api/person/getNewsByAid',
		name:'旅游服务首页 - 咨询详情',
		method:'POST',
		pages:["pages/Home/InformationDetails"]
	},
	//--------------------------------------投诉------------------------------------
	GRZX_complaint:{
		value: Url + '/api/person/InsertComplaint',
		name:'个人中心 - 投诉页面',
		method:'POST',
		pages:["pages/GRZX/gz_complaintsPage"]
	},
	GRZX_complaintList:{
		value: Url + '/api/person/getComplaintByuserId',
		name:'个人中心 - 投诉列表页',
		method:'POST',
		pages:["pages/GRZX/gz_complaintList"]
	},
	GRZX_complaintContent:{
		value: Url + '/api/person/getComplaintDetailBynumber',
		name:'个人中心 - 投诉详情页',
		method:'POST',
		pages:["pages/GRZX/gz_complaintContent"]
	},
}


// 接口声明区
export default {
	notice,
	Interface
}
