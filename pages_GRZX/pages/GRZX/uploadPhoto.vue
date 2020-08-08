<template>
	<view class="content">
		
		<!-- 上传身份证正面 -->
		<view class="boxClass heightClass mt" @click="chooseFrontImg">
			<view v-if="state1==0" class="flexDirection">
				<image src="../../../static/GRZX/addImg.png" class="addClass"></image>
				<text class="textClass">点击上传证件的正面(带头像)</text>
			</view>
			<view v-if="state1==1" style="width: 100%;height: 100%;">
				<image :src="front" style="width: 100%;height: 100%;" name="front" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 上传身份证背面 -->
		<view class="boxClass heightClass" @click="chooseBackImg">
			<view v-if="state2==0" class="flexDirection">
				<image src="../../../static/GRZX/addImg.png" class="addClass"></image>
				<text class="textClass">点击上传证件的背面(带国徽)</text>
			</view>
			<view v-if="state2==1" style="width: 100%;height: 100%;">
				<image :src="back" style="width: 100%;height: 100%;" name="back" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 上传手持身份证照 -->
		<view class="boxClass heightClass mb" @click="chooseHandImg">
			<view v-if="state3==0" class="flexDirection">
				<image src="../../../static/GRZX/addImg.png" class="addClass"></image>
				<text class="textClass">点击上传手持身份证照</text>
			</view>
			<view v-if="state3==1" style="width: 100%;height: 100%;">
				<image :src="hand" style="width: 100%;height: 100%;" name="hand" mode="aspectFit"></image>
			</view>
		</view>
		
		<view class="topClass">
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<view class="titleClass">上传照片</view>
		</view>
		<!-- 提交按钮 -->
		<view class="bottomClass">
			<button class="btnClass btn_background btn_fontColor" @click="submitClick">提交</button>
		</view>
		
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data(){	
			return{			
				name:'',
				codeNum:'',
				validityTerm:'请选择 >',
				frontImg:'',
				backImg:'',
				handImg:'',
				state1:0,
				state2:0,
				state3:0,
				front:'',
				back:'',
				hand:'',
				userInfo:[],
			}	
		},
		onLoad (){
			this.loadUserInfo();
		},
		methods:{
			//--------------------加载用户信息-------------------
			loadUserInfo:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.userInfo=res.data;	
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			
			//--------------------返回-------------------
			returnClick:function(){
				uni.navigateBack();
			},
			
			//--------------------提交-------------------
			submitClick:function(){
				var that=this;
				if(that.frontImg==""){
					uni.showToast({
						title:'请上传证件的正面',
						icon:'none',
					})
				}else if(that.backImg==""){
					uni.showToast({
						title:'请上传证件的背面',
						icon:'none',
					})
				}else if(that.handImg==""){
					uni.showToast({
						title:'请上传手持身份证照',
						icon:'none',
					})
				}else{
					uni.showLoading({
						title:'上传中...'
					})
					//that.UpdateRealNamePhoto();
				}
			},
			
			//--------------------自行车用户上传实名认证照片-------------------
			UpdateRealNamePhoto:function(){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.UpdateRealNamePhoto.value,
					data:{
						userID:that.userInfo.userId,//用户id
						Positive:that.frontImg,
						Back:that.backImg,
						Handheld:that.handImg,
					},
					method:that.$GrzxInter.Interface.UpdateRealNamePhoto.method,
					success(res) {
						console.log(res)
						uni.showToast({
							title:'上传成功',
							icon:'success',
						})
						setTimeout(function(){
							uni.navigateBack();
						},500);
					},
					fail(){
						uni.showToast({
							title:'上传失败',
							icon:'none',
						})
					}
				})
			},
			
			//--------------------上传身份证正面-------------------
			chooseFrontImg:function(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var size=1.5*1024*1000;
						if(res.tempFiles[0].size>size){
							uni.showToast({
								title:'图片大小建议不要超过 1.5M',
								icon:'none',
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.state1=1;
							 that.front=res1.savedFilePath;
							 console.log(that.front)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.frontImg=base64;
							 })
						  }
						}); 
					}
				})	
			},
			
			//--------------------上传身份证背面-------------------
			chooseBackImg:function(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var size=1.5*1024*1000;
						if(res.tempFiles[0].size>size){
							uni.showToast({
								title:'图片大小建议不要超过 1.5M',
								icon:'none',
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.state2=1;
							 that.back=res1.savedFilePath;
							 console.log(that.back)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.backImg=base64;
							 })
						  }
						}); 
					}
				})
			},
			
			//--------------------上传手持身份证照-------------------
			chooseHandImg:function(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var size=1.5*1024*1000;
						if(res.tempFiles[0].size>size){
							uni.showToast({
								title:'图片大小建议不要超过 1.5M',
								icon:'none',
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.state3=1;
							 that.hand=res1.savedFilePath;
							 console.log(that.hand)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.handImg=base64;
							 })
						  }
						}); 
					}
				})
			},
		}	
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8; //页面背景色
	}
	.content { 
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	//每行的样式
	.boxClass{
		width: 90%;
		margin-top: 20upx;
		margin-left: 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		flex-direction: row;//column：纵向排列 row：横向排列
	}
	.flexDirection{
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	//姓名，身份证号，有效期
	.fontClass{
		color: #2C2D2D;
		font-size: 30upx;
		padding: 35upx 2% 35upx 5%;
		width: 30%;
	}
	//输入框的样式
	.inputClass{
		width: 70%;
		font-size: 32upx;
		padding: 35upx 5% 35upx 5%;
		text-align: right;
	}
	//上传照片的高度
	.heightClass{
		height: 400upx;
	}
	//添加图片
	.addClass{	
		width: 150upx;
		height: 150upx;
		margin-left: 40%;
		margin-top: 90upx;
	}
	.textClass{
		font-size: 32upx;
		margin-top: 25upx;
		color:#cdcdcd;
		width: 100%;
		text-align: center;
	}
	//距离底部的高度
	.mb{
		margin-bottom: 150upx;
	}
	.mt{
		margin-top: 195upx;
	}
	.bottomClass{
		background-color: #F8F8F8;
		width: 100%;
		position: fixed;
		bottom: 0upx;
		height: 120upx;
	}
	//按钮的样式	
	.btnClass{
		width: 90%;
		position: absolute;
		top: 10upx;
		left: 5%;
	}
	
	//返回按钮
	.returnClass{
		width: 25upx;
		height: 40upx;
		position: absolute;
		/* #ifdef H5 */
		top: 30upx;
		/* #endif */
		/* #ifndef H5 */
		top: 100upx;
		/* #endif */
		left: 25upx;
	}
	.topClass{   //顶部
		position: fixed;
		top: 0upx;
		width: 100%;
		/* #ifndef H5 */
		height: 170upx;
		/* #endif */
		/* #ifdef H5 */
		height: 100upx;
		/* #endif */
		border-bottom: 1upx solid #F5F5F5;
		background-color: #FFFFFF;
	}
	.titleClass{
		// margin-left: 20upx;
		width: 100%;
		text-align: center;
		font-size: 38upx;
		/*font-weight: bold; */
		/* #ifdef H5 */
		margin-top: 20upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 95upx;
		/* #endif */
	}
</style>
