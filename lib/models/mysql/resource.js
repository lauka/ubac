	/**
	  *	@fileOverView user model  
	*/

	var base = require('./base');
	var sql_get = 'SELECT * FROM ubac_resource',
		sql_add = 'INSERT INTO ubac_resource SET ?',
		sql_set = 'UPDATE ubac_resource SET ? WHERE ?',
		sql_del = 'DELETE FROM ubac_resource WHERE ?';
	
	
	/**
	  *	@desp 根据传入的用户信息查询对应的用户
	*/
	var get = function(){
		return base.excute(sql_get);
	};
	


	
	/**
	  *	@desp 添加一个新的用户
	*/
	var add = function(resourceInfo){
		return base.excute(sql_add, resourceInfo);
	};
	
	
	
	/**
	  *	@desp 修改用户信息
	*/
	var set = function(resourceInfo, query){
		return base.excute(sql_set, [resourceInfo, query]);
	};
	
	
	
	/**
	  *	@desp 删除用户
	*/
	var del = function(query){
		return base.excute(sql_del, query);
	};
	
	exports.add = add;
	exports.get = get;
	exports.set = set;
	exports.del = del;