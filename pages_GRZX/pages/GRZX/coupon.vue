<template>
	<view class="content">
		<view class="boxClass" v-for="(item, index) in couponList" :key="index" @click="useCoupon(item)">
			<image src="../../static/GRZX/coupon.png" class="imgClass"></image>
			<text class="nameClass">{{item.couponName}}</text>
			<text class="purposeClass">{{item.couponPurpose}}</text>
			<text class="typeClass">{{item.couponType}}</text>
			<text class="moneyClass">
				<text class="mt">￥</text>{{item.couponMoney}}
			</text>
			<view class="effectiveClass">
				有效期：{{item.couponTerm}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				couponList:[
					{
						couponName:'门票抵扣券1',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:5,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券2',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:50,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券3',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:100,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券4',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:1000,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券1',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:5,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券2',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:50,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券3',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:100,
						couponTerm:'2019年05月01日',
					},
					{
						couponName:'门票抵扣券4',
						couponPurpose:'仅限智慧旅游APP门票购买使用',
						couponType:'抵用券',
						couponMoney:1000,
						couponTerm:'2019年05月01日',
					}
				]
			}
		},
		methods:{
			useCoupon(e){
				console.log(e)
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F5F6;
	}
	.boxClass{
		width: 94.4%;
		height: 275upx;
		display: flex;
		margin-top: 30upx;
		margin-left: 2.8%;
		position: relative;
	}
	.imgClass{
		width: 100%;
		height: 100%;
	}
	.nameClass{  //门票抵扣券
		position: absolute;
		left: 24.29%;
		top:34upx;
		font-size: 32upx;
		color:#FFFFFF;
	}
	.purposeClass{ //仅限智慧旅游APP门票购买使用
		width: 37%;
		height: 64upx;
		font-size: 26upx;
		position: absolute;
		left: 23.68%;
		top: 90upx;
		color: #FFFFFF;
	}
	.moneyClass{  
		position: absolute;
		right: 0.7%;
		top: 49upx;
		font-size:60upx;
		width: 27%;
		height: 48upx;
		line-height: 48upx;
		color: #FFFFFF;
		text-align: center;
	}
	.mt{
		font-size: 40upx;
		color: #FFFFFF;
	}
	.typeClass{  //抵用券
		position: absolute;
		right: 0.7%;
		top: 116upx;
		color: #FFFFFF;
		font-size: 32upx;
		width: 27%;
		height: 30upx;
		text-align: center;
	}
	.effectiveClass{  //有效期
		position: absolute;
		left:4.66%;
		top: 216upx;
		color: #888888;
		font-size: 26upx;
	}
</style>
