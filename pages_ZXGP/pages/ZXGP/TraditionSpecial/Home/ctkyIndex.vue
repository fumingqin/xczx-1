<template>
    <view class="myView">
		<!-- 照片背景图 -->
		<view>
			<image :src="imageUrl" class="imageTop" mode="aspectFill"></image>
			<!-- <image src="../../static/index/左-箭头.png" class="imageReturn"></image> -->
		</view>
		<!-- 车票查询 -->
		<view class="queryTickets">
			<view class="typePickerView" v-if="false">
				<view class="typePicker" :class="{'typePickerClick':normalPickerNum == 1}"
				 style="border-top-right-radius: 0;" @tap="typeSelect('normal')">普通购票</view>
				<view class="typePicker" :class="{'typePickerClick':specialPickerNum == 1}" 
				style="border-top-left-radius: 0;" @tap="typeSelect('special')">定制班车</view>
			</view>
			<view class="ticketView">
				
				<view class="lineClass">
					<!-- 起点站 -->
					<!-- <navigator url="homeSattionPick" hover-class="hover"> -->
						<view class="start" @tap="startStationTap">{{departure}}</view>
					<!-- </navigator> -->
					<image src="../../../../static/ZXGP/change.png" mode="aspectFill" class="changeImage" @click="changeClick"></image>
					<!-- 终点站 -->
					<!-- <navigator url="homeSattionPick" hover-class="hover"> -->
						<view class="start" style="text-align: right;" @tap="endStationTap">{{destination}}</view>
					<!-- </navigator> -->
				</view>
				
				<view class="lineClass">
					<view style="border-bottom: 1upx solid #dadada;width: 100%;">
						<text @click="onShowDatePicker('date')" class="dateClass">{{datestring}}    {{Week}}</text>
					</view>
					<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
					 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
				</view>
				<view class="queryView">
					<button class="queryButton" @click="queryClick">查 询</button>
				</view>
			</view>
			<view class="historyView">
				
				<view style="justify-content: space-between; align-items: center;display: flex;">
					<label class="historyTitle">历史记录</label>
					<!-- <label class="historyText" v-for="(i,index) in historyLines" :key=index v-if="index<3">{{i}}</label> -->
					<label class="clearHistory" @click="clickHistory">清除历史</label>
				</view>
				<view class="historyListView">
					<view class="historyText" @tap="historyItemTap(index)" v-for="(i,index) in historyLines" :key=index v-if="index<10">{{i}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
    import MxDatePicker from "@/pages_ZXGP/components/ZXGP/mx-datepicker/mx-datepicker.vue";

	export default {
		components: {
			MxDatePicker
		},

		data() {
			return {
				title: 'Hello',
				departure: '',
				destination: '',
				changeText: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '',
				historyLines: [],
				datestring: '',
				Week: '',
				normalPickerNum:1,
				specialPickerNum:0,
				isNormal:0,//判断是普通购票还是定制班车默认是普通购票
				imageUrl:'',
			}
		},
		onLoad() {
			var that = this;
			if(that.departure == '' || that.destination == '') {
				that.departure = '选择上车点';
				that.destination = '选择下车点';
			}
			that.getPicture();
			//读取历史记录
			uni.getStorage({
				key:'historyLines',
				success:function(data){
					that.historyLines = data.data;
					if(data.data){
						var station = data.data[0].split('-');
						that.departure = station[0];
						that.destination = station[1];
					}
				}
			})
			//获取当前日期
			that.getTodayDate();
		},
		methods: {
			
			//---------------------------------获取图片---------------------------------
			getPicture() {
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_AddPicture.Url,
					method:$KyInterface.KyInterface.Ky_AddPicture.method,
					header:$KyInterface.KyInterface.Ky_AddPicture.header,
					data:{
						model:0,
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
			//---------------------------------点击起点站---------------------------------
			startStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
				    // data即为传过来的值，给上车点赋值
					that.departure = data.data;
				    //清除监听，不清除会消耗资源
				    uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url:'../stationPicker/homeSattionPick?&station=' + 'qidian'
				})
			},
			//---------------------------------点击终点站---------------------------------
			endStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值，给下车点赋值
				uni.$on('endStaionChange', function(data) {
				    // data即为传过来的值
					that.destination = data.data;
				    //清除监听，不清除会消耗资源
				    uni.$off('endStaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是下车点
					url:'../stationPicker/homeSattionPick?&station=' + 'zhongdian',
				})
			},
			//---------------------------------点击车票类型---------------------------------
			typeSelect(type) {
				if (type == 'normal') {//点击了普通购票
					this.normalPickerNum = 1;
					this.specialPickerNum = 0;
					this.isNormal = 0;//当前是普通购票
				}else if (type == 'special') {//点击了定制班车
					this.normalPickerNum = 0;
					this.specialPickerNum = 1;
					this.isNormal = 1;//当前是定制班车
				}
			},
			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
			    var timer = year + '-' + month + '-' + day;
				this.datestring = timer;
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];

			},
			//---------------------------------互换起止地址---------------------------------
			changeClick: function() {;
				this.changeText = this.departure;
				this.departure = this.destination;
				this.destination = this.changeText;
			},
			//---------------------------------清除历史---------------------------------
			clickHistory: function() {
				this.historyLines = [];
			},
			//---------------------------------点击历史记录---------------------------------
			historyItemTap(res) {
				let stationArray = this.historyLines[res].split('-');
				this.departure = stationArray[0];
				this.destination = stationArray[1];
			},
			//---------------------------------点击查询---------------------------------
			queryClick: function() {
				var that = this;
				if(that.departure == '选择上车点' || that.destination == '选择下车点') {
					uni.showToast({
						title: '请选择上下车点',
						icon: 'none'
					})
				}else {
					var station = this.departure + "-" + this.destination;
					if(this.historyLines) {
						for(let i = 0; i <= this.historyLines.length;i++){
							if(station == this.historyLines[i]) {
								this.historyLines.splice(i,1);
							}
						}
						this.historyLines.unshift(this.departure + "-" + this.destination);
					}
					uni.setStorage({
						key:'historyLines',
						data:this.historyLines,
					})
					//页面传参通过地址后面添加参数 this.isNormal=0是普通购票1是定制班车
					
					var params='../Order/selectTickets?&startStation=' + this.departure +'&endStation=' + this.destination + '&date=' + this.datestring + '&isNormal=' + this.isNormal;
					uni.navigateTo({ 
						url:params
					})
				}
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					// this[this.type] = e.value;
					this[this.type] = e.value;
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0, 3));
					this.date = e.value;
				}
			},
			queryWeek(e) {
				console.log(e);
				switch (e) {
					case "Mon":
						this.Week='周一';
						break;
					case "Tue":
						this.Week="周二";
						break;
					case "Wed":
						this.Week="周三";
						break;
					case "Thu":
						this.Week="周四";
						break;
					case "Fri":
						this.Week="周五";
						break;
					case "Sat":
						this.Week="周六";
						break;
					case "Sun":
						this.Week="周日";
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
     page,
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}
	// 背景图片
	.imageTop {
		width: 100%;
		height: 390upx;
	}

	.imageReturn {
		width: 56upx;
		height: 56upx;
		position: absolute;
		top: 58upx;
		left: 32upx;
	}

	//查询车票整块
	.queryTickets {
		// background: #FFFFFF;
		// height: 466upx;
		width: 706upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin: 0 auto; //左右边距自适应
		position: relative;
		top: -90upx;
		border-radius: 20upx;
	}
	//选择车票类型 普通购票/定制购票
	.typePickerView {
		width: 100%;
		height: 80rpx;
		display: flex;
	}
	//普通购票/定制班车
	.typePicker {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #393939;
		color: #FFFFFF;
		opacity: 0.8;
	}
	
	//普通购票/定制班车 点击
	.typePickerClick {
		opacity: 1;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
		color: #000000;
	}
	.ticketView {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	//选择起始点
	.lineClass {
		display: flex;
		align-items: center;
		justify-items: center;
		padding-left: 50upx;
		padding-right: 50upx;

	}

	//转换图片
	.changeImage {

		width: 57upx;
		height: 59upx;
		padding-top: 44upx;
		margin: 0 auto;

	}

	//出发点
	.start {
		font-size: 32upx;
		font-weight: 300;
		color: #2C2D2D;
		width: 234upx;
		left: 0;
		text-align: left;
		border-bottom: 1upx solid #dadada;
		margin-top: 40rpx;
		padding-bottom: 20rpx;
	}


	//选择日期
	.dateClass {
		font-size: 32upx;
		font-weight: 300;
		width: 213upx;
		height: 32upx;
		line-height: 125upx;

	}

	//查询视图
	.queryView {
		margin-top: 43upx;
		margin-left: 29upx;
		margin-right: 29upx;
		padding-bottom: 40rpx;
	}

	//查询
	.queryButton {
		width: 100%;
		height: 96upx;
		background: #FC4646;
		color: #FFFFFF;
		font-size: 38upx;
		border-radius: 10upx;
	}

	.historyView {
		padding-top: 20rpx;
		// padding-bottom: 29upx;
		// padding-left: 36upx;
		// padding-right: 36upx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 20rpx;
		width: 706upx;
		font-family: MicrosoftYaHei;
		color: #999999;
		font-size: 24upx;
	}
	.historyTitle {
		font-size: 25rpx;
		color: #2C2D2D;
		margin-left: 20rpx;
	}
	.historyListView {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		color: #999999;
		font-size: 26rpx;
		font-weight: 300;
		margin-left: 20rpx;
		margin-right: 20rpx;
		padding-bottom: 20rpx;
	}
	.historyText {
		margin-top: 20rpx;
		margin-right: 20rpx;
	}

	.clearHistory {
		font-size: 25rpx;
		color: #2C2D2D;
		margin-right: 20rpx;
		float: right;
	}

	//通用view上下外边距10upx
	.commonView {
		display: flex;
		margin-top: 20upx;
		padding: 30upx 32upx;
		position: relative;
		top: -38upx;
		background: #FFFFFF;
	}

	.ticketGuideImage {
		width: 113upx;
		height: 100upx;
	}

	.ticketGuideTextView {
		padding-left: 30upx;
	}

	.ticketGuideButton {
		font-size: 24upx;
		color: #999999;
		margin-top: 22upx;
		margin-bottom: 22upx;
		margin-right: 0;
		border-radius: 40upx;
		border: 1upx solid #999999;
	}

	//随机立减、拼团、客服、投诉整块的view
	.specialView {
		margin-top: 20upx;
		padding: 20upx 32upx;
		position: relative;
		top: -38upx;
		background: #FFFFFF;
		display: block;
	}

	//底下四块内容的每块的view
	.blockView {
		width: 343upx;
		//height: 103upx;
		display: flex;
		padding-top: 20upx;
		padding-bottom: 20upx;
		position: relative;
	}

	//块内的图片
	.blockViewImage {
		margin: 0 auto;
		margin-top: 10upx;
		position: absolute;
		right: 18upx;
	}
</style>
