<template>
	<view class="nodata" v-if="isShow" style="display: flex;width: 100%;">
		<image :src="image" mode="widthFix" class="empty_image"></image>
		<text :style="{color:textColor}">{{ text }}</text>
	</view>
</template>

<script>
export default {
	name: 'emptyData',
	props: {
		//参数声明
		text: {
			type: String,
			default: '暂无数据'
		},
		image: {
			type: String,
			default: '/static/CTKY/empty.png'
		},
		textColor:{
			type: String,
			default: '#999999'
		},
		
		isShow: { 
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.nodata {
	flex-direction: column;
	justify-content: center;
	height: 400rpx;
	margin-top: 200rpx;
	align-items: center;
	color: #555555;
	font-size: 24rpx;
}
.empty_image {
		width: 200rpx !important;
		height: 200rpx;
		margin-bottom: 50rpx;
	}
</style>
