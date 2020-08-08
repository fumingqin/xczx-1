<template>
	<view>
		<web-view :src="Url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Url: '',
			}
		},
		onShow() {},
		onBackPress(e) {
			uni.switchTab({
				url: "../../../pages/Home/zy_zhcx"
			})
			return true;
		},
		onLoad(value) {
			this.Url = "http://ddt.xmjdt.cn/Coach/OtherLogin?id=" + value.id;
		},
		methods: {

		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}

	#search {
		height: 40px;
	}
</style>
