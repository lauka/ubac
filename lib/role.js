	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var q = require('q');
	var cache = require('./cache.js');
	
	/**
	  *	@desp 添加角色
	*/
	var create = function(roleInfo){
		cache.set('roleInfos', null);
		return db.role.add(roleInfo);
	};
	
	
	/**
	  *	@desp 获取所有角色及其分配权限
	*/
	var get = function(query){
		if(!query){
			var roleInfos = cache.get('roleInfos');
			if(roleInfos)
				return q.fcall(function(){ return roleInfos;});
			return db.role.get().then(function(result){
				cache.set('roleInfos', result);
				return result;
			});
		}
		return db.role.get(query);
	};
	
	
	/**
	  *	@desp 设置角色
	*/
	var set = function(roleInfo){
		cache.set('roleInfos', null);
		return db.role.set(roleInfo);
	};
	
	
	/**
	  *	@desp 刪除角色，并刪除與其用戶映射關係
	*/
	var remove = function(query){
		cache.set('roleInfos', null);
		return db.role.del(query);
	};
	
	
	exports.create = create;
	exports.get = get;
	exports.set = set;
	exports.remove = remove;