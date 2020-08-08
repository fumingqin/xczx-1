<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="receiverClass">
				<view class="fontStyle">收件人</view>
				<input placeholder="与证件姓名一致" class="inputClass" :value="address.receiver" name="receiver" /> 
			</view>
			
			<view class="phoneClass">
				<view class="fontStyle">手机号码</view>
				<input placeholder="常用手机号" class="inputClass" :value="address.phoneNum" name="phoneNum"  type="number"
				maxlength="11" /> 
			</view>
			
			<view class="districtClass">
				<view class="fontStyle">所在地区</view>
				<!-- <pickerAddress @change="districtChange">
					 <view class="inputClass">{{address.district}}</view>
				 </pickerAddress> -->
			</view>
			
			<view class="addressClass">
				<view class="fontStyle">详细地址</view>
				<input placeholder="不需要填写省/市/区" class="inputClass" :value="address.detailAddress" name="detailAddress" /> 
			</view>
			
			<view class="postalCodeClass">
				<view class="fontStyle">邮政编码</view>
				<input placeholder="请填写邮政编码" class="inputClass" :value="address.postalCode" name="postalCode" 
				type="number" maxlength="6"/> 
			</view>
			
			<view class="defaultClass">
				<view class="fontStyle">设置为默认地址</view>
				<view class="checkBox">
					<checkbox-group name="defaultAddress">
						<label>
							<checkbox :checked="address.default" :value="address.default"/>
						</label>
					</checkbox-group>
				</view>
			</view>
			<button form-type="reset" class="btndelete">重置</button>
			<button form-type="submit" class="btnsubmit">保存</button>	
		</form>
	</view>
</template>

<script>
	// import pickerAddress from '@/pages_GRZX/components/GRZX/wangding-pickerAddress/wangding-pickerAddress.vue' 
	export default {
		// components:{
		// 	pickerAddress
		// },
		data(){	
			return{			
				address:{
					addressID:'',
					receiver:'',
					phoneNum:'',
					district:'请选择 省/市/区 >',
					/* district:'', */
					detailAddress:'',
					postalCode:'',
					default:false
				},
				type:'',
			}
				
		},
		onLoad (options){
			this.type=options.type;
			if(options.type=="edit"){
				this.loadData();
			}
			
		},
		methods:{
			async loadData(){
				var that=this;
				uni.getStorage({
					key:'editAddress',
					success:function(res) {
						that.address.receiver=res.data.receiver;
						that.address.phoneNum=res.data.phoneNum;
						that.address.district=res.data.district;
						that.address.detailAddress=res.data.detailAddress;
						that.address.postalCode=res.data.postalCode;
						that.address.default=res.data.default;
						that.address.addressID=res.data.addressID;
					}
				})		
			},
			formSubmit:function(e){
				var that=this;
				var addList=e.target.value;
				addList.district=this.address.district;
				if(addList.defaultAddress.length==0){
					addList.default=false;
				}else{
					addList.default=true;
				}
				addList.hiddenIndex=0;
				var array=[];
				if(this.type=='edit'){
					//array.push(addList);
					uni.getStorage({
						key:'addressList',
						success(res) {
							for(var i=0;i<res.data.length;i++){
								if(that.address.addressID==res.data[i].addressID){
									array.push(addList);
								}else{
									array.push(res.data[i]);
								}
							}
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						},
						fail() {
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						}
					})
					uni.redirectTo({
						// url:'/pages/GRZX/infoList',
						url:that.$GrzxInter.Route.infoList.url,
					})
				}else if(this.type=='add'){
					var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
					addList.addressID=randomNum;
					array.push(addList);
					uni.getStorage({
						key:'addressList',
						success(res) {
							for(var i=0;i<res.data.length;i++){
								array.push(res.data[i]);
							}
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						},
						fail() {
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						}
					})
					uni.redirectTo({
						// url:'/pages/GRZX/infoList'
						url:that.$GrzxInter.Route.infoList.url,
					})
				}else{
					var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
					addList.addressID=randomNum;
					array.push(addList);
					uni.getStorage({
						key:'addressList',
						success(res) {
							for(var i=0;i<res.data.length;i++){
								array.push(res.data[i]);
							}
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						},
						fail() {
							uni.setStorage({
								key:'addressList',
								data:array,
							})
						}
					})
					uni.navigateBack();
				}
			},
			formReset:function(e){
				this.address.district="请选择 省/市/区 >";
			},
			districtChange:function(e){
				this.address.district=e.data.join(' ');
			}
		}	
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.content { 
		width: 100%;
		position: relative;
		background-color: #F5F5F5;
	}
	
	.fontStyle { //字体样式
		color: #424242;
		font-size: 32upx;
		line-height: 108upx;
		position: absolute;
		left: 6%;
	}
	
	.btndelete{  //删除按钮
		width: 40%;
		height: 108upx;
		background-color: #FFFFFF;
		color: #F75674;
		margin-bottom: 0upx;
		position: fixed;
		bottom: 0upx;
		left: 0%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	
	.btnsubmit{  //保存按钮
		width: 60%;
		height: 108upx;
		background-color: #FC4B4B;
		color: #FFFFFF;
		position: fixed;
		bottom: 0upx;
		left: 40%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	
	.receiverClass{ //收件人
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
	}
	
	.phoneClass{ //手机号码
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
		top:108upx;
	}
	
	.districtClass{ //所在地区
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
		top:216upx;
	}
	
	.addressClass{ //详细地址
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
		top:324upx;
	}
	
	.postalCodeClass{ //邮政编码
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
		top:432upx;
	}
	
	.defaultClass{ //默认地址
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;	
		position: absolute;
		border-top: 1upx solid #F5F5F5;
		top:580upx;
	}
	
	.checkBox{ 
		line-height: 108upx;
		position: absolute;
		right: 6%;
	}
	
	.inputClass{ //输入框
		position: absolute;
		width: 50%;
		height: 108upx;
		font-size: 32upx;
		right: 6%;
		line-height: 108upx;
		text-align: right;
	}
	
</style>
