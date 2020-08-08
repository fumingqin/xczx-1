<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="topSerchView">
			<view class="SearchBar" elevation='5px' style="">
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="isShowList">
			<block v-for="(item,index) in keywordList" :key="index">
				<view class="listItem" @tap="itemClick(index)">
					<rich-text :nodes="item.htmlStr"></rich-text>
				</view>
			</block>
		</view>
		<!-- 联动列表 -->
		<view class="list_box" v-if="isShowAllList">
			<!-- 左边的列表 -->
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" style="background-color: #FFFFFF;color: #42b983;">南平</view>
		        </scroll-view>
			</view>
			<!-- 右边的列表 -->
			<view class="main" v-if="isShowAllList">
				<swiper class="swiper" :style="{ 'height':scrollHeight }" :current="leftIndex" @change="swiperChange" vertical="true"
				 duration="300">
					<swiper-item>
						<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
							<view class="item">
								<view class="goods" v-for="(item2,index2) in mainArray" :key="index2" @tap="detailStationTap(item2)">
									<view>
										<view v-if="stationType=='qidian'">{{item2.StartSiteName}}</view>										<view v-if="stationType=='zhongdian'">{{item2.EndSiteName}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import $Zxgp from "@/common/zxgp.js"
	import $KyInterface from "@/common/Ctky.js"
	export default {
		data() {
			return {
				scrollHeight:'500px',
				stationArray:[],
				leftArray:[],
				mainArray:[],
				leftIndex:0,
				keywordList: [],
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
				stationType:'',//判断上个页面点击的是上车点还是下车点
			}
		},
		onLoad(param){
			var that = this;
			// console.log(param);
			that.stationType = param.station;
			that.applyName = that.$oSit.Interface.system.applyName;
			// console.log(that.applyName);
			//获取站点列表
			that.getBusStationList();
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
		},
		methods: {
			//-------------------------获取车站列表数据-------------------------
			getBusStationList() {
				uni.showLoading();
				console.log($Zxgp.KyInterface.Cs_GetInsuranceCheckState.Url)
				uni.request({
					url: $Zxgp.KyInterface.Cs_GetInsuranceCheckState.Url,
					method: $Zxgp.KyInterface.Cs_GetInsuranceCheckState.method,
					data: {
						systemname: this.applyName
					},
					success: (res) => {
						console.log('请求接口的数据：', res)
						uni.hideLoading();
						let that = this;
						if (res.data.data.length != 0) {
							console.log(that.mainArray)
							if (that.stationType == 'qidian') {
								for (var i = 0; i < res.data.data.length; i++) { 
									var a  = this.mainArray.filter(item => {
											return item.StartSiteName == res.data.data[i].StartSiteName;
									})
									if(a ==''){
										var countysArray = {
											StartSiteName: res.data.data[i].StartSiteName
										}
										
										this.mainArray.push(countysArray);
									}
									console.log(this.mainArray)
								}
							} else if (that.stationType == 'zhongdian') {
								for (var i = 0; i < res.data.data.length; i++) {
									var a  = this.mainArray.filter(item => {
											return item.EndSiteName == res.data.data[i].EndSiteName;
									})
									if(a ==''){
										var countysArray = {
											EndSiteName: res.data.data[i].EndSiteName
										}
										
										this.mainArray.push(countysArray);
									}
									console.log(this.mainArray)
								}
							}
						}
					},
					fail(res) {
						uni.hideLoading();
					}
				})
			
				// var systemName = '';
				// // #ifdef H5
				// systemName = '南平旅游H5';
				// // #endif
				// // #ifdef APP-PLUS
				// systemName = '南平旅游APP';
				// // #endif
				// // #ifdef MP-WEIXIN
				// systemName = '南平旅游H5';
				// // #endif
				// uni.request({
				// 	url:$KyInterface.KyInterface.Ky_GetStations.Url,
				// 	method:$KyInterface.KyInterface.Ky_GetStations.method,
				// 	header:$KyInterface.KyInterface.Ky_GetStations.header,
				// 	data:{
				// 		systemName:systemName
				// 	},
				// 	success: (res) => {
				// 		console.log(res)
				// 		uni.hideLoading();
				// 		let that = this;
				// 		// console.log(res.data);
				// 		if (res.data.length != 0) {
				// 			for (var i = 0; i < res.data.length; i++) {
				// 				var cityNameArray = {
				// 					cityName : res.data[i].cityName
				// 				}
				// 				this.stationArray.push(cityNameArray);
				// 				for (var j = 0; j < res.data[i].countys.length;j++) {
				// 					var countysArray = {
				// 						countys : res.data[i].countys[j]
				// 					}
				// 					this.mainArray.push(countysArray);
				// 				}
				// 			}
				// 		}
				// 	},
				// 	fail(res) {
				// 		uni.hideLoading();
				// 	}
				// })
			},
			//-------------------------监听输入-------------------------
			onInput(event){
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowList = false;
					this.isShowAllList = true;
					return;
				}
				this.isShowList = true;
				this.isShowAllList = false;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.showLoading();
				var systemName = '';
				// #ifdef H5
				systemName = '南平旅游H5';
				// #endif
				// #ifdef APP-PLUS
				systemName = '南平旅游APP';
				// #endif
				// #ifdef MP-WEIXIN
				systemName = '南平旅游H5';
				// #endif
				uni.request({
					url:$KyInterface.KyInterface.Ky_GetSatartSite.Url,
					method:$KyInterface.KyInterface.Ky_GetSatartSite.method,
					header:$KyInterface.KyInterface.Ky_GetSatartSite.header,
					data:{
						systemName:systemName,
						keyword:keyword
					},
					success: (res) => {
						uni.hideLoading();
						// console.log(res);
						this.keywordList = [];
						this.keywordList = this.drawCorrelativeKeyword(res.data, keyword);
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			//-------------------------高亮关键字-------------------------
			drawCorrelativeKeyword(keywords, keyword) {
				// console.log(keywords);
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i].siteName;
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row,
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//-------------------------点击下拉站点-------------------------
			itemClick(index){
				var that = this;
				//获取点击选项的文字
				var key = this.keywordList[index].keyword;
				
				if (that.stationType == 'qidian') {
					//当前是上车点
					uni.$emit('startstaionChange', {
					    data: key
					});
					uni.navigateBack({ });
				}else if(that.stationType == 'zhongdian') {
					//当前是下车点
					uni.$emit('endStaionChange', {
					    data: key
					});
					uni.navigateBack({ });
				}
			},
			//-------------------------点击站点-------------------------
			detailStationTap(item){
				// console.log(item.countys);
				var that = this;
				if (that.stationType == 'qidian') {
					//当前是上车点
					uni.$emit('startstaionChange', {
					    data: item.StartSiteName
					});
					uni.navigateBack({ });
				}else if(that.stationType == 'zhongdian') {
					//当前是下车点
					uni.$emit('endStaionChange', {
					    data: item.EndSiteName
					});
					uni.navigateBack({ });
				}
				
			},
			
			//-------------------------左侧导航点击-------------------------
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.leftIndex=Number(index);
			},
			/* 轮播图切换 */
			swiperChange(e){
				let index=e.detail.current;
				this.leftIndex=Number(index);
			}
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		height: 100rpx;
		background-color: #DBDBDB;
		padding-top: 20rpx;
	}
	.SearchBar {
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
		flex-direction: row;
		border-radius: 9px;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
	}
	//地址搜索输入
	.addressInput {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
	}
	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 100rpx;
		.listItem{
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		text-align: center;
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #42b983;
				background-color: #fff;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		.swiper{
			height: 500px;
		}

		
		.item{
			padding-bottom: 10rpx;
		}
	}
	.goods{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;
		line-height: 80rpx;
	}
}
</style>
