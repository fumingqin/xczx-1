<template>
	<view class="content">

		<!-- 头部信息 -->
		<view class="head u-f-ac">
			<image  class="headIcon" mode="aspectFit"></image>
			<text class="headTitle">体验评级</text>
			<!-- 星级图片 -->
			<view class="starNormal">
				<uni-rate size="18" value="0" @change="onchange" />
			</view>
		</view>
		<!-- 文本框 -->
		<textarea placeholder="请输入评价内容" @blur="blur" :value="textareaValue" />
		<!-- 发布 -->
		<view class="submitView">
			<button class="submitBtn" type="primary" @click="submit">提交</button>
			<slot name="submit"></slot>
		</view>
		
	</view>
</template>

<script>
	import uniRate from '@/pages_CTKY/components/CTKY/StarJudge/uni-rate/uni-rate.vue'
	export default {
		components:{uniRate},
		data() {
			return {
				textareaValue:""
			}
		},
		methods: {
			/**
			 * @name 获取textarea内容
			 */
			blur(e){
				this.infoReceive.textareaValue = e.detail.value
				console.log('输入框',this.textareaValue)
			},
			/**
			 * @name 提交
			 */
			submit(){
				this.$emit('submit',this.infoReceive.textareaValue)
				console.log('提交',this.textareaValue)
			},
			// 点击星星
			onchange(e) {
				// console.log('rate发生改变:' + JSON.stringify(e))
			}
		}
	}
</script>

<style lang="scss">
	/* flex布局 */
	.u-f,.u-f-ac,.u-f-jsb,.u-f-ajc {
		display: flex;
	}
	
	.u-f-ac,.u-f-jsb,.u-f-ajc {
		align-items: center;
	}
	
	.u-f-ajc {
		justify-content: center;
	}
	
	.u-f-jsb {
		justify-content: space-between;
	}
	page,.content {
		height: auto;
		background-color: #F9F9F9;
	}
	// 顶部
	.head {
		height: 100rpx;
		background: #FFFFFF;
	}
	// 头像
	.headIcon {
		width: 70rpx;
		height: 70rpx;
		padding: 0 20rpx;
		border-radius: 35rpx;
	}
	//标题
	.headTitle {
		line-height: 100rpx;
		font-size: 30rpx;
		margin-right: 20rpx;
	}
	//星星
	.starNormal {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padright: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}
	textarea{
		margin-top: 10rpx;
		width: 100%;
		height: 300rpx;
		background: #FFFFFF;
		font-size: 28rpx;
		color: #898989;
		padding: 24rpx;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.submitView{
		padding: 54rpx 30rpx;
	}
	.submitBtn{
		width: 100%;
		height: 80rpx;
		border-radius: 80rpx;
		font-size: 28rpx;
		background: #3682FF;
		line-height: 80rpx;
	}
</style>
