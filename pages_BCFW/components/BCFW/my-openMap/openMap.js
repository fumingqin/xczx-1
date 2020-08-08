import TransformCoordinate from './transformCoordinate.js'

//高德 sourceApplication 参数
let appname = 'zhcx';

//百度src格式为：andr.companyName.appName or ios.companyName.appName
let andrBaiDuSrc = 'andr.jdt.zhcx';
let iosBaiDuSrc = 'ios.jdt.zhcx';

function openMapByDefault(latitude, longitude, name) {
	uni.openLocation({
		latitude: latitude,
		longitude: longitude,
		name: name,
		fail: () => {
			uni.showModal({
				content: '打开地图失败,请重试'
			})
		},
	})
}
function openMapByAndroid(latitude, longitude, name) {
	let url = ''; // 回调地址
	let identity = ''; // 程序名称
	//先判断第三方程序是否存在
	if(plus.runtime.isApplicationExist({pname: 'com.baidu.BaiduMap'})) { // baidumap
		//url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
		url = `baidumap://map/navi?location=${latitude},${longitude}&type=DEFAULT&coord_type=gcj02&src=${andrBaiDuSrc}`;
		console.log('安卓百度地图');
		identity = 'com.baidu.BaiduMap';
		openURL(url, identity);
	}
	else if(plus.runtime.isApplicationExist({pname: 'com.autonavi.minimap'})) { // 高德
		//安卓-高德-导航
		url = `androidamap://navi?sourceApplication=${appname}&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0` 
		console.log('安卓高德地图');
		identity = 'com.autonavi.minimap'
		openURL(url, identity)  
	}
	else {
		openMapByDefault(latitude, longitude, name)
	}
}
function openMapByIos(latitude, longitude, name) {
	let url = ''; // 回调地址
	let errorCB = ''; // url失败的回调地址
	let identity = ''; // 程序名称

	if(plus.runtime.isApplicationExist({action: 'baidumap://'})) { // baidumap
		//苹果-百度-导航
		url = `baidumap://map/navi?location=${latitude},${longitude}&type=DEFAULT&coord_type=gcj02&src=${iosBaiDuSrc}`;
		console.log('苹果百度地图');
		openURL(url, identity)
	}
	else if(plus.runtime.isApplicationExist({action: 'iosamap://'})) { // 高德
		//苹果-高德-导航
		url = `iosamap://navi?sourceApplication=${appname}&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
		console.log('苹果高德地图');
		openURL(url, identity)
	} 
	else {
		openMapByDefault(latitude, longitude, name)
	}
}
function openURL(url, identity ) {
	let newurl = encodeURI(url);
	plus.runtime.openURL( newurl, function(res){
		uni.showModal({
			content: res.message
		})
	}, identity);
}
function getCoordByType(longitude, latitude, coord_type) {
	switch (coord_type){
		case 'gcj02':
			return [longitude, latitude]
			break;
		case 'bd09':
			return TransformCoordinate.bd09togcj02(longitude, latitude)
			break;
		case 'wgs84':
			return TransformCoordinate.wgs84togcj02(longitude, latitude)
			break;
		default:
			return [longitude, latitude]
			break;
	}
}

export default {
	/* 打开地图 */
	openMap(latitude, longitude, name, coord_type='gcj02') {
		let arr = getCoordByType(longitude, latitude, coord_type)
		// #ifdef APP-PLUS
		switch(uni.getSystemInfoSync().platform){
			case 'android':
				openMapByAndroid(arr[1], arr[0], name)
				break;
			case 'ios':
				openMapByIos(arr[1], arr[0], name)
				break;
			default:
				openMapByDefault(arr[1], arr[0], name)
				console.log('运行在开发者工具上')	
				break;
		}	
		// #endif
		// #ifndef APP-PLUS
		openMapByDefault(arr[1], arr[0], name)
		// #endif
	}
}