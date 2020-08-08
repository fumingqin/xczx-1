<template>
	<view>
		<form @submit="formSubmit">
			<view class="cc_content" v-if="or_entrance==0">
				<text class="ct_text1">投诉对象</text>
				<text class="ct_text2">{{or_class}}</text>
				<text class="ct_text1">投诉人</text>
				<text class="ct_text2">{{or_name}}</text>
			</view>
			<view class="complaintDX" v-if="or_entrance==1">
				<text class="tsdxText">投诉对象</text>
				<picker @change="godetail" :value="index" :range="complaintList3.txt">
					<text class="tsnrText">{{complaintList3.txt[index]}}<text class="jdticon icon-xia"></text></text>
				</picker>
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
			
			<view class="cl_bottom"></view>
			<button class="tjButton" type="primary" :color="'#2b9df2'" form-type="submit" >提交</button>
		</form>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				index:0,
				b:'本人于 #填写时间  在#填写事发地详细地址# 发生 了 #描述投诉原因# ， 本人希望 #填写您的述求， 如退票#',
				remnant: 0,//字数
				or_entrance:'',//入口状态参数
				userId:'',//投诉人id
				or_complainant:'',//投诉人
				or_telephone:'',//投诉人电话
				or_class:'',//投诉模块名
				or_name:'',//投诉对象
				or_nameId:'',//投诉对象id
				or_phoneNumber:'',//投诉对象手机号
				a:'',//投诉原因
				complaintObject:'',//投诉对象
				userInfo:[],//个人信息
				or_content:'',
				
				detailInfo : {
					a:'',//投诉原因
					complaintObject:'',//投诉对象
					
				},
				complaintList3 : {//详细信息
					txt:'',
				},
			}
		},
		onLoad(param) {
			var that=this;
			that.or_entrance = param.or_entrance;
			that.or_class = param.or_class;
			that.or_name = param.or_name;
			that.or_nameId = param.or_nameId;
			that.or_phoneNumber = param.or_phoneNumber;
			that.routeInit();
			//读取个人信息缓存数据
			uni.getStorage({
				key: 'userInfo',
				success: function(data) {
					// console.log(data)
					that.userInfo = data.data;
					that.userId=that.userInfo.userId;
					that.or_complainant=that.userInfo.nickname;
					that.or_telephone=that.userInfo.phoneNumber;
					// console.log(that.or_telephone)
				},
				fail:function(){
					// #ifdef H5
					uni.showToast({
						title: '请允许授权给公众号，即将为您返回主页！',
						icon:'none'
					})
					uni.switchTab({
						url:'../../../../pages/Home/Index'
					})
					// #endif
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '请允许授权给小程序，即将跳转登录！',
						icon:'none'
					})
					uni.navigateTo({
						url:'../../../../pages/Home/wxAuthorize'
					})
					// #endif
					// #ifdef APP-NVUE
					uni.showToast({
						title: '未登录账号，即将跳转登录！',
						icon:'none'
					})
					uni.navigateTo({
						url:'../../../../pages/GRZX/userLogin?loginType=1&&urlData=2'
					})
					// #endif
				}
			})
		},
		
		// onShow() {
		// 	this.formSubmit();
		// },
		
		methods: {
			//-----------------读取静态数据json.js-------------------------------
			async routeInit() {
				let complaintList3 = await this.$api.lyfwcwd('complaintList3');
				this.complaintList3 = complaintList3.data;
			},
			//-------------------------字数-------------------------------
			descInput: function(e) {
				// console.log(e)
				this.remnant = e.detail.value.length;
			},
			//--------------------复制------------------------------------
			paste:function(){
				this.detailInfo.a=this.b;
				this.remnant=this.b.length;
			},
			
			//----------------------投诉对象内容点击--------------------------------------
			godetail:function(e){
				console.log(e)
				if(this.complaintList3.txt[e.detail.value]=='请选择'){
					uni.showToast({
						title:'请选择对象',
						icon:'none'
					})
				}else if(this.complaintList3.txt[e.detail.value]!=='请选择'){
					this.index = e.detail.value;
					this.detailInfo.complaintObject = this.complaintList3.txt[e.detail.value];
				}
			},
			
			//-----------------------------投诉提交----------------------------------------
			formSubmit:function(e){
				var that = this;
				uni.showLoading({
					title:'提交投诉中...'
				})
				if(this.or_entrance==1){
					if(that.detailInfo.complaintObject==''){
						uni.showToast({
							title:'请选择对象',
							icon: 'none',
						})
					}else if(that.remnant==0){
						if(that.or_content==''){
							uni.showToast({
								title:'请输入投诉原因',
								icon: 'none',
							})
						}
					}else if(that.remnant!==0){
						// console.log(that.detailInfo.a)
						// console.log(that.userId)
						// console.log(that.or_telephone)
						// console.log(that.or_entrance)
						// console.log(that.or_nameId)
						// console.log(that.or_name)
						// console.log(that.detailInfo.complaintObject)
						// console.log(that.or_complainant)
						// console.log(that.or_class)
						uni.request({
							url:$lyfw.Interface.GRZX_complaint.value,
							method:$lyfw.Interface.GRZX_complaint.method,
							header: {'content-type': 'application/json'},
							data:{
								or_class:that.or_class,
								or_complainant:that.or_complainant,
								or_complaintObject:that.detailInfo.complaintObject,
								or_content:that.detailInfo.a,
								or_name:that.or_name,
								or_nameId:that.or_nameId,
								or_phoneNumber : that.or_phoneNumber,
								or_entrance:that.or_entrance,
								or_telephone:that.or_telephone,
								userId:that.userId,
							},
							success: (res) => {
								console.log(res)
								if(res.data.status== true){
									uni.hideLoading()
									uni.showToast({
										title:'投诉成功',
										icon: 'none',
									})
									if(that.or_content==''){
										setTimeout(function(){
											uni.navigateBack();
										},2000);
									}else if(that.or_content!==''){
										setTimeout(function(){
											uni.navigateBack({
												delta: 2,
											});
										},2000);
									}
								}else if(res.data.status== false ){
									uni.hideLoading()
									uni.showToast({
										title:'2分钟内请勿重复发表投诉',
										icon: 'none',
									})
								}
							},
							fail:function(){
								uni.hideLoading()
								uni.showToast({
									title:'投诉失败',
									icon:'none'
								})
							},
						})
					}
				}else if(this.or_entrance==0){
					if(that.remnant==0){
						if(that.or_content==''){
							uni.showToast({
								title:'请输入投诉原因',
								icon: 'none',
							})
						}
					}else if(that.remnant!==0){
						// console.log(that.detailInfo.a)
						// console.log(that.userId)
						// console.log(that.or_telephone)
						// console.log(that.or_entrance)
						// console.log(that.or_nameId)
						// console.log(that.or_name)
						// console.log(that.detailInfo.complaintObject)
						// console.log(that.or_complainant)
						// console.log(that.or_class)
						uni.request({
							url:$lyfw.Interface.GRZX_complaint.value,
							method:$lyfw.Interface.GRZX_complaint.method,
							header: {'content-type': 'application/json'},
							data:{
								or_class:that.or_class,
								or_complainant:that.or_complainant,
								or_complaintObject:that.detailInfo.complaintObject,
								or_content:that.detailInfo.a,
								or_name:that.or_name,
								or_nameId:that.or_nameId,
								or_entrance:that.or_entrance,
								or_telephone:that.or_telephone,
								userId:that.userId,
							},
							success: (res) => {
								console.log(res)
								if(res.data.status== true){
									uni.hideLoading()
									uni.showToast({
										title:'投诉成功',
										icon: 'none',
									})
									if(that.or_content==''){
										setTimeout(function(){
											uni.navigateBack();
										},2000);
									}else if(that.or_content!==''){
										setTimeout(function(){
											uni.navigateBack({
												delta: 2,
											});
										},2000);
									}
								}else if(res.data.status== false ){
									uni.hideLoading()
									uni.showToast({
										title:'2分钟内请勿重复发表投诉',
										icon: 'none',
									})
								}
							},
							fail:function(){
								uni.hideLoading()
								uni.showToast({
									title:'投诉失败',
									icon:'none'
								})
							},
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	
	.cc_content{
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-bottom: 20upx;
		padding-left: 30upx;
		padding-right: 30upx;
		
		.ct_text1{
			display: flex;
			font-weight: bold;
			font-size: 32upx;
			padding-top: 30upx;
		}
		
		.ct_text2{
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 31upx;
			display: block;
			color: #666;
			border-bottom: 1px #F5F5F5 dotted;
		}
	}
	
	// 投诉对象样式
	.complaintDX {
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-bottom: 20upx;
		padding-top: 30upx;
		padding-left: 30upx;
		padding-right: 30upx;
	
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
	
	// 内容
	.content {
		margin: 0 0 24upx 0;
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
	
	//底部多余
	.cl_bottom{
		width: 100%;
		height: 150upx;
	}
	
	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		// padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
