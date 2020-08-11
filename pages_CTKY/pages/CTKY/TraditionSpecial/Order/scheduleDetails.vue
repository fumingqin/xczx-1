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
						<view class="textCLass" style="font-size: 28upx;color: #333333;">{{turnDate(ticketDetail.setTime)}}出发</view>
						<view class="textCLass" style="font-size: 28upx;color: #FC4646;">全票￥{{ticketDetail.fare}}</view>
					</view>
					<!-- 站点-余票 -->
					<view class="ticketContent">
						<view class="textCLass" style="font-size: 32upx;color: #333333;">{{ticketDetail.lineName}}</view>
						<!-- <view class="textCLass" style="font-size: 32upx;color: #333333;">{{ticketDetail.startStaion}}→
							{{ticketDetail.endStation}}</view> -->
						<view class="textCLass" style="font-size: 28upx;color: #FC4646;">半票￥{{ticketDetail.halfTicket}}</view>
						
					</view>
					<!-- 车型-儿童半价 -->
					<view class="ticketContent">
						<view class="textCLass" style="font-size: 24upx;color: #999999;">{{ticketDetail.carType}}&nbsp;&nbsp;{{ticketDetail.planScheduleCode}}</view>
						<view class="textCLass" style="font-size: 24upx;font-style: SourceHanSansSC-Light; color: #666666;">余{{ticketDetail.remainingVotes}}张</view>
					</view>
				</view>
			</view>

			<!-- 地图标点 -->
			<!-- <view class="orderCommonClass" v-if="true" @click="checkLocation" >
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">地图标点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">查看班次信息</view>
					<image src="../../../../static/ZXGP/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view> -->

			<!-- 查看所有途经点 -->
			<view class="orderCommonClass" @tap="approachPoint">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">查看所有途经点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">{{routeSite.length}}个站点</view>
					<image src="../../../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>

			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<!-- v-if="ticketDetail.shuttleType == '定制班车'" -->
			<view class="stationContentView" v-if="ticketDetail.shuttleType == '普通班车'">
				<view class="boarding" @tap="endStationTap2">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{endStation}}</view>
						<image src="../../../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>

			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<!-- v-if="ticketDetail.shuttleType == '定制班车'" -->
			<view class="stationContentView" v-if="ticketDetail.shuttleType == '定制班车'">
				<view class="boarding" style="border-bottom:#EAEAEA solid 1px;" @tap="startStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">上车点</view>
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{startStation}}</view>
						<image src="../../../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
				<view class="boarding" @tap="endStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{endStation}}</view>
						<image src="../../../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>

			<!-- 乘车人信息 -->
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;">
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-left: 41upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">乘车人信息</view>
				<view style="display: flex;margin-bottom: 35upx;">
					<!-- <button @tap="addPassenger('成人')" class="button_1"  style="border: #AAAAAA 1px solid;padding: 0 40rpx;height: 66upx;align-items: center;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加成人/儿童</button> -->
					<button @tap="pickPassenger" class="button_1" style="border: #AAAAAA 1px solid;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;margin-left: 168upx;margin-right: 22upx;">选择乘客</button>
					<button @tap="addPassenger('免童')" class="button_1" style="border: #AAAAAA 1px solid;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;margin-left: 22upx;">携带免童</button>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in passengerInfo" :key=index
				 v-model="passengerInfo">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../../../static/CTKY/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
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
							<image src="../../../../static/CTKY/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="orderCommonClass" @click="toggleMask" v-if="false">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">优惠券</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">{{couponIndex}}</view>
					<image src="../../../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
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
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:30upx ;">{{InsurePrice}}元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 30upx;color: #2C2D2D;">{{passengerNum}}份</view>
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="isInsurance===1 ? true : false" @click="insuranceTap"></radio>
				</view>
			</view>

			<!-- 购票须知 -->
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">同意购票须知</view>
					<view @tap="checkAttention" style="margin-left: 16upx;color:#19A0FF ; font-size:24upx; margin-top: 6upx;">点击查看须知</view>
				</view>
				<!-- 查看须知popup -->
				<popup ref="popup2" type="bottom">
					<view class="boxView">
						<view class="titleView">
							<text class="Nb_text1">用户须知</text>
							<text class="Nb_text2 jdticon icon-fork " @click="close(2)"></text>
						</view>
						<scroll-view class="noticeBox" scroll-y="ture">
							<rich-text class="Nb_text4" :nodes="way"></rich-text>
						</scroll-view>
					</view>
				</popup>

				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
				</view>
			</view>
			<view style="display: flex;font-size: 24upx;margin:0 46upx;color: #808080;margin-left: 16%;margin-bottom: 50upx;">点击立即预定表示已阅读并同意<view
				 style="font-size: 24upx;color: #01aaef;" @tap="checkAttention"> 《购票须知》</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;margin-left: 32upx;">
				<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥{{totalPrice}}</text>
				<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light; font-weight: lighter;color: #666666;padding: 0;">共{{passengerNum}}人</text>
			</view>
			<view @tap="reserveTap" class="orderReserve" :class="{tapColor:selectedValue == 1}">立即预定</view>
		</view>

		<!-- 查看须知popup -->
		<popup ref="popup3" type="center">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">所有途经点</text>
					<text class="Nb_text4 jdticon icon-fork " @click="close2(3)"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view style="padding-left: 20upx;padding-top: 48upx;" v-for="(item,index) in routeSite" :key="index">
							<image src="../../../../static/CTKY/startDot.png" style="width: 20upx ;height: 20upx;"></image>
							<text class="ti_text">{{item}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</popup>
	</view>
</template>

<script>
	import $Zxgp from "@/common/zxgp.js"
	import $KyInterface from "@/common/Ctky.js"
	import popup from "@/pages_CTKY/components/CTKY/uni-popup/uni-popup.vue";
	export default {
		components: {
			popup
		},
		data() {
			return {
				way: '',
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
				InsurePrice: '0', //保险价格
				adultNum: 0, //成人数
				applyName: '',
				shuttleType: '',
				mainArray: [],
				approachPoint1: '', //终点
				approachPoint2: '', //起点
				routeSite:[],//途径点
				selectRoutePoint:[],//普通班车下车点
				ordinaryBoarding:'',//普通班车上车点
				appName:'',
			}
		},

		onLoad(e) {
			var that = this;
			//加载应用名称
			that.applyName = that.$oSit.Interface.system.applyName;
			that.appName = that.$oSit.Interface.system.appName;
			//给车票类型赋值，0：普通购票，不显示上下车点选择 1:定制班车，显示上下车点选择
			// this.isNormal = e.isNormal;
			that.startStation = '', //定制班车上车点
			that.endStation = '', //定制班车下车点
			console.log(that.endStation)
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			//---------------------读取订单数据-----------------
			uni.getStorage({
				key: 'ticketDate',
				success: function(data) {
					that.ticketDetail = data.data; //车票数组
					that.totalPrice = data.data.fare; //价格
					that.shuttleType = data.data.shuttleType; //班车类型
					//班车起点数组
					that.sepecialStartArray = data.data.starSiteArr;
					//班车终点数组
					that.specialEndArray = data.data.endSiteArr;
					//普通班车的起点数据
					that.ordinaryBoarding = data.data.startStaion;
					//班车类型
					that.shuttleType = data.data.shuttleType;
					//读取保险信息
					that.getExecuteScheduleInfoForSellByID(that.ticketDetail);
					console.log('选择车票的班次数据', that.ticketDetail);
					that.removal(that.ticketDetail);
				}
			})
			
			uni.removeStorage({
				key: 'CTKYStationList',
				success: function(res) {
					console.log('success');
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
				key: 'ticketDate',
				success: function(res) {
					console.log('success');
				}
			});
			uni.removeStorage({
				key: 'CTKYStationList',
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
						//计算价格
						that.calculateTotalPrice();
					}
				});
			},
			getStationData() {
				var that = this;
				//-------------------------------读取上下车点缓存-------------------------------
				uni.getStorage({
					key: 'CTKYStationList',
					success: (res) => {
						console.log(res)
						that.startStation = res.data.startStation;
						that.startStaionIndex = res.data.startStationIndex;
						that.endStation = res.data.endStation;
						that.endStationIndex = res.data.endStationIndex;
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

				uni.request({
					url: $Zxgp.KyInterface.Cs_getByTitle.Url,
					method: $Zxgp.KyInterface.Cs_getByTitle.method,
					data: {
						title: '用户购票须知',
						systemName: this.applyName,
					},
					success: (res) => {
						console.log('用户购票须知', res)
						this.way = res.data.data.msg;
						// console.log('购票须知2',this.way)
					}
				})
				
				// uni.request({
				// 	url: $KyInterface.KyInterface.Ky_getExecuteScheduleInfoForSellByID.Url,
				// 	method: $KyInterface.KyInterface.Ky_getExecuteScheduleInfoForSellByID.method,
				// 	data: {
				// 		systemName: this.applyName,
				// 		scheduleCompanyCode: this.ticketDetail.scheduleCompanyCode,
				// 		ExecuteScheduleID:this.ticketDetail.planScheduleCode,
				// 		StartSiteID:this.startStation,
				// 		EndSiteID:this.endStation,
				// 	},
				// 	success: (res) => {
				// 		console.log('请求价格2', this.ticketDetail.scheduleCompanyCode)
				// 		console.log('请求价格', res)
				// 	}
				// })
			},

			//--------------------------获取保险信息--------------------------
			getExecuteScheduleInfoForSellByID: function(orderInfo) {
				var that = this;
				uni.showLoading({
					title: '加载中...'
				})

				uni.request({
					url: $KyInterface.KyInterface.Ky_getExecuteScheduleInfoForSellByID.Url,
					method: $KyInterface.KyInterface.Ky_getExecuteScheduleInfoForSellByID.method,
					header: $KyInterface.KyInterface.Ky_getExecuteScheduleInfoForSellByID.header,
					data: {
						systemName: $KyInterface.KyInterface.systemName.systemName,
						scheduleCompanyCode: orderInfo.scheduleCompanyCode,
						ExecuteScheduleID: orderInfo.executeScheduleID,
						StartSiteID: orderInfo.startSiteID,
						EndSiteID: orderInfo.endSiteID,
					},
					success(res) {
						uni.hideLoading();
						console.log('保险数据', res);
						var respones = res.data;
						if (respones.Successed == true) {
							that.InsurePrice = respones.ScheduleInfos[0].InsurePrice;
							//计算价格
							that.calculateTotalPrice();
						} else {
							that.InsurePrice = 0;
							//计算价格
							that.calculateTotalPrice();
						}
					},
					fail(res) {
						uni.hideLoading();
						console.log(res);
					}
				})
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if (date) {
					var setTime = date.replace('T', ' ');
					var setTime2 = setTime.substr(0, 16);
					return setTime2;
				}
			},
			//-------------------------------点击定制班车上车点-----------------------------
			startStationTap() {
				var that = this;
				var stationArray = {
					startStaionIndex: that.startStaionIndex,
					endStationIndex: that.endStationIndex,
					specialStartArray: that.sepecialStartArray,
					specialEndArray: that.specialEndArray,
					// specialStartArray: that.approachPoint2,
					// specialEndArray: that.approachPoint1,
					shuttleType: that.shuttleType,
				}
				//跳转到选择上车点页面
				uni.navigateTo({
					url: '../stationPicker/selectStation?stationArray=' + JSON.stringify(stationArray)
				})
			},
			//-------------------------------点击定制班车下车点-----------------------------
			endStationTap() {
				var that = this;
				var stationArray = {
					startStaionIndex: that.startStaionIndex,
					endStationIndex: that.endStationIndex,
					specialStartArray: that.sepecialStartArray,
					specialEndArray: that.specialEndArray,
					// specialStartArray: that.approachPoint2,
					// specialEndArray: that.approachPoint1,
					shuttleType: that.shuttleType,
				}
				//跳转到选择下车点页面
				uni.navigateTo({
					url: '../stationPicker/selectStation?stationArray=' + JSON.stringify(stationArray)
				})
			},
			
			//-------------------------------普通班车下车点-----------------------------
			endStationTap2() {
				var that = this;
				var stationArray = {
					endStationIndex: that.endStationIndex,
					specialEndArray: that.selectRoutePoint,
					specialStartArray: that.ordinaryBoarding,
					shuttleType: that.shuttleType,
				}
				//跳转到选择下车点页面
				uni.navigateTo({
					url: '../stationPicker/selectStation?stationArray=' + JSON.stringify(stationArray)
				})
			},
			
			//-------------------------------删除乘车人-----------------------------
			deleteInfo(e) {
				console.log(e)
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
				console.log('1111111')
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

			approachPoint() {
				this.$refs.popup3.open()
			},

			close2(e) {
				this.$refs.popup3.close()
			},
			//-------------------------------跳转到地图标点-----------------------------
			checkLocation() {
				var that = this;
				uni.navigateTo({
					url: '../MapMark/specialMark?specialArray=' + JSON.stringify(this.ticketDetail)
				})
				// // #ifdef MP-WEIXIN
				// uni.showModal({
				// 	content:'小程序暂不支持地图显示',
				// 	showCancel:false,
				// })
				// // #endif

				// // #ifndef MP-WEIXIN
				// uni.navigateTo({
				// 	url: '../MapMark/specialMark?specialArray=' + JSON.stringify(this.ticketDetail)
				// })
				// // #endif

				// if (that.ticketDetail.starSiteArr && that.ticketDetail.endSiteArr) {
				// 	if (this.ticketDetail.shuttleType == '普通班车') { //普通班车
				// 		uni.navigateTo({
				// 			url: '../MapMark/traditionCarMark?traditionArray=' + JSON.stringify(this.ticketDetail)
				// 		})
				// 	} else if (this.ticketDetail.shuttleType == '定制班车') { //定制班车

				// 	}
				// }
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
						// #ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								//loginType=1,泉运登录界面
								//loginType=2,今点通登录界面
								//loginType=3,武夷股份登录界面
								url: '../../../../../pages/GRZX/userLogin?loginType=1',
							})
						}, 500);
						//#endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/Home/wxAuthorize',
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
							url: '/pages/Home/wxAuthorize',
						})
						// #endif
					},
					success() {
						//跳转到添加乘客页面
						if (param == '成人') {
							uni.navigateTo({
								url: '../../../../../pages/GRZX/addPassenger?type=add',
							})
						} else if (param == '免童') {
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
				let price = that.ticketDetail.fare;
				//半价票单价
				let halfPrice = that.ticketDetail.halfTicket;
				let insurePrice = that.InsurePrice;
				if (that.isInsurance == 0) { //不选择保险
					insurePrice = 0;
				}
				//查看乘车人个数
				if (that.passengerInfo.length > 0) {
					for (var i = 0; i < that.passengerInfo.length; i++) {
						that.passengerNum++;
						//把儿童票筛选出来
						if (that.passengerInfo[i].userType == '半票儿童') {
							//将半价儿童票加入数组
							childArray.push(that.passengerInfo[i]);
							childNum++;
						} else if (that.passengerInfo[i].userType == '成人') {
							//将成人票加入数组
							adultArray.push(that.passengerInfo[i]);
							adultNum++;
							that.adultNum = adultNum;
						}
					}
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + Number(insurePrice) * that.passengerNum
				} else {
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + Number(insurePrice) * that.passengerNum
				}
			},

			//-------------------------------------点击订单预定-----------------------------------
			reserveTap() {
				var that = this;
				// if (that.shuttleType == '普通班车') {
				// 	that.startStation = " "
				// 	that.endStation = " "
				// }
				//当选中用户须知且选择了上下车点和乘客之后发送请求
				if (that.ticketDetail.starSiteArr.length > 2 || that.ticketDetail.endSiteArr.length > 2) {
					if (that.startStation == '请选择上车点' && that.endStation == '请选择下车点') {
						uni.showToast({
							title: '未选择上下车点，请选择上下车点',
							icon: 'none'
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
					} else if (that.selectedValue == 0) {
						uni.showToast({
							title: '请同意购买须知',
							icon: 'none'
						})
					} else {
						that.jumpTo();
					}
				} else {
					if (that.endStation == '请选择下车点') {
						uni.showToast({
							title: '未选择下车点，请选择下车点',
							icon: 'none'
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
					} else if (that.selectedValue == 0) {
						uni.showToast({
							title: '请同意购买须知',
							icon: 'none'
						})
					} else {
						that.jumpTo();
					}
				}
			},
			//-----------------------------------跳转-----------------------------------
			jumpTo() {
				var that = this;
				//计算价格
				that.calculateTotalPrice();
				//请求成功之后跳转到支付页面,传是否选择保险1:选择 0:未选择
				console.log(that.startStation)
				console.log(that.endStation)
				var array = {
					isInsurance: that.isInsurance, //是否选择了保险
					totalPrice: that.totalPrice, //总价格
					shuttleType: that.shuttleType, //班车类型
					getOnPoint: that.startStation, //起点
					getOffPoint: that.endStation, //终点
					insuredPrice: that.InsurePrice, //保险价格
				}
				console.log(array)
				uni.navigateTo({
					url: '../PayMent/orderPayment?array=' + JSON.stringify(array)
				})
			},
			
			//------------------------计算途径点----------------------------------
			removal: function(e) {
				// //****用于本页面的查看所有途径站点****//
				// var arr1 = [];
				// var arr2 = [];
				// //去重
				// var arr1 = e.starSiteArr;
				// var arr2 = e.endSiteArr;
				// arr1.push(...arr2)
				// console.log('去重复', arr1)
				// let arr3 = Array.from(new Set(arr1))
				// for (var i = 0; i < arr3.length; i++) {
				// 	var a = this.mainArray.filter(item => {
				// 		return item == arr3[i].SiteName;
				// 	})
				// 	if (a == '') {
				// 		var SiteName = arr3[i].SiteName
				// 		this.mainArray.push(SiteName);
				// 		// console.log('去重复',this.mainArray)
				// 	}
				// }
				
				// //****途径点去重(用于后期路线规划)****//
				// var approachPoint = [];
				// approachPoint = arr3;
				// for (var i = 0; i < arr3.length; i++) {
				// 	if (arr3[i].SiteName == approachPoint[i].SiteName && arr3[i].Latitude==0 && arr3[i].Longitude==0) {
				// 		arr3.splice(i, 1);
				// 		i = i - 1;
				// 	}
				// }
				// console.log('途径点去重', approachPoint)
				
				// //****用于选择上下车点（approachPoint1是上车点，approachPoint2是下车点）****//
				// var c =[];
				// var obj={};
				// let arr4 = Array.from(new Set(arr1))
				// for(var i =0; i<arr4.length; i++){
				// 	if(!obj[arr4[i].SiteName]){
				// 		c.push(arr4[i])
				// 		obj[arr4[i].SiteName] = true;
				// 	}
				// }
				// console.log('途径点去重2', c)
				// var a = [];
				// a = c.slice();
				// // a = c;
				// this.approachPoint1 = a; //终点
				// // this.approachPoint1.shift();
				// for (var i = 0; i < a.length; i++) {
				// 	if (a[i].SiteName == this.ticketDetail.startStaion) {
				// 		a.splice(i, 1);
				// 		i = i - 1;
				// 	}
				// }
				// var b = [];
				// b = c.slice();
				// // b = c;
				// this.approachPoint2 = b; //起点
				// for (var i = 0; i < b.length; i++) {
				// 	if (b[i].SiteName == this.ticketDetail.endStation) {
				// 		b.splice(i, 1);
				// 		i = i - 1;
				// 	}
				// }
				// // this.approachPoint2.pop();
				// console.log('终点', this.approachPoint1)
				// console.log('起点', this.approachPoint2)
				
				//****途径站点(用于查询所有途径点)****//
				var routeSite = e.lineViaSiteDesc.split(",");
				this.routeSite=routeSite
				console.log('分割', this.routeSite)
				
				//筛选普通班车下车点途径站点
				var d = [];
				d = routeSite.slice();
				// a = c;
				this.selectRoutePoint = d; //终点
				// this.approachPoint1.shift();
				for (var i = 0; i < this.selectRoutePoint.length; i++) {
					if (this.selectRoutePoint[i]== this.ticketDetail.startStaion) {
						this.selectRoutePoint.splice(i, 1);
						i = i - 1;
					}
				}
				console.log('分割下车点',this.selectRoutePoint)
			},
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
		padding: 28upx 29upx;
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
		// z-index: 1010;
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

	//途径点弹框
	.boxView2 {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		border-radius: 20upx;
		z-index: 999;

		.titleView2 {
			margin: 24upx 0;
			text-align: center;
			width: 560upx;

			//弹框标题
			.Nb_text3 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text4 {
				margin-top: 8upx;
				float: right;
				color: #333;
				padding-top: 16upx;
				font-size: 32upx;
			}
		}

		.noticeBox2 {
			line-height: 32upx;
			height: 586upx;

			.tv_title {
				display: block;
				width: 100%;

				.ti_text {
					padding-left: 20upx;
					font-size: 30upx;
				}
			}
		}
	}
</style>
