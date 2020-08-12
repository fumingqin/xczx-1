<!-- 乡村振兴  第一版 -->
<template>
	<view>	
		<!-- 常用乘车人 -->
		<view v-if="type==1 && state==1" class="mt">
			<view class="boxClass" v-for="(item, index) in passengerList" :key="index" @click="editPassenger(item)">  <!--个人中心页面进入 -->
				<view class="nameClass">{{item.userName}}</view>
				<view class="sexClass">{{item.userSex}}</view>
				<view class="codeClass fontStyle">证件号</view>
				<view class="codeNumClass fontStyle">{{item.userCodeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.userPhoneNum}}</view>
				<view class="redBox">
					<view class="typeClass">{{item.userType}}</view>
					<text style="font-size: 24upx;color: #2C2D2D;line-height: 57upx;margin-left: 20upx;">{{item.userauditState}}</text>
					<text v-if="item.userDefault==true" class="fontClass" style="width: 80upx;">本人</text>
				</view>
				<view class="btnRight">
					<image src="../../static/GRZX/btnRight.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<view v-if="type==1 && state==1" class="btnBox">
			<button @click="addPassenger" class="btnAdd btn_background btn_fontColor">+添加乘客</button>
		</view>	
		
		<view v-if="type==1 && state==2" class="mt">
			<view class="boxClass" v-for="(item, index) in passengerList" :key="index" @click="selete(item)">  <!--个人中心页面进入 -->
				<view class="nameClass">{{item.userName}}</view>
				<view class="sexClass">{{item.userSex}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{item.userCodeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.userPhoneNum}}</view>
				<view class="redBox">
					<view class="typeClass">{{item.userType}}</view>
					<text style="font-size: 24upx;color: #2C2D2D;line-height: 57upx;margin-left: 20upx;">{{item.userauditState}}</text>
					<text v-if="item.userDefault==true" class="fontClass" style="width: 80upx;">本人</text>
				</view>
				<view v-if="item.deleteIndex==0" class="btnCheck"> 
					<image src="../../static/GRZX/btnUncheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view v-if="item.deleteIndex==1" class="btnCheck"> 
					<image src="../../static/GRZX/btnCheck.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<view v-if="type==1 && state==2" class="btnBox">
			<button @click="deletePassenger" class="btnAdd btn_background btn_fontColor">删除</button>
		</view>
		
		<!-- <view v-if="type==1" class="navClass" >
			<view class="passengerClass1" @click="passengerClick">
				<text class="textClass">常用出行人</text>
				<view class="lineClass"></view>
			</view>
			<view class="addressClass1" @click="addressClick"><text class="textClass">常用地址</text></view>
		</view> -->
		
		<!-- 常用地址 -->
		
		<view v-if="type==2 && state==1" class="m-l">
			<view class="boxClass1" v-for="(item, index) in addressList" :key="index" @click="editAddress(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass1">{{item.receiver}}</view>
				<view class="postalCodeClass">{{item.postalCode}}</view>
				<view class="fontStyle1" style="top:101upx;">手机号码：{{item.phoneNum}}</view>
				<view class="fontStyle1" style="top:158upx;">所在地区：{{item.district}}</view>
				<view class="fontStyle1" style="top:216upx;">详细地址：{{item.detailAddress}}</view>
				<view class="editClass">
					<image src="../../static/GRZX/btnRight.png" class="btnRight1"></image>
				</view>
				
				<view v-if="item.default">
					<image src="../../static/GRZX/defaultAddress.png" class="defaultClass"></image>
				</view>
			</view>
		</view>	
		<view v-if="type==2 && state==1" class="btnBox"> 
			<button @click="addAddress" class="btnAdd btn_background btn_fontColor">+添加邮寄地址</button>
		</view>	
		
		<view v-if="type==2 && state==2" class="m-l">
			<view class="boxClass1" v-for="(item, index) in addressList" :key="index" @click="selete(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass1">{{item.receiver}}</view>
				<view class="postalCodeClass">{{item.postalCode}}</view>
				<view class="fontStyle1" style="top:101upx;">手机号码：{{item.phoneNum}}</view>
				<view class="fontStyle1" style="top:158upx;">所在地区：{{item.district}}</view>
				<view class="fontStyle1" style="top:216upx;">详细地址：{{item.detailAddress}}</view>
				<view v-if="item.deleteIndex==0" class="btnCheck1">
					<image src="../../static/GRZX/btnUncheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view v-if="item.deleteIndex==1" class="btnCheck1"> 
					<image src="../../static/GRZX/btnCheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				
				<view v-if="item.default">
					<image src="../../static/GRZX/defaultAddress.png" class="defaultClass"></image>
				</view>
			</view>
		</view>	
		<view v-if="type==2 && state==2" class="btnBox">
			<button @click="deleteAddress" class="btnAdd btn_background btn_fontColor">删除</button>
		</view>
		<view v-if="type==2" class="navClass" >
			<view class="passengerClass2" @click="passengerClick"><text class="textClass">常用出行人</text></view>
			<view class="addressClass2" @click="addressClick">
				<text class="textClass">常用地址</text>
				<view class="lineClass"></view>
			</view>
		</view>
		<view class="topClass">
			<!-- #ifndef MP-WEIXIN -->
			<text class="titleClass">常用信息设置</text>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<text class="titleClass" @click="returnClick">常用信息设置</text>
			<!-- #endif -->
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<view v-if="state==1" class="dfClass" @click="deleteClick">管理</view>
			<view v-if="state==2" class="dfClass" @click="finishClick">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				applyName:'',   //应用名称
				
				type:1,  		//切换tab
				state:1,		 //1管理， 2完成
				passengerList:[], 	//乘客列表
				addressList:[],		//地址列表
				
				userId:'',			//用户信息
			}
	    },
		onLoad(){
			//加载应用名称
			this.applyName=this.$oSit.Interface.system.applyName;
			
			//判断是否登录
			uni.getStorage({
				key:'userInfo',
				fail() {
					uni.showToast({
						icon:'none',
						title:'暂未登录,请登录后查看'
					})
					//#ifdef APP-PLUS
					setTimeout(function(){
						uni.navigateTo({	
							url  : '/pages/GRZX/userLogin'
						}) 
					},500);
					// #endif
					//#ifdef MP-WEIXIN
					setTimeout(function(){
						uni.navigateTo({
							url:'/pages/Home/wxAuthorize',
						})
					},500);
					// #endif
				}
			})
		},
		// --------------------------------下拉刷新--------------------------------
		onPullDownRefresh:function(){
		  this.loadData();
		},
		onShow(){
			this.loadData();
		},
	    methods: {	
			// --------------------------------加载数据--------------------------------
			loadData(){
				var array=[];
				var list=[];
				var that=this;
				uni.getStorage({
					key:"passengerList",
					success(res2) {
						for(var j=0;j<res2.data.length;j++){
							list.push(res2.data[j].passengerId);
						}
					}
				})
				uni.getStorage({
					key:'userInfo',
					success(res){
						that.userId=res.data.userId;
						uni.showLoading({
							mask:true,
							title: '加载中...',
						})
						uni.request({
							url:that.$GrzxInter.Interface.userInfoList.value,
							data:{
								userId:res.data.userId
							},
							method:that.$GrzxInter.Interface.userInfoList.method,
							success(res1) {
								console.log(res1,'111')
								for(var i=0;i<res1.data.data.length;i++){
									if(res1.data.data[i].userSex==0){
										res1.data.data[i].userSex="男";
									}else{
										res1.data.data[i].userSex="女";
									}
									res1.data.data[i].deleteIndex=0;
									var data1=res1.data.data[i];
									data1.hiddenIndex=0;
									for(var q=0;q<list.length;q++){
										if(data1.passengerId==list[q]){
											data1.hiddenIndex=1;
										}
									}
									array.push(data1);
								}
								var list1=[];
								var defaultList=[];
								for(var i=0;i<array.length;i++){
									if(array[i].hiddenIndex==1){
										list1.push(array[i]);
									}
									if(array[i].userDefault==true){
										defaultList.unshift(array[i]);//置顶
									}else{
										defaultList.push(array[i]);
									}
								}
								that.passengerList=defaultList;
								uni.stopPullDownRefresh();
								uni.setStorage({
									key:'passengerList',
									data:list1,
								})
								uni.hideLoading();
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									icon:'none',
									title:'网络请求失败'
								})
							}
						})
					},
					fail() {
						uni.showToast({
							icon:'none',
							title:'暂未登录,请先登录'
						})
					}
				})
			},
			
			//--------------------------------乘车人管理--------------------------------
			passengerClick(){
				this.type=1;
			},
			
			addressClick(){
				this.type=2;
			},
			
			// --------------------------------编辑乘车人--------------------------------
	        editPassenger(e){  
	        	uni.setStorage({
	        		key:'editPassenger',
	        		data:e
	        	})
	        	uni.navigateTo({
					url:this.$GrzxInter.Route.addPassenger.url+'?type=edit',
	        	})
	        },
			
			// --------------------------------添加乘车人--------------------------------
			addPassenger(){
				var that=this;
				console.log(that.$GrzxInter.Route.addPassenger.url)
				uni.getStorage({
					key:'userInfo',
					fail:function(){
						uni.showToast({
							icon:'none',
							title:'未登录无法添加乘车人,请先登录'
						})
					},
					success:function(res){
						uni.navigateTo({
							url:that.$GrzxInter.Route.addPassenger.url+'?type=ad',
						})
					}
				})
			},
			
			// --------------------------------地址管理--------------------------------
			addAddress(){
				uni.redirectTo({
					url:this.$GrzxInter.Route.addAddress.url+'?type=add',
				})
			},
			
			// --------------------------------选择地址--------------------------------
			chooseAddress(e){
			},
			
			// --------------------------------编辑地址--------------------------------
			editAddress(e){   
				uni.setStorage({
					key:'editAddress',
					data:e
				})
				uni.redirectTo({
					url:this.$GrzxInter.Route.addAddress.url+'?type=edit',
				})
			},
			
			// --------------------------------删除乘车人信息--------------------------------
			deletePassenger(){ 
				var data=this.passengerList;
				var that=this;
				var deleteList=[];
				for(var i=0;i<data.length;i++){
					if(data[i].deleteIndex==1){
						deleteList.push(data[i]);
					}
				}
				if(deleteList.length==0){
					uni.showToast({
						title: '请选择',
						icon:"none"
					})
				}else{
					uni.showModal({
						title:'友情提醒',
					    content: '确定删除这些乘客信息？',
					    success: (e)=>{
					    	if(e.confirm){
								that.deleteByList(deleteList);
								uni.redirectTo({
									url:that.$GrzxInter.Route.infoList.url,
								})
							}else{
								uni.showToast({
									icon:'none',
									title:'已取消',
								})
								this.state=1;
								for(var i=0;i<data.length;i++){
									data[i].deleteIndex=0;
								}
							}
					    }
					});
				}
			},
			
			//--------------------------------请求接口删除乘客--------------------------------
			deleteByList(deleteList){
				var that=this;
				for(var j=0;j<deleteList.length;j++){
					uni.request({
						url:that.$GrzxInter.Interface.deletuserInfoList.value,
						data:{
							userId:that.userId,
							passengerId:deleteList[j].passengerId,
						},
						method:that.$GrzxInter.Interface.deletuserInfoList.method,
						success(res) {
							if(res.data.status&&res.data.msg=='删除成功'){
								uni.showToast({
									title:'删除成功！',
									icon:'none',
								})
							}
						}
					})	
				}
			},
			
			// --------------------------------删除地址--------------------------------
			deleteAddress(){  //
				var data=this.addressList;
				var array=[];
				for(var i=0;i<data.length;i++){
					if(data[i].deleteIndex==0){
						array.push(data[i]);
					}
				}
				if(array.length==0){
					uni.showToast({
						title: '请选择',
						icon:"none"
					})
				}else{
					uni.setStorage({
						key:"addressList",
						data:array
					})	
				}
				this.state=1;
				uni.redirectTo({
					url:this.$GrzxInter.Route.infoList.url,
				})
			},
			
			// --------------------------------选中--------------------------------
			selete(e){
				if(e.deleteIndex==0){
					e.deleteIndex=1;
				}else{
					e.deleteIndex=0;
				}
			},
			
			// --------------------------------返回按钮--------------------------------
			returnClick(){
				uni.switchTab({
					//url:'/pages/GRZX/user',
					url:this.$GrzxInter.Route.user.url,
				})
			},
			
			// --------------------------------点击管理--------------------------------
			deleteClick(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					fail:function(){
						uni.showToast({
							icon:'none',
							title:'未登录无法管理,请先登录'
						})
					},
					success:function(res){
						that.state=2;
					}
				})
			},
			
			// --------------------------------完成--------------------------------
			finishClick(){
				this.state=1;
			},
			
			checkClick(){
				this.checkState=1;
			},
			
			uncheckClick(){
				this.checkState=0;
			},
	    }
	};
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	//导航栏
	.navClass{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		position: fixed;
		top:170upx;
		display: flex;
	}
	.textClass{
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		font-size:32upx ;
	}
	.passengerClass1{
		color: #ff0000;
		width: 50%;
		text-align: center;
	}
	.passengerClass2{
		color: #AAAAAA;
		width: 50%;
		text-align: center;
	}
	.addressClass1{
		color: #AAAAAA;
		width: 50%;
		text-align: center;
	}
	.addressClass2{
		color: #ff0000;
		width: 50%;
		text-align: center;
	}
	.lineClass{
		height: 5upx;
		width: 100%;
		background-color: #ff0000;
	}
	//乘车人管理
	.mt{
		width: 100%;
		//margin-top: 292upx;
		/* #ifndef H5 */
		margin-top: 185upx;
		margin-bottom: 160upx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 115upx;
		margin-bottom: 30upx;
		padding-bottom: 160upx;
		/* #endif */
	}
	.boxClass{
		background-color: #FFFFFF;
		width: 94%;
		margin-top: 20upx;
		margin-left: 3%;
		height: 230upx;
		font-size:28upx;
		color: #666666;
		position: relative;
		border-radius:20upx;
		// display: flex;
	}
	.nameClass{
		font-size: 36upx;
		color: #2C2D2D;
		position: absolute;
		left: 4%;
		top:30upx;
		width: 18%;
		font-weight: bold;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.sexClass{
		position: absolute;
		left: 25%;
		top:47upx;
		font-size: 24upx;
		color: #2C2D2D;
	}
	.fontStyle{
		color: #666666;
		font-size: 27upx;
	}
	.typeClass{
		font-size: 24upx;
		color: #2C2D2D;
		line-height: 57upx;
		// position: absolute;
		// left: 33%;
		// top:47upx;
	}
	.codeClass{
		position: absolute;
		left: 4%;
		top:108upx;
	}
	.codeNumClass{
		position: absolute;
		left: 25%;
		top:108upx;
	}
	.phoneClass{
		position: absolute;
		left: 4%;
		top:163upx;
	}
	.phoneNumClass{
		position: absolute;
		left: 25%;
		top:163upx;
	}
	.redBox{
		position: absolute;
		left:32%;
		top: 34upx;
		display: flex;
	}
	.fontClass{ //本人,紧急联系人,待审核,审核通过,审核未通过
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		color: #ff0000;
		margin-left: 20upx;
		border: 1upx solid #ff0000;
		border-radius: 10upx;
		text-align: center;
	}
	.btnRight{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 90%;
		top:80upx;
	}
	//通用
	.btnBox{ //按钮位置样式
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 0upx;
		width: 100%;
		height: 158upx;
		background-color: #F6F8FC;
		/* border: 1px solid #4CD964; */
	}
	.btnAdd{ //添加按钮（乘车人）（地址）
		width: 92%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 12upx;
		margin-top: 30upx;
	}
	
	//地址管理
	.m-l{ //列表样式
		width: 100%;
		margin-top: 292upx;
		margin-bottom: 160upx;
	}
	.btnRight1{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 45%;
		top:116upx;
	}
	.nameClass1{
		font-size: 34upx;
		color: #424242;
		position: absolute;
		left: 5.56%;
		top:30upx;
		font-weight: bold;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.fontStyle1{
		position: absolute;
		left: 5.56%;
		font-size:26upx;
		color: #888888;
	}
	.postalCodeClass{
		position: absolute;
		left: 24.93%;
		top:40upx;
		color: #888888;
		font-size: 26upx;
	}
	.btnBox{ //按钮位置样式
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 0upx;
		width: 100%;
		height: 158upx;
		background-color: #F6F8FC;
	}
	.defaultClass{
		position: absolute;
		right: 0upx;
		top:0upx;
		width: 90upx;
		height: 90upx;
	}
	.editClass{
		position: absolute;
		left: 80%;
		height: 282upx;
		width: 20%;
		/* background-color: #007AFF; */
	}
	.boxClass1{
		background-color: #FFFFFF;
		width: 94%;
		margin-top: 20upx;
		margin-left: 3%;
		height: 282upx;
		font-size:28upx;
		color: #666666;
		position: relative;
		border-radius:20upx ;
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
	.titleClass{  //常用信息设置
		position: absolute;
		/* #ifdef H5 */
		top: 20upx;
		/* #endif */
		
		/* #ifndef H5 */
		top: 90upx;
		/* #endif */
		
		/* #ifndef MP-WEIXIN */
		width: 100%;
		text-align: center;
		/* #endif */
		
		/* #ifdef MP-WEIXIN */
		left: 10%;
		/* #endif */
		color: #232323;
		font-size: 38upx;
	}
	.dfClass{	//管理和完成
		position: absolute;
		/* #ifdef H5 */
		top: 20upx;
		/* #endif */
		/* #ifndef H5 */
		top: 90upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		left: 60%;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		left: 85%;
		/* #endif */
		color: #232323;
		font-size: 38upx;
	} 
	.btnCheck{
		width:50upx;
		height: 50upx; 
		position: absolute;
		left: 88%;
		top:80upx;
	}
	.btnCheck1{
		width:50upx;
		height: 50upx; 
		position: absolute;
		left: 88%;
		top:115upx;
	}
</style>
