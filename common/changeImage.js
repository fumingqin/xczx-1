import $oSit from '@/common/overallSituation.js';
// #ifdef H5
	const Url=$oSit.Interface.address.Url;
// #endif
// #ifndef H5
	const Url=$oSit.Interface.address.Url;
// #endif


//获取图片的路径
async function GetImage(systemName,type) {
	// #ifdef MP-WEIXIN
	// #endif
	var openidtype="XCX";
	var model=-1;
	if(systemName=="南平综合出行"){
		model=5;
	}else if(systemName=="漳州达达通"){
		model=11;
	}
	
	if(model==-1){
		console.log('项目名暂未添加图片')
	}else{
		var res = await request(model,systemName,openidtype,type)
		return res;
	}
}

//request请求
function request (model,systemName,openidtype,type) {
  return new Promise(function (resolve, reject) {
	  // console.log("系统名称",systemName)
	  // console.log("应用类型","XCX")
	  // console.log("访问地址",Url+'/api/zhcx/getImage')
    uni.request({
    	url:Url+'/api/zhcx/getImage',
    	data:{
    		model:model, //模块名称
			systemtype:openidtype,//应用类型
			companyid:systemName, //公司名称
			type:type, //图片类型
    	},
    	method:'POST',
    	success(res){
    		// console.log("获取图片",res)
			resolve(res.data.data.imageUrl)
    	},
    	fail(err){
    		console.log(err,"err")
			reject('-1');
    	}
    })
  })
}

//弹窗提示
function showToast(title,icon){
	var sign=icon==undefined?'none':icon;
	uni.showToast({
		title:title,
		icon:sign,
	})
}

// 接口声明区
export default {
	GetImage,showToast
}