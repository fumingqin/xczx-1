<template>
	<view>
		<form @submit="formSubmit" >
			<!-- 选择地址 -->
			<view class="selectAddress">
				<!-- 选择市区 -->
				<view class="choiceSQ">
					<text class="sfdText">模块</text>
					<!-- <pickerAddress class="regionSelector" @change="change" v-model="detailInfo.txt">{{detailInfo.txt}}<text class="jdticon icon-xia"></text></pickerAddress> -->
					<view>
						<text class="regionSelector">{{detailInfo.tsTitle}}</text>
					</view>
				</view>
				<!-- 投诉对象 -->
				<view class="complaintDX">
					<text class="tsdxText">投诉对象</text>
					<view>
						<text class="tsnrText">{{detailInfo.tsDate}}</text>
					</view>
				</view>
			</view>

			<!-- 内容 -->
			<view class="content">
				<!-- 投诉原因 -->
				<view class="ComplaintYY">
					<text class="yyText">投诉原因</text>
					<textarea class="yyTitle" placeholder-style="#AAAAAA" placeholder="描述详尽助于提升处理速度" maxlength="500" @input="descInput"
					 v-model="detailInfo.a" style="width: 295px;height: 100px;" />
					<view class="num">{{remnant}}/500字</view>
				</view>
				<!-- 原因范本 -->
				<view class="reasonFB">
					<text class="fbText">原因范本</text>
					<text class="tiemBtn" @click="paste">复制</text>
					<view class="fbTitle" v-model="b" style="width: 295px;height: 71px;color: #AAAAAA;">{{b}}</view>
				</view>
			</view>
			
			<!-- 上传证据 -->
<!-- 			<view class="uploadEvidence">
				<text class="zjText">上传证据</text>
				<view class="scClass">
					<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage" :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel" :enable-add="enableAdd"></robby-image-upload>
				</view>
			</view> -->
			
			<!-- 联系信息 -->
			<view class="contactInformation">
				<view class="lxClass">
					<text class="lxText">投诉人&nbsp;(加密保护)</text>
					<input class="lxTitle" name="nickName" placeholder-style="#AAAAAA" placeholder="请输入" v-model="detailInfo.nickname" adjust-position="" />
				</view>
<!-- 				<view class="dhClass">
					<text class="dhText">联系电话&nbsp;(加密保护)</text>
					<input class="dhTitle" name="mobile" placeholder-style="#AAAAAA" placeholder="请输入" v-model="detailInfo.mobile" adjust-position="" />
				</view> -->
				<button class="tjButton" type="primary" :color="'#2b9df2'" form-type="submit" >提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	// import pickerAddress from '@/pages_GRZX/components/GRZX/wangding-pickerAddress/wangding-pickerAddress.vue'
	// import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload.vue'
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		// components: {
		// 	pickerAddress,
		// 	robbyImageUpload,
		// },

		data() {
			return {
				enableDel : true,//是否启动del
				enableAdd : true,//是否启动删除
				enableDrag : false,//是否启动拖动
				show: true,//是否显示
				
				serverUrl: 'http://localhost:2000/work/uploadWorkPicture',//模拟服务器地址
				serverUrlDeleteImage: 'http://localhost:2000/work/deleteWorkPicture',//模拟服务器删除
				formData: {//表格数据
					userId: 2
				},
				imagelist:[],//图像列表框
				index: 0,//指数
				remnant: 0,//字数
				b:'本人于 #填写时间  在#填写事发地详细地址# 发生 了 #描述投诉原因# ， 本人希望 #填写您的述求， 如退票#',
				complaint: [], //投诉对象
				detailInfo : {//详细信息
					tsTitle : '',
					tsDate: '',
					nickname : '',//用户姓名
					userId:'',
					orderNumber:'',//订单编号
					// mobile : '',//用户电话
					// txt: '请选择',//事件选择
					// complaintObject : '',//投诉
					a:'',//投诉原因
					// imageData : [],//图像日期
				}
			}
		},
		
		// onNavigationBarButtonTap : function() {
		// 	 uni.showModal({
		// 		 content: '表单数据内容：' + JSON.stringify(this.detailInfo),
		// 		 showCancel: false
		// 	 });
		// 	 uni.setStorage({
		// 	 	key:"userInfo",
		// 	 	data:this.detailInfo
		// 	 })
		// },
		
		// 返回数据
		onLoad:function(options) {
			this.detailInfo.tsTitle = options.tsTitle;
			this.detailInfo.tsDate = options.tsData;
			this.detailInfo.orderNumber = options.orderNumber;
			// this.routeInit();
			this.loadUserInfo();
			
		},
		methods: {
			
			//模拟接口拿值
			async loadUserInfo(){
				var theself=this;
				uni.getStorage({
					key: 'userInfo',			
					success: function (res) {
						theself.detailInfo.nickname = res.data.nickname; 
						theself.detailInfo.userId = res.data.userId;
						theself.detailInfo.mobile = res.data.mobile;
						// console.log(res)
					}
				});	
			},

			//投诉对象内容点击.
			godetail:function(e){
				this.index = e.target.value;
				this.detailInfo.complaintObject = this.complaint[e.target.value];
			},
		

			//加载事件组件
			change: function(data) {
				var a = data.data[0];
				var b = data.data[1];
				var c = data.data[2];
				var d = `${a} ${b} ${c}`;
				this.detailInfo.txt = d;
				// console.log(d)
			},

			//字数
			descInput: function(e) {
				this.remnant = e.detail.value.length;
			},

			//复制
			paste:function(){
				this.detailInfo.a=this.b;
				this.remnant=this.b.length;
			},
			
			deleteImage: function(e){
			},
			addImage: function(e){
				// console.log(e)
			},
			
			formSubmit: function(e) {
				uni.showLoading({
					title:'提交投诉中...'
				})
				
			    uni.request({
			    	url:$lyfw.Interface.person_addComplaint.value,
			    	method:$lyfw.Interface.person_addComplaint.method,
					data:{
						complaintContent : this.detailInfo.a,
						complainant : this.detailInfo.userId,
						beComplainant : this.detailInfo.tsDate,
						orderNumber: this.detailInfo.orderNumber,
						model : this.detailInfo.tsTitle,
					},
					success: (res) => {
							// console.log(res)
							if(this.remnant==0){
								uni.showToast({
									title:'请输入投诉内容',
									icon: 'none',
								})
							}else if(this.remnant!==0){
								if(res.data.status== true){
									uni.hideLoading()
									uni.showToast({
										title:'投诉成功',
										icon: 'none',
									})
									setTimeout(function(){
										uni.navigateBack();
									},2000);
								}else if(res.data.status== false ){
									uni.hideLoading()
									uni.showToast({
										title:'投诉失败',
										icon: 'none',
									})
								}
							}
					},
					fail:function(){
						uni.hideLoading()
						uni.showToast({
							title:'投诉失败',
							icon:'none'
						})
					}
			    })
			}
			
			//上传图片事件
			// upload:function(){

			// 	uni.chooseImage({
			// 		count:3,
			// 		sizeType:['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success:function(res){
			// 			let self = this;
			// 			console.log(JSON.stringify(res.tempFilePaths));
			// 		}
					
					
					
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	// 选择地址样式
	.selectAddress {
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;

		.choiceSQ {
			border-bottom: 1px #F5F5F5 dotted;

			.sfdText {
				font-weight: bold;
				font-size: 32upx;
			}

			.regionSelector {
				display: flex;
				padding-top: 40upx;
				font-size: 30upx;
				color: #333333;
				padding-bottom: 32upx;

				.jdticon {
					position: relative;
					top: 9upx;
					left: 20upx;
				}
			}

		}

		// 投诉对象样式
		.complaintDX {
			padding-top: 28upx;

			.tsdxText {
				font-weight: bold;
				font-size: 32upx;
			}

			.tsnrText {
				display: flex;
				padding-top: 40upx;
				font-size: 30upx;
				color: #333333;
				padding-bottom: 32upx;

				.jdticon {
					position: relative;
					top: 9upx;
					left: 20upx;
				}
			}
		}
	}

	// 内容
	.content {
		margin: 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;

		// 投诉内容
		.ComplaintYY {
			border-bottom: 1px #F5F5F5 dotted;

			.yyText {
				font-weight: bold;
				font-size: 32upx;
			}

			.yyTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}

			.num {
				text-align: right;
				font-size: 30upx;
				color: #AAAAAA;
				padding-bottom: 23upx;
			}
		}

		// 原因范本
		.reasonFB {
			position: relative;
			padding-top: 28upx;

			.fbText {
				font-weight: bold;
				font-size: 32upx;
			}
			
			.fbTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
			.tiemBtn{
				position: absolute;
				right: 6upx;
				font-size: 30upx;
				text-align: right;
				color: #47A5FC;
			}
		}
	}
	
	// 上传证据样式
	.uploadEvidence{
		margin: 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		padding-bottom: 43upx;
		background-color: #FFFFFF;
		.zjText{
			font-weight: bold;
			font-size: 32upx;
		}
		.scClass{
			padding-top: 40upx;
		}
	}
	
	//联系信息样式
	.contactInformation{
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		padding-bottom: 43upx;
		background-color: #FFFFFF;
		.lxClass{
			border-bottom: 1px #F5F5F5 dotted;
			.lxText{
				font-weight: bold;
				font-size: 32upx;
			}
			.lxTitle{
				padding-top: 41upx;
				font-size: 30upx;
				padding-bottom: 32upx;
			}
		}
		.dhClass{
			padding-top: 56upx;
			border-bottom: 1px #F5F5F5 dotted;
			.dhText{
				font-weight: bold;
				font-size: 32upx;
			}
			.dhTitle{
				padding-top: 41upx;
				font-size: 30upx;
				padding-bottom: 32upx;
			}
		}
		.tjButton{
			width: 90%;
			height: 104upx;
			font-size: 40upx;
			margin-top: 55upx;
			margin-bottom: 48upx;
			border-radius:30px;
			background-color: #007AFF;
			box-shadow:0 0 5px #06c;
		}
	}
</style>
