<template>
	<view class="content">
		<view class="itemClass bt">
			<view class="phoneClass1">手机号码</view>
			<view class="phoneClass2">{{phone}}</view>
		</view>
		<view class="itemClass">
			<view class="codeClass1">验证码</view>
			<input type="number" placeholder="输入验证码" maxlength="4" class="codeClass2" v-model="code" />
		</view>
		<view class="itemClass">
			<view class="codeClass3" @click="getCodeClick">{{textCode}}</view>
		</view>
		<view class="btnClass btn_background btn_fontColor" @click="submitClick">验&nbsp;证</view>
		<!-- <view class="cancellationClass" @click="cancellationClick">无法收到验证码，请点击此处</view> -->
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
				phone:'',
				code:'',
				textCode:"点击获取验证码",
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
						that.phone=that.userInfo.phoneNumber.substring(0,3)+'****'+that.userInfo.phoneNumber.substring(7,11);
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			
			//--------------------跳转至实名验证-------------------
			cancellationClick:function(){
				uni.navigateTo({
					url:this.$GrzxInter.Route.verificateName.url,
				})
			},
			
			//--------------------提交-------------------
			submitClick:function(){
				var that=this;
				console.log(that.code)
				if(that.code!=null&&that.code!=""){
					uni.getStorage({
						key:'Code',
						success(res) {
							console.log(res.data)
							if(res.data==that.code){
								that.code="";
								uni.showToast({
									title:'验证成功',
									icon:'success'
								})
								setTimeout(function(){
									uni.navigateTo({
										url:that.$GrzxInter.Route.newPhone.url,
									})
								},300);
							}else{
								uni.showToast({
									title:'输入的验证码错误',
									icon:'none',
								})
							}
						},
						fail(err) {
							uni.showToast({
								title:'请先获取验证码',
								icon:'none',
							})
						}
					})
				}else if(that.code==""){
					uni.showToast({
						title:'请输入验证码',
						icon:'none',
					})
				}else{
					uni.showToast({
						title:'请输入正确的验证码',
						icon:'none',
					})
				}
			},
			
			//--------------------获取验证码-------------------
			getCodeClick:function(){
				var that=this;
				var timer=null,second=59; //倒计时的时间
				if(that.textCode == "点击获取验证码"){
					that.textCode = second+"秒后重发";
					if(that.textCode == "59秒后重发"){
						timer=setInterval(function(){
						second--;
							if(second<=0){	
								that.textCode = "点击获取验证码";
								clearInterval(timer);
								second=59;	
							}
							else{			
								that.textCode = second+"秒后重发";
						}},1000)
						that.getCode();
					}
				}
			},
			getCode:function(){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.getLoginCode.value,
					data:{
						phoneNumber:that.userInfo.phoneNumber,
					},
					method:that.$GrzxInter.Interface.getLoginCode.method,
					success:(res)=>{
						// console.log(res,"340");
						console.log(res.data.data);
						uni.setStorageSync('Code',res.data.data)
						uni.showToast({
							title:"验证码已发送，仅在5分钟内有效!",
							icon:"none"
						})
						setTimeout(function(){
							uni.removeStorage({
								key:'Code',
							})
						},300000);
					}
				}) 
			}
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
		line-height: 100upx;
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
		color: #7289A8;
	}
</style>
