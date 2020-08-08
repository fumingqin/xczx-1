<template>
	<view class="content">
		<!-- 姓名 -->
		<view class="boxClass mt">
			<text class="fontClass">真实姓名</text>
			<input class="inputClass" name="name" placeholder="与证件姓名一致" v-model="name" @blur="nameBlur" />
		</view>
		
		<!-- 身份证号 -->
		<view class="boxClass">
			<text class="fontClass">身份证号</text>
			<input class="inputClass" type="idcard" maxlength="18" name="codeNum" placeholder="请保持与证件号码一致" v-model="codeNum" @blur="codeBlur" />
		</view>
		
		<!-- 有效期至 -->
		<!-- <view class="boxClass">
			<text class="fontClass">有效期至</text>
			<picker class="inputClass" name="validityTerm"  mode="date" @change="dateChange" v-model="validityTerm"  :start="startDate" :end="endDate" placeholder="请选择"  >
				{{validityTerm}}
			</picker>
		</view> -->
		
		<view class="textBox">温馨提醒：请确保姓名、身份证号与本人身份证真实信息一致，钱包资金管理审核将以此为审核依据。</view>
		<view class="textBox"></view>
		
		<view class="topClass">
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<view class="titleClass">实名认证</view>
		</view>
		<!-- 提交按钮 -->
		<view class="bottomClass">
			<button class="btnClass btn_background btn_fontColor" @click="submitClick">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				name:'',
				codeNum:'',
				//validityTerm:'请选择 >',
				userInfo:[],
				menuButtonHeight: '',
				menuButtonTop: '',
			}	
		},
		onLoad (){
			this.loadUserInfo();
			var that=this;
			// let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// that.menuButtonHeight = menuButtonInfo.height;
			// that.menuButtonTop = menuButtonInfo.top;
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
			
			//--------------------校验姓名-------------------
			nameBlur:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(e.detail.value.length>=2){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none'
					})
				}
			},
			
			//--------------------校验身份证号-------------------
			codeBlur:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkIDCard(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的身份证有误，请检查',
						icon:'none'
					})
				}
			},
			
			checkIDCard:function(idcode){
			    // 加权因子
			    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
			    // 校验码
			    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
			    var code = idcode + "";
			    var last = idcode[17];//最后一位
			    var seventeen = code.substring(0,17);
			    // 判断最后一位校验码是否正确
			    var arr = seventeen.split("");
			    var len = arr.length;
			    var num = 0;
			    for(var i = 0; i < len; i++){
			        num = num + arr[i] * weight_factor[i];
			    }
			    // 获取余数
			    var resisue = num%11;
			    var last_no = check_code[resisue];
				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			},
			
			//--------------------提交数据-------------------
			submitClick:function(){
				var that=this;
				if(that.name<2){
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none'
					})
				}else if(that.codeNum==""){
					uni.showToast({
						title:'请输入您的身份证号',
						icon:'none'
					})
				}else if(!that.checkIDCard(that.codeNum)){
					uni.showToast({
						title:'输入的身份证有误，请检查',
						icon:'none'
					})
				}else{
					console.log(that.name)
					console.log(that.codeNum)
					uni.showLoading({
						title:'实名中...'
					})
					// that.bikeUserVerified(that.name,that.codeNum)
				}
			},
			
			//--------------------自行车用户实名认证-------------------
			bikeUserVerified:function(name,codeNum){
				var that=this;
				console.log(that.userInfo.userId)
				console.log(that.userInfo.phoneNumber)
				console.log(codeNum)
				console.log(name)
				uni.request({
					url:that.$GrzxInter.Interface.UserVerified.value,
					data:{
						userID:that.userInfo.userId,//用户id
						phone:that.userInfo.phoneNumber,//手机号码
						userIDNumber:codeNum,//身份证号
						userName:name,//姓名
					},
					method:that.$GrzxInter.Interface.UserVerified.method,
					success(res) {
						console.log(res)
						uni.setStorageSync('RealNameInfo',res.data.data)
						// that.GetEnrollment(name,codeNum);
					},
					fail(){
						// that.GetEnrollment(name,codeNum);
						uni.showToast({
							title:'实名失败',
							icon:'none',
						})
					}
				})
			},
			
			//--------------------钱包注册新用户-------------------
			GetEnrollment:function(name,codeNum){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.GetEnrollment.value,
					data:{
						uuid:that.userInfo.userId,//用户id
						phoneNumber:that.userInfo.phoneNumber,//手机号码
						userId:codeNum,//身份证号
						userName:name,//姓名
					},
					method:that.$GrzxInter.Interface.GetEnrollment.method,
					success(res) {
						console.log(res)
						if(res.data.data.msg=='Success'){
							uni.showToast({
								title:'实名成功,请提交相关照片',
								icon:'none',
							})
							setTimeout(function(){
								uni.redirectTo({
									url:that.$GrzxInter.Route.uploadPhoto.url,
								})
							},500);
						}
					},
					fail(){
						uni.showToast({
							title:'实名失败',
							icon:'none',
						})
					}
				})
			},
			
			//--------------------有效期-------------------
			dateChange : function(e){
				this.validityTerm = e.detail.value;
			},
			
			//--------------------获得日期-------------------
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 10;
				} else if (type === 'end') {
					year = year + 60;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
	.mt{
		margin-top: 190upx;
	}
	.bottomClass{
		background-color: #F8F8F8;
		width: 100%;
		position: fixed;
		bottom: 40upx;
		height: 120upx;
	}
	//按钮的样式	
	.btnClass{
		width: 90%;
		position: absolute;
		top: 10upx;
		left: 5%;
	}
	.textBox{
		font-size: 30upx;
		width: 84%;
		margin-top: 35upx;
		margin-left: 8%;
		color: #ff0000;
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
