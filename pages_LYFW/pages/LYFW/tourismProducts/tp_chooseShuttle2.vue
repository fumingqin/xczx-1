<template>
	<view class="myView">
		<!-- 顶部时间选项卡 -->
		<view class="headerClass">
			<scroll-view class="scrollClass" scroll-x>
				<view class="blockClass" :class="selectIndex == index ? 'viewPress': '' " v-for="(item,index) in dateArray" :key="index" @click="viewClick(index,item)" v-model="selectIndex">
					<view class="textCLass">
						<view class="weekClass">{{item.week}}</view>
						<view class="dateClass">{{item.date}}</view>
					</view>
				</view>
			</scroll-view>
			<view style="width: 14%;height: 100%; align-items: center; justify-content: center;display: flex;" @click="onShowDatePicker">
				<image src="../../../static/LYFW/tourismProducts/calendar.png" class="calendarImage" ></image>
			</view>
		</view>
		
		
		<view style="margin: 32upx;">
			<text style="font-size: 34upx; font-weight: bold;" v-if="originIndex == 0">选择出发班次</text>
			<text style="font-size: 34upx; font-weight: bold;" v-if="originIndex == 1">选择返程班次</text>
		</view>
		
		<!-- 班车信息 -->
		<view style="padding-bottom: 160upx;">
			<view class="ctky_View" :class="{ctky_ViewBorder : index==statusIndex}"  v-for="(item,index) in departureData" :key="index" @click="selection(item,index)" >
				<view class="ctky_View_Left">
					<view style="display: flex;align-items: center;margin:20upx 25upx;">
						<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" >返程</view>
						<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">{{item.setOutDate}}</view>
					</view>
					<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
						<image src="../../../static/LYFW/tourismProducts/startDot.png" style="width: 10upx ;height: 10upx;"></image>
						<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">{{item.startStation}}</view>
					</view>
					<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
						<image src="../../../static/LYFW/tourismProducts/endDot.png" style="width: 10upx ;height: 10upx;"></image>
						<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">{{item.endStation}}</view>
					</view>
					<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;font-size: 28upx;color: #666666;">{{item.lineContent}}</view>
				</view>
				<view class="ctky_View_Right">
					<view>
						<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:SourceHanSansSC-Light; color: #FF6600;">余{{item.count}}座</view>
					</view>
				</view>
			</view>
		</view>
		<view class="MP_information3" @click="paymentSatas">选中此班次</view>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" @confirm="onSelected"></uni-calendar>
	</view>
</template>

<script>
	import uniCalendar from '@/pages_LYFW/components/LYFW/scenicSpotTickets/uni-calendar/uni-calendar.vue'
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				originIndex : 0,//页面传参 0是出发班车 1是返程班车
				statusIndex : 0, //选中状态值
				selectionData: '',//选中的班次信息
				orderNumber : '',//订单编号
				departureData :'', //循环班次列表
				setOutDate : '',//时间
				comSetOutDate : '',//对比的时间，出发时间，用于对比返程时间
				startStation : '',//起始站
				endStation : '',//终点站
				
				//-----------------时间选择器参数开始-------------------
				selectIndex: '', //选中的下标
				dateArray: [], //时间轴的数量的数组
				date: '', //时间轴上选中的日期
				//-----------------时间选择器参数结束-------------------
			}
		},
		components: {
			//加载日期组件
			uniCalendar,
		},
		onLoad:function(options){
			uni.showLoading({
				title:'加载班次中...',
				icon:'loading'
			})
			this.originIndex = options.originIndex;
			if(!options.setOutDate){
				uni.getStorage({
					key:'chooseShuttleData',
					success: (res) => {
						console.log(res,'订单进来')
						this.orderNumber = res.data.orderNumber;
						this.setOutDate = res.data.orderDate;
						this.comSetOutDate = res.data.setOutDate;
						this.startStation = res.data.planEnd;
						this.endStation = res.data.planStart;
						console.log(this.comSetOutDate,'出发时间')
						this.GetSchedule();
						this.loadDate(this.setOutDate);
					}
				})
			}else{
				this.comSetOutDate = options.setOutDate;
				console.log(this.comSetOutDate,'出发时间')
				uni.getStorage({
					key:'chooseShuttleData',
					success: (res) => {
						console.log(res,'出发班次进来')
						this.orderNumber = res.data.orderNumber;
						this.setOutDate = res.data.orderDate;
						this.startStation = res.data.planEnd;
						this.endStation = res.data.planStart;
						this.GetSchedule();
						this.loadDate(this.comSetOutDate);
					}
				})
			}
		},
		methods: {
			selection:function(item,index){
				this.statusIndex = index;
				this.selectionData = item;
			},
			//提交绑定班次
			paymentSatas: function(){
				var that = this;
					uni.request({
						url: $lyfw.Interface.lyky_BindBackInfo.value,
						method: $lyfw.Interface.lyky_BindBackInfo.method,
						data:{
							orderNumber : this.orderNumber,
							scheduleID : this.departureData[that.statusIndex].scheduleID
						},
						success: (res) => {
							// console.log(res)
							uni.showToast({
								title:'选择返程班次成功',
								success: () => {
									uni.switchTab({
										url:'../../../../pages/order/OrderList'
									})
								}
							})
						},
						fail: (ee) => {
							uni.showToast({
								title:'网络异常，请检查网络后重试',
								icon:'none'
							})
						}
					})
			},
			
			//获取班次发车信息
			GetSchedule:function(){
				uni.request({
						url: $lyfw.Interface.lyky_GetScheduleByDateStartStationEndStation.value,
						method: $lyfw.Interface.lyky_GetScheduleByDateStartStationEndStation.method,
						data:{
							setOutDate : this.setOutDate,
							startStation : this.startStation,
							endStation : this.endStation,
						},
						success: (res) => {
							let a = res.data.data.filter(item => {
								return item.setOutDate > this.comSetOutDate;
							})
							this.departureData = a;
						},
						complete:function(){
							uni.hideLoading()
						}
				})
			},
			
			//--------------------------------时间选择器代码开始（整体直接复制，遇到“必改”2个字根据自身代码实际情况进行微调----------------
			//-------------------------点击时间选择器发生事件-------------------------------------
			viewClick: function(e, item) {
				this.selectIndex = e;
				this.date = item.longDate;
				console.log(item)
				this.getDeparture(); 
			},
			
			//点击顶部时间，请求该时间的班次列表
			getDeparture:function() {
				this.setOutDate = this.date; //必改，setOutDate为你要请求的时间
				console.log(this.setOutDate)
				this.GetSchedule(); //必改，GetSchedule为请求班次的方法
			},
			//-------------------------------显示日期-------------------------------
			onShowDatePicker() { //显示
				this.$refs.calendar.open();
			},
			
			//-------------------------------选择日期-------------------------------
			onSelected:function(e) {
				this.date = e.fulldate;
				this.setOutDate = e.fulldate; //必改，setOutDate为你要请求的时间
				this.GetSchedule();  //必改，GetSchedule为请求班次的方法
				var IsExist = false;
				for (var i = 0; i < this.dateArray.length; i++) {
					if ((new Date(this.dateArray[i].longDate)).getTime() == (new Date(this.date)).getTime()) {
						IsExist = true;
						this.selectIndex = i;
					}
				}
				//判断时间轴上是否存在改日期，不存在则重新绘制
				if (!IsExist) {
					this.dateArray = [];
					var dateToday = new Date(); //获取今天日期
					var date = new Date(this.date); //选中的日期
					this.selectIndex = 0;
					for (var i = 0; i < 8; i++) {
						var mydate = new Date(date.getTime() + 24 * i * 60 * 60 * 1000); //日期一天加一次
						var nowdate = this.getTime(3, mydate); //获取该日期的缩写  月/日
						var week = this.getTime(2, mydate); //获取该日期为周几
						var longdate = this.getTime(0, mydate); //获取 年/月/日
						if (this.getTime(0, mydate) == this.getTime(0, dateToday)) {
							week = '今天';
						}
						this.dateArray.push({
							week: week,
							date: nowdate,
							longDate: longdate,
						});
					}
				}
			},
			//-------------------------------初始化时间轴-------------------------------
			loadDate:function(param) {
				var that = this;
				var date = '';
				
			
				//将时间的-转换成/
				var subStr = new RegExp('-', 'ig');
				var result = param.replace(subStr, "/");
				date = new Date(result);
				// console.log(date)
				
				this.selectIndex = 0;
				for (var i = 0; i < 7; i++) {
					var mydate = new Date(date.getTime() + 24 * i * 60 * 60 * 1000);
					var nowdate = this.getTime(3, mydate);
					var week = this.getTime(2, mydate);
					var longdate = this.getTime(0, mydate);
					if (mydate.getTime() == date.getTime()) {
						week = '今天';
					}
					this.dateArray.push({
						week: week,
						date: nowdate,
						longDate: longdate,
					});
				}
			},
			//-------------------------------点击班次进行缓存，并打开页面  结束-------------------------------
			//日期时间转换函数   type 0 年月日 ，1 时分秒 ， 2 星期 ，3 月/日  4几月几日
			getTime: function(type, date1) {
				let date = new Date(date1.getTime()),
					currentDate,
					currentTime,
					sortDate,
					monthAndDay,
					seperator = "-", // 如果想要其他格式 只需 修改这里 
					year = date.getFullYear(),
					month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
					weex = date.getDay(),
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// month >= 1 && month <= 9 ? (month = "0" + month) : "";
				// day >= 0 && day <= 9 ? (day = "0" + day) : "";
				//当前 日期
				currentDate = year + seperator + month + seperator + day;
				//当前 时间
				currentTime = hour + ":" + minute + ":" + second;
				sortDate = month + "-" + day;
				monthAndDay = month + "月" + day + "日";
				// 输出格式 为 2018-8-27 14:45:33
				// console.log(currentDate +" "+ currentTime);
				if (type == 0) {
					// console.log('-1',currentDate)
					return currentDate
				} else if (type == 1) {
					// console.log('0',currentTime)
					return currentTime;
				} else if (type == 2) {
					if (weex == 1) {
						return '周一'
					}
					if (weex == 2) {
						return '周二'
					}
					if (weex == 3) {
						return '周三'
					}
					if (weex == 4) {
						return '周四'
					}
					if (weex == 5) {
						return '周五'
					}
					if (weex == 6) {
						return '周六'
					}
					if (weex == 0) {
						return '周日'
					}
				} else if (type == 3) {
					// console.log('1',sortDate)
					return sortDate;
					
				} else if (type == 4) {
					// console.log('2',monthAndDay)
					return monthAndDay;
				} else {
					// console.log('3',currentDate + " " + currentTime)
					return currentDate + " " + currentTime;
				}
			}
			//--------------------------------时间选择器代码结束-----------------------------------------------------
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
	.markType {
		width: 65upx;
		height: 37upx;
		line-height: 37rpx;
		border-radius: 14upx;
		text-align: center;
		align-items: center;
		font-size: 24upx;
		font-family: SourceHanSansSC-Light;
	}
	.ctky_View {
		width: 94%;
		background: #FFFFFF;
		margin: 16upx 3%;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		
		&.ctky_ViewBorder{
			border: 4upx solid #06B4FD;
		}
	}
	
	
	
	.ctky_View_Left {
		text-align: left;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.ctky_View_Right {
		display: flex;
		text-align: right;
		align-items: center;
		padding: 0;
	}
	
	.MP_information3 {
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
	
	//---------------------------------------时间轴样式开始-----------------------------------------------------
	.headerClass {
		width: 100%;
		background: #FFFFFF;
		height: 109upx;
		//padding-left: 10upx;
		margin-bottom: 10upx;
		display: flex;
	}
	
	.scrollClass {
		height: 109upx;
		width: 86%;
		white-space: nowrap; //外层写这俩
		flex-wrap: nowrap;
	}
	
	.blockClass {
		margin: 12upx 14upx;
		//background: #FFFFFF;
		width: 87upx;
		height: 84upx;
		border-radius: 8upx;
		display: inline-block; //里层写这个
	}
	.textCLass {
		margin: 9upx 10upx;
	}
	.weekClass {
		//display: block;
		font-size: 26upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}
	.dateClass {
		//display: block;
		font-size: 24upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}
	.calendarImage {
		width: 35upx;
		height: 37upx;
	}
	
	.viewPress {
		background: #1EA2FF;
	
		.weekClass {
			color: #FFFFFF;
		}
	
		.dateClass {
			color: #FFFFFF;
		}
	}
	//---------------------------------------时间轴样式结束-----------------------------------------------------
</style>
