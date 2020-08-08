<template>
	<view>
		<view style="background-color: #FC4646;">
			<view class="status_bar"></view>
			<view style="height: 220rpx;">
				<image class="backImage" @click="back" src="../../static/CZC/back.png" style="width: 80rpx;height: 80rpx;margin-left: 30rpx;"></image>
			</view>
		</view>
		<view style="background-color: #FFF;margin:0 30rpx;border-radius: 20rpx;margin-top: -100rpx;">
			<view style="margin:0 30rpx;;">
				<view style="padding: 30rpx 0;border-bottom:solid 1px #F5F5F5 ;">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="color: #2C2D2D;font-size:36rpx;font-weight: bold;">顺风车</view>
						<view style="color: #2C2D2D; font-size: 26rpx;text-align: end;">倒计时：{{countDownDate}}秒</view>
					</view>
					<view style="color: #888;font-size: 30rpx;line-height: 60rpx;">上车点：{{StartAddress}}</view>
					<view style="color: #888;font-size: 30rpx;line-height: 60rpx;">下车点：{{EndAddress}}</view>
					<view style="color: #888;font-size: 30rpx;line-height: 60rpx;">出发时间：{{AppointmentTime}}</view>
				</view>
				<view style="padding-top:30rpx;" v-show="isHidden">
					<view style="color: #2C2D2D;font-size:36rpx;font-weight: bold;">乘车人信息</view>
					<view style="border-bottom: solid 1rpx#F5F5F5;" v-for="(item,index) in personArr" :key="index">
						<view style="color: #2C2D2D;font-size: 32rpx;line-height: 60rpx;display: flex;">
							<view style="padding-right: 20rpx;">{{item.userName}}</view>
							<view>男</view>
						</view>
						<view style="color: #888;font-size: 30rpx;line-height: 60rpx;">身份证：{{(item.userCodeNum.substr(0,6))+'******'+(item.userCodeNum.substr(14,18))}}</view>
						<view style="color: #888;font-size: 30rpx;line-height: 60rpx;">手机号：{{(item.userPhoneNum.substr(0,3))+'****'+(item.userPhoneNum.substr(7,11))}}</view>
					</view>
				</view>
				<view style="padding: 30rpx 0;">
					<view style="color: #2C2D2D;font-size:36rpx;font-weight: bold;">费用详情</view>
					<view style="color: #2C2D2D;font-size: 32rpx;line-height: 60rpx;display: flex;justify-content: space-between;">
						<view style="padding-right: 20rpx;">车费</view>
						<view>￥{{TaxiCost}}</view>
					</view>
				</view>
				<view class="jdticon icon-xia" style="padding: 24rpx 0upx; text-align: center; margin-top: 10rpx;" v-if="!isHidden"
				 @click="change(true)"></view>
				<view class="jdticon icon-shang" style="padding: 24rpx 0upx; text-align: center; margin-top: 10rpx;" v-if="isHidden"
				 @click="change(false)"></view>
			</view>
		</view>
		<!-- 付款方式 -->
		<view style="margin:20rpx 30rpx;">
			<!-- <view style="padding:20px;background-color: #FFF;border-radius: 20rpx;">
				<radio-group name='chooseType'>
					<view v-for='item in payType' :key='item.typeName' style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;justify-content: center;align-items: center;">
							<image :src='item.iconPath' style="height: 42rpx;width: 42rpx;"></image>
							<text style="margin-left: 5rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:#000000;">{{item.typeName}}</text>
						</view>
						<view>
							<radio :value="item.value" :checked="item.checked" :color="item.typeColor" />
						</view>
					</view>
				</radio-group>
			</view> -->
			<view style="margin-top: 20rpx;">
				<button style="width: 100%;height: 100rpx;background-color: #FE4644;color: #FFFFFF;" @click="getPaymentInformation">
					<text style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">立即支付</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import $privateTaxi from "@/common/Czcprivate.js"; //出租车专线
	import $downwindCar from "@/common/downwindCar.js"; //顺风车
	export default {
		data() {
			return {
				countDownDate: 50,
				isHidden: false,
				orderNumber: "",
				personArr: [],
				StartAddress: '',
				EndAddress: '',
				AppointmentTime: '',
				orderTime: '',
				TaxiCost: '',
				payType: [{
						typeName: '微信',
						typeColor: '#00C805',
						iconPath: '../../static/CZC/Wechatpay.png',
						value: 'wxpay',
						checked: true,
					}
					// {
					// 	typeName: '支付宝',
					// 	typeColor: '#0EBDFF',
					// 	iconPath: '../../static/CZC/Alipay.png',
					// 	value: 'alipay',
					// 	checked: false 
					// }
				],
				countDownInterval1: '',
				SpecialLineName: '',
				userInfo: '',
				scenicSpotOpenId:'',//oppenid
			}
		},
		onLoad: function(options) {
			this.orderNumber = options.orderNumber;
			this.CheckPayState();
			this.userInfo = uni.getStorageSync('userInfo') || '';
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.scenicSpotOpenId = this.userInfo.openId_xcx || ''; //获取Oppenid
			// #endif
		},
		methods: {
			change: function(value) {
				this.isHidden = value;
			},
			back: function() {
				var that = this;
				uni.navigateBack();
			},
			showToast: function(msg, icon = 'none') {
				uni.showToast({
					title: msg,
					icon: icon
				})
			},
			countDown: function() { //支付倒计时
				let that = this;
				clearInterval(that.countDownInterval1);
				that.countDownInterval1 = setInterval(function() {
					if (that.countDownDate > 0) {
						that.countDownDate--;
					} else {
						clearInterval(that.countDownInterval1);
						that.cancelOrder();
						that.countDownDate = '';
					}
				}, 1000);
			},
			getTimeRemain: function(value) { //获取时间
				var time = new Date(value + "+08:00").getTime();
				this.countDownDate = (180 - (new Date().getTime() - time) / 1000).toFixed(0);
				this.countDown();
			},
			cancelOrder: function() { //取消订单
				let that = this;
				uni.request({
					url: $privateTaxi.Interface.CancelHitchhikerOrder_Passenger.value,
					method: $privateTaxi.Interface.CancelHitchhikerOrder_Passenger.method,
					data: {
						OrderNumber: that.orderNumber,
						UserId: that.userInfo.userId,
					},
					success: function(res) {
						if (res.data.status) {
							that.showToast("超时未支付，订单自动取消");
							clearInterval(that.countDownInterval1); //清除倒计时
							that.countDownDate = '';
							setTimeout(function() {
								uni.hideLoading();
								uni.switchTab({
									url: "../../pages/order/OrderList"
								})
							}, 1000)
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						that.showToast('网络连接失败');
					}
				})
			},
			getOrderDetail: function() { //获取订单信息
				let that = this;
				uni.request({
					url: $downwindCar.Interface.QueryHitchhikerOrder_Passenger.value,
					method: $downwindCar.Interface.QueryHitchhikerOrder_Passenger.method,
					data: {
						OrderNumber: that.orderNumber
					},
					success: function(res) {
						if (res.data.status) {
							that.personArr = JSON.parse(res.data.data.Passengers);
							that.StartAddress = res.data.data.StartAddress;
							that.EndAddress = res.data.data.EndAddress;
							that.AppointmentTime = res.data.data.AppointmentTime.replace("T", " ");
							that.orderTime = res.data.data.OrderTime;
							that.TaxiCost = res.data.data.EstimatePrice; //价格
							that.getTimeRemain(res.data.data.OrderTime);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: function(res) {
						uni.hideLoading();
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				})

			},
			// ------------------------------------支付开始------------------------------------------
			getPaymentInformation: function() { //获取支付信息
				let that = this;
				uni.showLoading({
					mask:true
				})
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.request({
					url: $privateTaxi.Interface.getCommonPayparameter.value,
					method: $privateTaxi.Interface.getCommonPayparameter.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						openId:that.scenicSpotOpenId,
						payType: payPlatform,
						price: that.TaxiCost,
						// price: 0.01,
						orderNumber: that.orderNumber,
						goodsName: "顺风车车费",
						billDescript: "顺风车车费",
					},
					success(res) {
						that.payment(res.data.data)
					},
					fail() {
						uni.hideLoading();
					}
				})
			},
			payment: function(orderInfo) { //支付
				let that = this;
				uni.requestPayment({
					//#ifdef MP-WEIXIN
					timeStamp:orderInfo.timeStamp,
					nonceStr:orderInfo.nonceStr,
					package:orderInfo.package,
					signType:orderInfo.signType,
					paySign:orderInfo.paySign,
					// #endif
					// #ifdef APP-VUE
					provider:"wxpay", 
					orderInfo: orderInfo,
					// #endif
					success(res) {
						clearInterval(that.countDownInterval1); //清除倒计时
						that.CheckPayState();
					},
					fail(res) {
						uni.hideLoading();
						that.CheckPayState();
						var msg="requestPayment:fail canceled";
						// #ifdef MP-WEIXIN
						msg="requestPayment:fail cancel";
						// #endif
						if (res.errMsg == msg) {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						} else {
							that.showToast("网络连接失败")
						}
					}
				})
			},
			CheckPayState: function() {
				let that = this;
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.showLoading({
					mask: true,
				})
				uni.request({
					url: $privateTaxi.Interface.CheckPayState.value,
					method: $privateTaxi.Interface.CheckPayState.method,
					data: {
						payType: payPlatform,
						orderNumber: that.orderNumber
					},
					success(res) {
						if (res.data.status) {
							that.paymentSuccess();
							uni.hideLoading();
						} else {
							that.getOrderDetail();
							uni.hideLoading();
						}
					},
					fail() {
						uni.hideLoading();
					}
				})
			},
			paymentSuccess: function() { //支付成功订单变成待接单
				let that = this;
				uni.request({
					url: $downwindCar.Interface.HitchhikerOrderOrderPay_Passenger.value,
					method: $downwindCar.Interface.HitchhikerOrderOrderPay_Passenger.method,
					data: {
						OrderNumber: that.orderNumber,
						FactPayPrice: that.TaxiCost,
					},
					success(res) {
						if (res.data.status) {
							uni.redirectTo({
								url: "./PrivatePaySuccess"
							})
						} else {
							that.showToast("出错，请联系客服")
						}
					},
					fail() {
						that.showToast("网络连接失败")
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

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}
</style>
