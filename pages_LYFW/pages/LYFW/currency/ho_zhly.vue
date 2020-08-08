<template>
	<view>
		<!-- 顶部图片 -->
		<view class="zl_topPicture">
			<image class="zl_image" :src="imageIndex[0].imageUrl" mode="aspectFill"></image>
		</view>

		<!-- 顶部点击跳转栏 -->
		<view class="zl_click">
			<view class="zl_topClick">
				<!-- 自由行 -->
				<view class="zl_independentTravel" @click="route1">
					<image class="zl_itImage" src="../../../static/LYFW/currency/ho_zhly/ziyouxin.png"></image>
					<text class="zl_itText">自由行</text>
				</view>
				<!-- 跟团游 -->
				<view class="zl_groupTour" @click="route2">
					<image class="zl_gtImage" src="../../../static/LYFW/currency/ho_zhly/gentuanyou.png"></image>
					<text class="zl_gtText">跟团游</text>
				</view>
				<!-- 景区门票 -->
				<view class="zl_admissionTicket" @click="route3">
					<image class="zl_atImage" src="../../../static/LYFW/currency/ho_zhly/jinqugoupiao.png"></image>
					<text class="zl_atText">景区门票</text>
				</view>
				<!-- 景区商品 -->
				<view class="zl_commodity" @click="route4">
					<image class="zl_coImage" src="../../../static/LYFW/currency/ho_zhly/lvyouchanping.png"></image>
					<text class="zl_coText">旅游产品</text>
				</view>
			</view>
		</view>

		<!-- 消息通告 -->
		<!-- <view class="notice">
			<view class="zl_content">
				<image class="zl_noImage" src="../../../static/LYFW/currency/ho_zhly/xiaoxitonggao.png" mode="aspectFill"></image>
				<view class="zl_noContent">
					<text class="zl_noText">{{Announcement.zl_title}}</text>
					<view class="zl_label">
						<view class="la_label" v-for="(item,index) in Announcement.LabelContent" :key="index" v-if="index<2">
							<text class="la_background" style="background-color: #e2f1fa;border-radius:20px;">{{item.lc_text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 旅游推荐 -->
		<view class="zl_recommend">
			<view>
				<view class="zl_reContent">
					<text class="zl_reTitle">旅游推荐</text>
					<!-- <text class="zl_reMore">更多></text> -->
				</view>
			</view>
			<view class="zl_reContent2">
				<view class="zl_contentImage1">
					<!-- 泉州小西埕 -->
					<view class="ct_content1" @click="godetail(sixPalaceList[0].ticketId)">
						<image class="ct_image1" :src="sixPalaceList[0].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text1" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{sixPalaceList[0].ticketTitle}}</text>
					</view>
					<!-- 稻田摸鱼 -->
					<view class="ct_content2" @click="godetail(sixPalaceList[1].ticketId)">
						<image class="ct_image2" :src="sixPalaceList[1].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text2" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[1].ticketTitle}}</text>
					</view>
				</view>

				<view class="zl_contentImage2">
					<!-- 泉州钟楼 -->
					<view class="ct_content3" @click="godetail(sixPalaceList[2].ticketId)">
						<image class="ct_image3" :src="sixPalaceList[2].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text3" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[2].ticketTitle}}</text>
					</view>
					<!-- 泉州洛阳桥 -->
					<view class="ct_content4" @click="godetail(sixPalaceList[3].ticketId)">
						<image class="ct_image4" :src="sixPalaceList[3].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text4" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[3].ticketTitle}}</text>
					</view>
					<!-- 七彩官畲 -->
					<view class="ct_content5" @click="godetail(sixPalaceList[4].ticketId)">
						<image class="ct_image5" :src="sixPalaceList[4].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text5" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[4].ticketTitle}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 新闻资讯 -->
		<view class="titNp">新闻资讯</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="informationTo(item.aid)">
				<view class="image-wrapper">
					<image :src="item.imageUrl" mode="aspectFill"></image>
				</view>
				<view class="title clamp">{{item.title}}</view>
				<view>
					<image class="Portrait" src="../../../../static/GRZX/missing-face.png" mode="aspectFill"></image>
					<text class="price">{{item.reportTime}}</text>
					<text class="price-zan">阅读{{item.viewsCount+1080}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				imageIndex : '', //banner图片
				Announcement: '', //通知内容
				
				goodsList:{
					reportTime:'',
					title:'',
					imageUrl:'',
					aid:'',
					newsContent:'',
					viewsCount:'',
				},
				
				sixPalaceList: [{
						ticketEnglishName: '',
						ticketId: '',
						ticketTitle: '',
						ticketImage: '',
					}, {
						ticketEnglishName: '',
						ticketId: '',
						ticketTitle: '',
						ticketImage: '',
					}, {
						ticketEnglishName: '',
						ticketId: '',
						ticketTitle: '',
						ticketImage: '',
					}, {
						ticketEnglishName: '',
						ticketId: '',
						ticketTitle: '',
						ticketImage: '',
					},
					{
						ticketEnglishName: '',
						ticketId: '',
						ticketTitle: '',
						ticketImage: '',
					}]
			}
		},
		onLoad() {
			uni.request({
				url:$lyfw.Interface.qg_GetImage.value,
				method:$lyfw.Interface.qg_GetImage.method,
				data:{ 
					model : 2,
					type:'旅游服务banner'
				},
				success:(res) => { 
					// console.log(res)
					this.imageIndex = res.data.data
					
				},
			})
			this.routeInit();
			this.loadData();
		},
		
		onPullDownRefresh: function() {
			this.routeInit();
			this.loadData();
		},
		
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let Announcement = await this.$api.lyfwcwd('Announcement');
				this.Announcement = Announcement.data;
			},

			// routeData: function() {
			// 	uni.request({
			// 		url: 'http://218.67.107.93:9210/api/app/getPackageTourList',
			// 		method: 'POST',
			// 		success: (e) => {
			// 			console.log(e)
			// 		}
			// 	})
			// },

			loadData: function() {
				//请求新闻资讯
				uni.request({
					url:$lyfw.Interface.currency_zhly.value,
					method:$lyfw.Interface.currency_zhly.method,
					success: (e) => {
						// console.log(e)
						this.goodsList = e.data.data;
						
					}
				})
				//请求六宫格数据
				uni.request({
					url:$lyfw.Interface.spt_GetticketSearchByrequestArea.value,
					method:$lyfw.Interface.spt_GetticketSearchByrequestArea.method,
					data: {
						// requestArea : this.regionWeixin,
						requestArea: '泉州市'
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						// console.log(res)
						this.sixPalaceList = res.data.data;
					}
				})
				
				uni.stopPullDownRefresh();
			},

			//资讯详情页
			informationTo: function(e) {
				uni.navigateTo({
					url:'../../../../pages/Home/InformationDetails?aid=' + e
				})
			},
			
			// subit:function(item){
			// 	console.log(item)
			// 	uni.setStorage({
			// 		key: 'ho_ZhlyInforData',
			// 		data: item,
			// 		success: () => {
			// 			uni.navigateTo({
			// 				url: '../../../../pages/Home/InformationDetails'
			// 			})
			// 		}
			// 	})
			// },
			
			//金刚区各模块入口
			route1: function() {
				
				uni.navigateTo({
					url: '../independentTravel/it_list'
				})
			},
			route2: function() {
				
				uni.navigateTo({
					url: '../groupTour/groupTourList'
				})
			},
			route3: function() {
				uni.navigateTo({
					url: '../scenicSpotTickets/ticketsList'
				})
			},
			route4: function() {
				uni.navigateTo({
					url: '../tourismProducts/tp_ticketsList'
				})
			},
			
			//路由整合
			godetail: function(e) {
				uni.navigateTo({
					url: '../scenicSpotTickets/ticketsDetails?ticketId='+e
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	//顶部图片
	.zl_topPicture {
		width: 750upx;
		height: 406upx;

		.zl_image {
			width: 100%;
			height: 100%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	//顶部点击跳转栏
	.zl_click {
		position: absolute;
		background: rgba(255, 255, 255, 1);
		z-index: 2;
		width: 708upx;
		height: 178upx;
		top: 355upx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 12px;
		margin: 0 20upx;

		.zl_topClick {
			display: flex;

			// 自由行
			.zl_independentTravel {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_itImage {
					width: 44upx;
					height: 44upx;
					margin-top: 47upx;
				}

				.zl_itText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}

			//跟团游
			.zl_groupTour {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_gtImage {
					width: 53upx;
					height: 44upx;
					margin-top: 47upx;
				}

				.zl_gtText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}

			//景区门票
			.zl_admissionTicket {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_atImage {
					width: 48upx;
					height: 35upx;
					margin-top: 53upx;
				}

				.zl_atText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 61upx;
				}
			}

			//景区商品
			.zl_commodity {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_coImage {
					width: 42upx;
					height: 41upx;
					margin-top: 50upx;
				}

				.zl_coText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}
		}
	}

	//消息通告
	.notice {
		background: #fff;
		margin-top: 147upx;

		.zl_content {
			display: flex;

			.zl_noImage {
				width: 146upx;
				height: 83upx;
				margin: 47upx 0upx;
				margin-left: 31upx;
			}

			.zl_noContent {

				.zl_noText {
					display: flex;
					font-size: 26upx;
					color: #333333;
					margin-top: 35upx;
					margin-left: 55upx;
				}

				.zl_label {
					display: flex;
					margin-left: 45upx;
					margin-top: 27upx;

					.la_label {
						margin-right: 10upx;

						.la_background {
							background-color: #e2f1fa;
							border-radius: 20px;
							font-size: 24upx;
							color: #7fbbe1;
							padding: 9upx 20upx;
						}
					}
				}
			}
		}
	}

	// 旅游推荐
	.zl_recommend {
		background: #fff;
		margin-top: 147upx;
		padding: 0 31upx;

		.zl_reContent {
			position: relative;
			padding-top: 40upx;

			.zl_reTitle {
				font-size: 32upx;
				color: #333333;
				font-weight: bold;
			}

			.zl_reMore {
				position: absolute;
				padding-right: 31upx;
				padding: 4upx 0;
				right: 0;
				font-size: 24upx;
				color: #5E5E60;
			}
		}

		.zl_reContent2 {
			padding-top: 42upx;
			padding-bottom: 40upx;

			.zl_contentImage1 {
				display: flex;

				// 泉州小西埕
				.ct_content1 {
					display: flex;
					position: relative;
					margin-right: 10upx;

					.ct_image1 {
						width: 454upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text1 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
					}
				}

				// 稻田摸鱼
				.ct_content2 {
					display: flex;
					position: relative;

					.ct_image2 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text2 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}

			.zl_contentImage2 {
				display: flex;
				margin-top: 20upx;

				// 泉州钟楼
				.ct_content3 {
					display: flex;
					position: relative;

					.ct_image3 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text3 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 泉州洛阳桥
				.ct_content4 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image4 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text4 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 七彩官畲
				.ct_content5 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image5 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text5 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}

	/* 南平周边-样式*/
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 360upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: 32upx;
			color: #333;
			line-height: 72upx;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 160px;
		}

		.Portrait {
			width: 40upx;
			height: 40upx;
			opacity: 1;
		}

		.price {
			position: relative;
			font-size: 26upx;
			color: #666;
			left: 54upx;
			top: 32upx;
			max-width: 5;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 76px;
			margin-top: -80upx;
		}

		.price-zan {
			font-size: 24upx;
			color: #666;
			float: right;
			margin-top: 3upx;
		}
	}

	/*通用字体样式*/
	.titNp {
		margin-top: 20upx;
		padding: 32upx;
		color: #333333;
		font-size: 34upx;
		font-weight: bold;
		background: #fff;

	}
</style>
