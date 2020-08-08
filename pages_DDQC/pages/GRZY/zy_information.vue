<template>
	<view>
		<!-- 顶部文本 -->
		<view>
			<text class="if_topText">因微信满一年订单保护机制，押金无法原路退回，需提供姓名及身份证，进行人工手动退款；注：请确保以下信息真实有效，如因提供的信息错误而导致退押纠纷等情况，达达通不承担任何责任及退款义务</text>
		</view>

		<!-- 持卡人 -->
		<view class="if_cardholder">
			<text class="ch_text">持卡人</text>
			<input name="nickName" class="ch_cardholder" type="text" placeholder-style="#AAAAAA" placeholder="请输入持卡人姓名" v-model="nameText" maxlength="19" @input="onInput('姓名')" />
		</view>

		<!-- 输入银行卡号 -->
		<view class="if_cardNumber">
			<text class="cn_text">卡号</text>
			<input class="cn_card" placeholder="请输入卡号" placeholder-style="#AAAAAA" type="number" maxlength="23" v-model="bankNumber" @input="onInput('卡号')" ></input>
		</view>

		<!-- 选择银行 -->
		<view class="if_selectBank">
			<text class="sb_text">开户银行</text>
			<input name="nickNumber" style="font-size:32upx;padding-left: 60upx;" placeholder-style="#AAAAAA" type="text" v-model="bankName" placeholder="请输入银行" @input="onInput('银行')" />
			<!-- <picker @change="godetail" :value="index" :range="selectBank" range-key="txt">
				<text v-if="selectBank[index].txt=='请选择'" class="tsnrText">{{selectBank[index].txt}}<text class="jdticon icon-xia"></text></text>
				<text v-if="selectBank[index].txt!=='请选择'" class="tsnrText2">{{selectBank[index].txt}}<text class="jdticon icon-xia"></text></text>
			</picker> -->
		</view>
		
		<view class="if_text2">
			<text>注意：开户行需详细到相关支行信息，如：中国建设银行南靖支行、中国银行南靖山城支行</text>
		</view>
		
		<!-- 联系电话 -->
		<view class="if_cardNumber">
			<text class="cn_text">联系电话</text>
			<input class="cn_card" placeholder="请输入联系电话" placeholder-style="#AAAAAA" type="number" maxlength="11" v-model="phoneNumber" @input="onInput('电话')" ></input>
		</view>

		<!-- 须知 -->
		<view class="if_notice">
			<radio class="nt_radio" value="1" :color="'#70c778'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
			<text class="nt_text">我已阅读并同意</text>
			<text class="nt_text2" @click="open">《信用卡还款服务协议》</text>

			<!-- 押金支付弹框 -->
			<uni-popup ref="popup" type="bottom">
				<view class="po_boxVlew">
					<view class="bv_topText">
						<text class="tt_text">押金充值</text>
						<text class="tt_icon jdticon icon-fork " @click="close(1)"></text>
					</view>
					<view class="tt_view">
						<rich-text class="tt_tear" :nodes="expenseDetail.way"></rich-text>
					</view>
					<view class="vi_bottom"></view>
				</view>
			</uni-popup>
		</view>

		<view class="if_btn">
			<view class="bt_text" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import $DDTInterface from '@/common/DDT.js'
	import uniPopup from '@/pages_DDQC/components/GRZY/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				nameText:'',//姓名
				bankNumber:'',//卡号
				bankName:'',//银行
				phoneNumber:'',//电话
				expenseDetail: '',
				selectedValue: 0,
				index: 0,
				selectBank: '',
				detailInfo: {
					bankObject: '', //银行
				},
				currentRefundType:'',//判断当前退款的状态（第一次退款还是退款失败再提交退款）
				ReManualRefundInfo:[],//退款失败信息
			}
		},
		onLoad(res) {
			_self = this;
			this.routeInit();
			_self.currentRefundType = res.refundType;
			if(res.item){
				_self.ReManualRefundInfo = JSON.parse(res.item)
				console.log(_self.ReManualRefundInfo)
			}
		},
		methods: {
			//-----------------读取静态数据json.js-------------------------------
			async routeInit() {
				let selectBank = await this.$api.lyfwcwd('selectBank');
				this.selectBank = selectBank.data;
				let expenseDetail = await this.$api.lyfwcwd('expenseDetail');
				this.expenseDetail = expenseDetail.data;
				// console.log(this.selectBank)
			},

			//------------------------------弹框事件-----------------------------------------

			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},
			//关闭
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},

			//----------------------投诉对象内容点击--------------------------------------
			godetail: function(e) {
				console.log(e)
				this.index = e.detail.value;
				this.detailInfo.bankObject = this.selectBank[e.detail.value];
			},

			//------------------------------同意-点击事件--------------------------------
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
			//输入姓名
			onInput:function(text){
				if(text == '姓名'){
					// console.log(_self.nameText)
				}else if(text == '卡号'){
					// console.log(_self.bankNumber)
				}else if(text == '银行'){
					// console.log(_self.bankName)
				}else if(text == '电话'){
					// console.log(_self.phoneNumber)
				}
			},
			//------------------------------押金充值超一年，提交人工退押金，后台审核--------------------------------
			ManualRefund:function(){
				uni.showLoading({
					title:'正在提交申请...'
				})
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						console.log('用户数据',data)
						uni.request({
							url:$DDTInterface.DDTInterface.ManualRefund.Url,
							method:$DDTInterface.DDTInterface.ManualRefund.method,
							data:{
								Name:_self.nameText,//姓名
								Tel:_self.phoneNumber,//联系电话
								RegistPhone:data.data.phoneNumber,//注册手机号
								Bank:_self.bankName,//开户行
								BankAccounts:_self.bankNumber,//银行账户
								UserID:data.data.userId,//用户id
							},
							success(res) {
								uni.hideLoading();
								console.log(res)
								if(res.data.status == true){
									setTimeout(function(){
										uni.showToast({
											title:res.data.msg,
											complete() {
												uni.navigateBack()
											}
										})
									},1000)
								}else {
									setTimeout(function(){
										_self.myToast(res.data.msg)
									},1000)
								}
							},
							fail(res) {
								uni.hideLoading()
								console.log(res)
							}
						})
					},
					fail(data) {
					}
				})
			},
			//--------------------------------人工退押金失败，重新提交退押金信息--------------------------------
			ReManualRefund:function(){
				console.log('重新提交',_self.ReManualRefundInfo.AID)
				console.log('重新提交',_self.ReManualRefundInfo.Reason)
				uni.showLoading({
					title:'正在提交申请...'
				})
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						uni.request({
							url:$DDTInterface.DDTInterface.ReManualRefund.Url,
							method:$DDTInterface.DDTInterface.ReManualRefund.method,
							data:{
								AID:_self.ReManualRefundInfo.AID,//主键
								Name:_self.nameText,//姓名
								Tel:_self.phoneNumber,//联系电话
								RegistPhone:data.data.phoneNumber,//注册手机号
								Bank:_self.bankName,//开户行
								BankAccounts:_self.bankNumber,//银行账户
								UserID:data.data.userId,//用户id
								LogJson:JSON.stringify(_self.ReManualRefundInfo.Reason),//退款失败的json字符串
							},
							success(res) {
								uni.hideLoading();
								console.log(res)
								if(res.data.status == true){
									uni.showToast({
										title:res.data.msg,
										complete() {
											uni.navigateBack()
										}
									})
								}else {
									setTimeout(function(){
										_self.myToast(res.data.msg)
									},1000)
								}
							},
							fail(res) {
								uni.hideLoading();
								console.log(res)
							}
						})
					},
					fail(data) {
					}
				})
			},
			//----------------------提交人工审核--------------------------------------
			submit:function(){
				if(_self.nameText == ''){
					_self.myToast('姓名不能为空')
				}else if(_self.bankNumber == ''){
					_self.myToast('卡号不能为空')
				}else if(_self.bankName == ''){
					_self.myToast('银行不能为空')
				}else if(_self.bankName.indexOf('支行') == -1){
					// _self.myToast('银行应具体到支行')
					uni.showModal({
						title:'温馨提示',
						content:'请具体到支行,填写错误将导致无法到账',
						showCancel:false
					})
				}else if(_self.phoneNumber == ''){
					_self.myToast('手机号不能为空')
				}else if(_self.selectedValue == 0){
					_self.myToast('请同意服务协议')
				}else {
					if(_self.currentRefundType == '第一次人工退款'){
						//如果当前是第一次人工退款的话，调ManualRefund这个接口
						_self.ManualRefund();
					}else if(_self.currentRefundType == '退款失败重新提交'){
						//如果当前是退款失败重新提交，请在这里调方法
						_self.ReManualRefund();
					}
				}
			},
			myToast:function(title){
				uni.showToast({
					title:title,
					icon:'none'
				})
			}
			// bankNumberInput:function(e){
			// 	this.textNumber = e.replace(/\D+/g, '').replace(/(\d{4})/g, '$1 ').replace(/ $/, '')
			// },
			
			// yhkchange: function(e) {
			// 	var yhkd = e.detail.value;
			// 	var len = yhkd.length
			// 	if((len+1) % 5 == 0){
			// 		yhkd=yhkd+' '
			// 	}
			// 	this.setData({
			// 		yhkhdata: yhkd
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.if_topText {
		display: flex;
		margin: 30upx;
		font-size: 28upx;
		font-weight: bold;
		// text-align: justify;
	}

	//输入银行卡号
	.if_cardNumber {
		display: flex;
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.cn_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.cn_card {
			width: 430upx;
			font-size: 32upx;
			padding-left: 60upx;
		}
	}

	//选择银行
	.if_selectBank {
		display: flex;
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.sb_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.tsnrText {
			display: flex;
			font-size: 32upx;
			padding-left: 60upx;
			color: #AAAAAA;

			.jdticon {
				position: relative;
				top: 9upx;
				left: 20upx;
			}
		}

		.tsnrText2 {
			display: flex;
			font-size: 32upx;
			padding-left: 60upx;

			.jdticon {
				position: relative;
				top: 9upx;
				left: 20upx;
			}
		}
	}

	//持卡人
	.if_cardholder {
		display: flex;
		margin-top: 95upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.ch_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.ch_cardholder {
			font-size: 32upx;
			padding-left: 26upx;
		}
	}

	.if_notice {
		display: flex;
		padding-top: 35upx;

		.nt_radio {
			padding-left: 25upx;
			transform: scale(0.7);
		}

		.nt_text {
			font-size: 28upx;
			padding-top: 8upx;
		}

		.nt_text2 {
			font-size: 28upx;
			color: #4281FF;
			padding-top: 8upx;
			padding-left: 15upx;
		}
	}

	//顶部
	.po_boxVlew {
		z-index: 999;
		background-color: #FFFFFF;
		border-radius: 28upx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.bv_topText {
		display: flex;
		position: relative;
		padding-top: 48upx;
		padding-left: 51upx;
		padding-right: 51upx;

		.tt_text {
			font-size: 38upx;
			margin: 0 auto;
			color: #333333;
		}

		.tt_icon {
			position: absolute;
			font-size: 32upx;
			right: 0;
			padding-right: 42upx;
		}
	}

	.tt_view {
		padding-left: 42upx;
		padding-right: 42upx;
		padding-top: 20upx;

		.tt_tear {
			font-size: 30upx;
			text-align: justify;
			line-height: 47upx;
			color: #333333;
		}
	}

	.if_btn {
		width: 689upx;
		height: 106upx;
		margin-top: 73upx;
		border-radius: 15upx;
		background: #65C36D;
		color: #FFFFFF;
		margin-left: 30upx;
		margin-right: 30upx;

		.bt_text {
			padding-top: 30upx;
			text-align: center;
		}
	}

	.if_text2 {
		padding: 30upx;
		font-size: 28upx;
		color: #E3424B;
	}
</style>
