<template>
	<view>
		<view class="fr_cardNumber">
			<input name="nickNumber" class="cn_card" placeholder-style="#AAAAAA" type="number" placeholder="请手动输入自行车编码" />
		</view>

		<view class="fr_select">
			<view v-for="(item,index) in evaluate" :key="index">
				<view class="sb_button" @tap="tapInfo(index)" :class="[rSelect.indexOf(index)>-1?'cur':'unCur']">{{item}}</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="content">
			<!-- 投诉原因 -->
			<view class="ComplaintYY">
				<textarea class="yyTitle" placeholder-style="#AAAAAA" placeholder="描述详尽助于提升处理速度" maxlength="500" @input="descInput"
				 :name="content" style="width: 295px;height: 100px;" />
				<view class="num">{{remnant}}/500字</view>
			</view>
		</view>
		
		<view class="cl_bottom"></view>
		<view class="tjButton" @click="jump">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluate: ['开不了锁', '桌垫坏了', '链条坏了', '车头歪了', '脚踏坏了', '车把坏了', '脚撑坏了', '刹车坏了', '其他', ],
				selectContent: '', //选择
				rSelect:[],
				content:'',
				remnant: 0,//字数
			}
		},
		methods: {
			//--------------------------------评星选择框事件----------------------------------
			tapInfo: function(e) {
				// console.log(e)
				if (this.rSelect.indexOf(e) == -1) {
					this.rSelect.push(e); //选中添加到数组里
					this.selectContent = e;
					console.log(this.selectContent)
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			
			//-------------------------字数-------------------------------
			descInput: function(e) {
				// console.log(e)
				this.remnant = e.detail.value.length;
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	//输入银行卡号
	.fr_cardNumber {
		display: flex;
		padding-top: 95upx;
		padding-left: 30upx;
		padding-right: 30upx;
		padding-bottom: 30upx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);

		.cn_card {
			font-size: 32upx;
			padding-bottom: 20upx;
			width: 100%;
			border-bottom: 1px #F5F5F5 dotted;
			// padding-left: 60upx;
		}
	}

	.fr_select {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 20upx;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-top: 20upx;

		.sb_button {
			flex: 1;
			border: 1px solid #888;
			border-radius: 12rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			height: 72upx;
			width: 212upx;
			color: #888;
			z-index: 20;
			position: relative;
			margin-top: 37upx;

		}

		.sb_button:not(:nth-child(3n)) {
			margin-right: 10upx;
			margin-left: 10upx;
		}

		.cur {
			z-index: 30;
			color: #FFFFFF;
			border: 1px solid #ff0000;
			background-color: #ff0000;
			border-radius: 12rpx;
		}

		.unCur {
			z-index: 30;
			color: #888;
			border: 1px solid #888;
			background-color: #FFFFFF;
			border-radius: 12rpx;
		}
	}
	
	// 内容
	.content {
		margin: 0 0 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;
	
		// 投诉内容
		.ComplaintYY {
			border-bottom: 1px #F5F5F5 dotted;
	
			.yyText {
				font-weight: bold;
				font-size: 32upx;
			}
	
			.yyTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
	
			.num {
				text-align: right;
				font-size: 30upx;
				color: #AAAAAA;
				padding-bottom: 23upx;
			}
		}
	}
	
	//底部多余
	.cl_bottom{
		width: 100%;
		height: 150upx;
	}
	
	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
