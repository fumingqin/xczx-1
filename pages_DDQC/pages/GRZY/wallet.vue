<template>
	<view style="text-align: center;">
		<image class="wl_img" src="../../static/GRZY/zhu.png"></image>
		<view class="wl_balance">账户余额</view>
		<view class="wl_money">{{balance.toFixed(2)}}元</view>
		<view class="wl_btn">
			<view class="wl_text" @click="topUp()">充值</view>	
		</view>
		<view style="margin-top:30upx;">
			<view class="wl_text2" @click="topUpRecord()">充值记录></view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				phoneNumber: '',
				userID: '',
				balance:0,
			}
		},
		onShow() {
			this.getmoney();
		},
		methods: {
			topUp() {
				uni.navigateTo({
					url: './topUp'
				})
			},
			topUpRecord() {
				uni.navigateTo({
					url: './zy_topUpRecord'
				})
			},
			getmoney: function() {
				var that = this;
				uni.getStorage({
						key: "userInfo",
						success: (res) => {
							// uni.request({
							// 		url:'http://111.231.109.113:8004/api/Purse/GetEnrollment',
							// 		method:'POST',
							// 		data:{
							// 			phoneNumber:res.data.phoneNumber,
							// 			userId:'350583199609110031',
							// 			userName:'兵',
							// 			uuid:'_UNI_7BBF03F',
							// 			userID:res.data.userId,
							// 		},
							// 		success: (res) => {
							// 			console.log(res)
							// 		},
							// 		fail(res) {
							// 			console.log(res)
							// 		}
							// 	}),
							uni.request({
								url: $DDTInterface.DDTInterface.GetPurseDetail.Url,
								method: $DDTInterface.DDTInterface.GetPurseDetail.method,
								data: {
									phoneNumber: res.data.phoneNumber,
									userID: res.data.userId,
								},
								success: (res) => {
									console.log(res)
									if (res.data.msg == '请求成功') {
										that.balance = res.data.data.balance/100;
									}
								},
								fail(res) {
									console.log(res)
								}
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f9fc;
	}

	.wl_img {
		width: 193upx;
		height: 175upx;
		margin-top: 167upx;
	}

	.wl_balance {
		margin-top: 69upx;
		font-size: 36upx;
		font-weight: 500;
	}

	.wl_money {
		margin-top: 43upx;
		font-size: 32upx;
		font-weight: 500;
	}

	.wl_btn {
		width: 654upx;
		height: 106upx;
		margin-top: 138upx;
		border-radius: 69upx;
		background: #65C36D;
		color: #FFFFFF;
		margin-left: 47upx;

		.wl_text {
			padding-top: 30upx;
		}
	}
	.wl_text2{
		color:#4281FF;
	}
</style>
