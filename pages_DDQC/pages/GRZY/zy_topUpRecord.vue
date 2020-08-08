<template>
	<view>
		<view v-for="(item,index) in info" :key="index">
			<view style="display: flex; justify-content: space-between; align-items: center;margin-top: 40rpx;">
				<view style="display: flex;">
					<image class="image" src="../../static/GRZY/qianbao.png"></image>
					<view class="textContent">
						<view class="text">{{item.ChargeType}}</view>
						<view class="text">{{fixed(item.CreateTime)}}</view>
					</view>
				</view>
				
				<view style="margin-right: 30rpx;">
					<view class="money">￥{{item.Price / 100}}元</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				userId:'',
				info:[],
			}
		},
		onShow() {
			this.getRecord();
		},
		methods: {
			getRecord: function() {
				var that = this;
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						uni.request({
							url: $DDTInterface.DDTInterface.GetRecordByUserID.Url,
							method: $DDTInterface.DDTInterface.GetRecordByUserID.method,
							data: {
								userID:res.data.userId,
							},
							success: (res) => {
								console.log(res)
								if (res.data.msg == '完成') {
									that.info=res.data.data;
									// let array=res.data.data;
									// for(var i=0;i<array.length;i++){			
									// 	if(array[i].Type=='充值'&& array[i].State=='充值成功'){
									// 		that.info.push(array[i])
									// 	}		
									// }
									console.log(that.info)
								}
							},
							fail(res) {
								console.log(res)
							}
						})
					}
				})
					
			},
			fixed(e){
				let a=e.split('T');
				let b=a[1].split('.');
				var c=a[0]+' '+b[0];
				return c;
			}
		}
	}
</script>

<style lang="scss">
page {
		background-color: #f6f6f6;
	}
	.content{
		justify-content: center;
	}
	.image{
		width: 84upx;
		height: 84upx;
		margin-left: 30rpx;
	}
	.money{
		font-size: 32upx;
		font-weight: 400;
		
		color: #F35A46;
	}
	.textContent{
		margin-left: 20rpx;
	}
	.text{
		font-size: 30upx;
		font-weight: 400;
	}

</style>
