<template>
	<view>
		<view style="display: flex;background-color: #FFF;height: 120rpx;font-size: 32rpx;align-items: center;justify-content: space-between;">
			<view class="Tab" @click="Click(0)">
				<view style="margin-bottom: 20rpx;" :class="tabNum==0?'TabClick':''">新闻资讯</view>
				<view class="borderline zxdt_topColor" v-if="tabNum==0"></view>
			</view>
			<view class="Tab" @click="Click(1)">
				<view style="margin-bottom: 20rpx;" :class="tabNum==1?'TabClick':''">失物招领</view>
				<view class="borderline zxdt_topColor" v-if="tabNum==1"></view>
			</view>
			<view class="Tab" @click="Click(2)">
				<view style="margin-bottom: 20rpx;" :class="tabNum==2?'TabClick':''">问卷调查</view>
				<view class="borderline zxdt_topColor" v-if="tabNum==2"></view>
			</view>
			<view class="Tab" @click="Click(3)">
				<view style="margin-bottom: 20rpx;" :class="tabNum==3?'TabClick':''">通知公告</view>
				<view class="borderline zxdt_topColor" v-if="tabNum==3"></view>
			</view>
		</view>
		<view style="margin: 20rpx;">
			<view class="item zxdt_color" v-for="(item,index) in NewsArray" :key="index" @click="NewsDetail(item)" v-if="item.Type=='新闻资讯'&&tabNum==0">
				<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					<text>{{item.Title}}</text>
				</view>
				<view style="font-size: 24rpx; color: #AAA;padding-top: 15rpx;">{{changeTime(item.CreateTime)}}</view>
			</view>
			
			<view class="item zxdt_color" v-for="(item,index) in NewsArray" :key="index" @click="NewsDetail(item)" v-if="item.Type=='失物招领'&&tabNum==1">
				<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					<text>{{item.Title}}</text>
				</view>
				<view style="font-size: 24rpx; color: #AAA;padding-top: 15rpx;">{{changeTime(item.CreateTime)}}</view>
			</view>
			
			<view class="item zxdt_color" v-for="(item,index) in NewsArray" :key="index" @click="NewsDetail(item)" v-if="item.Type=='问卷调查'&&tabNum==2">
				<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					<text>{{item.Title}}</text>
				</view>
				<view style="font-size: 24rpx; color: #AAA;padding-top: 15rpx;">{{changeTime(item.CreateTime)}}</view>
			</view>
			
			<view class="item zxdt_color" v-for="(item,index) in NewsArray" :key="index" @click="NewsDetail(item)" v-if="item.Type=='通知公告'&&tabNum==3">
				<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					<text>{{item.Title}}</text>
				</view>
				<view style="font-size: 24rpx; color: #AAA;padding-top: 15rpx;">{{changeTime(item.CreateTime)}}</view>
			</view>
		</view>
		<!-- 		<view style="width: 100%; float: left; text-align: center; font-size: 24upx; margin: 16upx 0; color: #aaa;">
			<text v-if="current==0" :hidden="disStatus== 1">{{loadingType== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			<text v-if="current==0" :hidden="disStatus== 0">暂无历史数据</text>
		</view> -->
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
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
				tabNum: 0,
				Title: '',
				NewsArray: [],
			}
		},
		onLoad() {
			this.GetNews();
		},
		//页面触底
		onReachBottom() {
			// uni.showLoading({
			// 	title: '加载更多中...',
			// 	icon: 'loading'
			// })
			// this.getMore();
		},

		methods: {
			changeTime: function(e) {
				var date = e.substr(0, 16).replace('T',' ');
				return date;
			},
			GetNews: function() {
				var that = this;
				//请求新闻资讯
				uni.showLoading({
					title: '加载中...',
					icon: 'loading'
				})
				uni.request({
					url: $DDTInterface.DDTInterface.GetNews.Url,
					method: $DDTInterface.DDTInterface.GetNews.method,
					success: function(res) {
						uni.hideLoading();
						that.NewsArray = res.data.data;
					},
					fail: function(err) {
						uni.hideLoading()
						uni.showToast({
							title: '网络异常，请检查网络后尝试',
							icon: 'none'
						})
					}
				})
			},
			//---------------------页面触底加载信息-----------------------------
			getMore() {
				this.loadingType = 1;
				if (this.current == 0) {
					if (this.zy_dataIndex < this.goodsList.length) {
						var a = this.zy_dataIndex + 6;
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
			NewsDetail: function(item) {
				uni.navigateTo({
					url: './newsDetail?id=' + item.AID
				})
			},
			Click: function(e) {
				this.tabNum = e;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F9FC;
	}

	.Tab {
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
	}

	.borderline {
		// border-bottom: 1px solid #65C36D;
		width: 75rpx;
		// color: #65C36D;
	}

	// .TabClick {
	// 	color: #65C36D;
	// }

	.item {
		margin: 20rpx;
		// border: 4rpx solid #65C36D;
		background-color: #FFF;
		// border-left-width: 20rpx;
		border-radius: 10rpx;
		padding: 15rpx 20rpx 20rpx 10rpx;
	}
</style>
