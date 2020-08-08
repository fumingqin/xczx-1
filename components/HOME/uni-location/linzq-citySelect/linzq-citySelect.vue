<template>
	<div class="wrapper" :style="'top:'+statusBarHeight+'px'">
		<div class="header">
			<view class="back_div">
				<image class="back_img jdticon icon-zuo" @click="back_city()"  mode=""></image>
			</view>
			<input class="input" @input="onInput" placeholder="中文/拼音/首字母" v-model="searchValue" />
		</div>
		<scroll-view class="calendar-list" scroll-y="true" :scroll-into-view="scrollIntoId">
			<view v-if="disdingwei" id="hot">
				<!-- 定位模块 -->
				<view class="dingwei">
					<view class="dingwei_Tips">
						当前定位
					</view>
					<view class="dingwei_city">
						<view class="dingwei_city_one" @click="back_city2">
							{{position}}
						</view>
						<view class="dingweis_div" @click="getWarpweft">
							
							<text>{{po_tips}}</text>
						</view>
					</view>
				</view>

				<!-- 最近模块 -->
				<view class="dingwei" v-if="Visit.length>=0">
					<view class="dingwei_Tips">
						最近访问
					</view>
					<view class="dingwei_city dingwei_city_zuijin">
						<view class="dingwei_city_one toright" v-for="(item,index) in Visit" :key="index" v-if="index<2" @click="back_city(item)">
							{{item.cityName}}
						</view> 
					</view>
				</view>

			</view>


			<!-- 城市列表 -->
			<view v-if="searchValue == ''" v-for="(item, index) in list" :key="index" :id="getId(index)" >
				<!-- <view class="letter-header">{{ getId(index) }}</view> -->
				<view class="city-div" v-for="(city, i) in item" :key="i" @click="back_city(city)">
					<text class="city">{{ city.cityName }}</text>
				</view>
			</view>
			<!-- 搜索结果 -->
			<view class="city-div" v-for="(item, index) in searchList" :key="index" @click="back_city(item)">
				<text class="city">{{ item.cityName }}</text>
			</view>
		</scroll-view>

		<!-- 右侧字母 -->
		<view class="letters" v-if="searchValue == ''">
			<view class="letters-item" @click="scrollTo('hot')">最近</view>
			<view class="letters-item" v-for="item in letter" :key="item" @click="scrollTo(item)">{{ item }}</view>
		</view>

		<!-- 选中之后字母 -->
		<view class="mask" v-if="showMask">
			<view class="mask-r">{{selectLetter}}</view>
		</view>
	</div>
</template>

<script>
	import Citys from '../city.js';
	import amapFile from '../amap/amap-wx.js'
	export default {
		components: {},
		props: {},

		computed: {
			hotCity() {
				return Citys.hotCity;
			},

			citys() {
				return Citys.cities;
			}
		},

		data() {
			return {
				statusBarHeight: this.statusBarHeight,
				ImgUrl: this.ImgUrl,
				letter: [],
				selectLetter: '',
				searchValue: '',
				scrollIntoId: '',
				list: [],
				tId: null,
				searchList: [],
				showMask: false,
				disdingwei: true,
				Visit: [], //最近访问
				position: '',
				longitude: '', //经度
				latitude: '', //纬度
				seconds: 3,
				po_tips: '重新定位',
				markersData:{
				        latitude: '',//纬度
				        longitude: '',//经度
				        key: "db69a778b86b57c2d8d16af164f185b5"//申请的高德地图key（申请的web key）
				      },
				      gpsCode:'',
			}
		},

		created() {
			//获取存储的最近访问
			var that = this
			uni.getStorage({
				key: 'Visit_key',
				success: function(res) {
					that.Visit = res.data
				}
			});
			//获取定位 经度纬度
			that.getWarpweft()
			//获取city.js 的程序字母
			var mu = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y',
				'z'
			];
			var tmp = [];
			for (var i = 0; i < mu.length; i++) {
				var item = mu[i];
				for (var j = 0; j < this.citys.length; j++) {
					var py = this.citys[j].py;
					if (py.substring(0, 1) == item) {
						if (tmp.indexOf(item) == -1) {
							this.list[i] = [this.citys[j]];
							tmp.push(item);
							this.letter.push(item.toUpperCase());
						} else {
							this.list[i].push(this.citys[j]);
						}
					}
				}
			}
		},
		methods: {
			//定位授权
			getId(index) {
				return this.letter[index];
			},
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
					var _this=this;
					uni.authorize({
						scope: a,
						success() { //1.1 允许授权
							_this.getLocationInfo();
						},
						fail(){    //1.2 拒绝授权
							// console.log("你拒绝了授权，无法获得周边信息")
						}
					})
				},

			scrollTo(letter) {
				this.showMask = true
				this.selectLetter = letter == 'hot' ? '最' : letter
				setTimeout(() => {
					this.showMask = false
				}, 300);
				this.scrollIntoId = letter;
			},


			query(source, text) {
				let res = [];
				var self = this;
				res = source.filter(item => {
					const arr = [];
					let isHave = false;
					Object.keys(item).forEach(prop => {
						const itemStr = item[prop];
						self.isString(itemStr) &&
							itemStr.split(',').forEach(val => {
								arr.push(val);
							});
					});
					arr.some(val => {
						isHave = new RegExp('^' + text).test(val);
						return isHave;
					});
					return isHave;
				});
				
				return res;
			},

			isString(obj) {
				return typeof obj === 'string';
			},

			onInput(e) {
				const value = e.target.value;
				
				if (value !== '' && this.citys && this.citys.length > 0) {
					const queryData = this.query(this.citys, String(value).trim());
					this.searchList = queryData;
					this.disdingwei = false
				} else {
					this.searchList = [];
					this.disdingwei = true
				}
			},
            
			back_city(item) {
				if (item) {
					this.$emit('back_city', item);
					//unshift 把数据插入到首位，与push相反
					this.Visit.unshift(item)
					this.searchValue = "";
					this.disdingwei = true
					var arr = this.Visit
					//数组去重
					function distinct(arr) {
						let newArr = []
						for (let i = 0; i < arr.length; i++) {
							if (newArr.indexOf(arr[i]) < 0) {
								newArr.push(arr[i])
							}
						}
						return newArr
					}
					this.Visit = distinct(arr)
					// console.log(this.Visit, "---最近访问")
					uni.setStorage({
						key: 'Visit_key',
						data: this.Visit
					});
				} else {
					this.$emit('back_city', 'no');
				}
			},
			back_city2(){
				this.$emit('back_city', 'yes');
			},
			
			getWarpweft() {
				var that = this
				that.po_tips = '定位中...'
				uni.getLocation({
					type:'wgs84',
					geocode:true,
					success: function(res) {
						// console.log(res)
							uni.setStorage({
								key: 'app_position',
								data:res.address,
							})
							that.loadCity();//小程序-调用高德
						},
				})
			},
			//把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置
			    loadCity:function(){
			      var myAmapFun = new amapFile.AMapWX({ 
					  key: this.markersData.key,
					  });
			      // console.log(myAmapFun);
			      myAmapFun.getRegeo({
			        success:(data) =>{
						// console.log(data)
						this.position =data[0].regeocodeData.addressComponent.city
			          uni.setStorage({
			          	key: 'wx_position',
			          	data:this.position
			          })
					  this.po_tips = '重新定位'
			        },
			        fail:()=>{
						this.po_tips = '重新定位'
					}
			      });
			 
			    },
		}
	};
</script>

<style scoped>
	.wrapper {
		position: fixed;
		z-index: 999999;
		background: #ffffff;
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
	}

	.mask {
		position: absolute;
		bottom: 0upx;
		top: 83upx;
		left: 0upx;
		right: 0upx;
		width: 750upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0);
	}

	.mask-r {
		height: 120upx;
		width: 120upx;
		border-radius: 60upx;
		display: flex;
		background: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
		font-size: 40upx;
		color: #FFFFFF
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #ffffff;
	}

	.header {
		height: 85upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}


	.back_div {
		width: 65upx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back_img {
		width: 35upx;
		height: 35upx;
		color: #4CD964;
	}

	.input {
		font-size: 28upx;
		width: 620upx;
		height: 55upx;
		border-radius: 40upx;
		background-color: #F5F5F5;
		padding-left: 20upx;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.title {
		font-size: 30upx;
		color: white;
	}

	.show {
		left: 0;
		width: 100%;
		transition: left 0.3s ease;
	}

	.hide {
		left: 100%;
		width: 100%;
		transition: left 0.3s ease;
	}


	.title {
		font-size: 30upx;
		color: white;
	}

	.calendar-list {
		position: absolute;
		top: 83upx;
		bottom: 0upx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.letters {
		position: absolute;
		right: 30upx;
		bottom: 0px;
		width: 50upx;
		top: 260upx;
		color: #2f9bfe;
		text-align: center;
		font-size: 24upx;
	}

	.letters-item {
		margin-bottom: 5upx;
	}

	.letter-header {
		height: 45upx;
		font-size: 22upx;
		color: #333333;
		padding-left: 24upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #ebedef;

	}

	.city-div {
		width: 660upx;
		height: 85upx;
		margin-left: 24upx;
		border-bottom-width: 0.5upx;
		border-bottom-color: #ebedef;
		border-bottom-style: solid;
		display: flex;
		align-items: center;
		margin-right: 35upx;
	}

	.city {
		font-size: 28upx;
		color: #000000;
		padding-left: 30upx;
	}

	.dingwei {
		width: 100%;
		padding-top: 25upx;
		box-sizing: border-box;
		margin-bottom: 26upx;
	}

	.dingwei_Tips {
		margin-left: 24upx;
		margin-bottom: 24upx;
		font-size: 24upx;
		color: #A5A5A5;
	}

	.dingwei_city {
		width: 100%;
		height: 60upx;
		padding-left: 55upx;
		padding-right: 70upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.dingwei_city_one {
		width: 185upx;
		height: 60upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
		font-size: 32upx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dingweis_div {
		display: flex;
		align-content: flex-end;
		align-items: center;
		font-size: 24upx;
		color: #FD5745;
	}

	.dingweis {
		width: 32upx;
		height: 32upx;
	}

	.dingwei_city_zuijin {
		display: flex;
		justify-content: flex-start;
	}

	.toright {
		margin-right: 25upx;
	}
</style>
