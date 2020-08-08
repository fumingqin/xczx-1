/* 接口参数区 */
// 示例
import $oSit from '@/common/overallSituation.js'
// const Url='http://zntc.145u.net';
// const Url = 'https://zntc.145u.net:9099';//接口地址
//const ddtUrl='http://111.231.109.113:8004' //达达通接口地址
//const Url = 'https://zntc.145u.net:9098';//综合出行接口地址
//const Url = 'http://zntc.145u.net'; //http请求

//接口域名
const Url=$oSit.Interface.address.Url;

//接口对象
const KyInterface = {
	//GET-POST
	//--------------------------------------专线购票--------------------------------------
	Cs_GetInsuranceCheckState:{
		Url: Url + '/api/person/getallline',
		name:'专线购票选择地址',
		method:'POST',
	},
	
	//--------------------------------------购票须知--------------------------------------
	Cs_getByTitle:{
		Url: Url + '/api/ky/getByTitle',
		name:'购票须知',
		method:'POST',
	},
}
// 接口声明区
export default {
	KyInterface
}