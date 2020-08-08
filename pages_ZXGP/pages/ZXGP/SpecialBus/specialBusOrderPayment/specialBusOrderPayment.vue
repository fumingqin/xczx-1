<template>
	<!-- 订单支付页面 -->
	<view>
		<!-- <view style="color: #000000; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 24upx;">倒计时：{{countDownDate}}秒</view> -->
		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{ticketInfo.pickerStartStation}} - {{ticketInfo.pickerEndStation}}</view>
				<text class="MP_text">费用包含：车票</text>

				<view class="MP_selectionDate">
					<view class="MP_title">使用时间</view>
					<text class="MP_text">{{turnDate(ticketInfo.date)}} &nbsp; 仅限当天</text>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">购票人信息</view>
					<view class="MP_userInformation" v-for="(item,index) in passengerInfo" :key="index">
						<text>{{item.userName}}</text>
						<text class="Mp_sex">{{item.userSex}}</text>
						<text class="Mp_square">{{item.userType}}</text>
						<text class="Mp_square" v-if="item.userDefault == true">本人</text>
						<text class="Mp_square" v-if="item.userEmergencyContact == true">紧急联系人</text>
						<text class="Mp_text">身份证：{{item.userCodeNum}}</text>
						<text class="Mp_text">手机号：{{item.userPhoneNum}}</text>
					</view>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">费用详情</view>
					<view class="MP_cost" v-if="adultNum>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultNum}}</text>
						<text class="MP_userCost">¥{{ticketInfo.oneTicketPrice}}</text>
					</view>

					<view class="MP_cost" v-if="childrenNum>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenNum}}</text>
						<text class="MP_userCost">¥{{ticketInfo.halfTicket}}</text>
					</view>
					
					<view class="MP_cost" v-if="freeTicketNum>=1">
						<text>携带免童票</text>
						<text class="MP_number">×{{freeTicketNum}}</text>
						<text class="MP_userCost">¥{{orderInfo.halfTicket}}</text>
					</view>
					
					<!-- 保险 -->
					<view class="MP_cost" v-if="isInsurance == 1 ">
						<text>保险</text>
						<text class="MP_number">×{{ticketNum}}</text>
						<text class="MP_total">¥{{ticketInfo.oneTicketPrice}}</text>
					</view>

					<!-- 优惠券 -->
					<!-- <view class="MP_cost" v-if="orderInfo[0].couponPrice>0" v-if="false">
						<text>{{orderInfo[0].couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo[0].couponPrice}}</text>
					</view> -->

					<!-- <view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo[0].orderActualPayment}}</text>
					</view> -->

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

			<view class="MP_information2" v-if="false">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" :color="'#01aaef'" @click="Selection"></radio>
				</view>
			</view>

			<view class="MP_information3" @click="payment">支付{{ticketInfo.totalPrice}}元
			</view>

		</view>

	</view>
</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
	import utils from "@/pages_ZXGP/components/ZXGP/shoyu-date/utils.filter.js";
	export default {
		data() {
			return {
				countDownDate: 120, //倒计时时间
				utils: utils,
				userInfo: [], //用户信息
				hiddenValues: '0', //隐藏状态值
				channel: [{
					name: '微信'
				}, {
					name: '支付宝'
				}],
				insurance: '', //保险
				isInsurance: '', //是否有保险
				channeIndex: 0, //选择支付方式
				orderInfo: [], //订单数据
				passengerInfo: [], //乘车人信息
				idNameTypeStr: '', //乘车人信息字符串（发送请求需要）（小叶接口）
				ticketNum: 0, //总票数
				adultNum: 0, //成人数量
				freeTicketNum: 0,//免童
				childrenNum: 0, //儿童数量	
				adultTotalPrice: '', //成人总价
				childrenTotalPrice: '', //儿童总价
				totalPrice: 0, //总价格
				paymentData: [], //保存支付参数
				timer: '', //定时器数据
				isPayEnable: false, //当前是否可以点击支付
				orderNum: '', //订单编号
				ticketInfo: [],
				specialStartStation: '', //定制班车上车点
				specialEndStation: '', //定制班车下车点
				tickettype: '', //班车类型
				ctkyOpenID: '',
				passengerNames:[],//乘客姓名数组
				passengerIDs:[],//乘客身份证数组
				weixinOpenId:'',
			}
		},
		onLoad: function(param) {
			var that = this;
			that.ticketInfo = JSON.parse(param.array);
			//定制巴士上车点
			that.specialStartStation = that.ticketInfo.pickerStartStation;
			//定制巴士下车点
			that.specialEndStation = that.ticketInfo.pickerEndStation;

			uni.showLoading({
			    title: '加载中...'
			});
			//读取用户信息
			this.getUserInfo();
			//读取乘车人信息
			this.getPassengerInfo();
		},
		onShow() {
			
		},
		onUnload() {
			clearInterval(this.timer);
		},
		//--------------------------监听页面返回--------------------------
		onBackPress(options) {
			var that = this;
			// console.log('from:' + options.from);
			clearInterval(that.timer);
			if (options.from == 'backbutton') {
				console.log('that.timer', that.timer);
				if (that.timer) {
					clearInterval(that.timer);
				}
			}
		},
		methods: {
			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						// #ifdef MP-WEIXIN
						that.weixinOpenId = data.data.openId_xcx;
						// #endif
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
			//--------------------------读取乘车人信息--------------------------
			getPassengerInfo() {
				var that = this;
				//读取乘车人信息
				uni.getStorage({
					key: 'passengerList',
					success: function(data) {
						that.passengerInfo = data.data;
						if (that.passengerInfo.length > 0) {
							for (let i = 0; i < that.passengerInfo.length; i++) {
								var type = '';
								if (data.data[i].userType == '半票儿童') {
									type = 0;
								} else if (data.data[i].userType == '成人') {
									type = 2;
								}else if (data.data[i].userType == '免票儿童') {
									type = 1;
								}
								//拼接id name type
								// that.idNameTypeStr += data.data[i].userCodeNum + ',' + data.data[i].userName + ',' + type + '|';
								that.passengerNames.push(data.data[i].userName)
								that.passengerIDs.push(data.data[i].userCodeNum)
								that.ticketNum++;
								//把儿童票筛选出来
								if (that.passengerInfo[i].userType == '半票儿童') {
									that.childrenNum++;
								} else if (that.passengerInfo[i].userType == '成人'){
									that.adultNum++;
								}else if(that.passengerInfo[i].userType == '免票儿童'){
									that.freeTicketNum++;
								}
							}
							//把最后面的'｜'去掉
							// that.idNameTypeStr = that.idNameTypeStr.substring(0, that.idNameTypeStr.length - 1);
						}
						//-------------------------------读取用户openID-------------------------------
						
						// #ifdef H5
						that.getOpenID();
						// #endif

						//-------------------------------下单-------------------------------
						
						// #ifdef APP-PLUS || MP-WEIXIN
						that.getOrder();
						// #endif
					},
					fail() {
						uni.showToast({
							title: '获取信息失败',
							icon: 'none'
						})
					}
				})
			},
			//--------------------------读取公众号openid--------------------------
			getOpenID() {
				var that = this;
				uni.getStorage({
					key: 'scenicSpotOpenId',
					success: function(response) {
						// alert('获取id成功');
						that.ctkyOpenID = response.data
						//等待读取用户缓存成功之后再请求接口数据
						that.getOrder();
					},
					fail: function(fail) {
						that.ctkyOpenID = response.data
						that.getOrder();
					}
				})
			},
			//--------------------------隐藏操作--------------------------
			hide(e) {
				if (e == 0) {
					this.hiddenValues = 1;
				} else {
					this.hiddenValues = 0;
				}
			},

			//--------------------------同意购买-点击事件--------------------------
			Selection: function() {
				if (this.channeIndex == 0) {
					this.channeIndex = 1;
				} else {
					this.channeIndex = 0;
				}
			},

			//--------------------------数组提取--------------------------
			screenUser: function() {
				let adult = this.orderInfo.filter(item => {
					return item.userType == '成人';
				})
				let children = this.orderInfo.filter(item => {
					return item.userType == '儿童';
				})

				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
				this.adultTotalPrice = adult.length * this.orderInfo[0].ticketAdultPrice;
				this.childrenTotalPrice = children.length * this.orderInfo[0].ticketChildPrice;
			},
			//--------------------------下单--------------------------
			getOrder: function() {
				var that = this;
				var timer = null;
				var setTime = that.ticketInfo.date.replace('T', ' ');
				var companyCode = '';
				// #ifdef H5
				companyCode = $KyInterface.KyInterface.systemName.systemNameH5;
				// #endif
				// #ifdef APP-PLUS
				companyCode = $KyInterface.KyInterface.systemName.systemNameApp;
				// #endif
				// #ifdef MP-WEIXIN
				companyCode = $KyInterface.KyInterface.systemName.systemNameWeiXin;
				// #endif
				var childNum = Number(that.childrenNum) + Number(that.freeTicketNum)
				
				console.log(companyCode,that.ticketInfo.priceAID,that.userInfo.phoneNumber,that.adultNum,childNum,that.passengerIDs,that.passengerNames,that.userInfo.userId)
				//--------------------------发起下单请求-----------------------
				uni.request({
					url:$KyInterface.KyInterface.Cs_BookingTicket.Url,
					method:$KyInterface.KyInterface.Cs_BookingTicket.method,
					data: {
						sellerCompanyCode: companyCode,//公司代码
						priceAID:that.ticketInfo.priceAID,//价格id
						phoneNumber:that.userInfo.phoneNumber,//手机号码
						fullTicket:that.adultNum, //全票人数
						children:childNum, //携童人数
						passengerIDs:that.passengerIDs,
						passengerNames:that.passengerNames,
						TPPID:'',//传空
						UserAID:that.userInfo.userId,//用户ID
					},
					success: (res) => {
						console.log('下单返回数据',res);
						if (res.data) {
							if (res.data.Successed == true) {
								uni.showToast({
									title: res.data.BookResult.Message,
									icon: 'none'
								})
								that.orderNum = res.data.BookResult.BookLogAID;
								that.getTicketPaymentInfo(res.data.BookResult.BookLogAID);
							} else if (res.data.Successed == false) {
								uni.hideLoading();
								uni.showModal({
									content: res.data.msg,
									showCancel:false,
									success: (res) => {
										if (res.confirm) {
											uni.navigateBack()
										} 
									}
								})
							}
						}
					},
					fail(res) {
						console.log('失败', res);
						uni.hideLoading();
					}
				})
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(res) {
				var that = this;
				var payType = $KyInterface.KyInterface.payType.payType;
				var timer = null;
				that.timer = timer;
				console.log(res)
				
				var openId = '';
				// #ifdef MP-WEIXIN
				openId = that.weixinOpenId;
				// #endif
				// #ifdef H5
				openId = that.ctkyOpenID;
				// #endif
				
				uni.showLoading({
					title:'正在获取支付...'
				})
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.commonPayment.Url,
						method:$KyInterface.KyInterface.commonPayment.method,
						data: {
							//订单编号
							orderNumber: res,
							payType:payType,
							openId:openId,
							billDescript:'定制巴士订单服务费',
							goodsName:'定制巴士服务',
							price:that.ticketInfo.totalPrice,
							// price:0.01,
						},
						success: (res) => {
							console.log(res.data);
							uni.hideLoading();
							if(res.data.status == true) {
								that.paymentData = res.data.data;
								clearInterval(timer);
								uni.showModal({
									content:'请尽快支付',
									success(res) {
										if(res.confirm) {
											that.payment();
										}
									}
								})
							}else if(res.data.status == false) {
								clearInterval(timer);
							}
						},
						fail(res) {
							uni.hideLoading();
							console.log('失败');
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			payment: function() {
				var that = this;
				// #ifdef H5
				uni.hideLoading()
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": that.paymentData.appId, //公众号名称，由商户传入
					"timeStamp": that.paymentData.timeStamp, //时间戳
					"nonceStr": that.paymentData.nonceStr, //随机串
					"package": that.paymentData.package, //扩展包
					"signType": that.paymentData.signType, //微信签名方式:MD5
					"paySign": that.paymentData.paySign //微信签名
				}, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						alert("支付成功");
						uni.showLoading({
						    title: '加载中...'
						});
						that.Cs_paySuccess(that.orderNum);
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
							icon: 'none'
						})

					} else {
						// location.href = "/Coach/GetCoach";
					}
				});
				// #endif


				// #ifdef APP-PLUS
				uni.hideLoading()
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: {
						appid: that.paymentData.appId,
						timestamp: that.paymentData.timeStamp,
						noncestr: that.paymentData.nonceStr,
						package: 'Sign=WXPay',
						sign: that.paymentData.signType,
						partnerid: that.paymentData.partnerId,
						prepayid: that.paymentData.prepayId,
					},
					success: function(res) {
						if (res.errMsg == 'requestPayment:ok') { //成功
							uni.showToast({
								title: '支付成功',
								complete() {
									uni.showLoading({
									    title: '加载中...'
									});
									that.Cs_paySuccess(that.orderNum);
								}
							})
						} else if (res.errMsg == 'requestPayment:fail errors') { //错误
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none'
							})
						} else if (res.errMsg == 'requestPayment:fail canceled') { //用户取消
							uni.showToast({
								title: '您取消了支付',
								icon: 'none'
							})
						}
					},
					fail: function(ee) {
						uni.showToast({
							title: '拉起支付失败，请检查网络后重试',
							icon: 'none',
							duration: 3000
						})
					}
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.hideLoading()
				uni.requestPayment({
					// provider: 'wxpay',
					timeStamp:that.paymentData.timeStamp,
					nonceStr:that.paymentData.nonceStr,
					package:that.paymentData.package,
					signType:that.paymentData.signType,
					paySign:that.paymentData.paySign,
					success(res) {
						console.log(res)
						if (res.errMsg == "requestPayment:ok") {
							uni.showToast({
								title: '支付成功',
								icon: 'none',
							})
							uni.showLoading({
							    title: '加载中...'
							});
							that.Cs_paySuccess(that.orderNum);
						}else if (res.errMsg == "requestPayment:fail cancel") {
							setTimeout(function() {
								that.showToast("您取消了支付，请重新支付")
							}, 1000)
						}else if (res.errMsg == "requestPayment:fail errors") {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						}
					},
					fail(res) {
						console.log(res)
						if (res.errMsg == "requestPayment:fail cancel") {
							setTimeout(function() {
								that.showToast("您取消了支付，请重新支付")
							}, 1000)
						}else if (res.errMsg == "requestPayment:fail errors") {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						}else {
							that.showToast("支付出错")
						}
					}
				});
				// #endif
			},
			showToast: function(msg, icon = 'none') {
				uni.showToast({
					title: msg,
					icon: icon
				})
			},		
			//--------------------------定制巴士支付成功后请求--------------------------
			Cs_paySuccess:function(bookID){
				var that = this;
				uni.showLoading({
					title: '正在检索，请稍后...'
				});
				uni.request({
					url:$KyInterface.KyInterface.Cs_Confirm.Url,
					method:$KyInterface.KyInterface.Cs_Confirm.method,
					header:$KyInterface.KyInterface.Cs_Confirm.header,
					data:{
						bookID:bookID
					},
					success(res) {
						console.log('支付成功后调接口',res)
						uni.hideLoading()
						if(res.data.BookResult.Successed == true){
							uni.redirectTo({
								url:'../../TraditionSpecial/PayMent/CTKYPaySuccess'
							})
						}
					},
					fail(res) {
						uni.hideLoading()
						console.log('支付失败后调接口',res)
					}
				})
			},
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
		top: 30upx;
		padding: 32upx 30upx;
	}

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
