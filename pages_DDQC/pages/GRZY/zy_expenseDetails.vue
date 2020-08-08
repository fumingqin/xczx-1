<template>
	<view>
		<!-- 顶部图片 -->
		<view>
			<image class="ed_image" src="../../static/GRZY/zixingche.png"></image>
		</view>
		
		<view class="ed_view">
			<view>
				<text v-if="RentType==0" class="vi_text">有桩车</text>
				<text v-if="RentType==1" class="vi_text">无桩车</text>
				<view class="te_view">
					<text class="te_text">{{HireTime}}</text>
					<!-- <text class="te_text2">{{expenseDetail.time}}</text> -->
				</view>
			</view>
		</view>
		
		<!-- <view class="ed_view2">
			<view>
				<text class="vi_text">骑行费用</text>
			</view>
			<view style="position: relative;width: 100%;">
				<text class="te_text3">起步价(15分钟)</text>
				<text class="te_text4">{{expenseDetail.startCost}}元</text>
			</view>
			<view style="position: relative;width: 100%;">
				<text class="te_text5">时长价(30分钟)</text>
				<text class="te_text6">{{expenseDetail.durationCost}}元</text>
			</view>
		</view> -->
		
		<!-- <view class="ed_view3">
			<view>
				<text class="vi_text">优惠</text>
			</view>
			<view style="position: relative;width: 100%;">
				<text class="te_text3">套餐抵扣</text>
				<text class="te_text4">{{expenseDetail.packageOffer}}元</text>
			</view>
		</view> -->
		
		<view class="ed_view4">
			<text class="ed_text">支付费用:{{PayPrice}}元</text>
		</view>
		
		<view class="ed_view5" @click="open">
			<text class="ed_text2">计价规则></text>
		</view>
		
		<!-- 押金支付弹框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="po_boxVlew">
				<view class="bv_topText">
					<text class="tt_text">押金充值</text>
					<text class="tt_icon jdticon icon-fork " @click="close(1)"></text>
				</view>
				<view class="tt_view">
					<rich-text class="tt_tear" :nodes="expenseDetail.way"></rich-text>
				</view>
				<view class="vi_bottom"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/pages_DDQC/components/GRZY/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				expenseDetail: '', //行车记录
				HireTime:'',
				PayPrice:'',
				RentType:'',
			}
		},
		onLoad(param) {
			var that=this;
			that.lunBoInit();
			that.HireTime = param.HireTime;
			that.PayPrice = param.PayPrice;
			that.RentType = param.RentType;
		},
		methods: {
			//------------------------------弹框事件-----------------------------------------
			
			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},
			//关闭
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},
			
			//------------------------模拟数据----------------------------------------------
			
			async lunBoInit() {
				let expenseDetail = await this.$api.lyfwcwd('expenseDetail');
				this.expenseDetail = expenseDetail.data;
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f9fc;
	}
	
	.ed_image{
		width: 318upx;
		height: 164upx;
		padding-top: 72upx;
		padding-left: 216upx;
	}
	
	//详情
	.ed_view{
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 100%;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 60upx;
		padding: 39upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		
		.vi_text{
			font-size: 34upx;
			font-weight: bold;
		}
		
		.te_view{
			display: flex;
			padding-top: 28upx;
			
			.te_text{
				font-size: 32upx;
				color: #666666;
			}
			
			.te_text2{
				font-size: 32upx;
				color: #666666;
				padding-left: 10upx;
			}
		}
	}
	
	//骑行费用
	.ed_view2{
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 178upx;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 20upx;
		padding: 39upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		
		.vi_text{
			font-size: 34upx;
			font-weight: bold;
		}
		
		.te_text3{
			position: absolute;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			left: 0;
		}
		
		.te_text4{
			position: absolute;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			right: 0;
		}
		
		.te_text5{
			position: absolute;
			padding-top: 80upx;
			font-size: 32upx;
			color: #666666;
			left: 0;
		}
		
		.te_text6{
			position: absolute;
			padding-top: 80upx;
			font-size: 32upx;
			color: #666666;
			right: 0;
		}
	}
	
	//优惠
	.ed_view3{
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 108upx;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 20upx;
		padding: 39upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		
		.vi_text{
			font-size: 34upx;
			font-weight: bold;
		}
		
		.te_text3{
			position: absolute;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			left: 0;
		}
		
		.te_text4{
			position: absolute;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			right: 0;
		}
	}
	
	.ed_view4{
		padding-left: 248upx;
		padding-top: 66upx;
		
		.ed_text{
			font-size: 38upx;
		}
	}
	
	.ed_view5{
		padding-top: 19upx;
		padding-left: 305upx;
		
		.ed_text2{
			font-size: 30upx;
			color: #4281FF;
		}
	}
	
	//顶部
	.po_boxVlew {
		z-index: 999;
		background-color: #FFFFFF;
		border-radius: 28upx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.bv_topText {
		display: flex;
		position: relative;
		padding-top: 48upx;
		padding-left: 51upx;
		padding-right: 51upx;
	
		.tt_text {
			font-size: 38upx;
			margin: 0 auto;
			color: #333333;
		}
	
		.tt_icon {
			position: absolute;
			font-size: 32upx;
			right: 0;
			padding-right: 42upx;
		}
	}
	
	.tt_view{
		padding-left: 42upx;
		padding-right: 42upx;
		padding-top: 20upx;
		
		.tt_tear{
			font-size: 30upx;
			text-align: justify;
			line-height: 47upx;
			color: #333333;
		}
	}
	
	.vi_bottom {
		padding-top: 40upx;
	}
</style>
