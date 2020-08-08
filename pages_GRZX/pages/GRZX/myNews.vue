<template>
	<view class="content">
		<view class="boxClass customerService" @click="navTo('kefu')">
			<image src="../../static/GRZX/kefu.png" class="iconClass"></image>
			<text class="fontStyle">客服消息</text>
			<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
		</view>
	<!-- 	<view class="boxClass goodFriend">
			<image src="../../static/GRZX/haoyou.png" class="iconClass"></image>
			<text class="fontStyle">好友消息</text>
			<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
		</view> -->
		<view class="boxClass push" @click="noticeClick">
			<image src="../../static/GRZX/tuisong.png" class="iconClass"></image>
			<text class="fontStyle">推送</text>
			<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
		</view>
		<view class="boxClass notice" @click="navTo('tongzhi')">
			<image src="../../static/GRZX/tongzhi.png" class="iconClass"></image>
			<text class="fontStyle">通知</text>
			<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			noticeClick(){
				uni.switchTab({
					// url:'/pages/GRZX/notice'
					url:this.$GrzxInter.Route.notice.url,
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
				if(url=="tongzhi" ||url=="kefu"){
					uni.showToast({
				  	title : '开发中',
				  	icon : 'none',
				  })
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.boxClass{
		width: 100%;
		height: 130upx;
		background-color: #FFFFFF;
		display: flex;
		position: relative;
	}
	.iconClass{
		position: absolute;
		left: 4.27%;
		top:25upx;
		width: 10.67%;
		height: 80upx;
	}	
	.fontStyle{
		color: #333333;
		position: absolute;
		left: 19.33%;
		font-size: 35upx;
		line-height: 130upx;
		font-family: SourceHanSansSC-Normal;
	}
	.btnRight{
		position: absolute;
		left: 90%;
		top:50upx;
		height: 40upx;
		width: 40upx;
	}
	.customerService{
		border-top: 2upx solid #F5F5F5;
	}
	.goodFriend{
		margin-top: 28upx;
	}
	.push{
		margin-top: 28upx;
		border-bottom: 2upx solid #F5F5F5;
	}
</style>
