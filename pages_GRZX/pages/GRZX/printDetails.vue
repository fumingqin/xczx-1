<template>
	<view>
		<view class="example-body" v-if="type==2 || type==1 ||type==0">
			<uni-steps :options="list" active-color="#007AFF" :active="type" />
		</view>
		<view class="example-body" v-if="type==3">
			<uni-steps :options="list2" active-color="#007AFF" :active="type" />
		</view>
		<view class="ps_view">
			<view class="dl_choice">线路选择</view>
			<view class="dl_choiceAddress">
				<text class="ca_text1">{{info.printRoute}}</text>
			</view>
			<view style="border-bottom: 1px #F5F5F5 dotted; //虚线"></view>
			<view class="dl_choice">站点选择</view>
			<view class="dl_choiceAddress">
				<text class="ca_text1">{{info.printSite}}</text>
			</view>
		</view>

		<view class="fb_view2">
			<view class="fb_Text2">上传图片</view>
			<view class="add-img-box">
					<image class="add-img" :src="info.oneImg" mode="aspectFill"></image>
					<image class="add-img" v-if="info.twoImg!='http'" :src="info.twoImg" mode="aspectFill"></image>
					<image class="add-img" v-if="info.threeImg!='http'" :src="info.threeImg" mode="aspectFill"></image>
			</view>
			<view class="cc_content" v-if="type==2 || type==3">
				<text class="ct_text1">审核人</text>
				<text class="ct_text2">{{info.checkname}}</text>
				<text class="ct_text1">审核内容</text>
				<text class="ct_text2">{{info.checkcontent}}</text>
			</view>
		</view>
		<!-- <view class="fb_view3">
			<view class="fb_btn" form-type="submit" @click="submitState">
				<view class="fb_text">修改提交</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import uniSteps from '@/pages_GRZX/components/GRZX/uni-steps/uni-steps.vue'
	import $print from "@/common/print.js"
	export default {
		components: {
			uniSteps,
		},
		data() {
			return {
				type: 0,
				list: [{
					title: '已提交'
				}, {
					title: '审核中'
				}, {
					title: '审核成功'
				}],

				list2: [{
					title: '已提交'
				}, {
					title: '审核中'
				}, {
					title: '审核失败'
				}],
				print_number: '',
				info: [],
			}
		},
		onLoad:function(options) {
			var that = this;
			that.print_number = options.print_number;
			that.getArrayInfo();
		},
		methods: {
			getArrayInfo: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.userInfo = res.data;
						uni.request({
							url: $print.Interface.spt_charterDetails.value,
							method: $print.Interface.spt_charterDetails.method,
							data: {
								print_number: that.print_number
							},

							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								console.log(res);
								if (res.data.msg == '获取成功') {
									that.info = res.data.data[0];
									console.log(that.info)
									if (that.info.print_type == '已提交') {
										that.type = 0;
									} else if (that.info.print_type == '已审核') {
										that.type = 1;
									} else if (that.info.print_type == '已通过') {
										that.type = 2;
									} else {
										that.type = 3;
									}
								}
							}
						})
					},
					fail() {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无数据，请先登录后查看',
							icon: 'none',
							success: function() {
								uni.redirectTo({
									url: '../GRZX/userLogin?loginType=1&&urlData=2'
								})
							}
						})
					}
				})
			},
			// submitState(){
			// 	uni.navigateTo({
			// 		url: 'printSubmit?print_number='+this.print_number
			// 	})
			// }

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.ps_view {
		width: 100%;
		height: 400upx;
		background: #FFFFFF;

		.dl_choice {
			display: flex;
			font-size: 38upx;
			color: #5E5E60;
			padding-top: 41upx;
			padding-left: 20upx;
		}

		.dl_choiceAddress {
			display: block;
			padding-top: 30upx;
			padding-bottom: 21upx;
			padding-left: 20upx;

			.ca_text1 {
				font-size: 32upx;
			}
		}
	}

	.fb_view2 {
		width: 750upx;
		height: 328upx;
		background: #FFFFFF;
		margin-top: 20upx;

		.fb_Text2 {
			font-weight: bold;
			font-size: 30upx;
			padding-left: 34upx;
			padding-top: 30upx;
		}

		.add-img {
			width: 200rpx;
			height: 200rpx;
			margin-top : 32upx;
			margin-left: 20upx;
			border-radius: 24upx;
		}

		.add-img-del {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			right: 8rpx;
			top: 17rpx;
			border-radius: 20rpx;
		}
	}

	.fb_view3 {
		margin-top: 200upx;
		margin-left: 170upx;

		.fb_btn {
			width: 400upx;
			height: 100upx;
			border-radius: 12upx;
			background: #FC4646;
			color: #FFFFFF;
		}

		.fb_text {
			padding-left: 140upx;
			padding-top: 30upx;
			font-size: 32upx;
		}
	}

	.cc_content {
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-top: 40upx;
		padding-left: 30upx;
		padding-right: 30upx;

		.ct_text1 {
			display: flex;
			font-weight: bold;
			font-size: 32upx;
			padding-top: 30upx;
		}

		.ct_text2 {
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 31upx;
			display: block;
			color: #666;
			border-bottom: 1px #F5F5F5 dotted;
		}
	}
</style>
