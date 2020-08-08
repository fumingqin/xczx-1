//示例
const charteredBus = {
	status:1,
	data:{
		departName:'厦门机场厦门机场厦门机场',//出发地
		borunName:'晋江厦门机场厦门机场厦门机场',//到达地
		date:'2020-01-20',//出发时间
		number:'1',//包车天数
		car:'../../../static/BCFW/choice/che.png',
		carName:'比亚迪',
		carType:'轿车（5座）',
		carMoney:'110',
		tripName:'张三丰',
		tripId:'350583*********2645',
		tripPhone:'17522044126',
		security: '1.甲方于协议生效后，应当按协议约定之车辆、期限及地点，将乙方预约人员安全、及时的送至目的地，不得无故拖延或滞留。 \n 甲方承运车辆必须有齐全有效的运输证件、设备及车辆技术良好，驾驶员思想作风正派，驾驶技术熟练，并在运行途中严格遵守交通法规和道路运输管理规定。 \n 3、甲方应当按照包车协议上预约的运行路线、地点运行，不得无故绕路或中断运输，包车运行途中严禁上下旅客或招揽他人搭乘。 \n 乙方应当按照包车预约人数及行李重量包用车辆，不得擅自增加人数及行李重量，并且运送的人员不得超出所包车辆营运证核定人数，否则，甲方有权拒绝承运。',
		
	},
	msg:'提示'
}
const ArrayInfo={
	status: 1, //1成功/0失败提示返回值
	data: [{
			or_class:'包车-定制',
			or_time:'2020-03-04',
			or_type: '待发车',
			or_cost: 100,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'厦门',
			or_destination:'晋江',
			cm_day:'3',
			or_driverTelephone:'123',
			or_number:'0000'
		},
		{
			or_class:'包车-定制',
			or_time: '2020-03-04',
			or_type: '进行中',
			or_cost: 200,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'厦门',
			or_destination:'安溪',
			cm_day:'3',
			or_driverTelephone:'123',
			or_number:'0000'
		},
		{
			or_class:'包车-定制',
			or_time: '2020-03-04',
			or_type: '已完成',
			or_cost: 50,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'厦门',
			or_destination:'晋江',
			cm_day:'3',
			or_driverTelephone:'123',
			or_number:'0000'
		},
		{
			or_class:'包车-定制',
			or_time:'2020-03-04',
			or_type: '待发车',
			or_cost: 100,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'泉州',
			or_destination:'晋江',
			cm_day:'3',
			or_driverTelephone:'123',
			or_number:'0000',
			},
		{
			or_class:'包车-定制',
			or_time:'2020-03-04',
			or_type: '待支付',
			or_cost: 100,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'厦门',
			or_destination:'晋江',
			cm_day:'3',
			or_driverTelephone:'123',
			or_number:'0000'
		},
		{
			or_class:'包车-专线',//标题
			or_time:'2020-03-04',//预定时间
			or_type: '已取消',//状态
			or_cost: 100,//价格
			or_dateString:'2020-03-04 20:20',//发车时间
			or_boardingPoint:'厦门',//出发地
			or_destination:'晋江',//目的地
			cm_day:'3',//包车天数
			or_driverTelephone:'123',//司机电话
			or_number:'0000'//订单号
		}
	],
	msg: '提示'
}
const orderInfo={
	status: 1, //1成功/0失败提示返回值
	data: {
			or_class:'包车-定制',
			or_type: '待发车',
			userName:'张三丰',
			userCID:'350583199909010022',
			userPhone:'13235912326',
			cm_totalCost: 100,
			or_dateString:'2020-03-04 20:20',
			or_boardingPoint:'厦门',
			or_destination:'晋江',
			cm_day:3,
			or_driverTelephone:'123',
			or_number:'0000'
		}
}
// 接口声明区
export default {
	ArrayInfo,
	orderInfo,
	charteredBus,
}