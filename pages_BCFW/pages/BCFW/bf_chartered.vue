<template>
	<view class="ho_view">
		<!-- 照片背景图 -->
		<view>
			<image class="ho_imageTop" src="../../static/BCFW/choice/baocheguanggao.jpg" mode="aspectFill"></image>
		</view>

		<!-- 专线/定制 -->
		<view class="ho_queryTickets">
			<view class="qt_typePickerView">
				<view class="qt_typePicker" :class="{'qt_typePickerClick':normalPickerNum == 1}" style="border-top-right-radius: 0;"
				 @tap="typeSelect('normal')">专线</view>
				<view class="qt_typePicker" :class="{'qt_typePickerClick':specialPickerNum == 1}" style="border-top-left-radius: 0;"
				 @tap="typeSelect('special')">定制</view>
			</view>
			
			<!-- 专线 -->
			<view class="ho_ticketView" v-if="normalPickerNum == 1">
				<!-- 选择专线 -->
				<view class="tv_dedicatedLine">
					<view class="dl_choice">专线选择</view>
					<view class="dl_choiceAddress">
						<text class="ca_text1" @tap="startStationTap">{{privateSite}}</text>
						<!-- 嵌套弹框 -->
						<text class="ca_text2" @click="open">专线须知 ></text>
						<uni-popup ref="popup" type="bottom">
							<view class="te_boxVlew">
								<view class="bv_titleView">
									<text class="tv_text1">专线须知</text>
									<text class="tv_text2 jdticon icon-fork " @click="close(1)"></text>
								</view>
								<scroll-view class="bv_content" scroll-y="ture">
									<view class="ct_noticeText">
										<rich-text :nodes="noticeContent.way"></rich-text>
									</view>
								</scroll-view>
							</view>
						</uni-popup>
					</view>

					<!-- 出发时间 -->
					<view class="dl_selectionTime">选择时间</view>
					<view class="dl_time">
						<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}} {{Week}}</text>
					</view>
					<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" :begin-text="'入住'"
					 :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
					
					<!-- 上车点 -->
					<view class="dl_selectionTime">上车点</view>
					<view class="dl_boardingPoint">
						<view class="bp_text">
							<text class="te_text" @click="boardingPointTap" v-model="initialPoint">{{initialPoint}}</text>
						</view>
						<text class="te_text2">仅限专线发车点市内</text>
					</view>
				</view>

				<!-- 按钮 -->
				<view class="tv_vehicleSelection">
					<button class="vs_button" style="width: 640upx;
					height:94upx;
					background:rgba(249,92,117,1);
					box-shadow:0px 7px 38px 8px rgba(216,48,75,0.15);
					"
					 @click="subit">选车型</button>
				</view>

				<!-- 底部 -->
				<view class="tv_bottom">
					<text class="bt_view">选车型</text>
					<text class="bt_view2">></text>
					<text class="bt_view">下单</text>
					<text class="bt_view2">></text>
					<text class="bt_view">确认行程</text>
					<text class="bt_view2">></text>
					<text class="bt_view">司机接送</text>
				</view>
			</view>

			<!-- 定制 -->
			<view class="ho_ticketView" v-if="specialPickerNum == 1">
				<!-- 定制页面 -->
				<view class="tv_dedicatedLine">
					<view class="dl_choice">出发地</view>
					<view class="dl_place">
						<text class="pl_text" @click="boardingPointTap" v-model="initialPoint">{{initialPoint}}</text>
					</view>

					<!-- 目的地 -->
					<view class="dl_choice">目的地</view>
					<view class="dl_place">
						<text class="pl_text" @click="boardingPointTap2" v-model="destination">{{destination}}</text>
					</view>

					<!-- 出发时间 -->
					<view class="dl_selectionTime">出发时间</view>
					<view class="dl_time">
						<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}} {{Week}}</text>
					</view>
					<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" :begin-text="'入住'"
					 :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />

					<!-- 包车天数 -->
					<view class="dl_choice">包车天数</view>
					<picker @change="godetail" :value="index" :range="dayContent">
						<text class="ci_text">{{dayContent[index]}}天</text>
					</picker>
				</view>
				<!-- 第二页面按钮 -->
				<view class="tv_vehicleSelection">
					<button class="vs_button" style="width: 640upx;
						height:94upx;
						background:rgba(249,92,117,1);
						box-shadow:0px 7px 38px 8px rgba(216,48,75,0.15);
						"
					 @click="subit">选车型</button>
				</view>

				<!-- 底部 -->
				<view class="tv_bottom">
					<text class="bt_view">选车型</text>
					<text class="bt_view2">></text>
					<text class="bt_view">下单</text>
					<text class="bt_view2">></text>
					<text class="bt_view">确认行程</text>
					<text class="bt_view2">></text>
					<text class="bt_view">司机接送</text>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniPopup from '@/pages_BCFW/components/BCFW/uni-popup/uni-popup.vue';
	import MxDatePicker from '@/pages_BCFW/components/BCFW/mx-datepicker/mx-datepicker.vue';
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
			MxDatePicker,
		},
		data() {
			return {
				normalPickerNum: 1, //专线tab
				specialPickerNum: 0, //定制tab
				index: 0, //指数
				noticeContent: '', //须知内容
				datestring: '', //当前日期和时间字符串
				datestring2: '', //当前日期和时间字符串
				datestring3: '', //当前日期和时间字符串
				timestring: '',
				timestring2: '',
				timestring3: '',
				privateSite: '', //专线
				initialPoint: '', //起始点
				destination: '', //目的地
				showPicker: false,
				type: 'rangetime',
				value: '',
				Week: '', //周期

				st_Longitude: '', //出发点纬度
				st_Latitude: '', //出发点纬度
				de_Longitude: '', //目的地经度
				de_Latitude: '', //目的地纬度
				dl_Longitude: '', //专线经度
				dl_Latitude: '', //专线经度
				dayContent: [], //选择天数

				isNormal: 0, //判断是普通购票还是定制班车默认是普通购票

				homePageInfo: {
					initialPoint: '', //出发地
					destination: '', //目的地
					datestring: '', //出发时间
					dayContentObject: '', //选择天数
					privateSite: '', //专线
					st_Longitude: '', //出发点纬度
					st_Latitude: '', //出发点纬度
					de_Longitude: '', //目的地经度
					de_Latitude: '', //目的地纬度
					dl_Longitude: '', //专线经度
					dl_Latitude: '', //专线经度
					ct_EndAddress: '', //专线终点
					isNormal: '',
					timer2: '',
					dateParameter:'',

				},
			}
		},
		onLoad() {
			// #ifdef H5
			uni.showToast({
				title: '定位功能在公众号较为缓慢，可步移至小程序或APP下单！',
				icon: 'none',
				duration: 5000
			})
			// #endif

			var that = this;
			if (that.privateSite == '') {
				that.privateSite = '请选择专线'
			}
			if (that.initialPoint == '') {
				that.initialPoint = '请选择上车点'
			}
			if (that.destination == '') {
				that.destination = '请选择目的点'
			}

			// if (that.datestring == '') {
			// 	that.datestring = '请选择时间'
			// }
			that.routeInit();
			that.getTodayDate();
		},

		methods: {
			//---------------------------------模拟接口数据---------------------------------
			async routeInit() {
				let noticeContent = await this.$api.lyfwcwd('noticeContent');
				this.noticeContent = noticeContent.data;
				this.dayContent = noticeContent.data.day;
			},

			//---------------------------------选择天数---------------------------------
			godetail: function(e) {
				// console.log(e)
				this.index = e.target.value;
				this.homePageInfo.dayContentObject = this.dayContent[e.target.value];
			},

			//---------------------------------点击起点站---------------------------------
			startStationTap: function() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.privateSite = '';
					that.privateSite = data.data.ct_dedicatedLine;
					that.ct_EndAddress = data.data.ct_EndAddress;
					that.dl_Latitude = data.data.ct_latitude;
					that.dl_Longitude = data.data.ct_longitude;
					// console.log(that.ct_EndAddress)
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是专线点
					url: './bf_choice?&station=' + 'dedicatedLine'
				})
			},

			//---------------------------------点击上车点---------------------------------
			boardingPointTap() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						uni.setStorage({
							key: 'startlocation',
							data: res,
							success: function() {
								that.initialPoint = res.name;
								that.startLonLat = res.longitude + "," + res.latitude;
								that.st_Longitude = res.longitude;
								that.st_Latitude = res.latitude;
								that.startlocation = res;
								// console.log(that.st_Longitude + "," + that.st_Latitude)
							}
						});
						// uni.getLocation({
						//     type: 'gcj02',
						//     success: function (res) {
						//         console.log('当前位置的经度：' + res.longitude);
						//         console.log('当前位置的纬度：' + res.latitude);
						//     }
						// });
					}
				});
			},

			//---------------------------------点击目的地---------------------------------
			boardingPointTap2() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						uni.setStorage({
							key: 'startlocation',
							data: res,
							success: function() {
								that.destination = res.name;
								that.destinationLonLat = res.longitude + "," + res.latitude;
								that.de_Longitude = res.longitude;
								that.de_Latitude = res.latitude;
								that.destinationLocation = res;
							}
						});
					}
				});
			},

			//------------------------------弹框事件-----------------------------------------

			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},

			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},

			//---------------------------------获取当前日期---------------------------------
			getTodayDate: function() {
				/*
				当前选择时间（必须选择2天后的时间）
				*/
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate() + 2,
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes; //当前年月日时分
				this.datestring = timer; //截取日期
				this.datestring2 = timer.substr(0, 10); //截取日期
				// this.datestring3 = timer.substr(0, 10); //截取日期
				console.log(this.datestring2)
				// console.log(this.timestring)

				/*
				早上6点的时间
				*/
				var date2 = new Date(date);
				date2.setHours(6);
				date2.setMinutes(0);
				var timer4 = (date2.getHours() < 10 ? "0" + date2.getHours() : date2.getHours()) + ':' + (date2.getMinutes() < 10 ?
					"0" + date2.getMinutes() : date2.getMinutes());

				/*
				晚上6点的时间
				*/
				var date3 = new Date(date);
				date3.setHours(18);
				date3.setMinutes(0);
				var timer5 = (date3.getHours() < 10 ? "0" + date3.getHours() : date3.getHours()) + ':' + (date3.getMinutes() < 10 ?
					"0" + date3.getMinutes() : date3.getMinutes());
				this.timestring2 = timer4;
				this.timestring3 = timer5;
				console.log(this.timestring2)
				console.log(this.timestring3)
			},

			//---------------------------------时间日期---------------------------------
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				// this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0, 3));
					this.date = e.value;
					
					if (this.datestring.substr(0, 10) >= this.datestring2) {
						if (this.timestring2 <= this.datestring.substr(11, 16) && this.datestring.substr(11, 16) <= this.timestring3) {
							this.showPicker = false;
						} else {
							this.showPicker = true;
							uni.showToast({
								title: '请选择早上6点至晚上18点的时间',
								icon: 'none'
							})
						}
					} else {
						this.showPicker = true;
						uni.showToast({
							title: '低于指定时间，请重新选择',
							icon: 'none'
						})
					}
				}
			},
			
			//周期
			queryWeek(e) {
				// console.log(e);
				switch (e) {
					case "Mon":
						this.Week = '周一';
						break;
					case "Tue":
						this.Week = "周二";
						break;
					case "Wed":
						this.Week = "周三";
						break;
					case "Thu":
						this.Week = "周四";
						break;
					case "Fri":
						this.Week = "周五";
						break;
					case "Sat":
						this.Week = "周六";
						break;
					case "Sun":
						this.Week = "周日";
						break;
					default:
						break;
				}
			},
			//---------------------------------点击选择类型---------------------------------
			typeSelect(type) {
				if (type == 'normal') { //点击了普通购票
					this.normalPickerNum = 1;
					this.specialPickerNum = 0;
					this.isNormal = 0; //当前是普通购票
				} else if (type == 'special') { //点击了定制班车
					this.normalPickerNum = 0;
					this.specialPickerNum = 1;
					this.isNormal = 1; //当前是定制班车
				}
			},

			//------------------------------提交数据-------------------------------------
			subit: function() {
				// console.log(this.datestring)
				// console.log(this.datestring2)
				if (this.datestring.substr(0, 10) >= this.datestring2 && this.timestring2 <= this.datestring.substr(11, 16) && this.datestring.substr(11, 16) <= this.timestring3) {
					if (this.isNormal == 0) {
						if (this.privateSite == '请选择专线') {
							uni.showToast({
								title: '请选择专线',
								icon: 'none'
							})
						} else if (this.initialPoint == '请选择上车点') {
							uni.showToast({
								title: '请选择上车点',
								icon: 'none'
							})
						} else {
							this.homePageInfo.isNormal = this.isNormal;
							this.homePageInfo.privateSite = this.privateSite;
							this.homePageInfo.initialPoint = this.initialPoint;
							this.homePageInfo.destination = this.destination;
							this.homePageInfo.datestring = this.datestring;
							this.homePageInfo.st_Longitude = this.st_Longitude;
							this.homePageInfo.st_Latitude = this.st_Latitude;
							this.homePageInfo.de_Longitude = this.de_Longitude;
							this.homePageInfo.de_Latitude = this.de_Latitude;
							this.homePageInfo.dl_Longitude = this.dl_Longitude;
							this.homePageInfo.dl_Latitude = this.dl_Latitude;
							this.homePageInfo.ct_EndAddress = this.ct_EndAddress;
							this.homePageInfo.dayContentObject = this.dayContent[this.index];
							this.homePageInfo.dateParameter = this.datestring.substr(0, 10);
							// console.log(this.homePageInfo.dl_Longitude + " " + this.homePageInfo.dl_Latitude)
							// console.log(this.vehicleSelection[this.value])
							uni.setStorage({
								key: 'homePageInfo',
								data: this.homePageInfo,
								success: () => {
									uni.navigateTo({
										url: './bf_choiceVehicleType?isNormal=' + this.isNormal
									})
								}
							})
						}
					} else if (this.isNormal == 1) {
						if (this.initialPoint == '请选择上车点') {
							uni.showToast({
								title: '请选择上车点',
								icon: 'none'
							})
						} else if (this.destination == '请选择目的点') {
							uni.showToast({
								title: '请选择目的点',
								icon: 'none'
							})
						} else if (this.dayContent[this.index] == '请选择') {
							uni.showToast({
								title: '请选择包车天数',
								icon: 'none'
							})
						} else {
							this.homePageInfo.isNormal = this.isNormal;
							this.homePageInfo.privateSite = this.privateSite;
							this.homePageInfo.initialPoint = this.initialPoint;
							this.homePageInfo.destination = this.destination;
							this.homePageInfo.datestring = this.datestring;
							this.homePageInfo.st_Longitude = this.st_Longitude;
							this.homePageInfo.st_Latitude = this.st_Latitude;
							this.homePageInfo.de_Longitude = this.de_Longitude;
							this.homePageInfo.de_Latitude = this.de_Latitude;
							this.homePageInfo.dl_Longitude = this.dl_Longitude;
							this.homePageInfo.dl_Latitude = this.dl_Latitude;
							this.homePageInfo.ct_EndAddress = this.ct_EndAddress;
							this.homePageInfo.dayContentObject = this.dayContent[this.index];
							this.homePageInfo.dateParameter = this.datestring.substr(0, 10);
							// console.log(this.homePageInfo.initialPoint+" "+this.homePageInfo.destination+" "+this.homePageInfo.datestring+" "+this.homePageInfo.dayContentObject)
							// console.log(this.vehicleSelection[this.value])
							uni.setStorage({
								key: 'homePageInfo',
								data: this.homePageInfo,
								success: () => {
									uni.navigateTo({
										url: './bf_choiceVehicleType?isNormal=' + this.isNormal
									})
								}
							})
						}
					}
				} else {
					uni.showToast({
						title: '选择时间比当前时间早，请重新选择！',
						icon: 'none'
					})
				}




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

			onShow() {
				this.getAuthorizeInfo();
			}
		}
	}
</script>

<style lang="scss">
	page,
	.ho_view {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	// 背景图片
	.ho_imageTop {
		width: 100%;
		height: 390upx;
	}

	//查询车票整块
	.ho_queryTickets {
		// background: #FFFFFF;
		// height: 466upx;
		width: 706upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin: 0 auto; //左右边距自适应
		position: relative;
		top: -90upx;
		border-radius: 20upx;
	}

	//选择车票类型 专线/定制
	.qt_typePickerView {
		width: 100%;
		height: 80rpx;
		display: flex;
	}

	//专线/定制
	.qt_typePicker {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #393939;
		color: #FFFFFF;
		opacity: 0.8;
	}

	//专线/定制 点击
	.qt_typePickerClick {
		opacity: 1;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
		color: #000000;
	}

	.ho_ticketView {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		margin-bottom: 62upx;
	}

	//选择专线
	.tv_dedicatedLine {
		padding: 0 40upx;

		.dl_choice {
			display: flex;
			font-size: 32upx;
			color: #5E5E60;
			padding-top: 41upx;
		}

		.dl_choiceAddress {
			display: block;
			padding-top: 39upx;
			padding-bottom: 41upx;
			border-bottom: 1px #F5F5F5 dotted; //虚线

			.ca_text1 {
				font-size: 38upx;
			}

			.ca_text2 {
				z-index: 999;
				float: right;
				font-size: 28upx;
				color: rgba(25, 160, 255, 1);
				padding-top: 7upx;
			}

			//弹框样式
			.te_boxVlew {
				width: 90%;
				padding: 16upx 40upx;
				padding-bottom: 92upx;
				background: #FFFFFF;

				.bv_titleView {
					margin: 24upx 0;

					//弹框标题
					.tv_text1 {
						position: relative;
						font-size: 38upx;
						font-weight: bold;
						top: 8upx;
						margin-bottom: 16upx;
						margin: 0 auto;
					}
				
					.tv_text2 {
						margin-top: 8upx;
						float: right;
						color: #333;
						font-size: 32upx;
					}
				}

				.bv_content {
					height: 800upx;
					line-height: 32upx;

					.ct_noticeText {
						color: #5E5E60;
						text-align: justify;
						line-height: 64upx;
						margin: 32upx 0;
						font-size: 30upx;
					}
				}
			}
		}

		//选择时间样式
		.dl_selectionTime {
			font-size: 32upx;
			color: #5E5E60;
			padding-top: 41upx;
		}

		.dl_time {
			display: flex;
			font-size: 32upx;
			border-bottom: 1px #F5F5F5 dotted; //虚线
			padding: 39upx 0 40upx 0;
		}

		.dl_boardingPoint {
			display: flex;
			position: relative;
			padding: 33upx 0 42upx 0;

			.bp_text {
				width: 350upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.te_text {
					font-size: 38upx;
				}
			}

			.te_text2 {
				position: absolute;
				right: 0;
				// float: right;
				font-size: 28upx;
				color: rgba(25, 160, 255, 1);
				padding-top: 7upx;
			}
		}
	}

	//按钮
	.tv_vehicleSelection {
		display: flex;
		padding: 46upx 30upx 0 30upx;

		.vs_button {
			font-size: 36upx;
			color: rgba(255, 255, 255, 1);
		}
	}

	//底部
	.tv_bottom {
		display: flex;
		position: relative;
		margin: 0 auto;
		z-index: 9;
		padding: 49upx 28upx;

		.bt_view {
			position: relative;
			padding: 17upx 20upx;
			background: rgba(241, 241, 241, 1);
			border-radius: 45upx;
			font-size: 26upx;
			color: rgba(153, 153, 153, 1);
		}

		.bt_view2 {
			font-size: 24upx;
			color: rgba(153, 153, 153, 1);
			padding: 18upx 17upx;
		}
	}

	//出发地
	.dl_place {
		border-bottom: 1px #F5F5F5 dotted; //虚线

		.pl_text {
			display: flex;
			padding: 40upx 0;
			font-size: 38upx;
		}
	}

	.ci_text {
		display: flex;
		padding: 40upx 0;
		font-size: 38upx;
	}
</style>
