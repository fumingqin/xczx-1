<template>
	<view>
		<view v-for="(item,index) in refundRecordArray" :key="index">
			<view style="display: flex; justify-content: space-between; align-items: center;margin-top: 40rpx;" @click="refundClick(item)">
				<view style="padding-top: -20rpx;"><image class="image" src="../../static/GRZY/qianbao.png"></image></view>
				<view class="textContent">
					<view class="text">{{item.ChargeType}}</view>
					<view class="text">银行：{{item.Bank}}</view>
					<view class="text">日期：{{fixed(item.CreateTime)}}</view>
					<view class="text" v-if="item.Reason">原因：{{item.Reason}}</view>
				</view>
				<view style="margin-right: 30rpx;">
					<view class="state" :class="{'stateFaile' : item.DepositStatus ==2}">{{refundState(item.DepositStatus)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				userId:'',
				refundRecordArray:[],
			}
		},
		onLoad(res) {
			_self = this;
			uni.setNavigationBarTitle({
				title:'退押金记录'
			})
		},
		onShow() {
			//获取最近一次人工提交退押金记录
			this.GetManualRefundByUserID();
		},
		methods: {
			//------------------------------------获取最近一次人工提交退押金记录------------------------------------
			GetManualRefundByUserID: function() {
				var that = this;
				uni.showLoading({
					title:'正在加载中...'
				})
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						uni.request({
							url: $DDTInterface.DDTInterface.GetManualRefundByUserID.Url,
							method: $DDTInterface.DDTInterface.GetManualRefundByUserID.method,
							data: {
								UserID:res.data.userId,
							},
							success: (res) => {
								uni.hideLoading()
								console.log('获取记录成功',res)
								if(res.data.status == true){
									that.refundRecordArray = res.data.data;
								}else {
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
								}
							},
							fail(res) {
								uni.hideLoading()
								console.log('获取记录失败',res)
							}
						})
					}
				})
					
			},
			//------------------------------------退押金状态------------------------------------
			refundState:function(state){
				if(state == 0){
					return '提交'
				}else if(state == 1){
					return '成功'
				}else if(state == 2){
					return '失败'
				}else{
					return '失败'
				}
				
			},
			//------------------------------------修改时间格式------------------------------------
			fixed(e){
				let a=e.split('T');
				let b=a[1].split('.');
				var c=a[0]+' '+b[0];
				return c;
			},
			//------------------------------------跳转到填写退押金页面------------------------------------
			refundClick:function(item){
				//只有在退押金失败的时候才可以跳转
				if(item.DepositStatus == 2){
					uni.showModal({
						title:'温馨提示',
						content:'是否要重新提交退款信息',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url:'./zy_information?refundType=' + '退款失败重新提交' + '&item=' + JSON.stringify(item)
								})
							}
						}
					})
				}
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
	.state{
		font-size: 32upx;
		font-weight: 400;
		color: #66ccff;
	}
	.stateFaile{
		font-size: 32upx;
		font-weight: 400;
		color: #F35A46;
	}
	.textContent{
	}
	.text{
		font-size: 30upx;
		font-weight: 400;
	}

</style>
