<template>
	<view class="content">
		<view style="font-size:40rpx;margin: 30rpx 0;font-weight: bold;width: 700rpx;text-align: center;">{{Title}}</view>
		<view style="width: 700rpx;font-size: 32rpx;" v-html="contentHTML"></view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				Title:'',
				contentHTML: '',
				strings: "<p style=\"white-space: normal; line-height: 1.5em; text-align: center;\"><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 15px; letter-spacing: 1.8px; text-align: justify; text-indent: 30px; background-color: rgb(255, 255, 255);\">&nbsp; &nbsp; &nbsp;&nbsp;<img src=\"http://app.zzcyjt.com:8888/image/ueditor/20200116/1579143344523007299.jpg\" title=\"1579143344523007299.jpg\" alt=\"启动仪式.jpg\"/></span></p><p style=\"white-space: normal; line-height: 1.5em;\"><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 15px; letter-spacing: 1.8px; text-align: justify; text-indent: 30px; background-color: rgb(255, 255, 255);\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"color: rgb(103, 103, 103); font-family: PingFangSC-light; letter-spacing: 1.2px;\"><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 1.8px; text-indent: 28px;\"><span style=\"letter-spacing: 1.8px; text-indent: 30px;\">&nbsp; &nbsp; &nbsp;&nbsp;</span><span style=\"letter-spacing: 1.8px; text-indent: 30px;\">古雷</span><span style=\"letter-spacing: 1.8px; text-indent: 30px;\">达达通项目</span>于2019年10月进行现场踏勘和站点选址，11月进行站点建设，于2020年1月建成并投入使用。</span></span></span><span style=\"letter-spacing: 1.8px;\">项目首次采用定位地桩式亚米级站点，并加装电子驿站、工作亭等便民服务设施，租车时可采用“漳州达达通”手机APP和一卡通两种方式，同时可以使用相同方式乘坐公交车，与现有的达达通公共自行车系统互联互通，一卡通用。</span>&nbsp;</span></span></span></p><p style=\"white-space: normal; line-height: 1.5em;\"><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 15px; letter-spacing: 1.8px; text-align: justify; text-indent: 30px; background-color: rgb(255, 255, 255);\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\">&nbsp;&nbsp; &nbsp;&nbsp;</span>古雷</span>达达通项目建设30个电子驿站站点，投入100辆公共自行车和200辆公共助力自行车，站点主要分布在新港城居民住宅区、古雷港各行政机关所在地以及重要公建场所，尽可能方便百姓及政府公务人员外出办事，也更好地响应绿色发展、绿色出行的新发展理念。</span><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 15px; letter-spacing: 1.8px; text-align: justify; text-indent: 30px; background-color: rgb(255, 255, 255);\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"color: rgb(103, 103, 103); font-family: PingFangSC-light; letter-spacing: 1.2px;\"><span style=\"color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 1.8px;\">项目的启动不仅方便了古雷港广大百姓的绿色出行，更将进一步完善古雷港城市服务功能，为建设富美新漳州作出新的贡献。</span></span></span></span></span></span></p><p style=\"white-space: normal; line-height: 1.5em;\"><strong><span style=\"font-size: 20px;\">收费方式：</span></strong><br/></p><p></p><section powered-by=\"xiumi.us\" style=\"white-space: normal; margin: 0px; padding: 0px 20px; max-width: 100%; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; text-align: justify; background-color: rgb(255, 255, 255); font-size: 15px; letter-spacing: 1.8px; line-height: 1.8; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; line-height: 1.5em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"letter-spacing: 1.8px;\">1.</span><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\">公共助力自行车骑行前15分钟免费，后每20分钟向用户收取2元（骑行前15分钟内免费，后不足20分钟按20分钟计算）；</span></span></span></span></span></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; line-height: 1.5em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\"><span style=\"letter-spacing: 1.8px;\">2.公共自行车，骑行前1小时免费，后每1小时向用户收取1元（骑行前1小时内免费，后不足1小时按1小时计算）。</span></span></span></span></span></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; line-height: 1.5em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 1.5em; text-align: center; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><img src=\"http://app.zzcyjt.com:8888/image/ueditor/20200116/1579143272934017708.jpg\" title=\"1579143272934017708.jpg\" alt=\"古雷助力车01.jpg\"/></p></section><p></p><p><br/></p>",
			}
		},
		onLoad(e) {
			this.getNewsDetail(e.id);
		},
		methods: {
			getNewsDetail: function(ID) {
				var that=this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetNewsByAID.Url,
					method: $DDTInterface.DDTInterface.GetNewsByAID.method,
					data:{
						AID:ID
					},
					success(res) {
						uni.setNavigationBarTitle({
							title: res.data.data[0].Type
						})
						that.Title=res.data.data[0].Title;
						that.contentHTML=res.data.data[0].Body;
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 100%;
	}
</style>
