<template>
	<view class="content">
		<view class="backImg">
			<!-- 顶部背景图 -->
			
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/GRZX/set.png" class="setClass" @click="navTo('set')"></image>
			<image src="../../static/GRZX/info.png" class="infoClass" @click="navTo('myNews')"></image>
			<image src="../../static/GRZX/scan.png" class="scanClass" @click="navTo('scan')"></image>
			<!-- #endif -->
			
			<!-- 个人信息，头像，昵称等等 -->
			<view class="userInfoClass" @click="checkLogin">
				<image class="portraitClass" :src="port || '/static/GRZX/missing-face.png'"></image>
				<view class="usernameClass" style="display: flex;flex-direction: column;">
					<view><text>{{nickname}}</text></view>
					<view class="userTypeBox" v-if="nickname != '游客'">
						<!-- <image src="../../static/GRZX/huangguan.png" class="iconClass bc_GRZX_UserType"></image> -->
						<text class="typeBox bc_GRZX_UserType" >普通用户</text>
					</view>
				</view>
			</view>
						
			<!-- 个人主页按钮 -->
			<!-- <view class="grzyClass" @click="checkLogin">
				<text>个人主页</text>
				<image src="../../static/GRZX/btnRight_Home.png" class="rightClass"></image>
			</view> -->
			
			<!-- 订单链接按钮 -->
			<view class="myBox">
				<view class="collection" @click="orderClick(3)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay1.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">待支付</text>
				</view>
				<view class="order" @click="orderClick(2)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay2.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">进行中</text>
				</view>
				<view class="history" @click="orderClick(1)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay3.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">已完成</text>
				</view>
			</view>
		</view>

		<!-- 广告 -->
		<image :src="advert" class="advertClass" lazy-load="true"></image>

		<view class="serviceBox">
			<text class="moreClass">更多服务</text>
			<!-- 分割线 -->
			<view class="lineClass"></view>
			
			<!-- ========================更多服务的功能模块============================ -->
			<view style="display: flex; flex-wrap: wrap;">
				<view v-for="(item,index) in serviceList" :key="index">
					<view class="itemClass" @click="infoClick" v-if="item.ItemTitle=='乘客管理'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="XXGLicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<view class="itemClass" @click="pictureClick" v-if="item.ItemTitle=='站点拍照'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="ZDPZicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<view class="itemClass" @click="complaintClick" v-if="item.ItemTitle=='我的投诉'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="WDTSicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<view class="itemClass" @click="addContact" v-if="item.ItemTitle=='紧急联系人'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="JJLXRicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					
					<view class="itemClass" @click="realName" v-if="item.ItemTitle=='实名认证'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="SMRZicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<view class="itemClass" @click="replacePhoneNum" v-if="item.ItemTitle=='更换手机号'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="GHSJHicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<!-- #ifdef H5 -->
					<view class="itemClass" @click="phoneClick" v-if="item.ItemTitle=='电话客服'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="DHKFicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<!-- #endif -->
					<view class="itemClass" @click="feedbackClick" v-if="item.ItemTitle=='意见反馈'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="YJFKicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					
					<!-- #ifdef MP-WEIXIN -->
					<view class="itemClass" style="position: relative;" v-if="item.ItemTitle=='在线客服'&&item.IsUse"> 
						<image :src="item.ImageURL" class="ZXKFicon"></image>
						<button open-type="contact" class="contactClass" hover-class="btn_Click"></button>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<view class="itemClass" @click="QQClick" v-if="item.ItemTitle=='QQ客服'&&item.IsUse" hover-class="btn_Click">
						<image :src="item.ImageURL" class="QQKFicon"></image>
						<text class="fontStyle">{{item.ItemTitle}}</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<!-- ========================更多服务的功能模块============================ -->
			
		</view>

		<!-- 添加紧急联系人弹窗 -->
		<view :hidden="userFeedbackHidden" class="popup_content">
			<view class="popup_title">添加</view>
			<view class="popup_textarea_item">
				<input class="inputClass" v-model="contantPhone" placeholder="输入紧急联系人的手机号码" type="number" maxlength="11" :focus='focusType' />
				<view>
					<button class="popup_button" @click="submit">确定</button>
				</view>
			</view>
		</view>
		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv"></view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				applyName:'',   //应用名称
				
				QQ: '', 		//qq客服
				nickname: '', 	//昵称
				port: '', 		//头像
				advert: '', 	//广告
				userFeedbackHidden: true,  //是否隐藏弹框
				focusType: false, 		   //是否获取input焦点
				
				userInfo: [], 		//用户信息
				contantPhone: '',	//紧急联系人电话
				userId: '', 		//用户id
				phoneNumber: '', 	//客服电话
				RealNameStatus: '', 	//是否实名--已实名、未实名、认证中
				
				serviceList:[], 	//服务功能模块
			}
		},
		onLoad() {	
			
			//加载广告图片
			this.loadImg();
			
			//加载服务功能模块
			this.loadServiceList();
		},
		onShow() {
			var that = this;
			this.loadData();
			
			//读取客服热线
			// uni.getStorage({
			// 	key: 'ConsumerHotline',
			// 	success(res) {
			// 		that.phoneNumber = res.data.Phone1
			// 	}
			// })
		},
		methods: {
			// ---------------------------加载图片----------------------------
			loadImg() {
				var that = this;
				that.$ChangeImage.GetImage("南平综合出行","新广告").then(function(data) {
					that.advert = data;
				});
			},
			
			// ---------------------------加载服务功能模块----------------------------
			loadServiceList(){
				this.serviceList=[{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_XXGL.png",
						ItemTitle: "乘客管理"
					},{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_ZDPZ.png",
						ItemTitle: "站点拍照"
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_WDTS.png",
						ItemTitle: "我的投诉"
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_JXLXR.png",
						ItemTitle: "紧急联系人"
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_SMRZ.png",
						ItemTitle: "实名认证"
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_GHSJH.png",
						ItemTitle: "更换手机号"
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_DHKF.png",
						ItemTitle: "电话客服"
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_YJFK.png",
						ItemTitle: "意见反馈"
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_ZXKF.png",
						ItemTitle: "在线客服"
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_QQKF.png",
						ItemTitle: "QQ客服"
					},]
			},
			
			// ---------------------------加载数据----------------------------
			loadData() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(user) {
						// console.log(user,"user")
						var phone = user.data.phoneNumber;
						if (phone != "" && phone != null && user.data != "") {
							console.log("应用名称",that.$GrzxInter.systemConfig.applyName);
							console.log("应用类型",that.$GrzxInter.systemConfig.openidtype);
							console.log("手机号",phone);
							uni.request({
								url: that.$GrzxInter.Interface.login.value,
								data: {
									phoneNumber: phone,
									systemname:that.$GrzxInter.systemConfig.appName,//应用名称
									openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
								},
								method: that.$GrzxInter.Interface.login.method,
								success(res) {
									console.log(res,'res')
									// that.checkIDRealName(res.data.data.userId);
									uni.setStorageSync('userInfo', res.data.data);
									that.userInfo = res.data.data;

									if (res.data.data.nickname == "" || res.data.data.nickname == null) {
										that.nickname="请输入昵称";
										// that.nickname = res.data.data.phoneNumber;
									} else {
										that.nickname = res.data.data.nickname;
									}
									var base64 = res.data.data.portrait;
									if (that.isBase64(base64)) {
										base64ToPath(base64)
											.then(path => {
												that.port = path;
											})
											.catch(error => {												
											})
									} else {
										that.port = base64;
									}
									that.userId = res.data.data.userId;
								},
								fail(err) {
									console.log(err);
								}
							})
						}
					},
					fail() {
						that.nickname = "游客";
						that.port = "";
					}
				})
			},
			
			//-------------------------------------根据id获取实名信息----------------------------------
			checkIDRealName(id) {
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: id,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						// console.log('获取实名信息成功',res)
						if (res.data.status == true) {
							if (res.data.data.RealNameStatus == 0) {
								that.RealNameStatus = '未实名';
							} else if (res.data.data.RealNameStatus == 1) {
								that.RealNameStatus = '已实名';
							} else if (res.data.data.RealNameStatus == 2) {
								that.RealNameStatus = '未通过';
							} else if (res.data.data.RealNameStatus == 3) {
								that.RealNameStatus = '认证中';
							} else if (res.data.data.RealNameStatus == 4) {
								that.RealNameStatus = '资料待完善';
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
						uni.setStorageSync('RealNameInfo', res.data.data)
					}
				})
			},
			
			// ---------------------------跳转订单的点击-----------------------
			orderClick(e) {
				uni.setStorageSync('currentNum', e)
				this.$GrzxInter.navToOrderList();
			},
			
			// --------------------------设置，通知，扫一扫--------------------
			navTo(e) {
				if (e == 'set') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.set.url,
					})
				}
				if (e == 'myNews') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.myNews.url,
					})
				}
				if (e == 'scan') {
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							void plus.runtime.openWeb(res.result, function() {
								//识别失败
							});
						}
					})
				}
			},
			
			// ---------------------------乘客管理----------------------------
			infoClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.infoList.url,
				})
			},
			
			//--------------------添加紧急联系人的电话号码--------------------
			addContact() {
				var that = this;
				that.contantPhone = "";
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						that.userFeedbackHidden = false;
						that.focusType = true;
						that.contantPhone = res.data.autograph;
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			submit() {
				var that = this;
				console.log(that.contantPhone, "contantPhone")
				var reg = (/^1(3|4|5|6|7|8|9)\d{9}$/);
				if (that.contantPhone == "") {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
					})
				} else if (!that.judgeNum(that.contantPhone) || that.contantPhone.length != 11 || !reg.test(that.contantPhone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
					})
					// #ifdef H5
					that.userFeedbackHidden = true;
					// #endif
				} else {
					uni.request({
						url: that.$GrzxInter.Interface.AddEmergencyContact.value,
						data: {
							UserId: that.userId,
							Autograph: that.contantPhone,
						},
						method: that.$GrzxInter.Interface.AddEmergencyContact.method,
						success(res) {
							if (res.data.data != "") {
								console.log(res.data.data, '296')
								uni.setStorageSync('userInfo', res.data.data)
							}
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							})
							that.focusType = false;
							that.userFeedbackHidden = true;
						}
					})
				}
			},
			hideDiv() {
				this.focusType = false;
				this.userFeedbackHidden = true;
			},
			
			//------------------------------投诉---------------------------
			complaintClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.complaint.url,
				})
			},
			
			//------------------------------意见反馈-----------------------
			feedbackClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.feedback.url,
				})
			},
			
			//-----------------------------拍照返现------------------------
			pictureClick() {
				uni.navigateTo({
					url: '../../pages_GRZX/pages/GRZX/pictureList',
				})
			},
			
			//----------------------------是否登录--------------------------
			checkLogin() {
				var that = this;
				// ---------------APP,WX--------------
				//#ifndef H5
				var user = uni.getStorageSync('userInfo');
				console.log(user,"用户信息");
				if (user.userId == "" || user.userId == null) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
					})
					// #ifdef APP-PLUS
					setTimeout(function() {
						uni.navigateTo({
							url: that.$GrzxInter.Route.userLogin.url+'?urlData=1',
						})
					}, 500);
					// #endif
					//#ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pages/Home/wxAuthorize',
					})
					// #endif
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
				// ---------------H5--------------
				//#ifdef H5
				var user1 = uni.getStorageSync('userInfo')||'';
				console.log(user1, "1111")
				if (user1 == "" || user1 == null || user1.openId_wx == null || user1.openId_wx == "") {
					console.log(user1, "2222")
					uni.showToast({
						title: "请允许公众号授权登录，即将为你跳转至首页",
						icon: 'none'
					})
					setTimeout(function() {
						that.$GrzxInter.navToHome();//返回首页
					}, 500);
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
			},
			
			// ---------------------------收藏--------------------------
			collectionClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/collection'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			
			// ---------------------------历史--------------------------
			historyClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/history'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			
			// ---------------------------电话客服--------------------------
			phoneClick() {
				var that = this;
				// uni.makePhoneCall({
				// 	phoneNumber: that.phoneNumber, //仅为示例
				// });
				uni.request({
					url:that.$GrzxInter.Interface.SearchCustomerService.value,
					data:{
						region:'泉州',
					},
					method:that.$GrzxInter.Interface.SearchCustomerService.method,
					success(res){
						console.log(res)
						uni.makePhoneCall({
						    phoneNumber: res.data.data.phone, 
						});
					}
				})
			},
			
			// ---------------------------QQ客服--------------------------
			QQClick() {
				// #ifdef APP-PLUS
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.SearchCustomerService.value,
					data: {
						region: '泉州',
					},
					method: that.$GrzxInter.Interface.SearchCustomerService.method,
					success(res) {
						plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + res.data.data.qq + '&version=1&src_type=web ');
					}
				})
				//#endif
			},
			
			// ---------------------------实名认证--------------------------
			realName() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						// that.checkRealName();
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			
			//-------------------------------------检查是否实名----------------------------------
			checkRealName() {
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: that.userId,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						console.log(res)
						if (res.data.data == "" || res.data.data.UserName == "" || res.data.data.UserIDNumber == "") {
							//实名认证
							uni.navigateTo({
								url: that.$GrzxInter.Route.realName.url,
							})
						} else if (res.data.data.RealNameStatus !== 1) {
							//上传图片
							uni.navigateTo({
								url: that.$GrzxInter.Route.uploadPhoto.url,
							})
						} else {
							uni.showToast({
								title: '您已实名',
								icon: 'none',
							})
						}
					}
				})
			},
			
			// ---------------------------更换手机号--------------------------
			replacePhoneNum() {
				uni.showToast({
					title: '暂未开通，敬请期待',
					icon: 'none'
				})
				// uni.navigateTo({
				// 	url:this.$GrzxInter.Route.replacePhoneNum.url,
				// })
			},
			
			//----------------------判断是否为base64格式-------------------
			isBase64: function(str) {
				if (str === '' || str.trim() === '') {
					return false;
				}
				try {
					return btoa(atob(str)) == str;
				} catch (err) {
					return false;
				}
			},

			//----------------------判断是否为数字-----------------------
			judgeNum: function(val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if (regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #F5F9FA;
	}

	.content {}

	.backImg {
		width: 100%;
		height: 510upx;
		position: relative;  
		z-index: 1;  
		overflow: hidden;
	}
	
	.backImg::after{
		/* 以下不允许修改 */
		width: 120%;
		height: 490upx;
		border-radius: 0 0 50% 50%;
		position: absolute;
		left:-10%;
		z-index: -1;  
		content: '';
	}

	.imgClass {
		//背景图片
		width: 100%;
		height: 490upx;
	}

	.setClass {
		//设置按钮
		width: 47upx;
		height: 45upx;
		position: absolute;
		left: 4.67%;
		top: 80upx;
	}

	.scanClass {
		//扫一扫按钮
		width: 44upx;
		height: 41upx;
		position: absolute;
		left: 86.8%;
		top: 80upx;
	}

	.infoClass {
		//消息按钮
		width: 47upx;
		height: 42upx;
		position: absolute;
		//left: 87.73%;
		left: 20%;
		top: 80upx;
	}

	.userInfoClass {
		//包括头像昵称
		position: absolute;
		left: 4.53%;
		top: 161upx;
		height: 127upx;
		width: 68.4%;
		// background-color: #06B4FD;
		display: flex;
		flex-direction: row;
		z-index:999;
	}

	.portraitClass {
		//头像
		border-radius: 50%;
		width: 127upx;
		height: 127upx;
	}

	.usernameClass {
		//昵称
		font-size: 42upx;
		color: #FFFFFF;
		margin-top: 17upx;
		margin-left: 3%;
		width: 350upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		// border: 1upx solid #007AFF;
	}

	.grzyClass {
		//个人主页
		width: 20%;
		height: 34upx;
		position: absolute;
		left: 75.47%;
		top: 200upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 27upx;
		z-index:999;
	}

	.rightClass {
		width: 10%;
		height: 29upx;
		position: absolute;
		left: 82%;
		/* #ifdef APP-PLUS */
		top: -3upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: -1upx;
		/* #endif */
	}

	.userTypeBox{
		display: flex;
		align-items: center;
		margin-top: 10upx;
	}

	// .iconClass{
	// 	width: 20upx;
	// 	height: 18upx;
	// 	padding: 12upx;
	// 	border-top-left-radius: 8upx;
	// 	border-bottom-left-radius: 8upx;
	// }
	
	.typeBox {
		//普通用户
		font-size: 21upx;
		color: #FFFFFF;
		line-height: 42upx;
		padding-right:15upx;
		border-radius:8upx;
		padding: 0 20upx;
		// border-top-right-radius: 8upx;
		// border-bottom-right-radius: 8upx;
	}

	.imgTubiao {
		width: 15%;
		height: 21upx;
		position: absolute;
		left: 9upx;
		top: 10upx;
	}

	.fontClass {
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 42upx;
		height: 42upx;
		position: absolute;
		left: 34upx;
		top: 1upx;
		/* #ifdef H5 */
		top: -3upx;
		/* #endif */
		/* #ifndef H5 */
		top: 1upx;
		/* #endif */
	}

	.editClass {
		//修改按钮
		width: 40upx;
		height: 40upx;
		margin-left: 17upx;
		margin-top: 25upx;
	}

	.myBox {
		//包括我的收藏，我的订单，我的历史
		width: 91.47%;
		height: 170upx;
		position: absolute;
		left: 4.27%;
		top: 341upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-radius: 12upx;
		z-index:999;
	}

	.collection {
		//我的收藏
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.imgStyle1 {
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}

	.order {
		//我的订单
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.imgStyle2 {
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}

	.history {
		//我的历史
		width: 33.34%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.imgStyle3 {
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}

	.myFont {
		//文字的样式
		color: #2C2D2D;
		height: 27upx;
		line-height: 27upx;
		font-size: 28upx;
		font-family: SourceHanSansSC-Regular;
		margin-top: 22upx;
		text-align: center;
	}

	.advertClass {
		//广告
		width: 91.47%;
		height: 160upx;
		margin-top: 25upx;
		margin-left: 4.27%;
		border-radius: 12upx;
	}

	.serviceBox {
		//更多服务
		width: 91.47%;
		padding-bottom: 10upx;
		//height: 510upx;
		//height: 390upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		margin-top: 25upx;
		margin-left: 4.27%;
		display: flex;
		flex-direction: column; //column:纵向排列，row横向排列
		margin-bottom: 30upx;
	}

	.lineClass {
		//更多服务下面的分隔线
		border-top: 2upx solid #EAEAEA;
		width: 90%;
		margin: 30upx 5% 20upx 5%;
	}

	.moreClass {
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
		margin-top: 34upx;
		margin-left: 3.55%;
	}

	.boxClass {
		width: 100%;
		// border: 1upx solid red;
		display: flex;
		flex-direction: row; //column:纵向排列，row横向排列
	}

	.itemClass {
		// border: 1upx solid black;
		display: flex;
		flex-direction: column; //column:纵向排列，row横向排列
		padding-bottom: 30upx;
	}

	//图标样式开始
	//第一排
	.XXGLicon{
		width: 50upx;
		height: 54upx;
		padding: 30upx 60upx 16upx 60upx;
	}
	
	.ZDPZicon{
		width: 48upx;
		height: 50upx;
		padding: 30upx 61upx 20upx 61upx;
	}
	
	.WDTSicon{
		width: 42upx;
		height: 50upx;
		padding: 30upx 64upx 20upx 64upx;
	}
	
	.JJLXRicon{
		width: 45upx;
		height: 50upx;
		padding: 30upx 62upx 20upx 63upx;
	}
	
	//第二排
	.SMRZicon{
		width: 44upx;
		height: 50upx;
		padding: 30upx 63upx 20upx 63upx;
	}
	
	.GHSJHicon{
		width: 38upx;
		height: 50upx;
		padding: 30upx 66upx 20upx 66upx;
	}
	
	.DHKFicon{
		width: 41upx;
		height: 50upx;
		padding: 30upx 64upx 20upx 65upx;
	}
	
	.YJFKicon{
		width: 41upx;
		height: 50upx;
		padding: 30upx 64upx 20upx 65upx;
	}   
	
	//第三排
	.QQKFicon{
		width: 43upx;
		height: 50upx;
		padding: 30upx 63upx 20upx 64upx;
	}
	
	.ZXKFicon{
		width: 45upx;
		height: 50upx;
		padding: 30upx 62upx 20upx 63upx;
	}
	
	//图标样式结束
	
	.btnClass {
		width: 11upx;
		height: 22upx;
		position: absolute;
		left: 610upx;
		top: 43upx;
	}

	.fontStyle {
		font-size: 28upx;
		color: #2C2D2D;
		width: 100%;
		text-align: center;
	}

	.borderTop {
		border-top: 1upx solid #EAEAEA;
	}

	.mb {
		margin-bottom: 10upx;
	}

	//弹窗
	.popup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
	}

	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 520upx;
		height: 400upx;
		margin-left: -270upx;
		margin-top: -270upx;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 20upx;
	}

	.popup_title {
		padding-top: 20upx;
		width: 480upx;
		text-align: center;
		font-size: 32upx;
	}

	.popup_textarea_item {
		padding-top: 5upx;
		height: 240upx;
		width: 440upx;
		// background-color: #F1F1F1;
		margin-top: 30upx;
		margin-left: 20upx;
	}

	.popup_textarea {
		width: 410upx;
		font-size: 26upx;
		margin-left: 20upx;
	}

	.popup_button {
		color: white;
		background-color: #4399FC;
		border-radius: 20upx;
		margin-top: 83upx;
		margin-left: 5%;
	}

	.inputClass {
		height: 40upx;
		line-height: 40upx;
		font-size: 32upx;
		margin-top: 50upx;
		margin-left: 8%;
	}

	.contactClass {
		position: absolute;
		width: 100%;
		height: 140upx;
		opacity: 0;
	}

	// .contactClass::after{
	// 	border: none; 
	// }
</style>
