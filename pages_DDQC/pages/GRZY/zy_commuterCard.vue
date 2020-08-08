<template>
	<view>
		<!-- 套餐 @click="natTo('/pages_DDQC/pages/GRZY/combo')" -->
		<view class="ve_view2">
			<image class="vi_image2" src="../../static/GRZY/touxiang.png"></image>
			<text class="ve_text">通勤卡</text>
			<text class="ve_text2">余额</text>
			<text class="ve_text3">￥{{commuterCardCost}}元</text>
			<text class="ve_text4">公交车扫码、达达骑行</text>
			<text class="ve_text5">开通说明</text>
			<image class="vi_image" src="../../static/GRZY/tongqingka.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commuterCardCost:199,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f9fc;
	}
	
	//套餐
	.ve_view2 {
		position: relative;
		width: 694upx;
		height: 270upx;
		border-radius: 10px;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 40upx;
		
		.vi_image2{
			position: absolute;
			width: 94upx;
			height: 94upx;
			padding-top: 50upx;
			padding-left: 40upx;
			z-index: 500;
		}
		
		.ve_text{
			position: absolute;
			font-size:41upx;
			font-weight: 550;
			color: #FFFFFF;
			padding-left: 157upx;
			padding-top: 40upx;
			z-index: 500;
		}
		
		.ve_text2{
			position: absolute;
			font-size:32upx;
			color: #FFFFFF;
			padding-top: 104upx;
			padding-left: 157upx;
			z-index: 500;
		}
		
		.ve_text3{
			position: absolute;
			font-size:32upx;
			color: #FFFFFF;
			padding-top: 104upx;
			padding-left: 246upx;
			z-index: 500;
		}
		
		.ve_text4{
			position: absolute;
			color: #005107;
			font-size: 28upx;
			bottom: 0;
			padding-left: 40upx;
			padding-bottom: 30upx;
			z-index: 500;
		}
		
		.ve_text5{
			position: absolute;
			color: #005107;
			font-size: 28upx;
			bottom: 0;
			right: 0;
			padding-right: 40upx;
			padding-bottom: 30upx;
			z-index: 500;
		}
		
		.vi_image {
			width: 694upx;
			height: 284upx;
			overflow: hidden;
			margin: 0 auto;
		}
	}
</style>
