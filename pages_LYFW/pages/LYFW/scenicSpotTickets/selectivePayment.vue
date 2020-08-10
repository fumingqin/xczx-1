<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view style="color: #FFFFFF; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 24upx;">倒计时：{{countDownDate}}秒</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view style="color: #FFFFFF; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 88upx;">倒计时：{{countDownDate}}秒</view>
		<!-- #endif -->

		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFill"></image>
		</view>

		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{orderInfo.ticketTitle}}</view>
				<text class="MP_text">费用包含：{{orderInfo.ticketContain}}</text>

				<view class="MP_selectionDate">
					<view class="MP_title">使用时间</view>
					<text class="MP_text">{{orderInfo.orderDate}} &nbsp; 仅限当天</text>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">购票人信息</view>
					<view class="MP_userInformation" v-for="(item,index) in orderInfo.addressData" :key="index">
						<text>{{item.userName}}</text>
						<text class="Mp_sex">{{item.userSex}}</text>
						<text class="Mp_square">{{item.userType}}</text>
						<text class="Mp_square" v-if="item.userDefault == 'true'">本人</text>
						<text class="Mp_square" v-if="item.userEmergencyContact == 'true'">紧急联系人</text>
						<text class="Mp_text">身份证：{{(item.userCodeNum.substr(0,6))+'******'+(item.userCodeNum.substr(14,18))}}</text>
						<text class="Mp_text">手机号：{{(item.userPhoneNum.substr(0,3))+'****'+(item.userPhoneNum.substr(7,11))}}</text>
					</view>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">费用详情</view>
					<view class="MP_cost" v-if="adultIndex>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultIndex}}</text>
						<text class="MP_userCost">¥{{priceAccuracy(adultTotalPrice)}}</text>
					</view>

					<view class="MP_cost" v-if="childrenIndex>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenIndex}}</text>
						<text class="MP_userCost">¥{{priceAccuracy(childrenTotalPrice)}}</text>
					</view>

					<!-- 保险 -->
					<view class="MP_cost" v-if="orderInfo.orderInsure==true">
						<text>太平洋门票意外险 经济款</text>
						<text class="MP_number">×{{orderInfo.appUserInfoList.length}}</text>
						<text class="MP_total">¥{{orderInfo.orderInsurePrice}}</text>
					</view>

					<!-- 优惠券 -->
					<view class="MP_cost" v-if="orderInfo.couponPrice>0">
						<text>{{orderInfo.couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo.couponPrice}}</text>
					</view>


					<view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo.orderActualPayment}}</text>
					</view>

				</view>

				<view class="jdticon icon-xia" style="padding: 24upx 0upx; text-align: center; margin-top: 64upx;" @click="hide(0)"
				 :hidden="hiddenValues==1"></view>
				<view class="jdticon icon-shang" style="padding: 24upx 0upx; text-align: center; margin-top: 64upx;" @click="hide(1)"
				 :hidden="hiddenValues==0"></view>

			</view>

			<view class="MP_information2">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-weixinzhifu"></text>
					<text class="Mp_title">微信</text>
					<radio class="Mp_box" :checked="channeIndex===0" :color="'#36cb59'" @click="Selection"></radio>
				</view>
			</view>

			<!-- #ifndef H5 -->
			<!-- <view class="MP_information2">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" :color="'#01aaef'" @click="Selection"></radio>
				</view>
			</view> -->
			<!-- #endif -->


			<view class="MP_information3" @click="paymentSatas">
				支付{{orderInfo.orderActualPayment}}元
			</view>

		</view>

	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				countDownDate: 300, //倒计时时间
				hiddenValues: '0', //隐藏状态值
				channel: [{
					name: '微信'
				}, {
					name: '支付宝'
				}],
				channeIndex: 0, //选择支付方式
				paymentValue: false, //默认未拉起状态

				cancelStatus: false, //取消状态

				orderInfo: [{
					orderNumber: '',
					orderType: '',
					orderActualPayment: '',
					orderDateReminder: '',
					orderDate: '',
					orderCountdown: '',
					orderInsure: '',
					orderInsurePrice: '',

					ticketId: '',
					ticketName: '',
					ticketOpenUp: '',
					ticketTitle: '',
					ticketContain: '',
					ticketAdultPrice: '',
					ticketChildPrice: '',

					couponID: '',
					couponTitle: '',
					couponPrice: '',
					couponCondition: '',

					addressData: [{
						passengerId: '',
						userType: '',
						userName: '',
						userSex: '',
						userCodeNum: '',
						userPhoneNum: '',
						userDefault: '',
						userEmergencyContact: '',
					}]

				}],


				adultIndex: '', //成人数量
				childrenIndex: '', //儿童数量	
				adultTotalPrice: '', //成人总价
				childrenTotalPrice: '', //儿童总价

				submitH5Data: '', //公众号H5支付参数
				userInfo : '',//用户信息

			}
		},
		onLoad: function(options) {
			uni.showLoading({
				title: '拉起订单中...'
			})
			
			//获取用户信息
			this.getUserInfo();
			
			uni.request({
				url:$lyfw.Interface.spt_RequestTicketsListDetail.value,
				method:$lyfw.Interface.spt_RequestTicketsListDetail.method,
				data: {
					orderNumber: options.orderNumber
				},
				header: {
					'content-type': 'application/json'
				},
				success: (res) => {
					// console.log(res)
					this.orderInfo = res.data.data[0];
					// console.log(this.orderInfo)
					this.screenUser();
					this.getDate();
					uni.hideLoading()
				}
			})

			// #ifdef H5
			uni.getStorage({
				key: 'submitH5Data',
				success: function(res) {
					this.submitH5Data = res.data;
				}
			})
			// #endif

		},
		onShow:function(){
			this.retrievePayment()
		},
		methods: {
			//0.3价格取2位精度
			priceAccuracy:function(e){
				const pri = e.toFixed(2);
				return pri;
			},
			
			//获取用户信息
			getUserInfo:function(){
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.userInfo = res.data;
					}
				})
			},
			
			//隐藏操作
			hide(e) {
				if (e == 0) {
					this.hiddenValues = 1;
				} else {
					this.hiddenValues = 0;
				}
			},

			//同意购买-点击事件
			Selection: function() {
				if (this.channeIndex == 0) {
					this.channeIndex = 1;
				} else {
					this.channeIndex = 0;
				}
			},

			//数组提取
			screenUser: function() {
				let adult = this.orderInfo.addressData.filter(item => {
					return item.userType == '成人' || item.userType == '军人' || item.userType == '教师' || item.userType == '学生';
				})
				let children = this.orderInfo.addressData.filter(item => {
					return item.userType == '儿童';
				})

				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
				this.adultTotalPrice = adult.length * this.orderInfo.ticketAdultPrice;
				this.childrenTotalPrice = children.length * this.orderInfo.ticketChildPrice;
			},


			//获取当前时间并格式化
			getDate: function() {
				//先提取订单下单时间把空格转换成T
				var a = this.orderInfo.setOrderTime.replace(' ', 'T')
				//把时间转换成时间戳
				var b = new Date(a).getTime();
				// console.log(a)
				// console.log(b)
				//获取当前时间（为什么要先把当前时间戳格式化？）是因为直接获取当前时间戳存在时间误差
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
				//把转换后的时间，转换成时间戳
				// console.log(timer)
				var c = new Date(timer).getTime();

				// console.log(c)

				//用当前时间-下单时间再除于1000就是秒
				var d = (c - b) / 1000;
				// console.log(d)
				//这里的300秒就是支付倒计时，门票是5分钟
				var e = 307 - d;
				// 46

				this.countDownDate = e;


				if (e <= 0) {
					uni.showToast({
						title: '订单已超时',
						icon: 'none',
						success: ()=>{
							this.countDown()
							uni.switchTab({
								url:'../../../../pages/order/OrderList'
							})
						}
					})

				} else {
					this.countDown();
				}
			},


			//支付倒计时
			countDown: function() {
				uni.hideLoading()
				var interval = setInterval(() => {
					--this.countDownDate;
					uni.setStorage({
						key: 'countDown',
						data: this.countDownDate,
					})
					if (this.countDownDate <= 0) {
						clearInterval(interval)
						this.countDownEnd();
						uni.removeStorage({
							key: 'countDown'
						})
					}
				}, 1000)
			},

			//倒计时结束
			countDownEnd: function() {
				uni.request({
					url:$lyfw.Interface.spt_RequestTicketsListDetail.value,
					method:$lyfw.Interface.spt_RequestTicketsListDetail.method,
					data: {
						orderNumber: this.orderInfo.orderNumber
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						// console.log(res)
						if (res.data.data[0].orderType == '待支付') {
							uni.request({
								url:$lyfw.Interface.spt_CancelTickets.value,
								method:$lyfw.Interface.spt_CancelTickets.method,
								data: {
									orderNumber: res.data.data[0].orderNumber
								},
								header: {
									'content-type': 'application/json'
								},
								success(res) {
									// console.log(res)
									uni.showToast({
										title: '支付超时，已自动取消订单,请刷新订单',
										icon: 'none',
										duration: 2000,
										success: () => {
											uni.switchTab({
												url: '../../../../pages/order/OrderList',
											})
										}
									})

								},
								fail() {
									uni.showToast({
										title: '自动取消失败，请检查网络状态',
										icon: 'none',
										duration: 2000,
										success: function() {
											uni.switchTab({
												url: '../../../../pages/order/OrderList'
											})
										}
									})
								}
							})
						} else {
							return false
						}
					}
				})

			},

			//禁止重复提交操作
			paymentSatas: function() {
				if (this.paymentValue == false) {
					this.paymentValue == true
					this.payment()
				} else if (this.paymentValue == true) {
					uni.showToast({
						title: '请勿重复点击支付',
						icon:'none'
					})
				}
			},

			//调起支付
			payment: function() {
				var that = this;
				uni.showLoading({
					title: '拉起支付中...'
				})
				// 查看服务商
				// uni.getProvider({
				// 	service: 'payment',
				// 	success: function(res) {
				// 		console.log(res)
				// 	}
				// })
				

				// #ifdef MP-WEIXIN
				//--------------------------------------微信小程序支付-------------------------------------
				if (that.channeIndex == 0) {
					if(that.userInfo.openId_xcx){
						uni.request({
							url:$lyfw.Interface.spt_Pay.value,
							method:$lyfw.Interface.spt_Pay.method,
							data: {
								payType: 5,
								openId : that.userInfo.openId_xcx,
								price: that.orderInfo.orderActualPayment,
								orderNumber: that.orderInfo.orderNumber,
								goodsName: that.orderInfo.title,
								billDescript: that.orderInfo.ticketTitle
							},
							header: {'content-type': 'application/json'},
							success: function(res) {
							console.log(res)
							uni.requestPayment({
								// provider: 'wxpay',
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: function(res){
									// console.log(res)
									if(res.errMsg == 'requestPayment:ok'){
										uni.request({
											url:$lyfw.Interface.spt_RequestTickets.value,
											method:$lyfw.Interface.spt_RequestTickets.method,
											data: {
												orderNumber: that.orderInfo.orderNumber
											},
											header: {'content-type': 'application/json'},
											success: function(res) {
												// console.log(res)
												if (res.data.msg == '出票成功') {
													uni.redirectTo({
														url: 'successfulPayment'
													})
												} else {
													uni.showToast({
														title: '出票失败，联系客服出示订单编号',
														icon: 'none',
														duration: 3000
													})
												}
											},
											fail: function() {
												uni.showToast({
													title: '出票失败，请联系客服出示订单编号',
													icon: 'none',
													duration: 3000
												})
											}
										})
									} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
										// alert("您取消了支付，请重新支付");
										uni.showToast({
											title: '您取消了支付，请重新支付',
											icon: 'none'
										})
									} else if (res.err_msg == "get_brand_wcpay_request:faile") {
										// alert("支付失败，请重新支付"); 
										uni.showToast({
											title: '支付失败，请重新支付',
											icon: 'none',
											success: function() {
												uni.switchTab({
													url: '../../../../pages/order/OrderList'
												})
											}
										})
														
									} else {
										// location.href = "/Coach/GetCoach";
									}
														
								},
								fail: function(e) {
									console.log(e)
									uni.showToast({
										title: '拉起支付失败，请查看网络状态',
										icon:'none'
									})
								}
														
							})
							},
							fail: function() {
								uni.showToast({
									title: '请求支付参数失败，请查看网络状态',
									icon:'none'
								})
							}
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							title: '请允许授权给公众号，即将为您返回主页！',
							icon:'none'
						})
						uni.switchTab({
							url:'../../../../pages/Home/zy_zhcx'
						})
					}
					
				} else {
					uni.showToast({
						title: '请选择微信支付',
						icon: 'none'
					})
				}
				// #endif

				// #ifdef H5
				//--------------------------------------微信H5公众号支付-------------------------------------
				if (that.channeIndex == 0) {
					if(that.userInfo.openId_wx){
						uni.request({
							url:$lyfw.Interface.spt_Pay.value,
							method:$lyfw.Interface.spt_Pay.method,
							data: {
								payType: 4,
								price: that.orderInfo.orderActualPayment,
								orderNumber: that.orderInfo.orderNumber,
								goodsName: that.orderInfo.title,
								billDescript: that.orderInfo.ticketTitle,
								openId : that.userInfo.openId_wx,
							},
							success: function(res) {
								// console.log(res)
								WeixinJSBridge.invoke('getBrandWCPayRequest', {
									"appId": res.data.data.appId, //公众号名称，由商户传入
									"timeStamp": res.data.data.timeStamp, //时间戳
									"nonceStr": res.data.data.nonceStr, //随机串
									"package": res.data.data.package, //扩展包
									"signType": 'MD5', //微信签名方式:MD5
									"paySign": res.data.data.paySign, //微信签名
								}, function(res) {
									if (res.err_msg == "get_brand_wcpay_request:ok") {
										uni.request({
											url:$lyfw.Interface.spt_RequestTickets.value,
											method:$lyfw.Interface.spt_RequestTickets.method,
											data: {
												orderNumber: that.orderInfo.orderNumber
											},
											header: {'content-type': 'application/json'},
											success: function(res) {
												// console.log(res)
												if (res.data.msg == '出票成功') {
													uni.redirectTo({
														url: 'successfulPayment'
													})
												} else {
													uni.showToast({
														title: '出票失败，联系客服出示订单编号',
														icon: 'none',
														duration: 3000
													})
												}
											},
											fail: function() {
												uni.showToast({
													title: '出票失败，请联系客服出示订单编号',
													icon: 'none',
													duration: 3000
												})
											}
										})
									} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
										uni.showToast({
											title: '您放弃了支付',
											icon: 'none',
											duration: 3000
										})
									} else if (res.err_msg == "get_brand_wcpay_request:faile") {
										uni.showToast({
											title: '支付失败，请重试',
											icon: 'none',
											duration: 3000
										})
						
									} else {
										uni.showToast({
											title: '网络异常，请检查网络后重试',
											icon: 'none',
											duration: 3000
										})
									}
								});
							},
							fail: function() {
								uni.showToast({
									title: '请求支付参数失败，请联系客服',
									icon:'none'
								})
							}
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							title: '请允许授权给公众号，即将为您返回主页！',
							icon:'none'
						})
						uni.switchTab({
							url:'../../../../pages/Home/zy_zhcx'
						})
					}
					
				} else {
					uni.showToast({
						title: '请选择微信支付',
						icon: 'none'
					})
				}
				// #endif


				// #ifdef APP-PLUS
				//--------------------------------------微信APP支付-------------------------------------
				if (this.channeIndex == 0) {
					uni.request({
						url:$lyfw.Interface.spt_Pay.value,
						method:$lyfw.Interface.spt_Pay.method,
						data: {
							payType: 3,
							price: that.orderInfo.orderActualPayment,
							orderNumber: that.orderInfo.orderNumber,
							goodsName: that.orderInfo.title,
							billDescript: that.orderInfo.ticketTitle
						},
						header: {'content-type': 'application/json'},
						success: function(e) {
							console.log('支付参数',e)
							uni.hideLoading()
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: e.data.data,
								success: function(res) {
									if(res.errMsg == 'requestPayment:ok'){
										uni.request({
											url:$lyfw.Interface.spt_RequestTickets.value,
											method:$lyfw.Interface.spt_RequestTickets.method,
											data: {
												orderNumber: that.orderInfo.orderNumber
											},
											header: {'content-type': 'application/json'},
											success: function(res) {
												// console.log(res)
												if (res.data.msg == '出票成功') {
													uni.redirectTo({
														url: 'successfulPayment'
													})
												} else {
													uni.showToast({
														title: '出票失败，联系客服出示订单编号',
														icon: 'none',
														duration: 3000
													})
												}
											},
											fail: function() {
												uni.showToast({
													title: '出票失败，请联系客服出示订单编号',
													icon: 'none',
													duration: 3000
												})
											}
										})
									}
								},
					
								fail: function(e) {
									// console.log(e)
									if (e.errMsg == 'requestPayment:fail canceled') {
										uni.showToast({
											title: '您放弃了支付',
											icon: 'none',
											duration: 3000
										})
									} else if (e.errMsg == 'requestPayment:fail errors') {
										uni.showToast({
											title: '支付失败，请重试',
											icon: 'none',
											duration: 3000
										})
									} else {
										uni.showToast({
											title: '网络异常，请检查网络后重试',
											icon: 'none',
											duration: 3000
										})
									}
					
								}
							})
					
						},
						fail: (e) => {
							// console.log(e)
							uni.hideLoading()
							uni.showToast({
								// title: '支付失败，请查看订单是否已取消，如若无问题请联系客服',
								title: '请求支付参数失败，请联系客服',
								icon: 'none',
								duration: 3000
							})
						}
					})
					
					
				} else if (this.channeIndex == 1) { 
					// console.log(that.orderInfo.orderNumber)
					//--------------------------------------支付宝APP支付-------------------------------------
					uni.request({
						url:$lyfw.Interface.spt_Pay.value,
						method:$lyfw.Interface.spt_Pay.method,
						data: {
							payType: 2,
							price: that.orderInfo.orderActualPayment,
							orderNumber: that.orderInfo.orderNumber,
							goodsName: that.orderInfo.title,
							billDescript: that.orderInfo.ticketTitle
						},
						header: {'content-type': 'application/json'},
						success: function(e) {
							// console.log(e)
							uni.hideLoading()
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: e.data.data,
								success: function(res) {
									// console.log(res)
									uni.request({
										url:$lyfw.Interface.spt_RequestTickets.value,
										method:$lyfw.Interface.spt_RequestTickets.method,
										data: {
											orderNumber: that.orderInfo.orderNumber
										},
										header: {'content-type': 'application/json'},
										success: function(res) {
											// console.log(res)
											if (res.data.msg == '出票成功') {
												uni.redirectTo({
													url: 'successfulPayment'
												})
											} else {
												uni.showToast({
													title: '出票失败，联系客服出示订单编号',
													icon: 'none',
													duration: 3000
												})
											}
										},
										fail: function() {
											uni.showToast({
												title: '出票失败，请联系客服出示订单编号',
												icon: 'none',
												duration: 3000
											})
										}
									})
								},
							
								fail: function(e) {
									// console.log(e)
									if (e.errMsg == 'requestPayment:fail canceled') {
										uni.showToast({
											title: '您放弃了支付',
											icon: 'none',
											duration: 3000
										})
									} else if (e.errMsg == 'requestPayment:fail errors') {
										uni.showToast({
											title: '拉起支付失败，请重试',
											icon: 'none',
											duration: 3000
										})
									} else {
										uni.showToast({
											title: '网络异常，请检查网络后重试',
											icon: 'none',
											duration: 3000
										})
									}
							
								}
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								// title: '支付失败，请查看订单是否已取消，如若无问题请联系客服',
								title: '请求支付参数失败，请联系客服',
								icon: 'none',
								duration: 3000
							})
						}
					})
				}
				// #endif


			},
			
			//检查是否已支付
			retrievePayment:function(){
				var that = this;
				uni.request({
					url:$lyfw.Interface.spt_getIsPaySuccess.value,
					method:$lyfw.Interface.spt_getIsPaySuccess.method,
					data: {
						orderNumber: that.orderInfo.orderNumber,
					},
					header: {'content-type': 'application/json'},
					success:function(res){
						// console.log(res)
							if(res.data.msg =='当前订单已支付成功,请勿重复支付'){
								uni.request({
									url:$lyfw.Interface.spt_RequestTickets.value,
									method:$lyfw.Interface.spt_RequestTickets.method,
									data: {
										orderNumber: that.orderInfo.orderNumber
									},
									header: {
										'content-type': 'application/json'
									},
									success: function(res) {
										// console.log(res)
										if (res.data.msg == '出票成功') {
											uni.redirectTo({ 
												url:'successfulPayment'
											})
										} else if (res.data.msg == '出票失败') {
											uni.showToast({
												title: '出票失败，联系客服出示订单编号',
												icon: 'none',
												duration: 3000
											})
										}else if (res.data.msg == '您当前无可出票的订单或该订单已出票') {
											uni.redirectTo({
												url: 'successfulPayment'
											})
										}
									},
									fail: function() {
										uni.showToast({
											title: '服务器异常，请联系客服',
											icon: 'none',
											duration: 3000
										})
									}
								})
							}
					},
					fail:function(){
						uni.showToast({
							title:'网络异常，请检查网络',
							icon:'none'
						})
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}

	//背景图样式
	.ob_background {
		position: absolute;
		width: 100%;
		height: 320upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//整体容器样式
	.cover-container {
		position: relative;
		top: 148upx;
		padding: 32upx 30upx;
	}

	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.cover-container {
		top: 64upx;
	}

	/* #endif */

	//公共样式 - 适用多个数据框
	.MP_information1 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 44upx 32upx;
		padding-bottom: 24upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;

		.MP_title {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			// margin-top: 20upx;
		}

		.MP_text {
			color: #888;
			font-size: 28upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}
	}

	//公共样式2 - 适用单选框
	.MP_information2 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 36upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;

		.kj {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			margin-top: 8upx;
		}

		.MP_text {
			font-size: 26upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}

		//选项框样式
		.MP_optionBar {
			.Mp_title {
				font-size: 32upx;
				margin-left: 20upx;
			}

			.Mp_text {
				margin-top: 6upx;
				float: right;
				font-size: 28upx;
				color: #f85e52;
			}

			.Mp_textBlue {
				margin-left: 16upx;
				font-size: 26upx;
				color: #3EABFC;
			}

			.Mp_box {
				float: right;
				position: relative;
				bottom: 6upx;
				right: -12upx;
			}

			.Mp_icon {
				width: 100upx;
				font-size: 52upx;
			}

			.icon-weixinzhifu {
				color: #36cb59;
			}

			.icon-alipay {
				color: #01aaef;
			}
		}
	}

	//公共样式3 - 适用按钮
	.MP_information3 {
		padding: 24upx 0;
		border-radius: 64upx;
		background: #FF6600;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 80upx;
	}

	//使用时间/费用详情
	.MP_selectionDate {
		margin-top: 24upx;
		margin-bottom: 24upx;
		border-top: 1px #F5F5F5 dashed;

		.MP_title {
			margin-top: 24upx;
			font-size: 34upx;
			display: flex;
			font-weight: bold;
		}

		.MP_text {
			color: #888;
			font-size: 28upx;
			display: block; // 让字体换行
		}

		.MP_cost {
			display: block; // 让字体换行
			margin: 20upx 0;
			font-size: 28upx;
			color: #888;

			.MP_number {
				margin-left: 16upx;
			}

			.MP_userCost {
				float: right;
			}

			.MP_total {
				color: #f85e52;
				float: right;
			}
		}
	}

	// 出行人信息
	.MP_userInformation {
		margin-top: 32upx;

		.Mp_sex {
			margin-left: 24upx;
		}

		.Mp_text {
			font-size: 28upx;
			display: block;
			color: #888;
			margin-top: 20upx;
		}

		.Mp_square {
			margin-left: 24upx;
			padding: 2upx 20upx;
			background: #3DABFC;
			font-size: 26upx;
			color: #fff;
			text-align: center;
			border-radius: 8upx;
		}

		.Mp_delete {
			float: right;
			color: #f85e52;
			font-size: 34upx;
		}

		.Mp_addTo {
			float: left;
			font-size: 30upx;
			margin-left: 64upx;
			width: 200upx;
		}

		.Mp_Selection {
			font-size: 30upx;
			margin-right: 64upx;
			width: 200upx;
		}
	}
</style>
