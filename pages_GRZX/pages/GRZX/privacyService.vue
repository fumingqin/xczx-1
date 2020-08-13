<template>
	<view>
		<!-- <view class="content">
			<rich-text :nodes="text" style="width: 100%;"></rich-text>
		</view> -->
		<view class="textClass" v-if="title=='软件许可及服务协议'">
			<view class="mt">
				欢迎你使用{{systemName}}软件及服务！
			</view>
			<view class="mt">
				一、软件使用协议
			</view>
			<view class="mt">
				本协议是{{companyName}}公司制作的{{systemName}}软件（以下简称“本软件产品”）的法律协议。
				一旦安装、复制或以其他方式使用本软件产品，即表示同意接受协议各项条件的约束。
			</view>
			<view class="mt">
				二、软件产品保护条款
			</view>
			<view class="mt">
				1）本软件产品之著作权及其它知识产权等相关权利或利益（包括但不限于现已取得或未来可取得之著作权、专利权、商标权、
				营业秘密等）皆为{{companyName}}公司所有。本软件产品受中华人民共和国版权法及国际版权条约和其他知识产权法及条约的保护
				。用户仅获得本软件产品的非排他性使用权。
			</view>
			<view class="mt">
				2）用户不得：删除本软件及其他副本上一切关于版权的信息；对本软件进行反向工程，如反汇编、反编译等；
			</view>
			<view class="mt">
				3）本软件产品以现状方式提供，{{companyName}}公司不保证本软件产品能够或不能够完全满足用户需求，在用户手册、帮助
			文件、使用说明书等软件文档中的介绍性内容仅供用户参考，不得理解为对用户所做的任何承诺。
			{{companyName}}有限公司保留对软件版本进行升级，对功能、内容、结构、界面、运行方式等进行修改或自动更新的权利。
			</view>
			<view class="mt">
				4）为了更好地服务于用户，或为了向用户提供具有个性的信息内容的需要，
				本软件产品可能会收集、传播某些信息，但{{companyName}}公司承诺不向未经授权的第三方提供此类信息，以保护用户隐私。
			</view>	
			<view class="mt">
				三、{{companyName}}公司具有对以上各项条款内容的最终解释权和修改权。如用户对{{companyName}}公司的解释或修改有异议，
				应当立即停止使用本软件产品。用户继续使用本软件产品的行为将被视为对{{companyName}}公司的解释或修改的接受。
			</view>
			<view class="mt" style="text-align: right; margin-bottom: 30upx;">
				{{companyName}}有限公司
			</view>
		</view>
		<view class="textClass" v-if="title=='隐私政策'">
			<view class="mt">
				本应用深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。
				我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 
				请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。
			</view>
			<view class="mt">
				一、我们如何收集和使用您的个人信息
			</view>
			<view class="mt">
				个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。 
				我们仅会出于本政策所述的以下目的，收集和使用您的个人信息：
			</view>
			<view class="mt">
				（一）我们不出售任何商品，同时也不展示任何商品
			</view>
			<view class="mt">
				（二）开展内部数据分析和研究，第三方SDK统计服务，改善我们的产品或服务
			</view>
			<view class="mt">
				我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。
				我们收集的数据可能包括SDK/API/JS代码版本、浏览器、互联网服务提供商、IP地址、平台、时间戳、应用标识符、应用程序版本、应用分发渠道、独立设备标识符、iOS广告标识符（IDFA)、安卓广告主标识符、网卡（MAC）地址、国际移动设备识别码（IMEI）、设备型号、终端制造厂商、终端设备操作系统版本、会话启动/停止时间、语言所在地、时区和网络状态（WiFi等）、硬盘、CPU和电池使用情况等。
			</view>
			<view class="mt">
				当我们要将信息用于本策略未载明的其它用途时，会事先征求您的同意。
			</view>
			<view class="mt">
				当我们要将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
			</view>
			<view class="mt">
				二、我们如何共享、转让您的个人信息
			</view>
			<view class="mt">
				（一）共享
			</view>
			<view class="mt">
				我们不会向其他任何公司、组织和个人分享您的个人信息，但以下情况除外：
			</view>
			<view class="mt">
				1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。
			</view>
			<view class="mt">
				2、我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。
			</view>
			<view class="mt">
				3、与我们的关联公司共享：您的个人信息可能会与我们关联公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。
				关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。
			</view>
			<view class="mt">
				4、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由授权合作伙伴提供。
				我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。
				在这种情况下，这些公司 必须遵守我们的数据隐私和安全要求。
				我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。
			</view>
			<view class="mt">
				（二）转让
			</view>
			<view class="mt">
				我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
			</view>
			<view class="mt">
				1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
			</view>
			<view class="mt">
				2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，
				我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
			</view>
			<view class="mt">
				三、您的权利
			</view>
			<view class="mt">
				您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：
			</view>
			<view class="mt">
				账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、
				更改您的密码、添加安全信息或关闭您的账户等，您可以通过访问执行此类操作。
			</view>
			<view class="mt" style=" margin-bottom: 30upx;">
				搜索信息——您可以在应用中访问或清除您的搜索历史记录、查看和修改兴趣以及管理其他数据。
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				text:'',
				
				title:'',
				systemName:'',
				companyName:'途游信息科技',
			}
		},
		onLoad(options) {
			this.title=options.title;
			this.loadTitle(options.title);
			
			//加载应用名称
			this.systemName=this.$GrzxInter.systemConfig.appName;
		},
		methods:{
			loadTitle:function(e){
				uni.setNavigationBarTitle({
				　　title:e,
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.container {
		display: flex;
		flex-direction: column;
		.title{
			font-size: 40upx;  
			padding: 32upx 32upx;
		}
		.time {
			display: flex; 
			font-size: 30upx; 
			margin-left: 32upx;
			color: #888;
		}
		.imageView{
			padding: 0upx 32upx;
			margin-top: 24upx;
			image{
				width: 686upx;
			}
		}
		
		.content {
			display: flex; 
			padding: 32upx 32upx; 
			// margin-top: 24upx; 
			font-size: 33upx; 
			letter-spacing: 4upx; 
			line-height: 48upx; 
			color: #444;
			text-align: justify;
		}
		
		.count {
			margin: 32upx; 
			font-size: 30upx;
		}
	}
	.textClass{
		margin-left: 5%;
		width: 90%;
		font-size: 30upx;
	}
	.mt{
		margin-top: 15upx;
	}
</style>
