<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
		</view>

		<view class="cover-container">
			<image class="okImage" mode="aspectFill" src='../../../../static/ZXGP/Success.png'></image>
			<text class="title">支付成功</text>
			<!-- <text class="content">请选择</text> -->
			<view class="buttonView">
				<view class="orderButton" @click="godetail(0)">查看订单</view>
				<view class="homeButton" @click="godetail(1)">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(res) {
			
		},
		onShow(res) {
			// this.getTicketPaymentInfo(res.orderNum);
		},
		onReady() {
			// this.backHome();
		},
		methods: {
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(res) {
				var that = this;
				var timer=null;
				that.timer = timer;
				timer=setInterval(function(){
					uni.request({
						url: 'http://zntc.145u.net/api/ky/SellTicket_Flow',
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							orderNumber: res.orderNum
						},
						success: (res) => {
							console.log(res.data);
							if (res.data != null) {
								if (res.data) {
									var msgArray = JSON.parse(res.data.msg);
									if(msgArray.msg == '订票成功') {
										uni.showToast({
											title: msgArray.msg,
											icon: 'none'
										})
										clearInterval(timer);
									}
								}
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
			//路由统一事件
			godetail: function(e) {
				if(e==0){//查看订单
					uni.switchTab({
						url:'../../../../../pages/order/newOrderList',
					});
				}else if(e==1){//返回首页
					uni.switchTab({
						url:'../../../../../pages/Home/zxgpHomePage',
					});
				}
			},
			backHome : function() {
				uni.switchTab({
					url:'../../../../../pages/Home/zxgpHomePage',
				});
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
		background-color: #FC4646;
	
	}

	//整体容器样式
	.cover-container {
		position: absolute;
		margin: 0 24upx;
		margin-top: 176upx;
		margin-bottom: 52upx;
		width: 702upx;
		height: 90%;
		background: #FFFFFF;
		box-shadow: 0px 0.2px 0px #aaa;
		border-radius: 16upx;
		text-align: center;

		.okImage {
			width: 136upx;
			height: 116upx;
			margin-top: 35%;
		}

		.title {
			margin: 30upx 0;
			display: block;
			font-size: 48upx;
			font-weight: bold;
		}

		.content {
			display: block;
			font-size: 28upx;
			color: #888;
		}

		.buttonView {
			margin: 0 50upx;
			margin-top: 120upx;
			display: flex;
			text-align: center;
			line-height: 100upx;

			.orderButton {
				width: 280upx;
				height: 104upx;
				font-size: 34upx;
				background: #FC4646;
				border-radius: 16upx;
				color: #fff;
			}

			.homeButton {
				margin-left: 40upx;
				width: 280upx;
				height: 104upx;
				font-size: 34upx;
				border-radius: 16upx;
				color: #FC4646;
				border: 1px solid #FC4646;
			}
		}

	}
</style>
