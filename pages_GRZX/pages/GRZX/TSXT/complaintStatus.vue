<template>
	<view>
		<view class="progress">
			<view class="top-text">
				审核进度
			</view>
			<view class="progress-status">
				<uni-steps :options="options" direction="column" :active='active'></uni-steps>
			</view>
		</view>
		<view class="type">
			<view class="top-text">
				类别
			</view>
			<view class="type-text">
				包车
			</view>
		</view>
		<view class="complaintinfo">
			<view class="top-text">
				投诉内容
			</view>
			<view class="complaintinfo-text">
				用着不舒服，很卡～希望改善功能和用户体验，要不然用户会被吓跑，狠心卸载～多考虑一下用户的意见。
			</view>
		</view>
		<view class="backinfo" v-if="active==2">
			<view class="top-text">
				回复内容 
			</view>
			<view class="complaintinfo-text">
				感谢您的意见，我们衷心为您服务，如有不妥当的地方请多包涵，谢谢您的支持和理解，我们正在完善软件的用户体验。 </view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/pages_GRZX/components/GRZX/uni-steps/uni-steps2.vue'
	export default {
		data() {
			return {
				status:0,
				active: 1,
				options: [{
						title: '已提交',
						
					},
					{
						title: '审核中',
					
					},
					{
						title: '投诉结果',
					}
				]
			}
		},
		components: {
			uniSteps
		},
		onShow(e) {
			console.log(e)
			this.load();
		},
		methods: {
			load(){
				if(this.status==1){
					this.options[2].title="投诉成功";
					this.active=2;
				}
				if(this.status==2){
					this.options[2].title="投诉失败";
					this.active=2;
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #F4F6F8;
	}

	.progress {
		margin: 30upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.progress-status {
		margin-left: 4upx;
		margin-top: 20upx;
	}

	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		font-weight: 551;
	}

	.type {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.complaintinfo {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.backinfo {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.type-text {
		font-size: 32upx;
		color: #999999;
		margin-left: 32upx;
		margin-top: 20upx;
	}

	.complaintinfo-text {
		font-size: 32upx;
		color: #333333;
		text-align: justify;
		color: #606264;
		line-height: 50upx;
		padding: 16rpx 32rpx 0 32rpx;
	}
</style>
