<template>
	<view>
		<!-- 红色背底 -->
		<view class="cvt_background"></view>
		<!-- 出发内容 -->
		<view class="cvt_setOutContent">
			<view class="cvt_content" :hidden="startingContent==1">
				<view class="ct_departureContents1">
					<view class="ct_content1">目的地 &nbsp;<text class="ct_content2">{{addressContent.ct_EndAddress}}</text></view>
					<view class="ct_content3">上车点 &nbsp;<text class="ct_content4">{{addressContent.initialPoint}}</text></view>
				</view>
				<view class="ct_departureContents2">
					<view class="ct_content5" style="padding-bottom: 40upx;">出发时间 &nbsp;<text class="ct_content6">{{addressContent.datestring}}</text></view>
				</view>
			</view>

			<view class="cvt_content" :hidden="startingContent==0">
				<view class="ct_departureContents1">
					<view class="ct_content1">上车点 &nbsp;<text class="ct_content2">{{addressContent.initialPoint}}</text></view>
					<view class="ct_content3">目的地 &nbsp;<text class="ct_content4">{{addressContent.destination}}</text></view>
				</view>
				<view class="ct_departureContents2">
					<view class="ct_content9">出发时间 &nbsp;<text class="ct_content10">{{addressContent.datestring}}</text></view>
				</view>
				<view class="ct_departureContents2" style="padding-bottom: 40upx;">
					<view class="ct_content7">包车天数 &nbsp;<text class="ct_content8">{{addressContent.dayContentObject}}天</text></view>
				</view>
			</view>
			<!-- 车型选择 -->
			<view class="cvt_vehicleSelection">
				<view class="vs_topContent">
					<text class="tc_text1">车型选择</text>
					<view class="tc_text2">
						<image class="tc_image" src="../../static/BCFW/choice/zhuyi.png" style="wbackground-color: rgba(231,231,231,0.53);width: 40upx;height: 40upx;"></image>
						<text class="tc_text3" @click="open">价格说明</text>
						<uni-popup ref="popup" type="bottom">
							<view class="te_boxVlew">
								<view class="bv_titleView">
									<text class="tv_text1">包车须知</text>
									<text class="tv_text2 jdticon icon-fork " @click="close(1)"></text>
								</view>
								<scroll-view class="bv_content" scroll-y="ture">
									<view v-for="(item,index) in priceExplain" :key="index">
										<text class="ct_text">{{item.title}}</text>
										<view class="ct_noticeText">
											<rich-text :nodes="item.way"></rich-text>
										</view>
									</view>
								</scroll-view>
							</view>
						</uni-popup>
					</view>
				</view>

				<!-- 滑动区域 -->
				<scroll-view class="sr_scroll" scroll-x="true">
					<!-- 顶部滑动 -->
					<view class="sc_topSlide">
						<view v-for="(item,index) in vehicleSelection" :key="index">
							<view class="ts_tab" :class="{current: value===index}" @click="tabClick(index)">{{item.cvt_tabName}}</view>
						</view>
					</view>
				</scroll-view>

				<!-- 选择按钮  :hidden="status==false"-隐藏 -->
				<scroll-view class="sr_scroll" scroll-x="true">
					<view class="sc_selectButton">
						<view v-for="(item,index) in vehicleSelection[value].cvt_cost" :key="index">
							<view class="sb_button" @click="buttonClick(item,index)" :class="{current2: value2===index}">{{item.cvt_price}}元</view>
						</view>
					</view>
				</scroll-view>
				
				<!-- 选择车 -->
				<scroll-view class="sr_scroll" scroll-x="true">
					<view class="sc_choiceCar">
						<view v-for="(item,index) in vehicleSelection[value].cvt_cost[value2].cvt_vehicle" :key="index" @click="carClick(index)">
							<view class="cc_button">
								<view class="cc_image2">
									<image class="cc_image" :src="item.cvt_carImage" mode="aspectFit"></image>
									<!-- <image class="cc_image" src="../../static/1.jpg" mode="aspectFit"></image> -->
									<!-- <image class="cc_image" src="../../static/2.jpg" mode="aspectFit"></image> -->
								</view>
								<view style="padding-top: 15upx;">
									<text class="cc_text" :class="{current3: value3===index}">{{item.cvt_Name}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

				<!-- 选择车 -->
				<!-- <scroll-view class="sr_scroll" scroll-x="true">
					<view class="sc_choiceCar">
						<view v-for="(item,index) in vehicleSelection[value].cvt_cost[value2].cvt_vehicle" :key="index" @click="carClick(index)">
							<view class="cc_button"> 
								<view class="cc_image2">
									<image class="cc_image" :src="item.cvt_carImage" />
								</view>
								<text class="cc_text" :class="{current3: value3===index}">{{item.cvt_Name}}</text>
							</view>
						</view>
					</view>
				</scroll-view> -->

				<!-- 按钮 -->
				<view class="cvt_button">
					<button class="bt_button" :class="{submitColor:value3!==-1}" @click="sbuit">确认用车</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $bcfw from '@/common/BCFW/bcfw.js';
	import uniPopup from '@/pages_BCFW/components/BCFW/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup, //加载多方弹框组件
		},
		data() {
			return {
				startingContent: 0, //0不显示,1显示
				isNormal: 0, //判断是普通购票还是定制班车:1是普通0是定制
				value: 0, //默认值
				value2: 0,
				value3: 0,
				selectedValue: 0, //同意须知的选中值
				// status: false, //隐藏状态
				addressContent: {
					initialPoint: '', //出发地
					destination: '', //目的地
					datestring: '', //出发时间
					dayContentObject: '', //选择天数
					privateSite: '', //专线
					ct_EndAddress:'',
					
				}, //地址内容
				priceExplain: [], //价格须知
				siteWidth: '',
				// carIndex: '', //车的值
				// addressContent:'',

				vehicleSelection: [{
					cvt_tabId: '',
					cvt_tabName: '',

					cvt_cost: [{
						cvt_btId: '',
						cvt_price: '',

						cvt_vehicle: [{
							cvt_carImage: '',
							cvt_Name: '',
							cvt_carNumberSeats: '',
							cvt_carprice: '',
						}],
					}],
				}], //车辆选择

				information: {
					cvt_Name: '',
					cvt_carImage: '',
					cvt_carNumberSeats: '',
					cvt_carprice: '',
				},


			}
		},

		onLoad(options) {
			this.isNormal = options.isNormal;
			this.routeInit();
			this.bcfwData();
		},

		onShow() {
			this.readData();
		},

		methods: {
			//---------------------------------口数据--------------------------------------
			bcfwData: function() {
				uni.request({
					url: $bcfw.Interface.fw_selectVehicle.value,
					method: $bcfw.Interface.fw_selectVehicle.method,
					header: {
						'content-type': 'application/json'
					},

					success: (res) => {
						console.log(this.cvt_vehicle)
						console.log(res)
						this.vehicleSelection = res.data.data;
					}
				})
			},

			//---------------------------------模拟接口数据---------------------------------
			async routeInit() {
				let priceExplain = await this.$api.lyfwcwd('priceExplain');
				this.priceExplain = priceExplain.data;
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

			//------------------------------tab点击事件---------------------------------------
			tabClick: function(e) {
				console.log(e)
				// console.log(vehicleSelection[e])
				// let that = this;
				// this.value = vehicleSelection[e];
				this.value = e;
				if(this.value!==0){
					this.value2 = 0;
				}
				// this.status = true;
			},

			buttonClick: function(item, index) {
				// console.log(a)
				// console.log(index)
				if(item.cvt_vehicle.length !==0){
					this.value2 = index;
					this.value3 = 0;
				}else if(item.cvt_vehicle.length ==0){
					uni.showToast({
						title:'该价位目前无车辆，请选择其他价位',
						icon: 'none',
					},2000)
				}
				
				// var test = item;
				// this.carIndex = test.vehicle;

			},

			carClick: function(res) {
				// console.log(typeof res)
				// var test = res;
				// this.carIndex = test.vehicle;
				this.value3 = res;
				console.log(this.value3)
			},

			//---------------------读取数据-----------------
			readData: function() {
				uni.getStorage({
					key: 'homePageInfo',
					success: (res) => {
						this.addressContent = res.data;
						console.log(res)
						if (this.isNormal == 0) {
							this.startingContent = 0;
						} else {
							this.startingContent = 1;
						}
					}
				}, 500)
			},

			//------------------------------提交数据-------------------------------------
			sbuit: function() {
				// console.log(value3)
				if(this.vehicleSelection[this.value].cvt_cost[this.value2].cvt_vehicle[this.value3].length !==0){
					if (this.value3 !== -1) {
						this.information.cvt_carImage = this.vehicleSelection[this.value].cvt_cost[this.value2].cvt_vehicle[this.value3].cvt_carImage;
						this.information.cvt_Name = this.vehicleSelection[this.value].cvt_cost[this.value2].cvt_vehicle[this.value3].cvt_Name;
						this.information.cvt_carNumberSeats = this.vehicleSelection[this.value].cvt_cost[this.value2].cvt_vehicle[this.value3]
							.cvt_carNumberSeats;
						this.information.cvt_carprice = this.vehicleSelection[this.value].cvt_cost[this.value2].cvt_vehicle[this.value3].cvt_carprice;
					
						// console.log(this.vehicleSelection[this.value])
						uni.setStorage({
							key: 'vehicleInformation',
							data: this.information,
							success: () => {
								uni.navigateTo({
									url: './bf_information?isNormal=' + this.isNormal
								})
							}
						})
					} else {
						uni.showToast({
							title: '请选择包车',
							icon: 'none'
						})
					}
				}else{
					uni.showToast({
						title: '请选择车辆',
						icon: 'none'
					})
				}
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

	//红色背景
	.cvt_background {
		position: absolute;
		text-align: center;
		width: 100%;
		height: 253upx;
		background: rgba(252, 70, 70, 1);
		top: 0;
	}

	.cvt_setOutContent {
		position: relative;
		margin-left: 26upx;
		margin-right: 26upx;
		margin-bottom: 135upx;
		top: 148upx;
	}

	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.cvt_setOutContent {
		top: 64upx;
	}

	/* #endif */

	//出发内容
	.cvt_content {
		width: 698upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 13px;

		//内容样式
		.ct_departureContents1 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			padding-right: 40upx;

			.ct_content1 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content2 {
					// width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.ct_content3 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 329upx;
				// text-align: right;
				// padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content4 {
					// width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}

		//内容样式
		.ct_departureContents2 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			// padding-bottom: 40upx;

			.ct_content5 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				// width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content6 {
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.ct_content7 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 310upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.ct_content8 {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.ct_content9 {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				// width: 310upx;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				// overflow: hidden;

				.ct_content10 {
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
	}

	//车型选择样式
	.cvt_vehicleSelection {
		width: 698upx;
		margin-top: 20upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 13px;

		.vs_topContent {
			position: relative;
			display: flex;
			padding: 31upx 41upx 0 41upx;

			.tc_text1 {
				font-size: 32upx;
				font-weight: bold;
			}
		}

		.tc_text2 {
			position: absolute;
			display: flex;
			right: 41upx;

			.tc_text3 {
				font-size: 28upx;
				color: rgba(153, 153, 153, 1);
			}

			//弹框样式
			.te_boxVlew {
				width: 87%;
				padding: 16upx 51upx;
				padding-bottom: 92upx;
				background: #FFFFFF;
				border-radius: 30rpx;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;

				.bv_titleView {
					margin: 24upx 0;

					//弹框标题
					.tv_text1 {
						position: relative;
						font-size: 38upx;
						font-weight: bold;
						top: 8upx;
						margin-bottom: 16upx;
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

					.ct_text {
						display: flex;
						margin-top: 26upx;
						font-size: 32upx;
						font-weight: bold;
					}

					.ct_noticeText {
						color: #5E5E60;
						text-align: justify;
						line-height: 64upx;
						margin-top: 28upx;
						font-size: 28upx;
					}
				}
			}
		}

		//滑动区域样式
		.sr_scroll {
			padding: 28upx 41upx 0 41upx;
			display: flex;
			width: 89%;
			height: 100%;

			//筛选样式
			.sc_topSlide {
				display: flex;

				.ts_tab {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 88upx;
					width: 230upx;
					font-size: 30upx;
					color: #888;
					z-index: 9;
					position: relative;

					&.current {
						z-index: 10;
						color: #ff0000;

						&:after {
							content: '';
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							width: 104upx;
							height: 0;
							border-bottom: 2upx solid #ff0000;
						}
					}
				}

			}

			//按钮样式
			.sc_selectButton {
				display: flex;

				.sb_button {
					flex: 1;
					border: 1px solid #888;
					border-radius: 12rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30upx;
					height: 72upx;
					width: 212upx;
					color: #888;
					z-index: 20;
					position: relative;
					margin-right: 32upx;
					margin-top: 37upx;

					&.current2 {
						z-index: 30;
						color: #ff0000;
						border: 1px solid #ff0000;
						border-radius: 12rpx;
					}
				}
			}

			.sc_choiceCar {
				display: flex;

				.cc_button {
					flex: 1;
					// display: flex;
					justify-content: center;
					color: #888;
					position: relative;
					margin-right: 32upx;
					margin-top: 30upx;
					z-index: 21;
					
					.cc_image2{
						height: 226upx;
						width: 226upx;
						
						.cc_image {
							height: 100%;
							width: 100%;
							// margin: auto;
						}
					}

					.cc_text {
						display: block;
						bottom: 0;
						font-size: 28upx;
						color: #888;
						z-index: 23;
						// padding-top: 15upx;
						width: 130upx;
						margin:0 auto;
						text-align: center;

						&.current3 {
							z-index: 24;
							color: #ff0000;
							border: 1px solid #ff0000;
							border-radius: 12rpx;
							padding: 5upx;
						}
					}
				}
			}
		}
	}

	//按钮
	.cvt_button {
		display: flex;
		padding: 46upx 41upx 60upx 41upx;

		.bt_button {
			position: relative;
			width: 640upx;
			height: 94upx;
			background-color: #aaa;
			z-index: 25;
			font-size: 36upx;
			color: #FFFFFF;

			&.submitColor {
				z-index: 26;
				background-color: #f95c75;
			}
		}
	}
</style>
