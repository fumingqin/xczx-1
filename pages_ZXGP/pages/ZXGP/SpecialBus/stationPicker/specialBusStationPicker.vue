<template>
	<view class="contentView">
		<view class="colorView"></view>
		
		<!-- 上车点 -->
		<view class="stationContentView">
			
			<!-- 标题：当前上车点 -->
			<view class="titleView">当前上车点</view>
			<!-- 放置站点的view -->
			<view class="stationView">
				<view class="deSelect" :class="{'select':startSelectIndex == index}" @tap="startStationClick(index)" v-for="(item,index) in startStationList" :key="index">
					<text class="deSelectColor" :class="{'selectColor' : startSelectIndex == index}">{{item}}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 选择下车点 -->
		<view class="stationContentView" style="margin-top: 20rpx;">
			<!-- 标题：选择下车点 -->
			<view class="titleView">选择下车点</view>
			<!-- 放置站点的view -->
			<view class="stationView">
				<view class="deSelect" :class="{'select':endSelectIndex == index}" @tap="endStationClick(index)" v-for="(item,index) in endStationList" :key="index">
					<text class="deSelectColor" :class="{'selectColor' : endSelectIndex == index}">{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 完成 -->
		<view class="doneView" @tap="doneClick">
			<text style="font-size: 36rpx;line-height: 100rpx;">完成</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startSelectIndex:0,//记录上车点点击的下标
				endSelectIndex:0,//记录下车点点击下标
				startStationList:[],//上车点数组
				endStationList:[],//下车点数组
				startStation:'',//上车点
				endStation:'',//下车点
				stationArray:[]
			}
		},
		onLoad(param) {
			var that = this;
			//接收上个页面传过来的定制班车站点数据
			var stationArray = JSON.parse(param.stationArray);
			that.stationArray = stationArray;

			//保存上车点数组
			that.startStationList = stationArray.specialStartArray;
			//保存下车点数组
			that.endStationList = stationArray.specialEndArray;
			
			if(stationArray.startStaionIndex == ''|| stationArray.endStationIndex == '') {
				//定位已选择的上车点
				that.startSelectIndex = 0;
				//定位已选择的下车点
				that.endSelectIndex = 0;
			}else {
				//定位已选择的上车点
				that.startSelectIndex = stationArray.startStaionIndex;
				//定位已选择的下车点
				that.endSelectIndex = stationArray.endStationIndex;
			}
		},
		methods: {
			//--------------------------选中上车点--------------------------
			startStationClick(e){
				var that = this;
				//给选择的下标赋值
				that.startSelectIndex = e;
				//取出上车站点
				that.startStation = that.startStationList[e];
			},
			//--------------------------选中下车点---------------------------
			endStationClick(e){
				var that = this;
				//给选择的下标赋值
				that.endSelectIndex = e;
				//取出下车站点
				that.endStation = that.endStationList[e];
			},
			//--------------------------数组去重---------------------------
			arrayDistinct:function(array){
			    let siteNameArr = [];
			    for(let item of array){
					siteNameArr.push(item);
			    }
			    let distinctArr = array.filter((x,index) => {
					return siteNameArr.indexOf(x) == index
			    });
			    return distinctArr
			},
			//---------------------------点击完成---------------------------
			doneClick(){
				var that = this;
				//获取选中站点的下标
				let startSelectIndex = that.startSelectIndex;
				let endSelectIndex = that.endSelectIndex;
				//如果选中的下车点的下标小于上车点的下标说明下车点在上车点之前---非法
				if(endSelectIndex < startSelectIndex) {
					uni.showToast({
						title:'下车点不可以在上车点之前，请重新选择',
						icon:'none'
					})
				}else if(endSelectIndex == startSelectIndex){
					uni.showToast({
						title:'上车点不可与下车点一致，请重新选择',
						icon:'none'
					})
				}else {
					//点击完成时如果只选中了下车点没有选上车点，给上车点赋值上次选中的值
					if(that.startStation == '') {
						that.startStation = that.startStationList[startSelectIndex];
					}
					//点击完成时如果只选中了上车点没有选下车点，给下车点赋值上次选中的值
					if(that.endStation == '') {
						that.endStation = that.endStationList[endSelectIndex];
					} 
					//将上下车点放到一个数组中
					var stationArray = {
						//上车点名称和下标
						startStation:that.startStation,
						startStationIndex:startSelectIndex,
						//下车点名称和下标
						endStation:that.endStation,
						endStationIndex:endSelectIndex,
					}
					//将上下车点数组保存到缓存
					uni.setStorage({
						key:"specialBusStationList",
						data:stationArray,
						success() {
							uni.navigateBack()
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page,.content {
		background-color: #F5F9FC;
		width: 100%;
		height: 100%;
	}
	/* 顶部显示颜色的view */
	.colorView {
		width: 100%;
		height: 100rpx;
		background-color: #FE6C66;
		
	}
	/* 站点容器 */
	.stationContentView {
		margin-top: -50rpx;
		margin-left: 2%;
		margin-right: 2%;
		border-radius: 20rpx;
		width: 96%;
		background-color: #FFFFFF;
	}
	/* 标题view */
	.titleView {
		padding-top: 20rpx;
		padding-left: 32rpx;
		color: #333333;
		font-size: 34rpx;
		font-weight: 400;
	}
	/* 放置站点的view */
	.stationView {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
	}
	/* 站点名：未选中 */
	.deSelect {
		border: #e5e5e5 solid 2rpx;
		border-radius: 8rpx;
		justify-content: center;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	/* 未选中文字样式 */
	.deSelectColor {
		color: #333333;
		font-size: 26rpx;
		font-weight: 300;
		font-family:Source Han Sans SC;
	}
	/* 选中样式 */
	.select {
		border: #FC4646 solid 2rpx;
		border-radius: 8rpx;
		justify-content: center;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	/* 选中文字样式 */
	.selectColor {
		color: #FC4646;
		font-size: 26rpx;
		font-weight: 300;
		font-family:Source Han Sans SC;
	}
	// 完成
	.doneView {
		text-align: center;
		align-items: center;
		border-radius: 12rpx;
		background-color: #FA5E6E;
		color: #FFFFFF;
		height: 100rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 36rpx;
	}
</style>
