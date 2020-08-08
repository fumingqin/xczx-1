<template>
	<view>
		<view style="padding: 20px;">
			<view style="border-bottom: 1px solid #EAEAEA;padding-bottom: 5px;margin-bottom: 5px;">
				<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">总价</text>
				<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">{{totalPrice}}</text>
				<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">元</text>
				<text v-if='discountPrice > 0' style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">（已优惠{{discountPrice}}元）</text>
			</view>
			<view v-for="item in payDetail" :key='item.totalName' style="padding-bottom: 5px;">
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view>
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">{{item.totalName}}</text>
					</view> 
					<view>
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">{{item.totalPrice}}元</text>
					</view>
				</view>
				<view v-for="el in item.detail" :key='el.detailName' style="display: flex;flex-direction: row;justify-content: space-between;">
					<view>
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#999999;">{{el.detailName}}</text>
					</view>
					<view v-if='el.detailPrice > 0'>
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#999999;">{{el.detailPrice}}元</text>
					</view>
				</view> 
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view style="">
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#FC4646;">优惠券抵扣</text>
					</view>
					<view style="">
						<text style="font-size:28rpx;font-family:Source Han Sans SC;font-weight:400;color:#FC4646;">{{discountPrice}}元</text>
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
				payDetail:[
					{
						totalName:'起步价',
						totalPrice:8.0,
						detail:[
							{
								detailName:'含时长6分钟，含里程20公里',
								detailPrice:0
							}
						]
					},
					{
						totalName:'里程费（5公里）',
						totalPrice:10.0,
						detail:[
							{
								detailName:'起步里程（4公里）',
								detailPrice:0
							},
							{
								detailName:'普通时段（2.7公里）',
								detailPrice:0.5
							},
							{
								detailName:'8:07-9:00（26.6公里）',
								detailPrice:5.0
							}
						]
					},
					{
						totalName:'总时长（5分钟）',
						totalPrice:10.0,
						detail:[
							{
								detailName:'起步时长（6分钟）',
								detailPrice:0
							},
							{
								detailName:'普通时段（4分钟）',
								detailPrice:0.5
							},
							{
								detailName:'8:26-9:00（26分钟）',
								detailPrice:0.5
							}
						]
					},
					{
						totalName:'远途费（20公里）',
						totalPrice:10.0,
						detail:[]
					},
				],
				totalPrice:'32.5',
				discountPrice:'10.0'
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
