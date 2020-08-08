<template>
	<view class="myView">
		<scroll-view scroll-y="true" style="margin-bottom: 112upx;">
			<view class="headerClass">
			</view>
			<!-- 内容 -->
			<view class="orderCommonClass" style="margin-top: -110upx;">
				<!-- 顶部订单信息 -->
				<view class="ticketInfoClass">
					<!-- 时间-价格 -->
					<view class="ticketContent">
						<view class="textCLass" style="font-size: 28upx;color: #333333;">{{turnDate(ticketDetail.SetoutTime)}}出发</view>
						<view class="textCLass" style="font-size: 34upx;color: #FC4646;">￥{{oneTicketPrice}}</view>
					</view>
					<!-- 站点-余票 -->
					<view class="ticketContent">
						<view class="textCLass" style="font-size: 32upx;color: #333333;">{{ticketDetail.StartSiteName}}→
							{{ticketDetail.EndSiteName}}</view>
						<view v-if="false" class="textCLass" style="font-size: 24upx;font-style: SourceHanSansSC-Light; color: #666666;">余{{ticketDetail.remainingVotes}}张</view>
					</view>
					<!-- 车型-儿童半价 -->
					<view class="ticketContent">
						<view class="textCLass" style="font-size: 24upx;color: #999999;">根据人数决定车型</view>
					</view>
				</view>
			</view>

			<!-- 地图标点 -->
			<view class="orderCommonClass" v-if="false">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">地图标点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view @tap="checkLocation" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">查看班次信息</view>
					<image src="../../../../static/ZXGP/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>

			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<!-- v-if="ticketDetail.shuttleType == '定制班车'" -->
			<view class="stationContentView">
				<view class="boarding" style="border-bottom:#EAEAEA solid 1px;" @tap="startStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">上车点</view>
					<view style="display: flex;align-items: center;">
						<view @tap="startStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{startStation}}</view>
						<image src="../../../../static/ZXGP/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
				<view class="boarding" @tap="endStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<view @tap="endStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{endStation}}</view>
						<image src="../../../../static/ZXGP/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>

			<!-- 乘车人信息 -->
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;">
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-left: 41upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">乘车人信息</view>
				<view style="display: flex;margin-bottom: 35upx;">
					<button @tap="addPassenger('成人')" class="button_1"  style="border: #AAAAAA 1px solid;padding: 0 40rpx;height: 66upx;align-items: center;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加成人/儿童</button>
					<button @tap="pickPassenger" class="button_1" style="border: #AAAAAA 1px solid;width: 150upx;height: 66upx;align-items: center;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">选择</button>
					<button @tap="addPassenger('免童')" class="button_1" style="border: #AAAAAA 1px solid;height: 66upx;align-items: center;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">携带免童</button>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in passengerInfo" :key=index
				 v-model="passengerInfo">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../../../static/ZXGP/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
							</view>
							<view style="height: 100%;">
								<view style="display: flex;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="font-size:32upx ;color: #333333;padding:0;padding-right: 24upx;">{{items.userName}}</text>
									<view style="background:#EBEBEB ; font-size:18upx ;border-radius: 24upx;width: 100upx;height: 37upx;line-height:37upx ;text-align: center;">{{items.userType}}</view>
								</view>
								<view style="display: flex;font-size: 28upx;color:#999999 ;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="margin-right: 20upx;">身份证</text><text>{{items.userCodeNum}}</text>
								</view>
							</view>
						</view>
						<view>
							<image src="../../../../static/ZXGP/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>
				</view>
			</view>

			<!-- 优惠券 -->
			<view class="orderCommonClass" @click="toggleMask" v-if="false">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">优惠券</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">{{couponIndex}}</view>
					<image src="../../../../static/ZXGP/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>

			<!-- 呼出优惠券面板 -->
			<popup type="bottom" ref="popup">
				<view class="discountView">
					<!-- 头部 -->
					<view class="couponTitle">
						<text class="Co_text1">优惠券</text>
						<text class="Co_text2" @click="couponReset">不使用优惠券</text>
					</view>

					<!-- 优惠券列表 -->
					<scroll-view scroll-y="true" class="discountScroll">

						<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @tap="couponEvent">
							<view class="con">
								<view class="left">
									<text class="title">{{item.title}}</text>
									<text class="time">有效期至2019-06-30</text>
								</view>

								<view class="right">
									<text class="price">{{item.price}}</text>
									<text>满{{couponList[index].condition}}可用</text>
								</view>

								<view class="circle l"></view>
								<view class="circle r"></view>
							</view>
							<text class="tips">限新用户使用</text>
						</view>

					</scroll-view>

				</view>
			</popup>

			<!-- 乘车险 -->
			<view class="orderCommonClass" v-if="false">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:30upx ;">{{ticketDetail.insurePrice}}元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="isInsurance===1 ? true : false" @click="insuranceTap"></radio>
				</view>
			</view>

			<!-- 购票须知 -->
			<view class="orderCommonClass" style="margin-bottom: 112rpx;">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">同意购票须知</view>
					<view @tap="checkAttention" style="margin-left: 16upx;color:#19A0FF ; font-size:30upx ;">点击查看须知</view>
				</view>
				<!-- 查看须知popup -->
				<popup ref="popup2" type="center">
					<view class="boxView">
						<view class="titleView">
							<text class="Nb_text1">用户须知</text>
							<text class="Nb_text2 jdticon icon-fork " @click="close(2)"></text>
						</view>
						<scroll-view class="noticeBox" scroll-y="ture">
							<text class="Nb_text4">
								购票
								1. 票价说明：所代售的客运站车票票价与窗口售票保持一致，不加收任何服务费用。暂不提供特殊旅客（包括伤病旅客、残疾旅客、军人、孕妇、婴儿和儿童等）优惠车票的购票服务，如 需购买，建议直接到客运站售票窗口购买。
								2. 预购时间：可以为您提供当天当前时间3小时以后至未来数天内的预购票服务，最大预购天数会根据坐车网业务调整可能有所不同，具体以坐车网售票系统为准。
								3. 取票人信息：取票人的相关个人信息和联系方式将是您取票的重要凭证。提交订单时，请确认您输入的取票人信息正确无误，并保持所填的手机处在通讯畅通状态，以便服务人员能及时与您联系
								。如您所留的电话号码长时间处于无人接听、忙音等状况而使我们的服务人员不能及时联系到您，由此导致的不能及时确认、无法及时出票等问题，我司将不承担任何法律责任。
								4. 支付说明：自成功提交订单起，订单的支付入口有效时间为2分钟，订单的有效时间为2分钟。您需要在提交订单起2分钟内完成操作，逾时则被视作支付不成功，该订单所含车票会被退回系统。
								5. 支付安全：为了确保您的财产安全，在线支付时请务必保管好您个人银行帐号、密码、回单等资料，建议避免在网吧等公共场所进行网银支付等操作。
								6. 车票信息：您购票成功后，系统会自动向您填写的手机号码发送电子票号、取票密码，电子票号、取票密码以及个人信息是您取票时的重要凭证，请妥善保管。
								7. 特价优惠车票：不定期推出特价优惠等购票活动，如选择参与活动的车票进行购买即可享受优惠。
								8. 退票说明：退票将收取相应手续费。
								9. 班次、票价变动：客运联网售票系统所提供班次信息查询及售票服务与客运站售票系统同步，但客运站方（或承运方）在实际发车时仍可能临时取消相应班次或变动发车时间、调整票价、要求补差价或加
								收燃油附加费，出现上述情况请购票乘客尽量与客运站方直接协商解决。坐车网可提供一定协助，但不承诺解决，同时坐车网不承担相应责任。
								10. 特价优惠活动：不定期会推出特价立减返现等优惠活动，如所选的线路刚好有符合优惠条件，可以 享受比窗口更优惠的价格。
								取票
								1. 取票方式： 旅客成功购票后，有自助取票和人工取票两种方式，不同车票支持的取票方式不同 ： 一自助取票，车站有自助取票机的刷身份证或输入订单相关信息自动打印；二人工出票，到乘车站售票
								窗口或咨询服务台出示身份凭证报订单相关信息人工出票。订票后请查看订单详情仔细阅读取票说明，按要求取票。
								订票成功2小时起即可凭身份证和取票密码到发车站珠江通取票机刷身份证或凭密码登录进行取票，建议平峰期提前30分钟，高峰期提前60分钟到站取票。
								
								2. 取票时间规定：
								（1）广州地区：您需要在购票成功2小时后才能到发车站进行取票。
								（2）深圳地区、肇庆地区、珠海地区、茂名地区等等：您在坐车网购票成功后即可到发车站进行取票。
								（3）请在车站营业时间内取票，前往客运站取票时，应把握好取票时间（平常应比发车时间至少提前30分钟以上，节假日应至少提前1小时以上），避免错过班车。如超过发车时间仍未取票，我司不承担责任。
								退改签
								1. 线下退票、改签：统暂不提供网上退改签服务。如需办理请于发车前尽快到发车站换取纸质车票后，凭纸质车票到退改 签窗口按车站规定办理。坐车网部分特价优惠车票不支持退改签服务，请订票时知悉。
								2. 手续费：办理退票改签业务所发生的费用按发车站的规定执行，一般情况，1)退票手续费发车前2小时外按票面10%计收，发车前 2小时内按票面20%计收，2)发车前免费改签一次 ，详细以发车站窗口执行为准。
								注意事项
								1. 信息准确：您需要确保所提交的订单信息准确无误，由于用户原因（包括但不限于错误提供取票人姓名、证件号码、发车时间、 发车班次、手机号码等信息）导致购票错误，我司不承担任何法律责任。
								2. 剩余票数：于售票渠道的多样性，系统所显示的剩余票数可能与实际剩余票数不一致，故系统所显示的剩余票数仅供参考。
								3. 重复支付：当你进行支付后，系统如没有返回电子票号或显示“服务器繁忙”、“支付失败”、“购票失败”、乱码或“查 询不到你的电子票号”等信息提示时，请按以下提示操作：
								请于开始订票后30分钟起通过网站登录“我的订单”查询订单状态， 在没有最终确定购票结果前，切勿重复提交订单。重复提交订单将会导致重购购票，由此所产生的损失将由购票人全部承担。
								如果支付完成后发现支付银行账户扣费成功，但订单显示为“等待支付”状态，是因为银行数据没有即时返回给我们，请在订单有 效期内耐心等候。 如旅客没有确定购票结果，从而没有去发车站取票乘车，由此所产生的损失将由旅客本人全部承担。
								核实票款和订单状态请随时联系坐车网 票务服务中心 4008-802-805（8:30-20:30）
								4. 短信下发超时或失败：用户在购票成功后，会通过短信将班次信息、电子票号、取票密码等内容发送至所填写的手机号码中。但该短信不作为成功订票的凭证，如果购票成功后超过20分钟没有收到通知短信，可能是网络延时而导致，
								请与客服人员联系。
								5. 取票延误或不取票：用户在坐车网购票成功，但没有到发车站取票乘车的，或误期取票导致错过乘车时间的，所造成的损失由用户个人全部承担。
								6. 客户服务范围：客户服务不受理在线或电话的订票退改签服务。
								7. 关于客运实名制须知： 根据中华人民共和国交通运输部《道路旅客运输及客运站管理规定》第三十六条规定“通过网络、电话等方式实名购票的，购票人应当提供真实准确的旅客有效身份证件信息”。
								根据《反恐怖主义法》第二十一条规定长途客运业务经营者、服务提供者，应当对客户身份进行查验。对身份不明或者拒绝身份查验的，不得提供服务。
								请确保所填乘客证件信息准确用于客运进站安检、检票乘车进行查验，若因填写错误导致无法进站乘车责任自负。 我们将依照注册协议相关隐私条款保护您所填证件信息。
							</text>
						</scroll-view>
					</view>
				</popup>

				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;margin-left: 32upx;">
				<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥{{totalPrice}}</text>
				<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light; font-weight: lighter;color: #666666;padding: 0;">共{{passengerNum}}人</text>
			</view>
			<view @tap="reserveTap" class="orderReserve" :class="{tapColor:selectedValue == 1}">立即预定</view>
		</view>
	</view>
</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
	import popup from "@/pages_ZXGP/components/ZXGP/uni-popup/uni-popup.vue";
	export default {
		components: {
			popup
		},
		data() {
			return {
				title: '',
				isNormal: 0, //判断是普通购票还是定制班车:1是普通0是定制
				count: 1,
				startStation: '', //定制班车上车点
				endStation: '', //定制班车下车点
				indexArray: [], //下标数组
				startStaionIndex: '',
				endStationIndex: '',
				passengerInfo: [], //乘车人数组
				couponList: [{
					couponID: '0',
					title: '新用户专享优惠券',
					price: 5,
					condition: 10,
				}],
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID，大于等于0触发价格判断事件
				selectedValue: 0, //同意须知的选中值
				couponCondition: '', //优惠券的满足条件值
				isInsurance: 1, //默认选择乘车险
				maskState: 0, //优惠券面板显示状态
				ticketDetail: [], //车票详情数据
				totalPrice: 0, //车票总价格
				passengerNum: 0, //乘车人数量
				shuttleType: '', //班车类型'定制班车''普通班车'
				sepecialStartArray: [], //定制班车起点数组
				specialEndArray: [], //定制班车终点数组
				ScheduleID: '', //线路ID
				specialTicketArray:[],
				startEndStation:'',//上下车点拼接
				oneTicketPrice:'',//车票单价
				PriceID:'',//票价ID
				adultNum:0,//成人数
			}
		},

		onLoad(e) {
			var that = this;
			//给车票类型赋值，0：普通购票，不显示上下车点选择 1:定制班车，显示上下车点选择
			that.startStation = '', //定制班车上车点
			that.endStation = '', //定制班车下车点
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			//---------------------读取订单数据-----------------
			uni.getStorage({
				key: 'specialTicketDate',
				success: function(data) {
					that.ticketDetail = data.data; //车票数组
					that.totalPrice = data.data.FullPrice; //价格
					that.ScheduleID = data.data.ScheduleID;
					//拼接上下车点
					that.startEndStation = data.data.StartSiteName + '-' + data.data.EndSiteName;
					//定制班车起点数组
					that.sepecialStartArray = data.data.LineViaSiteName.split(',');
					//定制班车终点数组
					that.specialEndArray = data.data.LineViaSiteName.split(',');
					that.getPriceForm(that.ScheduleID);
				}
			})
		},
		onShow() {
			//读取乘车人信息
			this.userData();
			this.getStationData();
		},
		onReady() {

		},
		onUnload() {
			uni.removeStorage({
				key: 'specialTicketDate',
				success: function(res) {
					console.log('success');
				}
			});
			uni.removeStorage({
				key: 'specialBusStationList',
				success: function(res) {
					console.log('success');
				}
			})
		},
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData() {
				var that = this;
				uni.getStorage({
					key: 'passengerList',
					success: (res) => {
						that.passengerInfo = res.data;
						that.calculateTotalPrice();
					}
				});
			},
			getStationData() {
				var that = this;
				//-------------------------------读取上下车点缓存-------------------------------
				uni.getStorage({
					key: 'specialBusStationList',
					success: (res) => {
						that.startStation = res.data.startStation;
						that.startStaionIndex = res.data.startStationIndex;
						that.endStation = res.data.endStation;
						that.endStationIndex = res.data.endStationIndex;
						//拼接上下车点
						that.startEndStation = res.data.startStation + '-' + res.data.endStation;
						if(that.specialTicketArray) {
							for(let i = 0; i < that.specialTicketArray.length;i++) {
								let station = that.specialTicketArray[i].station;
								if(that.startEndStation == station) {
									that.oneTicketPrice = that.specialTicketArray[i].FullPrice
									that.PriceID = that.specialTicketArray[i].PriceID
									that.calculateTotalPrice();
								}
							}
						}
						if (that.startStation == '') {
							that.startStation = "请选择上车点"
						}
						if (that.endStation == '') {
							that.endStation = "请选择下车点"
						}
					},
					fail: () => {
						that.startStation = "请选择上车点"
						that.endStation = "请选择下车点"
					}
				})
			},
			//-------------------------------请求T形价格表-------------------------------
			getPriceForm:function(ScheduleID){
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Cs_GetPriceByScheduleAID.Url,
					method:$KyInterface.KyInterface.Cs_GetPriceByScheduleAID.method,
					header:$KyInterface.KyInterface.Cs_GetPriceByScheduleAID.header,
					data:{
						executeScheduleID:that.ScheduleID
					},
					success(res) {
						if(res.data.Successed == true){
							for(let i = 0; i < res.data.ScheduleForSell.length;i++){
								var array = {
									station:res.data.ScheduleForSell[i].StartSiteName + '-' +res.data.ScheduleForSell[i].EndSiteName,
									FullPrice:res.data.ScheduleForSell[i].FullPrice,
									RuleDesc:res.data.ScheduleForSell[i].RuleDesc,
									PriceID:res.data.ScheduleForSell[i].PriceID,
								}
								let station = res.data.ScheduleForSell[i].StartSiteName + '-' +res.data.ScheduleForSell[i].EndSiteName;
								if(that.startEndStation == station) {
									that.totalPrice = res.data.ScheduleForSell[i].FullPrice
									that.oneTicketPrice = res.data.ScheduleForSell[i].FullPrice
									that.PriceID = res.data.ScheduleForSell[i].PriceID
								}
								that.specialTicketArray.push(array)
							}
							//计算价格
							that.calculateTotalPrice();
						}
					},
					fail(res) {
						uni.showToast({
							title:'网络错误',
							icon:'none'
						})
					}
				})
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if (date) {
					var setTime = date.replace('T', ' ');
					return setTime;
				}
			},
			//-------------------------------点击定制班车上车点-----------------------------
			startStationTap() {
				var that = this;
				var stationArray = {
					startStaionIndex: that.startStaionIndex,
					endStationIndex: that.endStationIndex,
					specialStartArray: that.sepecialStartArray,
					specialEndArray: that.specialEndArray
				}
				//跳转到选择上车点页面
				uni.navigateTo({
					url: '../stationPicker/specialBusStationPicker?stationArray=' + JSON.stringify(stationArray)
				})
			},
			//-------------------------------点击定制班车下车点-----------------------------
			endStationTap() {
				var that = this;
				var stationArray = {
					startStaionIndex: that.startStaionIndex,
					endStationIndex: that.endStationIndex,
					specialStartArray: that.sepecialStartArray,
					specialEndArray: that.specialEndArray
				}
				//跳转到选择下车点页面
				uni.navigateTo({
					url: '../stationPicker/specialBusStationPicker?stationArray=' + JSON.stringify(stationArray)
				})
			},
			//-------------------------------删除乘车人-----------------------------
			deleteInfo(e) {
				this.passengerInfo.splice(e, 1)
				this.passengerNum--
				this.calculateTotalPrice();
				if (this.passengerNum == 0) {
					this.totalPrice = 0;
				}
				uni.setStorage({
					key: "passengerList",
					data: this.passengerInfo,
				})
			},
			//-------------------------------显示优惠券面板-----------------------------
			toggleMask() {
				this.$refs.popup.open();
			},
			//-------------------------------优惠券赋值-----------------------------
			couponEvent() {
			},
			//-------------------------------取消优惠券-----------------------------
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.$refs.popup.close()
				// this.numberChange();
				// this.toggleMask();
			},
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
			//-------------------------------选择保险-----------------------------
			insuranceTap: function() {
				if (this.isInsurance == 0) {
					this.isInsurance = 1;
					this.calculateTotalPrice();
				} else {
					this.isInsurance = 0;
					this.calculateTotalPrice();
				}
			},
			//-------------------------------查看须知-----------------------------
			checkAttention() {
				this.$refs.popup2.open()
			},
			close(e) {
				this.$refs.popup2.close()
			},
			//-------------------------------跳转到地图标点-----------------------------
			checkLocation() {
				var that = this;
				if (that.ticketDetail.starSiteArr && that.ticketDetail.endSiteArr) {
					if (this.ticketDetail.starSiteArr.length <= 2 && this.ticketDetail.endSiteArr.length <= 2) { //普通班车
						uni.navigateTo({
							url: '../MapMark/traditionCarMark?traditionArray=' + JSON.stringify(this.ticketDetail)
						})
					} else if (this.ticketDetail.starSiteArr.length > 2 || this.ticketDetail.endSiteArr.length > 2) { //定制班车
						uni.navigateTo({
							url: '../MapMark/specialMark?specialArray=' + JSON.stringify(this.ticketDetail)
						})
					}
				}
			},
			//-------------------------------选择乘客-----------------------------
			pickPassenger() {
				uni.getStorage({
					key: 'userInfo',
					fail() {
						uni.showToast({
							icon: 'none',
							title: '未登录无法选择乘车人,请先登录'
						})
						//#ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								//loginType=1,泉运登录界面
								//loginType=2,今点通登录界面
								//loginType=3,武夷股份登录界面
								url: '../../../../../pages/GRZX/userLogin?loginType=1',
							})
						}, 500);
						// #endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url:'/pages/Home/wxAuthorize',
						})
						// #endif
					},
					success() {
						//跳转到选择乘客页面
						uni.navigateTo({
							url: '../../../../../pages/GRZX/passengerInfo?submitType=1',
						})
					}
				})
			},
			//点击添加乘客
			addPassenger(param) {
				uni.getStorage({
					key: 'userInfo',
					fail() {
						uni.showToast({
							icon: 'none',
							title: '未登录无法添加乘车人,请先登录'
						})
						//#ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								//loginType=1,泉运登录界面
								//loginType=2,今点通登录界面
								//loginType=3,武夷股份登录界面
								url: '../../../../../pages/GRZX/userLogin?loginType=1'
							})
						}, 500);
						// #endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url:'/pages/Home/wxAuthorize',
						})
						// #endif
					},
					success() {
						//跳转到添加乘客页面
						if(param == '成人'){
							uni.navigateTo({
								url: '../../../../../pages/GRZX/addPassenger?type=add',
							})
						}else if(param == '免童'){
							uni.navigateTo({
								url: '../../../../../pages/GRZX/addFreeChildren?type=add',
							})
						}
					}
				})

			},
			//-------------------------------计算总价格-----------------------------
			calculateTotalPrice() {
				var that = this;
				//儿童票数量
				let childNum = 0;
				//成年票数量
				let adultNum = 0;
				//清空乘车人
				that.passengerNum = 0;
				//儿童数组
				let childArray = [];
				//成年数组
				let adultArray = [];
				//车票单价
				let price = that.oneTicketPrice;
				console.log(that.passengerInfo)
				//查看乘车人个数
				if (that.passengerInfo.length > 0) {
					for (var i = 0; i < that.passengerInfo.length; i++) {
						that.passengerNum++;
						//把儿童票筛选出来
						if (that.passengerInfo[i].userType == '半票儿童') {
							//将儿童票加入数组
							childArray.push(that.passengerInfo[i]);
							childNum++;
							
						} else if(that.passengerInfo[i].userType == '成人'){
							//将成人票加入数组
							adultArray.push(that.passengerInfo[i]);
							adultNum++;
							that.adultNum = adultNum;
						}
					}
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(price) * childNum
				} else {
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(price) * childNum
				}
			},

			//-------------------------------点击订单预定-----------------------------
			reserveTap() {
				var that = this;
				//当选中用户须知且选择了上下车点和乘客之后发送请求
				if (that.startStation == '请选择上车点' && that.endStation == '请选择下车点') {
					uni.showModal({
						title: '友情提示',
						content: '未选择上下车点，请选择上下车点',
					})
				} else if (that.passengerInfo.length == 0) {
					uni.showToast({
						title: '请选择乘车人',
						icon: 'none'
					})
				} else if (that.adultNum == 0) {
					uni.showToast({
						title: '免童/儿童不可单独购票',
						icon: 'none'
					})
				}else if (that.selectedValue == 0) {
					uni.showToast({
						title: '请同意购买须知',
						icon: 'none'
					})
				} else {
					that.jumpTo();
				}
			},
			//-----------------------------跳转-----------------------------
			jumpTo() {
				var that = this;
				//计算价格
				that.calculateTotalPrice();
				//请求成功之后跳转到支付页面
				var array = {
					totalPrice: that.totalPrice,
					priceAID: that.PriceID,
					startStation: that.ticketDetail.StartSiteName,
					endStation: that.ticketDetail.EndSiteName,
					pickerStartStation: that.startStation,
					pickerEndStation: that.endStation,
					date: that.ticketDetail.SetoutTime,
					oneTicketPrice: that.oneTicketPrice
				}
				uni.navigateTo({
					url:'../specialBusOrderPayment/specialBusOrderPayment?array=' + JSON.stringify(array)
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		width: 100%;
		height: 140upx;
		background: #FC4646;
	}

	//订单提交通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	// 上下车点选择
	.stationContentView {
		flex-direction: column;
		background: #FFFFFF;
		margin: 0 26upx;
		margin-bottom: 20upx;
		border-radius: 14upx;
	}

	/* 优惠券面板 */
	.discountView {
		min-height: 30vh;
		max-height: 70vh;
		width: 100%;
		background: #f3f3f3;
		margin-bottom: 100rpx;
	}

	//优惠券
	.discountScroll {
		min-height: 30vh;
		max-height: 60vh;
		width: 100%;
	}

	//下弹框标题
	.couponTitle {
		padding: 40upx;
		padding-bottom: 16upx;

		.Co_text1 {
			font-size: 38upx;
			font-weight: bold;
		}

		.Co_text2 {
			margin-top: 8upx;
			float: right;
			color: #f85e52;
			font-size: 28upx;
		}
	}

	//须知弹框
	.boxView {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;

		.titleView {
			margin: 24upx 0;

			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text2 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox {
			min-height: 30vh;
			max-height: 70vh;
			line-height: 32upx;

			.Nb_text3 {
				display: block;
				margin-top: 32upx;
				font-size: 34upx;
				font-weight: bold;
			}

			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}

	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		bottom: 100rpx;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: #f85e52;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: #999999;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999999;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: #f85e52;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: #999999;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}

	.ticketInfoClass {
		width: 652upx;
		text-align: left;
		padding-left: 29upx;
		padding-right: 29upx;
		padding-top: 28upx;
	}

	.ticketContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.textCLass {
		font-family: MicrosoftYaHei;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 10upx;
	}

	.passengerInfoDetail {
		border-bottom: 1upx solid #DADADA;
		margin-left: 33upx;
		margin-right: 33upx;
		//position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//取票电话、优惠券、购买乘车险通用块
	.commonClass {
		margin-top: 10upx;
		margin-bottom: 10upx;
		width: 100%;
		height: 110upx;
		padding-left: 31upx;
		padding-right: 31upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.toPayClass {
		width: 100%;
		height: 112upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		z-index: 1010;
		background: #FFFFFF;
		justify-content: space-between;
	}



	//上下车点
	.boarding {
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 41upx;
		margin-right: 41upx;
	}

	.Mp_box {
		float: right;
		position: relative;
		bottom: 6upx;
		right: -12upx;
	}

	//预定
	.orderReserve {
		width: 45%;
		height: 112upx;
		color: #FFFFFF;
		background: #aaa;
		font-size: 32upx;
		line-height: 112upx;
		text-align: center;

		&.tapColor {
			background: #FC4646;
		}
	}
	.button_1::after {
		border: none;
	}
</style>
