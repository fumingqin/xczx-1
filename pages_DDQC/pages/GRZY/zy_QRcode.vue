<template>
	<view>
		<view class="qc_top">
			<text class="to_text">公交二维码</text>
		</view>
		<view class="qc_bottom">
			<view style=" width: 400rpx;margin: 0 auto;padding-top: 55rpx;">
				<canvas v-if="index==0 || commuterCardObject=='请选择' || commuterCardObject=='普通会员'" canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
			<view class="bt_view">
				<text class="vi_text">乘车码自动</text>
				<text class="vi_text2" @click="manuRefresh">刷新</text>
			</view>

			<!-- <view class="complaintDX">
				<text class="tsdxText">点击切换通勤卡类别:</text>
				<picker @change="godetail" :value="index" :range="commuterCard.txt">
					<text class="tsnrText">{{commuterCard.txt[index]}}<text class="jdticon icon-you"></text></text>
				</picker>
			</view> -->
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	import uQRCode from '@/pages_DDQC/components/GRZY/uni-qrcode/uqrcode.js';
	export default {
		data() {
			return {
				index: 0,
				userInfo: [], //用户信息
				qrcodeText: 'uQRCode',
				qrcodeSize: 200,
				qrcodeSrc: '',
				setTime: '',
				qr: '',
				loadingTime: '',
				commuterCard: { //详细信息
					txt: '',
				},
				commuterCardObject: '',
				depositStatus: [],
				phoneInfo:[],
				Address:'',
			}
		},

		onLoad() {
			var that = this;
			
			that.getMyLocation();
			
			// that.autoRefresh();
			that.lunBoInit();
			
		},

		//监听页面卸载
		onUnload() {
			var that = this;
			that.RefreshOff();
		},

		onShow() {
			var that = this;
			that.getUserInfo();
		},

		methods: {
			//----------------------读取静态页面json.js-------------------------------

			async lunBoInit() {
				let commuterCard = await this.$api.lyfwcwd('commuterCard');
				this.commuterCard = commuterCard.data;
			},
			getMyLocation:function(){
				var that = this;
				console.log('124356')
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						console.log('地址信息',res)
						var country = res.address.country ? res.address.country : '';
						var province = res.address.province ? res.address.province : '';
						var city = res.address.city ? res.address.city : '';
						var district = res.address.district ? res.address.district : '';
						var street = res.address.street ? res.address.street : '';
						var streetNum = res.address.streetNum ? res.address.streetNum : '';
						var poiName = res.address.poiName ? res.address.poiName : '';
						that.Address = country + province + city + district + street + streetNum + poiName;
					}
				})
			},
			//----------------------内容点击--------------------------------------
			godetail: function(e) {
				uni.showLoading();
				if (this.commuterCard.txt[e.detail.value] == '普通用户') {
					this.index = e.detail.value;
					this.commuterCardObject = this.commuterCard.txt[e.detail.value];
					// console.log('对象', this.commuterCardObject)
					if (this.index == 0) {
						this.QRCodeData();
						clearInterval(this.loadingTime);
						// this.autoRefresh();
					}
				} else if (this.commuterCard.txt[e.detail.value] == '公务员' && this.depositStatus.UserType == '普通用户') {
					uni.showToast({
						title: '您目前不是公务员，请另外选择',
						icon: 'none'
					})
				}
			},

			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						// console.log('用户数据', data)
						that.userInfo = data.data;
						that.QRCodeData();
						that.GetUserByUserID();
						
						//获取系统信息
						uni.getSystemInfo({
							success: function(res) {
								console.log('当前设备信息',res)
								that.phoneInfo = res;
								that.BikeLog();
							}
						});
						// console.log('用户数据', that.userInfo)
						// if(that.userInfo!==''){
						// 	that.QRCodeData();
						// }else if(that.userInfo==''){
						// 	uni.showToast({
						// 		title:"请先登陆",
						// 		mask:true,
						// 		icon:"none"
						// 	})
						// 	setTimeout(function(){
						// 		uni.navigateTo({
						// 			url:"../../../pages/GRZX/userLogin"
						// 		})
						// 	})
						// }
					},
					fail(data) {}
				})
			},

			QRCodeData: function() {
				var that = this;
				uni.request({
					url:$DDTInterface.DDTInterface.GetBusCodeGen.Url,
					method:$DDTInterface.DDTInterface.GetBusCodeGen.method,
					data:{
						phoneNumber:that.userInfo.phoneNumber,
						userID:that.userInfo.userId,
					},
					success(res) {
						// uni.hideLoading()
						// console.log('二维码', res)
						if (res.data.status == true) {
							that.qr = res.data.data.qr;
							that.QRCodeClick(res.data.data.qr);
						}
					},
					fail(res) {
						console.log('获取二维码失败', res)
					}
				})
			},

			//---------------------------自动刷新---------------------------
			// autoRefresh: function() {
			// 	var that = this;
			// 	uni.showLoading()
			// 	that.loadingTime = setInterval(function() {
			// 		// console.log('自动刷新')
			// 		that.QRCodeData();
			// 		// console.log(that.sign)
			// 	}, 15000)
			// },

			//---------------------------刷新关闭---------------------------
			RefreshOff: function() {
				var that = this;
				clearInterval(that.loadingTime)
			},

			//---------------------------生成二维码---------------------------
			QRCodeClick: function(param) {
				var that = this;
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})

				uQRCode.make({
					canvasId: 'qrcode',
					text: param,
					size: that.qrcodeSize,
					margin: 10,
					success: res => {
						that.qrcodeSrc = res
						// that.setTime = setTimeout(function(){
						// 	that.qrcodeSrc = res
						// },10000)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},

			//--------------------点击刷新-----------------------
			manuRefresh: function() {
				let that = this
				// console.log('手动刷新')
				clearInterval(that.qr)
				that.QRCodeData()
			},

			//--------------------读取信息-------------------------
			GetUserByUserID: function() {
				var that = this;
				// console.log(that.userInfo)
				uni.request({
					url: $DDTInterface.DDTInterface.GetUserByUserID.Url,
					method: $DDTInterface.DDTInterface.GetUserByUserID.method,
					data: {
						userID: that.userInfo.userId,
					},
					success(res) {
						// console.log('呀呀呀' + JSON.stringify(res))
						that.depositStatus = res.data.data;
						// console.log(that.depositStatus);
						// if(that.depositStatus==1||that.depositStatus==2){
						// }
					},
					fail(err) {
						console.log('读取信息', err)
					}
				})
			},
			BikeLog:function(){
				var that = this;
				console.log('开始记录')
				
				uni.request({
					url: $DDTInterface.DDTInterface.BikeLog.Url,
					method: $DDTInterface.DDTInterface.BikeLog.method,
					data: {
						UserID: that.userInfo.userId,
						LogType: '二维码',
						PhoneNumber: that.userInfo.phoneNumber,
						Mac: '',
						PhoneBrand: that.phoneInfo.brand,
						Address: that.Address,
						PhoneModel: that.phoneInfo.model,
						SystemType: that.phoneInfo.platform,
						SystemVersion: that.phoneInfo.system,
					},
					success(res) {
						console.log('日志记录成功',res)
					},
					fail(err) {
						console.log('日志记录失败',err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background: -webkit-linear-gradient(top, #9cffbb, #35c762);
	}

	.qc_top {
		background: #35c762;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;
		width: 684upx;
		height: 100%;
		margin-top: 182upx;
		margin-left: 30upx;
		text-align: center;
		padding: 19upx 0;
		box-shadow: 0px 6px 20px 0px rgba(53, 199, 98, 0.53);
		// margin: 0 auto;

		.to_text {
			font-size: 36upx;
			color: #FFFFFF;
			// margin: 0 auto;
		}
	}

	.qc_bottom {
		width: 684upx;
		height: 626upx;
		background-color: #FFFFFF;
		margin-left: 30upx;
		box-shadow: 0px 6px 20px 0px rgba(53, 199, 98, 0.53);
		border-bottom-left-radius: 15upx;
		border-bottom-right-radius: 15upx;

		.bt_view {
			padding-top: 20upx;
			text-align: center;
			padding-bottom: 20upx;

			.vi_text {
				color: #666666;
				font-size: 28upx;
			}

			.vi_text2 {
				color: #1ea2ff;
				font-size: 28upx;
			}
		}
	}

	// 投诉对象样式
	.complaintDX {
		display: flex;
		position: relative;
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-bottom: 20upx;
		padding-top: 20upx;
		margin-left: 30upx;
		margin-right: 30upx;
		text-align: center;
		border-top: 1px #F5F5F5 dotted;

		.tsdxText {
			font-weight: bold;
			font-size: 32upx;
		}

		.tsnrText {
			display: flex;
			position: absolute;
			font-size: 32upx;
			right: 0;
			color: #333333;
			padding-bottom: 32upx;
			padding-left: 20upx;
			// padding-right: 30upx;

			.jdticon {
				position: relative;
			}
		}
	}
</style>
