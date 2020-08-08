<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFill"></image>
		
		<!-- 顶部信息
		命名：Dx -->
		<view class="Dx_View">
			<view class="Dx_viewAndView">
			<text class="Dx_title">{{orderInfo.orderType}}</text>
			<text class="Dx_text" :hidden="orderInfo.orderType == '待支付' || orderInfo.orderType == '已取消' || orderInfo.orderType == '已退票' || orderInfo.orderType == '支付超时'  " >预订成功，旅途愉快！</text>
			<image class="Dx_image" src="../../../static/LYFW/scenicSpotTickets/orderDetails/gantan.png" @click="open"></image>
			<text class="Dx_price" @click="open" >{{orderInfo.orderActualPayment}}</text>
			<text class="Dx_priceIcon" @click="open">¥</text>
			<text class="Dx_remarks">订单编号：{{orderInfo.orderNumber}}</text>
			</view>
		</view>
		</view> 
		
		<!-- 嵌套弹框组件popup -->
		<uni-popup ref="popup" type="bottom">
			<view class="box_Vlew">
			<view class="box_titleView">
				<text class="box_title">费用明细</text>
				<text class="box_icon jdticon icon-fork " @click="close"></text>
			</view>
				<view class="MP_selectionDate">
					<view class="MP_cost" v-if="adultIndex>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultIndex}}</text>
						<text class="MP_userCost">¥{{priceAccuracy(adultTotalPrice)}}</text>
					</view>
					<view class="MP_cost" v-if="childrenIndex>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenIndex}}</text>
						<text class="MP_userCost">¥{{priceAccuracy(childrenTotalPrice)}}</text>
					</view>
				
					<!-- 保险 -->
					<view class="MP_cost" v-if="orderInfo.orderInsure==true">
						<text>太平洋门票意外险 经济款</text>
						<text class="MP_number">×{{orderInfo.length}}</text>
						<text class="MP_total">¥{{orderInfo.orderInsurePrice}}</text>
					</view>
				
					<!-- 优惠券 -->
					<view class="MP_cost" v-if="orderInfo.couponPrice>0">
						<text>{{orderInfo.couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo.couponPrice}}</text>
					</view>
					
					
					
					<view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo.orderActualPayment}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 信息详情 -->
		<!-- 命名：Xx -->
		<view class="Xx_view" >
			<view class="Xx_titleView" @click="route">
				<text class="Xx_title">{{orderInfo.ticketTitle}}</text>
				<text class="Xx_titleIcon"> > </text>
			</view>
			<view class="Xx_contentView"> 
					<text class="Xx_contentTitle" >下单时间</text>
					<text class="Xx_contentTitle2">{{orderInfo.setOrderTime}}</text>
					<view class="Xx_contentBlock">
						<text class="Xx_contentTitle" >使用日期</text>
						<text class="Xx_contentTitle2">{{orderInfo.orderDate}}&nbsp;当天可用</text>
					</view>
					
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >入园时间</text>
					<text class="Xx_contentTitle2">{{orderInfo.ticketOpenUp}}</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >使用方法</text>
					<text class="Xx_contentTitle2">凭身份证或订单二维码扫码入园</text>
				</view>
				
				<!-- 空白二维码区域 -->
				<view class="Xx_QRcodeViewBlank" v-if="orderInfo.orderType == '待支付' || orderInfo.orderType == '已取消' || orderInfo.orderType == '支付超时'">支付后生成二维码及取票码</view>
				
				<!-- 空白二维码区域 -->
				<view class="Xx_QRcodeViewBlank" v-if="orderInfo.orderType == '已退票' || orderInfo.orderType == '已失效'">二维码已失效</view>
				
				<!-- 二维码 -->
				<view class="Xx_QRcodeView" :hidden="orderInfo.orderType == '待支付' || orderInfo.orderType == '已取消' || orderInfo.orderType == '已退票' || orderInfo.orderType == '支付超时' || orderInfo.orderType == '已失效' ">
					<view class="Xx_QRcodeBlock1"> 
						<text class="Xx_QRcodeContentTitle">取票码</text>
					</view>
					<view class="Xx_QRcodeBlock2"> 
						<text class="Xx_QRcodeContent">{{orderInfo.orderTicketNumber}}</text>
					</view>
					<view class="Xx_QRcodeBlock2">
						<canvas canvas-id="qrcode" style="width: 160px; height: 160px; left: 152upx; z-index: 0;"  />
					</view>
					<view class="Xx_QRcodeBlock2">
						<text class="Xx_QRcodeTips">出示二维码，检票入园</text>
					</view>  
				</view>
				
				<!-- 出行人+退改+保险 -->
				<view style="margin-top: 20upx;" v-for="(item,index) in orderInfo.addressData" :key="index">
					<text class="Xx_contentTitle" >出行人</text>
					<text class="Xx_contentTitle2">{{item.userName}}&nbsp;{{item.userType}}</text>
					<view></view>
					<view class="Xx_contentBlock">
						<text class="Xx_contentTitle" >身份证</text>
						<text class="Xx_contentTitle2">{{(item.userCodeNum.substr(0,6))+'******'+(item.userCodeNum.substr(14,18))}}</text>
					</view>
					<view class="Xx_contentBlock">
						<text class="Xx_contentTitle" >手机号</text>
						<text class="Xx_contentTitle2">{{(item.userPhoneNum.substr(0,3))+'****'+(item.userPhoneNum.substr(7,11))}}</text>
					</view>
				</view>
				<view class="Xx_contentBlock" v-if="orderInfo.orderInsure == true">
					<text class="Xx_contentTitle" >附加保险</text>
					<text class="Xx_contentTitle2">太平洋门票意外险 经济款×{{orderInfo.addressData.length}}份</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>	 

<script>
	import uniPopup from "@/pages_LYFW/components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue"
	import uQRCode from "@/common/uqrcode.js"
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				orderInfo : {
						orderNumber:'', //订单编号
						orderStatus:'',  //门票状态
						orderActualPayment: '', //实际付款金额
						orderDateReminder: '', //时间表达（今天，明天，星期X）
						orderDate: '', //数字时间
						orderTicketNumber: '',  //取票号
						orderQrCode : '', //二维码
						orderInsure : '', //是否买保险
						
						ticketId: '', 
						ticketName: '',
						ticketOpenUp: '',
						ticketTitle: '', 
						ticketContain: '',
						ticketAdultPrice: '',
						ticketChildPrice: '',
						
						couponID: '',
						couponTitle: '',
						couponPrice: '',
						couponCondition: '',
						
						addressData : '',//用户列表
					},
				childrenIndex : '', //儿童数量
				adultIndex : '', //成人数量
				childrenTotalPrice : '', //儿童总价
				adultTotalPrice : '', //成人总价
			}
		},
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		onLoad(options) {
			this.lyfwData(options.orderNumber);
			
		},
		methods: {
			//0.3价格取2位精度
			priceAccuracy:function(e){
				const pri = e.toFixed(2);
				return pri;
			},
			//访问接口数据
			lyfwData:function(e) {
				uni.request({
					url:$lyfw.Interface.spt_RequestTicketsListDetail.value,
					method:$lyfw.Interface.spt_RequestTicketsListDetail.method,
					data:{
						orderNumber : e
					},
					header: {'content-type': 'application/json'},
					success:(res) => {
						// console.log(res)
						this.orderInfo = res.data.data[0];
						this.screenUser();
						this.make()
					}
				})
				
				
				// console.log(this.orderInfo[0])
			},
			//打开弹框
			open:function() {
				this.$refs.popup.open()
			},
			//关闭弹框
			close:function() {
				this.$refs.popup.close()
			},
			//数组提取
			screenUser: function() {
				let adult = this.orderInfo.addressData.filter(item => {
					return item.userType == '成人' || item.userType == '军人' || item.userType == '教师' || item.userType == '学生';
				})
				let children = this.orderInfo.addressData.filter(item => {
					return item.userType == '儿童';
				})
				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
				this.adultTotalPrice = adult.length * this.orderInfo.ticketAdultPrice;
				this.childrenTotalPrice = children.length * this.orderInfo.ticketChildPrice;
			},
			//跳转至景区详情
			route:function(){
				uni.navigateTo({
					url: 'ticketsDetails?ticketId=' +this.orderInfo.ticketId
				})
			},
			
			//生成二维码
			make:function() {
			      uQRCode.make({
			        canvasId: 'qrcode',
			        componentInstance: this,
			        text: this.orderInfo.orderTicketNumber,
			        size: 160,
			        margin: 10,
			        backgroundColor: '#ffffff',
			        foregroundColor: '#000000',
			        fileType: 'jpg',
			        correctLevel: uQRCode.defaults.correctLevel,
			      })
			    }
			
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}
	
	//背景图样式
	.ob_background {
		width: 100%;
		height: 320upx;
		image {
			width: 100%;
			height: 100%;
		}
		.Dx_View{
			position: absolute;
			width: 100%;
			top: 180upx;
			color: #FFFFFF;
			right: 0;
			.Dx_viewAndView{
				position: relative;
				.Dx_title{
					margin-left: 32upx;
					font-size: 48upx;
					font-weight: 300;
				}
				.Dx_text{
					margin-left: 32upx;
					font-size: 30upx;
				}
				.Dx_image{
					float: right;
					width: 28upx;
					height: 28upx;
					margin-right: 32upx;
					margin-top: 20upx;
				}
				.Dx_price{
					float: right;
					font-size: 52upx;
					margin-right: 6upx;
					text-align: right;
				}
				.Dx_priceIcon{
					float: right;
					font-size: 30upx;
					position: relative;
					margin-right: 2upx;
					margin-top: 2upx;
				}
				.Dx_remarks{
					display: block;
					margin: 20upx 32upx;
					font-size: 28upx;
				}
			}
		}
		/* #ifdef MP-WEIXIN */
		//整体容器样式 -微信版
		.Dx_View {
			top: 64upx;
			.Dx_image{
				margin-top: 30upx;
			}
			.Dx_priceIcon{
				margin-top: 8upx;
			}
		}
		/* #endif */
	}
	
	
	//须知弹框
	.box_Vlew {
		// width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		.box_titleView{
			margin: 24upx 0;
			//弹框标题
			.box_title {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}
			//弹框关闭按钮
			.box_icon {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
		//使用时间/费用详情
		.MP_selectionDate {
			margin-top: 24upx;
			margin-bottom: 24upx;
			border-top: 1px #F5F5F5 dashed;
			.MP_text {
				color: #888;
				font-size: 28upx;
				display: block; // 让字体换行
			}
		
			.MP_cost {
				display: block; // 让字体换行
				margin: 20upx 0;
				font-size: 28upx;
				color: #888;
		
				.MP_number {
					margin-left: 16upx;
				}
		
				.MP_userCost {
					float: right;
				}
		
				.MP_total {
					color: #f85e52;
					float: right;
				}
			}
		}
	}
	
	//信息详情
	.Xx_view{
		position: relative;
		margin: 0upx 32upx;
		margin-top: 32upx;
		border-radius: 16upx;
		background: #FFFFFF;
		.Xx_titleView{
			padding: 32upx;
			border-bottom: 1px #F5F5F5 dashed;
			.Xx_title{
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_titleIcon{
				position: absolute;
				right: 32upx;
			}
		}
		.Xx_contentView{
			margin-top: 2upx;
			padding: 32upx;
			font-size: 30upx;
			.Xx_contentTitle{
				color: #888;
			}
			.Xx_contentTitle2{
				margin-left: 24upx;
				color: #333;
			}
			.Xx_contentBlock{
				margin-top: 20upx;
			}
		}
		
		.Xx_QRcodeViewBlank{
			text-align: center;
			color: #AAAAAA;
			font-size: 28upx;
			padding: 180upx 0;
		}
		
		.Xx_QRcodeView{
			margin: 56upx 0;
			text-align: center;
			.Xx_QRcodeBlock1{
				margin-top: 40upx;
			}
			.Xx_QRcodeBlock2{
				margin-top: 12upx;
			}
			.Xx_QRcodeTitle{
				color: #888;
				font-weight: 300;
			}
			.Xx_QRcodeContentTitle{
				color: #888;
				font-size: 28upx;
			}
			.Xx_QRcodeContent{
				color: #333;
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_QRcodeImage{
				width: 320upx;
				height: 320upx;
			}
			.Xx_QRcodeTips{
				color: #0BA7E8;
				font-size: 28upx;
			}
		}
	}
	
	
	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.Xx_view {
		margin-top: -80upx;
	}
	/* #endif */
	
	
</style>
