<template>
	<view>     
		<view class="tab">
			<view style="display: flex; margin-left: 40rpx; margin-bottom: 20rpx; font-size: 34rpx;">
				<text>订单类型：</text>
				<picker @change="selectorChange" mode = "selector" :range="carSelect" name="carSelect">
				      <view>{{selector}} ></view>
				</picker>
			</view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
		</view>
		
		<!-- 最外层view，用于底部拉大 -->
		<view class="pageView">

			<!-- 全部 -->
			<view v-if="current === 0" style="margin-top: 20rpx;">
				<view v-for="(item,index) in info" :key="index">
					<!-- （全部）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame">线上购票</view>
									<view class="at_contentFrame">{{item.carType}}</view>
									
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>		
							<view class="at_buttonView">
								<!-- #ifndef MP-WEIXIN -->
								<view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view>
								<!-- #endif -->
								<view class="at_button at_btDelete" v-if="item.state=='7'" @tap="open3(item.orderNumber,'2')">取消</view>
								<view class="at_button at_btDelete" v-if="item.state=='4'" @tap="open2(item.orderNumber,'2')">退票</view>
								<!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDelete" v-if="item.state=='支付正常' || item.state=='改签'" @tap="open2(item,'cs2tui')">退票</view>
								<view class="at_button at_btDelete" v-if="item.state=='尚未支付'" @tap="open3(item.orderNumber,'cs2')">取消</view>
								<view class="at_button at_btToPay" v-if="item.state=='7'" @tap="keYunPay(item,item.carType)">去支付</view>
								<view class="at_button at_btToPay" v-if="item.state=='尚未支付'" @tap="keYunPay(item,item.carType)">去支付</view>	
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="info.length==0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>


			<!-- 已完成 -->
			<view v-if="current === 1" style="margin-top: 20rpx; ">
				<view v-for="(item,index) in finishArr" :key="index">
					<!-- （已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame">线上购票</view>
									<view class="at_contentFrame">{{item.carType}}</view>
									
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="finishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>
			<!-- 进行中 -->
			<view v-if="current === 2" style="margin-top: 20rpx;">
				<view v-for="(item,index) in goingArr" :key="index">
					<!-- (进行中)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame">线上购票</view>
									<view class="at_contentFrame">{{item.carType}}</view>
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="open2(item.orderNumber,'2')">退票</view>
								<!-- #ifndef MP-WEIXIN -->
								<view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view>
								<!-- #endif -->
								<view class="at_button at_btDelete" v-if="item.carType=='定制巴士'" @tap="open2(item,'cs2tui')">退票</view>
								<!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
								<!-- <view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="endorse(item)">改签</view> -->
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="goingArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>


			<!-- 未支付 -->
			<view v-if="current === 3" style="margin-top: 20rpx;">
				<view v-for="(item,index) in unfinishArr" :key="index">
					<!-- (未支付)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame">线上购票</view>
									<view class="at_contentFrame">{{item.carType}}</view>
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="open3(item.orderNumber,'2')">取消</view>
								<view class="at_button at_btDelete" v-if="item.carType=='定制巴士'" @tap="open3(item.orderNumber,'cs2')">取消</view>
								<view class="at_button at_btToPay" @tap="keYunPay(item,item.carType)">去支付</view>
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="unfinishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>

			<!-- 已取消 -->
			<view v-if="current === 4" style="margin-top: 20rpx;">
				<view v-for="(item,index) in cancelArr" :key="index">
					<!-- (已取消)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame">线上购票</view>
									<view class="at_contentFrame">{{item.carType}}</view>
									
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDetails" @tap="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="cancelArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>
		</view>

		<!-- 客运二维码弹框代码 -->
		<uni-popup2 type="bottom" ref="popup">
			<swiper style="width: 100%;height: 500rpx;">
				<swiper-item v-for="(item,index) in QRCodeArray" :key="index">
					<view class="u-f-ac" style="border-top-right-radius: 20rpx;border-top-left-radius: 20rpx; width: 100%; background: #FFFFFF;display: block; text-align: center;">
						<!-- 显示二维码 -->
						<!-- 检票口/座位号 -->
						<view style="display: flex; align-items: center;justify-content: space-between; font-size: 32rpx;color: #2C2D2D; padding: 20rpx 80rpx;font-weight: 300;">
							<view>检票口：{{item.checkPlace}}</view>
							<view>座位号：{{item.seatNum}}</view>
						</view>

						<!-- 发车时间/车牌号 -->
						<view style="display: flex; align-items: center;justify-content: space-between;font-size: 32rpx;color: #2C2D2D; padding: 0 80rpx;padding-bottom: 60rpx;">
							<view>发车时间：{{item.lunchTime}}</view>
							<view>车牌号：{{item.carNum}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-popup2>
		<!-- 退票弹框 -->
		<uni-popup2 ref="popup2" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">退订规则</text>
					<text class="box_icon jdticon icon-fork " @click="close2"></text>
				</view>
				<view class="box_refundView">
					<!-- <text class="box_refundText">您可以在2019年11月04日18:00前免费取消或变更订单 ；在2019年11月04日18:00之后变更或取消，将收取全 额费用作为罚金。</text> -->
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您还确定退票吗?</text>
						<text class="box_refundContentText">如若需退票，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="refund">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 取消弹框 -->
		<uni-popup2 ref="popup3" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close3"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认取消订单吗?</text>
						<text class="box_refundContentText">若确认取消，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="cancel">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>
	</view>
</template>

<script>
	/**
	 * 注意事项：1.请求订单数据要把自己请求的数据加到info数组 2.其他事项看注释
	 * */
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	import uniPopup from "@/components/Order/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/Order/uni-icons/uni-icons.vue";
	import uniPopup2 from "@/components/Order/uni-popup/uni-popup2.vue";
	import emptyData from "@/components/Order/emptyData/emptyData.vue"; //无数据时显示内容
	import uQRCode from "@/common/uqrcode.js"
	import $KyInterface from "@/common/Ctky.js"
	export default {
		components: {
			uniSegmentedControl,
			uniPopup,
			//加载多方弹框组件
			uniPopup2,
			uniIcons,
			emptyData,
		},
		data() {
			return {
				TaxiCost: 0, //价格
				countdown: 0,
				items: ['全部', '已完成', '进行中', '未支付', '已取消'],
				// carSelect : ['全部','普通班车','定制班车','出租车','专线车','顺风车','包车服务','旅游服务'],
				carSelect : ['全部','客运购票'],
				selector : '全部',
				selectorIndex : 0,//模块筛选值
				current: 0,
				index: 1,
				QRCodeArray: [{
					checkPlace: 'A5',
					seatNum: 'E1',
					lunchTime: '18:00',
					carNum: '闽C12345'
				}],
				info: [], //请求服务器订单列表
				userInfo: '', //个人信息
				finishArr: [],
				goingArr: [],
				unfinishArr: [],
				cancelArr: [],
				rSelect:[],
				num:'5',
				driverName: '张师傅', //司机姓名
				totalPrice: 32.5,
				ctkyOrderNum: '', //普通班车订单号（退票需要）
				ky_currentType:'',
				ky_orderStatus:'',//判断是否需要检测当前订单状态
				
				ctkyOpenID:'',
				csRefundInfo:[],//定制巴士退票
				payType: [{
						typeName: '微信',
						typeColor: '#00C805',
						// iconPath: '../../static/CZC/Wechatpay.png',
						value: 'wxpay',
						checked: true,
					},
					{
						typeName: '支付宝',
						typeColor: '#0EBDFF',
						// iconPath: '../../static/CZC/Alipay.png',
						value: 'alipay',
						checked: false
					}
				],
				specialLineInfo: '',

				noDataImage:'',//客运弹框背景图
				textareaValue:"",
				
				SfcInfo: '',
			}
		},
		onLoad: function() {
			var that = this;
			//获取客运弹框图片
			that.getPicture();
			//读取用户ID
			uni.getStorage({
				key: 'userInfo',
				success: function(data) {
					that.userInfo = data.data;
				},
				fail:function(){
					// #ifdef H5
					uni.showToast({
						title: '请允许授权给公众号，即将为您返回主页！',
						icon:'none'
					})
					uni.switchTab({
						url:'/pages/Home/zy_zhcx'
					})
					// #endif
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '请允许授权给小程序，即将跳转登录！'
					})
					uni.navigateTo({
						url:'/pages/Home/wxAuthorize'
					})
					// #endif
					// #ifdef APP-PLUS
					uni.showToast({
						title: '未登录账号，即将跳转登录！'
					})
					uni.navigateTo({
						url:'/pages/GRZX/userLogin?urlData=1'
					})
					// #endif
				}
			})
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.getOpenID();
			this.selectorChange();
		},
		onShow: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.getOpenID();
			this.selectorChange();
			
			//接收current
			var that=this;
			uni.getStorage({
				key:'currentNum',
				success:function(res){
					that.current=res.data;
					uni.removeStorageSync('currentNum');
				},
				fail(){
					that.current=0;
				}
			})
		},
		onPullDownRefresh: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.selectorChange();
		},
		methods: {
			//--------------------------订单模块筛选--------------------------
			selectorChange : function(e){
				var that=this;
				// console.log(e,'订单执行')
				uni.showLoading({
					title:'加载中...'
				})
				if(e !== undefined){
					this.selector = this.carSelect[e.target.value];//赋值
					this.selectorIndex = e.target.value;
				}
				//进行订单数组初始化
				that.info = [];
				that.finishArr = [];
				that.goingArr = [];
				that.unfinishArr = [];
				that.cancelArr = [];
				if(that.selectorIndex==0){
					that.getUserInfo();//加载普通班车订单方法
				}else if(that.selectorIndex==1){
					that.getUserInfo();//加载传统客运订单方法
				}else if(that.selectorIndex==2){
					that.GetBookLogInfoByUserId();//加载定制巴士订单方法
				}else if(that.selectorIndex==3){
					// that.loadczcData();//加载出租车订单方法
				}else if(that.selectorIndex==4){
					// that.getOrderList();//加载出租车-专线车订单方法
				}else if(that.selectorIndex==5){
					// that.getSfcOrderList();//加载出租车-顺风车订单方法
				}else if(that.selectorIndex==6){
					// that.getArrayInfo();//加载包车服务方法
				}else if(that.selectorIndex==7){
					// that.toFinished();//加载景区订单方法
				}
			},
		changeTime: function(value) { //时间格式转换
				var date = new Date(value + "+08:00");
				var year = date.getFullYear();
				var mounth = date.getMonth() + 1;
				if (mounth < 10) {
					mounth = "0" + mounth;
				}
				var day = date.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var hours = date.getHours();
				if (hours < 10) {
					hours = "0" + hours;
				}
				var minutes = date.getMinutes();
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				return year + '-' + mounth + '-' + day + " " + hours + ':' + minutes;
			},
			//--------------------------读取公众号openid--------------------------
			getOpenID() {
				var that = this;
				uni.getStorage({
					key: 'scenicSpotOpenId',
					success: function(response) {
						// alert('获取id成功');
						that.ctkyOpenID = response.data
					},
					fail: function(fail) {
						uni.hideLoading();
						// #ifndef APP-NVUE
						// uni.showModal({
						// 	content: '用户未授权',
						// })
						// #endif
						
					}
				})
			},
			//------------------------------------------------客运开始------------------------------------------------
			//-------------------------客运用户详情-------------------------
			getPicture() {
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_AddPicture.Url,
					method: $KyInterface.KyInterface.Ky_AddPicture.method,
					header: $KyInterface.KyInterface.Ky_AddPicture.header,
					data: {
					model: 0,
					// type: 'banner',
					// systemtype: 'XCX',//APP,XCX,H5
					// companyid: '南平综合出行',//公司名
					},
					success(res) {
						console.log(res)
						if (res.data.status == true) {
							that.noDataImage = res.data.data.imageUrl
						} else {
							console.log(res.data.status)
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						console.log('用户信息', that.userInfo);
						that.getKeYunOrderInfo();
					},
					fail(res) {
						// console.log('错误', res);
					}
				})
			},

			//-------------------------请求客运订单数据-------------------------
			getKeYunOrderInfo: function() {
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.Url,
					method: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.method,
					header: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.header,
					data: {
						clientID: that.userInfo.userId,
					},
					success: (res) => {
						uni.stopPullDownRefresh();
						console.log('客运订单数据', res.data);
						that.ctkyOrderNum = res.data.orderNumber;
						if (res.data.status == true) {
							for (var i = 0; i < res.data.data.length; i++) {
								that.info.push(res.data.data[i]);
							}
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].state == '5') {
									that.finishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '4') {
									that.goingArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '7') {
									that.unfinishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '6' || res.data.data[i].state == '9') {
									that.cancelArr.push(res.data.data[i]);
								}
							}
							uni.hideLoading();
						} else if (res.data.status == false) {
							uni.hideLoading();

						}
					},
					fail(res) {
						uni.hideLoading();
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						// console.log('错误', res);
					}
				})
			},
			//-------------------------请求定制巴士订单数据-------------------------
			GetBookLogInfoByUserId(){
				var that = this;
				console.log(that.userInfo.userId)
				uni.request({
					url:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.Url,
					method:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.method,
					header:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.header,
					data:{
						UserAID: that.userInfo.userId
					},
					success(res) {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						console.log('定制巴士订单数据',res)
						if (res.data.Successed == true) {
							var orderArray = [];
							for(let i=0;i<res.data.bookLogs.length;i++) {
								var array = {
									carType:res.data.bookLogs[i].Rep_BookLogType,
									bookTime:that.turnDate(res.data.bookLogs[i].BookTime),
									startSiteName:res.data.bookLogs[i].getOnPoint,
									endSiteName:res.data.bookLogs[i].getOffPoint,
									state:res.data.bookLogs[i].Rep_BookLogState,
									setOutTime:that.turnDate(res.data.bookLogs[i].SetoutTime),
									totalPrice:res.data.bookLogs[i].TotalPrice,
									iDNameType:res.data.bookLogs[i].iDNameType,
									ticketNumber:res.data.bookLogs[i].GetTicketCode,
									carryChild:res.data.bookLogs[i].Children,
									fullTicket:res.data.bookLogs[i].Person,
									halfTicket:0,
									orderNumber:res.data.bookLogs[i].AID,
									CheckInfoList:res.data.bookLogs[i].CheckInfoList,
									driverName:res.data.bookLogs[i].driverName,
									vehicleNumber:res.data.bookLogs[i].vehicleNumber,
								};
								orderArray.push(array);
								that.info.push(array);
								var state = res.data.bookLogs[i].Rep_BookLogState;
								if (state == '已完成') {
									that.finishArr.push(orderArray[i]);
								} else if (state == '支付正常' || state == '改签') {
									that.goingArr.push(orderArray[i]);
								} else if (state == '尚未支付') {
									that.unfinishArr.push(orderArray[i]);
								} else if (state == '作废' || state == '已退票') {
									that.cancelArr.push(orderArray[i]);
								}
							}
						}else if(res.data.Successed == false) {
							
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						console.log(res)
					}
				})
				
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if (date) {
					var setTime = date.replace('T', ' ');
					return setTime;
				}
			},
			//-------------------------------获取班次信息-------------------------------
			getScheduleNum:function(param){
					if(param.planScheduleCode){
						return param.planScheduleCode;
					}else{
						return '无'; 
					}
			},
			//-------------------------------获取班次信息-------------------------------
			gettime:function(param){
					let array=param.split(':');
					var a=array[0]+":"+array[1];
					return a;
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (!(/(^[1-9]\d*$)/.test(param))){//如果不是数字
					return param
				}else {
					if (param == 4) {
						return '进行中'
					} else if (param == 5) {
						return '已完成'
					} else if (param == 6) {
						return '已退票'
					} else if (param == 7) {
						return '未支付'
					} else if (param == 9) {
						return '已撤销'
					}
					//  else if (param == 22) {
					// 	return '已改签'
					// }
				}
			},
			open3(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup3.open()
			},
			//-------------------------跳转到详情页-------------------------
			keYunDetail: function(res) {
				console.log(res)
				var orderInfo = {
					lineName:res.lineName,
					planScheduleCode:res.planScheduleCode,
					orderNumber:res.orderNumber,
					carType:res.carType,
					state: res.state,
					totalPrice: res.totalPrice,
					startSiteName: res.getOnPoint,
					endSiteName: res.getOffPoint,
					fullTicket: res.fullTicket,
					halfTicket: res.halfTicket,
					carryChild: res.carryChild,
					setOutTime: res.setOutTime,
					driverName: res.driverName,
					driverPhone: res.driverPhone,
					vehicleNumber: res.vehicleNumber,
					iDNameType: res.iDNameType,
					ticketNumber: res.ticketNumber,
					insured: res.insured,
					CheckInfoList:res.CheckInfoList,
				}
				uni.navigateTo({
					url: '../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/orderDetail?orderInfo=' + JSON.stringify(orderInfo)
				})
			},
			// -------------------------客运查看车辆位置-------------------------
			busLocation:function(item) {
				var loaction = {
					latitude:item.lat,
					longitude:item.lon
				}
				uni.navigateTo({
					url:'../../pages_CTKY/pages/CTKY/TraditionSpecial/MapMark/checkBusLocation?busInfo=' + JSON.stringify(loaction)
				})
			},
			//--------------------------退票之前获取车票支付参数--------------------------
			refund_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log(res)
							if (res.data.data == '车票已退票') {
								uni.stopPullDownRefresh();
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '车票已退票',
									icon: 'none',
								})
							}else {
								clearInterval(timer);
								that.GetBounceChargeByOrderNumber(orderNumber);
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运退票--查询费率-------------------------
			GetBounceChargeByOrderNumber:function(orderNumber){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_GetBounceChargeByOrderNumber.Url,
					method: $KyInterface.KyInterface.Ky_GetBounceChargeByOrderNumber.method,
					data: {
						orderNumber: orderNumber,
					},
					success(respones) {
						console.log(respones)
						if(respones.data.status == true){
							uni.hideLoading();
							that.$refs.popup2.close()
							let BounceMoney = respones.data.data.BounceMoney;
							uni.showModal({
								title:'温馨提示',
								content:'退票将收取手续费，退款金额为' + BounceMoney + '元',
								// content:'退票将收取手续费，是否继续退票',
								success(res) {
									if(res.confirm) {
										that.keYunRefundTicket(orderNumber)
									}
								}
							})
						}else if(respones.data.status == false){
							uni.hideLoading();
							that.$refs.popup2.close()
							uni.showToast({
								title:respones.data.msg,
								icon:'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail(respones) {
						uni.hideLoading();
						console.log('费率', respones)
					}
				})
			},
			// -------------------------客运退票-------------------------
			keYunRefundTicket: function(orderNumber) {
				uni.showLoading({
					title: '正在退票中...'
				})
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_RefundTicket.Url,
					method: $KyInterface.KyInterface.Ky_RefundTicket.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						// console.log('退票结果', respones)
						if (respones.data.status == true) {
							if(respones.data.msg == '退票成功'){
								uni.showToast({
									title:"退票成功",
									complete() {
										setTimeout(function(){
											uni.startPullDownRefresh();
										},1500)
									}
								})
								this.selectorChange();
							}else {
								uni.showToast({
									title: respones.data.msg
								})
								uni.startPullDownRefresh();
							}
						} else if (respones.data.status == false){
							uni.hideLoading()
							if(respones.data.msg) {
								uni.showToast({
									title: respones.data.msg,
									icon: 'none'
								})
							}else {
								uni.showToast({
									title: '退票失败',
									icon: 'none'
								})
							}
							this.$refs.popup2.close()
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			//-------------------------景区门票-打开退票弹框-------------------------
			open2: function(e, exitindex) {
				// console.log(e)
				// console.log(exitindex)
				var that = this;
				if(exitindex == 'cs2tui') {
					// console.log(e)
					that.csRefundInfo = e;
					that.exitindex = exitindex;
					that.$refs.popup2.open()
				}else {
					that.ticketOrderNumber = e;
					that.exitindex = exitindex;
					that.$refs.popup2.open()
				}
				
				// console.log(this.ticketOrderNumber)
				// console.log(this.exitindex)
				
			},
			//-------------------------景区门票-关闭退票弹框-------------------------
			close2() {
				this.$refs.popup2.close()
			},
			// -------------------------定制巴士退票/退款 先退票再退款-------------------------
			cs_refundStateCheck:function(item){
				var that = this;
				that.ky_currentType = '定制巴士退票';
				//退票
				// that.csRefundTicket(item);
				//检测支付状态
				that.Cs_CheckPayState(item);
			},
			
			//退票
			csRefundTicket:function(item){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Cs_Refund.Url,
					method: $KyInterface.KyInterface.Cs_Refund.method,
					header: $KyInterface.KyInterface.Cs_Refund.header,
					data: {
						bookID: item.orderNumber,
					},
					success: (respones) => {
						console.log('退票结果',respones)
						if (respones.data.Successed == true) {
							uni.hideLoading()
							uni.showToast({
								title: respones.data.BookResult.Message,
								complete() {
									that.Cs_BouncePay(item);
									that.$refs.popup2.close()
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: respones.data.FaildMessage,
								icon: 'none',
								complete() {
									this.$refs.popup2.close()
								}
							})
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			//退款
			Cs_BouncePay:function(item){
				var that = this;
				var payType = $KyInterface.KyInterface.payType.payType;
				uni.request({
					url: $KyInterface.KyInterface.Cs_BouncePay.Url,
					method: $KyInterface.KyInterface.Cs_BouncePay.method,
					data: {
						orderNumber: item.orderNumber,
						payType: payType,
						price: item.totalPrice
					},
					success: (respones) => {
						console.log('退款结果',respones)
						if (respones.data.status == true) {
							uni.showToast({
								title: respones.data.msg,
								complete() {
									// console.log('退票成功，开始刷新');
									uni.startPullDownRefresh();
								}
							})
						} else if (respones.data.status == false){
							uni.showToast({
								title: respones.data.msg,
								icon: 'none',
								complete() {
									uni.startPullDownRefresh();
								}
							})
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			// -------------------------定制巴士取消-------------------------
			Cs_cancelStateCheck:function(orderNumber){
				var that = this;
				that.ky_currentType = '定制巴士取消';
				that.Cs_CheckPayState(orderNumber);
			},
			Cs_cancelTicket:function(orderNumber){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Cs_Cancel.Url,
					method: $KyInterface.KyInterface.Cs_Cancel.method,
					header: $KyInterface.KyInterface.Cs_Cancel.header,
					data: {
						bookID: orderNumber,
					},
					success: (respones) => {
						console.log('取消结果', respones)
						if (respones.data.Successed == true) {
							uni.hideLoading()
							uni.showToast({
								title: '取消成功'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
							this.selectorChange();
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '取消失败',
								icon: 'none'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			//--------------------------客运取消之前获取车票支付参数--------------------------
			cancel_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('取消结果',res);
							if (res.data.data == '订票成功，待支付' || res.data.msg == '订票成功，待支付') {//可以取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else if (res.data.data == '订票成功' || res.data.msg == '订票成功'){//已付钱，不可取消
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
								uni.showModal({
									title:'温馨提示',
									content:'您的订单已购票成功，不可取消',
									showCancel:false,
									complete() {
										uni.startPullDownRefresh()
									}
								})
							}else if (res.data.msg == '订票失败' || res.data.data == '订票失败'){//可取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else {
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运取消-------------------------
			keYunCancelTicket: function(orderNumber) {
				var that = this;
				that.ky_currentType = '传统客运';
				uni.request({
					url: $KyInterface.KyInterface.Ky_CancelTicket.Url,
					method: $KyInterface.KyInterface.Ky_CancelTicket.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						that.$refs.popup3.close()
						// console.log('取消结果', respones)
						if (respones.data.status == true) {
							uni.showToast({
								title: '取消成功',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
							this.selectorChange();
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			
			// -------------------------客运支付-------------------------
			keYunPay: function(item,carType) {
				// var orderInfo = this.info[index];
				var that = this;
				console.log(item.orderNumber,carType,item.totalPrice);
				if(carType == '定制巴士') {
					that.ky_currentType = '定制巴士支付';
					this.Cs_CheckPayState(item.orderNumber,item.totalPrice)
				}else {
					this.ky_currentType = '';
					this.ky_orderStatus = '客运支付订单检索';
					this.getTicketPaymentInfo(item.orderNumber);
				}
			},
			
			//--------------------------检测订单支付状态--------------------------
			Cs_CheckPayState:function(orderNumber,totalPrice){
				var that = this;
				var payType = $KyInterface.KyInterface.payType.payType;
				console.log('检测订单支付状态',orderNumber,payType)
				var number = '';
				if(that.ky_currentType == '定制巴士退票'){
					number = orderNumber;
				}else {
					number = orderNumber.orderNumber;
				}
				uni.request({
					url:$KyInterface.KyInterface.Cs_CheckPayState.Url,
					method:$KyInterface.KyInterface.Cs_CheckPayState.method,
					data:{
						orderNumber:number,
						payType:payType
					},
					success(res) {
						console.log('支付状态',res)
						console.log('ky_currentType',that.ky_currentType)
						if(that.ky_currentType == '定制巴士取消') {
							if(res.data.msg == '支付成功') {
								uni.showToast({
									title:'订单已支付',
									icon:'none'
								})
							}else {
								that.Cs_cancelTicket(orderNumber)
							}
						}
						if(res.data.msg == '不存在该订单，请输入正确订单号'){
							if(that.ky_currentType == '定制巴士退票'){
								// that.csRefundTicket(orderNumber);
							}else if(that.ky_currentType == '定制巴士支付'){
								that.getSpecialBusPaymentInfo(orderNumber,totalPrice);
							}
						}else if(res.data.msg == '获取二维码尚未支付'){
							
						}else if(res.data.msg == '支付成功'){
							uni.showToast({
								title:'订单已支付',
								icon:'none'
							})
						}else if(res.data.msg == '支付关闭'){
							uni.showToast({
								title:'支付关闭',
								icon:'none'
							})
						}else if(res.data.msg == '检测到超时'){
							uni.showToast({
								title:'支付超时',
								icon:'none'
							})
						}else if(res.data.msg == '已办理退款'){
							uni.showToast({
								title:'已办理退款',
								icon:'none'
							})
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			//--------------------------定制巴士支付成功后请求--------------------------
			Cs_paySuccess:function(bookID){
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Cs_Confirm.Url,
					method:$KyInterface.KyInterface.Cs_Confirm.method,
					header:$KyInterface.KyInterface.Cs_Confirm.header,
					data:{
						bookID:bookID
					},
					success(res) {
						console.log('支付成功后调接口',res)
						uni.startPullDownRefresh()
					},
					fail(res) {
						console.log('支付失败后调接口',res)
					}
				})
			},
			//--------------------------获取定制巴士支付参数--------------------------
			getSpecialBusPaymentInfo:function(orderNumber,totalPrice){
				var that = this;
				uni.showLoading({
					title:'加载中...'
				})
				var payType = $KyInterface.KyInterface.payType.payType;
				var timer = null;
				that.timer = timer;
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.commonPayment.Url,
						method:$KyInterface.KyInterface.commonPayment.method,
						data: {
							//订单编号
							orderNumber: orderNumber,
							payType:payType,
							openId:that.ctkyOpenID,
							billDescript:'定制巴士订单服务费',
							goodsName:'定制巴士服务',
							price:totalPrice,
							// price:0.1,
						},
						success: (res) => {
							uni.hideLoading();
							if(res.data.status == true) {
								that.paymentData = res.data.data;
								clearInterval(timer);
								uni.showModal({
									content:'请尽快支付',
									success(res) {
										if(res.confirm) {
											that.Cs_payment();
										}
									}
								})
							}else if(res.data.status == false) {
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: res.data.msg,
									icon:'none'
								})
							}
						},
						fail(res) {
							uni.hideLoading();
							console.log('失败');
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(orderNumber) {
				// console.log('支付参数', orderNumber);
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title:'正在检测订单...'
				})
				timer = setInterval(function() {
					uni.request({
						url: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						// header: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							if (res.data.status == true) {
								uni.hideLoading();
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									clearInterval(timer);
									uni.showToast({
										title: '订单已支付',
										icon: 'none',
										complete() {
											setTimeout(function(){
												uni.startPullDownRefresh()
											},1500)
										}
									})
								} else {
									clearInterval(timer);
									//未支付，客运支付
									that.keYunPaymentData = JSON.parse(res.data.msg);
									that.keYunPayment();
								}
							} else if (res.data.status == false) {
								uni.hideLoading();
								clearInterval(timer);
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									uni.showToast({
										title: '订单已超时',
										icon: 'none'
									})
								} else {
									uni.showModal({
										content: info.oldState,
										showCancel: false
									})
								}
							}
						},
						fail(res) {
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			keYunPayment: function() {
				// console.log('点击了支付');
				var that = this;
				if (that.isPayEnable == 0) {
					uni.showToast({
						title: '正在获取支付,请稍等...',
						icon: 'none'
					})
				} else {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": that.keYunPaymentData.jsapi.AppId, //公众号名称，由商户传入
						"timeStamp": that.keYunPaymentData.jsapi.TimeStamp, //时间戳
						"nonceStr": that.keYunPaymentData.jsapi.NonceStr, //随机串
						"package": that.keYunPaymentData.jsapi.Package, //扩展包
						"signType": that.keYunPaymentData.jsapi.SignType, //微信签名方式:MD5
						"paySign": that.keYunPaymentData.jsapi.PaySign //微信签名
					}, function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							//支付成功再进计时器查询状态
							// location.href = "/Order/BaseCallback/" + flowID;
							uni.showToast({
								title: '支付成功',
								icon: 'none',
							})
							uni.startPullDownRefresh();
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							uni.showToast({
								title: '您取消了支付，请重新支付',
								icon: 'none',
							})
						} else if (res.err_msg == "get_brand_wcpay_request:faile") {
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none',
							})
						} else {
							// location.href = "/Coach/GetCoach";
						}
					});
					// #endif


					// #ifdef APP-PLUS
					// console.log('进入app支付', that.paymentData);
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							appid: that.keYunPaymentData.jsapi.AppId,
							timestamp: that.keYunPaymentData.jsapi.TimeStamp,
							noncestr: that.keYunPaymentData.jsapi.NonceStr,
							package: 'Sign=WXPay',
							sign: that.keYunPaymentData.jsapi.PaySign,
							partnerid: that.keYunPaymentData.jsapi.PartnerId,
							prepayid: that.keYunPaymentData.jsapi.PrepayId,
						},
						success: function(res) {
							if (res.errMsg == 'requestPayment:ok') { //成功
								uni.showToast({
									title: '支付成功',
									icon: 'none',
									success: function() {
										uni.startPullDownRefresh();
									}
								})
							} else if (res.errMsg == 'requestPayment:fail') { //错误
								uni.showToast({
									title: '支付失败，请重新支付',
									icon: 'none',
								})
							}
						},

						fail: function(ee) {
							console.log(ee)
							if (ee.errMsg == 'requestPayment:fail canceled') { //用户取消
								uni.showToast({
									title: '您取消了支付',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: ee.errMsg,
									icon: 'none',
									duration: 3000
								})
							}
						}
					});
					// #endif
					// #ifdef MP-WEIXIN
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp:that.keYunPaymentData.jsapi.TimeStamp,
						nonceStr:that.keYunPaymentData.jsapi.NonceStr,
						package:that.keYunPaymentData.jsapi.Package,
						signType:that.keYunPaymentData.jsapi.SignType,
						paySign:that.keYunPaymentData.jsapi.PaySign,
						success(res) {
							console.log(res)
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							})
							uni.showLoading({
							    title: '加载中...'
							});
							that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						},
						fail(res) {
							console.log(res)
							if (res.errMsg == "requestPayment:fail cancel") {
								setTimeout(function() {
									that.showToast("支付失败，请重新支付")
								}, 1000)
							} else {
								that.showToast("支付失败")
							}
						}
					});
					// #endif
				}
			},
			//--------------------------调起定制巴士支付--------------------------
			Cs_payment: function() {
				var that = this;
				// #ifdef H5
				uni.hideLoading()
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": that.paymentData.appId, //公众号名称，由商户传入
					"timeStamp": that.paymentData.timeStamp, //时间戳
					"nonceStr": that.paymentData.nonceStr, //随机串
					"package": that.paymentData.package, //扩展包
					"signType": that.paymentData.signType, //微信签名方式:MD5
					"paySign": that.paymentData.paySign //微信签名
				}, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						alert("支付成功");
						uni.showLoading({
						    title: '加载中...'
						});
						// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						that.Cs_paySuccess(that.orderNum);
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						// alert("您取消了支付，请重新支付");
						uni.showToast({
							title: '您取消了支付，请重新支付',
							icon: 'none'
						})
					} else if (res.err_msg == "get_brand_wcpay_request:faile") {
						// alert("支付失败，请重新支付");
						uni.showToast({
							title: '支付失败，请重新支付',
							icon: 'none'
						})
			
					} else {
						// location.href = "/Coach/GetCoach";
					}
				});
				// #endif
			
			
				// #ifdef APP-PLUS
				uni.hideLoading()
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: {
						appid: that.paymentData.appId,
						timestamp: that.paymentData.timeStamp,
						noncestr: that.paymentData.nonceStr,
						package: 'Sign=WXPay',
						sign: that.paymentData.signType,
						partnerid: that.paymentData.PartnerId,
						prepayid: that.paymentData.PrepayId,
					},
					success: function(res) {
						uni.showModal({
							title: '提示',
							content: res,
							showCancel: false
						})
						if (res.errCode == 0) { //成功
							alert("支付成功");
							uni.showLoading({
							    title: '加载中...'
							});
							// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
							that.Cs_paySuccess(that.orderNum);
						} else if (res.errCode == -1) { //错误
							that.showToast("支付失败，请重新支付")
						} else if (res.errCode == -2) { //用户取消
							that.showToast("您取消了支付")
						}
					},
					fail: function(ee) {
						uni.showToast({
							title: '拉起支付失败，请检查网络后重试',
							icon: 'none',
							duration: 3000
						})
					}
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.hideLoading()
				uni.requestPayment({
					// provider: 'wxpay',
					timeStamp:that.paymentData.timeStamp,
					nonceStr:that.paymentData.nonceStr,
					package:that.paymentData.package,
					signType:that.paymentData.signType,
					paySign:that.paymentData.paySign,
					success(res) {
						console.log(res)
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						})
						uni.showLoading({
						    title: '加载中...'
						});
						// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						that.Cs_paySuccess(that.orderNum);
					},
					fail(res) {
						console.log(res)
						if (res.errMsg == "requestPayment:fail canceled") {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						} else {
							that.showToast("支付失败")
						}
					}
				});
				// #endif
			},
			showToast: function(msg, icon = 'none') {
				uni.showToast({
					title: msg,
					icon: icon
				})
			},
			//--------------------------客运成功之后重新获取车票支付参数--------------------------
			getTicketPaymentInfo_ticketIssue: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '加载中...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						// header:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							// console.log('支付参数返回数据', res);
							uni.stopPullDownRefresh();
							if (res.data.data == '订票成功') {
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '出票成功',
									icon: 'none',
								})
								uni.redirectTo({
									url: './CTKYPaySuccess'
								})
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//-------------------------客运二维码弹框-------------------------
			QRCodeTap: function() {
				this.$refs.popup.open()
			},
			//-------------------------客运投诉-------------------------
			KyComplain:function(item){
				console.log(item)
				if(item.carType=='普通班车'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=普通班车&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}else if(item.carType=='定制班车'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=定制班车&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}else if(item.carType=='定制巴士'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=定制巴士&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}
			},
			onchange(e){
				this.num = e.value;
			},
			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
				    this.rSelect.push(e);//选中添加到数组里
				} else {
				    this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			//-------------------------景区门票-退票-------------------------
			refund: function() {
				uni.showLoading({
					title: '请求退票中...'
				})
				var that = this
				if (this.exitindex == '2') {
					//请求费率
					// this.GetBounceChargeByOrderNumber(that.ticketOrderNumber)
					// that.ky_currentType = '客运退票';
					//先查询订单状态-->执行费率查询-->执行退票
					that.refund_getTicketPaymentInfo(that.ticketOrderNumber)
				} else if(this.exitindex == 'cs2tui'){
					//先检测订单支付状态再执行退票操作
					this.cs_refundStateCheck(that.csRefundInfo)
				}else if (that.exitindex == '3') {
					console.log('景区门票')
					console.log(this.exitindex)
					uni.request({
						url: $lyfw.Interface.spt_BounceTickets.value,
						method: $lyfw.Interface.spt_BounceTickets.method,
						data: {
							orderNumber: that.ticketOrderNumber,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if(e.data.status==false){
								uni.hideLoading()
								uni.showToast({
									title: '退票失败，服务器异常，请联系客服！',
									icon: 'none',
								})
							}else if(e.data.status==true){
								uni.hideLoading()
								uni.showToast({
									title: '退票成功',
								})
								this.close2()
								this.toFinished();
								this.selectorChange();
							}
							
						},
						fail: function() {
							uni.showToast({
								title: '退票失败，网络异常',
								icon: 'none',
							})
							this.selectorChange();
							uni.hideLoading()
						}
					})
				}else if (this.exitindex == '5'){
					console.log('旅游产品')
					uni.request({
						url: $lyfw.Interface.lyky_BounceTickets.value,
						method: $lyfw.Interface.lyky_BounceTickets.method,
						data: {
							orderNumber: that.ticketOrderNumber,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if(e.data.status==false){
								uni.hideLoading()
								uni.showToast({
									title: '退票失败，服务器异常，请联系客服！',
									icon: 'none',
								})
							}else if(e.data.status==true){
								uni.hideLoading()
								uni.showToast({
									title: '退票成功',
								})
								this.close2()
								this.toFinished();
								this.selectorChange();
							}
							
						},
						fail: function() {
							uni.showToast({
								title: '退票失败，网络异常',
								icon: 'none',
							})
							this.selectorChange();
							uni.hideLoading()
						}
					})
				}
			},
			//-------------------------景区门票-打开取消弹框-------------------------
			open3(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup3.open()
			},
			//-------------------------景区门票-关闭取消弹框-------------------------
			close3() {
				this.$refs.popup3.close()
			},
			//-------------------------景区门票-取消-------------------------
			cancel: function() {
				if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_CancelTickets.value,
						method: $lyfw.Interface.spt_CancelTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							if (e.data.msg == '订单取消成功') {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								this.selectorChange();
							} else if (e.data.msg == '订单取消失败') {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '4') {
					console.log(this.ticketOrderNumber);
					uni.request({
						url: $bcfw.Interface.spt_CancelTickets.value,
						method: $bcfw.Interface.spt_CancelTickets.method,
						data: {
							or_number: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if (e.data.status == true) {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							} else if (e.data.status == false) {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '2') {//客运取消
					// this.keYunCancelTicket(this.ticketOrderNumber);
					//客运取消之前先检测当前车票状态
					this.cancel_getTicketPaymentInfo(this.ticketOrderNumber);
				}else if (this.exitindex == 'cs2') {//定制巴士取消
					this.Cs_cancelStateCheck(this.ticketOrderNumber);
				}else if (this.exitindex == '5') {
					uni.request({
						url: $lyfw.Interface.lyky_CancelTickets.value,
						method: $lyfw.Interface.lyky_CancelTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							if (e.data.msg == '订单取消成功') {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
								this.selectorChange();
							} else if (e.data.msg == '订单取消失败') {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				}
			},
			//------------------------------------------------客运结束------------------------------------------------
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},		
		}
	}
</script>

<style lang="scss">
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		display: flex;
		/* 设置当前内容全部水平布局 */
	}
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		align-items: center;
		/* 设置内容中心点对齐 */
	}

	.u-f-jc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
		/* 设置左右两边靠边布局 */
	}

	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
		padding-bottom: 48upx;
	}

	.pageView {
		/* #ifdef H5 */
		padding-bottom: 112upx;
		/* #endif */
	}

	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		height: 140upx;
		z-index: 99999;

	}

	// 购买时间
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}

	//门票列表内容
	.at_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;

		.at_titleView {
			position: relative;
			display: flex;

			.at_icon {
				position: relative;
				top: 6upx;
				width: 40upx;
				height: 34upx;
			}
			.at_textView{
				padding-left: 20upx;
				width: 450upx;
				overflow: hidden;
				.at_title {
					
				}
			}
			

			.at_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}

		//内容区
		.at_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;

			.at_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.at_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
			}

			.at_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}

		//按钮区
		.at_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			// 按钮
			.at_button {
				padding: 18upx 32upx;
				font-size: 30upx;
				border-radius: 40upx;
			}

			// 详情 - 实心蓝
			.at_btDetails {
				background: #3EABFC;
				border: 1upx solid #3EABFC;
				color: #FFFFFF;
				
			}

			//二维码/再次购买 - 实心橙
			.at_btQrCode {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
			}

			//删除/退票 - 空心灰
			.at_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 24upx;
			}

			//去支付 - 实心绿
			.at_btToPay {
				background: #02c501;
				border: 1upx solid #02c501;
				color: #FFFFFF;
				margin-right: 24upx;
			}
		}
	}
		//二维码
		.QRCode {
			background-color: #06B4FD;
			color: #06B4FD;
		}

		// 退款弹框
		.box_refundView {
			margin: 24upx 0upx;

			.box_refundText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #333;
			}

			//确认退票
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;

				.box_refundContentTitle {
					font-weight: bold;
				}

				.box_refundContentText {
					margin-top: 24upx;
					display: block;
					font-size: 28upx;
					color: #888;
				}
			}

			.box_refundButtonView {
				text-align: center;
				margin: 56upx 0;

				//确认按钮
				.box_refundButton {
					color: #FFFFFF;
					border-radius: 56upx;
					background: #FF6600;
					padding: 24upx 160upx;
				}
			}
		}
		//须知弹框
		.box_Vlew {
			padding: 16upx 40upx;
			padding-bottom: 24upx;
			background: #FFFFFF;
		
			.box_titleView {
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
			}
</style>
