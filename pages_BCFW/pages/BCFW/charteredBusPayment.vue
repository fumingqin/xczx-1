<template>
	<view>
		<view>
			<!-- #ifdef MP-WEIXIN -->
			<view style="color: #FFFFFF; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 24upx;">倒计时：{{countDownDate}}秒</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view style="color: #FFFFFF; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 88upx;">倒计时：{{countDownDate}}秒</view>
			<!-- #endif -->
		</view>


		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../static/BCFW/choice/red.png" mode="aspectFill"></image>
		</view>

		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{orderInfo.or_class}}</view>
				<text class="MP_text">上车点：{{orderInfo.or_boardingPoint}}</text>
				<text class="MP_text">目的地：{{orderInfo.or_destination}}</text>
				<view v-if="orderInfo.or_class=='包车-定制'"><text class="MP_text">包车天数：{{orderInfo.cm_day}}天</text></view>


				<view class="MP_selectionDate">
					<view class="MP_title">出发时间</view>
					<text class="MP_text">{{orderInfo.or_dateString}}</text>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">包车人信息</view>
					<text class="MP_text">包车人：{{orderInfo.nickName}}</text>
					<text class="MP_text">身份证：{{orderInfo.nickId}}</text>
					<text class="MP_text">手机号：{{orderInfo.nickPhone}}</text>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">费用详情</view>
					<view v-if="state==0">
						<view class="MP_cost" v-if="orderInfo.or_class=='包车-定制'">
							<text>定制费用-预付款</text>
							<text class="MP_userCost">¥{{orderInfo.advance}}</text>
						</view>
						<view class="MP_cost" v-if="orderInfo.or_class=='包车-专线'">
							<text>专线费用-预付款</text>
							<text class="MP_userCost">¥{{orderInfo.advance}}</text>
						</view>
					</view>
					<view v-if="state==1">
						<view class="MP_cost" v-if="orderInfo.or_class=='包车-定制'">
							<text>定制费用-余下费用</text>
							<text class="MP_userCost">¥{{orderInfo.cm_money}}</text>
						</view>
						<view class="MP_cost" v-if="orderInfo.or_class=='包车-专线'">
							<text>专线费用-余下费用</text>
							<text class="MP_userCost">¥{{orderInfo.cm_money}}</text>
						</view>
					</view>
					<view v-if="state==2">
						<view class="MP_cost">
							<text>超额燃油费</text>
							<text class="MP_userCost">¥{{orderInfo.cm_money}}</text>
						</view>
						<view class="MP_cost">
							<text>司机抽成费</text>
							<text class="MP_userCost">¥{{orderInfo.cm_money}}</text>
						</view>
						<view class="MP_cost">
							<text>超额里程费</text>
							<text class="MP_userCost">¥{{orderInfo.cm_money}}</text>
						</view>
					</view>
					<!-- 优惠券 -->
					<view class="MP_cost" v-if="orderInfo.couponPrice>0">
						<text>{{orderInfo.couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo.couponPrice}}</text>
					</view>


					<view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo.cm_money}}</text>
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
			<!-- <view class="MP_information2"> -->
			<!-- <view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" :color="'#01aaef'" @click="Selection"></radio>
				</view> -->
			<!-- </view> -->
			<!-- #endif -->
			<view v-if="state==0">
				<view class="MP_information3" @click="paymentSatas">
					支付{{orderInfo.advance}}元
				</view>
			</view>
			<view v-if="state==1">
				<view class="MP_information3" @click="paymentSatas">
					支付{{orderInfo.cm_money}}元
				</view>
			</view>
			<view v-if="state==2">
				<view class="MP_information3" @click="paymentSatas">
					支付{{orderInfo.cm_money}}元
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $bcfw from "@/common/BCFW/bcfw.js"
	export default {
		data() {
			return {
				countDownDate: 300, //倒计时时间
				returnIndex: false, //页面点击上一页
				hiddenValues: '0', //隐藏状态值
				state:'0',
				channel: [{
					name: '微信'
				}, {
					name: '支付宝'
				}],
				channeIndex: 0, //选择支付方式
				paymentValue: false, //默认未拉起状态

				orderInfo: [{
					or_number: '', //订单编号
					or_type: '', //订单状态
					or_class: '', //包车类型
					or_date: '',
					or_time: '', //下单时间
					billDescript: '', //订单描述
					cm_totalCost: '', //总计
					advance: 0, //预付款
					cm_money:'',
					
					or_dateString: '', //出发时间
					or_boardingPoint: '', //出发地
					or_destination: '', //目的地
					cm_day: 0,
					nickName: '', //包车人
					nickId: '', //包车人身份证
					nickPhone: '', //包车人电话



					couponID: '', //优惠券编号
					couponTitle: '', //优惠券标题
					couponPrice: '', //优惠券价格
					couponCondition: '', //使用门槛

				}],


				submitH5Data: '', //公众号H5支付参数

				testOrderInfo: {
					appid: 'wxefe31fcc2fba222e',
					partnerid: '1583195951',
					prepayid: 'wx18222142102675887d734e111119533100',
					package: 'Sign=WXPay',
					noncestr: 'xZtDRvJXIjVWYssG',
					timestamp: '1587219759',
					sign: 'D5586D098021D6F1EE883F1A4CF897D2'
				}

			}
		},
		onLoad: function(options) {
			console.log(options)
			this.or_number = JSON.parse(decodeURIComponent(options.or_number));
			this.state = options.state;
			console.log(this.state);
			console.log(options.state);
			console.log(this.or_number)
			uni.showLoading({
				title: '拉起订单中...'
			})
			this.returnIndex = false;
			uni.setStorage({
					key: 'returnIndex',
					data: this.returnIndex,
				}),
				uni.request({
					url: $bcfw.Interface.fw_charterDetails.value,
					method: $bcfw.Interface.fw_charterDetails.method,
					data: {
						or_number: this.or_number
					},

					success: (res) => {
						console.log(res)
						this.orderInfo = res.data.data;
						console.log(this.orderInfo)
						if (this.orderInfo.or_class == '包车-定制') {
							this.orderInfo.billDescript = '包车定制费用'
						} else {
							this.orderInfo.billDescript = '包车专线费用'
						}
						// console.log(this.orderInfo.billDescript)
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
		onBackPress: function() {
			this.returnIndex = true;
			uni.setStorage({
				key: 'returnIndex',
				data: this.returnIndex,
			})
		},

		methods: {
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


			// //数组提取
			// screenUser: function() {
			// 	let adult = this.orderInfo.appUserInfoList.filter(item => {
			// 		return item.userType == '成人';
			// 	})
			// 	},


			//获取当前时间并格式化
			getDate: function() {
				//先提取订单下单时间把空格转换成T
				var a = (this.orderInfo.or_date + ' ' + this.orderInfo.or_time).replace(' ', 'T')
				// console.log(a);
				//把时间转换成时间戳
				var b = new Date(a).getTime();
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
				var c = new Date(timer).getTime();

				//用当前时间-下单时间再除于1000就是秒
				var d = (c - b) / 1000;

				//这里的300秒就是支付倒计时，门票是5分钟
				var e = 346 - d;

				this.countDownDate = e;
				this.countDown();
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
					url: $bcfw.Interface.fw_charterDetails.value,
					method: $bcfw.Interface.fw_charterDetails.method,
					data: {
						or_number: this.orderInfo.or_number
					},
					success: (res) => {
						console.log(res)
						if (res.data.data.or_Type == '5') {
							uni.request({
								url: $bcfw.Interface.spt_CancelTickets.value,
								method: $bcfw.Interface.spt_CancelTickets.method,
								data: {
									or_number: this.orderInfo.or_number
								},
								success() {
									// console.log('取消成功')
									uni.showToast({
										title: '支付超时，已自动取消订单',
										icon: 'none',
										duration: 2000
									})
									uni.getStorage({
										key: 'returnIndex',
										success: (res) => {
											if (res.data == false) {
												uni.switchTab({
													url: '../../../pages/order/OrderList'
												})
											}
										}
									})

								},
								fail() {
									// console.log('取消失败')
									uni.getStorage({
										key: 'returnIndex',
										success: (res) => {
											if (res.data == false) {
												uni.switchTab({
													url: '../../../pages/order/OrderList'
												})
											}
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
						title: '请勿重复点击支付'
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

				// #ifdef H5
				uni.request({
					url: $bcfw.Interface.spt_Pay.value,
					method: $bcfw.Interface.spt_Pay.method,
					data: {
						payType: 3,
						price: that.orderInfo.advance,
						orderNumber: that.orderInfo.or_number,
						goodsName: that.orderInfo.or_class,
						billDescript: that.orderInfo.billDescript
					},
					success: function(e) {
						// console.log(e)
						uni.hideLoading()
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: e.data.data,
							success: function(res) {
								console.log(res)
								uni.request({
									url: $bcfw.Interface.spt_CheckPayState.value,
									method: $bcfw.Interface.spt_CheckPayState.method,
									data: {
										or_number: that.orderInfo.or_number,
										factPayPrice: that.orderInfo.advance,
									},
									header: {
										'content-type': 'application/json'
									},
									success: function(res) {
										// console.log(res)
										if (res.data.status == true) {
											uni.redirectTo({
												url: 'BCsuccessfulPayment'
											})
										} else {
											uni.showToast({
												title: '下单失败，联系客服出示订单编号',
												icon: 'none',
												duration: 3000
											})
										}
									},
									fail: function() {
										uni.showToast({
											title: '下单失败，请联系客服出示订单编号',
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
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							// title: '支付失败，请查看订单是否已取消，如若无问题请联系客服',
							title: '请求支付参数失败，请检查网络后重试',
							icon: 'none',
							duration: 3000
						})
					}
				})



				// #endif


				// #ifdef APP-PLUS
				if (this.channeIndex == 0) {
					that = this;
					uni.hideLoading()
					uni.request({
						url: $bcfw.Interface.spt_Pay.value,
						method: $bcfw.Interface.spt_Pay.method,
						data: {
							payType: 3,
							price: that.orderInfo.advance,
							orderNumber: that.orderInfo.or_number,
							goodsName: that.orderInfo.or_class,
							billDescript: that.orderInfo.billDescript
						},
						success: function(e) {
							// console.log(e)
							uni.hideLoading()
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: e.data.data,
								success: function(res) {
									// console.log(res)
									uni.request({
										url: $bcfw.Interface.spt_CheckPayState.value,
										method: $bcfw.Interface.spt_CheckPayState.method,
										data: {
											or_number: that.orderInfo.or_number,
											factPayPrice: that.orderInfo.advance,
										},
										header: {
											'content-type': 'application/json'
										},
										success: function(res) {
											// console.log(res)
											if (res.data.status == true) {
												uni.redirectTo({
													url: 'BCsuccessfulPayment'
												})
											} else {
												uni.showToast({
													title: '下单失败，联系客服出示订单编号',
													icon: 'none',
													duration: 3000
												})
											}
										},
										fail: function() {
											uni.showToast({
												title: '下单失败，请联系客服出示订单编号',
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
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								// title: '支付失败，请查看订单是否已取消，如若无问题请联系客服',
								title: '请求支付参数失败，请检查网络后重试',
								icon: 'none',
								duration: 3000
							})
						}
					})
				} else if (this.channeIndex == 1) {
					var payTypeIndex = 2;
					uni.request({
						url: 'http://218.67.107.93:9210/api/app/getScenicSpotPayParam',
						data: {
							payType: payTypeIndex,
							price: this.orderInfo.advance,
							orderNum: this.orderInfo.or_number,
						},
						method: 'POST',
						success: function(e) {
							// console.log(e)
							uni.hideLoading()
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: e.data.data.appUrl,
								success: function(res) {
									// console.log(res)
									uni.request({
										url: 'http://218.67.107.93:9210/api/app/ScenicSpotIssueTicket?orderNumber=' + that.orderInfo.or_number,
										method: 'POST',
										success: function(res) {
											if (res.data.msg == '出票成功') {
												uni.redirectTo({
													url: '/pages/LYFW/scenicSpotTickets/successfulPayment'
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

								fail: function(ee) {
									// console.log(ee)
									uni.showToast({
										title: '取消支付',
										icon: 'none',
										duration: 3000
									})
								}
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								// title: '支付失败，请查看订单是否已取消，如若无问题请联系客服',
								title: '请求支付参数失败，请检查网络后重试',
								icon: 'none',
								duration: 3000
							})
						}
					})
				}

				// #endif


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
