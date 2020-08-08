<template>
	<view>
		<view style="width: 700rpx;font-size: 32rpx;" v-html="consultingService.Body"></view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				consultingService: '',
			}
		},
		onLoad() {
			this.GetNews();
		},
		methods: {
			GetNews: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetNews.Url,
					method: 'POST',
					data: {},
					success(res) {
						if (res.data.status == true) {
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].Type == "计费规则") {
									that.consultingService = res.data.data[i];
									return;
								}
							}
						}
					},
					fail(res) {
						console.log('请求新闻资讯失败', res)
					}
				})
			},
		}
	}
</script>

<style>
	img {
		width: 100%;
	}
</style>
