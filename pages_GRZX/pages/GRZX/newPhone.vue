<template>
	<view class="content">
		<view class="itemClass bt">
			<view class="phoneClass1">新的手机号码</view>
			<input type="number" placeholder="输入新的手机号" maxlength="11" class="phoneClass2" v-model="phoneNumber" @blur="checkPhone" />
		</view>
		<view class="itemClass">
			<view class="codeClass1">验证码</view>
			<input type="number" placeholder="输入验证码" maxlength="4" class="codeClass2" v-model="code" />
		</view>
		<view class="itemClass">
			<view class="codeClass3" @click="getCodeClick">{{textCode}}</view>
		</view>
		<view class="btnClass btn_background btn_fontColor" @click="submitClick">确&nbsp;定</view>
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
				phoneNumber:'',
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
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			
			//--------------------校验手机号-------------------
			checkPhone:function(e){
				var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
				if(e.detail.value==""){
					// console.log("空的")
				}else if(e.detail.value==this.userInfo.phoneNumber){
					uni.showToast({
						title:'新手机号是当前账号绑定的手机号，无法重复绑定',
						icon:'none'
					})
				}else if(reg.test(e.detail.value)){
					// console.log("正确")
				}else{
					uni.showToast({
						title:'输入的手机号有误，请检查',
						icon:'none'
					})
				}
			},
			
			//--------------------提交-------------------
			submitClick:function(){
				var that=this;
				
				if(that.phoneNumber==""||that.phoneNumber==null){
					uni.showToast({
						title:'请输入新手机号',
						icon:'none'
					})
				}else if(!reg.test(this.phoneNumber)||this.phoneNumber.length!=11){
					uni.showToast({
						title:'输入的手机号有误',
						icon:'none',
					})
				}else{
					uni.getStorage({
						key:'newCode',
						success(res) {
							if(that.code==""||that.code==null){
								uni.showToast({
									title:'请输入验证码',
									icon:'none'
								})
							}else if(that.phoneNumber==that.userInfo.phoneNumber){
								uni.showToast({
									title:'新手机号是当前账号绑定的手机号，无法重复绑定',
									icon:'none'
								})
							}
							else if(that.code==res.data.code&&that.phoneNumber==res.data.phoneNumber){
								//验证成功,调取更换手机号的方法
								
								uni.switchTab({
									url:that.$GrzxInter.Route.user.url,
								})
							}else{
								uni.showToast({
									title:'输入的验证码有误',
									icon:'none'
								})
							}	
						},
						fail(err) {
							uni.showToast({
								title:'请先获取验证码',
								icon:'none'
							})
						}
					})
				}
			},
			
			//--------------------获取验证码-------------------
			getCodeClick:function(){
				var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
				if(this.phoneNumber==""){
					uni.showToast({
						title:'请先输入手机号',
						icon:'none',
					})
				}else if(!reg.test(this.phoneNumber)||this.phoneNumber.length!=11){
					uni.showToast({
						title:'输入的手机号有误',
						icon:'none',
					})
				}else if(this.phoneNumber.length==11){
					this.getCode();
				}
			},
			getCode:function(){
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
						that.getCodeNum();
					}
				}
			},
			getCodeNum:function(){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.getLoginCode.value,
					data:{
						phoneNumber:that.phoneNumber,
					},
					method:that.$GrzxInter.Interface.getLoginCode.method,
					success:(res)=>{
						// console.log(res,"340");
						console.log(res.data.data);
						uni.setStorageSync('newCode',{
							code:res.data.data,
							phoneNumber:that.phoneNumber,
						})
						uni.showToast({
							title:"验证码已发送，仅在5分钟内有效!",
							icon:"none"
						})
						setTimeout(function(){
							uni.removeStorage({
								key:'newCode',
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
