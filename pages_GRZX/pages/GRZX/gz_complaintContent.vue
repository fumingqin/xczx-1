<template>
	<view>
		<view class="example-body" v-if="complaintList2.or_Type=='投诉成功' || complaintList2.or_Type=='审核中' || complaintList2.or_Type=='已提交'">
			<uni-steps :options="list" active-color="#007AFF" :active="type" />
		</view>
		<view class="example-body" v-if="complaintList2.or_Type=='投诉失败'">
			<uni-steps :options="list2" active-color="#007AFF" :active="type2" />
		</view>
		
		<view class="cc_content">
			<text class="ct_text1">类别</text>
			<text v-if="complaintList2.or_entrance==0" class="ct_text2">{{complaintList2.or_class}}</text>
			<text v-if="complaintList2.or_entrance==1" class="ct_text2">{{complaintList2.or_complaintObject}}</text>
			<text class="ct_text1">投诉内容</text>
			<text class="ct_text2">{{complaintList2.or_content}}</text>
		</view>
		
		<view class="cc_content" v-if="complaintList2.or_Type=='投诉成功' || complaintList2.or_Type=='投诉失败'">
			<text class="ct_text1">审核人</text>
			<text class="ct_text2">{{complaintList2.or_name}}</text>
			<text class="ct_text1">审核内容</text>
			<text class="ct_text2">{{complaintList2.or_examineContent}}</text>
		</view>
		
	<!-- 	<view v-if="complaintList2.or_Type=='投诉失败'">
			<view class="cl_bottom"></view>
			<view class="tjButton" @click="jump">修改投诉</view>
		</view> -->
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	import uniSteps from '@/pages_GRZX/components/GRZX/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps,
		},
		data() {
			return {
				complaintList2:{
					or_Type:'',
					or_class:'',
					or_content: '',
					or_examineContent:'',
					or_name:'',
					or_entrance:'',
					or_complaintObject:'',
					or_nameId:'',
				},
				or_number:'',
				type: 0,
				type2: 0,
				list: [{
					title: '已提交'
				}, {
					title: '审核中'
				},{
					title: '投诉成功'
				}],
				
				list2: [{
					title: '已提交'
				}, {
					title: '审核中'
				},{
					title: '投诉失败'
				}],
			}
		},
		onLoad(options) {
			this.or_number = JSON.parse(options.or_number);
			this.contentData();
		},
		methods: {
			//-----------------读取静态数据json.js-------------------------------
			// async routeInit() {
			// 	let complaintList2 = await this.$api.lyfwcwd('complaintList2');
			// 	this.complaintList2 = complaintList2.data;
			// 	// console.log(this.complaintList2)
			// 	if(this.complaintList2.or_Type==0){
			// 		this.type=0;
			// 		this.type2=0;
			// 	}else if(this.complaintList2.or_Type==1){
			// 		this.type=1;
			// 		this.type2=1;
			// 	}else if(this.complaintList2.or_Type==2){
			// 		this.type=2
			// 		this.type=2;
			// 	}else if(this.complaintList2.or_Type==3){
			// 		this.type=2;
			// 		this.type2=2;
			// 	}
			// },
			contentData:function(){
				var that=this;
				console.log(that.or_number)
				uni.request({
					url:$lyfw.Interface.GRZX_complaintContent.value,
					method:$lyfw.Interface.GRZX_complaintContent.method,
					header: {'content-type': 'application/json'},
					data:{
						or_number:that.or_number,
					},
					success:(e) => {
						console.log(e)
						that.complaintList2=e.data.data[0];
						if(this.complaintList2.or_Type=='审核中'){
							this.type=1;
							this.type2=1;
						}else if(this.complaintList2.or_Type=='投诉成功'){
							this.type=2;
							this.type2=2;
						}else if(this.complaintList2.or_Type=='投诉失败'){
							this.type=2;
							this.type2=2;
						}
					}
				})
			},
			
			//------------------------------路径跳转----------------------------------------
			// jump() {
			// 	uni.navigateTo({
			// 		url: './gz_complaintsPage?or_entrance=' + this.complaintList2.or_entrance + '&or_class=' + this.complaintList2.or_class + '&or_name=' + this.complaintList2.or_name +
			// 			'&or_nameId=' + this.complaintList2.or_nameId + '&or_content=' + this.complaintList2.or_content
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #efeff4;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
		padding-top: 60upx;
		padding-bottom: 40upx;
	}
	
	.cc_content{
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-top: 20upx;
		padding-left: 30upx;
		padding-right: 30upx;
		
		.ct_text1{
			display: flex;
			font-weight: bold;
			font-size: 32upx;
			padding-top: 30upx;
		}
		
		.ct_text2{
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 31upx;
			display: block;
			color: #666;
			border-bottom: 1px #F5F5F5 dotted;
		}
	}
	
	//底部多余
	.cl_bottom{
		width: 100%;
		height: 150upx;
	}
	
	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
