<!-- 乡村振兴  第一版 -->
<template>
	<view class="content">	
		<view class="passengerList">
			<view class="boxClass" v-for="(item, index) in passengerList" :key="index" @click="choosePassenger(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass">{{item.userName}}</view>
				<view class="sexClass" name="userSex">{{item.userSex}}</view>
				<!-- <view class="typeClass">{{item.userType}}</view> -->
				<view class="codeClass fontStyle">证件号</view>
				<view class="codeNumClass fontStyle">{{item.userCodeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.userPhoneNum}}</view>
				<view>
					<image v-if="item.hiddenIndex == 1"  class="checkClass" src="../../static/GRZX/checked.png"></image>
				</view>
				<view class="redBox">
					<view class="typeClass">{{item.userType}}</view>
					<text style="font-size: 24upx;color: #2C2D2D;line-height: 57upx;margin-left: 20upx;">{{item.userauditState}}</text>
					<text v-if="item.userDefault==true" class="fontClass" style="width: 80upx;">本人</text>
					<!-- <text v-if="item.userEmergencyContact==true" class="fontClass" style="width: 80upx;">联系人</text> -->
				</view>
			</view>
		</view>	
		<view class="btnBox"> 
			<button type="warn" @click="addPassenger" class="btnAdd1">+添加乘客</button>
			<button type="primary" @click="definite" class="btnDefinite">确定</button>
		</view>
		<view class="returnBox" @click="returnPages">
			<image class="returnClass" src="../../static/GRZX/btnReturn.png"></image>
			<view class="titleClass">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				limt:'', //限制的人数
				passengerList:[], //乘客列表
			}
		},
		onLoad(options){
			//传参
			//limitNum参数为你限制添加乘车人的数量（大于等于1）
			this.limit=options.limitNum;
			uni.getStorage({
				key:'userInfo',
				fail() {
					uni.showToast({
						icon:'none',
						title:'暂未登录,请登录后查看'
					})
					uni.stopPullDownRefresh();
					//#ifdef APP-PLUS
					setTimeout(function(){
						uni.navigateTo({	
							url  : '/pages/GRZX/userLogin'
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
		},
		onPullDownRefresh:function(){
		  this.loadData();
		},
		onShow() {
			this.loadData();
		},
		methods:{
			//--------------------------------加载数据------------------------------
			loadData(){
				var that=this;
				var array=[];
				var list=[];
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
						if(res.data.userId==""||res.data.userId==null){
							uni.showToast({
								icon:'none',
								title:'暂未登录,请先登录'
							})
						}else{
							uni.request({
								url:that.$GrzxInter.Interface.userInfoList.value,
								data:{
									userId:res.data.userId
								},
								method:that.$GrzxInter.Interface.userInfoList.method,
								success(res1) {
									console.log(res1,'乘车人列表')
									for(var i=0;i<res1.data.data.length;i++){
										if(res1.data.data[i].userSex==0){
											res1.data.data[i].userSex="男";
										}else{
											res1.data.data[i].userSex="女";
										}
										var data1=res1.data.data[i];
										data1.hiddenIndex=0;
										for(var q=0;q<list.length;q++){
											if(data1.passengerId==list[q]){
												data1.hiddenIndex=1;
											}
										}
										array.push(data1);
										uni.stopPullDownRefresh();
									}
									var defaultList=[];
									for(var n=0;n<array.length;n++){
										if(array[n].hiddenIndex==1){
											defaultList.unshift(array[n]);
										}else{
											defaultList.push(array[n]);
										}
									}
									that.passengerList=defaultList;
								}
							})
						}
						
					}
				})
			},
			
			//--------------------------------添加乘客------------------------------
			addPassenger(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success() {
						uni.navigateTo({
							url:that.$GrzxInter.Route.addPassenger.url+'?type=add'
						})
					},
					fail() {
						uni.showToast({
							icon:'none',
							title:'暂未登录,无法添加乘客'
						})
					}
				})
			},
			
			//--------------------------------返回上一页------------------------------
			returnPages(){
				uni.navigateBack();
			},
			
			//--------------------------------编辑乘车人信息------------------------------
			editPassenger(e){   
				uni.setStorage({
					key:'editPassenger',
					data:e
				})
				uni.navigateTo({
					url:'/pages/GRZX/addPassenger?type=edit'
				})
			},
			
			//--------------------------------选择乘车人------------------------------
			choosePassenger(e){  
				var list=this.passengerList;
				var count=0;
				for(var i=0;i<list.length;i++){
					if(list[i].hiddenIndex==1){
						count++;
					}
				}
				if(e.hiddenIndex==1){
					e.hiddenIndex=0;
				}else if(count>(this.limit-1) && this.submitType==2){
					uni.showToast({
						title: '乘客最多只能添加'+this.limit+'名',
						icon:"none"
					});
				}else{
					e.hiddenIndex=1;
				}		
			},
			
			//--------------------------------提交选中的乘客------------------------------
			definite(){
				var data=this.passengerList;
				var array=[];
				for(var i=0;i<data.length;i++){
					if(data[i].hiddenIndex==1){
						array.push(data[i]);
					}
				}
				if(array.length==0){
					uni.showToast({
						title: '请选择乘客',
						icon:"none"
					})
				}else{
					uni.setStorageSync('passengerList',array);
					uni.navigateBack();	
				}			
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		width: 100%;
	}
	.checkClass{	//勾选
		position: absolute;
		left: 89.26%;
		top:90upx;
		width: 45upx;
		height:46upx ;
	}
	.returnClass{ //返回按钮
		width: 22upx;
		/* #ifdef H5 */
		margin-top: 30upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 103upx;
		/* #endif */
		height: 40upx;
		margin-left: 3.47%;
	}
	.btnRight{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 90%;
		top:80upx;
	}
	.titleClass{
		margin-left: 20upx;
		font-size: 38upx;
		/*font-weight: bold; */
		/* #ifdef H5 */
		margin-top: 20upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 95upx;
		/* #endif */
	}
	.passengerList{ //列表样式
		width: 100%;
		/* #ifdef H5 */
		margin-top: 110upx;
		margin-bottom: 30upx;
		padding-bottom: 160upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 180upx;
		margin-bottom: 160upx;
		/* #endif */
	}
	.btnAdd1{
		border-radius: 12upx;
		width: 45%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 30upx;
	}
	.btnDefinite{
		border-radius: 12upx;
		width: 45%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 30upx;
	}
	.btnAdd2{ //添加按钮
		width: 92%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 12upx;
		background-color: #FC4646;
		margin-top: 30upx;
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
		border-radius:20upx ;
	}
	.nameClass{
		font-size: 36upx;
		color: #2C2D2D;
		position: absolute;
		left: 4%;
		top:30upx;
		font-weight: bold;
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
	.returnBox{
		width: 100%;
		/* #ifdef H5 */
		height: 90upx;
		/* #endif */
		/* #ifndef H5 */
		height: 160upx;
		/* #endif */
		position: fixed;
		top: 0upx;
		display: flex;
		flex-direction: row;
		background-color: #F6F8FC;
		z-index: 9999;
	}
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
</style>
