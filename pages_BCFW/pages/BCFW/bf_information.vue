<template>
	<view class="ci_view">
		<view class="ci_titleView">
		</view>
		<view class="ci_setOutContent">
		<!-- 出发信息 -->
		<view class="cvt_content" :hidden="isNormal==1">
			<view class="ct_departureContents1">
				<view class="ct_content1">目的地 &nbsp;<text class="ct_content2">{{privateSite}}</text></view>
				<view class="ct_content3">上车点 &nbsp;<text class="ct_content4">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</text></view>
			</view>
			<view class="ct_departureContents2">
				<view class="ct_content5" style="padding-bottom: 40upx;">出发时间 &nbsp;<text class="ct_content6">{{datestring}}</text></view>
			</view>
		</view>
		
		<view class="cvt_content" :hidden="isNormal==0">
			<view class="ct_departureContents1">
				<view class="ct_content1">上车点 &nbsp;<text class="ct_content2">{{initialPoint}}</text></view>
				<view class="ct_content3">目的地 &nbsp;<text class="ct_content4">{{destination}}</text></view>
			</view>
			<view class="ct_departureContents2">
				<view class="ct_content9">出发时间 &nbsp;<text class="ct_content10">{{datestring}}</text></view>
			</view>
			<view class="ct_departureContents2" style="padding-bottom: 40upx;">
				<view class="ct_content7">包车天数 &nbsp;<text class="ct_content8">{{dayContentObject}}天</text></view>
			</view>
		</view>
			
			<!-- 车型信息 -->
			<view class="ci_carModelView">
				<view class="cmv_selected">已选车型</view>
				<view class="cmv_car">
					<image class="cmv_car2" :src="car"></image>
				</view>
				<view class="cmv_carName">{{carName}}</view>
				<view style="display: flex;">
					<view class="cmv_carType">{{carNumberSeats}}</view>
					<view class="cmv_carMoney">{{carprice}}元</view>
				</view>

			</view>
			
			<!-- 包车人信息 -->
			<view class="ci_charteredBusView">
				<view class="cmv_selected">包车人信息</view>
				<view class="cbv_explain">仅需填写一人信息，填写后自动保存至通讯录</view>
				<view style="display: flex;">
					<view class="cbv_tripMan">出行人</view>
					<input placeholder="请输入姓名" class="cbv_name" name="nickName" maxlength="4" v-model="nickName" />
					<image class="cbv_addressBook" src="../../static/BCFW/choice/tongxun.png" @click="choiceUser(1)"></image>
				</view>
				<view style="display: flex;">
					<view class="cbv_idCord">身份证</view>
					<input placeholder="请输入身份证件号" class="cbv_id" name="nickeId" type="idcard" maxlength="18" v-model="nickId" />
				</view>
				<view style="display: flex;">
					<view class="cbv_mobile">联系电话</view>
					<input placeholder="常用手机号" class="cbv_phone" name="nickPhone" type="number" maxlength="11" v-model="nickPhone" />
				</view>
			</view>
			
			<!-- <view class="ci_couponView" @click="toggleMask('show')">
				<view class="cv_coupon">优惠券</view>
				<view class="cv_noUsable">无可用</view>
				<view class="cv_symbol">></view>
			</view> -->
			<!-- 呼出优惠券面板 -->
			<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
				<view class="mask-content" @click.stop.prevent="stopPrevent">
					<!-- 优惠券页面，仿mt -->
					<view class="couponTitle">
						<view class="Co_text1">优惠券</view>
						<view class="Co_text2" @click="couponReset">不使用优惠券</view>
					</view>
			
					<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="couponEvent(index)">
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
				</view>
			</view>
			
			<!-- 包车须知 -->
			<view class="ci_noticeView">
				<view class="nv_charteredBusNotice">包车须知</view>
				<view class="nv_all" @click="open()">点击查看全部</view>
				<radio class="nv_radio" value="1" :color="'#ffaa7f'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
			</view>
			
			<!-- 须知弹窗 -->
			<uni-popup ref="popup2" type="bottom">
				<view class="boxVlew">
					<view class="titleView">
						<text class="Nb_text1">包车须知</text>
						<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
					</view>
					<scroll-view class="noticeBox" scroll-y="ture">
						<text class="Nb_text4">
							{{charteredBus.security}}
						</text>
					</scroll-view>
				</view>
			</uni-popup>
			<view class="ci_affirmView">
				<text class="av_money">总计￥{{carprice}},预付￥{{advance}}</text>
				<view class="av_atOnceView" enabl :class="{submitColor: selectedValue===1 && nickName!==''}" @click="submitState">
					<text class="aov_atOnce">立即包车</text>
				</view>
			</view>
		</view>
		</view>
		
</template>

<script>
	import uniPopup from "@/pages_BCFW/components/BCFW/uni-popup/uni-popup.vue"
	import $bcfw from "@/common/BCFW/bcfw.js"

	var name;
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				startingContent: 0, //0不显示,1显示
				isNormal: 0, //判断是普通购票还是定制班车:1是普通0是定制
				submissionState: false, //提交状态
				initialPoint: '',
				destination: '',
				datestring: '',
				privateSite: '',
				dayContentObject: '',
				car: '',
				carNumberSeats: '',
				carName: '',
				carprice: '',
				advance:'',
				userInfo: [],
				charteredBus: [],
				nickName: '', //包车人姓名
				nickId: '', //包车人证件号
				nickPhone: '', //包车人联系方式
				userId:'',
				maskState: 0, //优惠券面板显示状态
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID
				couponCondition: '', //优惠券的满足条件值
				admissionTicket: '', //门票内容
				notice: '', //须知内容
				selectedValue: 0, //同意须知的选中值
				st_Longitude: '', //出发地经度
				st_Latitude: '', //出发地纬度
				de_Longitude: '', //目的地经度
				de_Latitude: '', //目的地纬度
				dl_Longitude: '', //专线经度
				dl_Latitude: '', //专线纬度
				couponList: [],
				index:0,
			}
		},
		onLoad() {
			this.getcharteredBus();
			this.getuser();
			this.remove();
		},
		onShow() {
			this.readData();
			this.getSt();
			this.getuser();
		},

		methods: {
			//获取模拟数据
			async getcharteredBus() {
				let charteredBus = await this.$api.bcfwzyx('charteredBus');
				this.charteredBus = charteredBus.data;
				console.log(this.charteredBus)
			},
			getuser:function(){
				var that=this;
				if(that.index == 0){
					uni.getStorage({
						key:"charteredBusInfo",
						success:(res)=>{
							that.nickName = res.data.nickName;
							that.nickId = res.data.nickId;
							that.nickPhone = res.data.nickPhone;
						}
					})
					
				}else{
					uni.getStorage({
						key: 'passengerList',
						success: (res) => {
							that.nickName = res.data[0].userName;
							that.nickId = res.data[0].userCodeNum;
							that.nickPhone = res.data[0].userPhoneNum;
							that.userId=res.data[0].userId;
						}
					})
				}			
			},
			remove:function(){
				uni.removeStorage({
				    key: 'passengerList',
				    success: function (res) {
				    }
				});
			},
			// getcharteredBus(){
			// 	uni.request({
			// 		url:'http://111.231.109.113:8004/api/Chartered/GetVehicleType_Passenger',
			// 		method:'POST',
			// 		header:{'content-type':'application/x-www-form-urlencoded'},
			// 		data:{
			// 			systemName:'泉运公司综合出行'
			// 		},
			// 		success: (res) => {
			// 			console.log(res)
			// 			let that = this;
			// 			// console.log(res.data);
			// 		},
			// 		fail(res) {
			// 		}
			// 	})
			// }
			readData: function() {
				uni.getStorage({
					key: 'homePageInfo',
					success: (res) => {
						this.addressContent = res.data;
						// console.log(res)

					}
				}, 500)
			},
			getSt: function() {
				var that=this;
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
								url: '../../../pages/GRZX/userLogin?loginType=1'
							})
						}, 500);
						// #endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url:'/pages/Home/wxAuthorize',
						})
						// #endif
					},
					success: () => {
						var a='';
						var rate=0.1;
						uni.getStorage({
							
							key: 'homePageInfo',
							success: (res) => {
								that.privateSite = res.data.ct_EndAddress;
								that.initialPoint = res.data.initialPoint;
								that.destination = res.data.destination;
								that.datestring = res.data.datestring;
								that.dayContentObject = res.data.dayContentObject;
								that.st_Longitude=res.data.st_Longitude;
								that.st_Latitude=res.data.st_Latitude;
								that.de_Longitude=res.data.de_Longitude;
								that.de_Latitude=res.data.de_Latitude;
								that.dl_Longitude=res.data.dl_Longitude;
								that.dl_Latitude=res.data.dl_Latitude;
								that.isNormal=res.data.isNormal;
								// console.log(res.data);
								// console.log(that.de_Longitude);
							}
						});
						uni.getStorage({
							key: 'vehicleInformation',
							success: (res) => {
								this.car = res.data.cvt_carImage;
								this.carNumberSeats = res.data.cvt_carNumberSeats;
								this.carName = res.data.cvt_Name;	
								this.carprice = res.data.cvt_carprice;
								this.advance=(parseFloat(this.carprice)*parseFloat(rate)).toFixed(2);
							}
						});
						uni.getStorage({
							key: 'userInfo',
							success: (res) => {
								this.userId=res.data.userId;
								console.log(res.data);
							}
						})
					}
				})
			},

			//查看是否登入
			choiceUser: function(e) {
				if (e == 0) {
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
									url: '../../../pages/GRZX/userLogin?loginType=2'
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
							uni.navigateTo({
								url: '../../../pages/GRZX/addPassenger?type=add',
							})
						}
					})
				} else if (e == 1) {
					this.index = 1;
					uni.navigateTo({
						url: '../../../pages/GRZX/passengerInfo?submitType=2&&limitNum=1',
					});
				}
			},



			//打开弹窗
			open() {
				this.$refs.popup2.open()
			},
			close() {
				this.$refs.popup2.close()
			},

			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},

			//优惠券赋值
			couponEvent: function(index) {
				if (this.actualPayment >= this.couponList[index].condition) {
					this.couponIndex = '-' + this.couponList[index].price;
					this.couponColor = this.couponList[index].couponID;
					this.couponCondition = this.couponList[index].condition;
					this.numberChange();
					this.toggleMask();
				} else {
					uni.showToast({
						title: '您的实付款未达到条件，请重新选择',
						icon: 'none'
					})
				}

			},

			//取消优惠券
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.numberChange();
				this.toggleMask();
			},

			//仿穿透事件
			stopPrevent() {},

			//数量+计价
			numberChange() {
				const a = (this.admissionTicket.ticketAdultPrice * this.adultIndex) + (this.admissionTicket.ticketChildPrice * this
					.childrenIndex);
				if (this.couponColor == '') {
					this.actualPayment = a;
				} else if (a >= this.couponCondition) {
					var total = a - this.couponList[this.couponColor].price;
					this.actualPayment = total;
				} else if (a < this.couponCondition) {
					uni.showToast({
						title: '您的金额不满足优惠券条件，已取消优惠券',
						icon: 'none',
						duration: 2000
					})
					this.couponIndex = '请选择优惠券';
					this.couponColor = '';
					this.couponCondition = 0;
					this.actualPayment = a;
				}
			},
			//提交按钮状态赋值
			submitState: function() {
				var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var that=this;
				//这边还得加上是否选择人数和勾选同意的判断
				if (this.selectedValue == 1 && this.nickName !== '') {

					if (this.submissionState == false) {
						this.submissionState = true;
						this.submit();
					} else if (this.submissionState == true) {
						uni.showToast({
							title: '请勿重复点击提交',
							icon: 'none',
							duration: 2000
						})
					}

				} else if (this.nickName == '') {
					uni.showToast({
						title: '请添加包车人信息', 
						icon: 'none'
					})
				}else if(!regIdNo.test(that.nickId)){
					uni.showToast({
						icon:'none',
						title:'输入的身份证有误，请检查'
					})
				}else if(that.nickPhone.length!=11){
					uni.showToast({
						icon:'none',
						title:'输入的手机号有误，请检查'
					})
				}else {
					uni.showToast({
						title: '请同意包车须知',
						icon: 'none'
					})
				}
			},
			descInput:function(e){
				this.nickId=e.detail.value;
			},

			//提交表单
			// submit: function() {
			// 	var that=this;
			// 	that.index =0;
			// 	uni.setStorage({
			// 		key: 'charteredBusInfo',
			// 		data:{nickName:that.nickName,
			// 		      nickId:that.nickId,
			// 		      nickPhone:that.nickPhone,
			// 		},
			// 	})
			// 	uni.showLoading({
			// 		title: '提交订单中...'
			// 	})
			// 	uni.getStorage({
			// 		key: 'userInfo',
			// 		success: (res) => {
			// 			this.userInfo = res.data;
			// 		}
			// 	})
			// 	uni.request({
			// 		url: $bcfw.Interface.spt_RequestTicketsList.value,
			// 		method: $bcfw.Interface.spt_RequestTickets.method,
			// 		data: {
			// 			userId: this.userId,
			// 		},
			// 		success: (res) => {
			// 			console.log(res)
			// 			var a = '';
			// 			if (res.data.msg == '订单查询完成') {
			// 				a = res.data.data.filter(item => {
			// 					return item.or_Type == 0;
			// 				})
			// 			}
			// 			if (a == '') {
			// 				if(that.isNormal===0){
			// 					that.destination=that.privateSite;
								
			// 				}
							 
							
			// 				// #ifdef H5
			// 				uni.request({
			// 					url: $bcfw.Interface.spt_AddtouristOrder.value,
			// 					method:$bcfw.Interface.spt_AddtouristOrder.method,
			// 					data: {
			// 						userId: that.userId,
			// 						privateSite:that.privateSite, //专线目的地
			// 						datestring:that.datestring, //选择时间
			// 						or_boardingPoint:that.initialPoint,
			// 						or_destination:that.destination,
			// 						cm_day: that.dayContentObject,
			// 						carNumberSeats:that.carNumberSeats,
			// 						carName: that.carName,
			// 						carprice:that.carprice,
			// 						nickName:that.nickName,
			// 						nickId:that.nickId,
			// 						nickPhone: that.nickPhone,								
			// 						couponID:that.couponColor,
			// 						st_Longitude:that.st_Longitude,
			// 						st_Latitude:that.st_Latitude,
			// 						de_Longitude:that.de_Longitude,
			// 						de_Latitude:that.de_Latitude,
			// 						dl_Longitude:that.dl_Longitude,
			// 						dl_Latitude:that.dl_Latitude,
			// 						isNormal:that.isNormal,								
			// 					},


			// 					//向服务器发送订单数据，返回订单编号
			// 					success: (res) => {
			// 						console.log(res)
			// 						uni.hideLoading()
			// 						if (res.data.status) {
			// 							uni.redirectTo({
			// 								url: './BCsuccessfulPayment'
			// 							})
			// 						}
			// 					},
			// 					fail:(res)=>{
			// 						console.log('shibai')
			// 					}
			// 				})
			// 				// #endif

			// 				// #ifdef APP-PLUS
							
			// 				uni.request({
			// 					url: $bcfw.Interface.spt_AddtouristOrder.value,
			// 					method:$bcfw.Interface.spt_AddtouristOrder.method,
			// 					data: {
			// 						userId: that.userId,
			// 						privateSite:that.privateSite, //专线目的地
			// 						datestring:that.datestring, //选择时间
			// 						or_boardingPoint:that.initialPoint,
			// 						or_destination:that.destination,
			// 						cm_day: that.dayContentObject,
			// 						carNumberSeats:that.carNumberSeats,
			// 						carName: that.carName,
			// 						carprice:that.carprice,
			// 						nickName:that.nickName,
			// 						nickId:that.nickId,
			// 						nickPhone: that.nickPhone,								
			// 						couponID:that.couponColor,
			// 						st_Longitude:that.st_Longitude,
			// 						st_Latitude:that.st_Latitude,
			// 						de_Longitude:that.de_Longitude,
			// 						de_Latitude:that.de_Latitude,
			// 						dl_Longitude:that.dl_Longitude,
			// 						dl_Latitude:that.dl_Latitude,
			// 						isNormal:that.isNormal,
								
			// 					},
			// 					header: {'content-type': 'application/json'},
			// 					success:(res)=>{
			// 						console.log(res)
			// 						uni.hideLoading()
			// 						if (res.data.status) {
			// 							uni.redirectTo({
			// 								url: './BCsuccessfulPayment'
			// 							})
			// 						}
			// 					},
			// 					fail:(res)=>{
			// 						console.log('shibai')
			// 					}
			// 				})
			// 				// #endif
							
			// 				// #ifdef MP-WEIXIN
			// 				console.log(that.userId);
			// 				uni.request({
			// 					url: $bcfw.Interface.spt_AddtouristOrder.value,
			// 					method:$bcfw.Interface.spt_AddtouristOrder.method,
			// 					data: {
			// 						userId: that.userId,
			// 						privateSite:that.privateSite, //专线目的地
			// 						datestring:that.datestring, //选择时间
			// 						or_boardingPoint:that.initialPoint,
			// 						or_destination:that.destination,
			// 						cm_day: that.dayContentObject,
			// 						carNumberSeats:that.carNumberSeats,
			// 						carName: that.carName,
			// 						carprice:that.carprice,
			// 						nickName:that.nickName,
			// 						nickId:that.nickId,
			// 						nickPhone: that.nickPhone,								
			// 						couponID:that.couponColor,
			// 						st_Longitude:that.st_Longitude,
			// 						st_Latitude:that.st_Latitude,
			// 						de_Longitude:that.de_Longitude,
			// 						de_Latitude:that.de_Latitude,
			// 						dl_Longitude:that.dl_Longitude,
			// 						dl_Latitude:that.dl_Latitude,
			// 						isNormal:that.isNormal,
								
			// 					},
			// 					header: {'content-type': 'application/json'},
			// 					success:(res)=>{
			// 						console.log(res)
			// 						uni.hideLoading()
			// 						if (res.data.status) {
			// 							uni.redirectTo({
			// 								url: './BCsuccessfulPayment'
			// 							})
			// 						}
			// 					},
			// 					fail:(res)=>{
			// 						console.log('shibai')
			// 					}
			// 				})
			// 				// #endif


			// 			} else if (a.length > 0) {
			// 				uni.hideLoading()
			// 				uni.showToast({
			// 					title: '订单中，存在待接单订单，请取消后再下单',
			// 					icon: 'none',
			// 					success() {
			// 						setTimeout(function(){
			// 						uni.switchTab({
			// 							url: '../../../pages/order/OrderList'
			// 						})		
			// 						},2000)						
			// 					}
			// 				})
							
			// 			}
			// 		},
			// 		fail: function(ee) {
			// 			console.log(ee)
			// 		}
			// 	})


			// },
			//提交表单
			submit: function() {
				
					var that=this;
						uni.setStorage({
							key: 'charteredBusInfo',
							data:{nickName:that.nickName,
							      nickId:that.nickId,
							      nickPhone:that.nickPhone,
							},
						}),
					uni.showLoading({
						title: '提交订单中...'
					})
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							this.userInfo = res.data;
							console.log(this.userInfo)
						}
					})
					uni.request({
						url: $bcfw.Interface.spt_RequestTicketsList.value,
						method: $bcfw.Interface.spt_RequestTickets.method,
						data: {
							userId: this.userInfo.userId,
						},
						success: (res) => {
							console.log(res)
							var a = '';
							if (res.data.msg == '订单查询完成') {
							a = res.data.data.filter(item => {
								return item.or_Type == 0;
							})
						}
							if (a == '') {
								if(that.isNormal===0){
									that.destination=that.privateSite;
									
								}
								 
								
								// #ifdef H5
								uni.request({
									url: $bcfw.Interface.spt_AddtouristOrder.value,
									method:$bcfw.Interface.spt_AddtouristOrder.method,
									data: {
										userId: that.userId,
										privateSite:that.privateSite, //专线目的地
										datestring:that.datestring, //选择时间
										or_boardingPoint:that.initialPoint,
										or_destination:that.destination,
										cm_day: that.dayContentObject,
										carNumberSeats:that.carNumberSeats,
										carName: that.carName,
										carprice:that.carprice,
										advance:that.advance,
										nickName:that.nickName,
										nickId:that.nickId,
										nickPhone: that.nickPhone,								
										couponID:that.couponColor,
										st_Longitude:that.st_Longitude,
										st_Latitude:that.st_Latitude,
										de_Longitude:that.de_Longitude,
										de_Latitude:that.de_Latitude,
										dl_Longitude:that.dl_Longitude,
										dl_Latitude:that.dl_Latitude,
										isNormal:that.isNormal,								
									},
				
				
									//向服务器发送订单数据，返回订单编号
									success: (res) => {
										console.log(res)
										uni.hideLoading()
										if (res.data.status) {
											uni.redirectTo({
												url: 'charteredBusPayment?or_number=' +JSON.stringify(res.data.data.OrderNumber)+'&&state=0'
											})
										}
									},
									fail:(res)=>{
										console.log('shibai')
									}
								})
								// #endif
				
								// #ifdef APP-PLUS
								uni.request({
									url: $bcfw.Interface.spt_AddtouristOrder.value,
									method:$bcfw.Interface.spt_AddtouristOrder.method,
									data: {
										userId: that.userId,
										privateSite:that.privateSite, //专线目的地
										datestring:that.datestring, //选择时间
										or_boardingPoint:that.initialPoint,
										or_destination:that.destination,
										cm_day: that.dayContentObject,
										carNumberSeats:that.carNumberSeats,
										carName: that.carName,
										carprice:that.carprice,
										advance:that.advance,
										nickName:that.nickName,
										nickId:that.nickId,
										nickPhone: that.nickPhone,								
										couponID:that.couponColor,
										st_Longitude:that.st_Longitude,
										st_Latitude:that.st_Latitude,
										de_Longitude:that.de_Longitude,
										de_Latitude:that.de_Latitude,
										dl_Longitude:that.dl_Longitude,
										dl_Latitude:that.dl_Latitude,
										isNormal:that.isNormal,
									
									},
									header: {'content-type': 'application/json'},
									success:function(res){
										console.log(res)
										uni.hideLoading()
										if (res.data.msg=='订单下单成功') {
											uni.redirectTo({
												url: 'charteredBusPayment?or_number=' +JSON.stringify(res.data.data.OrderNumber)+'&&state=0'
											})
										}else if(res.data.status==false){
											uni.showToast({
												title:'下单失败',
												icon:'none'
											})
										}
									},
									fail:(res)=>{
										console.log('shibai')
									}
								})
								// #endif
								
								// #ifdef MP-WEIXIN
								
								uni.request({
									url: $bcfw.Interface.spt_AddtouristOrder.value,
									method:$bcfw.Interface.spt_AddtouristOrder.method,
									data: {
										userId: that.userId,
										privateSite:that.privateSite, //专线目的地
										datestring:that.datestring, //选择时间
										or_boardingPoint:that.initialPoint,
										or_destination:that.destination,
										cm_day: that.dayContentObject,
										carNumberSeats:that.carNumberSeats,
										carName: that.carName,
										carprice:that.carprice,
										advance:that.advance,
										nickName:that.nickName,
										nickId:that.nickId,
										nickPhone: that.nickPhone,								
										couponID:that.couponColor,
										st_Longitude:that.st_Longitude,
										st_Latitude:that.st_Latitude,
										de_Longitude:that.de_Longitude,
										de_Latitude:that.de_Latitude,
										dl_Longitude:that.dl_Longitude,
										dl_Latitude:that.dl_Latitude,
										isNormal:that.isNormal,
									
									},
									header: {'content-type': 'application/json'},
									success:(res)=>{
										console.log(res)
										uni.hideLoading()
										if (res.data.status) {
											uni.navigateTo({
												url: 'charteredBusPayment?or_number=' +JSON.stringify(res.data.data.OrderNumber)+'&&state=0'
											})
										}
									},
									fail:(res)=>{
										console.log('shibai')
									}
								})
								// #endif
				
				
							} else if (a.length > 0) {
							uni.hideLoading()
							uni.showToast({
								title: '订单中，存在待接单订单，请取消后再下单',
								icon: 'none',
								success() {
									setTimeout(function(){
									uni.switchTab({
										url: '../../../pages/order/OrderList'
									})		
									},2000)						
								}
							})
							
						}
						},
						fail: function(ee) {
							console.log(ee)
						}
					})
				
				
				},


			//同意购买-点击事件
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.ci_view {
		width: 100%;
		height:100%;
	}

	//顶部背景
	.ci_titleView {
		width: 100%;
		height: 253upx;
		background: #FC4646;
		text-align: center;
		position: absolute;
		top: 0;
	}
	.ci_setOutContent{
		position: relative;
		margin-left: 26upx;
		margin-right: 26upx;
		/* #ifdef H5 */
		margin-bottom: 240upx;
		/* #endif */
		/* #ifndef H5 */
		margin-bottom: 135upx;
		/* #endif */
		top: 148upx;
	}
	
	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.ci_setOutContent {
		top: 64upx;
	}
	
	/* #endif */

	//出发内容
	.cvt_content {
		width: 698upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 13px;

		//内容样式
		.ct_departureContents1 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			padding-right: 40upx;

			.ct_content1 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content2 {
					// width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.ct_content3 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 329upx;
				// text-align: right;
				// padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content4 {
					// width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
		
		//内容样式
		.ct_departureContents2 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			// padding-bottom: 40upx;

			.ct_content5 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				// width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content6 {
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.ct_content7 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content8 {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
			.ct_content9 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				// width: 310upx;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				// overflow: hidden;
			
				.ct_content10 {
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
	}
	.cmv_selected {
		position: relative;
		font-size: 36upx;
		color: #333333;
		font-weight: 800;
		padding-top: 29upx;
		padding-left: 41upx;
	}
	
	//包车车型信息
	.ci_carModelView {
		width: 700upx;
		height: 440upx;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 13upx;
		
		.cmv_car{
			height: 226upx;
			width: 226upx;
			padding-top: 34upx;
			padding-left: 228upx;
			// display: block;
			// text-align: center;
			
			.cmv_car2{
				height: 100%;
				width: 100%;
				// margin: auto;
			}
		}
		
		// .cmv_car {
		// 	width: 345upx;
		// 	height: 185upx;
		// 	padding-top: 34upx;
		// 	padding-left: 178upx;
		// 	display: block;
		// 	text-align: center;
		// }

		.cmv_carName {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			padding-left: 300upx;
			display: block;
		}

		.cmv_carType {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			padding-left: 184upx;
		}

		.cmv_carMoney {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			padding-left:57upx;
			
		}
	}

	//包车人信息
	.ci_charteredBusView {
		width: 700upx;
		height: 520upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin-top: 20upx;

		.cbv_explain {
			font-size: 26upx;
			color: #808080;
			font-weight: 300;
			display: block;
			padding-top: 18upx;
			padding-left: 41upx;
		}

		.cbv_tripMan {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			padding-top: 54upx;
			padding-left: 41upx;
		}

		.cbv_name {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			padding-top: 54upx;
			padding-left: 104upx;		
		}

		.cbv_addressBook {
			width: 50upx;
			height: 50upx;
			padding-top: 54upx;
			padding-right:37upx;	
			
		}

		.cbv_idCord {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			padding-top: 74upx;
			padding-left: 41upx;	
		}

		.cbv_id {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			padding-top: 54upx;
			padding-left: 102upx;	
		}

		.cbv_mobile {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			padding-top: 74upx;
			padding-left: 41upx;	
		}

		.cbv_phone {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			padding-top: 74upx;
			padding-left: 73upx;	
		}

	}

	//优惠券信息
	.ci_couponView {
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin-top: 20upx;
		display: flex;

		.cv_coupon {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			padding-top: 35upx;
			padding-left: 41upx;
		}

		.cv_noUsable {
			font-size: 28upx;
			color: #C0C0C0;
			font-weight: 300;
			padding-top: 35upx;
			padding-left: 428upx;
		}

		.cv_symbol {
			font-size: 28upx;
			color: #999999;
			padding-top: 35upx;
			padding-left: 2upx;
		}
	}

	//包车须知信息
	.ci_noticeView {
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin-top: 20upx;
		display: flex;
		
		.nv_charteredBusNotice {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			padding-top: 35upx;
			padding-left: 41upx;
		}

		.nv_all {
			font-size: 26upx;
			color: #19A0FF;
			font-weight: 400;
			padding-top: 35upx;
			padding-left: 20upx;
		}

		.nv_radio {
			color: #FC4646;
			padding-top: 20upx;
			padding-left: 254upx;
		}
	}

	//底部信息
	.ci_affirmView {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.av_money {
			font-size: 26upx;
			color: #FC4646;
			font-weight: 400;
			position: absolute;
			left: 17upx;
			top: 30upx;
		}

		.av_atOnceView {
			width: 310upx;
			height: 90upx;
			background: #FC4B4B;
			position: absolute;
			right: 0upx;
		}

		.aov_atOnce {
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			position: absolute;
			top: 25upx;
			left: 80upx;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: #f85e52;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: #f85e52;
		}

		.people {
			font-size: 28upx;
			margin-left: 24upx;
			color: #999999;
		}

		.submitChange {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			background: #aaa;

			.submit {
				color: #fff;
				font-size: 32upx;
			}

			&.submitColor {
				background: #06B4FD;
			}
		}
	}

	.boxVlew {
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
			height: 800upx;
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

	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */

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


	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

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
</style>
