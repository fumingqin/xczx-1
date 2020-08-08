<template>
	<view class="myView">
		<scroll-view scroll-y="true" style="margin-bottom: 112upx;">
			<view class="headerClass">
			</view>
			<view class="orderCommonClass" style="margin-top: -110upx;flex-direction: column;">
				<view style="display: flex;margin-left: 30upx;margin-top: 30upx;align-items: center;">
					<view style="width: 78upx;height: 42upx;border: #FC4646 1upx solid ;line-height:42upx ;text-align: center;color:#FC4646 ;font-size: 26upx;border-radius: 8upx;">单程</view>
					<view style="margin-left: 13upx; color: #2C2D2D;font-size:30upx ;font-family:SourceHanSansSC-Regular ;">泉州客运中心站 -
						安溪客运中心站</view>
				</view>
				<view style="display: flex;margin: 30upx 0 30upx 30upx;align-items: center;">
					<view style="color:#999999 ;font-size: 30upx; font-family: SourceHanSansSC-Light;font-weight: lighter;">08月31日</view>
					<view style="color:#999999 ;font-size: 30upx; font-family: SourceHanSansSC-Light;font-weight: lighter;margin-left: 30upx;">12:30出发</view>
				</view>
			</view>
			<view class="orderCommonClass" style="justify-content: space-between;flex-direction: row;">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">已选择座位号</view>
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-right:35upx; ">E1</view>
			</view>
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;padding-left:30upx ;padding-right: 30upx;">
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image :src="myUrl" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;" @click="selectSeat"></image>
						<view>A7</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>B7</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>C7</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D6</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E6</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A6</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>B6</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D5</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E5</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A5</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
						过道
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D4</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E4</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A4</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
						过道
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D3</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E3</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A3</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
						过道
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D2</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/Seat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E2</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A2</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
						过道
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>D1</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>E1</view>
					</view>
					<text>窗</text>
				</view>
				<view style="display: flex;align-items: center;color: #999999;justify-content: space-between;font-size: 28upx;">
					<text>窗</text>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/unSeat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>A1</view>
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;">
					</view>
					<view style="display: flex;flex-direction: column;text-align: center;margin-top: 39upx;">
						<image src="../../../static/CTKY/Seat.png" style="width:61.6upx ;height: 71.9upx;margin-left: 18upx;margin-right: 18upx;"></image>
						<view>驾驶座</view>
					</view>
					<text>窗</text>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;justify-content: space-between;color: #999999;width: 55%;font-size: 22upx;">
				<view style="display: flex;flex-direction: column;text-align: center;margin-left: 30upx;margin-right: 30upx;">
					<image src="../../../static/CTKY/unSeat.png" style="width:47upx ;height: 55upx;margin-left: 18upx;margin-right: 18upx;"></image>
					<view>不可选</view>
				</view>
				<view style="display: flex;flex-direction: column;text-align: center;margin-left: 30upx;margin-right: 30upx;">
					<image src="../../../static/CTKY/selectSeat.png" style="width:47upx ;height: 55upx;margin-left: 18upx;margin-right: 18upx;"></image>
					<view>已占用</view>
				</view>
				<view style="display: flex;flex-direction: column;text-align: center;margin-left: 30upx;margin-right: 30upx;">
					<image src="../../../static/CTKY/Seat.png" style="width:47upx ;height: 55upx;margin-left: 18upx;margin-right: 18upx;"></image>
					<view>已选择</view>
				</view>
			</view>
			<view style="width: 45%; height: 112upx;color: #FFFFFF;background:#FC4646 ;font-size: 32upx;line-height: 112upx;
			text-align: center;">确定选座</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myUrl:'../../static/CTKY/unSeat.png',
                isSelect:false,
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: '在线选座'
			});
			var that = this;
		},
		onReady() {

		},
		methods: {
			selectSeat() {
				if(this.isSelect){
					this.myUrl='../../static/CTKY/selectSeat.png';
					this.isSelect=!this.isSelect;
				}
				else{
					this.myUrl='../../static/CTKY/unSeat.png';
					this.isSelect=!this.isSelect;
				}
				
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #F1F1F1;
	}

	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		width: 100%;
		height: 120upx;
		background: #FC4646;
	}

	.toPayClass {
		width: 100%;
		height: 112upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		z-index: 1010;
		background: #FFFFFF;
		justify-content: space-between;
	}

	//通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}
</style>
