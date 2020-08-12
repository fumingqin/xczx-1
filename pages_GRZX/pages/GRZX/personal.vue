<template>
	<view class="Cr_background">
		<form @submit="formSubmit" >
			<!-- #ifdef H5 --> <!--公众号 头像，背景图 --> 
			<image v-if="backImg!=''" class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image>
			<view v-if="backImg==''" class="bg bc_GRZX" name="backImg"></view>
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait"></image>
			<!-- #endif -->
			
			<!-- #ifndef H5 -->  <!--除了公众号 头像，背景图 --> 
			<image v-if="backImg!=''" class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image>
			<view v-if="backImg==''" class="bg bc_GRZX" name="backImg"></view>
			
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait" @click="getPhoto"></image>
			<button class="xgbg"  plain="" @click="reviseBackground">修改背景</button>
			<!-- #endif -->
			
			<!-- 姓名 -->
			<view class="Cr_slk1">
				<text class="bz">姓&nbsp;名：</text>
				<input class="slk" maxlength="10"  name="nickname"  placeholder="请输入" v-model="nickname" adjust-position="" />
			</view>
			
			<!-- 性别 -->
			<view class="Cr_slk2">
				<text class="bz">性&nbsp;别：</text>
				<picker class="slk1" name="gender"  mode="selector" @change="genderChange" :range="genderSex" :value="gender">
					{{selector}}
				</picker>
			</view>
			
			<!-- 生日 -->
			<view class="Cr_slk2"> 
				<text class="bz">生&nbsp;日：</text>
				<picker class="slk1" name="birthday"  mode="date" @change="dateChange" v-model="birthday"  :start="startDate" :end="endDate" placeholder="请选择"  >
					{{birthday}}
				</picker>
			</view>
			
			<!-- 地址 -->
			<view class="Cr_slk2">
				<text class="bz">地&nbsp;址：</text>
				<input class="slk" name="address"  disabled="disabled" @tap="toggleTab"  placeholder="你的常住地" v-model="address" />
				<w-picker
					mode="region"
					:areaCode="['35', '3507', '350782']"
					:hideArea="false"
					@confirm="onConfirm" 
					ref="region"
					:timeout="true"
				></w-picker>
			</view>
			
			<!-- <view class="Cr_slk2">
				<text class="bz">签&nbsp;名：</text>
				<input class="slk" name="autograph" placeholder="你想要说的话"  v-model="autograph" />
			</view> -->
			
			<!-- 保存按钮 -->
			<button class="an btn_background btn_fontColor" form-type="submit">保存</button>
		</form>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import wPicker from "@/pages_GRZX/components/GRZX/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				mode:"region",
				genderSex:['','男','女'], 
				selector:'请选择',
				/* 载入数据 */
				portrait : '',
				backImg:'',
				nickname : '',
				gender:'',
				birthday : '请选择',
				address : '请选择',
				autograph : '',
				userId:'',
				openId_qq:'',
				openId_wx:'',
				openId_xcx:'',
				openId_ios:'',
				openId_app:'',
				phoneNumber:'',
				port:'',
				
			};
		},
		components:{
		            wPicker
		        },
		onLoad:function(){
			this.loadUserInfo();
		},
		computed:{
			startDate() {
			    return this.getDate('start');
			}, 
			endDate() {
			    return this.getDate('end');
			},
		},
		methods:{
			// --------------------------------------1.加载用户信息------------------------------------
			loadUserInfo(){
				uni.showLoading({
					title:'加载中...'
				})
				var that=this;
				uni.getStorage({
					key:'backUrl', //加载背景图
					success:function(res1){
						that.backImg=res1.data;
					}
				})
				uni.getStorage({
					key:'userInfo',
					success(res){
						var phone=res.data.phoneNumber;
						if(phone!=""&&phone!=null&&res.data!=""){
							uni.request({
								url:that.$GrzxInter.Interface.login.value,
								data:{
									phoneNumber:res.data.phoneNumber,
									systemname:that.$GrzxInter.systemConfig.appName,//应用名称
									openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
								},
								method:that.$GrzxInter.Interface.login.method,
								success(res1) {
									console.log(res1,"108")
									// ------------1.头像-------------
									var base64=res1.data.data.portrait;
									that.port=res1.data.data.portrait;
									if(that.isBase64(base64)){
										base64ToPath(base64)
										  .then(path => {
										    that.portrait=path;
										  })
										  .catch(error => {
										  })
									}else{
										that.portrait=base64;
									}
									// ------------2.昵称-------------
									if(res1.data.data.nickname==null||res1.data.data.nickname==""){
										that.nickname="";
									}else{
										that.nickname =res1.data.data.nickname;
									}
									// ------------3.性别-------------
									that.gender=res1.data.data.gender;
									if(res1.data.data.gender==null||res1.data.data.gender==""){
										that.selector="请选择";
									}else{
										that.selector=that.genderSex[res1.data.data.gender];
									}
									// ------------4.生日-------------
									if(res1.data.data.birthday==null||res1.data.data.birthday==""){
										that.birthday="请选择";
									}else{
										that.birthday =res1.data.data.birthday.substring(0,10);
									}
									// ------------5.地址-------------
									if(res1.data.data.address==null||res1.data.data.address==""){
										that.address="";
									}else{
										that.address =res1.data.data.address;
									}
									// ------------6.签名-------------
									if(res1.data.data.autograph==null||res1.data.data.autograph==""){
										that.autograph="";
									}else{
										that.autograph =res1.data.data.autograph;
									}
									// ------------7.用户Id-------------
									that.userId=res1.data.data.userId;
									// ------------8.openId_qq-------------
									that.openId_qq=res1.data.data.openId_qq;
									// ------------9.openId_wx-------------
									that.openId_wx=res1.data.data.openId_wx;
									// ------------10.openId_wx-------------
									that.openId_xcx=res1.data.data.openId_xcx;
									// ------------11.openId_ios-------------
									that.openId_ios=res1.data.data.openId_ios;
									// ------------12.openId_app-------------
									that.openId_app=res1.data.data.openId_app;
									// ------------13.手机号-------------
									that.phoneNumber=res1.data.data.phoneNumber;
									uni.hideLoading();
								}
							})
						}else{
							uni.showToast({
								title:'信息获取失败',
								icon:'none'
							})
						}
					}
				})	
			},
			
			// --------------------------------------2.性别------------------------------------
			genderChange : function(e){
				//console.log(e.detail.value,"sex")
				if(e.detail.value==0){
					this.selector="请选择";
				}else{
					this.selector =this.genderSex[e.detail.value]; 
				}
				this.gender=e.detail.value;
			},
			
			// --------------------------------------3.日期------------------------------------
			dateChange : function(e){
				this.birthday = e.detail.value;
			},
			
			// -----------------
			// --------------------------------------4.获得日期------------------------------------
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 0;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			// --------------------------------------5.地址切换------------------------------------
			toggleTab(e){
				this.$refs[this.mode].show(); 
			},
			onConfirm(e){
				this.address=e.result;
			},
			
			// --------------------------------------6.更换背景图------------------------------------
			reviseBackground(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
							tempFilePath: tempFilePaths[0],
							success: function (res1) {
								var savedFilePath = res1.savedFilePath;
								uni.setStorage({
									key:'backUrl',
									data:savedFilePath
								})
								uni.getStorage({
									key:'backUrl',
									success:function(res){
										that.backImg=res.data;
									}
								})
							}
						});
					}
				})
			},
			
			// --------------------------------------7.提交数据------------------------------------
			formSubmit: function(e) {
				uni.showLoading({
					title:'保存中...'
				})
				var that=this;
				if(that.selector=='男'){
					that.gender=1;
				}
				if(that.selector=='女'){
					that.gender=2;
				}
				if(that.nickname==""){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
				}else if(that.selector=='请选择'){
					uni.showToast({
						title:'请选择性别',
						icon:'none'
					})
				}else if(that.address==''){
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
				}else{
					console.log(that.gender)
					uni.request({
						url:that.$GrzxInter.Interface.changeInfo.value,
						data:{
							userId:that.userId,
							gender:that.gender,
							openId_qq:that.openId_qq,
							openId_wx:that.openId_wx,
							openId_xcx:that.openId_xcx,
							openId_app:that.openId_app,
							openId_ios:that.openId_ios,
							address:that.address,
							nickname:that.nickname,
							birthday:that.birthday,
							autograph:that.autograph,
							phoneNumber:that.phoneNumber,
							systemname:that.$GrzxInter.systemConfig.appName,//应用名称
							openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
						},
						method:that.$GrzxInter.Interface.changeInfo.method,
						success(res) {
							// console.log(res,"286")
							that.changePortrait();
						},
						fail() {
							uni.showToast({
								title:'网络连接失败',
								icon:'none'
							})
						}
					})
				}
			},
			
			// --------------------------------------8.修改头像------------------------------------
			changePortrait(){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.changeInfoPortrait.value,
					data:{
						portrait:that.port,
						userId:that.userId,
					},
					method:that.$GrzxInter.Interface.changeInfoPortrait.method,
					success(res1) {
						// console.log(res1,"290")
						uni.showToast({
							title:'信息保存成功！',
							icon:'success'
						})
						setTimeout(function(){
							uni.navigateBack();
						},500);
					},
					fail() {
						uni.showToast({
							title:'网络连接失败',
							icon:'none'
						})
					}
				})
			},
			
			// --------------------------------------9.获得头像------------------------------------
			getPhoto(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.portrait=res1.savedFilePath;
							 // console.log(that.portrait)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.port=base64;
							 })
						  }
						}); 
					}
				})	
			},
			
			// --------------------------------------9.判断是否为base64格式------------------------------------
			isBase64:function(str) {
			    if (str ==='' || str.trim() ===''){ return false; }
			    try {
			        return btoa(atob(str)) == str;
			    } catch (err) {
			        return false;
			    }
			},
	}
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 500upx;
			filter: blur(0.5px);
			// opacity: .7;
		}
		.tx{
			position: absolute;
			width: 200upx;
			height: 200upx; 
			left: 250upx;
			top: 52upx;
			border-radius: 50%;
			margin: 20upx;
		}
		.xgbg{
			position: absolute;
			width:220upx;
			font-size:32upx;
			left: 242upx;
			top: 294upx;
			margin: 20upx;
			border-radius: 40upx;
			line-height: 74upx;
			border-color: #FFFFFF;
			color: #FFFFFF;
		}
		.Cr_slk1{
			margin-top: -20upx;
		}
		.Cr_slk2{
			margin-top: -8upx;
		}
		.bz{
			position: relative;
			left: 36upx;
			top: 74upx;
			color: #AAAAAA;
		}
		.slk{
			position: relative;
			width: 90%;
			height: 104upx;
			left: 36upx;
			text-align: right;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.slk1{
			position: relative;
			width: 90%;
			height: 72upx;
			left: 36upx;
			text-align: right;
			padding-top: 24upx;
			padding-bottom: 4upx;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.an{
			width: 90%;
			height: 104upx;
			line-height: 104upx;
			font-size: 40upx;
			margin-top: 48upx; 
			margin-bottom: 48upx;
		}
		.addressClass{
			position: relative;
			width: 90%;
			height: 104upx;
			left: 36upx;
			text-align: right;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.txtClass{
			position: relative;
			top: 25rpx;
		}
	}

</style>