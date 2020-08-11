<template>
	<view class="se_view">
		<view v-if="applyName=='南平综合出行'" class="sv_view">
			<image class="sv_image" :src="imageIndex.imageUrl" lazy-load="true"></image>
		</view>

		<view class="sv_view2">
			<view class="sv_title">出行</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index1) in ItemArr" :key="index1">
					<view @click="natTo(item.clickURL)">
						<image v-if="item.ItemTitle =='达达骑车'" class="sv_print2" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='公交查询'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='车票订购'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='包车服务'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='网络约车'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='公务租车'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='小件快递'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='天气'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='航班'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='火车'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='检测预约'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='武夷新区'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='村村通'" class="sv_print" :src="item.ImageURL" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
				<!-- <view class="sv_view3" @click="natTo('../../pages_DDQC/pages/RentBike/RentBikeHome')">
					<image class="sv_print2" src="../../static/Home/serve/DDQC.png"></image>
					<text class="sv_text">达达骑车</text>
				</view> -->
				<!-- 				<view class="sv_view3" @click="natTo('')">
					<image class="sv_print" src="../../static/Home/serve/cpdinggou.png"></image>
					<text class="sv_text">车票订购</text>
				</view> -->
				<!-- 	<view class="sv_view3" @click="natTo('../../pages_DDQC/pages/Bus/BusSeach')">
					<image class="sv_print" src="../../static/Home/serve/gjchaxun.png"></image>
					<text class="sv_text">公交查询</text>
				</view>
				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hcpdinggou.png"></image>
					<text class="sv_text">车票订购</text>
				</view> -->



				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hgjchaxun.png" ></image>
					<text class="sv_text">公交查询</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo('')">
					<image class="sv_print" src="../../static/Home/serve/bcfuwu.png"></image> 
					<text class="sv_text">包车服务</text>
				</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hbcfuwu.png"></image>
					<text class="sv_text">包车服务</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo('../../pages_CCT/pages/CCT/villageBus')">
					<image class="sv_print" src="../../static/Home/serve/cuncuntong.png"></image>
					<text class="sv_text">村村通</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hcuncuntong.png"></image>
					<text class="sv_text">村村通</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo('../../pages_XQZX/pages/XQZX/districtLine')">
					<image class="sv_print" src="../../static/Home/serve/xqzhuanxian.png"></image>
					<text class="sv_text">新区专线</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hxqzhuanxian.png"></image>
					<text class="sv_text">新区专线</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo('../../pages_JCYY/pages/JCYY/theDay')">
					<image class="sv_print" src="../../static/Home/serve/jcyuyue.png"></image>
					<text class="sv_text">检测预约</text>
				</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hjcyuyue.png"></image>
					<text class="sv_text">检测预约</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/wlyueche.png" ></image>
					<text class="sv_text">网络约车</text>
				</view> -->

				<!-- 	<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hwlyueche.png"></image>
					<text class="sv_text">网络约车</text>
				</view>
 -->


				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/gwzhuche.png"></image>
					<text class="sv_text">公务租车</text>
				</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hgwzhuche.png"></image>
					<text class="sv_text">公务租车</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/xjkuaidi.png"></image>
					<text class="sv_text">小件快递</text>
				</view> -->

				<!-- 	<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hxjkuaidi.png"></image>
					<text class="sv_text">小件快递</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/tianqi.png"></image>
					<text class="sv_text">天气</text>
				</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/htianqi.png"></image>
					<text class="sv_text">天气</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hangban.png"></image>
					<text class="sv_text">航班</text>
				</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hhangban.png"></image>
					<text class="sv_text">航班</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/huoche.png"></image>
					<text class="sv_text">火车</text>
				</view> -->

				<!-- 	<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hhuoche.png"></image>
					<text class="sv_text">火车</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo('/pages_CTKY/pages/CTKY/SpecialBus/Home/specialBusHome')">
					<image class="sv_print" src="../../static/Home/serve/dzbashi.png"></image> 
					<text class="sv_text">定制巴士</text>
				</view> -->

				<!-- 				<view class="sv_view3" @click="natTo3()">
					<image class="sv_print" src="../../static/Home/serve/hdzbashi.png"></image> 
					<text class="sv_text">定制巴士</text>
				</view> -->

			</view>
		</view>

		<view class="sv_view2">
			<view class="sv_title">旅游</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index) in ItemArr2" :key="index">
					<view @click="natTo(item.clickURL)">
						<image v-if="item.ItemTitle =='自由行'" class="sv_print3" style="width: 47upx;" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='跟团游'" class="sv_print3" style="width: 57upx;" :src="item.ImageURL" lazy-load="true"></image>
						<image v-if="item.ItemTitle =='景区购票'" class="sv_print3" style="width:52upx;" :src="item.ImageURL" lazy-load="true"></image>
<!-- 						<image v-if="item.ItemTitle =='旅游产品'" class="sv_print3" style="width: 62upx;" :src="item.ImageURL" lazy-load="true"></image> -->
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
				<!-- 			<view class="sv_view3" @click="natTo('/pages_LYFW/pages/LYFW/independentTravel/it_list')">
				<image class="sv_print3" src="../../static/Home/serve/ziyouxing.png" style="width: 47upx;"></image>
				<text class="sv_text">自由行</text>
			</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print3" src="../../static/Home/serve/hziyouxing.png" style="width: 47upx;"></image>
					<text class="sv_text">自由行</text>
				</view> -->

				<!-- 			<view class="sv_view3" @click="natTo('/pages_LYFW/pages/LYFW/groupTour/groupTourList')">
				<image class="sv_print3" src="../../static/Home/serve/gentuanyou.png" style="width: 57upx;"></image>
				<text class="sv_text">跟团游</text>
			</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print3" src="../../static/Home/serve/hgentuanyou.png" style="width: 57upx;"></image>
					<text class="sv_text">跟团游</text>
				</view> -->

				<!-- 			<view class="sv_view3" @click="natTo('')">
				<image class="sv_print3" src="../../static/Home/serve/jqgoupiao.png" style="width:52upx;"></image>
				<text class="sv_text">景区购票</text>
			</view> -->

				<!-- <view class="sv_view3" @click="natTo3()">
					<image class="sv_print3" src="../../static/Home/serve/hjqgoupiao.png" style="width:52upx;"></image>
					<text class="sv_text">景区购票</text>
				</view> -->

				<!-- 			<view class="sv_view3" @click="natTo('')" >
				<image class="sv_print3" src="../../static/Home/serve/lvyouchanping.png" style="width: 62upx;"></image>
				<text class="sv_text">旅游产品</text>
			</view> -->

			<!-- 	<view class="sv_view3" @click="natTo3()">
					<image class="sv_print3" src="../../static/Home/serve/hlyshanpin.png" style="width: 62upx;"></image>
					<text class="sv_text">旅游产品</text>
				</view> -->
			</view>
		</view>

		<!-- <view class="sv_view2">
			<view class="sv_title">防控</view>
			<view style="display: flex; flex-wrap: wrap;">
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/cxshenqing.png" mode="aspectFit"></image>
				<text class="sv_text">出行申请</text>
			</view>
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/qyrenzheng.png" mode="aspectFit"></image>
				<text class="sv_text">企业认证</text>
			</view>
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/zfchaxun.png" mode="aspectFit"></image>
				<text class="sv_text">政府查询</text>
			</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				applyName:'',
				imageIndex: [{
					imageUrl: '',
				}], //首页图片
				ItemArr: [{
					// 	IsUse: true,
					// 	clickURL: "../../pages_DDQC/pages/RentBike/RentBikeHome",
					// 	ImageURL: "../../static/Home/serve/DDQC.png",
					// 	ItemTitle: "达达骑车"
					// },
					// {
						IsUse: false,
						clickURL: "/pages_CTKY/pages/CTKY/TraditionSpecial/Home/ctkyIndex",
						// ImageURL: "../../static/Home/serve/hcpdinggou.png",//暗
						ImageURL: "../../static/Home/serve/cpdinggou.png",//亮
						ItemTitle: "车票订购"
					},
					{
						IsUse: true,
						clickURL: "../../pages_GJCX/pages/GJCX/busH5",
						ImageURL: "../../static/Home/serve/gjchaxun.png",//亮
						// ImageURL: "../../static/Home/serve/hgjchaxun.png",//暗
						ItemTitle: "公交查询"
					},
					{
						IsUse: false,
						clickURL: "../../pages_GJCX/pages/HB/hangban",
						// ImageURL: "../../static/Home/serve/hhangban.png",//暗
						ImageURL: "../../static/Home/serve/hangban.png",//亮
						ItemTitle: "航班"
					},
					{
						IsUse: false,
						clickURL: "../../pages_GJCX/pages/HC/huoche",
						// ImageURL: "../../static/Home/serve/hhuoche.png",//暗
						ImageURL: "../../static/Home/serve/huoche.png",//亮
						ItemTitle: "火车"
					},
					{
						IsUse: false,
						// clickURL: "/pages_BCFW/pages/BCFW/bf_chartered",
						clickURL:"",
						ImageURL: "../../static/Home/serve/hbcfuwu.png",//暗
						// ImageURL: "../../static/Home/serve/bcfuwu.png",//亮
						ItemTitle: "包车服务"
					},
					
					{
						IsUse: true,
						clickURL: "./ChooseSite",
						// ImageURL: "../../static/Home/serve/hwlyueche.png",//暗
						ImageURL: "../../static/Home/serve/wlyueche.png",//亮
						ItemTitle: "网络约车"
					},
					// {
					// 	IsUse: false,
					// 	clickURL: "",
					// 	ImageURL: "../../static/Home/serve/hgwzuche.png",//暗
					// 	// ImageURL: "../../static/Home/serve/gwzuche.png",//亮
					// 	ItemTitle: "公务租车"
					// },
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/Home/serve/hxjkuaidi.png",//暗
						// ImageURL: "../../static/Home/serve/xjkuaidi.png",//亮
						ItemTitle: "小件快递"
					},
					// {
					// 	IsUse: false,
					// 	clickURL: "",
					// 	ImageURL: "../../static/Home/serve/htianqi.png",//暗
					// 	// ImageURL: "../../static/Home/serve/tianqi.png",//亮
					// 	ItemTitle: "天气"
					// },
				
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/Home/serve/hjcyuyue.png",//暗
						// ImageURL: "../../static/Home/serve/jcyuyue.png",//亮
						ItemTitle: "检测预约"
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/Home/serve/hxqzhuanxian.png",//暗
						// ImageURL: "../../static/Home/serve/xqzhuanxian.png",//亮
						ItemTitle: "武夷新区"
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/Home/serve/hcuncuntong.png",//暗
						// ImageURL: "../../static/Home/serve/cuncuntong.png",//亮
						ItemTitle: "村村通"
					}
				],
				ItemArr2: [{
				// 		IsUse: false,
				// 		clickURL: "",
				// 		ImageURL: "../../static/Home/serve/hziyouxing.png",//暗
				// 		// ImageURL: "../../static/Home/serve/ziyouxing.png",//亮
				// 		ItemTitle: "自由行"
				// 	},
				// 	{
				// 		IsUse: false,
				// 		clickURL: "",
				// 		ImageURL: "../../static/Home/serve/hgentuanyou.png",//暗
				// 		// ImageURL: "../../static/Home/serve/gentuanyou.png",//亮
				// 		ItemTitle: "跟团游"
				// 	},
					// {
						IsUse: true,
						clickURL: "/pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsList",
						// clickURL:"",
						ImageURL: "../../static/Home/serve/jqgoupiao.png",//亮
						// ImageURL: "../../static/Home/serve/hjqgoupiao.png",//暗
						ItemTitle: "景区购票"
					}
					// {
					// 	IsUse: false,
					// 	clickURL: "/pages_LYFW/pages/LYFW/tourismProducts/tp_ticketsList",
					// 	ImageURL: "../../static/Home/serve/lyshangpin.png",//亮
					// 	// ImageURL: "../../static/Home/serve/hlyshangpin.png",//暗
					// 	ItemTitle: "旅游产品"
					// }

				]
			}
		},
		onLoad: function() {
			this.applyName=this.$oSit.Interface.system.applyName;
			console.log(this.applyName)
			uni.request({
				url: $lyfw.Interface.qg_GetImage.value,
				method: $lyfw.Interface.qg_GetImage.method,
				data: {
					model: 6,
					type: '服务banner',
					systemtype: 'XCX',//APP,XCX,H5
					companyid: '南平综合出行',//公司名
				},
				success: (res) => {
					console.log(res)
					this.imageIndex = res.data.data

				},
			})
		},
		methods: {
			natTo: function(url) {
				if (url == '/pages_GJCX/pages/GJCX/busH5') {
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '公交查询仅支持公众号和APP',
						icon: 'none'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: url
					});
					// #endif
				}else if (url == '/pages_GJCX/pages/GJCX/hangban') {
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '航班查询仅支持公众号和APP',
						icon: 'none'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: url
					});
					// #endif
				}else if (url == '/pages_GJCX/pages/GJCX/huoche') {
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '火车查询仅支持公众号和APP',
						icon: 'none'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: url
					});
					// #endif
				} else if (url == "") {
					uni.showToast({
						title: '正在开发中，尽情期待..',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: url,
					});
				}

			},
			natTo2: function(url) {
				// #ifdef H5
				uni.showToast({
					title: '网络约车仅支持小程序或APP!',
					icon: 'none'
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url
				})
				// #endif

			},
			natTo3: function(url) {
				uni.showToast({
					title: '正在开发中，尽情期待..',
					icon: 'none'
				})

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.se_view {
		width: 100%;
		height: 100%;

		.sv_view {
			width: 698upx;
			height: 320upx;
			border-radius: 20upx;
			display: flex;
			margin-left: 26upx;
			margin-top: 43upx;

			.sv_image {
				width: 100%;
				height: 100%;
			}

		}

		.sv_title {
			font-size: 36upx;
			font-weight: bold;
			padding-top: 41upx;
			padding-left: 32upx;
		}

		.sv_view2 {
			width: 698upx;
			background: #FFFFFF;
			margin-left: 26upx;
			margin-top: 43upx;
			padding-bottom: 56upx;
			border-radius: 20upx;

			.sv_view3 {
				width: 20%;
				text-align: center;
				margin-top: 45upx;
				.sv_print {
					width: 60upx;
					height: 60upx;
				}

				.sv_print3 {
					height: 60upx;
				}

				.sv_print2 {
					width: 79upx;
					height: 56upx;
				}

				.sv_text {
					font-size: 24upx;
					font-weight: 400;
					padding-top: 24upx;
					display: block;
				}
			}
		}
	}
</style>
