<template>
	<view>
		<!-- <view style="width: 100%;height: 32rpx; display: flex">
			<image @click="back" src="../../static/Order/fanhui.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			<view style="width: 152rpx; height: 48rpx; margin: 92rpx 232rpx;color: #333333; font-size: 38rpx;font-weight:bold;">我的订单</view>
		</view> -->
        
		<view class="tab">
			<view style="display: flex; margin-left: 40rpx; margin-bottom: 20rpx; font-size: 34rpx;">
				<text>订单类型：</text>
				<picker @change="selectorChange" mode = "selector" :range="carSelect" name="carSelect">
				      <view>{{selector}} ></view>
				</picker>
			</view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
		</view>
		
		<!-- 最外层view，用于底部拉大 -->
		<view class="pageView">

			<!-- 全部 -->
			<view v-if="current === 0" style="margin-top: 20rpx;">
				<view v-for="(item,index) in info" :key="index">
					<!-- <view  v-if="item.title=='出租车-专线'"> -->
					<view v-if="item.title=='出租车-专线'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 370rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<button class="Btn" @click="czcComplaint(item)" v-if="item.orderType=='已完成'">投诉</button>
									<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>
					<!-- 顺风车 -->
					<view v-if="item.title=='出租车-顺风车'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SfcOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<button class="Btn" @click="czcComplaint(item)" v-if="item.orderType=='已完成'">投诉</button>
									<button class="Btn payBtn" @click="GotoSfcPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSfcOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="SfcConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车 -->
					<view v-if="item.vehicleType=='出租车'">
						<view v-if="item.orderType=='预约'" style="margin-left: 30rpx;width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view class="CZCwhiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
								<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
							</view>

							<view class="CTKYBtnView">
								<button class="allBtn" @click="CallAgain(item)" v-if="taxiOrderState(item.state)=='已完成'|| taxiOrderState(item.state)=='已取消'">再次呼叫</button>
								<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='待计价'">详情</button>
								<button class="allBtn" @click="czcComplaint(item)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
								<button class="allBtn czcpayBtn" @click="czcGotoPay(item.orderNumber)" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
								<!-- <button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button> -->
								<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
							</view>
						</view>
					</view>


					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')" style="margin-right: 0upx;">详情</view>
							</view>

							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'3')">退票</view>
								<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
								<view class="at_button at_btDetails"  @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(item.orderNumber,'3')">取消</view>
								<view class="at_button at_btToPay" @click="topay(item.orderNumber,'3')">去支付</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 支付超时 -->
							<view class="at_buttonView" v-if="item.orderType=='支付超时'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 已失效 -->
							<view class="at_buttonView" v-if="item.orderType=='已失效'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

						</view>
					</view>

					<!-- 旅游产品 -->
					<!-- 同景区门票 -->
					<view v-if="item.title=='旅游产品' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/chanping.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(item.orderNumber)" style="margin-right: 0upx;">详情</view>
							</view>

							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'5')">退票</view>
								<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
							</view>

							<!-- 待选车 -->
							<view class="at_buttonView" v-if="item.orderType=='待选车'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'5')">退票</view>
								<view class="at_button at_btQrCode" @click="chooseShuttle(item)">选班车</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
							</view>

							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(item.orderNumber,'5')">取消</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btToPay" @click="topay(item.orderNumber,'5')">去支付</view>
							</view>

							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 支付超时 -->
							<view class="at_buttonView" v-if="item.orderType=='支付超时'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 已失效 -->
							<view class="at_buttonView" v-if="item.orderType=='已失效'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

						</view>
					</view>

					<!-- 包车订单 -->
					<!-- 标签class命名：;全称：Purchase Date -->
					<!-- 内容class命名：cm;全称：custom made -->
					<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
						<view class="pd_view">{{item.or_date}}</view>
						<view class="cm_view">
							<view class="cm_titleView">
								<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
								<text class="cm_title">{{item.or_class}}</text>
								<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
							</view>
							<!-- <view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view> -->
							<view class="cm_contentView">
								<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
								<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
								<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
								<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
							</view>


							<!-- 已完成 -->
							<view class="cm_buttonView" v-if="item.or_Type=='13'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)" style="margin-right: 0upx;">详情</view>
								<view class="cm_button cm_btDetails" @click="czcComplaint2(item)" style="margin-right: 0upx;margin-left: 20upx;">投诉</view>
							</view>

							<!-- 待补款 -->
							<view class="cm_buttonView" v-if="item.or_Type=='11'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btToPay" @click="topay3(item.or_number)">去支付</view>
						</view>
							<!-- 等待接单中 -->
							<view class="cm_buttonView" v-if="item.or_Type=='0'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							</view>
							<!-- 订单执行中 -->
							<view class="cm_buttonView" v-if="item.or_Type=='4'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							</view>
							<!-- 进行中 -->
							<view class="cm_buttonView" v-if="item.or_Type=='2'||item.or_Type=='3'||item.or_Type=='1'||item.or_Type=='10'">
								<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							</view>

							<!-- 待支付 -->
							<view class="cm_buttonView" v-if="item.or_Type=='5'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
								<view class="cm_button cm_btToPay" @click="topay2(item.or_number)">去支付</view>
							</view>

							<!-- 已取消 -->
							<view class="cm_buttonView" v-if="item.or_Type=='8'||item.or_Type=='7'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open4(item.or_number,'4')">删除</view>
							</view>
						</view>
					</view>
						<!-- （全部）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
						<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
							<view class="pd_view">下单时间：{{item.bookTime}}</view>
							<view class="at_view">
								<view class="at_titleView">
									<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
									<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
									<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
								</view>
								<view class="at_contentView" style="display: flex;">
									
										<view class="at_contentFrame">扫码上车</view>
										<view class="at_contentFrame">线上购票</view>
									
									<text class="at_contentPrice">¥{{item.totalPrice}}</text>
								</view>
							 
								<view class="at_contentView">							
									<text class="at_contentText">发车时间：&nbsp;{{gettime2(item.setOutTime)}}</text>
									<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
								</view>		
								<view class="at_buttonView">
									<!-- #ifndef MP-WEIXIN -->
									<view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view>
									<!-- #endif -->
									<view class="at_button at_btDelete" v-if="item.state=='7'" @tap="open3(item.orderNumber,'2')">取消</view>
									<view class="at_button at_btDelete" v-if="item.state=='4'" @tap="open2(item.orderNumber,'2')">退票</view>
									<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
									<view class="at_button at_btDelete" v-if="item.state=='支付正常' || item.state=='改签'" @tap="open2(item,'cs2tui')">退票</view>
									<view class="at_button at_btDelete" v-if="item.state=='尚未支付'" @tap="open3(item.orderNumber,'cs2')">取消</view>
									<view class="at_button at_btToPay" v-if="item.state=='7'" @tap="keYunPay(item,item.carType)">去支付</view>
									<view class="at_button at_btToPay" v-if="item.state=='尚未支付'" @tap="keYunPay(item,item.carType)">去支付</view>	
									<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
								</view>
							</view>
						</view>
					</view>
					<empty-data :isShow="info.length==0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
				</view>


			<!-- 已完成 -->
			<view v-if="current === 1" style="margin-top: 20rpx; ">
				<view v-for="(item,index) in finishArr" :key="index">
					<!-- <view  v-if="item.title=='出租车-专线'"> -->
					<view v-if="item.title=='出租车-专线'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成' ">详情</button>
									<button class="Btn" @click="czcComplaint(item)" v-if="item.orderType=='已完成'">投诉</button>
									<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 顺风车 -->
					<view v-if="item.title=='出租车-顺风车'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SfcOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<button class="Btn" @click="czcComplaint(item)" v-if="item.orderType=='已完成'">投诉</button>
									<button class="Btn payBtn" @click="GotoSfcPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSfcOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="SfcConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 出租车 -->
					<view v-if="item.vehicleType=='出租车'">
						<view v-if="item.orderType=='预约'" style="margin-left: 30rpx;width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view class="CZCwhiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
								<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
							</view>

							<view class="CTKYBtnView">
								<button class="allBtn" @click="CallAgain(item)" v-if="taxiOrderState(item.state)=='已完成'|| taxiOrderState(item.state)=='已取消'">再次呼叫</button>
								<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='待计价'">详情</button>
								<button class="allBtn" @click="czcComplaint(item)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
								<!-- <button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button> -->
								<!-- <button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button> -->
								<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
							</view>
						</view>
					</view>

					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')" style="margin-right: 0upx;">详情</view>
							</view>

						</view>
					</view>

					<!-- 旅游产品 -->
					<!-- 同景区门票 -->
					<view v-if="item.title=='旅游产品' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/chanping.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(item.orderNumber)" style="margin-right: 0upx;">详情</view>
							</view>


						</view>
					</view>

					<!-- 包车订单 -->
					<!-- 标签class命名：;全称：Purchase Date -->
					<!-- 内容class命名：cm;全称：custom made -->
					<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
						<view class="pd_view">{{item.or_date}}</view>
						<view class="cm_view">
							<view class="cm_titleView">
								<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
								<text class="cm_title">{{item.or_class}}</text>
								<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
							</view>
							<!-- <view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view> -->
							<view class="cm_contentView">
								<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
								<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
								<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
								<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
							</view>
							<!-- 已完成 -->
							<view class="cm_buttonView" v-if="item.or_Type=='13'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)" style="margin-right: 0upx;">详情</view>
								<view class="cm_button cm_btDetails" @click="czcComplaint2(item)" style="margin-right: 0upx;margin-left: 20upx;">投诉</view>
							</view>
						</view>
					</view>


					<!-- （已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
							<!-- （已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
							<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
								<!-- 预定日期 -->
								<view class="pd_view">下单时间：{{item.bookTime}}</view>
								<view class="at_view">
									<view class="at_titleView">
										<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
										<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
										<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
									</view>
									<view class="at_contentView" style="display: flex;">
										
											<view class="at_contentFrame">扫码上车</view>
											<view class="at_contentFrame">线上购票</view>
										
										<text class="at_contentPrice">¥{{item.totalPrice}}</text>
									</view>
								 
									<view class="at_contentView">							
										<text class="at_contentText">发车时间：&nbsp;{{gettime2(item.setOutTime)}}</text>
										<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
									</view>
									<view class="at_buttonView">
										<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
										<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
									</view>
								</view>
							</view>
						</view>
						<empty-data :isShow="finishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
					</view>

			<!-- 进行中 -->
			<view v-if="current === 2" style="margin-top: 20rpx;">
				<view v-for="(item,index) in goingArr" :key="index">

					<!-- <view  v-if="item.title=='出租车-专线'"> -->
					<view v-if="item.title=='出租车-专线'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成' ">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
									<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 顺风车 -->
					<view v-if="item.title=='出租车-顺风车'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SfcOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">评价</button> -->
									<button class="Btn payBtn" @click="GotoSfcPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSfcOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="SfcConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 出租车 -->
					<view v-if="item.vehicleType=='出租车'">
						<view v-if="item.orderType=='预约'" style="margin-left: 30rpx;width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view class="CZCwhiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
								<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
							</view>

							<view class="CTKYBtnView">
								<button class="allBtn" @click="CallAgain(item)" v-if="taxiOrderState(item.state)=='已完成'|| taxiOrderState(item.state)=='已取消'">再次呼叫</button>
								<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成'">详情</button>
								<button class="allBtn" @click="czcComplaint(item)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
								<button class="czcpayBtn" @click="czcGotoPay(item.orderNumber)" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
								<!-- <button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button> -->
								<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
							</view>
						</view>
					</view>


					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.orderDate}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>


							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'3')">退票</view>
								<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

						</view>
					</view>

					<!-- 旅游产品 -->
					<!-- 同景区门票 -->
					<view v-if="item.title=='旅游产品' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/chanping.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>



							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'5')">退票</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
							</view>

							<!-- 待选车 -->
							<view class="at_buttonView" v-if="item.orderType=='待选车'">
								<view class="at_button at_btDelete" @click="open2(item.orderNumber,'5')">退票</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="chooseShuttle(item)">选班车</view>
							</view>



						</view>
					</view>

					<!-- 包车订单 -->
					<!-- 标签class命名：;全称：Purchase Date -->
					<!-- 内容class命名：cm;全称：custom made -->
					<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
						<view class="pd_view">{{item.or_date}}</view>
						<view class="cm_view">
							<view class="cm_titleView">
								<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
								<text class="cm_title">{{item.or_class}}</text>
								<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
							</view>
							<!-- <view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view> -->
							<view class="cm_contentView">
								<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
								<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
								<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
								<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
							</view>
							<!-- 待补款 -->
							<view class="cm_buttonView" v-if="item.or_Type=='11'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btToPay" @click="topay3(item.or_number)">去支付</view>
						</view>

							<!-- 等待接单-->
							<view class="cm_buttonView" v-if="item.or_Type=='0'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							</view>
							<!-- 订单执行中 -->
							<view class="cm_buttonView" v-if="item.or_Type=='4'">
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							</view>
							<!-- 进行中 -->
							<view class="cm_buttonView" v-if="item.or_Type=='1'||item.or_Type=='2'||item.or_Type=='3'||item.or_Type=='10'">
								<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							</view>

						</view>
					</view>

							<!-- (进行中)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
							<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
								<!-- 预定日期 -->
								<view class="pd_view">下单时间：{{item.bookTime}}</view>
								<view class="at_view">
									<view class="at_titleView">
										<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
										<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
										<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
									</view>
									<view class="at_contentView" style="display: flex;">
										
											<view class="at_contentFrame">扫码上车</view>
											<view class="at_contentFrame">线上购票</view>
										
										<text class="at_contentPrice">¥{{item.totalPrice}}</text>
									</view>
								 
									<view class="at_contentView">							
										<text class="at_contentText">发车时间：&nbsp;{{gettime2(item.setOutTime)}}</text>
										<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
									</view>
									<view class="at_buttonView">
										<view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="open2(item.orderNumber,'2')">退票</view>
										<!-- #ifndef MP-WEIXIN -->
										<view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view>
										<!-- #endif -->
										<view class="at_button at_btDelete" v-if="item.carType=='定制巴士'" @tap="open2(item,'cs2tui')">退票</view>
										<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
										<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
										<!-- <view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="endorse(item)">改签</view> -->
									</view>
								</view>
							</view>
						</view>
						<empty-data :isShow="goingArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
					</view>

			<!-- 未支付 -->
			<view v-if="current === 3" style="margin-top: 20rpx;">
				<view v-for="(item,index) in unfinishArr" :key="index">

					<!-- <view  v-if="item.title=='出租车-专线'"> -->
					<view v-if="item.title=='出租车-专线'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
									<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 顺风车 -->
					<view v-if="item.title=='出租车-顺风车'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SfcOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">评价</button> -->
									<button class="Btn payBtn" @click="GotoSfcPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSfcOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="SfcConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 出租车 -->
					<view v-if="item.vehicleType=='出租车'">
						<view v-if="item.orderType=='预约'" style="margin-left: 30rpx;width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view class="CZCwhiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
								<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
							</view>

							<view class="CTKYBtnView">
								<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='待计价'">详情</button>
								<button class="allBtn" @click="czcComplaint(item)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
								<button class="allBtn czcpayBtn" @click="czcGotoPay(item.orderNumber)" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
								<!-- <button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button> -->
								<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
							</view>
						</view>
					</view>


					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(item.orderNumber,'3')">取消</view>
								<view class="at_button at_btToPay" @click="topay(item.orderNumber,'3')">去支付</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>


						</view>
					</view>

					<!-- 旅游产品 -->
					<!-- 同景区门票 -->
					<view v-if="item.title=='旅游产品' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/chanping.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>


							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(item.orderNumber,'5')">取消</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btToPay" @click="topay(item.orderNumber,'5')">去支付</view>
							</view>

						</view>
					</view>


					<!-- 包车订单 -->
					<!-- 标签class命名：;全称：Purchase Date -->
					<!-- 内容class命名：cm;全称：custom made -->
					<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
						<view class="pd_view">{{item.or_date}}</view>
						<view class="cm_view">
							<view class="cm_titleView">
								<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
								<text class="cm_title">{{item.or_class}}</text>
								<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
							</view>
							<!-- <view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view> -->
							<view class="cm_contentView">
								<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
								<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
								<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
								<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
							</view>


							<!-- 待支付 -->
							<view class="cm_buttonView" v-if="item.or_Type=='5'">
								<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
								<view class="cm_button cm_btToPay" @click="topay2(item.or_number)">去支付</view>
							</view>


						</view>
					</view>

							<!-- (未支付)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
							<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
								<!-- 预定日期 -->
								<view class="pd_view">下单时间：{{item.bookTime}}</view>
								<view class="at_view">
									<view class="at_titleView">
										<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
										<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
										<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
									</view>
									<view class="at_contentView" style="display: flex;">
										
											<view class="at_contentFrame">扫码上车</view>
											<view class="at_contentFrame">线上购票</view>
										
										<text class="at_contentPrice">¥{{item.totalPrice}}</text>
									</view>
								 
									<view class="at_contentView">							
										<text class="at_contentText">发车时间：&nbsp;{{gettime2(item.setOutTime)}}</text>
										<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
									</view>
									<view class="at_buttonView">
										<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
										<view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="open3(item.orderNumber,'2')">取消</view>
										<view class="at_button at_btDelete" v-if="item.carType=='定制巴士'" @tap="open3(item.orderNumber,'cs2')">取消</view>
										<view class="at_button at_btToPay" @tap="keYunPay(item,item.carType)">去支付</view>
										<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
									</view>
								</view>
							</view>
						</view>
						<empty-data :isShow="unfinishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
					</view>

			<!-- 已取消 -->
			<view v-if="current === 4" style="margin-top: 20rpx;">
				<view v-for="(item,index) in cancelArr" :key="index">
					<!-- <view  v-if="item.title=='出租车-专线'"> -->
					<view v-if="item.title=='出租车-专线'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
									<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 顺风车 -->
					<view v-if="item.title=='出租车-顺风车'">
						<view style="margin:30rpx;">
							<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
								<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
							</view>
							<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;">
										<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
										<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
									</view>
									<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
									<image style="width: 22rpx; height: 22rpx;margin-left: 60rpx;" src="../../static/Order/time.png"></image>
									<view style=" color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{changeTime(item.time)}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
									<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
								</view>
								<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
									<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
									<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
								</view>
								<view style="display: flex;justify-content: flex-end;">
									<button class="Btn" @click="SfcOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
									<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">评价</button> -->
									<button class="Btn payBtn" @click="GotoSfcPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
									<button class="Btn" @click="DeleteSfcOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
									<button class="Btn" @click="SfcConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 出租车 -->
					<view v-if="item.vehicleType=='出租车'">
						<view v-if="item.orderType=='预约'" style="margin-left: 30rpx;width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间：{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view class="CZCwhiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
								<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
							</view>

							<view class="CTKYBtnView">
								<button class="allBtn" @click="CallAgain(item)" v-if="taxiOrderState(item.state)=='已完成'|| taxiOrderState(item.state)=='已取消'">再次呼叫</button>
								<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='待计价'">详情</button>
								<button class="allBtn" @click="czcComplaint(item)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
								<!-- <button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button> -->
								<!-- <button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button> -->
								<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
							</view>
						</view>
					</view>


					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							</view>

							<!-- 支付超时 -->
							<view class="at_buttonView" v-if="item.orderType=='支付超时'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>

							<!-- 支付超时 -->
							<view class="at_buttonView" v-if="item.orderType=='已失效'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'3')">再次预订</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'3')">详情</view>
							</view>
						</view>
					</view>


					<!-- 旅游产品 -->
					<!-- 同景区门票 -->
					<view v-if="item.title=='旅游产品' && item.isDel !== '是'">
						<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/chanping.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view v-for="(item2,index2) in item.ticketComment" :key="index2">
									<view class="at_contentFrame">{{item2}}</view>
								</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 支付超时 -->
							<view class="at_buttonView" v-if="item.orderType=='支付超时'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

							<!-- 已失效 -->
							<view class="at_buttonView" v-if="item.orderType=='已失效'">
								<view class="at_button at_btDelete" @click="open4(item.orderNumber,'5')">删除</view>
								<view class="at_button at_btDetails" @click="details(item.orderNumber,'5')">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(item.ticketId,'5')">再次预订</view>
							</view>

						</view>
					</view>

					<!-- 包车定制 -->
					<!-- 标签class命名：;全称：Purchase Date -->
					<!-- 内容class命名：cm;全称：custom made -->
					<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
						<view class="pd_view">{{item.or_date}}</view>
						<view class="cm_view">
							<view class="cm_titleView">
								<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
								<text class="cm_title">{{item.or_class}}</text>
								<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
							</view>
							<!-- <view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view> -->
							<view class="cm_contentView">
								<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
								<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
								<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
								<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
							</view>


							<!-- 已取消 -->
							<view class="cm_buttonView" v-if="item.or_Type=='8'||item.or_Type=='7'">
								<view class="cm_button cm_btDelete" @click="open4(item.or_number,'4')">删除</view>
								<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>

							</view>
						</view>
					</view>
								<!-- (已取消)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
								<view v-if="item.carType=='普通班车' || item.carType=='定制班车' ||item.carType=='定制巴士'">
									<!-- 预定日期 -->
									<view class="pd_view">下单时间：{{item.bookTime}}</view>
									<view class="at_view">
										<view class="at_titleView">
											<image class="at_icon" src="../../static/Order/keche.png" mode="aspectFill"></image>
											<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
											<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
										</view>
										<view class="at_contentView" style="display: flex;">
											
												<view class="at_contentFrame">扫码上车</view>
												<view class="at_contentFrame">线上购票</view>
											
											<text class="at_contentPrice">¥{{item.totalPrice}}</text>
										</view>
									 
										<view class="at_contentView">							
											<text class="at_contentText">发车时间：&nbsp;{{gettime2(item.setOutTime)}}</text>
											<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
										</view>
										<view class="at_buttonView">
											<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
											<view class="at_button at_btDetails" @tap="keYunDetail(item)">详情</view>
										</view>
									</view>
								</view>
							</view>
							<empty-data :isShow="cancelArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
						</view>
					</view>

		<!-- 二维码弹框 -->
		<uni-popup2 ref="popup5" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">扫码入园</text>
					<text class="box_icon jdticon icon-fork " @click="close5"></text>
				</view>
				<view class="box_qrCodeView">
					<canvas canvas-id="qrcode2" style="width: 160px; height: 160px; left: 174upx; margin-top: 24upx;" />
					<view class="box_qrCodeTextView">
						<text class="box_qrCodeText" style="font-size: 26upx; color: #AAAAAA;">若无出现二维码，请点击详情查看二维码</text>
						<text class="box_qrCodeText">取票码：{{orderIndexData.orderTicketNumber}}</text>
						<text class="box_qrCodeText">预订人数：{{orderIndexData.orderUserIndex}}人</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 客运二维码弹框代码 -->
		<uni-popup2 type="bottom" ref="popup">
			<swiper style="width: 100%;height: 500rpx;">
				<swiper-item v-for="(item,index) in QRCodeArray" :key="index">
					<view class="u-f-ac" style="border-top-right-radius: 20rpx;border-top-left-radius: 20rpx; width: 100%; background: #FFFFFF;display: block; text-align: center;">
						<!-- 显示二维码 -->
						<!-- <image src="../../static/Order/erweima.png" mode="aspectFill" lazy-load style="width: 250rpx; height: 250rpx;padding-top: 70rpx;"></image> -->

						<!-- 检票口/座位号 -->
						<view style="display: flex; align-items: center;justify-content: space-between; font-size: 32rpx;color: #2C2D2D; padding: 20rpx 80rpx;font-weight: 300;">
							<view>检票口：{{item.checkPlace}}</view>
							<view>座位号：{{item.seatNum}}</view>
						</view>

						<!-- 发车时间/车牌号 -->
						<view style="display: flex; align-items: center;justify-content: space-between;font-size: 32rpx;color: #2C2D2D; padding: 0 80rpx;padding-bottom: 60rpx;">
							<view>发车时间：{{item.lunchTime}}</view>
							<view>车牌号：{{item.carNum}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-popup2>
		<!-- 退票弹框 -->
		<uni-popup2 ref="popup2" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">退订规则</text>
					<text class="box_icon jdticon icon-fork " @click="close2"></text>
				</view>
				<view class="box_refundView">
					<!-- <text class="box_refundText">您可以在2019年11月04日18:00前免费取消或变更订单 ；在2019年11月04日18:00之后变更或取消，将收取全 额费用作为罚金。</text> -->
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您还确定退票吗?</text>
						<text class="box_refundContentText">如若需退票，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="refund">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 取消弹框 -->
		<uni-popup2 ref="popup3" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close3"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认取消订单吗?</text>
						<text class="box_refundContentText">若确认取消，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="cancel">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 删除弹框 -->
		<uni-popup2 ref="popup4" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close4"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认删除订单吗?</text>
						<text class="box_refundContentText">删除订单后，订单内将不再展示该订单</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="del">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 出租车订单支付弹框 -->
		<uni-popup ref="bottomPopup" :maskClick='false' type="bottom">
			<form @submit="payment">
				<view style="background-color: #FFFFFF;padding: 20px;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-top-left-radius: 9px;border-top-right-radius: 9px;">
					<!--<view style="flex-direction: row;justify-content: flex-end;	">
							</view> -->
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view>
							<!-- 勿删 -->
						</view>
						<view>
							<text style="font-size:38rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">支付{{driverName}}车费</text>
						</view>
						<view>
							<uni-icons @click="closePayment" type="closeempty" size="19"></uni-icons>
						</view>
					</view>
					<view style="margin-top: 30px;display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<text style="font-size:60rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;">{{totalPrice}}</text><text
						 style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:Light;color:#2C2D2D;">元</text>
					</view>
					<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<text @click="payDetail" style="font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:#727272;">费用明细</text>
						<uni-icons @click="payDetail" type="arrowright" size="15" color="#727272"></uni-icons>
					</view>
					<view style="border-top-width: 1px;border-color: #EAEAEA;margin-top: 20px;padding-top: 20px;">
						<radio-group name='chooseType'>
							<view v-for='item in payType' :key='item.typeName' style="display: flex;flex-direction: row;justify-content: space-between;padding-bottom: 20px;">
								<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
									<image :src='item.iconPath' style="height: 42rpx;width: 42rpx;"></image>
									<text style="margin-left: 5rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:#000000;">{{item.typeName}}</text>
								</view>
								<view>
									<radio :value="item.value" :checked="item.checked" :color="item.typeColor" />
								</view>
							</view>
						</radio-group>
					</view>
					<view>
						<button form-type="submit" style="width: 100%;height: 100rpx;background-color: #FE4644;color: #FFFFFF;">
							<text style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">确定支付{{totalPrice}}元</text>
						</button>
					</view>
				</view>
			</form>
		</uni-popup>
	</view>
</template>

<script>
	/**
	 * 注意事项：1.请求订单数据要把自己请求的数据加到info数组 2.其他事项看注释
	 * */
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	import uniPopup from "@/components/Order/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/Order/uni-icons/uni-icons.vue";
	import uniPopup2 from "@/components/Order/uni-popup/uni-popup2.vue";
	import $downwindCar from "@/common/downwindCar.js"; //顺风车
	import emptyData from "@/components/Order/emptyData/emptyData.vue"; //无数据时显示内容
	import $taxi from '../../common/Czc.js';
	import $privateTaxi from "../../common/Czcprivate.js"; //出租车专线
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	import uQRCode from "@/common/uqrcode.js"
	import $bcfw from '@/common/BCFW/bcfw.js'
	import $KyInterface from "@/common/Ctky.js"
	import uniRate from '@/components/Order/StarJudge/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniSegmentedControl,
			uniPopup,
			//加载多方弹框组件
			uniPopup2,
			uniIcons,
			emptyData,
			uniRate,
		},
		data() {
			return {
				TaxiCost: 0, //价格
				countdown: 0,
				items: ['全部', '已完成', '进行中', '未支付', '已取消'],
				// carSelect : ['全部','普通班车','定制班车','出租车','专线车','顺风车','景区门票','包车服务'],
				carSelect : ['全部','客运购票','景区门票','出租车'],
				selector : '全部',
				selectorIndex : 0,//模块筛选值
				current: 0,
				index: 1,
				exitindex: 0, //订单判断值
				ticketOrderNumber: '', //门票订单编号
				orderIndex: 0, //订单调用数值
				orderIndexData: '', //二维码订单数据
				QRCodeArray: [{
					checkPlace: 'A5',
					seatNum: 'E1',
					lunchTime: '18:00',
					carNum: '闽C12345'
				}],
				info: [], //请求服务器订单列表
				userInfo: '', //个人信息
				finishArr: [],
				goingArr: [],
				unfinishArr: [],
				cancelArr: [],
				keYunTicketArray: [], //客运订单
				keYunTicket: [], //客运订单
				keYunPaymentData: '', //客运支付
				evaluate: ['干净', '服务态度好', '热情', '开车技术超好', '开车平稳', '亲切', '成熟稳重', '笑容满面','没有绕路'],
				rSelect:[],
				num:'5',
				driverName: '张师傅', //司机姓名
				totalPrice: 32.5,
				orderType1: '',
				ctkyOrderNum: '', //普通班车订单号（退票需要）
				ky_currentType:'',
				ky_orderStatus:'',//判断是否需要检测当前订单状态
				
				ctkyOpenID:'',
				csRefundInfo:[],//定制巴士退票
				payType: [{
						typeName: '微信',
						typeColor: '#00C805',
						// iconPath: '../../static/CZC/Wechatpay.png',
						value: 'wxpay',
						checked: true,
					},
					{
						typeName: '支付宝',
						typeColor: '#0EBDFF',
						// iconPath: '../../static/CZC/Alipay.png',
						value: 'alipay',
						checked: false
					}
				],
				specialLineInfo: '',

				noDataImage:'',//客运弹框背景图
				textareaValue:"",
				
				SfcInfo: '',
			}
		},
		onLoad: function() {
			var that = this;
			//获取客运弹框图片
			that.getPicture();
			//读取用户ID
			uni.getStorage({
				key: 'userInfo',
				success: function(data) {
					that.userInfo = data.data;
				},
				fail:function(){
					// #ifdef H5
					uni.showToast({
						title: '请允许授权给公众号，即将为您返回主页！',
						icon:'none'
					})
					uni.switchTab({
						url:'/pages/Home/zy_zhcx'
					})
					// #endif
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '请允许授权给小程序，即将跳转登录！'
					})
					uni.navigateTo({
						url:'/pages/Home/wxAuthorize'
					})
					// #endif
					// #ifdef APP-PLUS
					uni.showToast({
						title: '未登录账号，即将跳转登录！'
					})
					uni.navigateTo({
						url:'/pages/GRZX/userLogin?urlData=1'
					})
					// #endif
				}
			})
			
		},
		onShow: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.getCurrent();
			this.getOpenID();
			this.selectorChange();
		},
		onPullDownRefresh: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.selectorChange();
		},
		methods: {
			//--------------------------订单模块筛选--------------------------
			selectorChange : function(e){
				var that=this;
				// console.log(e,'订单执行')
				uni.showLoading({
					title:'加载中...'
				})
				if(e !== undefined){
					this.selector = this.carSelect[e.target.value];//赋值
					this.selectorIndex = e.target.value;
				}
				//进行订单数组初始化
				that.info = [];
				that.finishArr = [];
				that.goingArr = [];
				that.unfinishArr = [];
				that.cancelArr = [];
				if(that.selectorIndex==0){
					that.getUserInfo();//加载普通班车订单方法
					setTimeout(function(){
						that.toFinished();//加载景区订单方法
					},400)
					setTimeout(function(){
						that.loadczcData();//加载出租车订单方法
					},800)
					// setTimeout(function(){
					// 	that.getArrayInfo();//加载包车服务方法
					// },800)
					// setTimeout(function(){
					// 	that.GetBookLogInfoByUserId();//加载定制巴士订单方法
					// },200)
					
					// setTimeout(function(){
					// 	that.getOrderList();//加载出租车-专线车订单方法
					// },600)
					// setTimeout(function(){
					// 	that.getSfcOrderList();//加载出租车-顺风车订单方法
					// },800)
					// setTimeout(function(){
					// 	that.getArrayInfo();//加载包车服务方法
					// },1000)
					// setTimeout(function(){
					// 	that.toFinished();//加载景区订单方法
					// },1200)
				}else if(that.selectorIndex==1){
					that.getUserInfo();//加载传统客运订单方法
				}else if(that.selectorIndex==2){
					that.toFinished();//加载景区订单方法
					// that.getArrayInfo();//加载包车服务方法
					// that.GetBookLogInfoByUserId();//加载定制巴士订单方法
				}else if(that.selectorIndex==3){
					that.loadczcData();//加载出租车订单方法
					// that.loadczcData();//加载出租车订单方法
				}else if(that.selectorIndex==4){
					// that.getOrderList();//加载出租车-专线车订单方法
				}else if(that.selectorIndex==5){
					// that.getSfcOrderList();//加载出租车-顺风车订单方法
				}else if(that.selectorIndex==6){
					// that.getArrayInfo();//加载包车服务方法
				}else if(that.selectorIndex==7){
					// that.toFinished();//加载景区订单方法
				}
			},
			CallAgain:function(value){//出租车再次呼叫
				var endObj={
					addressName:  value.endAddress,
					district:  value.destinationArea,
					lat: value.endLat,
					lng:  value.endLon,
				}
				var startObj={
					addressName:  value.startAddress,
					lat: value.startLat,
					lng:  value.startLon,
				}
				uni.setStorage({
					key: "StartPoint",
					data: startObj,
				})
				uni.setStorage({
					key: "EndPoint",
					data: endObj,
				})
				uni.navigateTo({
					url:"/pages/Home/ChooseSite?current=2&callagain=1"
				})
			},			changeTime: function(value) { //时间格式转换
				var date = new Date(value + "+08:00");
				var year = date.getFullYear();
				var mounth = date.getMonth() + 1;
				if (mounth < 10) {
					mounth = "0" + mounth;
				}
				var day = date.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var hours = date.getHours();
				if (hours < 10) {
					hours = "0" + hours;
				}
				var minutes = date.getMinutes();
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				return year + '-' + mounth + '-' + day + " " + hours + ':' + minutes;
			},
			//--------------------------读取公众号openid--------------------------
			getOpenID() {
				var that = this;
				uni.getStorage({
					key: 'scenicSpotOpenId',
					success: function(response) {
						// alert('获取id成功');
						that.ctkyOpenID = response.data
					},
					fail: function(fail) {
						uni.hideLoading();
						// #ifndef APP-NVUE
						// uni.showModal({
						// 	content: '用户未授权',
						// })
						// #endif
						
					}
				})
			},
			//-------------------------支付页面-------------------------
			payDetail: function() {
				//支付详情
				uni.navigateTo({
					url: '../CZC/PriceDetail'
				});
			},
			closePayment: function() {
				//关闭
				let that = this;
				that.closeBottomPopup();
			},
			payment: function(e) {
				//支付
				let that = this;
				var timeStamp = new Date().getTime();
				uni.requestPayment({
					provider: e.detail.value.chooseType,
					orderInfo: '111',
					timeStamp: timeStamp,
					nonceStr: '',
					package: '',
					paySign: '',
					success: function(res) {
						// console.log(res);
						uni.navigateTo({
							url: '../CZC/PaymentSuccess'
						});
					},
					fail: function(res) {
						// console.log(res);
						uni.navigateTo({
							url: '../CZC/PaymentFail'
						});
					}
				});
			},
			openBottomPopup: function() {
				this.$nextTick(function() {
					this.$refs['bottomPopup'].open();
				});
			},
			closeBottomPopup: function() {
				this.$nextTick(function() {
					this.$refs['bottomPopup'].close();
				});
			},
			back: function() {
				var that = this;
				uni.switchTab({
					url: '/pages/Home/zy_zhcx',
				});
			},
			//------------------------------------------------客运开始------------------------------------------------
			//-------------------------客运用户详情-------------------------
			getPicture() {
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_AddPicture.Url,
					method: $KyInterface.KyInterface.Ky_AddPicture.method,
					header: $KyInterface.KyInterface.Ky_AddPicture.header,
					data: {
						model: 0,
					},
					success(res) {
						if (res.data.status == true) {
							that.noDataImage = res.data.data[2].imageUrl
						} else {
							console.log(res.data.status)
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						console.log('用户信息', that.userInfo);
						that.getKeYunOrderInfo();
					},
					fail(res) {
						// console.log('错误', res);
					}
				})
			},

			//-------------------------请求客运订单数据-------------------------
			getKeYunOrderInfo: function() {
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.Url,
					method: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.method,
					header: $KyInterface.KyInterface.Ky_getKeYunOrderInfo.header,
					data: {
						clientID: that.userInfo.userId,
					},
					success: (res) => {
						console.log('客运订单数据', res.data);
						that.ctkyOrderNum = res.data.orderNumber;
						if (res.data.status == true) {
							for (var i = 0; i < res.data.data.length; i++) {
								that.info.push(res.data.data[i]);
							}
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].state == '5') {
									that.finishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '4') {
									that.goingArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '7') {
									that.unfinishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '6' || res.data.data[i].state == '9') {
									that.cancelArr.push(res.data.data[i]);
								}
							}
							uni.stopPullDownRefresh();
							uni.hideLoading();
						} else if (res.data.status == false) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
						}
						
					},
					fail(res) {
						uni.hideLoading();
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						// console.log('错误', res);
					}
				})
			},
			//-------------------------请求定制巴士订单数据-------------------------
			GetBookLogInfoByUserId(){
				var that = this;
				console.log(that.userInfo.userId)
				uni.request({
					url:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.Url,
					method:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.method,
					header:$KyInterface.KyInterface.Cs_GetBookLogInfoByUserId.header,
					data:{
						UserAID: that.userInfo.userId
					},
					success(res) {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						console.log('定制巴士订单数据',res)
						if (res.data.Successed == true) {
							var orderArray = [];
							for(let i=0;i<res.data.bookLogs.length;i++) {
								var array = {
									carType:res.data.bookLogs[i].Rep_BookLogType,
									bookTime:that.turnDate(res.data.bookLogs[i].BookTime),
									startSiteName:res.data.bookLogs[i].StartSiteName,
									endSiteName:res.data.bookLogs[i].EndSiteName,
									state:res.data.bookLogs[i].Rep_BookLogState,
									setOutTime:that.turnDate(res.data.bookLogs[i].SetoutTime),
									totalPrice:res.data.bookLogs[i].TotalPrice,
									iDNameType:res.data.bookLogs[i].iDNameType,
									ticketNumber:res.data.bookLogs[i].GetTicketCode,
									carryChild:res.data.bookLogs[i].Children,
									fullTicket:res.data.bookLogs[i].Person,
									halfTicket:0,
									orderNumber:res.data.bookLogs[i].AID,
									CheckInfoList:res.data.bookLogs[i].CheckInfoList,
									driverName:res.data.bookLogs[i].driverName,
									vehicleNumber:res.data.bookLogs[i].vehicleNumber,
								};
								orderArray.push(array);
								that.info.push(array);
								var state = res.data.bookLogs[i].Rep_BookLogState;
								if (state == '已完成') {
									that.finishArr.push(orderArray[i]);
								} else if (state == '支付正常' || state == '改签') {
									that.goingArr.push(orderArray[i]);
								} else if (state == '尚未支付') {
									that.unfinishArr.push(orderArray[i]);
								} else if (state == '作废' || state == '已退票') {
									that.cancelArr.push(orderArray[i]);
								}
							}
						}else if(res.data.Successed == false) {
							
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						console.log(res)
					}
				})
				
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if (date) {
					var setTime = date.replace('T', ' ');
					return setTime;
				}
			},
			//-------------------------------获取班次信息-------------------------------
			getScheduleNum:function(param){
					if(param.planScheduleCode){
						return param.planScheduleCode;
					}else{
						return '无'; 
					}
			},
			//----------------------------获取时间--------------------
			gettime2:function(param){
					let array=param.split(':');
					var a=array[0]+":"+array[1];
					return a;
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (!(/(^[1-9]\d*$)/.test(param))){//如果不是数字
					return param
				}else {
					if (param == 4) {
						return '进行中'
					} else if (param == 5) {
						return '已完成'
					} else if (param == 6) {
						return '已退票'
					} else if (param == 7) {
						return '未支付'
					} else if (param == 9) {
						return '已撤销'
					}
					//  else if (param == 22) {
					// 	return '已改签'
					// }
				}
			},
			//-------------------------跳转到详情页-------------------------
			keYunDetail: function(res) {
				console.log(res)
				var orderInfo = {
					lineName:res.lineName,
					planScheduleCode:res.planScheduleCode,
					orderNumber:res.orderNumber,
					carType:res.carType,
					state: res.state,
					totalPrice: res.totalPrice,
					startSiteName: res.startSiteName,
					endSiteName: res.endSiteName,
					fullTicket: res.fullTicket,
					halfTicket: res.halfTicket,
					carryChild: res.carryChild,
					setOutTime: res.setOutTime,
					driverName: res.driverName,
					driverPhone: res.driverPhone,
					vehicleNumber: res.vehicleNumber,
					iDNameType: res.iDNameType,
					ticketNumber: res.ticketNumber,
					insured: res.insured,
					CheckInfoList:res.CheckInfoList,
				}
				uni.navigateTo({
					url: '../../pages_CTKY/pages/CTKY/TraditionSpecial/Order/orderDetail?orderInfo=' + JSON.stringify(orderInfo)
				})
			},
			// -------------------------客运改签-------------------------
			endorse:function(item) {
				// console.log(item)
				uni.showToast({
					title:'待开放...',
					icon:'none'
				})
				// uni.navigateTo({
				// 	url:'../../pages_CTKY/pages/CTKY/TraditionSpecial/Order/selectTickets?orderInfo=' + JSON.stringify(item) + '&isEndores=' + "true"
				// })
			},
			// -------------------------客运查看车辆位置-------------------------
			busLocation:function(item) {
				var loaction = {
					latitude:item.lat,
					longitude:item.lon
				}
				uni.navigateTo({
					url:'../../pages_ZXGP/pages/ZXGP/TraditionSpecial/MapMark/checkBusLocation?busInfo=' + JSON.stringify(loaction)
				})
			},
			//--------------------------退票之前获取车票支付参数--------------------------
			refund_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log(res)
							if (res.data.data == '车票已退票') {
								uni.stopPullDownRefresh();
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '车票已退票',
									icon: 'none',
								})
							}else {
								clearInterval(timer);
								that.GetBounceChargeByOrderNumber(orderNumber);
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运退票--查询费率-------------------------
			GetBounceChargeByOrderNumber:function(orderNumber){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_GetBounceChargeByOrderNumber.Url,
					method: $KyInterface.KyInterface.Ky_GetBounceChargeByOrderNumber.method,
					data: {
						orderNumber: orderNumber,
					},
					success(respones) {
						console.log(respones)
						if(respones.data.status == true){
							uni.hideLoading();
							that.$refs.popup2.close()
							let BounceMoney = respones.data.data.BounceMoney;
							uni.showModal({
								title:'温馨提示',
								content:'退票将收取手续费，退款金额为' + BounceMoney + '元',
								// content:'退票将收取手续费，是否继续退票',
								success(res) {
									if(res.confirm) {
										that.keYunRefundTicket(orderNumber)
									}
								}
							})
						}else if(respones.data.status == false){
							uni.hideLoading();
							that.$refs.popup2.close()
							uni.showToast({
								title:respones.data.msg,
								icon:'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail(respones) {
						uni.hideLoading();
						console.log('费率', respones)
					}
				})
			},
			// -------------------------客运退票-------------------------
			keYunRefundTicket: function(orderNumber) {
				uni.showLoading({
					title: '正在退票中...'
				})
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_RefundTicket.Url,
					method: $KyInterface.KyInterface.Ky_RefundTicket.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						// console.log('退票结果', respones)
						if (respones.data.status == true) {
							if(respones.data.msg == '退票成功'){
								uni.showToast({
									title:"退票成功",
									complete() {
										setTimeout(function(){
											uni.startPullDownRefresh();
										},1500)
									}
								})
							}else {
								uni.showToast({
									title: respones.data.msg
								})
								uni.startPullDownRefresh();
							}
						} else if (respones.data.status == false){
							uni.hideLoading()
							if(respones.data.msg) {
								uni.showToast({
									title: respones.data.msg,
									icon: 'none'
								})
							}else {
								uni.showToast({
									title: '退票失败',
									icon: 'none'
								})
							}
							this.$refs.popup2.close()
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			// -------------------------定制巴士退票/退款 先退票再退款-------------------------
			cs_refundStateCheck:function(item){
				var that = this;
				that.ky_currentType = '定制巴士退票';
				//退票
				// that.csRefundTicket(item);
				//检测支付状态
				that.Cs_CheckPayState(item);
			},
			
			//退票
			csRefundTicket:function(item){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Cs_Refund.Url,
					method: $KyInterface.KyInterface.Cs_Refund.method,
					header: $KyInterface.KyInterface.Cs_Refund.header,
					data: {
						bookID: item.orderNumber,
					},
					success: (respones) => {
						console.log('退票结果',respones)
						if (respones.data.Successed == true) {
							uni.hideLoading()
							uni.showToast({
								title: respones.data.BookResult.Message,
								complete() {
									that.Cs_BouncePay(item);
									that.$refs.popup2.close()
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: respones.data.FaildMessage,
								icon: 'none',
								complete() {
									this.$refs.popup2.close()
								}
							})
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			//退款
			Cs_BouncePay:function(item){
				var that = this;
				var payType = $KyInterface.KyInterface.payType.payType;
				uni.request({
					url: $KyInterface.KyInterface.Cs_BouncePay.Url,
					method: $KyInterface.KyInterface.Cs_BouncePay.method,
					data: {
						orderNumber: item.orderNumber,
						payType: payType,
						price: item.totalPrice
					},
					success: (respones) => {
						console.log('退款结果',respones)
						if (respones.data.status == true) {
							uni.showToast({
								title: respones.data.msg,
								complete() {
									// console.log('退票成功，开始刷新');
									uni.startPullDownRefresh();
								}
							})
						} else if (respones.data.status == false){
							uni.showToast({
								title: respones.data.msg,
								icon: 'none',
								complete() {
									uni.startPullDownRefresh();
								}
							})
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			// -------------------------定制巴士取消-------------------------
			Cs_cancelStateCheck:function(orderNumber){
				var that = this;
				that.ky_currentType = '定制巴士取消';
				that.Cs_CheckPayState(orderNumber);
			},
			Cs_cancelTicket:function(orderNumber){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Cs_Cancel.Url,
					method: $KyInterface.KyInterface.Cs_Cancel.method,
					header: $KyInterface.KyInterface.Cs_Cancel.header,
					data: {
						bookID: orderNumber,
					},
					success: (respones) => {
						console.log('取消结果', respones)
						if (respones.data.Successed == true) {
							uni.hideLoading()
							uni.showToast({
								title: '取消成功'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '取消失败',
								icon: 'none'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			//--------------------------客运取消之前获取车票支付参数--------------------------
			cancel_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('取消结果',res);
							if (res.data.data == '订票成功，待支付' || res.data.msg == '订票成功，待支付') {//可以取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else if (res.data.data == '订票成功' || res.data.msg == '订票成功'){//已付钱，不可取消
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
								uni.showModal({
									title:'温馨提示',
									content:'您的订单已购票成功，不可取消',
									showCancel:false,
									complete() {
										uni.startPullDownRefresh()
									}
								})
							}else if (res.data.msg == '订票失败' || res.data.data == '订票失败'){//可取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else {
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运取消-------------------------
			keYunCancelTicket: function(orderNumber) {
				var that = this;
				that.ky_currentType = '传统客运';
				uni.request({
					url: $KyInterface.KyInterface.Ky_CancelTicket.Url,
					method: $KyInterface.KyInterface.Ky_CancelTicket.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						that.$refs.popup3.close()
						// console.log('取消结果', respones)
						if (respones.data.status == true) {
							uni.showToast({
								title: '取消成功',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			
			// -------------------------客运支付-------------------------
			keYunPay: function(item,carType) {
				// var orderInfo = this.info[index];
				var that = this;
				console.log(item.orderNumber,carType,item.totalPrice);
				if(carType == '定制巴士') {
					that.ky_currentType = '定制巴士支付';
					this.Cs_CheckPayState(item.orderNumber,item.totalPrice)
				}else {
					this.ky_currentType = '';
					this.ky_orderStatus = '客运支付订单检索';
					this.getTicketPaymentInfo(item.orderNumber);
				}
			},
			
			//--------------------------检测订单支付状态--------------------------
			Cs_CheckPayState:function(orderNumber,totalPrice){
				var that = this;
				var payType = $KyInterface.KyInterface.payType.payType;
				console.log('检测订单支付状态',orderNumber,payType)
				var number = '';
				if(that.ky_currentType == '定制巴士退票'){
					number = orderNumber;
				}else {
					number = orderNumber.orderNumber;
				}
				uni.request({
					url:$KyInterface.KyInterface.Cs_CheckPayState.Url,
					method:$KyInterface.KyInterface.Cs_CheckPayState.method,
					data:{
						orderNumber:number,
						payType:payType
					},
					success(res) {
						console.log('支付状态',res)
						console.log('ky_currentType',that.ky_currentType)
						if(that.ky_currentType == '定制巴士取消') {
							if(res.data.msg == '支付成功') {
								uni.showToast({
									title:'订单已支付',
									icon:'none'
								})
							}else {
								that.Cs_cancelTicket(orderNumber)
							}
						}
						if(res.data.msg == '不存在该订单，请输入正确订单号'){
							if(that.ky_currentType == '定制巴士退票'){
								// that.csRefundTicket(orderNumber);
							}else if(that.ky_currentType == '定制巴士支付'){
								that.getSpecialBusPaymentInfo(orderNumber,totalPrice);
							}
						}else if(res.data.msg == '获取二维码尚未支付'){
							
						}else if(res.data.msg == '支付成功'){
							uni.showToast({
								title:'订单已支付',
								icon:'none'
							})
						}else if(res.data.msg == '支付关闭'){
							uni.showToast({
								title:'支付关闭',
								icon:'none'
							})
						}else if(res.data.msg == '检测到超时'){
							uni.showToast({
								title:'支付超时',
								icon:'none'
							})
						}else if(res.data.msg == '已办理退款'){
							uni.showToast({
								title:'已办理退款',
								icon:'none'
							})
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			//--------------------------定制巴士支付成功后请求--------------------------
			Cs_paySuccess:function(bookID){
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Cs_Confirm.Url,
					method:$KyInterface.KyInterface.Cs_Confirm.method,
					header:$KyInterface.KyInterface.Cs_Confirm.header,
					data:{
						bookID:bookID
					},
					success(res) {
						console.log('支付成功后调接口',res)
						uni.startPullDownRefresh()
					},
					fail(res) {
						console.log('支付失败后调接口',res)
					}
				})
			},
			//--------------------------获取定制巴士支付参数--------------------------
			getSpecialBusPaymentInfo:function(orderNumber,totalPrice){
				var that = this;
				uni.showLoading({
					title:'加载中...'
				})
				var payType = $KyInterface.KyInterface.payType.payType;
				var timer = null;
				that.timer = timer;
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.commonPayment.Url,
						method:$KyInterface.KyInterface.commonPayment.method,
						data: {
							//订单编号
							orderNumber: orderNumber,
							payType:payType,
							openId:that.ctkyOpenID,
							billDescript:'定制巴士订单服务费',
							goodsName:'定制巴士服务',
							price:totalPrice,
							// price:0.1,
						},
						success: (res) => {
							uni.hideLoading();
							if(res.data.status == true) {
								that.paymentData = res.data.data;
								clearInterval(timer);
								uni.showModal({
									content:'请尽快支付',
									success(res) {
										if(res.confirm) {
											that.Cs_payment();
										}
									}
								})
							}else if(res.data.status == false) {
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: res.data.msg,
									icon:'none'
								})
							}
						},
						fail(res) {
							uni.hideLoading();
							console.log('失败');
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(orderNumber) {
				// console.log('支付参数', orderNumber);
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title:'正在检测订单...'
				})
				timer = setInterval(function() {
					uni.request({
						url: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						// header: $KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							if (res.data.status == true) {
								uni.hideLoading();
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									clearInterval(timer);
									uni.showToast({
										title: '订单已支付',
										icon: 'none',
										complete() {
											setTimeout(function(){
												uni.startPullDownRefresh()
											},1500)
										}
									})
								} else {
									clearInterval(timer);
									//未支付，客运支付
									that.keYunPaymentData = JSON.parse(res.data.msg);
									that.keYunPayment();
								}
							} else if (res.data.status == false) {
								uni.hideLoading();
								clearInterval(timer);
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									uni.showToast({
										title: '订单已超时',
										icon: 'none'
									})
								} else {
									uni.showModal({
										content: info.oldState,
										showCancel: false
									})
								}
							}
						},
						fail(res) {
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			keYunPayment: function() {
				// console.log('点击了支付');
				var that = this;
				if (that.isPayEnable == 0) {
					uni.showToast({
						title: '正在获取支付,请稍等...',
						icon: 'none'
					})
				} else {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": that.keYunPaymentData.jsapi.AppId, //公众号名称，由商户传入
						"timeStamp": that.keYunPaymentData.jsapi.TimeStamp, //时间戳
						"nonceStr": that.keYunPaymentData.jsapi.NonceStr, //随机串
						"package": that.keYunPaymentData.jsapi.Package, //扩展包
						"signType": that.keYunPaymentData.jsapi.SignType, //微信签名方式:MD5
						"paySign": that.keYunPaymentData.jsapi.PaySign //微信签名
					}, function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							//支付成功再进计时器查询状态
							// location.href = "/Order/BaseCallback/" + flowID;
							uni.showToast({
								title: '支付成功',
								icon: 'none',
							})
							uni.startPullDownRefresh();
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							uni.showToast({
								title: '您取消了支付，请重新支付',
								icon: 'none',
							})
						} else if (res.err_msg == "get_brand_wcpay_request:faile") {
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none',
							})
						} else {
							// location.href = "/Coach/GetCoach";
						}
					});
					// #endif


					// #ifdef APP-PLUS
					// console.log('进入app支付', that.paymentData);
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							appid: that.keYunPaymentData.jsapi.AppId,
							timestamp: that.keYunPaymentData.jsapi.TimeStamp,
							noncestr: that.keYunPaymentData.jsapi.NonceStr,
							package: 'Sign=WXPay',
							sign: that.keYunPaymentData.jsapi.PaySign,
							partnerid: that.keYunPaymentData.jsapi.PartnerId,
							prepayid: that.keYunPaymentData.jsapi.PrepayId,
						},
						success: function(res) {
							if (res.errMsg == 'requestPayment:ok') { //成功
								uni.showToast({
									title: '支付成功',
									icon: 'none',
									success: function() {
										uni.startPullDownRefresh();
									}
								})
							} else if (res.errMsg == 'requestPayment:fail') { //错误
								uni.showToast({
									title: '支付失败，请重新支付',
									icon: 'none',
								})
							}
						},

						fail: function(ee) {
							console.log(ee)
							if (ee.errMsg == 'requestPayment:fail canceled') { //用户取消
								uni.showToast({
									title: '您取消了支付',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: ee.errMsg,
									icon: 'none',
									duration: 3000
								})
							}
						}
					});
					// #endif
					// #ifdef MP-WEIXIN
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp:that.keYunPaymentData.jsapi.TimeStamp,
						nonceStr:that.keYunPaymentData.jsapi.NonceStr,
						package:that.keYunPaymentData.jsapi.Package,
						signType:that.keYunPaymentData.jsapi.SignType,
						paySign:that.keYunPaymentData.jsapi.PaySign,
						success(res) {
							console.log(res)
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							})
							uni.showLoading({
							    title: '加载中...'
							});
							that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						},
						fail(res) {
							console.log(res)
							if (res.errMsg == "requestPayment:fail cancel") {
								setTimeout(function() {
									that.showToast("支付失败，请重新支付")
								}, 1000)
							} else {
								that.showToast("支付失败")
							}
						}
					});
					// #endif
				}
			},
			//--------------------------调起定制巴士支付--------------------------
			Cs_payment: function() {
				var that = this;
				// #ifdef H5
				uni.hideLoading()
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": that.paymentData.appId, //公众号名称，由商户传入
					"timeStamp": that.paymentData.timeStamp, //时间戳
					"nonceStr": that.paymentData.nonceStr, //随机串
					"package": that.paymentData.package, //扩展包
					"signType": that.paymentData.signType, //微信签名方式:MD5
					"paySign": that.paymentData.paySign //微信签名
				}, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						alert("支付成功");
						uni.showLoading({
						    title: '加载中...'
						});
						// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						that.Cs_paySuccess(that.orderNum);
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						// alert("您取消了支付，请重新支付");
						uni.showToast({
							title: '您取消了支付，请重新支付',
							icon: 'none'
						})
					} else if (res.err_msg == "get_brand_wcpay_request:faile") {
						// alert("支付失败，请重新支付");
						uni.showToast({
							title: '支付失败，请重新支付',
							icon: 'none'
						})
			
					} else {
						// location.href = "/Coach/GetCoach";
					}
				});
				// #endif
			
			
				// #ifdef APP-PLUS
				uni.hideLoading()
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: {
						appid: that.paymentData.appId,
						timestamp: that.paymentData.timeStamp,
						noncestr: that.paymentData.nonceStr,
						package: 'Sign=WXPay',
						sign: that.paymentData.signType,
						partnerid: that.paymentData.PartnerId,
						prepayid: that.paymentData.PrepayId,
					},
					success: function(res) {
						uni.showModal({
							title: '提示',
							content: res,
							showCancel: false
						})
						if (res.errCode == 0) { //成功
							alert("支付成功");
							uni.showLoading({
							    title: '加载中...'
							});
							// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
							that.Cs_paySuccess(that.orderNum);
						} else if (res.errCode == -1) { //错误
							that.showToast("支付失败，请重新支付")
						} else if (res.errCode == -2) { //用户取消
							that.showToast("您取消了支付")
						}
					},
					fail: function(ee) {
						uni.showToast({
							title: '拉起支付失败，请检查网络后重试',
							icon: 'none',
							duration: 3000
						})
					}
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.hideLoading()
				uni.requestPayment({
					// provider: 'wxpay',
					timeStamp:that.paymentData.timeStamp,
					nonceStr:that.paymentData.nonceStr,
					package:that.paymentData.package,
					signType:that.paymentData.signType,
					paySign:that.paymentData.paySign,
					success(res) {
						console.log(res)
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						})
						uni.showLoading({
						    title: '加载中...'
						});
						// that.getTicketPaymentInfo_ticketIssue(that.orderNum);
						that.Cs_paySuccess(that.orderNum);
					},
					fail(res) {
						console.log(res)
						if (res.errMsg == "requestPayment:fail canceled") {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						} else {
							that.showToast("支付失败")
						}
					}
				});
				// #endif
			},
			showToast: function(msg, icon = 'none') {
				uni.showToast({
					title: msg,
					icon: icon
				})
			},
			//--------------------------客运成功之后重新获取车票支付参数--------------------------
			getTicketPaymentInfo_ticketIssue: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '加载中...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						// header:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							// console.log('支付参数返回数据', res);
							uni.stopPullDownRefresh();
							if (res.data.data == '订票成功') {
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '出票成功',
									icon: 'none',
								})
								uni.redirectTo({
									url: './CTKYPaySuccess'
								})
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//-------------------------客运二维码弹框-------------------------
			QRCodeTap: function() {
				this.$refs.popup.open()
			},
			//-------------------------客运投诉-------------------------
			KyComplain:function(item){
				console.log(item)
				if(item.carType=='普通班车'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=普通班车&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}else if(item.carType=='定制班车'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=定制班车&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}else if(item.carType=='定制巴士'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=定制巴士&or_name=' + item.driverName +'&or_nameId=0' +'&or_phoneNumber' +item.driverPhone
					})
				}
			},
			onchange(e){
				this.num = e.value;
			},
			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
				    this.rSelect.push(e);//选中添加到数组里
				} else {
				    this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			//------------------------------------------------客运结束------------------------------------------------
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},

			//-------------------------出租车开始-------------------------
			loadczcData: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res1) => {
						this.userInfo = res1.data;
						uni.request({
							url: 'https://zntc.145u.net:9099/api/taxi/GetAllExpressOrder_Passenger',
							data: {
								userId: that.userInfo.userId,
							},
							method: 'POST',
							success: (res) => {
								console.log('出租车',res);
								uni.hideLoading();
								uni.stopPullDownRefresh();
								if (res.data.status) {
									for (var i = 0; i < res.data.data.length; i++) {
										that.info.push(res.data.data[i]);
										if (res.data.data[i].state == "0" || res.data.data[i].state == "1" || res.data.data[i].state == "2" ||
											res.data.data[i].state == "3" || res.data.data[i].state == "4") {
											that.goingArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == "5" || res.data.data[i].state == "9") {
											that.unfinishArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == "7" || res.data.data[i].state == "8") {
											that.cancelArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == 6) {
											that.finishArr.push(res.data.data[i]);
										}
									}
								} else {
								}
							}
						})
					},
					fail() {
						uni.hideLoading();
						//请求数据失败，停止刷新
					    uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无订单数据，请先登录后查看订单',
							icon: 'none',
							success: function() {
								// uni.redirectTo({
								// 	url: '../GRZX/userLogin?urlData=1'
								// })
							}
						})
					}
				})
			},
			taxiOrderState(param) {
				if (param == 0 || param == 1 || param == 2 || param == 3 || param == 4) {
					return '进行中';
				} else if (param == 5 || param == 9) {
					return '未支付';
				} else if (param == 7 || param == 8) {
					return '已取消';
				} else if (param == 6) {
					return '已完成';
				}
			},
			//-------------------------出租车订单取消-------------------------
			czcGotoPay: function(value) {
				uni.navigateTo({
					url: "../../pages_CZC/pages/CZC/TaxiPayment?orderNumber=" + value
				})
			},
			cancleOrder: function(item) {
				//取消订单
				let that = this;
				//关闭所有的定时器
				uni.showModal({
					title: "取消订单",
					content: "您是否取消订单",
					success(res) {
						if (res.confirm) {
							getApp().globalData.closeUpload();
							uni.request({
								url: $taxi.Interface.CancelExpressOrderByOrderNum_Passenger.value,
								method: $taxi.Interface.CancelExpressOrderByOrderNum_Passenger.method,
								data: {
									OrderNumber: item.orderNumber,
									userId: that.userInfo.userId,
								},
								success: function(res) {
									let data = res.data.data;
									if (res.data.status) {
										uni.showToast({
											title: '取消成功',
											icon: 'none',
											success: function() {}
										});
										setTimeout(function() {
											uni.startPullDownRefresh();
										}, 1500)
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								},
								fail: function(res) {
									uni.showToast({
										title: '网络连接失败',
										icon: 'none'
									})
									// console.log(res);
								}
							});
						}

					}
				})
			},
			//-------------------------出租车专线代码开始-------------------------
			getOrderList: function() { //获取出租车专线订单
				var that = this;
				uni.request({
					url: $privateTaxi.Interface.QuerySpecialLineOrderByUserID_Passenger.value,
					method: $privateTaxi.Interface.QuerySpecialLineOrderByUserID_Passenger.method,
					data: {
						UserID: that.userInfo.userId,
					},
					success: function(res) {
						console.log('专线车',res);
						uni.hideLoading();
						uni.stopPullDownRefresh();
						if (res.data.status) {
							for (var i = 0; i < res.data.data.length; i++) {
								var data = res.data.data[i];
								var orderType = '';
								if (data.State == 0 || data.State == 1 || data.State == 2 || data.State == 3 || data.State == 4) {
									orderType = '进行中';
								} else if (data.State == 5 || data.State == 9) {
									orderType = '未支付';
								} else if (data.State == 7 || data.State == 8) {
									orderType = '已取消';
								} else if (data.State == 6) {
									orderType = '已完成';
								}
								var obj = {
									title: '出租车-专线',
									titleIndex: '1',
									SpecialorderState: data.State,
									time: data.OrderTime,
									orderType: orderType,
									appointmentTime: data.AppointmentTime,
									money: data.EstimatePrice,
									startAddress: data.StartAddress,
									endAddress: data.EndAddress,
									orderNumber: data.OrderNumber,
									driverName: data.DriverName,
									appointment: true,
								}
								that.info.push(obj);
								if (orderType == '已完成') {
									that.finishArr.push(obj);
								} else if (orderType == '等待司机接单' || orderType == '进行中' || orderType == '待上车') {
									that.goingArr.push(obj);
								} else if (orderType == '未支付') {
									that.unfinishArr.push(obj);
								} else if (orderType == '已取消') {
									that.cancelArr.push(obj);
								}
							}
						}
					},
					fail() {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				})
			},
			CancelSpecialLineOrder: function(OrderNumber) { //取消出租车专线订单
				let that = this;
				uni.showModal({
					content: "您确定要取消订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.value,
								method: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.method,
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									if (res.data.status) {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								},
								fail() {
									uni.showToast({
										title: "网络连接失败",
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			SpecialLineOrderDetail: function(item) { //专线车详情
				if (item.orderType == '进行中') {
					uni.navigateTo({
						url: '../../pages_CZC/pages/CZC/WaitTakeOrder?orderNumber=' + item.orderNumber,
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/SpecialLineDetail?orderNumber=' + item.orderNumber,
					})
				}
			},
			DeleteSpecialLineOrder: function(OrderNumber) { //专线车删除订单
				let that = this;
				uni.showModal({
					content: "您确定要删除订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: $privateTaxi.Interface.DeleteSpecialLineOrder_Passenger.value,
								method: $privateTaxi.Interface.DeleteSpecialLineOrder_Passenger.method,
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									// console.log(res)
									if (res.data.status) {

										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								}
							})
						}
					}
				})
			},
			GotoPay: function(value) {
				uni.navigateTo({
					url: "../../pages_CZC/pages/CZC/PrivateTaxiPayment?orderNumber=" + value
				})
			},
			CheckPayState: function(orderNumber) { //检测支付状态
				let that = this;
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.request({
					url: $privateTaxi.Interface.CheckPayState.value,
					method: $privateTaxi.Interface.CheckPayState.method,
					data: {
						payType: payPlatform,
						orderNumber: orderNumber
					},
					success(res) {
						console.log(res);
						if (res.data.status) {
							that.CancelSpecialLineOrder1(orderNumber);
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			BouncePay: function(orderNumber,money) {
				let that = this;
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.request({
					url: $privateTaxi.Interface.BouncePay.value,
					method: $privateTaxi.Interface.BouncePay.method,
					data: {
						payType: payPlatform,
						orderNumber: orderNumber,
						// price:that.FactPayPrice
						price: money
					},
					success(res) {
						console.log(res);
						if (res.data.status) {
							that.CheckPayState(orderNumber)
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail(res) {
						uni.hideLoading()
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			CancelSpecialLineOrder1: function(orderNumber) {
				//取消订单
				let that = this;
				console.log(that.userInfo.userId);
				uni.request({
					url: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.value,
					method: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.method,
					data: {
						OrderNumber: orderNumber,
						UserId: that.userInfo.userId,
					},
					success: function(res) {
						uni.hideLoading()
						let data = res.data.data;
						if (res.data.status) {
							uni.showToast({
								title: '取消成功',
								icon: 'none',
							});
							uni.startPullDownRefresh();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function(res) {
						uni.hideLoading()
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				});

			},
			ConfirmCancel: function(value) {
				let that = this;
				uni.showModal({
					title: "取消订单",
					content: "您是否取消订单",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
							})
							if (value.SpecialorderState == 0 || value.SpecialorderState == 1 || value.SpecialorderState == 2) {
								that.BouncePay(value.orderNumber,value.money);							
							} else {
								that.CancelSpecialLineOrder1(value.orderNumber);
								uni.hideLoading()
							}
						}
					},
					fail: function(res) {
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				})
			},

			//-------------------------出租车专线代码结束-------------------------


			//-------------------------顺风车代码开始-------------------------
			getSfcOrderList: function() { //获取顺风车订单
				var that = this;
				uni.request({
					url:$downwindCar.Interface.QueryHitchhikerOrderByUserID_Passenger.value,
					method: 'POST',
					data: {
						UserID: that.userInfo.userId,
					},
					success: function(res) {
						console.log('顺风车',res);
						uni.hideLoading();
						uni.stopPullDownRefresh();
						if (res.data.status) {
							for (var i = 0; i < res.data.data.length; i++) {
								var data = res.data.data[i];
								var orderType = '';
								if (data.State == 0 || data.State == 1 || data.State == 2 || data.State == 3 || data.State == 4) {
									orderType = '进行中';
								} else if (data.State == 5 || data.State == 9) {
									orderType = '未支付';
								} else if (data.State == 7 || data.State == 8) {
									orderType = '已取消';
								} else if (data.State == 6) {
									orderType = '已完成';
								}
								var obj = {
									title: '出租车-顺风车',
									titleIndex: '1',
									SpecialorderState: data.State,
									time: data.OrderTime,
									orderType: orderType,
									appointmentTime: data.AppointmentTime,
									money: data.EstimatePrice,
									startAddress: data.StartAddress,
									endAddress: data.EndAddress,
									orderNumber: data.OrderNumber,
									driverName: data.DriverName,
									appointment: true,
								}
								that.info.push(obj);
								if (orderType == '已完成') {
									that.finishArr.push(obj);
								} else if (orderType == '等待司机接单' || orderType == '进行中' || orderType == '待上车') {
									that.goingArr.push(obj);
								} else if (orderType == '未支付') {
									that.unfinishArr.push(obj);
								} else if (orderType == '已取消') {
									that.cancelArr.push(obj);
								}
							}
						}
					},
					fail() {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				})
			},
			CancelSfcOrder: function(OrderNumber) { //取消顺风车订单
				let that = this;
				uni.showModal({
					content: "您确定要取消订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url:$downwindCar.Interface.CancelHitchhikerOrder_Passenger.value,
								method: 'POST',
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									if (res.data.status) {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								},
								fail() {
									uni.showToast({
										title: "网络连接失败",
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			SfcOrderDetail: function(item) { //顺风车详情
				if (item.orderType == '进行中') {
					uni.navigateTo({
						url: '../../pages_CZC/pages/CZC/DownWindCarOrder?orderNumber=' + item.orderNumber,
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/DownWindCarDetail?orderNumber=' + item.orderNumber,
					})
				}
			},
			DeleteSfcOrder: function(OrderNumber) { //顺风车删除订单
				let that = this;
				uni.showModal({
					content: "您确定要删除订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: $downwindCar.Interface.DeleteHitchhikerOrder_Passenger.value,
								method: 'POST',
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									// console.log(res)
									if (res.data.status) {

										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								}
							})
						}
					}
				})
			},
			GotoSfcPay: function(value) {
				uni.navigateTo({
					url: "../../pages_CZC/pages/CZC/DownWindCarPay?orderNumber=" + value
				})
			},
			CheckSfcPayState: function(orderNumber) { //检测支付状态
				let that = this;
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.request({
					url: $privateTaxi.Interface.CheckPayState.value,
					method: $privateTaxi.Interface.CheckPayState.method,
					data: {
						payType: payPlatform,
						orderNumber: orderNumber
					},
					success(res) {
						console.log(res);
						if (res.data.status) {
							that.CancelSfcOrder1(orderNumber);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail() {
						uni.hideLoading();
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			SfcBouncePay: function(orderNumber,money) {
				let that = this;
				var payPlatform = 3; //支付类型如：支付宝=2,App=3,公众号=4,小程序=5等
				// #ifdef H5
				payPlatform = 4;
				//  #endif
				// #ifdef MP-WEIXIN
				payPlatform = 5;
				//  #endif
				uni.request({
					url: $privateTaxi.Interface.BouncePay.value,
					method: $privateTaxi.Interface.BouncePay.method,
					data: {
						payType: payPlatform,
						orderNumber: orderNumber,
						// price:that.FactPayPrice
						price: money
					},
					success(res) {
						console.log(res)
						if (res.data.status) {
							that.CheckSfcPayState(orderNumber)
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail(res) {
						uni.hideLoading()
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			CancelSfcOrder1: function(orderNumber) {
				//取消订单
				let that = this;
				uni.request({
					url:$downwindCar.Interface.CancelHitchhikerOrder_Passenger.value,
					method: 'POST',
					data: {
						OrderNumber: orderNumber,
						UserId: that.userInfo.userId,
					},
					success: function(res) {
							uni.hideLoading();
						let data = res.data.data;
						if (res.data.status) {
							uni.showToast({
								title: '取消成功',
								icon: 'none',
							});
							uni.startPullDownRefresh();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function(res) {
						uni.hideLoading()
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				});

			},
			SfcConfirmCancel: function(value) {
				let that = this;
				uni.showModal({
					title: "取消订单",
					content: "您是否取消订单",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
							})
							if (value.SpecialorderState == 0 || value.SpecialorderState == 1 || value.SpecialorderState == 2) {
								that.SfcBouncePay(value.orderNumber,value.money);
							
							} else {
								that.CancelSfcOrder1(value.orderNumber);
								uni.hideLoading()
							}
						}
					},
					fail: function(res) {
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				})
			},
			//-------------------------顺风车专线代码结束-------------------------

			//-------------------------景区门票代码开始-------------------------
			//-------------------------请求订单列表-------------------------
			toFinished: function() {
				var that = this;
				uni.request({
					url: $lyfw.Interface.spt_RequestTicketsList.value,
					method: $lyfw.Interface.spt_RequestTicketsList.method,
					data: {
						userId: this.userInfo.userId
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log('景区门票',res);
						
						if (res.data.status == true) {
								for (var i = 0; i < res.data.data.length; i++) {
										that.info.push(res.data.data[i]);
								}
								for (var i = 0; i < res.data.data.length; i++) {
									if (res.data.data[i].orderType == '已完成' || res.data.data[i].orderType == '已使用') {
										that.finishArr.push(res.data.data[i]);
									} else if (res.data.data[i].orderType == '进行中' || res.data.data[i].orderType == '待使用') {
										that.goingArr.push(res.data.data[i]);
									} else if (res.data.data[i].orderType == '未支付' || res.data.data[i].orderType == '待支付') {
										that.unfinishArr.push(res.data.data[i]);
									} else if (res.data.data[i].orderType == '已取消' || res.data.data[i].orderType == '已退票' || res.data.data[i].orderType == '支付超时' || res.data.data[i].orderType == '已失效') {
										that.cancelArr.push(res.data.data[i]);
									}
								}
							//执行旅游产品列表接口
							// that.tp_orderListData();
							uni.hideLoading();
							uni.stopPullDownRefresh();
						} else {
							uni.hideLoading();
							uni.stopPullDownRefresh();
							uni.showToast({
								title:'无订单数据',
								icon:'none'
							})
							// that.tp_orderListData();
							
						}
						
					},
					fail:function(){
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
			},
			
			//-------------------------请求旅游产品订单列表-------------------------
			tp_orderListData: function() {
				var that = this;
				uni.request({
					url: $lyfw.Interface.lyky_RequestTicketsList.value,
					method: $lyfw.Interface.lyky_RequestTicketsList.method,
					data: {
						userId: this.userInfo.userId
					},
							
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log('旅游产品',res);
						
						if (res.data.status == true) {
							for (var i = 0; i < res.data.data.length; i++) {
									that.info.push(res.data.data[i]);
							}
							
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].orderType == '已使用') {
									that.finishArr.push(res.data.data[i]);
								} else if (res.data.data[i].orderType == '待使用' || res.data.data[i].orderType == '待选车') {
									that.goingArr.push(res.data.data[i]);
								} else if (res.data.data[i].orderType == '待支付') {
									that.unfinishArr.push(res.data.data[i]);
								} else if (res.data.data[i].orderType == '已取消' || res.data.data[i].orderType == '已退票' || res.data.data[i].orderType == '支付超时' || res.data.data[i].orderType == '已失效') {
									that.cancelArr.push(res.data.data[i]);
								}
							}
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					},
					fail:function(){
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
			},
			//-------------------------景区门票-打开二维码弹框-------------------------
			open5: function(e) {
				uni.showLoading({
					title: '生成中...'
				})
				this.orderIndexData = e;
				this.make(e);
			},
			//-------------------------景区门票-关闭二维码弹框-------------------------
			close5() {
				this.$refs.popup5.close()
			},
			//-------------------------景区门票-打开退票弹框-------------------------
			open2: function(e, exitindex) {
				// console.log(e)
				// console.log(exitindex)
				var that = this;
				if(exitindex == 'cs2tui') {
					// console.log(e)
					that.csRefundInfo = e;
					that.exitindex = exitindex;
					that.$refs.popup2.open()
				}else {
					that.ticketOrderNumber = e;
					that.exitindex = exitindex;
					that.$refs.popup2.open()
				}
				
				// console.log(this.ticketOrderNumber)
				// console.log(this.exitindex)
				
			},
			//-------------------------景区门票-关闭退票弹框-------------------------
			close2() {
				this.$refs.popup2.close()
			},
			//-------------------------景区门票-打开取消弹框-------------------------
			open3(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup3.open()
			},
			//-------------------------景区门票-关闭取消弹框-------------------------
			close3() {
				this.$refs.popup3.close()
			},
			//-------------------------景区门票-打开删除弹框-------------------------
			open4(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup4.open()
			},
			//-------------------------景区门票-关闭删除弹框-------------------------
			close4() {
				this.$refs.popup4.close()
			},

			//-------------------------旅游产品-选车班车-------------------------
			chooseShuttle:function(e){
				// console.log(e)
				uni.showLoading({
					title:'正在加载班次...'
				})
				uni.setStorage({
					key:'chooseShuttleData',
					data:e,
					success: (res) => {
						// console.log(res)
						if(e.startStation == ''){
							uni.navigateTo({
								url:'../../pages_LYFW/pages/LYFW/tourismProducts/tp_chooseShuttle?originIndex=0'
							})
							uni.hideLoading()
						}else if(e.backstartStation == ''){
							uni.navigateTo({
								url:'../../pages_LYFW/pages/LYFW/tourismProducts/tp_chooseShuttle2?originIndex=1'
							})
							uni.hideLoading()
						}
					},
					fail:function(){
						uni.showToast({
							title:'网络异常',
							icon:'none'
						})
					}
				})
				
			},
			//-------------------------景区门票-详情跳转-------------------------
			details(e,index) {
				if(index =='3'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/orderDetails?orderNumber=' + e,
					})
					
				}else if(index =='5'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/tourismProducts/tp_orderDetails?orderNumber=' + e,
					})
				}
			},
			//-------------------------景区门票-去支付跳转-------------------------
			topay(e,index) {
				if(index =='3'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + e
					})
					
				}else if(index =='5'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/tourismProducts/tp_selectivePayment?orderNumber=' + e
					})
				}
				
			},
			//-------------------------景区门票-再次购买-------------------------
			repurchase(e,index) {
				if(index =='3'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsDetails?ticketId=' +e
					})
					
				}else if(index =='5'){
					uni.navigateTo({
						url: '../../pages_LYFW/pages/LYFW/tourismProducts/tp_ticketsDetails?ticketId=' +e
					})
				}
			},
			//-------------------------景区门票-退票-------------------------
			refund: function() {
				uni.showLoading({
					title: '请求退票中...'
				})
				var that = this
				if (this.exitindex == '2') {
					//请求费率
					// this.GetBounceChargeByOrderNumber(that.ticketOrderNumber)
					// that.ky_currentType = '客运退票';
					//先查询订单状态-->执行费率查询-->执行退票
					that.refund_getTicketPaymentInfo(that.ticketOrderNumber)
				} else if(this.exitindex == 'cs2tui'){
					//先检测订单支付状态再执行退票操作
					this.cs_refundStateCheck(that.csRefundInfo)
				}else if (that.exitindex == '3') {
					console.log('景区门票')
					console.log(this.exitindex)
					uni.request({
						url: $lyfw.Interface.spt_BounceTickets.value,
						method: $lyfw.Interface.spt_BounceTickets.method,
						data: {
							orderNumber: that.ticketOrderNumber,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if(e.data.status==false){
								uni.hideLoading()
								uni.showToast({
									title: '退票失败，服务器异常，请联系客服！',
									icon: 'none',
								})
							}else if(e.data.status==true){
								uni.hideLoading()
								uni.showToast({
									title: '退票成功',
								})
								this.close2()
								uni.startPullDownRefresh()
							}
							
						},
						fail: function() {
							uni.showToast({
								title: '退票失败，网络异常',
								icon: 'none',
							})
							uni.hideLoading()
						}
					})
				}else if (this.exitindex == '5'){
					console.log('旅游产品')
					uni.request({
						url: $lyfw.Interface.lyky_BounceTickets.value,
						method: $lyfw.Interface.lyky_BounceTickets.method,
						data: {
							orderNumber: that.ticketOrderNumber,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if(e.data.status==false){
								uni.hideLoading()
								uni.showToast({
									title: '退票失败，服务器异常，请联系客服！',
									icon: 'none',
								})
							}else if(e.data.status==true){
								uni.hideLoading()
								uni.showToast({
									title: '退票成功',
								})
								this.close2()
								uni.startPullDownRefresh()
							}
							
						},
						fail: function() {
							uni.showToast({
								title: '退票失败，网络异常',
								icon: 'none',
							})
							uni.hideLoading()
						}
					})
				}


			},

			//-------------------------景区门票-取消-------------------------
			cancel: function() {
				if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_CancelTickets.value,
						method: $lyfw.Interface.spt_CancelTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							if (e.data.msg == '订单取消成功') {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							} else if (e.data.msg == '订单取消失败') {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '4') {
					console.log(this.ticketOrderNumber);
					uni.request({
						url: $bcfw.Interface.spt_CancelTickets.value,
						method: $bcfw.Interface.spt_CancelTickets.method,
						data: {
							or_number: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if (e.data.status == true) {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							} else if (e.data.status == false) {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '2') {//客运取消
					// this.keYunCancelTicket(this.ticketOrderNumber);
					//客运取消之前先检测当前车票状态
					this.cancel_getTicketPaymentInfo(this.ticketOrderNumber);
				}else if (this.exitindex == 'cs2') {//定制巴士取消
					this.Cs_cancelStateCheck(this.ticketOrderNumber);
				}else if (this.exitindex == '5') {
					uni.request({
						url: $lyfw.Interface.lyky_CancelTickets.value,
						method: $lyfw.Interface.lyky_CancelTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							if (e.data.msg == '订单取消成功') {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							} else if (e.data.msg == '订单取消失败') {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								uni.startPullDownRefresh()
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				}
			},

			//-------------------------景区门票-删除-------------------------
			del: function() {
				if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_DeleteTickets.value,
						method: $lyfw.Interface.spt_DeleteTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 1500,
							})
							this.close4();
							uni.startPullDownRefresh()
						},
						fail() {
							uni.showToast({
								title: '删除失败！订单已删除',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '4') {
					uni.request({
						url: $bcfw.Interface.spt_DeleteTickets.value,
						method: $bcfw.Interface.spt_DeleteTickets.method,
						data: {
							or_number: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 1500,
							})
							this.close4();
							uni.startPullDownRefresh()
						},
						fail() {
							uni.showToast({
								title: '删除失败！订单已删除',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				}else if (this.exitindex == '5') {
					uni.request({
						url: $lyfw.Interface.lyky_DeleteTickets.value,
						method: $lyfw.Interface.lyky_DeleteTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 1500,
							})
							this.close4();
							uni.startPullDownRefresh()
						},
						fail() {
							uni.showToast({
								title: '删除失败！订单已删除',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				}

			},

			//-------------------------生成二维码-------------------------
			make: function(e) {
				console.log(e)
				uQRCode.make({
					canvasId: 'qrcode2',
					componentInstance: this,
					text: e.orderTicketNumber,
					size: 160,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					correctLevel: uQRCode.defaults.correctLevel,
				})
				uni.hideLoading()
				this.$refs.popup5.open()
			},
			//-------------------------景区门票代码结束-------------------------

			detail: function(item) {
				if (item == 1) {
					uni.navigateTo({
						url: '/pages/order/OrderDetail',
					})
				}
			},

			going: function(item) {
				// console.log(item)
				var state = this.taxiOrderState(item.state)
				// console.log(state)
				if (item.vehicleType == '出租车') {
					if (item.state == '0' || item.state == '1' || item.state == '2' || item.state == '3' || item.state == '4') {
						uni.navigateTo({
							url: '../../pages_CZC/pages/CZC/CallAndDrive?orderNumber=' + item.orderNumber,
						})
					} else {
						uni.navigateTo({
							url: '/pages/order/OrderDetail?orderNumber=' + item.orderNumber,
						})
					}
				}
			},
			czcComplaint: function(item) {
				console.log(item)
				if(item.title=='出租车-专线'){
					uni.navigateTo({
						url:'complaint?tsTitle=专线车&tsData=' + item.driverName +'&orderNumber='+ item.orderNumber
					})
				}
				if(item.title=='出租车-顺风车'){
					uni.navigateTo({
						url:'complaint?tsTitle=顺风车&tsData=' + item.driverName +'&orderNumber='+ item.orderNumber
					})
				}
				if(item.vehicleType == '出租车'){
					uni.navigateTo({
						url:'complaint?tsTitle=出租车&tsData=' + item.driverName +'&orderNumber='+ item.orderNumber
					})
				}
			},
			
			//------------------------------------------------跳转投诉--------------------------------------------
			czcComplaint2: function(item) {
				console.log(item)
				if(item.or_class=='包车-定制'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=包车-定制&or_name=' + item.cm_driverName +'&or_nameId='+ item.or_number
					})
				}
				if(item.or_class=='包车-专线'){
					uni.navigateTo({
						url:'../../pages_GRZX/pages/GRZX/gz_complaintsPage?or_entrance=1&or_class=包车-专线&or_name=' + item.cm_driverName +'&or_nameId='+ item.or_number
					})
				}
			},
			//-------------------包车订单添加-------------------------
			getArrayInfo: function() {
				var that = this;
				uni.request({
					url: $bcfw.Interface.spt_RequestTicketsList.value,
					method: $bcfw.Interface.spt_RequestTicketsList.method,
					data: {
						userId: this.userInfo.userId
					},
				
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log('包车服务',res);
						
						if (res.data.msg == '订单查询完成') {
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].or_Type == '6' || res.data.data[i].or_Type == '9' || res.data.data[i].or_Type ==
									'12') {} else {
									that.info.push(res.data.data[i]);
								}
				
							}
							if (res.data.data !== '') {
								for (var i = 0; i < res.data.data.length; i++) {
									if (res.data.data[i].or_Type == '13') {
										that.finishArr.push(res.data.data[i]);
									} else if (res.data.data[i].or_Type == '0' || res.data.data[i].or_Type == '1' || res.data.data[i].or_type ==
										'2' || res.data.data[i].or_type ==
										'3' || res.data.data[i].or_Type == '4' || res.data.data[i].or_Type == '10' || res.data.data[i].or_Type ==
										'11') {
										that.goingArr.push(res.data.data[i]);
									} else if (res.data.data[i].or_Type == '5') {
										that.unfinishArr.push(res.data.data[i]);
									} else if (res.data.data[i].or_Type == '8' || res.data.data[i].or_Type == '7') {
										that.cancelArr.push(res.data.data[i]);
									}
								}
							}
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					},
					fail:function(){
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
			},
			//-------------------------拨打电话-------------------------
			tel: function(e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			//-------------------------包车-详情跳转-------------------------
			details2(e) {
				uni.navigateTo({
					url: '../../pages_BCFW/pages/BCFW/bf_charterMap?or_number=' + JSON.stringify(e)
				})
			},
			//-------------------------包车-去支付-------------------------
			topay2: function(e) {
				uni.navigateTo({
					url: '../../pages_BCFW/pages/BCFW/charteredBusPayment?or_number=' + JSON.stringify(e)+'&&state=1'
				})
			},
			//-------------------------包车-去支付-------------------------
			topay3: function(e) {
				uni.navigateTo({
					url: '../../pages_BCFW/pages/BCFW/balacePayment?or_number=' + JSON.stringify(e)
				})
			},
			//-------------------------判断订单状态-------------------------
			getBCstate(param) {
				if (param == '1') {
					return '已接单'
				} else if (param == '0') {
					return '等待接单'
				} else if (param == '2') {
					return '已出发'
				} else if (param == '3') {
					return '司机已到出发地'
				} else if (param == '4') {
					return '进行中'
				} else if (param == '5') {
					return '待支付'
				} else if (param == '10') {
					return '到达目的地'
				} else if (param == '8' || param == '7') {
					return '已取消'
				} else if (param == '13') {
					return '已完成'
				}  else if (param == '11') {
				 	return '待补款'
				 }
			},
			getCurrent(){
				var that=this;
				uni.getStorage({
					key:'currentNum',
					success(res){
						that.current=res.data;
						console.log(that.current,"that.current")
						uni.removeStorageSync('currentNum');
					},
					fail(){
						that.current=0;
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		display: flex;
		/* 设置当前内容全部水平布局 */
	}

	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		align-items: center;
		/* 设置内容中心点对齐 */
	}

	.u-f-jc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
		/* 设置左右两边靠边布局 */
	}

	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
		padding-bottom: 48upx;
	}

	.pageView {
		/* #ifdef H5 */
		padding-bottom: 112upx;
		/* #endif */
	}
	.CZCwhiteBg {
		position: relative;
		margin: 30rpx;
		// margin-top: -20rpx;
		padding: 20rpx 0;
		padding-bottom: 140rpx;
		width: 698rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		// box-shadow: 0 0 5rpx 0rpx #aaa;
	}
	.Btn {
		// padding-top: 32upx; 
		margin: 0 0 0 20rpx;
		font-size: 26rpx;
		border-radius: 8upx;
		border: 0.1 solid #06B4FD;
		background-color: #fff;
		color: #666666;
	}

	//白底1
	.whiteBg {
		position: relative;
		margin: 52rpx 26rpx;
		// margin-top: -20rpx;
		padding: 48rpx 0;
		padding-bottom: 148rpx;
		width: 698rpx;
		height: 340rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		// box-shadow: 0 0 5rpx 0rpx #aaa;
	}

	.bluering {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #06B4FD;
		background: #06B4FD;
		border-radius: 100%;
		margin-left: 96rpx;
	}

	.redring {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #FC4646;
		background: #FC4646;
		border-radius: 100%;
		margin-left: 96rpx;
	}


	.tabs {
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		height: 140upx;
		z-index: 99999;

	}

	.scroll-h {
		width: 670upx;
		height: 80upx;
		margin: 0 40rpx 0 20rpx;
		white-space: nowrap;
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
			border-bottom-style: solid;
			border-bottom-width: 1px; */
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {

		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 38upx;
		padding-right: 28upx;
	}

	.uni-tab-item-title {
		color: #2C2D2D;
		font-size: 30upx;
		height: 80upx;
		line-height: 42upx;
		font-weight: 400;
		flex-wrap: nowrap;
		/* #ifndef APP-VUE */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		border-bottom: 1rpx solid #007AFF;
	}

	// 购买时间
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}

	//门票列表内容
	.at_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;

		.at_titleView {
			position: relative;
			display: flex;

			.at_icon {
				position: relative;
				top: 6upx;
				width: 40upx;
				height: 34upx;
			}
			.at_textView{
				padding-left: 20upx;
				width: 450upx;
				overflow: hidden;
				.at_title {
					
				}
			}
			

			.at_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}

		//内容区
		.at_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;

			.at_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.at_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
			}

			.at_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}

		//按钮区
		.at_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			// 按钮
			.at_button {
				padding: 18upx 36upx;
				font-size: 30upx;
				border-radius: 40upx;
			}

			// 详情 - 实心蓝
			.at_btDetails {
				background: #3EABFC;
				border: 1upx solid #3EABFC;
				color: #FFFFFF;
				
			}

			//二维码/再次购买 - 实心橙
			.at_btQrCode {
				background: #FF6600;
				border: 1upx solid #FF6600;
				margin-right: 24upx;
				color: #FFFFFF;
			}

			//删除/退票 - 空心灰
			.at_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 24upx;
			}

			//去支付 - 实心绿
			.at_btToPay {
				background: #02c501;
				border: 1upx solid #02c501;
				color: #FFFFFF;
				margin-right: 24upx;
			}
		}
	}

	.kywhiteBg {
		position: relative;
		margin: 40rpx 26rpx;
		padding: 48rpx 0;
		padding-bottom: 120rpx;
		width: 698rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}

	//客运按钮区
	.CTKYBtnView {
		margin-top: 30upx;
		display: flex;
		float: right;
		margin-bottom: 20rpx;

		.allBtn {
			padding: 0 20upx;
			// padding-top: 32upx;
			font-size: 26upx;
			border-radius: 8upx;
			border: 0.1 solid #06B4FD;
			margin-right: 30upx;
			background-color: #fff;
			color: #666666;
		}

		//支付
		.payBtn {
			background-color: #FC4646;
			color: #ffffff;
		}
		//支付
		.czcpayBtn {
			background-color: #FC4646;
			color: #ffffff;
			margin-right: 32rpx;
		}

		//二维码
		.QRCode {
			background-color: #06B4FD;
			color: #06B4FD;
		}
	}
	/* 点击文字框后样式 */
	.cur {
		height:54rpx;
		border-width: 1px;
		border-radius:8rpx; 
		padding: 8rpx; 
		margin-top: 30rpx;
		margin-right: 20rpx;
		background-color: #FC4646;
		border-color: #FC4646;
	}
	/* 客运评价弹框点击文字后样式 */
	.color{
		color: #FFFFFF;
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
	}
	.unCur{
		height:54rpx;
		border-width: 1px;
		border-color: #AAAAAA;
		border-radius:8rpx; 
		padding: 8rpx; 
		margin-top: 30rpx;
		margin-right: 20rpx;
	}
	.unColor{
		color:#AAAAAA;
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
	}
	.textArea{
		height:164rpx;
		border-width: 1px;
		padding: 10rpx;
		border-color: #AAAAAA;
		border-radius:6rpx;
		margin-top: 30rpx;
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#999999;
	}
	//站点标题
	.stationTitle {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #2C2D2D;
		font-size: 34rpx;
		font-weight: bold;
		width: 70%;
	}

	//预定日期---LJH
	.reserveDate {
		padding: 12rpx 25rpx;
		background-color: #06B4FD;
		color: #FFFFFF;
		border-radius: 32rpx;
		font-size: 24rpx;
	}

	//须知弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;

		.box_titleView {
			margin: 24upx 0;

			//弹框标题
			.box_title {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.box_icon {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		// 二维码弹框
		.box_qrCodeView {
			margin: 24upx 0upx;
			text-align: center;

			.box_qrCodeImage {
				margin-top: 24upx;
				width: 320upx;
				height: 320upx;
			}

			.box_qrCodeTextView {
				text-align: center;

				.box_qrCodeText {
					margin-top: 16upx;
					display: block;
					font-size: 30upx;
				}
			}
		}

		// 退款弹框
		.box_refundView {
			margin: 24upx 0upx;

			.box_refundText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #333;
			}

			//确认退票
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;

				.box_refundContentTitle {
					font-weight: bold;
				}

				.box_refundContentText {
					margin-top: 24upx;
					display: block;
					font-size: 28upx;
					color: #888;
				}
			}

			.box_refundButtonView {
				text-align: center;
				margin: 56upx 0;

				//确认按钮
				.box_refundButton {
					color: #FFFFFF;
					border-radius: 56upx;
					background: #FF6600;
					padding: 24upx 160upx;
				}
			}
		}
	}

	//包车定制内容
	.cm_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;

		.cm_titleView {
			position: relative;

			.cm_icon {
				position: relative;
				top: 4upx;
				width: 34upx;
				height: 38upx;
			}

			.cm_title {
				margin-left: 24upx;
			}

			.cm_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}

		//内容区
		.cm_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;

			.cm_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.cm_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
				position: absolute;
				top: 25upx;
			}

			.cm_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}

		//按钮区
		.cm_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			.cm_omit {
				display: flex;
				position: relative;
				top: 10upx;
				width: 50upx;
				height: 50upx;
				margin-right: 16upx;
			}

			// 按钮
			.cm_button {
				padding: 18upx 48upx;
				padding-top: 22upx;
				font-size: 22upx;
				border-radius: 80upx;
			}

			// 详情 - 空心灰
			.cm_btDetails {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			// 联系司机 - 实心橙
			.cm_contact {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}


			//取消- 空心灰
			.cm_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			//去支付 - 实心橙
			.cm_btToPay {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}
		}
	}
</style>
