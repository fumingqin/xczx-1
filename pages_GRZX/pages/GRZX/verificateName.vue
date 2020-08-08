<template>
	<view class="content">
		<view class="itemClass bt">
			<view class="phoneClass1">姓名</view>
			<input placeholder="与证件姓名一致" class="phoneClass2" v-model="name" @blur="nameBlur"/>
		</view>
		<view class="itemClass">
			<view class="codeClass1">身份证号</view>
			<input type="idcard" placeholder="请保持与证件号码一致" maxlength="18" class="codeClass2" v-model="idCode" @blur="codeBlur"/>
		</view>
		<view class="btnClass btn_background btn_fontColor" @click="submitClick">验&nbsp;证</view>
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
				RealNameInfo:[],
				name:'',
				idCode:'',
				
				type:'',
			}	
		},
		onLoad (options){
			this.loadUserInfo();
			this.type = options.type;
			console.log(this.type)
		},
		onBackPress(e) {
			// #ifdef APP-PLUS
			if(this.type!=""){
				uni.showToast({
					title:'退出后需要重新登录',
					icon:'none',
				})
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('RealNameInfo');
				uni.navigateBack();
				return true;
			}
			//#endif
		},
		methods:{
			//--------------------加载用户信息-------------------
			loadUserInfo:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.userInfo=res.data;
						that.loadRealNameInfo();
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			
			//--------------------加载实名信息-------------------
			loadRealNameInfo:function(){
				var that=this;
				uni.getStorage({
					key:'RealNameInfo',
					success(res) {
						that.RealNameInfo=res.data;
					},
					fail() {
					}
				})
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
			
			//--------------------提交-------------------
			submitClick:function(){
				var that=this;
				if(that.name.length==0){
					uni.showToast({
						title:'请输入您的姓名',
						icon:'none'
					})
				}else if(that.name.length<2){
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none'
					})
				}else if(that.idCode.length==0){
					uni.showToast({
						title:'请输入您的身份证号码',
						icon:'none'
					})
				}else if(!that.checkIDCard(that.idCode)){
					uni.showToast({
						title:'输入的身份证有误，请检查',
						icon:'none'
					})
				}else{
					//验证成功
					if(that.name!=that.RealNameInfo.UserName){
						uni.showToast({
							title:'输入的姓名与实名的姓名不一致，请检查',
							icon:'none'
						})
					}else if(that.idCode!=that.RealNameInfo.UserIDNumber){
						uni.showToast({
							title:'输入的身份证号与实名的身份证号不一致，请检查',
							icon:'none'
						})
					}else{
						uni.navigateBack();
					}
				}
			},
		}	
	}
</script>

<style lang="scss">
	page{
		background-color: #F2F2F2; //页面背景色
	}
	.content { 
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	.bt{
		border-top: 1upx solid #DBDBDB;
		margin-top: 50upx;
	}
	.itemClass{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #DBDBDB;
		position: relative;
	}
	
	.phoneClass1{ //绑定的手机号
		font-size: 32upx;
		color: #333333;
		position: absolute;
		left: 5%;
		line-height: 100upx;
	}
	.phoneClass2{ //绑定的手机号
		font-size: 32upx;
		color: #333333;
		position: absolute;
		right: 5%;
		top:25upx;
		text-align: right;
	}
	.codeClass1{
		font-size: 32upx;
		color: #333333;
		position: absolute;
		left: 5%;
		line-height: 100upx;
	}
	.codeClass2{
		font-size: 32upx;
		color: #333333;
		position: absolute;
		right: 5%;
		top:25upx;
		text-align: right;
	}
	.codeClass3{
		font-size: 32upx;
		color: #333333;
		width: 100%;
		text-align: center;
		line-height: 100upx;
	}
	
	.btnClass{ //按钮样式
		margin-top: 110upx;
		width: 90%;
		text-align: center;
		margin-left: 5%;
		padding: 20upx 0;
		font-size: 32upx;
		border-radius: 100upx;
	}
	.cancellationClass{
		width: 100%;
		font-size: 30upx;
		text-align: center;
		margin-top: 22upx;
		color: #55aaff;
	}
</style>
