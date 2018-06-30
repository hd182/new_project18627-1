const crypto = require('crypto');
const request=require('request');
const fs=require('fs')
const config = {
	    appId:'xxxxx',//申请的腾讯ai项目app_id
	    appKey:'xxxx'//申请的腾讯ai项目appkey
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
	jsonToURL(param, key, encode){
		if (param == null) return "";
	    let paramStr = "";
	    let t = typeof param;
	    if (t == "string" || t == "number" || t == "boolean") {
	        paramStr +="&" +key +"=" +(encode == null || encode ? encodeURIComponent(param) : param);
	    } else {
	        for (let i in param) {
	            let k = key == null? i: key + (param instanceof Array ? "[" + i + "]" : "." + i);
	            paramStr += this.jsonToURL(param[i], k, encode);
	        }
	    }

	    return paramStr;
	}
	//URL编码处理
	// URLEncode(clearString){
	// 	let output = "";
	//     let x = 0;
	//     clearString = clearString.toString();
	//     let regex = /(^[a-zA-Z0-9-_.]*)/;
	//     while (x < clearString.length) {
	//         let match = regex.exec(clearString.substr(x));
	//         if (match != null && match.length > 1 && match[1] != "") {
	//             output += match[1];
	//             x += match[1].length;
	//         } else {
	//             if (clearString.substr(x, 1) == " ") {
	//                 //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问,
	//                 //修改后两种浏览器都可兼容
	//                 output += "+";
	//             } else {
	//                 let charCode = clearString.charCodeAt(x);
	//                 let hexVal = charCode.toString(16);
	//                 output +="%" + (hexVal.length < 2 ? "0" : "") + hexVal.toUpperCase();
	//             }
	//             x++;
	//         }
	//     }
	//     return output;
	// }
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
	    let str = this.jsonToURL(json);
	    str = str.substr(1, str.length);
	    str += "&" + "app_key" + "=" + config.appKey;
	    let md5Str = crypto.createHash("md5WithRSAEncryption").update(str || "").digest("hex");
	    let sign=md5Str.toUpperCase();
	    param.sign=sign;
	    return param;
	}

	// ceshi(img){
	// 	console.log('ok');
	// 	console.log(this.randomNumber());
	// 	let submitData={
	// 		app_id: config.appId,
	//         image: img,
	//         model: 8,
	//         nonce_str: this.randomNumber(),
	//         time_stamp: Math.floor(new Date().getTime() / 1000)
	//     };
	//     // console.log(submitData);
	// 	console.log(this.getReqSign(submitData));
	// 	if(submitData["sign"]){
	// 		delete submitData["sign"];
	// 	}

	// 	submitData['sign']=this.getReqSign(submitData);
	// 	console.log('打印参数',submitData['sign']);
	// 	request.post({
	// 		url:'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
	// 		form:submitData
	// 	},function(err,httpResponse,body){
	// 		// body.data.image
			
	// 		body=JSON.parse(body);
	// 		console.log(typeof(body));
	// 		console.log(body.msg);
	// 		let path = './upload/'+ Date.now() +'.png';//从app.js级开始找--在我的项目工程里是这样的
	//         // let base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
	//         let dataBuffer = new Buffer(body.data.image, 'base64'); //把base64码转成buffer对象，
	//         // console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
	//         fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
	//             if(err){
	//                 console.log(err);
	//             }else{
	//                console.log('写入成功！');
	//             }
	//         })
	// 	})
	// 	// request({
	// 	// 	url:'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
	// 	// 	method:'POST',
			
	// 	// 	data:submitData
	// 	// },function(error, response, body){
	// 	// 	console.log(body);	
	// 	// 	// return body;
	// 	// 	// let path = './upload/'+ Date.now() +'.txt';
	// 	// 	// fs.writeFile(path,body,function(err){//用fs写入文件
	// 	//  //        if(err){
	// 	//  //            console.log(err);
	// 	//  //        }else{
	// 	//  //           console.log('写入成功！');
	// 	//  //        }
	// 	//  //    })
	// 	// });
	// 	// request('https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',function(error, response, body){
	// 	// 	console.log(error, response, body);
	// 	// });
	// 	console.log(submitData.nonce_str,'---',submitData.time_stamp);
	// 	// return 11;
	// }
}
module.exports=ai;
 // 对象键名排序
 //let dic={x:2,z:1,y:3};//输出  {x:2，y:3，z:1}
 // let sdic=Object.keys(dic).sort();
 // for(ki in sdic){                     
 //    document.writeln(sdic[ki]+":"+dic[sdic[ki]]+",");
 // }
