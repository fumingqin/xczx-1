<template>
	<view>
		<!-- 搜索栏 -->
		<view class="searchTopBox">
			<text class="locationTxt" @click="oncity">{{regionWeixin}}<text class="icon jdticon icon-xia"></text></text>
			<view class="searchBoxRadius">
				<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区名称" />
				<image class="searchImage" src="../../../static/LYFW/currency/search.png" />
			</view>
		</view>

		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="backCity"></citySelect>
			</view>
		</popup-layer>

		<!-- 搜索内容 -->
		<view :hidden="searchIndex==0" v-for="(item,index) in searchData" :key="index">
			<view class="Tk_scrollview" @click="godetail(item.ticketId)">
				<view class="Tk_item">
					<image class="Tk_image" :src="item.ticketImage[0]" />
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.ticketTitle}}</text>
						<view style="display: flex;">
							<text class="Tk_text2" v-for="(item2,index2) in item.ticketComment" :key="index2">{{item2}}</text>
						</view>
						<text class="Tk_text3">{{priceConversion(item.ticketAdultPrice)}}</text>

					</view>
				</view>
			</view>
		</view>


		<!-- 六宫格景区 -->
		<!-- 命名：six -->
		<view class="currencyTitle">热门产品</view>
		<view class="sixBackground">
			<view v-for="(item,index) in sixPalaceList" v-if="index < 6" :key="index" @click="godetail(item.ticketId)">
				<view class="darkCurtain"></view>
				<image :src="item.ticketImage[0]"></image>
				<view class="sixView">
					<text class="sixText1">{{item.ticketName}}</text>
					<text class="sixText2" :hidden="item.ticketEnglishName==''">{{item.ticketEnglishName}}</text>
				</view>
			</view>
		</view>


		<!-- 筛选列表 -->
		<view class="screenView">
			<view class="screenText" :class="{current: screenIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="screenText" :class="{current: screenIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="screenText" :class="{current: screenIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="priceView">
					<text :class="{active: priceOrder === 1 && screenIndex === 2}" class="jdticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && screenIndex === 2}" class="jdticon icon-shang xia"></text>
				</view>
			</view>
			<text :class="{active:screenIndex === 3}" class="cate-item jdticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>

		<!-- 景区列表 -->
		<view :hidden="screenIndex == 3">
			<view class="Tk_scrollview" v-for="(item,index) in scenicList" :key="index" v-if="index < scenicListIndex " @click="godetail(item.ticketId)">
				<view class="Tk_item">
					<image class="Tk_image" :src="item.ticketImage[0]" />
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.ticketTitle}}</text>
						<view style="display: flex;">
							<text class="Tk_text2" v-for="(item2,index2) in item.ticketComment" :key="index2">{{item2}}</text>
						</view>
						<text class="Tk_text3">{{priceConversion(item.ticketAdultPrice)}}</text>
					</view>
				</view>
			</view>
			<view style="text-align: center; padding: 24upx 0; margin-bottom: 48upx; font-size: 28upx; color: #aaa;">
				<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			</view>
		</view>

		<!-- 筛选的景区列表 -->
		<view :hidden="screenIndex !== 3 ">
			<view class="Tk_scrollview" v-for="(item,index) in scenicListCate" :key="index" @click="godetail(item.ticketId)">
				<view class="Tk_item">
					<image class="Tk_image" :src="item.ticketImage[0]" />
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.ticketTitle}}</text>
						<view style="display: flex;">
							<text class="Tk_text2" v-for="(item2,index2) in item.ticketComment" :key="index2">{{item2}}</text>
						</view>
						<text class="Tk_text3">{{priceConversion(item.ticketAdultPrice)}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 分类面板 -->
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view v-for="tItem in item.child" :key="tItem.id" class="cate-item b-b" :class="{active: tItem.id==cateId}"
						 @click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>



	</view>
</template>


<script>
	import citySelect from '@/components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue'
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				searchIndex: 0, //搜索框是否启用状态值
				searchValue: '', //搜索框值
				searchData: '', //搜索后的值

				sixPalaceList: [], //六宫格列表
				screenIndex: 0, //筛选框默认值
				priceOrder: 0, //1 价格从低到高  2价格从高到低
				cateMaskState: 0, //分类面板展开状态

				scenicList: [], //景区列表
				scenicListCate: [], //筛选后的景区列表
				scenicListIndex: 10, //列表默认数量

				loadingType: 0, //加载更多状态
				loadingText: {
					down: '上拉加载更多',
					refresh: '正在加载...',
					nomore: '没有更多了',
				},

				cateId: 0, //已选三级分类id
				cateList: [], //分类数组
				cateValue: '', //分类筛选值

				regionWeixin: '请选择', //微信地区数值
			}
		},

		components: {
			citySelect,
			popupLayer
		},

		mounted() {
			this.$refs.popupRef.close();
		},

		onLoad: function(options) {
			uni.showLoading({
				title:'加载中...',
				icon:'loading'
			})
			// #ifdef H5
			uni.showToast({
				title:'公众号当前定位无法启用，已默认定位泉州市',
				icon:'none'
			})
			this.regionWeixin = '泉州市'; //h5无法自动定位，采用手动赋值
			// #endif
			this.cateId = options.tid;
			this.loadCateList(options.fid, options.sid);
			this.Getpostion();
		},
		
		onShow:function(){
			this.getAuthorizeInfo();//检查是否开启定位
		},
		
		onPullDownRefresh: function() {
			this.lyfwData(); //请求接口数据
		},

		onReachBottom() {
			this.getMore();
		},

		methods: {
			//请求模拟接口数据
			lyfwData: function() {
				// console.log(this.regionWeixin)
				// 六宫格
				uni.request({
					url: $lyfw.Interface.lyky_GetticketSearchByrequestArea_Six.value,
					method: $lyfw.Interface.lyky_GetticketSearchByrequestArea_Six.method,
					data: {
						requestArea: this.regionWeixin,
					},
					// header: {'content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						// console.log(res)
						if (res.data.msg == '搜索景区信息成功！') {
							this.sixPalaceList = res.data.data;
							uni.stopPullDownRefresh();
							uni.hideLoading()
						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							this.sixPalaceList = '';
							uni.hideLoading()
							uni.stopPullDownRefresh();
							uni.showToast({
								title: '该地区暂无景点信息',
								icon: 'none'
							})
						}

					},
					fail: function(ee) {
						// console.log(ee)
						uni.stopPullDownRefresh();
						uni.hideLoading()
					}
				})

				// 请求景区列表
				uni.request({
					url: $lyfw.Interface.lyky_GetticketSearchByrequestArea.value,
					method: $lyfw.Interface.lyky_GetticketSearchByrequestArea.method,
					data: {
						requestArea: this.regionWeixin,
					},
					// header: {'content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						// console.log(res)
						if (res.data.msg == '搜索景区信息成功') {
							this.scenicList = res.data.data;
							uni.stopPullDownRefresh();
							uni.hideLoading()
						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							this.scenicList = '';
							uni.stopPullDownRefresh();
							uni.hideLoading()
							uni.showToast({
								title: '该地区暂无景点信息',
								icon: 'none'
							})
						}
					},
					fail:function(){
						uni.stopPullDownRefresh();
						uni.hideLoading()
					}
				})
				
			},

			//获取定位数据
			Getpostion: function() {
				setTimeout(() => {
						uni.getStorage({
							key: 'wx_position',
							success: (res) => {
								// console.log(res)
								this.regionWeixin = res.data;
							},
							fail: (res) => {
								// #ifdef APP-NVUE
								uni.showToast({
									title:'请选择地区',
									icon:'none'
								})
								// #endif
								

							},
							complete: () => {
								this.lyfwData(); //请求接口数据
							}
						}),
						uni.getStorage({
							key: 'app_position',
							success: (res) => {
								// console.log(res)
								if (res.data !== undefined) {
									this.regionWeixin = res.data.city;
								}
							},
							fail: (res) => {
								// #ifdef APP-NVUE
								uni.showToast({
									title:'请选择地区',
									icon:'none'
								})
								// #endif
							},
							complete: () => {
								this.lyfwData(); //请求接口数据
							}
						})
				}, 1000)
			},

			//打开地区选择器
			oncity() {
				this.$refs.popupRef.show();
			},

			//地区获取
			backCity(e) {
				if (e !== 'no' && e !== 'yes') {
					// console.log(e)
					this.regionWeixin = e.cityName
					this.$refs.popupRef.close();
					this.lyfwData();
					this.screenIndex = 0;
					this.searchIndex = 0;
				} else if (e == 'yes') {
					// #ifndef APP-PLUS
					uni.getStorage({
						key: 'wx_position',
						success: (res) => {
							// console.log(res)
							this.regionWeixin = res.data;
							this.lyfwData(); //请求接口数据
						}
					}),
					// #endif
					// #ifdef APP-PLUS
					uni.getStorage({
						key: 'app_position',
						success: (res) => {
							// console.log(res)
							if (res.data !== undefined) {
								this.regionWeixin = res.data.city;
								this.lyfwData(); //请求接口数据
							}
						}
					})
					// #endif
					this.$refs.popupRef.close();
				} else {
					this.$refs.popupRef.close();
				}
			},



			//加载分类
			async loadCateList(fid, sid) {
				let list = await this.$api.sceniclist('cateList');
				let cateList = list.filter(item => item.pid == fid);
				cateList.forEach(item => {
					let tempList = list.filter(val => val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},

			//搜索框-搜索
			searchNow: function() {
				if (this.searchValue == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// retuan false;
				}
				//搜索请求
				uni.hideKeyboard()
				uni.showLoading({
					title: '正在搜索',
				})
				uni.request({
					url: $lyfw.Interface.lyky_GetticketSearchBysearchValue.value,
					method: $lyfw.Interface.lyky_GetticketSearchBysearchValue.method,
					data: {
						// regionWeixin :  this.regionWeixin,
						searchValue: this.searchValue,
					},
					header: {
						'content-type': 'application/json'
					},
					
					success: (res) => {
						console.log(res)
						if (res.data.msg == '搜索景区信息成功！') {
							this.searchData = res.data.data;
							this.searchValue = ''
							this.searchIndex = 1;
							uni.hideLoading()
						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							uni.hideLoading()
							uni.showToast({
								title: '查不到相关景区！如:武夷/武夷山',
								icon: 'none',
								duration: 2000
							});
							this.searchValue = ''

						}else if(res.data.msg == '获取数据异常'){
							uni.hideLoading()
							uni.showToast({
								title: '数据异常，请联系客服',
								icon: 'none',
								duration: 2000
							});
							this.searchValue = ''
						}
					}
				})

			},

			//路由整合
			godetail: function(e) {
				uni.navigateTo({
					url: './tp_ticketsDetails?ticketId=' +e
				})
			},

			//筛选点击
			tabClick(index) {
				if (this.screenIndex === index && index !== 2) {
					return;
				}
				this.screenIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.clickSork();
			},

			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},

			//分类点击
			changeCate: function(item) {
				// console.log(item)
				this.cateId = item.id;
				this.cateValue = item.name;
				this.screenIndex = 3;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				uni.showLoading({
					title: '正在搜索',
				})
				this.clickSork();

			},


			//点击排序
			clickSork: function() {
				var sc = this.scenicList;
				this.scenicList = [];
				//筛选，数据直接前端筛选了
				if (this.screenIndex == 0) {
					sc.sort((a, b) => a.ticketId - b.ticketId)
					this.cateId = '';
				}
				if (this.screenIndex == 1) {
					sc.sort((a, b) => b.ticketSales - a.ticketSales)
					this.cateId = '';
				}
				if (this.screenIndex == 2) {
					sc.sort((a, b) => {
						if (this.priceOrder == 1) {
							return a.ticketAdultPrice - b.ticketAdultPrice;
						}
						return b.ticketAdultPrice - a.ticketAdultPrice;
					})
					this.cateId = '';
				}
				if (this.screenIndex == 3) {
					let screen = sc.filter(item => {
						return item.ticketTitle == this.cateValue;
					})
					this.scenicListCate = screen;
					uni.hideLoading()
				}

				this.scenicList = this.scenicList.concat(sc);
			},

			//价格转换
			priceConversion: function(data) {
				// console.log(data)
				if (data == '') {
					return '开放景区'
				} else {
					return '¥' + data + '元起'
				}
			},

			//加载信息
			getMore(){
				this.loadingType = 1;

				if (this.scenicListIndex < this.scenicList.length) {
					var a = this.scenicListIndex + 10;
					this.scenicListIndex = a;
					this.loadingType = 0;
				}
				if (this.scenicListIndex >= this.scenicList.length) {
					this.loadingType = 2;
				}
			},
			
			//------------------------------开启定位功能----------------------------------
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
						// console.log("你允许授权")
					},
					fail() { // 拒绝授权
						that.openConfirm();
						// console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			
			// 获取地理位置
			getLocationInfo() {
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						// console.log(res);
					}
				});
			},
			
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						// console.log(res)
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	//搜索框
	.searchTopBox {
		display: flex;
		text-overflow: ellipsis; //文本溢出：省略号
		margin: 32upx 32upx;

		.locationTxt {
			color: #333333;
			font-size: 36upx;
			font-weight: bold;
			text-overflow: ellipsis;
			margin-top: 16upx;
			width: 25%;
			text-overflow: ellipsis; //文本溢出：省略号
		}

		/* 向下小图标 */
		.icon {
			font-size: 20upx;
			color: #AAAAAA;
			margin-left: 15upx;
		}

		.searchBoxRadius {
			/* #ifdef H5 */
			width: 80%;
			/* #endif */
			/* #ifndef H5 */
			width: 76%;
			/* #endif */
			height: 78upx;
			background-color: #fff;
			border-radius: 46upx;
			background: #f5f5f5;

			.searchImage {
				padding-left: 24upx;
				padding-top: 18upx;
				width: 48upx;
				height: 48upx;
			}

			.inputIocale {
				position: absolute;
				height: 72upx;
				padding-top: 4upx;
				padding-left: 88upx;
				font-size: 30upx;
			}

		}
	}

	//标题
	.currencyTitle {
		font-size: 36upx;
		font-weight: bold;
		color: #333333;
		padding-left: 32upx;
		margin-top: 24upx;
		margin-bottom: 8upx;
	}

	//六宫格样式
	.sixBackground {
		display: flex;
		justify-content: space-between; //换行留白
		flex-direction: row; //换行对齐
		flex-wrap: wrap; //循环换行
		padding: 20upx;

		//黑色暗幕，在图片上方覆盖一层渐变黑
		.darkCurtain {
			position: absolute;
			overflow: hidden;
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			margin: 12upx 12upx;
			background: rgba(7, 17, 27, 0.2);
		}

		image {
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			opacity: 1.5;
			margin: 12upx 12upx;
		}

		.sixView {
			position: absolute;
			text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
			white-space: nowrap;
			overflow: hidden;
			color: #fff;
			max-width: 192upx;
			margin-left: 24upx;
			margin-top: -106upx;

			.sixText1 {
				font-weight: bold;
				font-size: 30upx;
			}

			.sixText2 {
				display: block;
				font-size: 24upx;
			}
		}
	}

	//筛选样式
	.screenView {
		left: 0;
		display: flex;
		width: 97%;
		height: 80upx;
		background: #fff;
		z-index: 10;
		position: sticky;
		top: 0;

		.screenText {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #888;
			position: relative;

			&.current {
				color: #06B4FD;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #06B4FD;
				}
			}
		}

		.priceView {
			display: flex;
			flex-direction: column;

			.jdticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: #06B4FD;
				}

			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: #06B4FD;
		}
	}

	//Y轴滚动视图
	.Tk_scrollview {
		padding: 16upx 32upx;
		margin: 0 auto;

		.Tk_item {
			display: flex;

			.Tk_image {
				width: 182upx;
				height: 152upx;
				border-radius: 12upx;
				margin: 24rpx 0rpx;
			}

			.Tk_bacg {
				margin-top: 20upx;
				margin-left: 8upx;
			}

			.Tk_text1 {
				display: flex;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				width: 480upx; //内容宽度
				margin-left: 16upx;
			}

			.Tk_text2 {
				padding: 8upx 12upx;
				margin-top: 16upx;
				margin-left: 16upx;
				text-align: center;
				font-size: 24upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.Tk_text3 {
				font-size: 24upx;
				margin-top: 24upx;
				text-align: right;
				color: #FF6600;
				display: block; // 让字体换行
			}
		}
	}
</style>
