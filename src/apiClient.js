const txAiJs = require('./TxAiAuthentication.js');
const txAi = new txAiJs();
const request=require('request');

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
			return body;
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
			return body;
		})
	}
	// 人脸融合https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge
	ptuFacemerge(){
		console.log('进入人脸融合');
		let data=txAi.getReqData({
			model:1,
			image:''
		});
		console.log(data);
		request.post({
			url:'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',//翻译君api
			form:data
		},function(err,httpResponse,body){
			// return {a:22};
			console.log(body);
			return body;
		})
	}
	
}
module.exports=apiClient;