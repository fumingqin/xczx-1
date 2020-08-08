<template>
	<view>
		<view>
			<image class="cm_img" src="../../static/GRZY/title.png"></image>
		</view>
		<view style="display: flex;">
			<view class="cm_title">助力车套餐骑行卡</view>
			<view class="cm_notice" @click="open()">购买须知></view>
		</view>
		<uni-popup ref="popup2" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">购买须知</text>
					<view class="Nb_text2 jdticon icon-fork " @click="close()"></view>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<text class="Nb_text4">
						{{security}}
					</text>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="cm_view">
			<view v-for="(item,index) in info" :key="index">
				<view class="cm_square" :class="{current2: value===index}" @click="affirm(index,item.money)">
					<view class="cs_money">￥{{item.money}}</view>
					<view class="cs_average">仅限{{item.average}}/天</view>
					<view class="cs_date">{{item.date}}天骑行</view>
				</view>
			</view>
		</view>

		<view class="cm_view2">
			<view class="cv_text">应付金额</view>
			<view class="cv_money">￥{{cost}}</view>
			<view class="cv_atOnceView">
				<view style="text-align: center;margin-top: 20upx;">立即购买</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uniPopup from "../../components/GRZY/uni-popup/uni-popup.vue"
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				value: 0,
				info: {
					money: 0,
					average: 0,
					date: 0,	
				},
				security:'',
				cost: 9.99,
			}
		},
		onLoad() {
			this.getlist();
		},
		methods: {
			affirm(index, e) {
				this.value = index;
				this.cost = e;
			},
			async getlist() {
				let array = await this.$api.zyxinfo('comboInfo');
				this.info = array.data;
				this.security=array.security;
			},

			//打开弹窗
			open() {
				this.$refs.popup2.open()
			},
			close() {
				this.$refs.popup2.close()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.cm_img {
		width: 695upx;
		height: 210upx;
		margin-top: 30upx;
		margin-left: 28upx;
	}

	.cm_title {
		margin-top: 50upx;
		margin-left: 38upx;
		font-size: 32upx;
		font-weight: 400;
	}

	.cm_notice {
		margin-top: 54upx;
		margin-left: 296upx;
		font-size: 26upx;
		color: #4281FF;
	}

	.cm_view {
		display: flex;
		margin-left: 12upx;
		margin-top: 13upx;
		flex-wrap: wrap;

		.cm_square {
			width: 324upx;
			height: 259upx;
			margin-left: 26upx;
			margin-top: 29upx;
			z-index: 28;
			background: #FFFFFF;
			border: 1px solid #E2E2E2;

			&.current2 {
				z-index: 30;
				background-color: #E0FFE3;
				border: 1px solid #65C36D;
				border-radius: 12rpx;
			}
		}

		.cs_money {
			text-align: center;
			margin-top: 47upx;
			font-size: 36upx;
			font-weight: 800;
		}

		.cs_average {
			text-align: center;
			margin-top: 31upx;
			font-size: 28upx;
			font-weight: 300;
		}

		.cs_date {
			text-align: center;
			margin-top: 43upx;
			font-size: 28upx;
			font-weight: 600;
		}
	}

	//底部信息
	.cm_view2 {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 120upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;

		.cv_text {
			font-size: 26upx;
			font-weight: 400;
			margin-left: 20upx;
		}

		.cv_money {
			font-size: 38upx;
			color: #FC4646;
			font-weight: 400;
		}

		.cv_atOnceView {
			width: 308upx;
			height: 90upx;
			background: #65C36D;
			margin-left: 130upx;
			margin-right: 28upx;
			border-radius: 69upx;
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			text-align: center;
		}
	}

	.boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		z-index: 999;

		.titleView {
			margin: 24upx 0;
			text-align: center;

			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: 300;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text2 {
				width: 20upx;
				height: 20upx;
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox {
			height: 800upx;
			line-height: 32upx;

			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}
</style>
