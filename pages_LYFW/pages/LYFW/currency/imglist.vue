<template>
	<view>
		<view class="pic_list">
			<view @tap="clickPic(y)" v-for="(x, y) in picList" :key="x">
				<image :src="x.ticketImage"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			picList: [],
		};
	},
	onLoad(query) {
		// 获取图片列表数据
		this.picList=uni.getStorageSync("imagePiclist"); 
	},
	onUnload() {
		uni.removeStorageSync("imagePiclist");
		uni.removeStorageSync("currentImgIndex");
	},
	methods: {
		clickPic(index) {
			uni.setStorageSync("currentImgIndex",index);
			uni.navigateTo({
				url: 'imgPreview'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pic_list {
	display: flex;
	flex-flow: row wrap;
	> view {
		flex: 0 0 240rpx;
		height: 240rpx;
		margin: 7.5rpx 0 0 7.5rpx;
		> image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
