<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
		</view>

		<view class="cover-container">
			<image class="okImage" mode="aspectFill" src='../../static/CZC/Success.png'></image>
			<text class="title">行程已结束</text>
			<text class="content">无选择操作，将在10秒后自动返回首页</text>
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
				timeout:"",
			}
		},
		onReady() {
			this.backHome();
		},
		methods: {
			//路由统一事件
			godetail: function(e) {
				clearTimeout(this.timeout)
				if(e==0){
					uni.switchTab({
						url:'../../../pages/order/OrderList'
					});
				}else if(e==1){
					uni.switchTab({
						url:'../../../pages/Home/Index'
					});
				}
			},
			backHome : function() {
				this.timeout=setTimeout(() => { 
					uni.switchTab({
						url:'../../../pages/Home/Index'
					});
				}, 10000)
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
		margin-top: 88upx;
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
