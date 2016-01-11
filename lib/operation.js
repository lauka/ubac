	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var cache = require('./cache.js');
	var q = require('q');
	
	
	/**
	  *	@desp 添加新操作
	*/
	var create	= function(operationInfo){
		
		var pid = operationInfo.pid;
		operationInfo.tree = pid;
		cache.set('operationInfos', null);
		
		return get().then(function(result){
			if(result[pid] && result[pid].tree){
				operationInfo.tree += ',' + result[pid].tree;
			}
			return db.operation.add(operationInfo);
		});
		
	};
	
	
	
	/**
	  *	@desp 获得所有操作,并格式化
	*/
	var get = function(){
		
		var operationInfos = cache.get('operationInfos');
		if(operationInfos)
			return q.fcall(function(){ return operationInfos;});

		return db.operation.get()
		.then(function(result){
			operationInfos = format(result);
			cache.set('operationInfos', operationInfos);
			return operationInfos;
		});
	};
	
	
	
	/**
	  *	@desp 格式化所有操作
	*/
	var format = function(operationInfos){
		var result = {};
		operationInfos.forEach(function(item){
			result[item.id] = item;
			result[item.name] = item;
		});
		return result;
	};
	
	
	/**
	  *	@desp 获取指定操作的父级树
	*/
	var getParentTree = function(name){		
		return get().then(function(operationInfos){
			var oper = operationInfos[name], tree;
			tree = oper.id + '';
			if(oper.tree) tree += ',' + oper.id;
			return tree;
		});
	};
	
	
	/**
	  *	@desp 设置权限描述
	*/
	var set = function(operationInfo){
		cache.set('operationInfos', null);
		return db.operation.set(operationInfo);
	};
	
	
	/**
	  *	@desp 删除权限
	*/
	var remove = function(query){
		cache.set('operationInfos', null);
		return db.operation.del(query);
	};
	
	
	
	
	
	exports.create = create;
	exports.get = get;
	exports.set = set;
	exports.remove = remove;
	exports.getParentTree = getParentTree;