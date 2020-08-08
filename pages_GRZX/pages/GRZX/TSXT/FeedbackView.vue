<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-view">
			<image src="../../../../static/Home/Search.png" class="search-image"></image>
			<input type="text" placeholder="请输入问题" class="search-input" />
		</view>
		<!-- 猜你想问 -->
		<view class="guess-view">
			<view class="top-text">
				猜你想问
			</view>
			<view class="guess-middle">
				<view v-for="(item,index) in Typetext" :key="index" class="text-list">
					<view v-if="item.check" class="itemClass">{{item.text}}</view>
				</view>
				<view v-if="!openType" class="btnClass" @click="openList">
					<image src="../../../static/GRZX/shangjiantou.png" class="jiantou"></image>
				</view>
				<view v-if="openType" class="btnClass" @click="closeList">
					<image src="../../../static/GRZX/xiajiantou.png" class="jiantou"></image>
				</view>
			</view>
		</view>
		<!-- 插图 -->
		<view class="chatu">
			<!-- <image src="../../static/npzhcx.png" class="npzhcx-image"></image> -->
		</view>
		<!-- 用户评论 -->
		<view class="user-talk">
			<view class="top-text">
				用户评论
			</view>
			<!-- 到时v-for判断写这个地方 -->
			<view>
				<view class="user-talkinfo">
					<!-- <image src="../../static/10053092_111926377363_2.jpg" class="user-topimage"></image> -->
					<text class="user-name">叮当猫</text>
					<text class="user-time">21:10</text>
				</view>
				<view class="talkinfo">
					漳州也是依托旅游拓展经济,希望不要再出什么30天无理由退货了
				</view>
				<view class="user-image-view">
					<!-- <image src="../../static/10053092_111926377363_2.jpg" class="user-image"></image> -->
					<!-- <image src="../../static/qq.png" class="user-image"></image> -->
				</view>
				<view class="huifu">
					<view class="huifu-view">
						<text class="huifu-user">漳州达达通小弟:</text>
						<text class="huifu-info">您好!感谢您的意见和建议，同时感谢您的支持，在今后的使用过程中有任何疑问，可随时拨打400-88-96301向我们进行详细反馈，我们将竭诚24小时为您服务。</text>
						<!-- 评论图片 -->
						<view class="pinglun-image-view" @click="gotoFeedback">
							<!-- <image src="../../static/pinlun.png" class="pinglun-image"></image> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openType:false,//默认关闭
				Typetext: [{
						text: '什么是助力车套餐?',
						check:true
					},
					{
						text: '功能不全,会闪退',
						check:true
					},
					{
						text: '无法按时退款,退款时间延迟?',
						check:true
					},
					{
						text: '优惠力度不大,免单金额怎么处理!',
						check:false
					},
					{
						text: '用户体验不顺畅,提升功能!',
						check:false
					},
					{
						text: '如何自动续费?',
						check:false
					}],
			}
		},
		methods: {
			gotoFeedback:function(){
				uni.navigateTo({
					url:'Feedback'
				})
			},
			openList:function(){
				for(var i=0;i<this.Typetext.length;i++){
					this.Typetext[i].check=true;
				}
				this.openType=true;
			},
			closeList:function(){
				for(var i=0;i<this.Typetext.length;i++){
				if(i>1){
					this.Typetext[i].check=false;
				}
				this.openType=false;
			}
		}
	},
}
</script>

<style>
	page {
		background-color: #F4F6F8;
	}

	.search-view {
		background-color: #FFFFFF;
		margin: 30upx;
		display: flex;
		flex-direction: row;
		border-radius: 24upx;
		padding: 26rpx 28rpx;
	}

	.search-image {
		width: 34upx;
		height: 34upx;
		padding-top: 6upx;
		padding-right: 10upx;
	}

	.search-input {
		
	}

	.guess-view {
		margin: 0upx 30upx 30upx 30upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.top-text {
		font-size: 34upx;
		font-weight: bold;
		color: #333333;
		margin-left: 29upx;
		padding-top: 30upx;
	}

	.guess-middle {
		width: 504upx;
		margin-left: 29upx;
		margin-top: 14upx;
	}
	
	.jiantou{
		width: 28upx;
		height: 13upx;
	}

	.btnClass{
		margin-left: 310upx;
		margin-top: 20upx;
		padding-bottom: 10upx;
	}

	.text-list{
		margin-top: 30upx;
	}

	.chatu {
		margin-left: 28upx;

	}

	.npzhcx-image {
		width: 694upx;
		height: 229upx;
	}

	.user-talk {
		background-color: #FFFFFF;
		height: 949upx;
		border-radius: 20upx;
		margin: 0 30upx 30upx 30upx;
	}

	.user-topimage {
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		margin-top: 7upx;
	}

	.user-talkinfo {
		margin-left: 30upx;
		margin-top: 30upx;
		display: flex;
	}

	.user-name {
		font-size: 32upx;
		color: #333333;
		padding-left: 20upx;
		/* position: absolute;
	left: 154upx;
	top: 1181upx; */
	}

	.user-time {
		font-size: 28upx;
		color: #999999;
		margin-left: 353upx;
		margin-top: 3upx;
		/* 	position: absolute;
	left: 610upx;
	top: 1181upx; */
	}

	.talkinfo {
		width: 544upx;
		height: 83upx;
		margin-left: 124upx;
		font-size: 34upx;
		color: #9F9C9F;
		/* 	position: absolute;
	left: 154upx;
	font-size: 30upx; */
	}

	.user-image-view {
		/* 	position: absolute;
	left: 134upx;
	top: 1379upx; */
		margin-left: 108upx;
		margin-top: 40upx;
	}

	.user-image {
		width: 200upx;
		height: 220upx;
		margin-left: 20upx;
	}

	.huifu {
		width: 539upx;
		height: 295upx;
		background-color: #F5F9FC;
		margin-left: 124upx;
		margin-top: 25upx;
		/* 	position: absolute;
	left: 154upx;
	top: 1631upx; */
	}

	.huifu-view {
		padding: 27upx 42upx 25upx 25upx;
		text-align: justify;
	}

	.huifu-user {
		font-size: 30upx;
		color: #576B95;
	}

	.huifu-info {
		font-size: 30upx;
		color: #999999;
	}

	.pinglun-image-view {
/* 		position: absolute;
		left: 579upx;
		top: 1869upx; */
		margin-left: 420upx;
	}

	.pinglun-image {
		width: 129upx;
		height: 129upx;
	}
	.itemClass{
		font-size: 30upx;
	}
</style>
