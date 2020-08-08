<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="information[0].title"></rich-text>
		</view>
		<view class="time">
			<text>{{information[0].reportTime}}</text>
			<text style="margin-left:24upx;" :v-if="information[0].author !==''">{{information[0].author}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="imageText"></rich-text>
		</view>
		<view class="count">
			<text>游览量：{{information[0].viewsCount+1080}}</text>
		</view>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				information: {
					title: '', //标题
					reportTime: '', //时间	
					author: '', //作者
					viewsCount: '', //游览量
					newsContent:'',
					aid: '',
				},
				imageText: '', //图文
				aid: '',
			}
		},
		onLoad(options) {
			this.aid = options.aid
			this.getArticleInfo()
		},
		methods: {
			getArticleInfo: function() {
				uni.request({
						url: $lyfw.Interface.home_InformationDetails2.value,
						method: $lyfw.Interface.home_InformationDetails2.method,
						data: {
							aid: this.aid,
						},
						success: (e) => {
							console.log(e)
							this.information = e.data.data;
							// this.imageText = e.data.data[0].newsContent.replace(/\<img/g, '<img style="max-width:50%;height:auto;margin: 2px 0px;" ');
							for (var i = 0; i < e.data.data.length; i++) {
								this.imageText = e.data.data[i].newsContent.replace(/\<img/g, `<img style="max-width:100%;height:auto;margin: 2px 0px;" `);
							}
						}
					});
				// uni.request({
				// 	url: $lyfw.Interface.home_InformationDetails.value,
				// 	method: $lyfw.Interface.home_InformationDetails.method,
				// 	data: {
				// 		aid: this.aid,
				// 	},
				// 	success: (res) => {
				// 		// console.log(res)
				// 	},
				// 	fail: function(err) {
				// 		// console.log(err)
				// 	}
				// })
				
				// uni.getStorage({
				// 	key: 'ho_ZhlyInforData',
				// 	success: (res) => {
				// 		// console.log(res)
				// 		this.information = res.data;
				// 		this.imageText = res.data.newsContent.replace(/\<img/g, '<img style="max-width:100%;height:auto;margin: 2px 0px;" ');

				// 		uni.request({
				// 			url : $lyfw.Interface.home_InformationDetails.value,
				// 			method:$lyfw.Interface.home_InformationDetails.method,
				// 			data:{
				// 				aid:res.data.aid,
				// 			},
				// 			success :(res) =>{
				// 				// console.log(res)
				// 			},
				// 			fail:function(err){
				// 				// console.log(err)
				// 			}
				// 		})
				// 	}
				// });

			},
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;

		.title {
			font-size: 40upx;
			padding: 32upx 32upx;
		}

		.time {
			display: flex;
			font-size: 30upx;
			margin-left: 32upx;
			color: #888;
		}

		.content {
			display: block;
			padding: 32upx 32upx;
			// margin-top: 24upx; 
			font-size: 33upx;
			letter-spacing: 4upx;
			line-height: 48upx;
			color: #444;
			text-align: justify;
		}

		.count {
			margin: 32upx;
			font-size: 30upx;
		}
	}
</style>
