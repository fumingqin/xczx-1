<template>
	<view class="content">	
		<view class="addressList">
			<view class="boxClass" v-for="(item, index) in addressList" :key="index" @click="chooseAddress(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass">{{item.receiver}}</view>
				<view class="postalCodeClass">{{item.postalCode}}</view>
				<view class="fontStyle" style="top:101upx;">手机号码：{{item.phoneNum}}</view>
				<view class="fontStyle" style="top:158upx;">所在地区：{{item.district}}</view>
				<view class="fontStyle" style="top:216upx;">详细地址：{{item.detailAddress}}</view>
				<view class="editClass" @click="editAddress(item)">
					<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
				</view>
				
				<view v-if="item.default">
					<image src="../../static/GRZX/defaultAddress.png" class="defaultClass"></image>
				</view>
			</view>
		</view>	
		<view class="btnBox"> 
			<button type="warn" @click="addAddress" class="btnAdd">+添加邮寄地址</button>
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
				addressList:[{
					receiver:'张小娴',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:true
				},{
					receiver:'黄小新1',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:false
				},{
					receiver:'黄小新2',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:false
				},{
					receiver:'黄小新3',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:false
				},{
					receiver:'黄小新4',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:false
				},{
					receiver:'黄小新5',
					postalCode:'366300',
					phoneNum:'136*****645',
					district:'福建省泉州市丰泽区',
					detailAddress:'泉秀路茶叶大厦7楼',
					default:false
				}
			],
			}
		},
		onLoad(){
			
		},
		methods:{
			addAddress(){
				uni.navigateTo({
					// url:'/pages/GRZX/addAddress?type=add'
					url:that.$GrzxInter.Route.addAddress.url+'?type=add',
				})
			},
			returnPages(){
				uni.navigateBack();
			},
			chooseAddress(e){
				uni.setStorage({
					key:'chooseAddress',
					data:e
				})
			},
			editAddress(e){   //编辑乘车人信息
				uni.setStorage({
					key:'editAddress',
					data:e
				})
				uni.navigateTo({
					// url:'/pages/GRZX/addAddress?type=edit'
					url:that.$GrzxInter.Route.addAddress.url+'?type=edit',
				})
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
	.returnClass{ //返回按钮
		width: 18upx;
		height: 40upx;
		margin-top: 103upx;
		margin-left: 3.47%;
	}
	.btnRight{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 45%;
		top:116upx;
	}
	.titleClass{
		margin-left: 20upx;
		font-size: 38upx;
		/* font-weight: bold; */
		margin-top: 97upx;
	}
	.addressList{ //列表样式
		width: 100%;
		margin-top: 180upx;
		margin-bottom: 160upx;
	}
	.btnAdd{ //添加按钮
		width: 92%;
		height: 90upx;
		border-radius: 12upx;
		background-color: #FC4646;
		margin-top: 30upx;
	}
	.boxClass{
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
	.nameClass{
		font-size: 34upx;
		color: #424242;
		position: absolute;
		left: 5.56%;
		top:30upx;
		font-weight: bold;
	}
	.fontStyle{
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
	.returnBox{
		width: 100%;
		height: 160upx;
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
</style>
