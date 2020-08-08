<template>
	<view class="content">
		<!-- 头部背景图 -->
		<view>
			<image class="banner" :src="imageUrl" lazy-load mode="aspectFill"></image>
		</view>
		<!-- 内容 -->
		<view class="center">
			
			<!-- 标题 -->
			<view class="title">专线名称</view>
			<!-- 专线名称 -->
			<view class="textContent" @tap="lineTap">{{lineName}}</view>
			
			<!-- 标题 -->
			<view class="title">时间</view>
			<!-- 时间 -->
			<!-- <view class="textContent" @tap="timeTap">{{date}}</view> -->
			<picker mode="date" :value="pickerDate" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="textContent">{{pickerDate}}</view>
			</picker>
			
			<!-- 下一步按钮 -->
			<view class="nextView">
				<button class="nextButton" @tap="nextTap">下一步</button>
			</view>
			<!-- 底部步骤提示 -->
			<view>
				<image class="tip" src="../../../../static/ZXGP/specialBusTip.png" lazy-load mode="aspectFit"></image>
			</view>
			<!-- <min-popup size="height" v-if="show" @close='close'>
			  <date-picker  @cancel="cancel" @sure="sure"></date-picker>
			</min-popup> -->
			<popup ref="popup" type="bottom">
				<date-picker class="popupTextContent" @cancel="cancel" @sure="sure"></date-picker>
		    </popup>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	import $KyInterface from "@/common/Ctky.js"
	import datePicker from '@/pages_ZXGP/components/ZXGP/mx-datepicker/ctkyDatePicker.vue'
	import Popup from '@/pages_ZXGP/components/ZXGP/uni-popup/uni-popup.vue'
	export default {
		components:{
			datePicker,
			Popup
			},
		data() {
			return {
				lineName:'',//线路名称
				lineID:'',//线路ID
				date:'选择出发时间',//时间
				// show:false,
				imageUrl:'',
				pickerDate: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
			}
		},
		onLoad() {
			var that = this;
			if(that.lineName == '') {
				that.lineName = '请选择线路'
			}
			that.getPicture();
			
		},
		methods: {
			//------------------------------加载图片------------------------------
			getPicture() {
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_AddPicture.Url,
					method:$KyInterface.KyInterface.Ky_AddPicture.method,
					header:$KyInterface.KyInterface.Ky_AddPicture.header,
					data:{
						model:8,
					},
					success(res) {
						console.log(res)
						if(res.data.status == true) {
							that.imageUrl = res.data.data[0].imageUrl
							console.log(that.imageUrl)
						}else {
							console.log(res.data.status)
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			//------------------------------线路点击------------------------------
			lineTap() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('specialLineName', function(data) {
					console.log(data)
				    // data即为传过来的值，给上车点赋值
					that.lineName = data.data;
					that.lineID = data.lineID;
					
				    //清除监听，不清除会消耗资源
				    uni.$off('specialLineName');
				});
				uni.navigateTo({
					url:'./specialLinePicker'
				})
			},
			//------------------------------时间点击------------------------------
			timeTap() {
				this.$refs.popup.open()
			},
			bindDateChange: function(e) {
				this.pickerDate = e.detail.value
			},
			//------------------------------下一步点击------------------------------
			nextTap() {
				// console.log(this.lineID,this.date)
				
				uni.navigateTo({
					url:'../ScheduleLineList/specialBusLineList?lineID=' + this.lineID + '&date=' + this.pickerDate
				})
			},
			// 取消事件
			cancel(){
			    this.close()
			},
			// 确认事件
			sure(e){
			    // console.log(e)
				
			    // 输出 { year: 2020,month: 3,day: 23}
				this.date = e.year + '-' + e.month + '-' + e.day
				this.$refs.popup.close()
			},
			// picker显示
			showPop(){
			    this.show = true
			},
			// 关闭picker
			close(){
			    this.show = false
			},
		}
	}
</script>

<style>
	page,.content{
		flex-direction: column;
		background-color: #F4F9FC;
		width: 100%;
		height: 100%;
	}
	/* 客运弹框 */
	.popupTextContent {
		width: 100%;
	}
	.banner {
		width: 100%;
		height: 480rpx;
	}
	.center {
		background-color: #FFFFFF;
		padding: 10rpx 40rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		position: relative;
		top: -90rpx;
	}
	
	.title {
		color: #999999;
		font-size: 32rpx;
		font-weight: 300;
		margin-top: 30rpx;
	}
	.textContent {
		color: #2C2D2D;
		font-size: 36rpx;
		margin-top: 30rpx;
		border-bottom: 0.5rpx solid #EAEAEA;
		padding-bottom: 20rpx;
	}
	.next {
		text-align: center;
		justify-content: center;
		background-color: #FC4646;
		border-radius: 12rpx;
		color: #FFFFFF;
		font-size: 34rpx;
		height: 94rpx;
	}
	.nextView {
		margin-top: 43upx;
	}
	.nextButton {
		width: 100%;
		height: 96upx;
		background: #FC4646;
		color: #FFFFFF;
		font-size: 38upx;
		border-radius: 10upx;
	}
	.tip {
		width: 100%;
		height: 60rpx;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}
</style>
