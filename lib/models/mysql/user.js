	/**
	  *	@fileOverView user model  
	*/

	var base = require('./base');
	var sql_get = 'SELECT id, name, mobile, email, audit FROM ubac_user WHERE ?',
		sql_add = 'INSERT INTO ubac_user SET ?',
		sql_set = 'UPDATE ubac_user SET ? WHERE ?',
		sql_del = 'DELETE FROM ubac_user WHERE ?';
	
	
	/**
	  *	@desp 根据传入的用户信息查询对应的用户
	*/
	var get = function(query, or){
		var rel = or ? ' or ' : ' and ', str = '';
		for(pro in query){
			if(str)str += rel + pro + '=\'' + query[pro] + '\'';
			else str += pro + '=\'' + query[pro] + '\'';
		}
		return base.excute(sql_get.replace('?', str));
	};
	


	
	/**
	  *	@desp 添加一个新的用户
	*/
	var add = function(userInfo){
		return base.excute(sql_add, userInfo);
	};
	
	
	
	/**
	  *	@desp 修改用户信息
	*/
	var set = function(userInfo, query){
		return base.excute(sql_set, [userInfo, query]);
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