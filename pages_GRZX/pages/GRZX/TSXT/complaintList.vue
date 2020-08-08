<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					审核中
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					投诉成功
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					投诉失败
				</view>
			</view>
		</view>
		
		<!-- 审核中 -->
		<view v-if="type==0">
			<!-- 暂无数据 -->
			<view class="pd_image" v-if="complaintListIndex1==0">
				<view>
					<image class="im_image" src="../../../../static/Order/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.cm_status==0">
				<view class="cm_titleView">
					<image v-if="item.cm_choice=='包车'" class="cm_icon" src="../../../../static/Order/baoche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='旅游'" class="cm_icon" src="../../../../static/Order/lvyou.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='客车'" class="cm_icon" src="../../../../static/Order/keche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='出驻车'" class="cm_icon" src="../../../../static/Order/Car1.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='公交'" class="cm_icon" src="../../../../static/Order/gongjiao.png" mode="aspectFill"></image>
					<text class="cm_title">{{item.cm_choice}}</text>
					<text class="cm_status">{{item.or_Type}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">投诉对象：{{item.username}}</text>
					<text class="order_contentText">投诉时间：{{item.cm_createTime}}</text>
					<text class="order_contentText">投诉内容：{{item.cm_info}}</text>
				</view>
				<view class="order-bottom" @click="gotoStatus">详细</view>
			</view>
		</view>
		<!-- 已通过 -->
		<view v-if="type==1">
			<!-- 暂无数据 -->
			<view class="pd_image" v-if="complaintListIndex2==0">
				<view>
					<image class="im_image" src="../../../../static/Order/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.cm_status==1">
				<view class="cm_titleView">
					<image v-if="item.cm_choice=='包车'" class="cm_icon" src="../../../../static/Order/baoche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='旅游'" class="cm_icon" src="../../../../static/Order/lvyou.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='客车'" class="cm_icon" src="../../../../static/Order/keche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='出驻车'" class="cm_icon" src="../../../../static/Order/Car1.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='公交车'" class="cm_icon" src="../../../../static/Order/gongjiao.png" mode="aspectFill"></image>
					<text class="cm_title">{{item.cm_choice}}</text>
					<text class="cm_status">{{item.or_Type}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">投诉对象：{{item.username}}</text>
					<text class="order_contentText">投诉时间：{{item.cm_createTime}}</text>
					<text class="order_contentText">投诉内容：{{item.cm_info}}</text>
				</view>
				<view class="order-bottom" @click="gotoStatus">详细</view>
			</view>
		</view>
		<!-- 未通过 -->
		<view v-if="type==2">
			<view class="pd_image" v-if="complaintListIndex3==0">
				<view>
					<image class="im_image" src="../../../../static/Order/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.cm_status==2">
				<view class="cm_titleView">
					<image v-if="item.cm_choice=='包车'" class="cm_icon" src="../../../../static/Order/baoche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='旅游'" class="cm_icon" src="../../../../static/Order/lvyou.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='客车'" class="cm_icon" src="../../../../static/Order/keche.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='出驻车'" class="cm_icon" src="../../../../static/Order/Car1.png" mode="aspectFill"></image>
					<image v-if="item.cm_choice=='公交车'" class="cm_icon" src="../../../../static/Order/gongjiao.png" mode="aspectFill"></image>
					<text class="cm_title">{{item.cm_choice}}</text>
					<text class="cm_status">{{item.or_Type}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">投诉对象：{{item.username}}</text>
					<text class="order_contentText">投诉时间：{{item.cm_createTime}}</text>
					<text class="order_contentText">投诉内容：{{item.cm_info}}</text>
				</view>
				<view class="order-bottom" @click="gotoStatus">详细</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0, //默认审核中
				complaintListIndex1: 1, //判断是否有数据
				complaintListIndex2: 1, //判断是否有数据
				complaintListIndex3: 1, //判断是否有数据
				complaintList: [{
						username: '小叮当1',
						cm_createTime: '2020.7.23 9:00',
						cm_choice: '包车',
						cm_info: '投诉内容投诉内容投诉内容投诉内容内容投诉内容1',
						cm_status: 0,
						cm_number: 1,
						or_Type: '审核中'
					},
					{
						username: '小叮当2',
						cm_createTime: '2020.7.23 9:00',
						cm_choice: '公交车',
						cm_info: '投诉内容投诉内容投诉内容投诉内容内容投诉内容2',
						cm_status: 1,
						cm_number: 2,
						or_Type: '投诉成功'
					},
					{
						username: '小叮当3',
						cm_createTime: '2020.7.23 9:00',
						cm_choice: '旅游',
						cm_info: '投诉内容投诉内容投诉内容投诉内容内容投诉内容3',
						cm_status: 2,
						cm_number: 3,
						or_Type: '投诉失败'
					}
				]
			}
		},
		methods: {
			// 顶部Tab
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				}
			},
			gotoStatus: function() {
				var that = this;
				uni.navigateTo({
					url: 'complaintStatus?cm_number=' + that.cm_number
				})
			},
			formatState: function(status) {
				switch (status) {
					case 0:
						return '审核中';
						break;
					case 1:
						return '投诉完成';
						break;
					case 2:
						return '投诉失败';
						break;
					default:
						return '';
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}

	//筛选样式
	.screen {
		height: 87upx;
		background-color: #f6f6f6;
		position: sticky;
		top: 0;
		z-index: 999;

		.screenView {
			left: 0;
			display: flex;
			width: 750upx;
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
				font-size: 30upx;
				color: #333333;
				position: relative;



				&.current {
					color: #4CD964;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 77upx;
						height: 0;
						border-bottom: 4upx solid #4CD964;
					}
				}
			}
		}
	}

	// 暂无数据
	.pd_image {
		text-align: center;
		line-height: 50%;
		padding-top: 250upx;

		.im_image {
			width: 273upx;
			height: 296upx;
		}

		.im_text {
			font-size: 30upx;
			color: #999999;
			line-height: 106upx;
		}
	}

	.order-view {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 40upx 28upx 0 28upx;
		padding: 30upx 30upx 150upx 30upx;
	}

	.cm_titleView {
		position: relative;

		.cm_icon {
			position: relative;
			top: 4upx;
			width: 34upx;
			height: 38upx;
		}

		.cm_title {
			margin-left: 24upx;
			font-size: 36upx;
			font-weight: bold;
		}

		.cm_status {
			position: absolute;
			right: 0;
			font-size: 30upx;
			color: red;
			// top: 6upx;
		}
	}

	.order-icon {
		margin-top: 30upx;
		margin-left: 30upx;
		width: 34upx;
		height: 38upx;
	}

	.order-title {
		font-size: 37upx;
		font-weight: 500;
		margin-left: 20upx;
		margin-top: 24upx;
		width: 384upx;
	}

	.order-top {
		display: flex;
		flex-direction: row;
		margin-top: 10upx;
	}

	.order-status {
		font-size: 29upx;
		margin-top: 30upx;
		margin-left: 68upx;
		color: red;
	}

	.order-info {
		display: flex;
		flex-direction: column;
		margin-left: 56upx;
		margin-top: 12upx;
	}

	.order_contentText {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 550upx;
		margin-top: 16upx;
		color: #66686A;
		font-size: 30upx;
	}
	
	.order-bottom {
		float: right;
		border: 2upx solid #dddddd;
		border-radius: 10upx;
		padding: 16upx 0upx;
		width: 134upx;
		text-align: center;
		margin-top: 32upx;
		color: #66686A;
		font-size: 32upx;
		margin-right: 20upx;
	}
	
</style>
