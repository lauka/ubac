	/**
	  *	@fileOverView 辅助方法包
	*/
	
	var crypto = require('crypto');
	var q = require("q");
	
	var REGEXP_EMAIL = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	var REGEXP_MOBILE =  /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
	
	
	/**
	  * @desp	sha1加密
	*/
	var sha1 = function(str){
		var shasum = crypto.createHash('sha1');
		shasum.update(str);
		return shasum.digest('hex');
	};
	
	
	/**
	  * @desp	获取字符串的类型，用户名，邮箱，手机号
	*/
	var getType = function(str){

		if(REGEXP_EMAIL.test(str)) return 'email';
		if(REGEXP_MOBILE.test(str)) return 'mobile';
		return 'name';
	};
	
	//返回错误信息
	var error = function(info){
		var deferred = q.defer();
		deferred.reject('Error: ' + info);
		return deferred.promise;
	};
	
	
	//编码
	var encode = function(str){
		return sha1(str);
	};

	
	exports.sha1 = sha1;
	exports.getType = getType;
	exports.error = error;

	