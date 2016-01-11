	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');

	
	
	/**
	  *	@desp 添加权限
	*/
	var create	= function(resourceInfo, operationInfo){
		
		var permissionInfo = {
			resource_id : resourceInfo.id,
			operation_id : operationInfo.id,
			resource_name : resourceInfo.name,
			operation_name : operationInfo.name
		};
		return db.permission.add(permissionInfo);
	};
	
	
	/**
	  *	@desp 获取所有权限集合
	*/
	var get = function(query){
		return db.permission.get(query);
	};
	
	
	
	/**
	  *	@desp 设置权限描述
	*/
	var set = function(permissionInfo, query){
		permissionInfo = {'desp' : permissionInfo.desp};
		return db.permission.set(permissionInfo, query);
	};
	
	
	/**
	  *	@desp 删除权限,一并删除该权限与角色的映射关系
	  * 所有拥有该权限的用户将不再拥有该权限
	*/
	var remove = function(query){
		return db.permission.del(query);
	};
	
	
	
	
	
	exports.create = create;
	exports.get = get;
	exports.set = set;
	exports.remove = remove;