	/**
	  *	@fileOverView user model  
	*/

	var base = require('./base');
	var sql_get = 'SELECT * FROM ubac_operation',
		sql_add = 'INSERT INTO ubac_operation SET ?',
		sql_set = 'UPDATE ubac_operation SET ? WHERE ?',
		sql_del = 'DELETE FROM ubac_operation WHERE ?';
	
	
	/**
	  *	@desp 根据传入的用户信息查询对应的用户
	*/
	var get = function(){
		return base.excute(sql_get);
	};
	


	
	/**
	  *	@desp 添加一个新的用户
	*/
	var add = function(operationInfo){
		return base.excute(sql_add, operationInfo);
	};
	
	
	
	/**
	  *	@desp 修改用户信息
	*/
	var set = function(operationInfo, query){
		return base.excute(sql_set, [operationInfo, query]);
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