	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var q = require('q');
	var cache = require('./cache.js');
	
	/**
	  *	@desp 添加角色
	*/
	var create = function(logInfo){
		return db.log.add(logInfo);
	};
	
	
	/**
	  *	@desp 获取所有角色及其分配权限
	*/
	var get = function(query){
		var obj = query || {};
		var pageIndex = query.pageIndex || 1;
		var pageSize = query.pageSize || 0;
		var start = (pageIndex - 1) * pageSize;
		var user_id = query.user_id || 0;
		
		return db.role.get({'user_id' : user_id, 'start': start, 'end' : pageSize});
	};
	

	
	/**
	  *	@desp 刪除角色，并刪除與其用戶映射關係
	*/
	var remove = function(query){
		return db.log.del(query);
	};
	
	
	exports.create = create;
	exports.get = get;
	exports.remove = remove;