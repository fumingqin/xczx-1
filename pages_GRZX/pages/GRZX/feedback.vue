<template>
	<view>
	<form @submit="formSubmit" >
		<view class="fb_view">
			<text class="fb_Text">意见反馈</text>
			<textarea class="fb_Textarea" placeholder-style="#AAAAAA" placeholder="您的宝贵意见将会让我们提供更好的服务质量" maxlength="500" v-model="ideaContent" @input="descInput" />
			<view class="fb_words">{{remnant}}/500字</view>
		</view>
		<view class="fb_view2">
			<text class="fb_Text2">上传图片</text>
			<view class="scClass">
				<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage" :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel" :enable-add="enableAdd"></robby-image-upload>
			</view>
		</view>
		<view class="fb_view3">
			<button class="fb_btn btn_background btn_fontColor" form-type="submit">提交</button>
		</view>
		</form>
	</view>
</template>

<script>
	import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload.vue'
	export default {
		components: {
			robbyImageUpload,
		},
		data() {
			return {
			remnant:0,
			nickid:'',
			ideaContent:'',
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
			detailInfo : {//详细信息
				imageData : [],//图像日期	
			}
			}
		},
		onShow() {
			this.getLogin();
		},
		methods: {
			getLogin:function(){
					var that=this;
					uni.getStorage({
						key: 'userInfo',
						fail() {
							uni.showToast({
								icon: 'none',
								title: '未登录无法进行反馈,请先登录'
							})
							//#ifdef APP-PLUS
							setTimeout(function() {
								uni.navigateTo({
									//loginType=1,泉运登录界面
									//loginType=2,今点通登录界面
									//loginType=3,武夷股份登录界面
									url: '../../../pages/GRZX/userLogin?loginType=1'
								})
							}, 500);
							// #endif
							//#ifdef MP-WEIXIN
							uni.navigateTo({
								url:'/pages/Home/wxAuthorize',
							})
							// #endif
						},
					})
				
			},
			//字数
			descInput: function(e) {
			// console.log(e)
			this.remnant = e.detail.cursor;	
			},
			deleteImage: function(e){
				// console.log(e)
			},
			addImage: function(e){
				// console.log(e)
			},
			formSubmit: function(e) {
				uni.showLoading({
					title:'提交意见反馈中...'
				})
				if(this.remnant==0){
					uni.hideLoading()
					uni.showModal({
						content:'请填写具体内容',
						showCancel:false
					})
				}else{
					var that=this;
					uni.getStorage({
						key:'userInfo',
						success: (res) => {
							console.log(res)
							uni.request({
								// url:'https://zntc.145u.net:9099/api/person/addSuggestion',
								url:that.$GrzxInter.Interface.AddSuggestion.value,
								method:that.$GrzxInter.Interface.AddSuggestion.method,
								data:{
									userId:res.data.userId,
									suggestion:that.ideaContent,
								},
								success: (res) => {
									console.log(res)
									if(res.data.msg=='建议提交成功'){
										uni.hideLoading()
										uni.showToast({
											title:'反馈成功'
										})
										setTimeout(function(){
											uni.navigateBack();
										},500);
									}else if(res.data.msg=='提交失败2分钟内请勿重复发表'){
										uni.hideLoading()
										uni.showToast({
											icon:'none',
											title:'2分钟内请勿重复发表'
										})
										setTimeout(function(){
											uni.navigateBack();
										},800);
										}else{
										uni.hideLoading()
										uni.showToast({
											title:'反馈失败'
										})
									}
								},
								fail: (res) => {
									console.log(res)
									uni.hideLoading()
									uni.showToast({
										title:'反馈失败'
									})
								}
							})
						},
						fail() {
							uni.showToast({
								icon:'none',
								title:'暂未登录,请登录后查看'
							})
							uni.stopPullDownRefresh();
							//#ifdef APP-PLUS
							setTimeout(function(){
								uni.navigateTo({	
									//loginType=1,泉运登录界面
									//loginType=2,今点通登录界面
									//loginType=3,武夷股份登录界面
									url  : '/pages/GRZX/userLogin?loginType=1'
								}) 
							},500);
							//#endif
							//#ifdef MP-WEIXIN
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/Home/wxAuthorize',
								})
							},1500);
							// #endif
						}
					})
					
				}			   
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}	

	// 投诉内容
		.fb_view {
			width:750upx;
			height:396upx;
			background: #FFFFFF;
			border-bottom: 1px #F5F5F5 dotted;

			.fb_Text {
				font-weight: bold;
				font-size: 30upx;
				position: absolute;
				left: 34upx;
				top: 56upx;
			}

			.fb_Textarea {
				font-size: 30upx;
				height: 100px; 
				position: absolute;
				left: 33upx;
				top: 125upx;
			}

			.fb_words {
				font-size: 24upx;
				color: #AAAAAA;
				position: absolute;
				left: 620upx;
				top: 346upx;
			}
		}
		.fb_view2{
			width:750upx;
			height:328upx;
			background: #FFFFFF;
			margin-top: 20upx;
			.fb_Text2 {
				font-weight: bold;
				font-size: 30upx;
				position: absolute;
				left: 34upx;
				top: 476upx;
			}
			.scClass{
				position: absolute;
				left: 31upx;
				top: 545upx;
			}
		}
		.fb_view3{
			width:94%;
			// margin-top: 30upx;
			// margin-left: 50upx;
			position: fixed;
			bottom: 40upx;
			left: 3%;
			.fb_btn{
				border-radius:30px;
				// background: #FC4646;
				// color: #FFFFFF;
			}
		}
</style>
