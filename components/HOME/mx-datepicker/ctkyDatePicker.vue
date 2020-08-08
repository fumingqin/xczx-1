<template>
  <view class="min-picker">

        <view class="picer-top" >
          <view @click="cacel" style="padding-left: 20rpx;">取消</view>
          <view @click="sure" style="padding-right: 20rpx;" class="sure">确认</view>
        </view>
          <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:400rpx;">
              <picker-view-column >
                  <view class="picker item"  v-for="(item,index) in years" :key="index">{{item}}年</view>
              </picker-view-column>
              <picker-view-column>
                  <view class="picker item" v-for="(item,index) in months" :key="index">{{item}}月</view>
              </picker-view-column>
              <picker-view-column>
                  <view class="picker item"  v-for="(item,index) in days"  :key="index">{{item[getToday(index)]}}日</view>
              </picker-view-column>
			  
			  <!-- <picker-view-column>
			      <view class="picker item" v-for="(item,index) in hours" :key="index">{{item}}点</view>
			  </picker-view-column>
			  <picker-view-column>
			      <view class="picker item"  v-for="(item,index) in minutes" :key="index">{{item}}分</view>
			  </picker-view-column> -->
          </picker-view>

  </view>
</template>
<script>
export default {
  props: {
	  start:{
		  type:Number
	  }
  },
  data () {
    return {
      years: [],
      months: [],
      days: [],
	  hours:[],
	  minutes: [],
      dayLength: 30,
	  hourLength: 24,
	  minuteLength: 60,
      value: [0, 0, 0],
      visible: false,
	  flag:false,
	  dayIndex:'',
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}rpx;`
    }
  },
  mounted () {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
	const hour = time.getHours()
	const minute = time.getMinutes()
    this.dayLength = this.getDaysInOneMonth(year, month)
	// 这里自定义传参，来设置开始时间和结束时间，不再演示
    this.getYears()
    this.getMonth()
    this.getDays()
	this.getHours()
	this.getMinute()
  },
  methods: {
    bindChange: function (e) {
	  this.flag = true
      const val = e.detail.value
      this.year = this.years[val[0]] 
      this.month = this.months[val[1]]
      this.day = this.days[val[2]]
	  // this.hour = this.hours[val[2]]
	  // this.minute = this.minutes[val[3]]
    },
    // 获得年份
    getYears () {
      const time = new Date()
      for (let i = time.getFullYear(); i < 2085; i++) {
        this.years.push(i)
      }
    },
    // 获取月份
    getMonth () {
      const time = new Date()
      for (let i = time.getMonth() + 1; i <= 12; i++) {
        this.months.push(i)
      }
    },
    getDays () {
      //  this.dayLength
      const time = new Date()
	  // let i = time.getDate()
      for (let i = 1; i <= this.dayLength; i++) {
        this.days.push(i)
      }
    },
	getHours () {
		const time = new Date()
		for(let i = time.getHours(); i <= this.hourLength; i++) {
			this.hours.push(i);
		}
	},
	getMinute () {
		const time = new Date()
		for(let i = time.getMinutes(); i <= this.minuteLength; i++) {
			this.minutes.push(i);
		}
	},
	//判断当前日期
	getToday(item){
		var that = this;
		const time = new Date()
		let date = time.getDate()
		for(let i = 0;i < that.days;i++){
			if(item == date) {
				that.dayIndex = i;
				return that.dayIndex;
			}else {
				return i
			}
		}
	},
    // 获取某年某月多少天
    getDaysInOneMonth (year, month) {
      month = parseInt(month, 10)
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    // 取消
    cacel () {
      this.$emit('cancel', false)
    },
    // 确认
    sure () {
		if(!this.flag){
			this.$emit('cancel', false)
			this.$emit('sure', { year: this.years[0], month: this.months[0], day: this.days[0], hour:this.hours[0], minute:this.minutes[0]})
			return
		}
      this.$emit('cancel', false)
      this.$emit('sure', { year: this.year, month: this.month, day: this.day, hour:this.hour, minute:this.minute})
    }
  }
}
</script>
<style lang="scss" scoped>

.picer-top{
    width: 100%;
    height: 100rpx;
    display: flex;
	background-color: #FFFFFF;
	border-bottom: 1rpx solid #AAAAAA;
    justify-content: space-between;
    align-items: center;
	font-size: 30rpx;
    .sure{
     color: #007aff;
    }
    }
  .picker{
	background-color: #FFFFFF;
    text-align: center;
    line-height: 70rpx;
  }
</style>
