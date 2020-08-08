<template>
	<!-- 顶部滑动 -->
	<!-- <view>
		<view class="screenView">
			<view class="screenText" :class="{current:type===0}" @click="tabClick">
				文章
			</view>
			<view class="screenText" :class="{current:type===1}" @click="tabsClick">
				商品
			</view>
		</view> -->

		<!-- 文章内容 -->
		<view v-if="type==0">
			<view class="content" v-for="(item,index) in collectionContent" :key="index" @click="godetail(item.scenicName)">
				<view class="contentView">
					<image class="scenicspotImage" :src="item.image" mode="aspectFill" />
					<view class="contentClass">
						<text class="scenicspotTitle">{{item.scenicName}}</text>
						<text class="scenicspotCost">人均费用&nbsp;&nbsp;&nbsp;{{item.cost}}元</text>
						<text class="scenicspotDay">出行天数&nbsp;&nbsp;&nbsp;{{item.day}}天</text>
						<view class="end">
							<text class="scenicspotEnd">目的地</text>
							<text class="scenicspotEnd2">{{item.title}}</text>
						</view>
					</view>
				</view>
				<view class="timeClss">
					<text>发布于{{item.date}}</text>
					<text class="jdticon icon-shoucang"></text>
					<text class="right">{{item.like}}</text>
					<text class="jdticon icon-pinglun-copy"></text>
					<text class="right">{{item.comment}}</text>
				</view>
			</view>
		</view>

		<!-- 商品内容 -->
		<!-- <view v-if="type==1">
			<view class="commodity" v-for="(item,index) in collectionCommodity" :key="index" @click="godetail2(item.scenicName)">
				<view class="commodityView">
					<image class="commodityImage" :src="item.image" mode="aspectFill" />
					<view class="commodityClass">
						<text class="commodityTitle">{{item.scenicName}}</text>
						<view class="exampleBody">
							<uni-rate class="rateClass" color="#FF6600" active-color="#FF6600" :is-fill="false" :size="15" :disabled="true"
							 :value="item.score" />
							<text class="rateScore">{{item.score}}分</text>
							<text class="commentText">{{item.comment}}条评论</text>
						</view>
						<view class="ladelClass">
							<view class="ladelView" style="background-color: #fff1e8;padding: 10upx 9upx;margin-right: 10upx;">{{item.label[0]}}</view>
							<view class="ladelView" style="background-color: #fff1e8;padding: 10upx 9upx;margin-right: 10upx;">{{item.label[1]}}</view>
							<view class="ladelView" style="background-color: #fff1e8;padding: 10upx 9upx;margin-right: 10upx;">{{item.label[2]}}</view>
						</view>
						<view class="price">
							<text class="priceText1" style="font-size: 24upx;color: #FF6600;">￥</text>
							<text class="priceText2" style="font-size: 32upx;color: #FF6600;font-weight:bold;">{{item.cost}}</text>
							<text class="priceText3" style="font-size: 24upx;color: #AAAAAA;margin-left: 5upx;">起</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
	import uniRate from '@/pages_BCFW/components/BCFW/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate,
		},
		data() {
			return {
				type: 0,
				collectionContent: [], //景点内容
				collectionCommodity: [], //商品内容
				label: [], //标签内容
				screenIndex: 0, //筛选框默认值
				loadingType: 'more', //加载更多状态 
			}
		},

		//返回接口数据调用
		onLoad() {
			this.ContentInit();
		},

		methods: {

			// 读取静态页面json.js
			async ContentInit() {
				let collection_content = await this.$api.lyfwcwd('collectionContent');
				this.collectionContent = collection_content.data;
				let collection_commodity = await this.$api.lyfwcwd('collectionCommodity');
				this.collectionCommodity = collection_commodity.data;
				// let ladel = await this.$api.lyfwcwd('label');
				// this.ladel = label.data;
			},

			tabClick() {
				this.type = 0;
			},
			tabsClick() {
				this.type = 1;
			},
			
			//景点内容点击
			godetail : function (e){
				uni.showToast({
					title:'你点击了'+e,
					icon:'none',
				})
				// setTimeout(function(){
				// 	uni.navigateTo({
				// 		url:''
				// 	})
				// },500);
			},
			
			//食品内容点击
			godetail2 : function (e){
				uni.showToast({
					title:'你点击了'+e,
					icon:'none',
				})
				// setTimeout(function(){
				// 	uni.navigateTo({
				// 		url:''
				// 	})
				// },500);
			},
		},
		
	}
</script>

<style lang="scss">
	//筛选样式
	.screenView {
		left: 0;
		display: flex;
		width: 100%;
		height: 97upx;
		background: #fff;
		z-index: 10;
		position: sticky;
		top: 0;
		background-color: #F5F5F5;

		.screenText {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #888;
			position: relative;
			
			
			
			&.current {
				color: #06B4FD;
				background-color: #FFFFFF;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 374upx;
					height: 0;
					border-bottom: 4upx solid #06B4FD;
				}
			}
		}
	}

	// 内容样式
	.content {
		margin: 32upx 32upx;
		padding-bottom: 32upx;
		border-bottom: 1px #F5F5F5 dotted;

		.contentView {
			display: flex;

			.scenicspotImage {
				width: 264upx;
				height: 200upx;
				text-align: left;
				border-radius: 5px;
			}

			.contentClass {
				margin-left: 24upx;
				margin-top: -11upx;

				.scenicspotTitle {
					font-weight: bold;
					font-size: 32upx;
					color: rgba(51, 51, 51, 1);
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.scenicspotCost {
					display: block;
					font-size: 26upx;
					color: #333333;
					padding-top: 14upx;
				}

				.scenicspotDay {
					display: block;
					font-size: 26upx;
					color: #333333;
					padding-top: 22upx;
				}

				.end {
					display: flex;

					.scenicspotEnd {
						width: 28%;
						font-size: 26upx;
						color: #333333;
						padding-top: 22upx;
					}

					.scenicspotEnd2 {
						font-size: 26upx;
						color: #0CA1DF;
						padding-top: 22upx;
						padding-left: 58upx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}

		.timeClss {
			display: flex;
			width: 100%;
			font-size: 26upx;
			color: #AAAAAA;
			padding-top: 30upx;

			// padding-right: 32upx;
			.jdticon {
				position: relative;
				font-size: 28upx;
				margin-left: 12upx;
				left: 296upx;
			}

			.right {
				position: relative;
				margin-left: 12upx;
				left: 295upx;
				bottom: 6upx;
			}
		}
	}

	// 商品内容
	.commodity {
		margin: 32upx 32upx;
		padding-bottom: 32upx;
		border-bottom: 1px #F5F5F5 dotted;

		.commodityView {
			display: flex;

			.commodityImage {
				width: 264upx;
				height: 200upx;
				text-align: left;
				border-radius: 5px;
			}

			.commodityClass {
				margin-left: 24upx;
				margin-top: -11upx;

				.commodityTitle {
					font-weight: bold;
					font-size: 32upx;
					color: rgba(51, 51, 51, 1);
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.exampleBody {
					display: flex;
					margin-top: 13upx;

					.rateClass {
						padding-top: 29upx;
					}

					.rateScore {
						padding-top: 15upx;
						padding-left: 10upx;
						font-size: 24upx;
						color: #888888;
					}

					.commentText {
						padding-top: 15upx;
						padding-left: 22upx;
						font-size: 24upx;
						color: #888888;
					}
				}

				.ladelClass {
					display: flex;
					margin-top: 15upx;

					.ladelView {
						border-radius: 2px;
						font-size: 20upx;
						color: #FF6600;
					}
				}

				.price {
					margin-top: 8upx;
				}

				// .labelText{
				// 	border:1px solid #fff1e8;
				// }
			}
		}
	}
</style>
