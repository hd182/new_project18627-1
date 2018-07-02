const txAiJs = require('./TxAiAuthentication.js');
const txAi = new txAiJs();
const request=require('request');
const http = require('http');
class apiClient{
	//文本翻译，https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttrans, type,text
	textTranslation(){
		console.log('进入文本翻译');
		let data=txAi.getReqData({
			// type:3,
			text:'你说呢',
			source:'zh',
			target:'pt'
		});
		console.log(data);
		request.post({
			url:'https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttranslate',//翻译君api
			form:data
		},function(err,httpResponse,body){
			// return {a:22};
			console.log(body);
			// return body;
		})
	}
	//语种识别https://api.ai.qq.com/fcgi-bin/nlp/nlp_textdetect
	language(){
		console.log('进入语种识别');
		let data=txAi.getReqData({
			// type:3,
			text:'my name is mon',
			candidate_langs:'zh|en|jp|kr',
			force: 0
		});
		console.log(data);
		request.post({
			url:'https://api.ai.qq.com/fcgi-bin/nlp/nlp_textdetect',//翻译君api
			form:data
		},function(err,httpResponse,body){
			// return {a:22};
			console.log(body);
			// return body;
		})
	}
	// 人脸融合https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge
	// http://pic1.win4000.com/tj/2018-05-08/5af1610ccfb86.jpg
	ptuFacemerge(){
		console.log('进入人脸融合');
		let url='http://pic1.win4000.com/tj/2018-05-08/5af1610ccfb86.jpg';//图片地址
		http.get(url,function(res){
		　　var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
		　　var size = 0;　　 //保存缓冲数据的总长度
		　　res.on('data',function(chunk){
		　　　　chunks.push(chunk);　 
		　　　　size += chunk.length;　　//累加缓冲数据的长度
		　　});
			res.on('end',function(err){
		　　　　var data = Buffer.concat(chunks, size);　　//Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
		　　　　console.log(Buffer.isBuffer(data));　　　　//可通过Buffer.isBuffer()方法判断变量是否为一个Buffer对象
		　　　　var base64Img = data.toString('base64');　　//将Buffer对象转换为字符串并以base64编码格式显示
		　　　　console.log(base64Img);　　 //进入终端terminal,然后进入index.js所在的目录，　　　　　　　　　　　　　　　　　　　
		　　
				let datas=txAi.getReqData({
					model:1,
					image:base64Img
				});
				console.log(datas);
				request.post({
					url:'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
					form:datas
				},function(err,httpResponse,body){
					// return {a:22};
					console.log(body);
					// return body;
				})
			});
		});
	}
	
}
module.exports=apiClient;
// 通用
// module.exports=function(param){
// 	let url=param.url;
// 	delete param["url"];
// 	let reqData=txAi.getReqData(param);
// 	console.log(reqData);
// 	request.post({
// 		url,//翻译君api
// 		form:reqData
// 	},function(err,httpResponse,body){
// 		// return {a:22};
// 		console.log(body);
// 		return body;
// 	})
// }