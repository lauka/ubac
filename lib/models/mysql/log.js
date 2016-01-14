	/**
	  *	@fileOverView user model  
	*/

	var base = require('./base');
	var sql_get = 'SELECT * FROM ubac_log',
		sql_add = 'INSERT INTO ubac_log SET ?',
		sql_set = 'UPDATE ubac_log SET ? WHERE ?',
		sql_del = 'DELETE FROM ubac_log WHERE ?';
	
	
	/**
	  *	@desp 根据传入的用户信息查询对应的用户
	*/
	var get = function(query){
		var sql = sql_get + 'WHERE user_id=' + query.user_id
			+ ' limit ' + query.start + ',' + query.end;	
		return base.excute(sql);
	};
	


	
	/**
	  *	@desp 添加一个新的用户
	*/
	var add = function(logInfo){
		return base.excute(sql_add, logInfo);
	};
	
	
	
	/**
	  *	@desp 删除用户
	*/
	var del = function(query){
		return base.excute(sql_del, query);
	};
	
	exports.add = add;
	exports.get = get;
	exports.del = del;