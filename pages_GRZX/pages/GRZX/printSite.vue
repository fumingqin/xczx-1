<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="topSerchView">
			<view class="SearchBar" elevation='5px' style="">
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="isShowList">
			<block v-for="(item,index) in keywordList" :key="index">
				<view class="listItem" @tap="itemClick(index)">
					<rich-text :nodes="item.htmlStr"></rich-text>
				</view>
			</block>
		</view>
		<!-- 联动列表 -->
		<view class="list_box" v-if="isShowAllList">
			<!-- 左边的列表 -->
			<view class="left" v-if="true">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" 
						v-for="(item,index) in mainArray"
						:key="index" 
						:class="{ 'active':index==leftIndex }" 
						:data-index="index"
						@tap="detailStationTap(item)"
					>{{item.lineName}}</view>
		        </scroll-view>
			</view>
			<!-- 右边的列表 -->
			<view class="main" v-if="false">
				<swiper class="swiper" :style="{ 'height':scrollHeight }" 
					:current="leftIndex" @change="swiperChange"
					 vertical="true" duration="300">
					<!-- <swiper-item v-for="(item,index) in stationArray" :key="index"> -->
						<scroll-view  scroll-y="true" :style="{'height':scrollHeight}">
							<view class="item">
								<view class="goods" v-for="(item2,index2) in mainArray" :key="index2" @tap="detailStationTap(item2)">
									<view>
										<view>{{item2.lineName}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					<!-- </swiper-item> -->
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
	export default {
		data() {
			return {
				scrollHeight:'500px',
				stationArray:[],
				leftArray:[],
				mainArray:[],
				leftIndex:0,
				startPosition:'',
				endPosition:'',
				keywordList: [],
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
			}
		},
		onLoad(param){
			var that = this;
			that.startPosition=param.routeorigin;
			that.endPosition=param.routedestination;
			//获取专线
			that.GetAllLine();
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
			
		},
		methods: {
			//-------------------------获取专线列表数据-------------------------
			GetAllLine(){
				var that = this;
				uni.request({
					url:'http://27.148.155.9:9056/CTKY/getLineSite',
					method:'POST',
					header:{'content-type':'application/x-www-form-urlencoded'},
					data:{
						systemName:'泉运公司综合出行',
						startPosition :that.startPosition,
						endPosition:that.endPosition,
					},
					success(res) {
						console.log(res)
						if(res.data.msg=='查询失败，查询不到'+that.startPosition+'到'+that.endPosition+'的线路！'){
							uni.showToast({
								title:'该线路暂未开通',
								icon:'none'
							})
						}
						if (res.data) {
							if(res.data.data.length>0){
								for (var i = 0; i < res.data.data[0].lineSiteArr.length; i++) {
									if(res.data.data[0].lineSiteArr[i].SiteName!='晋江'){
										var cityNameArray = {
											lineName : res.data.data[0].lineSiteArr[i].SiteName,
										}
										that.mainArray.push(cityNameArray);
										}
								}
							}
					    }
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			//-------------------------监听输入-------------------------
			onInput(event){
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowList = false;
					this.isShowAllList = true;
					return;
				}
				this.isShowList = true;
				this.isShowAllList = false;
				this.keywordList = [];
				this.keywordList = this.drawCorrelativeKeyword(this.mainArray, keyword);
			},
			//-------------------------高亮关键字-------------------------
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i].lineName;
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row,
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//-------------------------点击下拉站点-------------------------
			itemClick(index){
				var that = this;
				//获取点击选项的文字
				var key = this.keywordList[index].keyword;
				uni.$emit('printSiteChange', {
				    data: key
				});
				uni.navigateBack({ });
			},
			//-------------------------点击站点-------------------------
			detailStationTap(item){
				console.log(item)
				var that = this;
				uni.$emit('printSiteChange', {
				    data: item.lineName
				});
				uni.navigateBack({ });
				},
			
			//-------------------------左侧导航点击-------------------------
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.leftIndex=Number(index);
			},
			/* 轮播图切换 */
			swiperChange(e){
				let index=e.detail.current;
				this.leftIndex=Number(index);
			}
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		height: 100rpx;
		background-color: #DBDBDB;
		padding-top: 20rpx;
	}
	.SearchBar {
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
		flex-direction: row;
		border-radius: 9px;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
	}
	//地址搜索输入
	.addressInput {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
	}
	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 100rpx;
		.listItem{
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 100%;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		text-align: center;
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #42b983;
				background-color: #fff;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		.swiper{
			height: 500px;
		}

		
		.item{
			padding-bottom: 10rpx;
		}
	}
	.goods{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;
		line-height: 80rpx;
	}
}
</style>
