	/**
	  *	@fileOverView 缓存辅助
	*/
	
	
	
	/**
	  * @desp	获取数据
	*/
	var get = function(key){
		return this[key];
	};
	
	
	/**
	  * @desp 添加数据
	*/
	var set = function(key, value){
		this[key] = value;
	};
	
	
	exports.get = get;
	exports.set = set;


	