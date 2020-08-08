<template>
	<view>
		<view class="topSearch">
			<!-- 搜索栏 -->
			<view class="searchTopBox">
				<text  class="locationTxt" @click="oncity">{{regionWeixin}}<text class="icon jdticon icon-xia"></text></text>
				<view class="searchBoxRadius">
					<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区名称" />
					<image class="searchImage" src="../../../static/LYFW/currency/search.png" />
				</view>
			</view>

			<!-- 选择地址 -->
			<popup-layer ref="popupRef" :direction="'right'">
				<view style="width:750upx;height: 100%;">
					<citySelect @back_city="backCity"></citySelect>
				</view>
			</popup-layer>

			<!-- 搜索内容 -->
			<view :hidden="searchIndex==0">
				<view class="content2">
					<view class="groupTour2" v-for="(item,index) in searchData" :key="index">
						<view style="
						display: flex;
						padding-bottom: 40upx;
						padding-top: 20upx;
						border-bottom: 1px #F5F5F5 dotted;"
						 v-for="(itemContent,indexContent) in item.content" :key='indexContent' @click="details(itemContent.contentId)">
							<view class="groupContent2">
								<image class="contentImage2" :src="itemContent.contentImage[0]" mode="aspectFill"></image>
							</view>
							<view class="groupText2">
								<text class="contentText2">{{itemContent.contentTitle}}</text>
								<text class="contentLabel2">{{itemContent.contentLabel}}</text>
								<view class="groupCost2">
									<!-- <view class="cost2">￥<text class="contentCost2">{{itemContent.cost}}</text>元</view> -->
									<text class="sellComment2">已售{{itemContent.sell}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- tabs点击切换栏 -->
		<view class="tabsBox">
			<QSTabs :current="current" :tabs="tabs" minWidth="80" @change="change($event)" />
		</view>

		<!-- 内容1 -->
		<view :hidden="current == 1">
			<view class="content" v-for="(item,index) in groupTitle" :key="index">
				<view class="title">
					<view style="background: #00B5FF;width: 56upx;height: 56upx;border-radius:4px;"><text class="titleId">{{item.groupId}}</text></view>
					<text class="contentTitle">{{item.groupTitle}}</text>
				</view>
				<view class="groupTour" v-for="(item2,index2) in item.content" :key="index2" v-if="index2<3" @click="details(item2.contentId)">
					<view class="groupContent">
						<image class="contentImage" :src="item2.contentImage" mode="aspectFill"></image>
					</view>
					<view class="groupText">
						<text class="contentText">{{item2.contentTitle}}</text>
						<text class="contentLabel">{{item2.contentLabel}}</text>
						<view class="groupCost">
							<!-- <view class="cost">￥<text class="contentCost">{{item2.cost}}</text>元</view> -->
							<text class="sellComment">已售{{item2.sell}}</text>
						</view>
					</view>
				</view>
				<view class="findMore" v-if="item.content.length>3">
					<text class="findMoreText" @click="selete(item.content)">查看更多>></text>
				</view>
			</view>
		</view>

		<!-- 筛选内容 -->
		<view :hidden="current == 0 ">
			<view class="content">
				<view class="groupTour" v-for="(item,index) in screenContent" :key="index" @click="details(item.contentId)">
					<view class="groupContent">
						<image class="contentImage" :src="item.contentImage" mode="aspectFill"></image>
					</view>
					<view class="groupText">
						<text class="contentText">{{item.contentTitle}}</text>
						<text class="contentLabel">{{item.contentLabel}}</text>
						<view class="groupCost">
							<!-- <view class="cost">￥<text class="contentCost">{{item.cost}}</text>元</view> -->
							<text class="sellComment">已售{{item.sell}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分类面板 -->
		<view>
			<view class="cate-mask" :class="currentIndex===0 ? 'none' : currentIndex===1 ? 'show' : ''" @click="close">
				<view class="cate-content">
					<scroll-view scroll-y class="cate">
						<view class="cate-list" v-for="item in groupTitle" :key="item.groupId" @click="changeCate(item.content)">
							<text class="cate-Text">{{item.groupId}}&nbsp;&nbsp;{{item.groupTitle}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	import citySelect from '@/components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue';
	import QSTabs from '@/pages_LYFW/components/LYFW/independentTravel/QS-tabs/QS-tabs.vue';
	import uniPopup from '@/pages_LYFW/components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue';
	export default {
		components: {
			citySelect,
			popupLayer,
			QSTabs,
			uniPopup
		},
		data() {
			return {
				contentId: '',
				searchValue: '', //搜索框值
				regionWeixin: '请选择', //微信地区数值
				regionApp: '请选择', //APP地区数值

				searchIndex: 0, //搜索框是否启用状态值
				searchData: '', //搜索后的值
				current: 0, //标题下标
				currentIndex: 0, //弹框默认值

				screenContent: [],

				tabs: ['推荐', '全部'], //选项标题
				groupTitle: [], //内容标题
				cateMaskState: 0, //分类面板展开状态
			}
		},

		onLoad() {
			// #ifdef H5
			uni.showToast({
				title:'公众号当前定位无法启用，已默认定位泉州市',
				icon:'none'
			})
			this.regionWeixin = '泉州市'; //h5无法自动定位，采用手动赋值
			// #endif
			uni.showLoading({
				title:'加载中...',
				icon:'loading'
			})
			// this.routeInit();
			this.Getpostion();
			// #ifdef H5
			this.routeData();
			// #endif
		},
		
		onShow:function(){
			this.getAuthorizeInfo();//检查是否开启定位
		},

		onPullDownRefresh: function() {
			this.routeData(); //请求接口数据
			// setTimeout(function() {
			// 	uni.stopPullDownRefresh(); //停止下拉刷新动画
			// }, 1000);
		},
		

		methods: {
			routeData: function() {
				uni.request({
					url: $lyfw.Interface.gt_groupTourList.value,
					method: $lyfw.Interface.gt_groupTourList.method,
					data: {
						regionWeixin: this.regionWeixin,
					},
					success: (e) => {
						console.log(e)
						if(e.data.status == true){
							this.groupTitle = e.data.data;
							uni.hideLoading()
							uni.stopPullDownRefresh();
						}else{
							uni.hideLoading()
							this.groupTitle = '';
							uni.stopPullDownRefresh();
							uni.showToast({
								title:'该地区暂无自由行数据',
								icon:'none'
							})
							
						}
					},
					fail:function(){
						uni.hideLoading()
						uni.stopPullDownRefresh();
						uni.showToast({
							title:'网络异常，请检查网络后尝试',
							icon:'none'
						})
						
					} 
				})
			},


			//获取定位数据
			Getpostion: function() {
				setTimeout(() => {
						uni.getStorage({
							key: 'wx_position',
							success: (res) => {
								// console.log(res)
								this.regionWeixin = res.data;
								this.routeData(); //请求接口数据
							},
							fail: (res) => {
								// #ifdef APP-NVUE
								uni.showToast({
									title:'请选择地区',
									icon:'none'
								})
								// #endif
							},
						}),
						uni.getStorage({
							key: 'app_position',
							success: (res) => {
								console.log(res)
								if (res.data !== undefined) {
									this.regionWeixin = res.data.city;
									this.routeData(); //请求接口数据
								}
							},
							fail: (res) => {
								// #ifdef APP-NVUE
								uni.showToast({
									title:'请选择地区',
									icon:'none'
								})
								// #endif
							},
							complete: () => {
								this.routeData(); //请求接口数据
							}
						})
				}, 500)

			},

			//打开地区选择器
			oncity() {
				this.$refs.popupRef.show();
			},

			//地区获取
			backCity(e) {
				if (e !== 'no' && e !== 'yes') {
					// console.log(e)
					this.regionWeixin = e.cityName
					this.$refs.popupRef.close();
					this.routeData();
					this.screenIndex = 0;
					this.searchIndex = 0;
				} else if (e == 'yes') {
					// #ifndef APP-PLUS
					uni.getStorage({
						key: 'wx_position',
						success: (res) => {
							// console.log(res)
							this.regionWeixin = res.data;
							this.routeData(); //请求接口数据
						}
					}),
					// #endif
					// #ifdef APP-PLUS
					uni.getStorage({
						key: 'app_position',
						success: (res) => {
							// console.log(res)
							if (res.data !== undefined) {
								this.regionWeixin = res.data.city;
								this.routeData(); //请求接口数据
							}
						}
					})
					// #endif
					this.$refs.popupRef.close();
				} else {
					this.$refs.popupRef.close();
				}
			},

			//搜索框-搜索
			searchNow: function() {
				var that = this;
				if (this.searchValue == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// retuan false;
				}
				//搜索请求
				uni.hideKeyboard()
				uni.showLoading({
					title: '正在搜索',
				})
				uni.request({
					url: $lyfw.Interface.gt_groupTourList2.value,
					method: $lyfw.Interface.gt_groupTourList2.method,
					data: {
						// // #ifndef H5
						// regionWeixin: this.regionWeixin,
						// // #endif
						regionWeixin: this.regionWeixin,
						GroupTitle: this.searchValue,
					},
					header: {
						'content-type': 'application/json'
					},

					success: function(res) {
						console.log(res)
						if (res.data.data) {
							that.searchData = res.data.data;
							// console.log(268, that.searchData)
							that.searchValue = ''
							that.searchIndex = 1;
							// console.log(that.searchData)
							uni.hideLoading()
							uni.stopPullDownRefresh();
						} else if (res.data.status == false) {
							uni.hideLoading()
							uni.stopPullDownRefresh();
							uni.showToast({
								title: '查不到相关景区！如:北京/天津',
								icon: 'none',
								duration: 1500
							});
							that.searchValue = ''

						}
					},
				})
			},


			details: function(e) {
				// console.log(e)
				uni.navigateTo({
					url: '../currency/travelDetails?contentId=' + e
				})
			},


			//tabbar筛选点击
			change(e) {
				// console.log(e)
				if (e == 0) {
					this.current = e;
					this.currentIndex = 0;
				} else if (e == 1) {
					this.current = e;
					this.currentIndex = 1;
				}

			},
			close() {
				this.currentIndex = 0;
			},

			selete(e) {
				// console.log(e)
				uni.setStorage({
					key: 'groupTourContent',
					data: e
				})
				uni.navigateTo({
					url: '/pages/LYFW/groupTour/viewMore'
				})
			},

			changeCate: function(e) {
				this.currentIndex = 1;
				this.screenContent = e;
			},
			
			//------------------------------开启定位功能----------------------------------
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
						// console.log("你允许授权")
					},
					fail() { // 拒绝授权
						that.openConfirm();
						// console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			
			// 获取地理位置
			getLocationInfo() {
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						// console.log(res);
					}
				});
			},
			
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						// console.log(res)
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
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

	.topSearch {
		background-color: #FFFFFF;
		// margin-bottom: 20upx;

		//搜索框
		.searchTopBox {
			display: flex;
			text-overflow: ellipsis; //文本溢出：省略号
			padding: 32upx 32upx;

			.locationTxt {
				color: #333333;
				font-size: 36upx;
				font-weight: bold;
				text-overflow: ellipsis;
				margin-top: 16upx;
				width: 25%;
				text-overflow: ellipsis; //文本溢出：省略号
			}

			/* 向下小图标 */
			.icon {
				font-size: 20upx;
				color: #AAAAAA;
				margin-left: 15upx;
			}

			.searchBoxRadius {
				width: 76%;
				height: 78upx;
				background-color: #fff;
				border-radius: 46upx;
				background: #f5f5f5;

				.searchImage {
					padding-left: 24upx;
					padding-top: 18upx;
					width: 48upx;
					height: 48upx;
				}

				.inputIocale {
					position: absolute;
					height: 72upx;
					padding-top: 4upx;
					padding-left: 88upx;
					font-size: 30upx;
				}

			}
		}

		//Y轴滚动视图
		.Tk_scrollview {
			padding: 16upx 32upx;
			margin: 0 auto;

			.Tk_item {
				display: flex;

				.Tk_image {
					width: 182upx;
					height: 152upx;
					border-radius: 12upx;
					margin: 24rpx 0rpx;
				}

				.Tk_bacg {
					margin-top: 20upx;
					margin-left: 24upx;
				}

				.Tk_text1 {
					display: flex;
					text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
					white-space: nowrap;
					overflow: hidden;
					width: 480upx; //内容宽度
				}

				.Tk_text2 {
					font-size: 26upx;
					margin-top: 16upx;
					color: #AAAAAA;
					display: block; // 让字体换行
				}

				.Tk_text3 {
					font-size: 24upx;
					margin-top: 24upx;
					text-align: right;
					color: #FF6600;
					display: block; // 让字体换行
				}
			}
		}
	}

	//tabs点击
	.tabsBox {
		// z-index: 999;
		position: sticky;
		top: 0;
		// width: 100%;
		// height: 80upx;
		background: #fff;
	}

	//内容1
	.content {
		background-color: #FFFFFF;
		padding: 0upx 32upx;
		padding-top: 39upx;
		margin-bottom: 20upx;

		.title {
			display: flex;

			.titleId {
				color: #FFFFFF;
				font-size: 34upx;
				margin: 0upx 18upx;
				line-height: 53upx;
			}

			.contentTitle {
				margin-left: 12upx;
				color: #333333;
				font-size: 40upx;
				font-weight: bold;
			}
		}

		.groupTour {
			display: flex;
			padding-top: 40upx;
			padding-bottom: 40upx;
			border-bottom: 1px #F5F5F5 dotted;

			.groupContent {

				// display: flex;
				.contentImage {
					width: 228upx;
					height: 190upx;
					border-radius: 8px;
				}
			}

			.groupText {
				margin-left: 25upx;

				.contentText {
					font-size: 32upx;
					font-weight: 40;
					font-family: Source Han Sans SC;
					overflow: hidden; //超出溢出
					-webkit-line-clamp: 2; //限制2行
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-align: justify;
				}

				.contentLabel {
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					margin-top: 21upx;
				}

				.groupCost {
					margin-top: 12upx;
					display: flex;
					position: relative;

					.cost {
						font-size: 28upx;
						color: #FF6600;

						.contentCost {
							font-size: 36upx;
							color: #FF6600;
						}
					}

					.sellComment {
						position: absolute;
						font-size: 28upx;
						line-height: 53upx;
						color: #aba9aa;
						right: 0;
					}
				}
			}
		}

		.findMore {
			padding: 38upx 259upx;

			.findMoreText {
				font-size: 30upx;
				color: #aba9aa;
			}
		}
	}


	/* 分类 */
	.cate-mask {
		// z-index: 999;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
			z-index: 96;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate {
		.cate-list {
			display: block;
			padding: 40upx 40upx;
			border-bottom: 1px #F5F5F5 dotted;

			.cate-Text {
				color: #333333;
				font-size: 34upx;
			}
		}
	}

	//内容1
	.content2 {
		padding: 0upx 32upx;
		margin-bottom: 20upx;

		.groupTour2 {
			border-bottom: 1px #F5F5F5 dotted;

			.groupContent2 {

				.contentImage2 {
					width: 228upx;
					height: 190upx;
					border-radius: 8px;
				}
			}

			.groupText2 {
				margin-left: 25upx;

				.contentText2 {
					font-size: 32upx;
					font-weight: 40;
					font-family: Source Han Sans SC;
					overflow: hidden; //超出溢出
					-webkit-line-clamp: 2; //限制2行
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-align: justify;
				}

				.contentLabel2 {
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					margin-top: 21upx;
				}

				.groupCost2 {
					margin-top: 12upx;
					display: flex;
					position: relative;

					.cost2 {
						font-size: 28upx;
						color: #FF6600;

						.contentCost2 {
							font-size: 36upx;
							color: #FF6600;
						}
					}

					.sellComment2 {
						position: absolute;
						font-size: 28upx;
						line-height: 53upx;
						color: #aba9aa;
						right: 0;
					}
				}
			}
		}
	}
</style>
