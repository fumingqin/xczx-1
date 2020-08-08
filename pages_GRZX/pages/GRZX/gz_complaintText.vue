<template>
	<view>
		<view class="tjButton" @click="jump">投诉</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				or_entrance: 0, //入口编号，订单列表点投诉景区传0
				or_class: '旅游服务', //模块名
				or_name: '黄仙剑', //司机名
				or_nameId: 1, //司机ID
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: './gz_complaintsPage?or_entrance=' + this.or_entrance + '&or_class=' + this.or_class + '&or_name=' + this.or_name +'&or_nameId=' + this.or_nameId
				})
			}
		}
	}
</script>

<style lang="scss">
	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
