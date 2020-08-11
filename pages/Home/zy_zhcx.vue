<template>
	<view>
		<view v-if="applyName=='南平综合出行'">
			<!-- 轮播图-->
			<swiper class="swi bc_GRZX" circular autoplay>
				<swiper-item class="swiItem" v-for="(item,index) in background" :key="index">
					<image :src="item.imageUrl" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<!-- app -->
			<!-- #ifdef APP-PLUS -->
			<swiper class="zl_swi " circular @change="swiperChange">
				<swiper-item class="swiItem" style="display: flex;align-items: center;" v-for="(item,index) in swiperItem" :key="index">
					<!-- 	<swiper-item class="swiItem" style="display: flex;align-items: center;">
					<view style="display: flex;justify-content: space-around;align-items: center;"> -->
					<view style="display: flex;width: 25%;justify-content: center;margin-bottom: 12upx;" v-for="(ArrItem,index1) in item.ItemArr"
					 :key="index1">
						<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;" @click="TitleJump(ArrItem.IsUse,ArrItem.clickURL)">
							<image v-if="ArrItem.ItemTitle =='达达骑车'" style="width: 90upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交刷码'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='达达钱包'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交查询'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='车票订购'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='包车服务'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='景区门票'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='旅游产品'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='预约检测'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='自由行'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='武夷新区'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='村村通'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<text class="itemText">{{ArrItem.ItemTitle}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- #endif -->

			<!-- h5 -->
			<!-- #ifdef H5 -->
			<swiper class="zl_swi " circular @change="swiperChange">
				<swiper-item class="swiItem" style="display: flex;align-items: center;" v-for="(item,index) in swiperItem" :key="index">
					<!-- 	<swiper-item class="swiItem" style="display: flex;align-items: center;">
					<view style="display: flex;justify-content: space-around;align-items: center;"> -->
					<view style="display: flex;width: 25%;justify-content: center;margin-bottom: 12upx;" v-for="(ArrItem,index1) in item.ItemArr"
					 :key="index1">
						<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;" @click="TitleJump(ArrItem.IsUse,ArrItem.clickURL)">
							<image v-if="ArrItem.ItemTitle =='达达骑车'" style="width: 90upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交刷码'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='达达钱包'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交查询'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='车票订购'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='包车服务'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='景区门票'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='旅游产品'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='预约检测'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='自由行'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='武夷新区'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='村村通'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<text class="itemText">{{ArrItem.ItemTitle}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- #endif -->

			<!-- 微信 -->
			<!-- #ifdef MP-WEIXIN -->
			<swiper class="zl_swi " circular @change="swiperChange">
				<swiper-item class="swiItem" style="display: flex;align-items: center;" v-for="(item,index) in swiperItem" :key="index">
					<!-- 	<swiper-item class="swiItem" style="display: flex;align-items: center;">
					<view style="display: flex;justify-content: space-around;align-items: center;"> -->
					<view style="display: flex;width: 25%;justify-content: center;margin-bottom: 12upx;" v-for="(ArrItem,index1) in item.ItemArr"
					 :key="index1">
						<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;" @click="TitleJump(ArrItem.IsUse,ArrItem.clickURL)">
							<image v-if="ArrItem.ItemTitle =='达达骑车'" style="width: 86upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交刷码'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='达达钱包'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='公交查询'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='车票订购'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='包车服务'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='景区门票'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='旅游产品'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='检测预约'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='自由行'" style="width: 64upx;height: 64upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='武夷新区'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<image v-if="ArrItem.ItemTitle =='村村通'" style="width: 68upx;height: 68upx;" mode="aspectFit" :src="ArrItem.ImageURL"
							 lazy-load="true"></image>
							<text class="itemText">{{ArrItem.ItemTitle}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- #endif -->

			<!-- 自定义swiper指示器 -->
			<view class="dots">
				<block v-for="(item,index) in swiperItem.length" :key="item">
					<view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
				</block>
			</view>
		</view>

		<!-- 咨询动态 -->
		<view class="notice">
			<view class="zl_content">
				<image class="zl_noImage" :src="imgXXDT[0].imageUrl" mode="aspectFill" @click="Jump"></image>
				<view class="zl_noContent">
					<swiper class="swi2" vertical circular autoplay display-multiple-items="2" disable-touch="true">
						<swiper-item v-for="(item,index) in consultingService" :key="index" :item-id="index" v-if="item.Type!='计费规则'">
							<!-- <scroll-view scroll-y> -->
							<view class="zl_noText" @click="newsClick(item)">{{item.Title}}</view>
							<!-- </scroll-view> -->
						</swiper-item>
					</swiper>
					<!-- <view class="zl_label">
						<view class="la_label" v-for="(item,index) in Announcement.LabelContent" :key="index" v-if="index<2">
							<text class="la_background" style="background-color: #e8f6e9;border-radius:20px;" @click="Jump">{{item.lc_text}}</text>
						</view>
					</view> -->
				</view>
			</view>
		</view>

		<!-- 旅游推荐 -->
		<view class="zl_recommend">
			<view>
				<view class="zl_reContent">
					<text class="zl_reTitle">南平风采</text>
					<!-- 下面这是要注释的 -->
					<!-- <text class="zl_reMore">更多></text> -->
				</view>
			</view>
			<view class="zl_reContent2">
				<view class="zl_contentImage1">
					<!-- 泉州小西埕 -->
					<view class="ct_content1" @click="godetail(sixPalaceList[0].ticketId)">
						<!-- <image class="ct_image1" :src="sixPalaceList[0].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text1" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{sixPalaceList[0].ticketTitle}}</text> -->
						<image class="ct_image1" :src="NanpingStyle[0].imageUrl" mode="aspectFill"></image>
						<!-- <text class="ct_text1" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">巾帼文明线</text> -->
					</view>
					<!-- 稻田摸鱼 -->
					<view class="ct_content2" @click="godetail(sixPalaceList[1].ticketId)">
						<!-- <image class="ct_image2" :src="sixPalaceList[1].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text2" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[1].ticketTitle}}</text> -->
						<image class="ct_image2" :src="NanpingStyle[1].imageUrl" mode="aspectFill"></image>
						<!-- <text class="ct_text2" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">公共自行车</text> -->
					</view>
				</view>

				<view class="zl_contentImage2">
					<!-- 泉州钟楼 -->
					<view class="ct_content3" @click="godetail(sixPalaceList[2].ticketId)">
						<!-- <image class="ct_image3" :src="sixPalaceList[2].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text3" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[2].ticketTitle}}</text> -->
						<image class="ct_image3" :src="NanpingStyle[2].imageUrl" mode="aspectFill"></image>
						<!-- <text class="ct_text3" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">古雷助力车</text> -->
					</view>
					<!-- 泉州洛阳桥 -->
					<view class="ct_content4" @click="godetail(sixPalaceList[3].ticketId)">
						<!-- <image class="ct_image4" :src="sixPalaceList[3].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text4" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[3].ticketTitle}}</text> -->
						<image class="ct_image4" :src="NanpingStyle[3].imageUrl" mode="aspectFill"></image>
						<!-- <text class="ct_text4" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">客运南站</text> -->
					</view>
					<!-- 七彩官畲 -->
					<view class="ct_content5" @click="godetail(sixPalaceList[4].ticketId)">
						<!-- <image class="ct_image5" :src="sixPalaceList[4].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text5" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[4].ticketTitle}}</text> -->
						<image class="ct_image5" :src="NanpingStyle[4].imageUrl" mode="aspectFill"></image>
						<!-- <text class="ct_text5" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">双层公交</text> -->
					</view>
				</view>
			</view>
		</view>

		<!-- 新闻资讯 -->
		<!-- <view class="titNp">新闻资讯</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="informationTo(item.aid)">
				<view class="image-wrapper">
					<image :src="item.imageUrl" mode="aspectFill"></image>
				</view>
				<view class="title clamp">{{item.title}}</view>
				<view>
					<image class="Portrait" src="../../static/GRZX/missing-face.png" mode="aspectFill"></image>
					<text class="price">{{item.reportTime}}</text>
					<text class="price-zan">阅读{{item.viewsCount+1080}}</text>
				</view>
			</view>
		</view> -->

		<!-- <view style="width: 100%; float: left; text-align: center; font-size: 24upx; padding: 16upx 0; color: #aaa; background: #FFFFFF;">
			<text v-if="current==0" :hidden="disStatus== 1">{{loadingType== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			<text v-if="current==0" :hidden="disStatus== 0">暂无历史数据</text>
		</view> -->

		<!-- tab按钮 -->
		<!-- <view class="zc_TabBackground">
			<view class="tb_tab">
				<view class="tb_button">
					<view class="tb_button2" :class="{current:type===0}" @click="tabClick(0)"></view>
				</view>
				<view class="tb_button3">
					<view class="tb_button4" :class="{current:type===1}" @click="tabClick(1)"></view>
				</view>
			</view>
		</view> -->
		<view class="zl_recommend" v-if="applyName=='南平综合出行2'">
			<view>
				<view class="zl_reContent">
					<text class="zl_reTitle">应用合作</text>
				</view>
				<view style="padding: 40rpx 0;display: flex;justify-content: center;">
					<text style="font-size: 30rpx;">客服热线：</text>
					<text style="font-size: 30rpx;color: #65C36D;">0596-2100000</text>
				</view>
			</view>
		</view>
		<!-- 服务协议和隐私政策 -->
		<uni-popup ref="centerPopup" type="center">
			<view class="centerClass">
				<view class="pTitleClass">服务协议和隐私政策</view>
				<view class="pTextClass">
					<text>请你务必审慎阅读，充分理解“软件许可及服务协议”和“隐私政策”各条款。</br>你可阅读</text>
					<text style="color: #2F9BFE;" @click="agreementClick">《软件许可及服务协议》</text>
					<text>和</text>
					<text style="color: #2F9BFE;" @click="privacyClick">《隐私政策》</text>
					<text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。</text>
				</view>
				<view class="btnBox">
					<view class="btnClass1" @click="closePopup('centerPopup')">暂不使用</view>
					<view class="btnClass2" @click="confirm">同意</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/HOME/uni-popup/uni-popup.vue";
	import $DDTInterface from '@/common/DDT.js'
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	import $Home from '@/common/Home.js' //引用路径
	import MxDatePicker from "@/components/HOME/mx-datepicker/mx-datepicker.vue";
	export default {
		data() {
			return {
				swiperCurrent: 0,
				consultingService: [], //新闻资讯
				imgXXDT: [{
					imageUrl: '',
				}], //咨询动态
				NanpingStyle: [{
						imageUrl: '',
					},
					{
						imageUrl: '',
					},
					{
						imageUrl: '',
					},
					{
						imageUrl: '',
					},
					{
						imageUrl: '',
					}
				], //咨询动态
				background: [{
					imageUrl: '',
				}], //背景图
				homePage: [{
					ImageURL: ''
				}], //轮播图
				Announcement: '', //资讯动态
				sixPalaceList: [{
					ticketId: '',
					ticketImage: '',
				}, ],
				goodsList: '',
				zy_dataIndex: 6, //列表默认数量
				disStatus: 0,
				loadingText: {
					down: '上拉加载更多',
					refresh: '正在加载...',
					nomore: '没有更多了',
				},
				loadingType: 0, //加载更多状态
				current: 0, //标题下标
				version: '', //版本号
				platform: '', //系统平台
				userInfo: '',
				swiperItem: [ //菜单栏
					{
						ItemArr: [{
							IsUse: true,
							clickURL: "../../pages_CTKY/pages/CTKY/TraditionSpecial/Home/ctkyIndex",
							ImageURL: "../../static/Home/serve/cuncuntong.png",
							// ImageURL: "../../static/Home/serve/cuncuntong.png",
							ItemTitle: "村村通"
						}, {
							IsUse: true,
							clickURL: "../../pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsList",
							ImageURL: "../../static/Home/serve/jqgoupiao.png",
							// ImageURL: "../../static/Home/serve/jqgoupiao2.png",
							ItemTitle: "景区门票"
						}]
					},
				],
				// swiperItem: [ //菜单栏
				// 	{
				// 		ItemArr: [{
				// 				IsUse: true,
				// 				clickURL: "../../pages_DDQC/pages/RentBike/RentBikeHome",
				// 				ImageURL: "../../static/Home/DDQC.png",
				// 				ItemTitle: "达达骑车"
				// 			},
				// 			{
				// 				IsUse: true,
				// 				clickURL: "../../pages_DDQC/pages/GRZY/zy_QRcode",
				// 				ImageURL: "../../static/Home/GJSM.png",
				// 				ItemTitle: "公交刷码"
				// 			},
				// 			{
				// 				IsUse: true,
				// 				clickURL: "../../pages_DDQC/pages/GRZY/zy_homepage",
				// 				ImageURL: "../../static/Home/QB.png",
				// 				ItemTitle: "达达钱包"
				// 			},
				// 			{
				// 				IsUse: true,
				// 				clickURL: "../../pages_DDQC/pages/Bus/BusSeach",
				// 				ImageURL: "../../static/Home/GJCX.png",
				// 				ItemTitle: "公交查询"
				// 			},
				// 		]
				// 	},
				// 	{
				// 		ItemArr: [{
				// 				IsUse: true,
				// 				clickURL: "../../pages_DDQC/pages/Bus/TicketPurchase",
				// 				ImageURL: "../../static/Home/CPDG.png",
				// 				ItemTitle: "车票订购"
				// 			},
				// 			{
				// 				IsUse: false,
				// 				clickURL: "",
				// 				ImageURL: "../../static/Home/BCFW2.png",
				// 				ItemTitle: "包车服务"
				// 			},
				// 			{
				// 				IsUse: false,
				// 				clickURL: "",
				// 				ImageURL: "../../static/Home/serve/jqgoupiao2.png",
				// 				ItemTitle: "景区门票"
				// 			},
				// 			{
				// 				IsUse: false,
				// 				clickURL: "",
				// 				ImageURL: "../../static/Home/LYCP2.png",
				// 				ItemTitle: "旅游产品"
				// 			},
				// 		]
				// 	},
				// 	{
				// 		ItemArr: [{
				// 				IsUse: false,
				// 				clickURL: "",
				// 				ImageURL: "../../static/Home/YYJC2.png",
				// 				ItemTitle: "预约检测"
				// 			},
				// 			{
				// 				IsUse: false,
				// 				clickURL: "",
				// 				ImageURL: "../../static/Home/ZYX2.png",
				// 				ItemTitle: "自由行"
				// 			}
				// 		]
				// 	}
				// ],
				applyName: '',
				type2: 0,
				departure: '',
				datestring: '',
				Week: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '',
				destination: '',
				historyLines: '', //历史
				way: '根据交通运输部令 2016年第82 相关规定，网购票需要旅客提供姓名、身份证号码信息，有关信息将用于旅客进站身份核验、行前取票、验票乘车等环节。身份信息不符将无法进站和乘车。 <p></p> 13328513020（ 时间：9:00-19:30 ） <p></p> 13365957285（ 时间：9:00-18:30 ）',
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			const value = uni.getStorageSync('launchFlag');
			console.log(value)
			if (value !== true) {
				uni.setStorage({
					key: 'launchFlag',
					data: true,
					success: function() {
						uni.navigateTo({
							url: 'guidePage'
						})
					}
				})
			}
			// #endif
			// var a = this.$oSit.Interface.address.Url;
			// console.log(a)
			//加载应用名称
			this.applyName = this.$oSit.Interface.system.applyName;
			var that = this;
			// #ifdef APP-PLUS
			//获取系统信息
			uni.getSystemInfo({
				success(res) {
					console.log('获取系统信息', res)
					//获取系统平台 iOS Android
					that.platform = res.platform;
					// 获取本地应用资源版本号  
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						that.version = inf.version; //获取当前版本号
						setTimeout(function() {
							//检测升级
							that.updateAPP();
						}, 1500)
					});
				}
			})
			// #endif
			// this.GetRotationChart();
			this.loadData();
			//#ifdef APP-PLUS
			// this.loadService();
			this.checkLogin(); //登录是否过期
			//#endif

			//获取新闻数据
			that.GetNews();
			//获取客服热线
			that.ConsumerHotline();

			if (that.departure == '' || that.destination == '' || that.type2 == 0) {
				that.departure = '请选择起点';
				that.destination = '请选择终点';
			} else {
				that.departure = '请选择终点';
				that.destination = '请选择起点';
			}
		},

		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo != '') {
				that.checkCurrentStatus();
			}
			// #ifdef MP-WEIXIN
			that.getLoginState();
			//#endif
			// #ifdef  H5
			that.getCode();
			//#endif
		},

		//页面触底
		// onReachBottom() {
		// 	uni.showLoading({
		// 		title: '加载更多中...',
		// 		icon: 'loading'
		// 	})
		// 	this.getMore();
		// },
		components: {
			uniPopup,
			MxDatePicker,
		}, //注册为子组件
		methods: {
			//--------------轮播图切换修改背景色----------------------------------
			swiperChange: function(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},

			TitleJump: function(e, Url) {
				if (Url == "../../pages_DDQC/pages/Bus/TicketPurchase") {
					Url = "../../pages_DDQC/pages/Bus/TicketPurchase?id=" + this.userInfo.userId;
				}
				if (e) {
					this.natTo2(Url);
				} else {
					this.natTo();
				}
			},
			//----------------------自动更新-------------------------------
			updateAPP: function() {
				var that = this;
				let systemType = 0;
				if (that.platform == 'ios') {
					systemType = 1;
				} else {
					systemType = 0;
				}
				uni.request({
					url: $DDTInterface.DDTInterface.GetAppVersion.Url,
					method: $DDTInterface.DDTInterface.GetAppVersion.method,
					data: {
						systemType: systemType
					},
					success(res) {
						if (res.data.status == true) {
							if (that.platform == 'ios') {
								if (that.version != res.data.data.VersionID) {
									uni.showModal({
										title: '温馨提示',
										content: '当前版本' + that.version + '\n' + '发现新版本，是否前往更新',
										complete(res) {
											if (res.confirm) {

												let appleId = 1466344848 //应用的appId
												plus.runtime.launchApplication({
													action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
												}, function(e) {
													console.log('Open system default browser failed: ' + e.message);
												});
												// let url = 'https://www.pgyer.com/OnVm?sign=&auSign=&code=';
												// plus.runtime.openURL(url, function(res) {
												// 	console.log(res);
												// });
											}
										}
									})
								}
							} else {

							}
						} else {
							// uni.showToast({
							// 	title:res.data.msg,
							// 	icon:'none'
							// })
						}
					},
					fail(res) {
						console.log('获取版本信息失败', res)
					}
				})
			},
			//--------------------------获取客服热线--------------------------
			ConsumerHotline: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.ConsumerHotline.Url,
					method: $DDTInterface.DDTInterface.ConsumerHotline.method,
					data: {},
					success(res) {
						if (res.data.status == true) {
							uni.setStorageSync('ConsumerHotline', res.data.data)
						}
					},
					fail(res) {
						console.log('返回客服热线数据失败', res)
					}
				})
			},
			//--------------------------新闻资讯--------------------------
			GetNews: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetNews.Url,
					method: 'POST',
					data: {},
					success(res) {
						// console.log('请求新闻资讯成功', res)
						if (res.data.status == true) {
							that.consultingService = res.data.data;
						}
					},
					fail(res) {
						console.log('请求新闻资讯失败', res)
					}
				})
			},
			newsClick: function(item) {
				uni.navigateTo({
					url: '../../pages_DDQC/pages/GRZY/newsDetail?id=' + item.AID,
				})
			},
			//----------------------接口数据-------------------------------
			loadData: function() {
				//请求新闻资讯
				// uni.request({
				// 	url: $lyfw.Interface.currency_zhly.value,
				// 	method: $lyfw.Interface.currency_zhly.method,
				// 	success: (e) => {
				// 		console.log(e)
				// 		if (e.data.msg == '获取成功') {
				// 			if (e.data.data.length == 0) {
				// 				this.disStatus = 1;
				// 			} else {
				// 				this.goodsList = e.data.data;
				// 				this.disStatus = 0;
				// 			}
				// 		} else {
				// 			uni.hideLoading()
				// 			uni.stopPullDownRefresh()
				// 			this.goodsList = '';
				// 			uni.showToast({
				// 				title: '获取失败',
				// 				icon: 'none'
				// 			})
				// 		}
				// 	},
				// 	fail: function() {
				// 		uni.hideLoading()
				// 		uni.stopPullDownRefresh()
				// 		uni.showToast({
				// 			title: '网络异常，请检查网络后尝试',
				// 			icon: 'none'
				// 		})
				// 	}
				// })

				//请求六宫格数据
				uni.request({
					url: $lyfw.Interface.spt_GetticketSearchByrequestArea.value,
					method: $lyfw.Interface.spt_GetticketSearchByrequestArea.method,
					data: {
						// requestArea : this.regionWeixin,
						requestArea: '泉州市'
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						this.sixPalaceList = res.data.data;
					}
				})

				//请求图片
				uni.request({
					url: $lyfw.Interface.qg_GetImage.value,
					method: $lyfw.Interface.qg_GetImage.method,
					data: {
						model: 9, //模块名称
						systemtype: 'XCX', //应用类型
						companyid: this.applyName, //公司名称
						// type:'背景图', //图片类型
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res)
						this.imgXXDT = res.data.data.filter(item => {
							return item.type == '新闻资讯';
						})
						this.background = res.data.data.filter(item => {
							return item.type == '轮播图';
						})
						this.NanpingStyle = res.data.data.filter(item => {
							return item.type == '南平风采';
						})
						// console.log(this.imgXXDT)
					}
				})
				uni.stopPullDownRefresh();
			},
			//---------------------页面触底加载信息-----------------------------

			getMore() {
				this.loadingType = 1;
				if (this.current == 0) {
					if (this.zy_dataIndex < this.goodsList.length) {
						var a = this.zy_dataIndex + 4;
						this.zy_dataIndex = a;
						this.loadingType = 0;
						uni.hideLoading()
					} else if (this.zy_dataIndex >= this.goodsList.length) {
						this.loadingType = 2;
						uni.hideLoading()
					}
				}
			},

			//---------------------资讯详情页-----------------------------------

			informationTo: function(e) {
				uni.navigateTo({
					url: './InformationDetails?aid=' + e
				})
			},

			Jump() {
				uni.navigateTo({
					url: '../../pages_DDQC/pages/GRZY/zy_newsScreening',
				})
			},

			natTo: function(url) {
				uni.showToast({
					title: '正在开发中，尽情期待..',
					icon: 'none'
				})
				// uni.navigateTo({
				// 	url:'../../pages_CTKY/pages/CTKY/TraditionSpecial/Home/ctkyIndex'
				// })
			},

			natTo2: function(e) {
				var that = this;
				// #ifdef H5
				uni.navigateTo({
					url: e,
				})
				// #endif
				// #ifndef H5
				if (that.userInfo !== '') {
					uni.navigateTo({
						url: e,
					})
				} else if (that.userInfo == '') {
					uni.navigateTo({
						url: '../GRZX/userLogin',
					})
				}
				// console.log('是否拿到缓存', that.userInfo)
				// #endif
			},

			//路由整合
			godetail: function(e) {
				uni.navigateTo({
					// url:'../../pages_DDQC/pages/GRZY/zy_QRcode'
					url: '',
				})
			},

			// #ifdef  H5
			//获取openid
			getCode() {
				let that = this;
				let Appid = that.$GrzxInter.appConfig.H5Config.H5AppId; //H5AppId
				let AppSecret = that.$GrzxInter.appConfig.H5Config.H5AppSecret; //H5AppSecre
				let code = this.getUrlParam('code'); //是否存在code
				console.log(code);
				let local = that.$GrzxInter.appConfig.local.url;
				if (code == null || code === "") {
					//不存在就打开上面的地址进行授权
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						Appid +
						"&redirect_uri=" +
						encodeURIComponent(local) +
						"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				} else {
					// 存在则通过code传向后台调用接口返回微信的个人信息
					uni.request({
						url: that.$GrzxInter.Interface.getWxUserinfo.value + '?code=' + code +
							'&Appid=' + Appid + '&Appsecret=' + AppSecret,
						// url：: 'http://27.148.155.9:9056/CTKY/getWxUserinfo?code=' + code + '&Appid=' + Appid +
						// 	'&Appsecret='+AppSecre,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: that.$GrzxInter.Interface.getWxUserinfo.method,
						success(res) {
							console.log(res, "res")
							if (res.data.openid != "" && res.data.openid != null) {
								uni.setStorageSync('scenicSpotOpenId', res.data.openid)
							}
							uni.setStorageSync('wxuserInfo', res.data)
							let openid = uni.getStorageSync('scenicSpotOpenId') || '';
							console.log(openid, "openid")
							if (openid != "" && openid != null && openid != undefined) {
								console.log("访问地址", that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.value)
								console.log("应用名称", that.$GrzxInter.systemConfig.applyName)
								console.log("应用类型", that.$GrzxInter.systemConfig.openidtype)
								uni.request({
									url: that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.value,
									data: {
										openid: openid,
										systemname:that.$GrzxInter.systemConfig.appName,//应用名称
										openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
									},
									method: that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.method,
									success(res1) {
										console.log(res1, 'res1')
										//判断是否有绑定手机号
										if (res1.data.msg == "获取用户信息失败,不存在该openID用户信息") {
											uni.showModal({
												content: '您暂未绑定手机号，是否绑定',
												confirmText: '去绑定',
												cancelText: '暂不绑定',
												success(res1) {
													if (res1.confirm) {
														uni.navigateTo({
															url: '/pages/GRZX/wxLogin'
														})
													} else if (res1.cancel) {
														// console.log('用户点击取消');
														uni.showToast({
															title: '未绑定手机号，将会影响部分功能的正常运行',
															icon: 'none'
														})
													}
												}
											})
										}
										console.log(openid, 'openid1')
										if (openid == res1.data.data.openId_wx && openid != "" && res1.data.status) {
											uni.setStorageSync('userInfo', res1.data.data)
										}
									}
								})
							}
						},
						fail(err) {
							console.log(err)
							uni.showToast({
								title: "登录失败",
								icon: 'none'
							})
						}
					})
				}
			},
			//判断code信息是否存在
			getUrlParam(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let url = window.location.href.split('#')[0]
				let search = url.split('?')[1]
				if (search) {
					var r = search.substr(0).match(reg)
					if (r !== null) return unescape(r[2])
					return null
				} else {
					return null
				}
			},
			//#endif
			// #ifdef MP-WEIXIN
			getLoginState() {
				uni.getStorage({
					key: 'isCanUse',
					success(res) {},
					fail(err) {
						uni.showModal({
							content: '您暂未登录，是否登录',
							confirmText: '去登录',
							cancelText: '暂不登录',
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/Home/wxAuthorize?type=index'
									})
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			//#endif
			checkCurrentStatus: function() { //检测用户是否有未完成的订单
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetBizStatus.Url,
					method: $DDTInterface.DDTInterface.GetBizStatus.method,
					data: {
						loginname: that.userInfo.phoneNumber, //手机号
					},
					success(response) {
						uni.hideLoading()
						if (response.data.status == true) {
							if (response.data.data.bizStatus == '已租车') {
								//当前有未完成订单,跳转到行程页面
								uni.showModal({
									title: '温馨提示',
									content: '当前有未完成订单，是否前往？',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../../pages_DDQC/pages/RentBike/Riding'
											})
										}
									}
								})
							} else if (response.data.data.bizStatus == '租车超时支付中') {
								//租车超时支付中，跳转到支付页面
								uni.showModal({
									title: '温馨提示',
									content: '当前有订单未支付，请立即前往支付',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../../pages_DDQC/pages/RentBike/Payment'
											})
										}
									}
								})
							}
						} else {
							console.log('返回数据false', response)
						}
					},
					fail(response) {
						console.log(response)
					}
				})
			},
			//-------------弹窗开始--------------------
			loadService: function() { //加载是否服务
				var that = this;
				uni.getStorage({
					key: 'acceptService',
					success(res) {
						if (!res.data) {
							that.openPopup('centerPopup');
						}
					},
					fail(err) {
						that.openPopup('centerPopup');
					}
				})
			},
			//-----------开启弹窗------------
			openPopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].open();
				});
			},
			//-----------关闭弹窗------------
			closePopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].close();
				});
			},
			confirm: function() {
				uni.setStorageSync('acceptService', true);
				this.closePopup('centerPopup');
			},
			agreementClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=软件许可及服务协议',
				})
			},
			privacyClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=隐私政策',
				})
			},
			//-------------弹窗结束--------------------

			//-------------登录过期开始--------------------
			checkLogin() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						if (res.data.phoneNumber != "") {
							that.GetUserLastLoginTime(res.data.phoneNumber);
						}
					}
				})
			},
			GetUserLastLoginTime(e) {
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserLastLoginTime.value,
					data: {
						phoneNumber: e,
					},
					method: that.$GrzxInter.Interface.GetUserLastLoginTime.method,
					success(res) {
						var time = that.getSpecifiedTime(90, res.data.data.lastLogintime);
						if (that.checkDate(time) == "已过期") {
							uni.navigateTo({
								url: that.$GrzxInter.Route.verificateName.url + '?type=login',
							})
						}
					}
				})
			},
			//--------------获取指定的时间-------------
			getSpecifiedTime: function(e, date) {
				var num = parseInt(e, 10); //90天过期
				if (date == 0) {
					var date = new Date();
					var currentDate = JSON.stringify(date).substring(1, 11);
					var arry = currentDate.split("-");

				} else {
					var currentDate = JSON.stringify(date).substring(1, 9);
					var arry = currentDate.split("/");
				}
				var year = parseInt(arry[0], 10);
				var month = parseInt(arry[1], 10);
				var day = parseInt(arry[2], 10);
				//月份的方法：getMonth()从 Date 对象返回月份 (0 ~ 11)。
				var structDate = new Date(year, month - 1, day);
				//setDate增减天数
				structDate.setDate(structDate.getDate() + num);
				//如果月份长度少于2，则前加 0 补位   
				if ((structDate.getMonth() + 1).toString().length == 1) {
					month = 0 + "" + (structDate.getMonth() + 1).toString();
				} else {
					month = (structDate.getMonth() + 1).toString();
				}
				//如果天数长度少于2，则前加 0 补位   
				if (structDate.getDate().toString().length == 1) {
					day = 0 + "" + structDate.getDate().toString();
				} else {
					day = structDate.getDate().toString();
				}
				var newDate = structDate.getFullYear() + "-" + month + "-" + day;
				return newDate;
			},
			//--------------检查日期-------------
			checkDate: function(date1) {
				var date2 = this.getSpecifiedTime(0, 0);
				// console.log(date1,"登录过期时间")
				// console.log(date2,"当前时间")
				var arry1 = date1.split("-");
				var arry2 = date2.split("-");
				var time1 = parseInt(arry1[0] + arry1[1] + arry1[2], 10);
				var time2 = parseInt(arry2[0] + arry2[1] + arry2[2], 10);
				// console.log(time1-time2)
				if (time1 >= time2) {
					return "未过期";
				} else {
					return "已过期";
				}
			},
			//-------------登录过期结束--------------------

		},
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	.swiper-container {
		pointer-events: none;
	}

	//轮播图样式
	.swi {
		height: 420upx;
		width: 100%;

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

	// 默认指示点的样式
	.swi .wx-swiper-dot {
		width: 15upx;
		height: 15upx;
		border-radius: 15upx;
		opacity: 0.75;
	}

	// .wx-swiper-dots {
	// 	position: relative;
	// 	left: unset !important;
	// 	right: 0;
	// }

	// .wx-swiper-dots.wx-swiper-dots-horizontal {
	// 	margin-bottom: 5rpx;
	// }

	.wx-swiper-dots.wx-swiper-dots-horizontal {
		margin-bottom: -5rpx;
	}

	// 选中指示点的样式
	// .zl_swi .wx-swiper-dot.wx-swiper-dot-active {
	// 	width: 40upx;
	// 	height: 15upx;
	// 	border-radius: 15upx;
	// 	// opacity: 0.75;
	// }

	.zc_TabBackground {
		background-color: #FFFFFF;
		width: 100%;
		height: 47upx;

		.tb_tab {
			position: relative;
			display: flex;
			width: 100%;
			height: 47upx;

			.tb_button {
				position: relative;
				display: flex;
				width: 50%;
				height: 100%;
				margin-top: 13upx;
				margin-right: 13upx;

				.tb_button2 {
					position: absolute;
					right: 0;
					width: 14upx;
					height: 14upx;
					background: rgba(215, 215, 215, 1);
					border-radius: 50%;

					&.current {
						background: #70c778;
						// background-color: #FFFFFF;
					}
				}
			}

			.tb_button3 {
				position: relative;
				display: flex;
				width: 50%;
				height: 100%;
				margin-left: 13upx;
				margin-top: 13upx;

				.tb_button4 {
					position: absolute;
					left: 0;
					width: 14upx;
					height: 14upx;
					background: rgba(215, 215, 215, 1);
					border-radius: 50%;

					&.current {
						background: #70c778;
						// background-color: #FFFFFF;
					}
				}
			}
		}
	}

	// 车票订购
	.itemContent {
		width: 20%;
		height: 178upx;
		text-align: center;
		align-items: center;
	}

	.itemImage {
		width: 80rpx;
		height: 80rpx;
		margin-top: 50upx;
	}

	.itemText {
		margin-top: 10rpx;
		font-size: 27rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
		display: block;
	}

	.zl_swi {
		height: 200upx;
		width: 100%;
		padding-bottom: 4upx;

		.swiItem {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: #FFFFFF;

			.zl_topClick {
				display: flex;
				top: 0;

				// 车票订购
				.zl_ticketOrdering {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_toImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_toText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//网络约车
				.zl_carAppointment {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_caImage {
						width: 80rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_caText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//公交查询
				.zl_transit {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_tsImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_tsText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//包车服务
				.zl_charterService {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_csImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_csText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//旅游服务
				.zl_tourismServices {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_teImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_teText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}
			}
		}
	}

	//咨询动态
	.notice {
		background: #fff;
		margin-top: 9upx;

		.zl_content {
			display: flex;

			.zl_noImage {
				width: 146upx;
				height: 83upx;
				margin: 47upx 0upx;
				margin-left: 31upx;
			}

			.zl_noContent {

				.swi2 {
					width: 473upx;
					height: 129upx;
					margin-top: 35upx;
					margin-left: 26upx;

					.zl_noText {
						// display: block;
						font-size: 26upx;
						color: #333333;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				.zl_label {
					display: flex;
					margin-left: 45upx;
					margin-top: 17upx;

					.la_label {
						margin-right: 10upx;

						.la_background {
							background-color: #e8f6e9;
							border-radius: 20px;
							font-size: 24upx;
							color: #65C36D;
							padding: 9upx 20upx;
						}
					}
				}
			}
		}
	}

	// .zl_topClick {
	// 	display: flex;
	// 	background-color: #FFFFFF;

	// 	// 车票订购
	// 	.zl_vajraDistrict {
	// 		width: 190upx;
	// 		height: 178upx;
	// 		text-align: center;

	// 		.zl_vdImage {
	// 			width: 60rpx;
	// 			height: 60rpx;
	// 			margin-top: 50upx;
	// 		}

	// 		.zl_vdText {
	// 			margin-top: 10rpx;
	// 			font-size: 24rpx;
	// 			font-family: Source Han Sans SC;
	// 			font-weight: 400;
	// 			color: #333333;
	// 			display: block;
	// 		}
	// 	}
	// }

	// 旅游推荐
	.zl_recommend {
		background: #fff;
		margin-top: 16upx;
		padding: 0 31upx;

		.zl_reContent {
			position: relative;
			padding-top: 40upx;

			.zl_reTitle {
				font-size: 32upx;
				color: #333333;
				font-weight: bold;
			}

			.zl_reMore {
				position: absolute;
				padding-right: 31upx;
				padding: 4upx 0;
				right: 0;
				font-size: 24upx;
				color: #5E5E60;
			}
		}

		.zl_reContent2 {
			padding-top: 42upx;
			padding-bottom: 40upx;

			.zl_contentImage1 {
				display: flex;

				// 泉州小西埕
				.ct_content1 {
					display: flex;
					position: relative;
					margin-right: 10upx;


					.ct_image1 {
						width: 454upx;
						height: 207upx;
						overflow: hidden;
						border-radius: 15upx;

					}

					.ct_text1 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
					}
				}

				// 稻田摸鱼
				.ct_content2 {
					display: flex;
					position: relative;

					.ct_image2 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;
						border-radius: 15upx;

					}

					.ct_text2 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}

			.zl_contentImage2 {
				display: flex;
				margin-top: 20upx;

				// 泉州钟楼
				.ct_content3 {
					display: flex;
					position: relative;

					.ct_image3 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;
						border-radius: 15upx;

					}

					.ct_text3 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 泉州洛阳桥
				.ct_content4 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image4 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;
						border-radius: 15upx;

					}

					.ct_text4 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 七彩官畲
				.ct_content5 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image5 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;
						border-radius: 15upx;

					}

					.ct_text5 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}

	/* 南平周边-样式*/
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 360upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: 32upx;
			color: #333;
			line-height: 72upx;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 160px;
		}

		.Portrait {
			width: 40upx;
			height: 40upx;
			opacity: 1;
		}

		.price {
			position: relative;
			font-size: 26upx;
			color: #666;
			left: 54upx;
			top: 32upx;
			max-width: 5;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 76px;
			margin-top: -80upx;
		}

		.price-zan {
			font-size: 24upx;
			color: #666;
			float: right;
			margin-top: 3upx;
		}
	}

	/*通用字体样式*/
	.titNp {
		margin-top: 20upx;
		padding: 32upx;
		color: #333333;
		font-size: 34upx;
		font-weight: bold;
		background: #fff;

	}

	//弹框start
	.centerClass {
		//弹框的样式
		width: 82%;
		margin-left: 9%;
		// height: 550upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.pTitleClass {
		padding-top: 15upx;
		text-align: center;
		font-size: 38upx;
		color: #333333;
		padding: 40upx 0 20upx 0;
	}

	.pTextClass {
		width: 80%;
		margin-left: 10%;
		font-size: 34upx;
	}

	.btnBox {
		width: 100%;
		border-top: 1upx solid #EAEAEA;
		// height: 80upx;
		margin-top: 80upx;
		display: flex;
		flex-direction: row; //column纵向，row横向
	}

	.btnClass1 {
		color: #333333;
		text-align: center;
		width: 50%;
		font-size: 38upx;
		padding: 25upx 0;
		border-right: 1upx solid #EAEAEA;
	}

	.btnClass2 {
		color: #2F9BFE;
		text-align: center;
		width: 50%;
		font-size: 38upx;
		padding: 25upx 0;
	}

	//弹框end

	//指示点
	.dots {
		position: relative;
		// background-color: #FFFFFF;
		bottom: 28rpx;
		left: 50%;
		// 这里一定要注意兼容不然很可能踩坑          
		transform: translate(-50%, 0);
		-webkit-transform: translate(-50%, 0);
		z-index: 99;
		display: flex;
		flex-direction: row;
		justify-content: center;

		.dot {
			width: 20rpx;
			height: 6rpx;
			transition: all .6s;
			background: #f6f6f6;
			margin-right: 10rpx;
		}

		.active {
			width: 20rpx;
			height: 6rpx;
			background: #65C36D;
		}
	}

	//兴业银行
	//顶部筛选样式
	.screen {
		height: 106upx;
		position: sticky;
		top: 0;
		z-index: 1;

		.screenView {
			left: 0;
			display: flex;
			width: 100%;
			height: 87upx;
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
				font-size: 34upx;
				color: #FFFFFF;
				position: relative;



				&.current {
					color: #FFFFFF;
					font-size: 34upx;
					font-weight: bold;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 70upx;
						height: 3upx;
						border-bottom: 4upx solid #FFFFFF;
					}
				}
			}
		}
	}

	//顶部
	.zh_top {
		position: relative;
		width: 100%;
		height: 100%;

		//选择路线
		.top_chooseTheRoute {
			position: absolute;
			// display: flex;
			width: 342upx;
			height: 70upx;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 99;
			top: 232upx;

			.top_text {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			//出发点
			.setOut {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				width: 310upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}

			.jdticon {
				position: absolute;
				right: 0;
				top: 58upx;
				height: 14px;
				padding-right: 28upx;
			}
		}

		.top_destination {
			position: absolute;
			// display: flex;
			width: 192upx;
			height: 70upx;
			// overflow: hidden;
			left: 61%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 99;
			top: 232upx;

			.top_text2 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			.destination {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				// width: 234upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}
		}

		//选择到达起点
		.top_startingPoint {
			position: absolute;
			// display: flex;
			width: 192upx;
			height: 70upx;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 99;
			top: 232upx;

			.top_text3 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			.startingPoint {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				// width: 234upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}
		}

		//选择到达终点
		.top_chooseEnd {
			position: absolute;
			// display: flex;
			width: 342upx;
			height: 70upx;
			// overflow: hidden;
			left: 41%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 99;
			top: 232upx;

			.top_text4 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			//出发点
			.setEnd {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				width: 310upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}

			.jdticon {
				position: absolute;
				right: 0;
				top: 58upx;
				height: 14px;
				padding-right: 28upx;
			}
		}

		//选择时间
		.top_chooseTime {
			position: absolute;
			display: flex;
			width: 604upx;
			// height:100%;
			overflow: hidden;
			left: 6%;
			padding: 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 99;
			top: 366upx;

			//出发点
			.dateClass {
				display: flex;
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				// width: 234upx;
				left: 0;
				text-align: left;
			}
		}

		.top_image {
			width: 750upx;
			height: 712upx;
			overflow: hidden;
			margin: 0 auto;
		}
	}

	//弹框样式
	.te_boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;

		.bv_titleView {
			display: flex;
			margin: 24upx 0;

			//弹框标题
			.tv_text1 {
				// position: relative;
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
			height: 100%;
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

	//点击态
	.ve_hover {
		transition: all .3s; //过度
		border-top-left-radius: 22rpx;
		border-bottom-left-radius: 22rpx;
		opacity: 0.9;
		background: #E4E7ED;
	}

	//查询点击态
	.ve_hover2 {
		transition: all .3s; //过度
		border-radius: 64upx;
		opacity: 0.8;
		background: #F0AD4E;
	}

	//底部按钮
	.tjButton {
		position: absolute;
		border-radius: 64upx;
		left: 6%;
		padding: 28upx 50upx;
		top: 498upx;
		width: 560upx;
		background-color: #D17000;
		text-align: center;
		color: #FFFFFF;
		font-size: 34upx;
		font-weight: 400;
		box-shadow: 0px 20px 81px 0px rgba(184, 99, 0, 0.6);
		z-index: 99;
	}

	.top_popup {
		position: absolute;
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #FFFFFF;
		z-index: 99;
		top: 636upx;
	}
</style>
