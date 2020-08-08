<template>
	<view>
		<!-- 16日 -->
		<view class="record" v-if="day1.length">
			<text class="dateText">{{day1[0].date}}</text>
			<view class="recordClass" v-for="(item,index) in day1" :key="index" @click="godetail(item.scenicName)">
				<image class="iconImage" :src="item.icon"/>
				<view class="text">
					<text class="recordName">{{item.scenicName}}</text>
					<text class="recordAddress">{{item.address}}</text>
				</view>
			</view>
		</view>
		<!-- 17日 -->
		<view class="record" v-if="day2.length">
			<text class="dateText">{{day2[0].date}}</text>
			<view class="recordClass" v-for="(item,index) in day2" :key="index" @click="godetail(item.scenicName)">
				<image class="iconImage" :src="item.icon"/>
				<view class="text">
					<text class="recordName">{{item.scenicName}}</text>
					<text class="recordAddress">{{item.address}}</text>
				</view>
			</view>
		</view>
		<!-- 18日 -->
		<view class="record" v-if="day3.length">
			<text class="dateText">{{day3[0].date}}</text>
			<view class="recordClass" v-for="(item,index) in day3" :key="index" @click="godetail(item.scenicName)">
				<image class="iconImage" :src="item.icon"/>
				<view class="text">
					<text class="recordName">{{item.scenicName}}</text>
					<text class="recordAddress">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				date:'',//日期
				day1:[],//16日
				day2:[],//17日
				day3:[],//18日
			}
		},
		
		onLoad() {
			this.recordInit();
			this.dayInit();
		},
		
		methods: {
			//读取静态数据json.js
			async recordInit() {
				let record = await this.$api.lyfwcwd('record');
				this.record = record.data;
			},
			
			async dayInit() {
				let record = await this.$api.lyfwcwd('record');
				var recordDay = record.data;
				//第一天
				let dayIndex1 = recordDay.filter(item =>{
					return item.day == 1;
				})
				this.day1 = dayIndex1;
				// console.log(dayIndex1)
				//第二天
				let dayIndex2 = recordDay.filter(item =>{
					return item.day == 2;
				})
				this.day2 = dayIndex2;
				//第三天
				let dayIndex3 = recordDay.filter(item =>{
					return item.day == 3;
				})
				this.day3 = dayIndex3;
			},
			
			//景点内容点击
			godetail: function(value) {
				uni.showToast({
					title: '你点击了' + value,
					icon: 'none'
				})
				// setTimeout(function() {
				// 	uni.navigateTo({
				// 		url: 'touristroute'
				// 	})
				// }, 500);
			},
			
			// 统一跳转接口
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}
	.record{
		
		.dateText{
			display: flex;
			color: #333333;
			font-size: 30upx;
			padding-top: 28upx;
			padding-left: 33upx;
			padding-bottom: 28upx;
			
		}
		.recordClass{
			display: flex;
			border-bottom: 1px #F5F5F5 dotted;
			background-color: #FFFFFF;
			.iconImage{
				width: 40upx;
				height: 40upx;
				padding-top: 40upx;
				padding-left: 32upx;
			}
			.text{
				// border-bottom: 1px #F5F5F5 dotted;
				padding-left: 22rpx;
				padding-top: 33rpx;
				.recordName{
					font-weight: bold;
					font-size: 32upx;
				}
				.recordAddress{
					display: block;
					padding-top: 28upx;
					padding-bottom: 40rpx;
					font-size: 32upx;
					color: #aba9aa;
				}
			}
		}
	}
</style>		
