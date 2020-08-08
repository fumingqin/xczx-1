	/* 接口参数区 */
// 示例
const userInfo = {
	status: 1, //成功/失败提示返回值
	data: {
		unid: 183252546, //唯一ID标示
		mobile: 18888888888, //手机号码
		nickname: '茜茜爱玩', //姓名
		gender: 1, //性别
		birthday: '1994-01-19', //生日
		permanent: '福建省南平市武夷山市', //地址
		autograph: '喜欢可以点关注哦~', //签名
		portrait: '../../../static/LYFW/peripheralTourism/user/touxiang2.jpg', //头像
		bg: '/static/index/banner2.jpg', //背景图
		date: '2019-12-21', //回复日期
	},
	msg: '提示'
}

const complaint = {
	status: 1, //1成功,0失败提示返回值
	data: [
		'请选择内容',
		'bilibili公司',
		'日升企业',
		'腾讯企业',
		'鹅厂',
		'777电子竞技俱乐部',
		'枣子哥电子企业',
		'666大公司',
		'无敌风火轮电子商务有限公司',
		'国科电子培训有限公司',
		'养猪场',
		'4396电子有限公司',
	],
	msg: '提示'
}

const collectionContent = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			routeId: 1,
			scenicName: '武夷山 | 全方位详尽三日',
			title: '南平市武夷山风景名胜区',
			cost: 320,
			day: 3,
			date: '2019-11-12',
			like: 119,
			comment: 15,
			image: '../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
		},
		{
			routeId: 2,
			scenicName: '武夷山 | 全方位详尽三日',
			title: '南平市武夷山风景名胜区',
			cost: 320,
			day: 3,
			date: '2019-11-13',
			like: 119,
			comment: 15,
			image: '../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
		}
	],
	msg: '提示'
}

const collectionCommodity = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			routeId: 1,
			scenicName: '南平正宗熏鹅（武夷山店)',
			label: ['老字号', '南平特色', '物美价廉'],
			score: 4.5,
			cost: 140,
			comment: 15,
			image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png',
		},
		{
			routeId: 2,
			scenicName: '南平正宗熏鹅（武夷山店)',
			label: ['老字号', '南平特色', '物美价廉'],
			score: 3.5,
			cost: 140,
			comment: 15,
			image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png',
		}
	],
	msg: '提示'
}

const record = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			routeId: 1,
			day: 1,
			date: '2020-11-16',
			scenicName: '南平正宗熏鹅（武夷山店)',
			address: '南平 · 武夷山',
			icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
		},
		{
			routeId: 2,
			day: 2,
			date: '2020-11-17',
			scenicName: '武夷山 | 全方位详尽三日路攻略',
			address: '南平 · 武夷山',
			icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON2.png',
		},
		{
			routeId: 3,
			day: 2,
			date: '2020-11-17',
			scenicName: '南平正宗熏鹅（武夷山店)',
			address: '南平 · 武夷山',
			icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
		},
		{
			routeId: 4,
			day: 3,
			date: '2020-11-18',
			scenicName: '南平正宗熏鹅（武夷山店)',
			address: '南平 · 武夷山',
			icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
		},
		{
			routeId: 5,
			day: 3,
			date: '2020-11-18',
			scenicName: '南平正宗熏鹅（武夷山店)',
			address: '南平 · 武夷山',
			icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
		}
	],
	msg: '提示'
}

const description = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			title: '费用包含',
			way: '1、住宿：全程包含2晚住宿（两人入住标准间一间）。 <p></p> 2、用餐：全程包含9早餐13正餐，正餐包含特色餐：南平特色菜、藏族风味餐+风情表演、瑞丽勐卯宴。 <p></p> 3、门票：和顺古镇，其它行程内景点根据时间及个人身体状态、宗教信仰等因素选择自费项目。 <p></p> 4、领队及领航车服务：领队及领航车服务。 <p></p> 5、保险：旅行社组合险、旅游意外险。',
		},
		{
			title: '费用不含',
			way: '1、各地抵达泉州往返大交通费用。 <p></p> 2、单房差费用。 <p></p> 3、用车：车辆建议选择为科迪亚克或四驱越野车（如需其它车型选择，请另行补足车型差额）。 <p></p> 4、行程使用车辆的租车费、油费、过路费、停车费等车辆相关费用。 <p></p> 5、费用包含中未提及的其他个人消费。 <p></p> 6、因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。 <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。',
		}
	],
	msg: '提示'
}

const reserve = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			id: 1,
			title: '退款规则:按规则退',
			way: '<img src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/fuwenben.png" style="width:100%;height:auto;" /image> <p></p> 补充说明：实际退款金额，请以旅行社客服确认为准。',
		},
		{
			id: 2,
			title: '温馨提示',
			way: '1、机票：本产品不含大交通费用，如需大交通费用请联系我们的客服。 <p></p> 2、儿童门票预算为全票，门票减免根据各景点儿童票政策执行，具体减免费用在行程结束时进行退款。',
		},
		{
			id: 3,
			title: '重要提醒',
			way: '1、尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品； <p></p> 2、预订旅游产品，需要在下单后支付时限内支付全款，超出时限订单将会取消；再次购买需重新下单，购买成功会收到确认邮件及短信； <p></p> 3、报名旅游线路时，请确保身体状况良好适合参加线路行程；如身体不适，请务必将自身健康状况如实告知； <p></p> 4、请尊重地方民风民俗、行程中文明旅游，关注景区相关说明，遵守当地法律法规； <p></p> 5、因旅行社营业时间限制18:00后付款的订单无法在二次确认时间内回复，我们会在次日及时为您处理。如有急需处理的订单，请您通过电话咨询旅行社； <p></p> 6、您所预订的商品如果包含高危项目（如漂流、攀岩、潜水等），请在报名前根据自身条件进行选择，并充分阅读产品页面中相关重要提示事项； <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。',
		}
	],
	msg: '提示'
}

const Announcement = {
	status: 1, //1成功,0失败提示返回值
	data: {
		zl_title: '不负灿烂时光，周边游更精彩，美轮美奂',
		LabelContent: [{
				lc_text: '海丝泉州一日游',
			},
			{
				lc_text: '普陀山祈福双飞三日游',
			}
		]
	},
	msg: '提示'
}

const noticeContent = {
	status: 1, //1成功,0失败提示返回值
	data: {
		way: '1、上车前一定要核对车牌号、车身颜色是否与系统派发车辆一致，如果有电话往来，也请核对下号码是否无误。 <p></p> 2、如果是要外出，上车后请将车辆信息发送一份给自己的朋友，作为紧急联系人，保持联系，如果有不好的苗头，可以及时沟通。 <p></p> 3、单身一人乘车请勿坐在副驾驶位置上，一旦歹徒有犯罪意向，第一时间可以侵害到你，坐在后排可为自己增加应对时间。 <p></p> 4、在陌生人的车辆上一定切记不要熟睡，不要一直低头玩手机，要注意车窗外的风景，注意行驶路线是否正确。',
		day: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
		]
	},
	msg: '提示'
}

const choiceVehicle = {
	status: 1, //1成功,0失败提示返回值
	data: {
		id: 1,
		address: '厦门国际机场',
		destination: '泉州晋江',
		time: '2020-03-20',
		day: '1天',
	},
	msg: '提示'
}

const priceExplain = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			title: '费用说明',
			way: '用车当日可使用8小时，包括100公里（多日包车中，当日未用完的部分不可累计）',
		},
		{
			title: '费用包含',
			way: '车辆使用费，燃油费，司机服务费，司机餐食费',
		},
		{
			title: '费用不含',
			way: '费用中，不包括以下内容产生的费用： <p></p> 1、超时长费：超出套餐时长外产生的费用（收费标准详见订单填写页） <p></p> 2、超公里费：超出套餐公里数产生的费用（收费标准详见订单填写页） <p></p> 3、空驶费：实际下车地点与下车时填写的不一致，导致的司机车辆空驶的费用。（具体收费标准详见订单填写页）',
		}
	],
	msg: '提示'
}

const driverInformation = {
	status: 1, //1成功,0失败提示返回值
	data: {
		orderType: '待支付',
		licensePlate: '闽A88888',
		vehicleType: '豪华车型',
		name: '张三丰',
		age: '6',
		telephone: '134566456126',
		day: '3',
		duration: '47:00',
		cost: '200',
		overtimeCharge: '50',
		totalCost: '250',
		boardingPoint: '泉州客运中心',
		destination: '泉州动车站',
		totalLi: '150km',
		totalDuration: '02:00:00',
	},
	msg: '提示'
}


const selectSpecialLine = {
	status: 1, //1成功,0失败提示返回值
	data: {
		ci_countyCount: 0,
		ci_cityName: '泉州',
		countys: [{
			ct_countys: '晋江专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}, {
			ct_countys: '惠安专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}, {
			ct_countys: '福州专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}, {
			ct_countys: '安溪专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}, {
			ct_countys: '安海专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}, {
			ct_countys: '东石专线',
			ct_longitude: '118.600608',
			ct_latitude: '24.889217',
		}]
	},
	msg: '提示'
}

const complaintList = {
	status: 1, //1成功,0失败提示返回值
	data: [{
			or_class: '旅游',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '审核中',
		},
		{
			or_class: '客车',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '审核中',
		},
		{
			or_class: '旅游',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '投诉成功',
		},
		{
			or_class: '出租车',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '投诉成功',
		},
		{
			or_class: '旅游',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '投诉成功',
		},
		{
			or_class: '旅游',
			or_date: '2020-5-21',
			or_beComplainant: '蔡先生',
			or_dateString: '2020/05/21 11:22:00',
			or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
			or_Type: '投诉失败',
		}
	],
	msg: '提示'
}

const complaintList2 = {
	status: 1, //1成功,0失败提示返回值
	data: {
		or_Type: 3,
		or_name:'王小二',
		or_examineContent:'审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容审核内容',
		or_class:'旅游',
		or_Content: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
	},
	msg: '提示'
}

const complaintList3 = {
	status: 1, //1成功,0失败提示返回值
	data: {
		or_class:'旅游',
		or_name:'王小二',
		or_entrance:0,//页面传参到时接口不用
		txt:[
			'请选择',
			'旅游',
			'包车',
			'客车',
			'出租车',
			'公交',
			'自行车',
		],
	},
	msg: '提示'
}

const drivingRecord = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		model:'助力车',
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
	},
	{
		model:'助力车',
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
	},
	{
		model:'助力车',
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
	},
	{
		model:'助力车',
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
	},
	{
		model:'助力车',
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
	}],
	msg: '提示'
}

const expenseDetail = {
	status: 1, //1成功,0失败提示返回值
	data: {
		date:'2020-05-14',
		time:'18:00',
		timeUse:'10',
		cost:2,
		startCost:2,
		durationCost:4,
		packageOffer:6,
		totalCost:6,
		way: '1、您所购买的助力车套餐仅限在购买时所在城市内使用，但该城市内有特别使用规范的区域（如合作景区、园区）除外； <p></p>2、本助力车套餐不适用于单车，未满16周岁不可购卡； <p></p>3、助力车天数骑行卡套餐生效期间，每日可持卡骑行 2 次，每次骑行前 30 分钟免费，超出部分按照正常计费规则（即无优惠的规则）计费； <p></p>4 、助力车套餐在购买时立即生效，并于生效日最后一日的 23:59:59 或次数用完后失效；若您当前持有生效中的骑行卡套餐，可叠加购买相同类型的骑行卡套餐，新购买的卡将在前置卡失效后自动生效并开始计算有效期； <p></p>5、助力车套餐在结费时是否适用，以开锁时助力车套餐的生效状态为准；助力车套餐生效期间，不支持更换套餐或退款；助力车套餐中的优惠不可叠加使用，同一行程中只能使用1种优惠；购买时暂不支持使用账户余额支付。',
	},
	msg: '提示'
}

const homePage = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		hp_img:'../../static/GRZY/guanggao1.png',
	},
	{
		hp_img:'../../static/GRZY/guanggao2.png',
	},
	{
		hp_img:'../../static/GRZY/guanggao3.png',
	}],
	msg: '提示'
}

const selectBank = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		txt:'请选择',
	},
	{
		txt:'工商银行',
	},
	{
		txt:'兴业银行',
	},
	{
		txt:'宁波银行',
	},
	{
		txt:'汉口银行',
	},
	{
		txt:'南京银行',
	},
	{
		txt:'江苏银行',
	},
	{
		txt:'杭州银行',
	},
	{
		txt:'民生银行',
	},
	{
		txt:'平安银行',
	},
	{
		txt:'中信银行',
	}],
	msg: '提示'
}

const commuterCard = {
	status: 1, //1成功,0失败提示返回值
	data: {
		txt:[
			'普通用户',
			'公务员',
		],
	},
	msg: '提示'
}

const ridingStyle = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		img:'http://zntc.145u.net/UpLoadImages/DDT/巾帼文明线.jpg',
		txt:'巾帼文明线',
	},
	{
		img:'http://zntc.145u.net/UpLoadImages/DDT/公共自行车.jpg',
		txt:'公共自行车',
	},
	{
		img:'http://zntc.145u.net/UpLoadImages/DDT/古雷助力车01.jpg',
		txt:'古雷助力车',
	},
	{
		img:'http://zntc.145u.net/UpLoadImages/DDT/南站实拍图.jpg',
		txt:'客运南站',
	},
	{
		img:'http://zntc.145u.net/UpLoadImages/DDT/双层公交.jpg',
		txt:'双层公交',
	}],
	msg: '提示'
}

// 接口声明区
export default {
	userInfo,
	complaint,
	collectionContent,
	collectionCommodity,
	record,
	description,
	reserve,
	Announcement,
	noticeContent,
	choiceVehicle,
	priceExplain,
	driverInformation,
	selectSpecialLine,
	complaintList,
	complaintList2,
	complaintList3,
	drivingRecord,
	expenseDetail,
	homePage,
	selectBank,
	commuterCard,
	ridingStyle,
}
