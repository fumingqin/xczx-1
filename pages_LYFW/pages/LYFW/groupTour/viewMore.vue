<template>
	<view>
		<!-- 内容1 -->
		<view>
			<view class="groupTour" v-for="(item,index) in groupTitle" :key="index">
				<view class="groupContent">
					<image class="contentImage" :src="item.contentImage" mode="aspectFill"></image>
				</view>
				<view class="groupText">
					<text class="contentText">{{item.contentTitle}}</text>
					<text class="contentLabel">{{item.contentLabel}}</text>
					<view class="groupCost">
						<view class="cost">￥<text class="contentCost">{{item.cost}}</text>元</view>
						<text class="sellComment">已售{{item.sell}}&nbsp;&nbsp;{{item.comment}}评论</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupTitle: [], //内容标题
				content: [],
			}
		},

		onLoad(options) {
			// this.id = options.id 
			this.getContentInfo();
			// this.routeInit();
		},

		methods: {
			//读取静态数据json.js
			// async routeInit() {
			// 	let groupTour = await this.$api.lyfwcwd('groupTour');
			// 	this.groupTitle = groupTour.data;
			// },

			getContentInfo() {
				uni.getStorage({
					key: 'groupTourContent',
					success: (e) => {
						this.groupTitle = e.data;
						console.log(e)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	//内容1

	.groupTour {
		display: flex;
		padding: 40upx 32upx;
		border-bottom: 1px #F5F5F5 dotted;

		.groupContent {

			// display: flex;
			.contentImage {
				width: 228upx;
				height: 190upx;
				border-radius: 8px;
			}
		}

		.groupText {
			margin-left: 25upx;

			.contentText {
				font-size: 32upx;
				font-weight: 40;
				font-family: Source Han Sans SC;
				overflow: hidden; //超出溢出
				-webkit-line-clamp: 2; //限制2行
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-align: justify;
			}

			.contentLabel {
				display: block;
				font-size: 28upx;
				color: #aba9aa;
				margin-top: 21upx;
			}

			.groupCost {
				margin-top: 12upx;
				display: flex;
				position: relative;

				.cost {
					font-size: 28upx;
					color: #FF6600;

					.contentCost {
						font-size: 36upx;
						color: #FF6600;
					}
				}

				.sellComment {
					position: absolute;
					font-size: 28upx;
					line-height: 53upx;
					color: #aba9aa;
					right: 0;
				}
			}
		}
	}

	.findMore {
		padding: 38upx 259upx;

		.findMoreText {
			font-size: 30upx;
			color: #aba9aa;
		}
	}
</style>
