<template>
	<view>
		<view v-if="print_number==''">
			<view class="ps_view">
				<view class="dl_choice">线路选择</view>
				<view class="lineClass">
					<!-- 起点站 -->
					<view class="start" @tap="startStationTap">{{routeorigin}}</view>
					<image src="../../static/GRZX/change.png" mode="aspectFill" class="changeImage" @click="changeClick"></image>
					<!-- 终点站 -->
					<view class="start" style="text-align: right;" @tap="endStationTap">{{routedestination}}</view>
				</view>
				<view style="border-bottom: 1px #F5F5F5 dotted; //虚线"></view>
				<view class="dl_choice">站点选择</view>
				<view class="dl_choiceAddress">
					<text class="ca_text1" @tap="startStationTap2">{{printSite}}</text>
				</view>
			</view>
			<view class="fb_view2">
				<view class="fb_Text2">上传图片</view>
				<view class="add-img-box">
					<view class="add-img-item" v-for="(item, index) in imgList" :key="index">
						<image class="add-img" @click="imgInfo(index)" :src="item.path" mode="aspectFill"></image>
						<image class="add-img-del" @click="delImg(index)" src="../../static/GRZX/delete.png"></image>
					</view>
					<view v-if="imgList.length < 3 " class="add-img-item" @click="openCamera">
						<image class="add-img" src="../../static/GRZX/add.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view v-if="print_number!=''">
			<view class="ps_view">
				<view class="dl_choice">线路选择</view>
				<view class="lineClass">					
					<view class="start" @tap="startStationTap">{{routeorigin}}</view>
					<image src="../../static/GRZX/change.png" mode="aspectFill" class="changeImage" @click="changeClick"></image>
					<view class="start" style="text-align: right;" @tap="endStationTap">{{routedestination}}</view>
				</view>
				<view style="border-bottom: 1px #F5F5F5 dotted; //虚线"></view>
				<view class="dl_choice">站点选择</view>
				<view class="dl_choiceAddress">
					<text class="ca_text1" @tap="startStationTap2">{{printSite}}</text>
				</view>
			</view>

			<view class="fb_view2">
				<view class="fb_Text2">上传图片</view>
				<view class="add-img-box">
					<view class="add-img-item" v-for="(item, index) in imgList" :key="index">
					<image class="add-img" @click="imgInfo(index)" :src="item" mode="aspectFill"></image>
					<image class="add-img-del" @click="delImg(index)" src="../../static/GRZX/delete.png"></image>
					</view>
					<view v-if="imgList.length < 3 " class="add-img-item" @click="openCamera">
					<image class="add-img" src="../../static/GRZX/add.png"></image>
				</view>

				</view>
			</view>
		</view> -->
		<!-- 		<view class="fb_view3">
			<view class="fb_btn" form-type="submit" @click="submitState">
				<view class="fb_text">提交</view>
			</view>
		</view> -->
		<view class="tjButton" @click="submitState">提交</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import $print from "@/common/print.js"
	var aaa = '';
	var bbb = '';
	var ccc = '';
	export default {
		data() {
			return {
				routeorigin: '', //线路起点
				routedestination: '', //线路终点
				changeText: '',
				printRoute: '',
				printSite: '', //站点名
				imgList: [],
				list: [],
				cloudimgList: [],
				info: [],
				imgCount: 3, //最多支持9张上传，可以修改
				submissionState: false,
				oneImg: '',
				twoImg: '',
				threeImg: '',
				print_number: '',
			}
		},
		onLoad(options) {
			// if (options != '') {
			// 	this.print_number = options.print_number;
			// 	this.getArrayInfo();
			// }
			if (this.routeorigin == '') {
				this.routeorigin = '选择起点'
			}
			if (this.routedestination == '') {
				this.routedestination = '选择终点'
			}
			if (this.printSite == '') {
				this.printSite = '请选择站点'
			}
		},
		methods: {
			//---------------------------------点击起点站---------------------------------
			startStationTap() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.routeorigin = data.data;
					console.log(that.printSite);
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url: 'printRoute?&station=' + 'qidian'
				})
			},
			//---------------------------------点击终点站---------------------------------
			endStationTap() {
				var that = this;
				//监听事件,监听下个页面返回的值，给下车点赋值
				uni.$on('endStaionChange', function(data) {
					// data即为传过来的值
					that.routedestination = data.data;
					//清除监听，不清除会消耗资源
					uni.$off('endStaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是下车点
					url: 'printRoute?&station=' + 'zhongdian',
				})
			},
			//-------------------------点击站点-------------------------------------
			startStationTap2() {
				var that = this;
				if (that.routeorigin == '选择起点' || that.proutedestination == '选择终点') {
					uni.showToast({
						icon: 'none',
						title: '请选择起终点'
					})
				} else {
					//监听事件,监听下个页面返回的值
					uni.$on('printSiteChange', function(data) {
						// data即为传过来的值，给上车点赋值
						that.printSite = data.data;
						//清除监听，不清除会消耗资源
						uni.$off('startstaionChange');
					});
					uni.navigateTo({
						//跳转到下个页面的时候加个字段，判断当前点击的是上车点
						url: 'printSite?&station=' + 'zhandian&&routeorigin=' + that.routeorigin + '&&routedestination=' + that.routedestination,
					})
				}
			},
			//---------------------------------互换起止地址---------------------------------
			changeClick: function() {;
				this.changeText = this.routeorigin;
				this.routeorigin = this.routedestination;
				this.routedestination = this.changeText;
			},
			//-----------上传图片----------------------------------------
			openCamera() {
				uni.chooseImage({
					count: this.imgCount,
					sizeType: ['compressed'],
					success: e => {
						this.imgList = [...this.imgList, ...e.tempFiles];
					}
				});
			},
			imgInfo(i) {
				let tempList = [];
				this.imgList.forEach(img => {
					tempList.push(img.path);
				});
				console.log(tempList);
				console.log(this.imgList)
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			delImg(i) {
				uni.showModal({
					content: '确定删除这张吗',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(i, 1);
							this.imgCount++;
							console.log(this.imgList)
						} else if (res.cancel) {

						}
					}
				});
			},
			submitState: function() {
				var that = this;
				if (that.routeorigin == that.routedestination) {
					uni.showToast({
						icon: 'none',
						title: '起点跟终点不能相同'
					})
				}else if (that.printSite == '请选择站点') {
					uni.showToast({
						icon: 'none',
						title: '请选择站点'
					})
				} else if (that.imgList.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请传入照片'
					})
				} else {
					if (this.submissionState == false) {
						this.submissionState = true;
						this.getimgList();
					} else if (this.submissionState == true) {
						uni.showToast({
							title: '请勿重复点击提交',
							icon: 'none',
							duration: 2000
						})
					}

				}
			},
			getimgList: function() {
				var that = this;
				console.log(that.imgList);
				if (that.imgList.length > 0) {
					uni.saveFile({
						tempFilePath: that.imgList[0].path,
						success: function(res1) {
							console.log(res1);
							pathToBase64(res1.savedFilePath)
								.then(base64 => {
									that.oneImg = base64;
									if (that.imgList.length == 1) {
										that.submit();
									}
								})
						},
					});
				};
				if (that.imgList.length > 1) {
					uni.saveFile({
						tempFilePath: that.imgList[1].path,
						success: function(res2) {
							console.log(res2);
							pathToBase64(res2.savedFilePath)
								.then(base64 => {
									that.twoImg = base64;
									if (that.imgList.length == 2) {
										that.submit();
									}
								})
						},
					});
				};
				if (that.imgList.length > 2) {
					var threeprint = that.imgList[2].path;
					uni.saveFile({
						tempFilePath: threeprint,
						success: function(res3) {
							console.log(res3);
							pathToBase64(res3.savedFilePath)
								.then(base64 => {
									that.threeImg = base64;
									if (that.imgList.length == 3) {
										that.submit();
									}
								})
						},
					});
				};

			},

			submit: function() {
				var that = this;
				that.printRoute = that.routeorigin + '-' + that.routedestination;
				uni.showLoading({
					title: '提交数据中...'
				});
				if (that.oneImg != '') {
					if (that.twoImg == '') {
						that.twoImg = 'http';
					}
					if (that.threeImg == '') {
						that.threeImg = 'http';
					}
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							console.log(res)
							uni.request({
								url: $print.Interface.spt_scenicSpotSetOrder.value,
								method: $print.Interface.spt_scenicSpotSetOrder.method,
								data: {
									userId: res.data.userId,
									printRoute: that.printRoute,
									printSite: that.printSite,
									oneImg: that.oneImg,
									twoImg: that.twoImg,
									threeImg: that.threeImg,

								},
								success: (res) => {
									console.log(res)
									if (res.data.msg == '发表照片成功') {
										uni.hideLoading()
										uni.showToast({
											title: '提交成功',
											success() {
												uni.navigateBack({
													url: './pictureList'
												})
											}
										})
									} else if (res.data.msg == '提交失败2分钟内请勿重复发表照片') {
										uni.hideLoading()
										uni.showToast({
											title: '每次提交请间隔两分钟',
											icon: 'none'
										})
									} else {
										uni.hideLoading()
										uni.showToast({
											title: '提交失败',
											icon: 'none'
										})
									}
								},
								fail: (res) => {
									console.log(res)
									uni.hideLoading()
									uni.showToast({
										title: '提交失败',
										icon: 'none'
									})
								}
							})
						}
					})

				}
			},
			// updateSubmit: function() {
			// 	var that = this;
			// 	console.log(that.imgList);
			// 	console.log(that.oneImg);
			// 		uni.showLoading({
			// 			title: '提交数据中...'
			// 		});
			// 		if (that.oneImg != '') {
			// 			if (that.twoImg == '') {
			// 				that.twoImg = 'http';
			// 			}
			// 			if (that.threeImg == '') {
			// 				that.threeImg = 'http';
			// 			}
			// 			uni.getStorage({
			// 				key: 'userInfo',
			// 				success: (res) => {
			// 					console.log(res)
			// 					uni.request({
			// 						url: $print.Interface.spt_charterUpdate.value,
			// 						method: $print.Interface.spt_charterUpdate.method,
			// 						data: {
			// 							userId: res.data.userId,
			// 							printRoute: '石狮',
			// 							printSite: '晋江',
			// 							oneImg: that.oneImg,
			// 							twoImg: that.twoImg,
			// 							threeImg: that.threeImg,
			// 							Print_number:that.print_number,

			// 						},
			// 						success: (res) => {
			// 							console.log(res)
			// 							if (res.data.msg == '修改成功') {
			// 								uni.hideLoading()
			// 								uni.showToast({
			// 									title: '提交成功',
			// 									icon: 'none',
			// 									success() {
			// 										setTimeout(function() {
			// 											uni.switchTab({
			// 												url: './pictureList'
			// 											})
			// 										}, 2000)
			// 									}
			// 								})
			// 							} else {
			// 								uni.hideLoading()
			// 								uni.showToast({
			// 									title: '提交失败'
			// 								})
			// 							}
			// 						},
			// 						fail: (res) => {
			// 							console.log(res)
			// 							uni.hideLoading()
			// 							uni.showToast({
			// 								title: '提交失败'
			// 							})
			// 						}
			// 					})
			// 				}
			// 			})

			// 		}
			// },
			// getArrayInfo: function() {
			// 	var that = this;
			// 	uni.getStorage({
			// 		key: 'userInfo',
			// 		success: (res) => {
			// 			that.userInfo = res.data;
			// 			uni.request({
			// 				url: $print.Interface.spt_charterDetails.value,
			// 				method: $print.Interface.spt_charterDetails.method,
			// 				data: {
			// 					print_number: that.print_number
			// 				},

			// 				header: {
			// 					'content-type': 'application/json'
			// 				},
			// 				success: (res) => {
			// 					console.log(res);
			// 					if (res.data.msg == '获取成功') {
			// 						that.routeorigin = res.data.data[0].printRoute;
			// 						that.printSite = res.data.data[0].printRoute;
			// 						that.imgList.push(res.data.data[0].oneImg);
			// 						if(res.data.data[0].twoImg!='http'){
			// 							that.imgList.push(res.data.data[0].twoImg);
			// 						if(res.data.data[0].threeImg!='http'){
			// 							that.imgList.push(res.data.data[0].threeImg);
			// 						}	
			// 						}
			// 						console.log(that.imgList)
			// 					}
			// 				}
			// 			})
			// 		},
			// 		fail() {
			// 			//请求数据失败，停止刷新
			// 			uni.stopPullDownRefresh();
			// 			uni.showToast({
			// 				title: '暂无数据，请先登录后查看',
			// 				icon: 'none',
			// 				success: function() {
			// 					uni.redirectTo({
			// 						url: '../GRZX/userLogin?loginType=1&&urlData=2'
			// 					})
			// 				}
			// 			})
			// 		}
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.ps_view {
		width: 100%;
		height: 400upx;
		background: #FFFFFF;

		.dl_choice {
			display: flex;
			font-size: 38upx;
			color: #5E5E60;
			padding-top: 41upx;
			padding-left: 20upx;
		}

		.lineClass {
			display: flex;
			align-items: center;
			justify-items: center;
			padding-left: 50upx;
			padding-right: 50upx;

		}

		//转换图片
		.changeImage {

			width: 57upx;
			height: 59upx;
			padding-top: 44upx;
			margin: 0 auto;
		}

		//出发点
		.start {
			font-size: 32upx;
			font-weight: 300;
			color: #2C2D2D;
			width: 234upx;
			left: 0;
			text-align: left;
			border-bottom: 1upx solid #dadada;
			margin-top: 40rpx;
			padding-bottom: 20rpx;
		}

		.dl_choiceAddress {
			display: block;
			padding-top: 30upx;
			padding-bottom: 21upx;
			padding-left: 20upx;

			.ca_text1 {
				font-size: 32upx;
			}
		}
	}

	.fb_view2 {
		width: 750upx;
		height: 328upx;
		background: #FFFFFF;
		margin-top: 20upx;

		.fb_Text2 {
			font-weight: bold;
			font-size: 30upx;
			padding-left: 34upx;
			padding-top: 30upx;
		}

		.add-img-box {
			display: flex;
			width: 750rpx;
			padding-left: 10rpx;
			flex-direction: row;
			flex-wrap: wrap;
		}

		.add-img-item {
			width: 200rpx;
			height: 200rpx;
			border-radius: 24rpx;
			position: relative;
			padding: 9rpx 0;
			margin-left: 20rpx;
		}

		.add-img {
			width: 200rpx;
			height: 200rpx;
			margin-top: 32upx;
			margin-left: 20upx;
			border-radius: 24rpx;
		}

		.add-img-del {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			right: -23rpx;
			top: 23rpx;
			border-radius: 20rpx;
		}
	}

	.fb_view3 {
		margin-top: 200upx;
		margin-left: 70upx;

		.fb_btn {
			width: 600upx;
			height: 100upx;
			border-radius: 12upx;
			background: #FC4646;
			color: #FFFFFF;
		}

		.fb_text {
			padding-left: 180upx;
			padding-top: 30upx;
			font-size: 32upx;
		}
	}

	.tjButton {
		position: fixed;
		bottom: 100upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #FC4646;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
