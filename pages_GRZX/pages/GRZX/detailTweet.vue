<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="information.Title"></rich-text>
		</view>
		<view class="time">
			<text>{{formatTime(information.CreateTime)}}</text>
			<!-- <text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text> -->
		</view>
		<view class="content">
			<rich-text :nodes="information.ContentDetail" style="width: 700rpx;"></rich-text>
		</view>
		<!-- <view class="count">
		   <text>游览量：{{information.count}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information:{
					Title:'',
					CreateTime:'',
					ContentDetail:'',
				},
				aid : '',
				imageText : '', //图文
			}
		},
		onLoad() {
			this.getArticleInfo(); 
		},
		onUnload() { //页面关闭时执行
			//------------------清除detailTweet缓存----------------
			uni.removeStorageSync('detailTweet');
		},
		methods: {
			//------------------获取资讯详情----------------
			getArticleInfo:function(){
				var that=this;
				uni.getStorage({
					key:'detailTweet',
					success:(res) =>{
						that.information.Title = res.data.Title;
						that.information.CreateTime = res.data.CreateTime;
						console.log(res.data.ContentDetail);
						that.information.ContentDetail = res.data.ContentDetail.replace(/\< img/g, '<img ');
						that.information.ContentDetail = that.information.ContentDetail.replace(/\<img/g, '<img style="max-width:100%;height:auto;"');
						that.information.ContentDetail = that.information.ContentDetail.replace(/\ style="/g, ' style="max-width:100%;');
						console.log(that.information.ContentDetail);
					},
				})	
			},
			
			//--------------------时间格式化--------------------
			formatTime: function(time) {
				var dateTime = time.replace('T', ' ').slice(0,16);
				if (dateTime.indexOf('1900') > -1) {
					return '';
				} else {
					return dateTime;
				}
			},
		},
	}
</script>

<style lang="scss">
	img{
		width: 100rpx;
	}
	.container {
		display: flex;
		flex-direction: column;
		.title{
			font-size: 40upx;  
			padding: 32upx 32upx;
		}
		.time {
			display: flex; 
			font-size: 30upx; 
			margin-left: 32upx;
			color: #888;
		}
		.imageView{
			padding: 0upx 32upx;
			margin-top: 24upx;
			image{
				width: 686upx;
			}
		}
		
		.content {
			display: flex; 
			padding: 32upx 32upx; 
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
