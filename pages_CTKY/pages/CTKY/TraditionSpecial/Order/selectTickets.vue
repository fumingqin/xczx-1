<template>
	<!-- 班次列表 -->
	<view class="myView">
		<!-- 顶部时间选项卡 -->
		<view class="headerClass">
			<scroll-view class="scrollClass" scroll-x>
				<view class="blockClass" :class="selectIndex == index ? 'viewPress': '' " v-for="(item,index) in dateArray" :key="index"
				 @click="viewClick(index,item)" v-model="selectIndex">
					<view class="textCLass">
						<view class="weekClass">{{item.week}}</view>
						<view class="dateClass">{{item.date}}</view>
					</view>
				</view>
			</scroll-view>
			<view style="width: 14%;height: 100%; align-items: center; justify-content: center;display: flex;">
				<image src="../../../../static/CTKY/calendar.png" class="calendarImage" @click="onShowDatePicker('date')"></image>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
			 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		
		<!-- 车票内容部分 -->
		<view class="ctky_View" v-for="(item,index) in allTicketsList" :key="index" @click="ticketDetail(allTicketsList[index])">
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" v-if="item.shuttleType == '普通班车' && isFlowTickets(item) == '普通'">普通班车</view>
					<view class="markType" style="border:#FF5A00 solid 1px;color:#FF5A00;" v-if="item.shuttleType == '定制班车'">定制班车</view>
					<view class="busMarkType" style="border:#FF5A00 solid 1px;color:#FF5A00;" v-if="item.shuttleType == '定制巴士'">定制巴士</view>
					<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" v-if="item.shuttleType == '普通班车' && isFlowTickets(item) == '流水'">流水</view>
					<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">{{turnDate(item.setTime)}}</view>
				</view>
				<!-- <view style="display: flex;align-items: center;justify-content: space-between;"> -->
				<!-- 班次：{{getScheduleNum(item)}} 这里没有班次信息，暂时不显示 -->
				<!-- <view v-if="item.shuttleType != '定制巴士'" style="margin-left: 25upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;
						color: #333333;margin-bottom: 16upx;"></view>
				</view> -->
				<view style="margin-left: 24upx;margin-bottom: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">线路:{{item.lineName}}</view>
				<view style="margin-left: 24upx;display: flex;align-items: center;margin-bottom: 16upx;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<image src="../../../../static/CTKY/startDot.png" style="width: 10upx ;height: 10upx;"></image>
						<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;
						color: #333333;">{{item.startStaion}}</view>
					</view>
					<view v-if="item.shuttleType != '定制巴士'" style="margin-right: 28upx;font-size: 24upx;font-style:
					SourceHanSansSC-Regular; color: #FC4646;">全票￥{{item.fare}}</view>
					<!-- <view v-if="item.shuttleType != '定制巴士'" style="margin-right: 28upx;font-size: 24upx;font-style:
					SourceHanSansSC-Regular; color: #FC4646;">儿童票￥{{item.halfTicket}}</view> -->
					<view v-if="item.shuttleType == '定制巴士'" style="margin-right: 28upx;font-size: 24upx;font-style:
					SourceHanSansSC-Regular; color: #FC4646;">价格￥{{item.PriceRange}}</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<image src="../../../../static/CTKY/endDot.png" style="width: 10upx ;height: 10upx;"></image>
						<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;
						color: #333333;">{{item.endStation}}</view>
					</view>
					<view style="margin-right: 28upx;font-size: 24upx;font-style:
					SourceHanSansSC-Light; color: #666666;">余{{item.remainingVotes}}张</view>
				</view>

				<view style="margin-left: 25upx;margin-bottom: 10upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				font-size: 28upx;color: #666666;margin-top: 6upx;"
				 v-if="item.shuttleType == '普通班车'">{{item.carType}}/约{{(item.duration.slice(0,-2))}}分钟/{{item.planScheduleCode}}</view>
				<view style="margin-left: 25upx;margin-bottom: 10upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				font-size: 28upx;color: #666666;margin-top: 6upx;"
				 v-if="item.shuttleType == '定制班车'">{{item.carType}}/约{{(item.duration.slice(0,-2))}}分钟/{{item.planScheduleCode}}</view>
				<view style="margin-left: 25upx;margin-bottom: 10upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				 font-size: 28upx;color: #666666;margin-top: 6upx;"
				 v-if="item.shuttleType == '定制巴士'">{{item.SetoutTimeDesc}}</view>

				<!-- 途径站点 -->
				<view class="st_routeSite">
					<view style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
						<text>途径站点:</text>
						<text>{{turnValue(item.lineViaSiteDesc)}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
	import MxDatePicker from "@/pages_CTKY/components/CTKY/mx-datepicker/mx-datepicker.vue";
	import utils from "@/pages_ZXGP/components/ZXGP/shoyu-date/utils.filter.js";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				utils: utils,
				dateArray: [], //时间轴的数量的数组
				selectIndex: '', //选中的下标
				date: '', //时间轴上选中的日期
				showPicker: false,
				type: 'rangetime',
				value: '',
				startStation: '', //出发站
				endStation: '', //终点站
				isNormal: '', //状态
				departureData: [], //班次数据
				stationArray: [],
				isEndores: '', //是否是改签
				endoresDate: '', //改签日期
				endoresOrderNum: '', //改签的订单编号
				endorescompanyCode: '',
				scheduleDetailNum: '', //班次
				allTicketsList: [], //所有的班次信息（客运+定制巴士）
			}
		},
		onLoad(param) {
			uni.showToast({
				title: '查询班次中...',
				icon: 'none'
			})
			var that = this;
			if (param.isEndores) { //当前是改签
				that.isEndores = param.isEndores;
				var array = JSON.parse(param.orderInfo);
				that.startStation = array.startSiteName;
				that.endStation = array.endSiteName;
				that.endoresOrderNum = array.orderNumber;
				that.endorescompanyCode = array.companyCode;
				var dateArray = array.setOutTime.split(' ');
				that.endoresDate = dateArray[0];
				console.log(dateArray[0])
				//初始化时间轴
				that.loadDate('date');
				//加载班次列表数据
				that.getTicketInfo(dateArray[0]);

			} else {

				that.startStation = param.startStation;
				that.endStation = param.endStation;
				that.isNormal = param.isNormal;
				console.log('起点', that.startStation)
				console.log('终点', that.endStation)
				console.log('状态', that.isNormal)
				//如果传过来的参数没有时间就获取当前时间
				if (param.date == 'date') { //二维码扫码进来
					// #ifdef H5
					//获取openid
					this.getOpenID();
					// #endif
					//初始化时间轴
					that.loadDate(param.date);
					that.getTicketInfo(param.date);
				} else {
					//班次列表数据参数，从上一个页面传过来的时间，上下车点
					that.date = param.date;
					//初始化时间轴
					that.loadDate(param.date);
					//加载班次列表数据
					that.getTicketInfo(this.date);
				}
				//点击顶部时间，请求该时间的班次列表
				// this.getDeparture();
			}
		},
		methods: {
			getOpenID() {
				var that = this;
				uni.getStorage({
					key: 'scenicSpotOpenId',
					success: function(response) {

						if (response.data) {
							console.log('当前没有有openid', response);
						} else {
							that.getCode();
						}
					},
					fail: function(fail) {
						//无openid，请求openid
						that.getCode();
					}
				})
			},
			//-------------------------------加载客运班次列表数据-------------------------------
			getTicketInfo: function(date) {
				var that = this;
				uni.showToast({
					title: '查询班次中...',
					icon: 'loading'
				})
				if (date == 'date') {
					date = new Date();
				}
				that.allTicketsList = [];
				var systemName = '';
				// #ifdef H5
				systemName = $KyInterface.KyInterface.systemName.systemNameXYYHH5;;
				// #endif
				// #ifdef APP-PLUS
				systemName = $KyInterface.KyInterface.systemName.systemNameXYYHAPP;
				// #endif
				// #ifdef MP-WEIXIN
				systemName = $KyInterface.KyInterface.systemName.systemNameXYYHWeiXin;
				// #endif
				console.log(that.startStation)
				console.log(that.endStation)
				uni.request({
					url: $KyInterface.KyInterface.Ky_getListSchedulesInfo.Url,
					method: $KyInterface.KyInterface.Ky_getListSchedulesInfo.method,
					header: $KyInterface.KyInterface.Ky_getListSchedulesInfo.header,
					data: {
						systemName: systemName,
						startPosition: that.startStation,
						endPosition: that.endStation,
						date: date,
					},
					success: (res) => {
						// uni.hideLoading();
						//非空判断
						if (res.data.status == true) {
							if (res.data.data) {
								that.departureData = res.data.data;
								let i = 0;
								for (i; i < res.data.data.length; i++) {
									if(res.data.data[i].startStaion == that.startStation && res.data.data[i].endStation == that.endStation){
										that.allTicketsList.push(res.data.data[i])
									}
								}
								console.log('客运班次信息2', that.allTicketsList)
								//加载定制巴士班次列表数据
								// that.getSpecialBusTicketInfo(date);
								uni.hideLoading();
							} else if (res.data.data.length == 0) {
								//加载定制巴士班次列表数据
								// that.getSpecialBusTicketInfo(date);
								uni.showToast({
									title: '暂无班次信息',
									icon: 'none'
								})
								uni.hideLoading();
							} else if (res.data.msg == '服务器无法处理请求。 ---> 未将对象引用设置到对象的实例。') {
								uni.showToast({
									title: '服务器异常,请联系客服',
									icon: 'none'
								})
								uni.hideLoading();
							}
						} else if (res.data.status == false) {
							//加载定制巴士班次列表数据
							// that.getSpecialBusTicketInfo(date);
							uni.showToast({
								title: '暂无班次信息',
								icon: 'none'
							})
							uni.hideLoading();
						}
					},
					fail(res) {
						console.log(res);
						uni.showToast({
							title: '服务器异常，班次列表数据出错',
							icon: 'none'
						})
						uni.hideLoading();
					}
				});
			},
			//-------------------------------加载定制巴士班次列表数据-------------------------------
			getSpecialBusTicketInfo: function(date) {
				var that = this;
				uni.showLoading();
				var LineName = that.startStation + '-' + that.endStation;
				uni.request({
					url: $KyInterface.KyInterface.Cs_GetSellableScheduleByLineName.Url,
					method: $KyInterface.KyInterface.Cs_GetSellableScheduleByLineName.method,
					header: $KyInterface.KyInterface.Cs_GetSellableScheduleByLineName.header,
					data: {
						executeDate: date,
						LineName: LineName,
					},
					success: (res) => {
						// console.log('定制巴士班次数据',res)
						uni.hideLoading();
						//非空判断
						if (res.data.Successed == true) {
							if (res.data.ScheduleForSell) {
								let i = 0;
								for (i; i < res.data.ScheduleForSell.length; i++) {
									var array = {
										shuttleType: '定制巴士',
										setTime: res.data.ScheduleForSell[i].SetoutTime,
										startStaion: res.data.ScheduleForSell[i].StartSiteName,
										endStation: res.data.ScheduleForSell[i].EndSiteName,
										SetoutTimeDesc: res.data.ScheduleForSell[i].SetoutTimeDesc,
										remainingVotes: res.data.ScheduleForSell[i].MaxTicket,
										LineViaSiteName: res.data.ScheduleForSell[i].LineViaSiteName,
										ScheduleID: res.data.ScheduleForSell[i].ScheduleID,
										ScheduleCompanyCode: res.data.ScheduleForSell[i].ScheduleCompanyCode,
										PriceRange: res.data.ScheduleForSell[i].PriceRange,
									};
									that.allTicketsList.push(array);
								}
								that.allTicketsList = that.ForwardRankingDate(that.allTicketsList);
							} else if (res.data.ScheduleForSell.length == 0) {
								if (that.departureData.length == 0) {
									uni.showToast({
										title: '暂无班次信息',
										icon: 'none'
									})
								}
							}
						} else if (res.data.Successed == false) {
							// that.departureData = res.data.ScheduleForSell;
							if (that.departureData.length == 0) {
								uni.showToast({
									title: '暂无班次信息',
									icon: 'none'
								})
							}
						}
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			//-------------------------------班次排序--升序-------------------------------
			ForwardRankingDate: function(param) {
				for (let i = 0; i < param.length - 1; i++) {
					for (let j = 0; j < param.length - 1 - i; j++) {
						if (Date.parse(this.turnDate(param[j].setTime2)) > Date.parse(this.turnDate(param[j + 1].setTime2))) {
							var temp = param[j];
							param[j] = param[j + 1];
							param[j + 1] = temp;
						}
					}
				}
				return param;
			},
			//-------------------------------点击日期-------------------------------
			viewClick: function(e, item) {
				this.selectIndex = e;
				this.date = item.longDate;
				this.getDeparture();
			},
			//-------------------------------获取班次信息-------------------------------
			getScheduleNum: function(param) {
				if (param.shuttleType != '定制巴士') {
					var schedule = param.executeScheduleID.split('|');
					return schedule[1];
				}
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				var setTime = date.replace('T', ' ');
				var setTime2 = setTime.substr(0, 16);
				return setTime2;
			},
			//-------------------------------判断是否是流水班次-------------------------------
			isFlowTickets: function(param) {
				//传入班次ID，检测是否包含字段‘前’，有字段‘前’即为流水班次
				//判断返回值为-1表示没有字段‘前’
				if (param.shuttleType != '定制巴士') {
					if (param.priceID.lastIndexOf('前') != -1) {
						return '流水'
					} else {
						return '普通'
					}
				}
			},
			//-------------------------------显示日期-------------------------------
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},

			//-------------------------------选择日期-------------------------------
			onSelected(e) {
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					// this[this.type] = e.value.split('/')[1] + "月" + e.value.split('/')[2] + "日";
					// this.datestring = this[this.type];
					// this.queryWeek(e.date.toString().substring(0,3));
					// console.log(this[this.type]);
					// console.log(e.date.toString().substring(0, 3));
					//console.log(this.Week);
					//选择的值
					// console.log('value => ' + e.value);
					//原始的Date对象
					// console.log('date => ' + e.date);
					this.date = e.value;
					// console.log(e.value)
					//从日历选择时间后刷新列表数据
					this.getTicketInfo(e.value);
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
							// if (this.getTime(0, mydate) == this.getTime(0, dateToday)) {
							// 	week = '今天';
							// }
							this.dateArray.push({
								week: week,
								date: nowdate,
								longDate: longdate,
							});
							x
						}
					}
				}
			},
			//-------------------------------改签请求-------------------------------
			endores: function(item) {
				var that = this;
				uni.showLoading();
				uni.request({
					url: $KyInterface.KyInterface.Ky_endorse.Url,
					method: $KyInterface.KyInterface.Ky_endorse.method,
					header: $KyInterface.KyInterface.Ky_endorse.header,
					data: {
						orderNumber: that.endoresOrderNum,
						CompanyCode: that.endorescompanyCode,
						executeDate: item.setTime,
						sheduleCompanyCode: item.scheduleCompanyCode,
						executeScheduleID: item.executeScheduleID,
						startSiteID: item.startSiteID,
						endSiteID: item.endSiteID,
					},
					success: (res) => {
						uni.hideLoading();
						console.log(res);
						if (res.data) {
							if (res.data.status == true) {
								uni.showToast({
									title: res.data.msg
								})
							} else if (res.data.status == false) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						}
					},
					fail(res) {
						console.log(res);
						// uni.hideLoading();
					}
				})
			},
			//-------------------------------点击班次进行缓存，并打开页面  开始-------------------------------
			ticketDetail(item) {
				var that = this;
				//改签入口
				if (that.isEndores == 'true') {
					let content = that.startStation + '-' + that.endStation + '-' + that.endoresDate
					uni.showModal({
						content: '是否改签到当前班次' + content,
						success(res) {
							if (res.confirm) {
								that.endores(item)
							}
						}
					})
				} else {
					//如果选择的是传统客运/定制班车就进下面的方法
					if (item.shuttleType != '定制巴士') {
						//如果当前选的是流水班次就弹框提示
						if (item.priceID.lastIndexOf('前') != -1) {
							uni.showModal({
								title: '温馨提示',
								content: '流水班车发车时间间隔短、班次多，旅客购买后可乘坐当天任意流水班车出行。',
								success(res) {
									if (res.confirm) {
										that.goNext(item);
									}
								}
							})
						} else {
							//如果选的不是流水班次就直接跳转到下一个页面
							that.goNext(item);
						}
					} else {
						var array = {
							SetoutTime: item.setTime,
							StartSiteName: item.startStaion,
							EndSiteName: item.endStation,
							remainingVotes: item.remainingVotes,
							LineViaSiteName: item.LineViaSiteName,
							ScheduleID: item.ScheduleID,
						}
						uni.setStorage({
							key: 'specialTicketDate',
							data: array,
							success() {
								uni.navigateTo({
									url: '../../SpecialBus/ScheduleLineList/specialBusTakeOrder'
								})
							},
							fail() {
								console.log('123');
							}
						});
					}
				}
			},
			goNext: function(item) {

				uni.setStorage({
					key: 'ticketDate',
					data: item,
					success() {
						uni.navigateTo({
							url: './scheduleDetails'
						})
					},
					fail() {
						console.log('123');
					}
				});
			},
			//-------------------------------点击班次进行缓存，并打开页面  结束-------------------------------
			//日期时间转换函数   type 0 年月日 ，1 时分秒 ， 2 星期 ，3 月/日  4几月几日
			getTime: function(type, date1) {
				let date = new Date(date1.getTime()),
					currentDate,
					currentTime,
					sortDate,
					monthAndDay,
					seperator = "/", // 如果想要其他格式 只需 修改这里 
					year = date.getFullYear(),
					month = date.getMonth() + 1,
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
				sortDate = month + "/" + day;
				monthAndDay = month + "月" + day + "日";
				// 输出格式 为 2018-8-27 14:45:33
				// console.log(currentDate +" "+ currentTime);
				if (type == 0) {
					return currentDate
				} else if (type == 1) {
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
					return sortDate;
				} else if (type == 4) {
					return monthAndDay;
				} else {
					return currentDate + " " + currentTime;
				}
			},
			//-------------------------------初始化时间轴-------------------------------
			loadDate(param) {
				var that = this;
				var date = '';

				//从二维码进到这个页面，使用系统时间
				if (param.date == 'date') {
					date = new Date();
					that.getTicketInfo(date);
					console.log('二维码');
				} else {
					//从首页进来，对时间格式进行操作
					if (param == 'date') {
						date = new Date();
						that.getTicketInfo(date);
					} else {
						var subStr = new RegExp('-', 'ig');
						var result = this.date.replace(subStr, "/");
						date = new Date(result);
					}
				}
				// var mydate = this.date;
				this.selectIndex = 0;
				for (var i = 0; i < 7; i++) {
					var mydate = new Date(date.getTime() + 24 * i * 60 * 60 * 1000);

					var nowdate = this.getTime(3, mydate);
					var week = this.getTime(2, mydate);
					var longdate = this.getTime(0, mydate);
					// if (mydate.getTime() == date.getTime()) {
					// 	week = '今天';
					// }
					this.dateArray.push({
						week: week,
						date: nowdate,
						longDate: longdate,
					});
				}
			},

			//点击顶部时间，请求该时间的班次列表
			getDeparture() {
				this.getTicketInfo(this.date);
			},
			// #ifdef  H5
			//获取openid
			getCode() {
				let that = this;
				let Appid = "wx14af28006f937f6e"; //appid
				let code = this.getUrlParam('code'); //是否存在code

				let local = $KyInterface.KyInterface.Ky_getListSchedulesInfo.Url;
				if (code == null || code === "") {
					//不存在就打开上面的地址进行授权
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						Appid +
						"&redirect_uri=" +
						encodeURIComponent(local) +
						"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				} else {
					// 存在则通过code传向后台调用接口返回微信的个人信息
					// #ifdef H5

					// #endif
					uni.request({
						url: 'https://27.148.155.9:9056/CTKY/getWxUserinfo?code=' + code + '&Appid=' + Appid +
							'&Appsecret=9cda28b050341aca1f674d2043b01358',
						header: $KyInterface.KyInterface.Ky_getListSchedulesInfo.header,
						method: $KyInterface.KyInterface.Ky_getListSchedulesInfo.method,
						success(res) {
							console.log(res, "res")
							uni.setStorageSync('scenicSpotOpenId', res.data.openid)
							uni.setStorageSync('wxuserInfo', res.data)
							let openid = res.data.openid;
							console.log(openid, "openid")
							if (openid != "" && openid != null && openid != undefined) {
								uni.request({
									//url:'http://zntc.145u.net/api/person/changeInfo',
									url: that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.value,
									data: {
										openId_wx: openid,
									},
									method: that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.method,
									success(res1) {
										console.log(res1, 'res1')
										//判断是否有绑定手机号
										if (res1.data.msg == "获取用户信息失败,不存在该openID用户信息") {
											uni.showToast({
												title: '您未绑定手机号，请绑定手机号！',
												icon: 'none',
											})
											setTimeout(function() {
												uni.navigateTo({
													url: '/pages/GRZX/wxLogin'
												})
											}, 1000);
										}
										console.log(openid, 'openid1')
										if (openid == res1.data.data.openId_wx && openid != "") {
											uni.setStorageSync('userInfo', res1.data.data)
										}
									}
								})
							}
						},
						fail(err) {
							console.log(err)
							uni.showToast({
								title: "err是" + err.errMsg,
								icon: 'none'
							})
						}
					})
				}
			},
			//判断code信息是否存在
			getUrlParam(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let url = window.location.href.split('#')[0]
				let search = url.split('?')[1]
				if (search) {
					var r = search.substr(0).match(reg)
					if (r !== null) return unescape(r[2])
					return null
				} else {
					return null
				}
			},
			//#endif  
			
			//-------------------------------转换-------------------------------
			turnValue(value) {
				if(value) {
					var setValue = value.replace(/,/g,'、');
					return setValue;
				}
			},
		}
	}
</script>

<style lang="scss">
	page,
	.myView {
		flex-direction: column;
		// width: 100%;
		// height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		position: sticky;
		top: 0;
		width: 100%;
		background: #FFFFFF;
		height: 109upx;
		//padding-left: 10upx;
		margin-bottom: 10upx;
		display: flex;
		z-index: 9999999999999;
	}

	.scrollClass {
		position: sticky;
		top: 0;
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

	.markType {
		width: 128upx;
		height: 37upx;
		line-height: 37rpx;
		border-radius: 20upx;
		text-align: center;
		align-items: center;
		font-size: 24upx;
		font-family: SourceHanSansSC-Light;
	}

	.busMarkType {
		// width: 65upx;
		padding: 0 10rpx;
		height: 37upx;
		line-height: 37rpx;
		border-radius: 14upx;
		text-align: center;
		align-items: center;
		font-size: 24upx;
		font-family: SourceHanSansSC-Light;
	}

	.textCLass {
		margin: 9upx 17upx;
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

	.viewPress {
		background: #DD524D;

		.weekClass {
			color: #FFFFFF;
		}

		.dateClass {
			color: #FFFFFF;
		}
	}

	.calendarImage {
		width: 35upx;
		height: 37upx;
	}

	.ctky_View {
		width: 94%;
		background: #FFFFFF;
		margin: 16upx 3%;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
	}

	.ctky_View_Left {
		text-align: left;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0;
	}
	
	.st_routeSite{
		margin-left: 25upx;
		margin-bottom: 20upx;
		font-style: SourceHanSansSC-Light;
		font-weight: lighter;
		font-size: 28upx;
		color: #666666;
		display: flex;
		width: 660upx;
		margin-top: 6upx;
	}
</style>
