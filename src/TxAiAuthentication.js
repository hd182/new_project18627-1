const crypto = require('crypto');
const config = {
	    appId:'你的appId',
	    appKey:'你的appKey'
	  };
class ai{
	//字典排序
	objKeySort(arys){
		let newkey = Object.keys(arys).sort();
	    //console.log('newkey='+newkey);
	    let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	    for (let i = 0; i < newkey.length; i++) {
	        //遍历newkey数组
	        newObj[newkey[i]] = arys[newkey[i]];
	        //向新创建的对象中按照排好的顺序依次增加键值对
	    }
	    return newObj; //返回排好序的新对象
	}
	//URL拼接
	jsonToURL(param){
		if (param == null) return "";
	    let paramStr = "";
	    let t = typeof param;
	    for (let i in param) {
        	console.log(i);
            paramStr +="&" + i + "=" +encodeURIComponent(param[i]);
        }
	    return paramStr;
	}
	//生成随机数
	randomNumber(){
		let arrStr='abcdefghijklmnopqrstuvwxyz0123456789'.split('');
		let strlen=Math.floor(20+Math.random()*10);
		let str='';
		for(let i=0;i<strlen;i++){
			str+=arrStr[Math.floor(Math.random()*arrStr.length)];
		}
		return str;
	}
	//MD5加密生成sign
	getReqData(param){
	    param['app_id'] = config.appId;
	    param['nonce_str'] = this.randomNumber();
	    param['time_stamp'] = Math.floor(new Date().getTime() / 1000);//生成秒级时间戳
	    let json = this.objKeySort(param);
	    console.log(json);
	    let str = this.jsonToURL(json);
	    str = str.substr(1, str.length);
	    str += "&" + "app_key" + "=" + config.appKey;
	    let md5Str = crypto.createHash("md5WithRSAEncryption").update(str || "").digest("hex");//md5加密
	    let sign=md5Str.toUpperCase();//生成的sign
	    param.sign=sign;
	    return param;//返回请求时需要的参数
	}

}
module.exports=ai;
