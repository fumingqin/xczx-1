<template>
	<view class="content">
		<!-- 二维码弹框代码 -->
		<popup type="bottom" ref="popup">
			<swiper style="width: 100%;height: 500rpx;">
				<swiper-item v-for="(item,index) in QRCodeArray" :key="index">
					<view class="u-f-ac" style="border-top-right-radius: 20rpx;border-top-left-radius: 20rpx; width: 100%; background: #FFFFFF;display: block; text-align: center;">
						<!-- 显示二维码 -->
						
						<!-- <image src="../../../../static/CTKY/erweima.png" -->
							<!-- mode="aspectFill" lazy-load style="width: 250rpx; height: 250rpx;padding-top: 70rpx;"></image> -->
							
						<!-- 检票口/座位号 -->
						<view class="u-f-jsb" style="font-size: 32rpx;color: #2C2D2D; padding: 20rpx 80rpx;font-weight: 300;">
							<view>检票口：{{item.checkPlace}}</view>
							<view>座位号：{{item.seatNum}}</view>
						</view>
						
						<!-- 发车时间/车牌号 -->
						<view class="u-f-jsb" style="font-size: 32rpx;color: #2C2D2D; padding: 0 80rpx;padding-bottom: 60rpx;">
							<view>发车时间：{{item.lunchTime}}</view>
							<view>车牌号：{{item.carNum}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</popup>
		
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x="true" scroll-y="false" scroll-with-animation="true" :scroll-left="scrollLeft">
			<block v-for="(item,index) in tabBars" :key="item.id">
				<view class="nav-item" :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @tap="changeTab(index)">{{item.name}}</view>
			</block>
		</scroll-view>

		<!-- 内容部分 -->
		<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item v-for="(item,index) in orderList" :key="index">
				<scroll-view class="panelScrollBox" :scroll-y="enableScroll">
					<!-- 订单列表 -->
					<block v-for="(items,index1) in item.list" :key="index1">

						<!-- 预定日期 -->
						<view style="display: flex;margin-bottom: 20rpx;" v-if="items.iSreserve">
							<view class="reserveDate">预定日期：{{items.Time}}</view>
						</view>
						
						<!-- 这里加一层view是为了防止事件点击重复触发 -->
						<view class="orderContent">
							<view class="orderContent" @tap="navToOrderDetail(items)">
								<!-- 类型/状态 -->
								<view class="headClass u-f-jsb">
									<view class="u-f-jsb">
										<image src="../../../../static/CTKY/keche.png" class="busImage"></image>
										<view>{{items.busType}}</view>
									</view>
									<view>{{items.state}}</view>
								</view>
								<!-- 时间/价格 -->
								<view class="timePrice u-f-jsb">
									<view class="u-f-jsb">
										<image src="../../../../static/CTKY/time.png" class="timeImage"></image>
										<view>{{items.Time}}出发</view>
									</view>
									<view>{{items.price}}</view>
								</view>
								<!-- 上车点 -->
								<view class="Station">
									<view class="u-f-ac">
										<!-- 圆点 -->
										<view class="circle" style="background: #06B4FD;"></view>
										<view>{{items.startStation}}</view>
									</view>
									<view class="u-f-ac">
										<!-- 圆点 -->
										<view class="circle" style="background: #FC4646;"></view>
										<view>{{items.endStation}}</view>
									</view>
								</view>
							</view>
							
							<!-- 底部按钮 -->
							<view class="bottomView u-f-ac">
								<button v-if="items.isContact">联系司机</button>
								<button v-if="items.isQuXiao">取消</button>
								<button v-if="items.isXiangQing">详情</button>
								<button v-if="items.isErWeiMa" style="border: 0.1 solid #06B4FD; color: #06B4FD;" @tap="btnClick('QRCode')">二维码</button>
								<button v-if="items.isLocation" @tap="btnClick('carLocation')">查看车辆位置</button>
								<button v-if="items.isChose">在线选座</button>
								<button v-if="items.isDelete">删除</button>
								<button v-if="items.isZhiFu">去支付</button>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
    import popup from '@/pages_CTKY/components/CTKY/uni-popup/uni-popup.vue'
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		
		components:{
			popup
			},	
		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [{
						name: '待付款',
						id: 'daifukuan'
					},
					{
						name: '已完成',
						id: 'yiwancheng'
					},
					{
						name: '全部',
						id: 'quanbu'
					}
				],
				QRCodeArray:[
					{
						checkPlace:'A5',
						seatNum:'E1',
						lunchTime:'18:00',
						carNum:'闽C12345'
					},
					{
						checkPlace:'A5',
						seatNum:'E1',
						lunchTime:'18:00',
						carNum:'闽C12345'
					},
					{
						checkPlace:'A5',
						seatNum:'E1',
						lunchTime:'18:00',
						carNum:'闽C12345'
					}
				],
				orderList: [{
						list: [{
							iSreserve: true, //是否预定
							busType: '客车-传统',
							state: '待付款',
							Time: '2020-03-03  11:20',
							price: '￥32.5元',
							startStation: '泉州客运中心',
							endStation: '安溪',
							isQuXiao: true,
							isXiangQing: true,
							isZhiFu: true,
							isLocation: false,
							isErWeiMa: false,
							isChose: false,
							isDelete: false,
							isContact: false
						}, {
							iSreserve: false,
							busType: '客车-传统',
							state: '待使用',
							Time: '2020-03-03  11:20',
							price: '¥28元',
							startStation: '南平',
							endStation: '武夷山',
							isQuXiao: false,
							isXiangQing: true,
							isZhiFu: false,
							isLocation: true,
							isErWeiMa: true,
							isChose: true,
							isDelete: false,
							isContact: false
						}, {
							iSreserve: false,
							busType: '客车-传统',
							state: '已使用',
							Time: '2020-03-03  11:20',
							price: '¥38元',
							startStation: '惠安',
							endStation: '武夷山',
							isQuXiao: false,
							isXiangQing: true,
							isZhiFu: false,
							isLocation: false,
							isErWeiMa: false,
							isChose: false,
							isDelete: true,
							isContact: false
						},{
							iSreserve: false,
							busType: '客车-传统',
							state: '已使用',
							Time: '2020-03-03  11:20',
							price: '¥38元',
							startStation: '惠安',
							endStation: '武夷山',
							isQuXiao: false,
							isXiangQing: true,
							isZhiFu: false,
							isLocation: false,
							isErWeiMa: false,
							isChose: false,
							isDelete: true,
							isContact: false
						}, {
							iSreserve: false,
							busType: '客车-定制',
							state: '已取消',
							Time: '2020-03-03  11:20',
							price: '¥28元',
							startStation: '南平',
							endStation: '武夷山',
							isQuXiao: false,
							isXiangQing: true,
							isZhiFu: false,
							isLocation: true,
							isErWeiMa: true,
							isChose: true,
							isDelete: false,
							isContact: true
						}]
					},
					{
						list: [{
							iSreserve: true,
							busType: '客车-传统',
							state: '已取消',
							Time: '2020-03-03  11:20',
							price: '¥28元',
							startStation: '南平',
							endStation: '武夷山',
						}, ]
					},
					{
						list: [{
							iSreserve: true,
							busType: '客车-定制',
							state: '已取消',
							Time: '2020-03-03  11:20',
							price: '¥28元',
							startStation: '南平',
							endStation: '武夷山',
						}, ]
					},
				]
			}
		},
		async onLoad() {
			//获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
		},
		methods: {
			//tab切换,这里传过来的e是id
			async changeTab(e) {
				if (scrollTimer) {
					//多次切换只执行最后一次
					//clearTimeout：取消由 setTimeout 设置的定时器。
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
					//tabBar是上面定义的参数，getElSize是获取元素的size，nav-bar是选项卡
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i)
					//result.width:每个选项框的宽度
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabBar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms，等待swiper动画结束再修改tabBar
				//setTimeout(callback, delay, rest)：设定一个定时器。在定时到期以后执行注册的回调函数
				/*
				callback：回调函数 
				delay：延迟的时间，函数的调用会在该延迟之后发生，单位 ms（设置时间的长短会影响动画的快慢）
				rest：param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数
				*/
				scrollTimer = setTimeout(() => {
					//width:每个选项卡叠加之后的宽度 nowWidth：每个选项卡的宽度
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;
					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex != 0 && tabItem.loaded !== true) {
						// this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)
			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			//跳转到订单详情
			navToOrderDetail(items) {
				let data = {

				}
				uni.navigateTo({
					url: 'orderDetail'
				})
			},
			// 点击二维码
			btnClick:function(res) {
				//获取按钮的id
				var that = this; 
				switch(res){
					case 'QRCode':{
						that.$refs.popup.open();
						break;
					}
					case 'carLocation':{
						uni.navigateTo({
							// 跳转到查看班车位置
							url:'traditionCarMark',
						})
						break;
					}
					default: break;
				}
			}
		}
	}
</script>

<style lang='scss'>
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
		display: flex;
		/* 设置当前内容全部水平布局 */
	}

	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
		align-items: center;
		/* 设置内容中心点对齐 */
	}

	.u-f-ajc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
		/* 设置左右两边靠边布局 */
	}
	page,
	.content {
		/* padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); 
		box-sizing: content-box; */
		/* bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom); */
		height: 100%;
		background-color: #F4F8FA;
		/* 禁止页面滚动 */
		overflow: hidden;
		/* bottom: var(--window-bottom); */
		
	}

	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		z-index: 10;
		width: 100%;
		white-space: nowrap;
		line-height: 90upx;
		height: 90upx;
		background-color: #FFFFFF;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
	}

	.nav-item {
		font-size: 30upx;
		width: 33%;
		height: 90upx;
		line-height: 90upx;
		display: inline-block;
		text-align: center;
		color: #2C2D2D;
		position: relative;

		//下面的是加底下的横线
		&:after {
			content: '';
			width: 0;
			height: 0;
			border-bottom: 4upx solid #FC4646;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			transition: .3s;
		}
	}

	.current {
		color: #FC4646;

		&:after {
			width: 50%;
		}
	}

	/* 内容 */
	.swiper-box {
		height: 100%;
		padding: 20upx;
	}

	/* 可滚动区域 */
	.panelScrollBox {
		margin-top: 100rpx;
		/* 由于在手机上会有安全区域,所以可滚动高度暂时设置为92% */
		height: 92%;
		
	}

	/* 预定日期 */
	.reserveDate {
		padding: 0 10rpx;
		background-color: #06B4FD;
		color: #FFFFFF;
		border-radius: 24rpx;
		font-size: 24rpx;
	}

	/* 订单信息 */
	.orderContent {
		background-color: #FFFFFF;
		/* 设置圆角 */
		border-radius: 12upx;
		/* 设置外边距 */
		margin-bottom: 20upx;
	}

	/* 客车类型/状态 */
	.headClass {
		/* 字体大小 */
		font-size: 26upx;
		/* 字体颜色 */
		color: #333333;
		padding-bottom: 10upx;
		padding-top: 10upx;
		border-bottom: 1upx solid #ECECEC;
	}

	.busImage {
		width: 40rpx;
		height: 34rpx;
		margin-right: 10rpx;
	}

	.headClass>view:first-child {
		font-size: 34rpx;
		color: #2C2D2D;
		font-weight: 700;
		padding-left: 20upx;
	}

	.headClass>view:last-child {
		font-size: 28rpx;
		color: #666666;
		padding-right: 20upx;
	}

	/* 时间/价格 */
	.timePrice {
		padding-top: 20upx;
		font-size: 26upx;
	}

	/* 时间的图片 */
	.timeImage {
		width: 20rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}

	/* 时间 */
	.timePrice>view:first-child {
		padding-left: 70upx;
		line-height: 26rpx;
		color: #999999;
	}

	/* 价格 */
	.timePrice>view:last-child {
		padding-right: 20upx;
		color: #FC4646;
	}

	/* 上下车点 */
	.Station {
		display: block;
		padding-left: 70upx;
		font-size: 28upx;
		color: #666666;
		padding-bottom: 10upx;
	}

	/* 上下车点的圆点 */
	.circle {
		width: 10rpx;
		height: 10rpx;
		border-radius: 5rpx;
		margin-right: 10rpx;
	}

	.bottomView {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	/* 退票按钮 */
	.bottomView button {
		height: 54upx;
		border-radius: 10rpx;
		font-size: 26upx;
		line-height: 54rpx;
		border: 0.1 solid #999999;
		color: #666666;
		background-color: #FFFFFF;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
</style>
