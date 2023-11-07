const request = require('request');
const querystring = require('querystring');

let template_objectObj = {
	object_type : 'text',
	text : '진동이 감지되었습니다\n30초후 자동으로 멀티탭 전원이 차단됩니다.\n\n즉시 전원을 차단하고 싶으면  아래의 채팅방에 입장하여\' 시작\' 을 입력하시고\n\n전원차단을 희망하지 않으면 \'정지\'를 입력하면 프로그램을 종료합니다\n\nhttp://pf.kakao.com/_bIwHxj/chat',
		'link':{
			web_url : 'http://pf.kakao.com/_blwHxj/chat',
			mobile_web_url : 'http://pf.kakao.com/_blwHxj/chat'
		}
		
};

let template_objectStr = JSON.stringify(template_objectObj);
let options = {

	url : 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
	method : "post",
	headers : {
		'Authorization' : 'Bearer gNtsAk0EUCk-JIBUYNvlnSN5XUemMkjYaYG7x1dnCj1y6gAAAYi4OVEU',
		'Content-Type' : 'application/x-www-form-urlencoded',
	},
	
	form : {
		template_object : template_objectStr,
	}

};

function callback(error,response,body){
	console.log(response.statusCode);
	if(!error && response.statusCode == 200){
		console.log(body);
	}

}

request(options,callback);
