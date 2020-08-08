<template>
	<view>
		<view class="zh_top">
			<image class="top_image" :src="background[0].imageUrl" mode="aspectFill"></image>
			<!-- 顶部滑动 -->
			<view style="position: absolute;z-index: 999;margin-top: 192upx;">
				<!-- <view style="width: 46%;top: 90upx;padding: 0 200upx;padding-top: 100upx;">
					<view class="screen">
						<view class="screenView">
							<view class="screenText" :class="{current:type2===0}" @click="tabClick(0)">
								出发
							</view>
							<view class="screenText" :class="{current:type2===1}" @click="tabClick(1)">
								到达
							</view>
						</view>
					</view>
				</view> -->
				
				<!-- 暂时用不到 v-if="type2==0" -->
				<view>
					<!-- 选择出发地 -->
					<view style="display: flex;margin-top: 26upx;">
						<view class="top_chooseTheRoute" hover-class="ve_hover" @tap="setOutStationTap">
							<view class="top_text">起点</view>
							<view style="display: flex;">
								<text class="setOut">{{departure}}</text>
								<text class="jdticon icon-xia"></text>
							</view>
						</view>
						<!-- 目的地 -->
						<view class="top_destination">
							<view class="top_text2">终点（不可选）</view>
							<view class="destination">{{destination}}</view>
						</view>
					</view>
				</view>
				
				<!-- <view v-if="type2==1">
					<view style="display: flex;margin-top: 26upx;"> -->
						<!-- 目的地 -->
						<!-- <view class="top_startingPoint">
							<view class="top_text3">起点（不可选）</view>
							<view class="startingPoint">{{departure2}}</view>
						</view> -->
						<!-- 选择到达地 -->
				<!-- 		<view class="top_chooseEnd" hover-class="ve_hover" @tap="setOutStationTap">
							<view class="top_text4">终点</view>
							<view style="display: flex;">
								<text class="setEnd">{{destination2}}</text>
								<text class="jdticon icon-xia"></text>
							</view>
						</view>
					</view>
				</view> -->
				
				<!-- 选择时间 -->
				<view class="top_chooseTime" hover-class="ve_hover" @click="onShowDatePicker('date')">
					<text class="dateClass">{{datestring}}&nbsp;&nbsp;&nbsp;&nbsp;{{Week}}</text>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
				 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
				
				<!-- 按钮 -->
				<view class="tjButton" hover-class="ve_hover2" @click="queryClick">查询</view>
				

				
				<view class="zl_recommend">
					<view>
						<view class="zl_reContent">
							<text class="zl_reTitle">快捷选项</text>
						</view>
						<view class="zl_cilckView" v-for="(item,index) in mainArray" :key="index" @click="quick(item)" >
							<view class="zl_textView"  hover-class="ve_hover3">{{item.LineName}}</view>
						</view>
					</view>
				</view>
				
				<view class="hp_view">
					<view class="hp_Line"></view>
					<view class="hp_text">特惠须知</view>
					<view class="hp_Line2"></view>
				</view>
				
				<view class="ct_noticeText ct_noticeText2">
					<rich-text :nodes="way2"></rich-text>
				</view>
				
				<view class="hp_view">
					<view class="hp_Line"></view>
					<view class="hp_text">购票须知</view>
					<view class="hp_Line2"></view>
				</view>
				
				<view class="ct_noticeText ct_noticeText3">
					<rich-text :nodes="way"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/HOME/uni-popup/uni-popup.vue";
	import $DDTInterface from '@/common/DDT.js'
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	import $Home from '@/common/Home.js' //引用路径
	import MxDatePicker from "@/components/HOME/mx-datepicker/mx-datepicker.vue";
	import $Zxgp from "@/common/zxgp.js"
	export default {
		components: {
			uniPopup,
			MxDatePicker,
		}, //注册为子组件
		data() {
			return {
				type2: 0,
				datestring: '',
				Week: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '',
				departure:'请选择起点',
				destination:'请选择终点',
				departure2:'请选择起点',
				destination2:'请选择终点',
				background:[{
					imageUrl: '',
				}], //背景图
				applyName:'',
				way:'',
				way2:'',
				mainArray:'',
			}
		},
		
		onLoad:function(){
			// #ifdef APP-PLUS
			const value = uni.getStorageSync('launchFlag');
			console.log(value)
			if(value !== true){
				uni.setStorage({
					key:'launchFlag',
					data:true,
					success:function(){
						uni.redirectTo({
							url:'guidePage'
						})
					}
				})
			}
			// #endif
			//加载应用名称
			this.applyName=this.$oSit.Interface.system.applyName;
			var that=this;
			// if(that.departure == '' || that.destination == '' || that.type2==0) {
			// 	that.departure = '请选择起点';
			// 	that.destination = '请选择终点';
			// }else{
			// 	that.departure2 = '请选择起点';
			// 	that.destination2 = '请选择终点';
			// }
			that.loadData();
			this.getBusStationList();
		},
		
		onShow(){
			var that=this;
			//获取当前日期
			that.getTodayDate();
			
			// #ifdef MP-WEIXIN
			that.getLoginState(); //微信授权登录
			//#endif
		},
		
		methods: {
			//----------------------接口数据-------------------------------
			loadData: function() {
				//请求图片
				uni.request({
					url: $lyfw.Interface.qg_GetImage.value,
					method: $lyfw.Interface.qg_GetImage.method,
					data: {
						model:9, //模块名称
						systemtype:'XCX',//应用类型
						companyid:this.applyName, //公司名称
						// type:'背景图', //图片类型
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res)
						this.background = res.data.data.filter(item => {
							return item.type == '背景';
						})
						// console.log(this.imgXXDT)
					}
				})
				
				uni.request({
					url: $Zxgp.KyInterface.Cs_getByTitle.Url,
					method: $Zxgp.KyInterface.Cs_getByTitle.method,
					data:{
						title:'购票须知',
						systemName:this.applyName,
					},
					success: (res) => {
						console.log('购票须知',res)
						this.way=res.data.data.msg;
						// console.log('购票须知2',this.way)
					}
				})
				
				uni.request({
					url: $Zxgp.KyInterface.Cs_getByTitle.Url,
					method: $Zxgp.KyInterface.Cs_getByTitle.method,
					data:{
						title:'兴业专线',
						systemName:this.applyName,
					},
					success: (res) => {
						console.log('兴业专线',res)
						this.way2=res.data.data.msg;
						// console.log('购票须知2',this.way)
					}
				})
				uni.stopPullDownRefresh();
			},
			
			//-----------------tab事件---------------------------------------
			tabClick(e) {
				if (e == 0) {
					
					if( this. departure2 !== '请选择起点'){
						this.departure = this.destination2;
						this.destination = this.departure2;
						this.type2 = 0;
					}else{
						this.type2 = 0;
					}
				} else if (e == 1) {
					if( this. departure !== '请选择起点'){
						console.log('222222')
						this.departure2 = this.destination;
						this.destination2 = this.departure;
						console.log(this.departure2	)
						this.type2 = 1;
					}else{
						this.type2 = 1;
					}
				}
			},
			
			//---------------------------------点击出发专线---------------------------------
			setOutStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
				    // data即为传过来的值，给上车点赋值
					that.departure = data.data;
					that.destination=data.data2;
				    //清除监听，不清除会消耗资源
				    uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url:'../../pages_ZXGP/pages/ZXGP/TraditionSpecial/stationPicker/homeSattionPick?&station=' + 'qidian' +'&type=' + this.type2,
				})
				
				// uni.$on('startstaionChange', function(data) {
				//     // data即为传过来的值，给上车点赋值
				// 	if(that.type2==0){
				// 		that.departure = data.data;
				// 		that.destination=data.data2;
				// 	}else if(that.type2==1){
				// 		that.departure2 = data.data;
				// 		that.destination2=data.data2;
				// 	}
				//     //清除监听，不清除会消耗资源
				//     uni.$off('startstaionChange');
				// });
				// uni.navigateTo({
				// 	//跳转到下个页面的时候加个字段，判断当前点击的是上车点
				// 	url:'../../pages_ZXGP/pages/ZXGP/TraditionSpecial/stationPicker/homeSattionPick?&station=' + 'qidian' +'&type=' + this.type2,
				// })
			},
			
			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var timer = year + '-' + month + '-' + day;
				this.queryWeek(date.toString().substring(0,3));
				this.datestring = timer;
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			
			},
			
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					// this[this.type] = e.value;
					this[this.type] = e.value.split('/')[0] + "-" + e.value.split('/')[1] + "-" + e.value.split('/')[2];
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0,3));
					// console.log(this[this.type]);
					// console.log(e.date.toString().substring(0,3));
					// console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					this.date = e.value;
				}
			},
			queryWeek(e) {
				console.log(e);
				switch (e) {
					case "Mon":
						this.Week='周一';
						break;
					case "Tue":
						this.Week="周二";
						break;
					case "Wed":
						this.Week="周三";
						break;
					case "Thu":
						this.Week="周四";
						break;
					case "Fri":
						this.Week="周五";
						break;
					case "Sat":
						this.Week="周六";
						break;
					case "Sun":
						this.Week="周日";
						break;
					default:
						break;
				}
			},
			
			//---------------------------------点击查询---------------------------------
			queryClick: function() {
				var that = this;
				if(that.departure == '请选择起点') {
					uni.showToast({
						title: '请选择起点',
						icon: 'none'
					})
				}else{
					//页面传参通过地址后面添加参数 this.isNormal=0是普通购票1是定制班车
					var params='/pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' + this.departure +'&endStation=' + this.destination + '&date=' + this.datestring + '&isNormal=' + this.type2 + '&Week=' + this.Week;
					uni.navigateTo({
						url:params,
					})
				}
				// if(that.type2==0 && that.departure == '请选择起点') {
				// 	uni.showToast({
				// 		title: '请选择起点',
				// 		icon: 'none'
				// 	})
				// }else if(that.type2==1 && that.destination2 == '请选择终点'){
				// 	uni.showToast({
				// 		title: '请选择到达地点',
				// 		icon: 'none'
				// 	})
				// }else {
				// 	//页面传参通过地址后面添加参数 this.isNormal=0是普通购票1是定制班车
				// 	if(that.type2==0){
				// 		var params='/pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' + this.departure +'&endStation=' + this.destination + '&date=' + this.datestring + '&isNormal=' + this.type2 + '&Week=' + this.Week;
				// 		uni.navigateTo({
				// 			url:params,
				// 		})
				// 	}
				// 	else if(that.type2==1){
				// 		var params='/pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' + this.departure2 +'&endStation=' + this.destination2 + '&date=' + this.datestring + '&isNormal=' + this.type2 + '&Week=' + this.Week;
				// 		uni.navigateTo({
				// 			url:params,
				// 		})
				// 	}
				// }
			},
			
			// #ifdef MP-WEIXIN
			//---------------------------------微信授权登录start---------------------------------
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
			//---------------------------------微信授权登录end---------------------------------
			//#endif
			
			//-------------------------获取车站列表数据-------------------------
			getBusStationList:function() {
				uni.request({
					url: $Zxgp.KyInterface.Cs_GetInsuranceCheckState.Url,
					method: $Zxgp.KyInterface.Cs_GetInsuranceCheckState.method,
					data: {
						systemname: this.applyName
					},
					success: (res) => {
						console.log('请求接口的数据：', res)
						uni.hideLoading();
						if (res.data.data.length != 0) {
							this.mainArray = res.data.data;
							console.log(this.mainArray)
						}
					},
					fail(res) {
						uni.hideLoading();
					}
				})
			},
			quick:function(item){
				var params='/pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' + item.StartSiteName +'&endStation=' + item.EndSiteName + '&date=' + this.datestring + '&isNormal=' + this.type2;
				uni.navigateTo({
					url:params,
				})
			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #ff971e;
	}
	
	.top_image{
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
		z-index: 1;
	}
	
	//兴业银行
	//顶部筛选样式
	.screen {
		height: 106upx;
		// position: sticky;
		top: 0;
		z-index: 2;
	
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
	.zh_top{
		// position: absolute;
		width: 100%;
		// height: 100%;
		z-index: 2;
		
		//选择路线
		.top_chooseTheRoute{
			// display: flex;
			width:342upx;
			height:70upx;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius:22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 46upx;
			
			.top_text{
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
			
			.jdticon{
				right: 0;
				padding-top: 8upx;
			}
		}
		
		.top_destination{
			// display: flex;
			width:196upx;
			height:70upx;
			// overflow: hidden;
			// left: 61%;
			padding: 20upx 28upx;
			margin-left: 12upx;
			border-radius:22upx;
			background-color: #FFFFFF;
			z-index: 2;
			
			.top_text2{
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}
			
			.destination{
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
		.top_startingPoint{
			// display: flex;
			width:192upx;
			height:70upx;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius:22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 46upx;
			
			.top_text3{
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}
			
			.startingPoint{
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
		.top_chooseEnd{
			// display: flex;
			width:342upx;
			height:70upx;
			// overflow: hidden;
			left: 41%;
			padding: 20upx 28upx;
			border-radius:22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 12upx;
			
			.top_text4{
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
			
			.jdticon{
				right: 0;
				padding-top: 8upx;
			}
		}
	}
	
	//选择时间
	.top_chooseTime{
		// position: absolute;
		display: flex;
		width:604upx;
		// height:100%;
		overflow: hidden;
		left: 6%;
		padding: 28upx;
		border-radius:22upx;
		background-color: #FFFFFF;
		z-index: 2;
		// top: 386upx;
		margin-left: 46upx;
		margin-top: 42upx;
		
		//出发点
		.dateClass{
			display: flex;
			font-size: 32upx;
			font-weight: 400;
			color: #333333;
			// width: 234upx;
			left: 0;
			text-align: left;
		}
	}
	
	//点击态
	.ve_hover{
		transition: all .3s;//过度
		border-top-left-radius: 22rpx;
		border-bottom-left-radius: 22rpx;
		opacity: 0.9;
		background: #E4E7ED;
	}
	//查询点击态
	.ve_hover2{
		transition: all .3s;//过度
		border-radius: 64upx;
		opacity: 0.9;
		background: #F0AD4E;
	}
	//点击态
	.ve_hover3{
		transition: all .3s;//过度
		border-radius: 44upx;
		opacity: 0.9;
		background: #aaa;
	}
	
	//底部按钮
	.tjButton {
		// position: absolute;
		border-radius: 64upx;
		left: 6%;
		padding: 28upx 50upx;
		// top: 530upx;
		width: 560upx;
		background-color: #D17000;
		text-align: center;
		color: #FFFFFF;
		font-size: 34upx;
		font-weight: 400;
		box-shadow:0px 20px 81px 0px rgba(184,99,0,0.6);
		z-index: 2;
		margin-top: 42upx;
		margin-left: 46upx;
	}
	
	.hp_view{
		display: flex;
		padding-left: 20%;
		
		.hp_Line{
			width: 136upx;
			border-bottom: 1px solid #FFFFFF; 
			margin-bottom: 12upx;
		}
		
		.hp_text{
			width: 170upx;
			font-size: 28upx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 64upx;
		}
		
		.hp_Line2{
			width: 136upx;
			border-bottom: 1px solid #FFFFFF; 
			margin-bottom: 12upx;
		}
	}
	
	.ct_noticeText {
		color: #FFFFFF;
		text-align: justify;
		line-height: 54upx;
		// margin: 32upx 60upx;
		font-size: 26upx;
		z-index: 2;
	}
	

	
	// 旅游推荐
	.zl_recommend {
		// background: #fff;
		margin-top: 16upx;
	
		.zl_reContent {
			position: relative;
			padding-top: 40upx;
			margin-left: 28upx;
	
			.zl_reTitle {
				font-size: 30upx;
				color: #FFFFFF;
				font-weight: bold;
				margin-left: 22upx;
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
		
		.zl_cilckView{
			float: left;
			margin-left: 52rpx;
			margin-top: 32rpx;
			
			.zl_textView{
				color: #333333;
				font-size: 30upx;
				padding: 20upx 86upx;
				background: #FFFFFF;
				border-radius: 44rpx;
			}
		}
	
	}
	
	.ct_noticeText2{
		margin: 32upx 60upx 0 60upx;
	}
	
	.ct_noticeText3{
		margin: 32upx 60upx;
	}
</style>
