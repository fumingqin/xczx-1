<template>
	<view>
		<view>
			<view class="tu_title">充值金额</view>
		</view>
		<view class="moneyView">
			<view class="tu_symbol">￥{{cost}}</view>
			<view class="tu_balance">当前余额￥{{fixed(balance)}}</view>
		</view>
		
		<view style=" width:670upx;margin-left: 40upx; margin-top:10upx;border: 0.8px solid #E2E2E2;"></view>
		<view class="tu_view">
			<view v-for="(item,index) in info" :key="index">
				<view class="tu_square" :class="{current2: value===index}" @click="affirm(index,item[0])">
					<view class="tu_money">￥{{fixed(parseInt(item[0]))}}</view>
					<view class="tu_award">赠送 ￥{{fixed(parseInt(item[1]))}}</view>
				</view>
			</view>
		</view>
		<view class="tu_check" style="margin-right: 40rpx;justify-content: space-between;align-items: center;">
			<checkbox-group @change="checkChange">
				<label style="font-size: 30rpx;font-weight: 300;">
					<checkbox value="cb" :checked="checked == 1 ? true: false"/>同意资金存管协议
				</label>
			</checkbox-group>
			<view class="tu_notice" @click="open()">说明></view>
		</view>
		<uni-popup ref="popup2" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">说明</text>
					<view class="Nb_text2 jdticon icon-fork " @click="close()"></view>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<text class="Nb_text4">
						{{security}}
					</text>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="tu_view2">
			<view class="tv_text">应付金额</view>
			<view class="tv_money">￥{{cost}}</view>
			<view class="tv_atOnceView">
				<view style="text-align: center;margin-top: 20upx;" @click="GetRecharge">立即支付</view>
			</view>
		</view>
	</view>

</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	import uniPopup from "../../components/GRZY/uni-popup/uni-popup.vue"
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				value: 0,
				info:[],
				checked: 0,
				security: '',
				cost: '',
				balance: 0,
				chargeRate: '',
				userInfo: [], //用户信息
				paymentData: [], //支付参数
				prepayid:'',//钱包充值需要的预支付交易会话id
			}
		},
		onLoad() {
			this.getlist();
		},
		onShow() {
			var that = this;
			that.value = 0;
			that.getUserInfo();
			that.getmoney();
		},
		methods: {
			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						console.log('用户数据', data)
						that.userInfo = data.data;
						that.GetPurseDetail();
					},
					fail(data) {}
				})
			},
			//--------------------------获取钱包数据--------------------------
			GetPurseDetail: function() {
				var that = this;
				console.log(that.userInfo.phoneNumber)
				console.log(that.userInfo.userId)
				uni.request({
					url: $DDTInterface.DDTInterface.GetPurseDetail.Url,
					method: $DDTInterface.DDTInterface.GetPurseDetail.method,
					data: {
						phoneNumber: that.userInfo.phoneNumber,
						userID: that.userInfo.userId,
					},
					success(res) {
						uni.hideLoading()
						console.log('获取钱包数据成功', res)
						if (res.status == true && res.msg == '请求成功') {
							that.balance = res.data.data.balance;
							that.chargeRate = res.data.data.chargeRate;
						}
					},
					fail(res) {
						uni.hideLoading()
						console.log('获取钱包数据失败', res)
					}
				})
			},
			//--------------------------钱包充值--------------------------
			GetRecharge: function() {
				var that = this;
				if (that.checked == 0) {
					uni.showToast({
						title: '请勾选协议',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '正在获取支付...',
						icon: 'none'
					})
					uni.request({
						url: $DDTInterface.DDTInterface.GetRecharge.Url,
						method: $DDTInterface.DDTInterface.GetRecharge.method,
						data: {
							channel: 'wechat_app', //微信
							title: '钱包充值',
							body: '钱包充值',
							phoneNumber: that.userInfo.phoneNumber,
							userID: that.userInfo.userId,
							// timeExpire:timestemp,//过期时间(时间戳)
							chargeType: 1, //0:充值押金 1充值钱包
							totalPrice: that.cost * 100, //金额
						},
						success(res) {
							uni.hideLoading();
							console.log('钱包充值返回支付参数成功结果', res)
							if (res.data.status == true) {
								that.paymentData = res.data.data;
								//钱包充值记录需要传入预支付交易会话id
								that.prepayid = res.data.data.prepayid;
								that.payment();
							}else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						},
						fail(res) {
							uni.hideLoading();
							console.log('钱包充值返回支付参数失败', res)
						}
					})
				}
			},
			//--------------------------调起支付--------------------------
			payment: function() {
				var that = this;
				// #ifdef APP-PLUS
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: {
						appid: that.paymentData.appid,
						timestamp: that.paymentData.timestamp,
						noncestr: that.paymentData.noncestr,
						package: 'Sign=WXPay',
						sign: that.paymentData.sign,
						partnerid: that.paymentData.partnerid,
						prepayid: that.paymentData.prepayid,
					},
					success: function(res) {
						console.log(res)
						if (res.errMsg == 'requestPayment:ok') { //成功
							uni.showToast({
								title: '支付成功',
								complete() {
									that.WirteRechargeLog(1);
									that.rechargeCheck(that.paymentData.prepayid);
								}
							})
						} else if (res.errMsg == 'requestPayment:fail errors') { //错误
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none'
							})
							that.WirteRechargeLog(0);
						} else if (res.errMsg == 'requestPayment:fail canceled') { //用户取消
							uni.showToast({
								title: '您取消了支付',
								icon: 'none'
							})
							that.WirteRechargeLog(2);
						}
					},

					fail: function(res) {
						if (res.errMsg == 'requestPayment:errors') { //错误
							setTimeout(function() {
								uni.showToast({
									title: '支付失败，请重新支付',
									icon: 'none'
								})
							}, 1000)
							that.WirteRechargeLog(0);
						} else if (res.errMsg == 'requestPayment:fail') { //用户取消
							setTimeout(function() {
								uni.showToast({
									title: '您取消了支付',
									icon: 'none'
								})
							}, 1000)
							that.WirteRechargeLog(2);
						}
					}
				})
				// #endif
			},
			
			//--------------------------钱包充值记录--------------------------
			WirteRechargeLog: function(state) {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.WirteRechargeLog.Url,
					method: $DDTInterface.DDTInterface.WirteRechargeLog.method,
					data: {
						channel: "wechat_app",
						title: "钱包充值记录",
						body: "钱包充值记录",
						phoneNumber: that.userInfo.phoneNumber,
						chargeType: 1,
						totalPrice: that.cost,
						userID: that.userInfo.userId,
						state: state,
						id: that.prepayid,//预支付交易会话id
					},
					success(res) {
						console.log('钱包充值记录成功',res);
						uni.showLoading()
						setTimeout(function(){
							that.GetPurseDetail();
						},3000)
					},
					fail(res) {
						console.log('钱包充值记录失败',res)
						uni.showLoading()
						setTimeout(function(){
							that.GetPurseDetail();
						},3000)
					}
				})
				that.getmoney();
			},
			//--------------------------充值检测--------------------------
			rechargeCheck:function(prepayId){
				var that = this;
				uni.request({
					url:$DDTInterface.DDTInterface.rechargeCheck.Url,
					method:'POST',
					data:{
						prepayId:prepayId,
						phoneNumber:that.userInfo.phoneNumber,
					},
					success(res) {
						console.log('充值检测成功',res)
						if(res.data.status == true){
							
						}
					},
					fail(res) {
						console.log('充值检测失败',res)
					}
				})
			},
			//--------------------------单选框点击--------------------------
			checkChange: function() {
				if (this.checked == 0) {
					this.checked = 1;
				} else {
					this.checked = 0;
				}
			},
			//-----------------查看充值套餐及用户余额-------------------------
			getmoney: function() {
				var that = this;
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						uni.request({
							url: $DDTInterface.DDTInterface.GetPurseDetail.Url,
							method: $DDTInterface.DDTInterface.GetPurseDetail.method,
							data: {
								phoneNumber:that.userInfo.phoneNumber,
								userID:that.userInfo.userId,
							},
							success: (res) => {
								uni.hideLoading()
								console.log(res)
								if (res.data.msg == '请求成功') {
									that.info=[];
									let array=res.data.data.chargeRate.split(';');
									for(var i=0;i<array.length;i++){			
										that.info.push(array[i].split('&'));
									}	
									that.cost=that.info[0][0];
									that.balance = res.data.data.balance/100;
								}
							},
							fail(res) {
								uni.hideLoading()
								console.log(res)
							}
						})
					}
				})
					
			},

			fixed(e) {
				if (e >= 0) {
					e = e.toFixed(2);
					return e;
				}
			},
			affirm(index, e) {
				this.value = index;
				this.cost = e;
			},
			async getlist() {
				let array = await this.$api.zyxinfo('topupInfo');
				this.security = array.security;
			},

			//打开弹窗
			open() {
				this.$refs.popup2.open()
			},
			close() {
				this.$refs.popup2.close()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f9fc;
	}


	.tu_title {
		margin-top: 40upx;
		margin-left: 38upx;
		font-size: 38upx;
		font-weight: 600;
	}

	.moneyView {
		display: flex;
		align-items: center;
		margin-top: 71rpx;
		justify-content: space-between;
		margin-left: 38upx;
		margin-right: 38rpx;
	}

	.tu_symbol {
		font-size: 38upx;
		font-weight: 600;
	}

	.tu_balance {
		font-size: 32upx;
		font-weight: 300;
	}

	.tu_view {
		display: flex;
		margin-left: 12upx;
		margin-top: 44upx;
		flex-wrap: wrap;

		.tu_square {
			width: 325upx;
			height: 199upx;
			margin-left: 26upx;
			margin-top: 26upx;
			z-index: 28;
			background: #FFFFFF;
			border: 1px solid #E2E2E2;
			border-radius: 12upx;

			&.current2 {
				z-index: 30;
				background-color: #E0FFE3;
				border: 1px solid #65C36D;
				border-radius: 12rpx;
			}
		}

		.tu_money {
			text-align: center;
			margin-top: 47upx;
			font-size: 36upx;
			font-weight: 800;
		}

		.tu_award {
			text-align: center;
			margin-top: 31upx;
			font-size: 28upx;
			font-weight: 300;
		}
	}

	.tu_check {
		margin-top: 44upx;
		margin-left: 37upx;
		display: flex;
		align-items: center;

		.tu_notice {
			font-size: 26upx;
			color: #4281FF;
		}
	}

	//底部信息
	.tu_view2 {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 120upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;

		.tv_text {
			font-size: 26upx;
			font-weight: 400;
			margin-left: 20upx;
		}

		.tv_money {
			font-size: 38upx;
			color: #FC4646;
			font-weight: 400;
		}

		.tv_atOnceView {
			width: 308upx;
			height: 90upx;
			background: #65C36D;
			margin-left: 160upx;
			margin-right: 28upx;
			border-radius: 69upx;
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			text-align: center;
		}
	}

	.boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		z-index: 999;

		.titleView {
			margin: 24upx 0;
			text-align: center;

			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: 300;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text2 {
				width: 20upx;
				height: 20upx;
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox {
			height: 800upx;
			line-height: 32upx;

			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}
</style>
