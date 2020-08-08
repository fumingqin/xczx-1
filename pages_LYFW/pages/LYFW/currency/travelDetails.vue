<template>
	<view>
		<!-- 顶部轮播图（可点击进入相册并放大） -->
		<swiper class="swi" circular autoplay>
			<swiper-item class="swiItem" v-for="(item,index) in picList" :key="index" @click="goImgList">
				<image :src="item" />
				<!-- <view class="view">{{imgnumber}}</view> -->
			</swiper-item>
		</swiper>

		<!-- 标题、发布时间-->
		<view class="titleClass">
			<text class="title">{{titleClick.scenicName}}</text>
			<view class="dateCost">
				<view class="date">{{titleClick.date}}
				<!-- <text class="cost1">￥<text class="cost2">{{titleClick.cost}}</text>元</text> -->
				</view>
			</view>
			<!-- <view class="grClass">
				<image class="txImage" :src="titleClick.image" mode="aspectFill"></image>
				<view class="grView">
					<view class="name">{{titleClick.name}}<text class="ladelView" style="background-color: #0CA1DF;">官方</text></view>
					<text class="number">电话：{{titleClick.number}}</text>
				</view>
				<text class="address">|&nbsp;&nbsp;&nbsp;{{titleClick.address}}</text>
			</view> -->
		</view>

		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					景区介绍
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					行程安排
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					费用说明
				</view>
				<view class="screenText" :class="{current:type===3}" @click="tabClick(3)">
					预订须知
				</view>
			</view>
		</view>

		<!-- 景区介绍 -->
		<view v-if="type==0">
			<!-- 内容 -->
			<view class="scenicspotContent">
				<view class="content2">
					<rich-text :nodes="titleClick.productIntroduction"></rich-text>
				</view>
			</view>
		</view>

		<!-- 行程安排 -->
		<view v-if="type==1">
			<view class="scheduling" v-for="(item,index) in information" :key="index">
				<view class="tripTitle">
					<view class="circle" style="background-color: #D8F3FF;">
						<text class="circleDay">D{{item.day}}</text>
					</view>
					<text class="title">{{item.title}}</text>
				</view>
				<view class="contentView">
					<view class="hotel">
						<image class="iconHotel" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/jiudian.png"></image>
						<text class="hotelText">酒店:&nbsp;{{item.hotel}}</text>
					</view>
					<view class="hotel">
						<image class="iconHotel" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/yongcan.png"></image>
						<text class="hotelText">用餐:&nbsp;{{item.dinnerTime}}</text>
					</view>
					<view class="content" v-for="(item2,index2) in item.schedulingContent" :key="index2">
						<view class="informationTitle">
							<view class="titleDian"></view>
							<view class="title2">
								<rich-text :nodes="item2.contentTitle"></rich-text>
							</view>
						</view>
						<view class="informationTime">
							<rich-text :nodes="item2.contentTime"></rich-text>
						</view>
						<view class="informationText">
							<rich-text :nodes="item2.contentText"></rich-text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 费用说明 -->
		<view v-if="type==2">
			<view class="description">
				<view class="costDescription" v-for="(item,index) in costDescription" :key="index">
					<text class="costTitle">{{item.title}}</text>
					<view class="costText">
						<rich-text :nodes="item.way"></rich-text>
					</view>
				</view>
			</view>
		</view>

		<!-- 预定须知 -->
		<view v-if="type==3">
			<view class="preset">
				<view class="presetNeeds">
					<view class="reserve" v-for="(item,index) in reserve" :key="index">
						<text class="reserveTitle">{{item.title}}</text>
						<view class="reserveText">
							<rich-text :nodes="item.way"></rich-text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<!-- <view class="footer">
			<view class="footerPrice">
				<image class="kfIcon" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/kefu.png" @click="godetail"></image>
				<image class="zfIcon" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/zhuanfa.png" type="primary" open-type="share" @click="share"></image>
			</view>
			<view class="submitChange" @click="submit">
				<text class="submit">立即预订</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				contentId: '',
				picList: [], //相册图片数组
				titleClick: [{
					scenicName:'',
					date:'',
					cost:'',
				}], //标题,点击量
				type: 0,
				// arrangeText: [], //行程安排标题内容数组
				information: [{
					day: '',
					dinnerTime: '',
					hotel: '',
					title: '',
					schedulingContent: [{
						contentTitle: '', //标题
						contentTime: '', //时间
						contentText: '', //图文
					}]
				}],
				costDescription: [], //费用明细
				reserve: [], //预定须知
				reserveContent: '', //预定须知内容
			}
		},

		onLoad(options) {
			this.getArticleInfo(options.contentId);
			this.id = options.id;
			this.routeInit();
			// this.getArticleInfo();
			// this.dayInit();
		},

		onNavigationBarButtonTap: function() {
			this.share();
		},

		methods: {
			//读取静态数据json.js
			async routeInit() {
				let description = await this.$api.lyfwcwd('description');
				this.costDescription = description.data;
				let reserve = await this.$api.lyfwcwd('reserve');
				this.reserve = reserve.data;
			},

			//保存图片至本地并打开新页面
			goImgList:function() {
				uni.setStorageSync('imagePiclist', this.picList);
				uni.navigateTo({
					url: './imglist2',
				})
			},

			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				} else if (e == 3) {
					this.type = 3;
				}

			},

			getArticleInfo: function(e) {
				var that = this;
				// uni.request({
				// 	url: 'http://218.67.107.93:9210/api/app/getInformationList',
				// 	method: "POST",
				// 	success:function(res){
				// 		that.information = res.data.data;
				// 		for(var i=0;i<res.data.data.length;i++){
				// 			that.information[i].content = res.data.data[i].content.replace(/\<img/g,'<img style="max-width:100%;height:auto;margin: 2px 0px;" ');
				// 		}
				// 		console.log(res)
				// 	}
				// })

				uni.request({
					url: $lyfw.Interface.gt_travelDetails.value,
					method: $lyfw.Interface.gt_travelDetails.method,
					data: {
						contentId: e,
					},
					success: (res) => {
						// console.log(res)
						that.titleClick = res.data.data;
						// that.costDescription = res.data.data;
						that.picList = res.data.data.ticketImage;
					},
				})

				uni.request({
					url: $lyfw.Interface.gt_travelDetails2.value,
					method: $lyfw.Interface.gt_travelDetails2.method,
					data: {
						contentId: e,
					},
					success: (res) => {
						// console.log(res)
						that.information = res.data.data;
						// for (var i = 0; i < res.data.data.length; i++) {
						// 	that.information[i].schedulingContent.contentText = res.data.data[i].schedulingContent.contentText.replace(
						// 		/\<img/g, '<img style="max-width:100%;height:auto;margin: 2px 0px;" ');
						// }
					}
				})
			},

			//点击跳转付款页面
			submit: function() {
				uni.navigateTo({
					url: '../scenicSpotTickets/orderAdd',
				})
			},

			//点击客服
			godetail: function() {
				uni.showToast({
					title: '你点击了' + this.titleClick.scenicName,
					icon: 'none'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: ''
					})
				}, 500);
			},

			//分享
			share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "pages/LYFW/ouristRoute/travelArrange",
					title: "来自" + this.titleClick.name + "的分享",
					summary: this.titleClick.scenicName,
					imageUrl: this.picList[0].ticketImage,
					success: function() {
						uni.showToast({
							title: '分享成功',
							duration: 3000
						})
					},
					fail: function() {
						uni.showToast({
							title: '分享失败',
							duration: 3000
						})
					}
				});
			},


		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	//轮播图样式
	.swi {
		width: 100%;
		height: 440upx;

		.swiItem {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}


	//标题
	.titleClass {
		position: relative;
		padding-top: 29upx;
		border-radius: 27upx 27upx 0 0;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: -25upx;
		padding-bottom: 47upx; //暂时的，事后有数据了之后要删除

		.title {
			display: flex;
			color: #333333;
			font-size: 44upx;
			font-weight: bold;
			margin-right: 40upx;
			margin-left: 40upx;
			margin-top: 16upx;
		}

		.dateCost {
			padding-top: 29upx;
			padding-left: 40upx;
			padding-right: 40upx;

			.date {
				position: relative;
				display: flex;
				font-size: 28upx;
				color: #aba9aa;

				.cost1 {
					position: absolute;
					font-size: 30upx;
					color: #FC4646;
					right: 0;
					top: -11upx;

					.cost2 {
						font-size: 40upx;
						color: #FC4646;
					}
				}
			}
		}

		.grClass {
			position: relative;
			display: flex;
			margin-top: 60upx;
			margin-left: 40upx;
			margin-right: 40upx;
			padding-bottom: 30upx;

			// padding-right: 40upx;
			.txImage {
				border-radius: 50%;
				width: 88upx;
				height: 88upx;
			}

			.grView {
				margin-left: 25upx;

				.name {
					display: flex;
					font-size: 32upx;
					color: #333333;

					.ladelView {
						border-radius: 5px;
						margin-left: 11upx;
						font-size: 20upx;
						color: #FFFFFF;
						text-align: center;
						width: 80upx;
						height: 35upx;
						line-height: 32upx;
						margin-top: 5upx;
					}
				}

				.number {
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					padding-top: 10upx;
				}
			}

			.address {
				position: absolute;
				font-size: 32upx;
				color: #333333;
				right: 0;
				top: 16upx;
			}
		}

		.ladel {
			display: flex;
			border-radius: 2px;
			font-size: 20upx;
			color: #FFFFFF;
		}
	}

	//筛选样式
	.screen {
		background: #FFFFFF;


		.screenView {
			left: 0;
			display: flex;
			width: 100%;
			height: 97upx;
			background: #fff;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #06B4FD;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #06B4FD;
					}
				}
			}
		}
	}

	// 景区介绍
	.scenicspotContent {
		background: #FFFFFF;
		// padding: 40upx 30upx;
		padding: 0 30upx;
		flex-direction: column;

		.content2 {
			padding-top: 50upx;
			padding-bottom: 106upx;
			letter-spacing: 4upx;
			line-height: 48upx;
			// text-indent:2em;
			text-align: justify;
			font-size: 30upx;

		}
	}


	// 行程安排样式
	.scheduling {
		background: #FFFFFF;
		padding-left: 40upx;
		padding-top: 56upx;
		padding-bottom: 106upx;

		.tripTitle {
			display: flex;

			.circle {
				position: relative;
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
				border: 2px #06B4FD solid;

				.circleDay {
					position: absolute;
					font-size: 28upx;
					color: #06B4FD;
					top: 12upx;
					left: 12upx;
				}
			}

			.title {
				font-size: 40upx;
				color: #333333;
				font-weight: bold;
				padding-left: 31upx;
				padding-top: 5upx;
			}
		}

		.contentView {
			margin-top: 50upx;
			margin-left: 32upx;
			border-left: 2upx dashed rgba(200, 200, 200, 1);

			.hotel {
				padding-left: 71upx;
				padding-bottom: 30upx;

				.iconHotel {
					position: relative;
					width: 39upx;
					height: 33upx;
				}

				.hotelText {
					font-size: 30upx;
					color: #aba9aa;
					margin-left: 18upx;
				}
			}

			.content {
				// display: flex;
				margin-right: 30upx;

				.informationTitle {
					display: flex;
					flex-direction: column;

					.titleDian {
						position: relative;
						width: 18upx;
						height: 18upx;
						background: rgba(6, 180, 253, 1);
						border-radius: 50%;
						top: 32upx;
						left: -9upx;
					}

					.title2 {
						font-size: 32upx;
						padding-right: 15upx;
						font-weight: bold;
						color: #333333;
						padding-left: 46upx;
						line-height: 47upx;
						letter-spacing: 4upx;
						text-align: justify;
					}
				}

				.informationTime {
					margin-top: 25upx;
					font-size: 30upx;
					color: #aba9aa;
					padding-left: 46upx;
					line-height: 47upx;
					letter-spacing: 4upx;

					.time {}
				}

				.informationText {
					font-size: 30upx;
					padding-left: 46upx;
					margin-top: 30upx;
					padding-bottom: 30upx;
					letter-spacing: 4upx;
					line-height: 48upx;
					text-align: justify;
				}
			}
		}
	}

	// 费用说明
	.description {
		background: #FFFFFF;
		padding-bottom: 106upx;

		.costDescription {
			position: relative;
			padding-top: 41upx;

			.costTitle {
				font-weight: bold;
				font-size: 34upx;
				padding-left: 30upx;
			}

			.costText {
				padding-top: 13upx;
				padding-left: 30upx;
				padding-right: 30upx;
				font-size: 30upx;
				color: #5E5E60;
				text-align: justify;
				line-height: 52upx;
			}
		}

	}

	// 预定须知
	.preset {
		.presetNeeds {
			background: #FFFFFF;
			padding-bottom: 106upx;

			.reserve {
				position: relative;
				padding-top: 41upx;

				.reserveTitle {
					font-weight: bold;
					font-size: 34upx;
					padding-left: 30upx;
				}

				.reserveText {
					padding-top: 13upx;
					font-size: 30upx;
					color: #5E5E60;
					line-height: 52upx;
					padding-left: 30upx;
					padding-right: 30upx;
					text-align: justify;
				}
			}
		}
	}

	//底部
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.footerPrice {
			padding-left: 55upx;

			.kfIcon {
				// position: relative;
				width: 40upx;
				height: 36upx;
				color: rgba(44, 45, 45, 1);
				// top: 7upx;
			}

			.zfIcon {
				padding-left: 50upx;
				width: 32upx;
				height: 33upx;
				color: rgba(44, 45, 45, 1);
			}
		}

		.submitChange {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			background: #06B4FD;

			.submit {
				color: #fff;
				font-size: 32upx;
			}
		}
	}
</style>
