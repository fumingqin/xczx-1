<template>
	<view>
		<!-- 上边view -->
		<view class="top-view">
			<!-- 上边类型 -->
			<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
				<view v-for="(item,index) in Typetext" :key="index" @click="change(index)">
					<view class="top-view-Type">
						<view v-if="!item.checked" class="fontStyle">{{item.text}}</view>
						<view v-if="item.checked" class="changefontStyle">{{item.text}}</view>
					</view>
				</view>
			</view>
			<!-- 文本域 -->
			<view class="top-view-textarea">
				<textarea v-model="ideaContent" placeholder="请描述问题，让达小弟更快帮您解决问题" maxlength="500" @input="Inputtext" />
				</view>
			<!-- 字数 -->
				<view class="top-view-bottomtext">
					{{textmarn}}/500字
				</view>
		</view>
		<!-- 下边view -->
		<view class="bottom-view">
			<view class="bottom-view-text">
				上传图片（选填）
			</view>
			<view class="bottom-view-ImageUpload">
				<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage"
				 :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel"
				 :enable-add="enableAdd" limit="3"></robby-image-upload>
			</view>
		</view>
		<!-- 提交 -->
		<view v-if="!btncheck" class="btnClass changecolor1" @click="successClick(1)">提交</view>
		<view v-if="btncheck" class="btnClass changecolor2" @click="successClick(2)">提交</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/pages_GRZX/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload2.vue';
	export default {
		data() {
			return {
				port:[],//存储图片base64
				ideaContent:'',//存储内容
				textmarn:0,//字数
				btncheck:false,//提交按钮是否变换
				typetext:[],
				//类型文字
				Typetext:[
					{
						text:'用户体验',
						checked:false,
						btncheck:false,
					},
					{
						text:'车票定价',
						checked:false,
						btncheck:false,
					},
					{
						text:'功能建议',
						checked:false,
						btncheck:false,
					},
					{
						text:'平台',
						checked:false,
						btncheck:false,
					},
					{
						text:'优惠活动',
						checked:false,
						btncheck:false,
					},
					{
						text:'导航定位',
						checked:false,
						btncheck:false,
					}
				],
				
				// 上传图片
				enableDel: true, //是否启动del
				enableAdd: true, //是否启动删除
				enableDrag: false, //是否启动拖动
				show: true, //是否显示
				serverUrl: 'http://localhost:2000/work/uploadWorkPicture', //模拟服务器地址
				serverUrlDeleteImage: 'http://localhost:2000/work/deleteWorkPicture', //模拟服务器删除
				formData: { //表格数据
					userId: 2
				},
				imagelist: [], //图像列表框
				detailInfo: { //详细信息
					imageData: [], //图像日期	
				},
				img:[],
			}
		},
		components: {
			robbyImageUpload, // 导入图片上传
		},
		methods: {
			deleteImage: function(e){
				console.log(e)
					var index = this.port.findIndex(item => {
						for(var i=0;i<e.allImages.length;i++){
					    if (item ==this.Typetext[i].text) {
								return true;
								}
							}
						})
					this.port.splice(index,1);
			},
			addImage: function(e){
				console.log(e)
				for(var i=0;i<e.allImages.length;i++){
					pathToBase64(e.allImages[i])
					.then(base64 => {
						this.port.push(base64);
					})
				}
			
			},
			Inputtext:function(e){ //字数
						 var that = this;
						 that.textmarn=e.detail.cursor; 
						 },
			change:function(e) {
				var that =this;
				for (var i = 0; i < that.Typetext.length; i++) {
					if (e == i) {
						if(that.Typetext[i].checked == false)
						{
							if(that.typetext.length<3){
								that.Typetext[i].checked = true;
								that.btncheck=true;
								that.typetext.push(that.Typetext[i].text);
							}else{
								uni.showToast({
									icon:'none',
									title:'意见类型最多选中3个'
								})
							}
						}
						else{
							that.Typetext[i].checked = false;	
							var index = that.typetext.findIndex(item => {
							    if (item ==that.Typetext[e].text) {
										return true;
									}
								})
							that.typetext.splice(index,1);
						}
					}
				}
				console.log(that.typetext);
				var list=that.Typetext.filter(item => {
					return item.checked == true;
				})
				if(list.length==0){
					that.btncheck=false;
				}
		},
		successClick:function(e){
			// console.log(this.ideaContent);
			// console.log(this.typetext);
			// var type='';
			// for(var i=0;i<this.typetext.length;i++)
			// {
			// 	type+=this.typetext[i] + ',';
			// }
			// type=type.substring(0,type.length-1)
			// console.log(type)
			
			// console.log(this.port[0]);
			// console.log(this.port[1]);
			// console.log(this.port[2]);
			// console.log(this.port);
			if(e==1)
			{
				uni.showToast({
					icon:'none',
					title:'请选择意见类型，谢谢'
				})
			}
			if(e==2)
			{
				console.log(this.ideaContent);
				console.log(this.typetext);
				var type='';
				for(var i=0;i<this.typetext.length;i++)
				{
					type+=this.typetext[i] + ',';
				}
				type=type.substring(0,type.length-1)
				console.log(type)
				console.log(this.port[0]);
				console.log(this.port[1]);
				console.log(this.port[2]);
				console.log(this.port);
			}
		}
	},
}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}

	.top-view {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 30upx 20upx 28upx 28upx;
	}

	.top-view-Type {
		width: 193upx;
		height: 68upx;
		border-radius: 34upx;
		background-color: #ECEEF0;
		margin-left: 29upx;
		margin-top: 30upx;
		text-align: center;
		line-height: 63upx;
	}
	.fontStyle {
		font-size: 28upx;
		color: #2C2D2D;
	}
	.changefontStyle{
		font-size: 28upx;
		color: #FFFFFF;
		width: 100%;
		text-align: center;
		background-color: #4CD964;
		width: 193upx;
		height: 68upx;
		border-radius: 34upx;
	}
	.top-view-textarea{
		margin-left: 43upx;
		margin-top: 30upx;
		font-size: 32upx;
	}
	.top-view-bottomtext{
		font-size: 28upx;
		color: #AAAAAA;
		padding: 50upx;
		text-align: right;
	}
	.bottom-view {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 0upx 20upx 28upx 28upx;
		padding-bottom: 10upx;

		.bottom-view-text {
			font-size: 34upx;
			color: #333333;
			margin-left: 28upx;
			padding-top: 43upx;
			font-weight: 500;
		}
	}
	.btnClass{
		margin-top: 20upx;
		margin-left: 4%;
		width: 92%;
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		padding: 30upx 0;
	}
	.changecolor1{
		background-color: #FFFFFF;
		color: #999999;
	}
	.changecolor2{
		background-color: #4CD964;
		color: #FFFFFF;
	}
</style>
