<script>
	// #ifdef APP-PLUS
	// const jyJPush = uni.requireNativePlugin('JY-JPush');
	// #endif
	import $DDTInterface from '@/common/DDT.js'
	import homeJS from 'common/Home.js';
	import utils from '@/pages_CTKY/components/CTKY/shoyu-date/utils.filter.js'
	export default {
		globalData: {
			//定时上传旅客定位数据
			globalInterval: 0,
			orderNumber: '0',
			uploadMyLocation: function() {
				let that = this;
				let userInfo = uni.getStorageSync('userInfo') || '';
				if (userInfo == '') {
					// uni.showToast({
					// 	title:'未登录',
					// 	icon:'none'
					// });
					return;
				}
				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
						uni.request({
							url: homeJS.Interface.addPassengerPosition.value,
							method: homeJS.Interface.addPassengerPosition.method,
							data: {
								orderNumber: that.orderNumber,
								passengerNumber: userInfo.userId,
								lon: res.longitude,
								lat: res.latitude,
								speed: res.speed,
								reportTime: utils.timeTodate(homeJS.dateFormat.dateformat, new Date().getTime())
							},
							success: function(res) {
								// console.log(res);
								if (res.data.status) {}
							},
							fail: function(res) {
								console.log(res);
							}
						});
					}
				});
			},
			constantly: function() {
				let that = this;
				if (that.globalInterval == 0) {
					that.globalInterval = setInterval(function() {
						that.uploadMyLocation();
					}, 10000);
				}
			},
			closeUpload: function() {
				let that = this;
				clearInterval(that.globalInterval);
			}
		},

		methods: {
			// #ifdef APP-PLUS
			// setJYJPushAlias: function(phoneNumber) {
			// 	var that = this;
			// 	jyJPush.deleteJYJPushAlias({
			// 		//  可以不用传值进去，但是需要配置这项数据
			// 	}, result => {
			// 		jyJPush.setJYJPushAlias({
			// 			userAlias: phoneNumber,
			// 		}, result => {
			// 			//  设置成功或者失败，都会通过这个result回调返回数据；数据格式保持极光返回的安卓/iOS数据一致
			// 			//  注：若没有返回任何数据，考虑是否初始化完成
			// 			console.log(result);
			// 			jyJPush.getRegistrationID(
			// 				//  返回的数据会有registrationID，errorCode
			// 				result => {
			// 					console.log(result)
			// 				});
			// 		});
			// 	});
			// },
			// addJYJPushReceiveOpenNotificationListener: function() { //监听通知被点击事件
			// 	jyJPush.addJYJPushReceiveOpenNotificationListener(result => {
			// 		//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
			// 		plus.runtime.setBadgeNumber(0);
			// 		jyJPush.resetJYJPushBadge(result => {
			// 			console.log(JSON.stringify(result));
			// 		});
			// 		console.log(result);
			// 	});
			// },
			// addJYJPushReceiveNotificationListener: function() {
			// 	jyJPush.addJYJPushReceiveNotificationListener(result => {
			// 		//  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
			// 		console.log(result);
			// 	});
			// },
			LoginLog: function(UserID, Phone) {
				var that = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						uni.getSystemInfo({
							success(res1) {
								var country = res.address.country ? res.address.country : '';
								var province = res.address.province ? res.address.province : '';
								var city = res.address.city ? res.address.city : '';
								var district = res.address.district ? res.address.district : '';
								var street = res.address.street ? res.address.street : '';
								var streetNum = res.address.streetNum ? res.address.streetNum : '';
								var poiName = res.address.poiName ? res.address.poiName : '';
								var Address = country + province + city + district + street + streetNum + poiName;
								uni.request({
									url: $DDTInterface.DDTInterface.BikeLog.Url,
									method: $DDTInterface.DDTInterface.BikeLog.method,
									data: {
										UserID: UserID,
										LogType: '打开app',
										PhoneNumber: Phone,
										Mac: '',
										PhoneBrand: res1.brand,
										Address: Address,
										PhoneModel: res1.model,
										SystemType: res1.platform,
										SystemVersion: res1.system,
									},
									success(res) {
										// console.log(res)
									},
									fail(err) {
										console.log(err)
									}
								})
							}
						})
					}
				})


			},
			// #endif
		},
		onLaunch: function() {
			// // #ifdef APP-PLUS
			// // 获取客户端的CID
			// const clientInfo = plus.push.getClientInfo();
			// // console.log(clientInfo);
			// // 获取推送消息
			// const _handlePush = function(message){
			// 		uni.switchTab({
			// 			url:'/pages/order/OrderList'
			// 	})
			// }
			// //事件处理
			// plus.push.addEventListener('click',_handlePush); //点击推送消息时 
			// // plus.push.addEventListener('receive',_handlePush); //从推送服务器获得消息时
			// // #endif
			var that = this;
			let userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo == '') {
				return;
			}
			// #ifdef APP-PLUS
			that.LoginLog(userInfo.userId,userInfo.phoneNumber);
			// #endif
		},
		onShow: function() {
			var that = this;
			let userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo == '') {
				return;
			}
			// #ifdef APP-PLUS
			// that.setJYJPushAlias(userInfo.phoneNumber);
			// that.addJYJPushReceiveOpenNotificationListener();
			// that.addJYJPushReceiveNotificationListener();
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("@/common/overallSituation.css");
	/* #ifndef APP-NVUE */
	@font-face {
		font-family: jdticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.jdticon {
		font-family: "jdticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}

	/* #endif */
</style>
