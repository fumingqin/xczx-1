/* 接口参数区 */
// 示例

const GaoDeWebKey = [
	"2348ba1d476b5e44917533b65583f969", 
	"1df2cef2c0e71acc0ed1e90d5bf6431a"
]

//接口域名
const Url = 'http://111.231.109.113:8002';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
]

const Interface = []


// 接口声明区
export default {
	GaoDeWebKey,
	InterfaceAddress
}