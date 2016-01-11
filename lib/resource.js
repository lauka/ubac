	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var cache = require('./cache.js');
	var q = require('q');
	
	
	/**
	  *	@desp 添加资源
	*/
	var create = function(resourceInfo){
		
		var pid = resourceInfo.pid;
		resourceInfo.tree = pid;
		cache.set('resourceInfos', null);
		
		return get().then(function(result){
			if(result[pid] && result[pid].tree){
				resourceInfo.tree += ',' + result[pid].tree;
			}
			return db.resource.add(resourceInfo);
		});
		
	};
	
	
	
	/**
	  *	@desp 获得所有资源,并格式化
	*/
	var get = function(){
		
		var resourceInfos = cache.get('resourceInfos');
		if(resourceInfos)
			return q.fcall(function(){ return resourceInfos;});

		return db.resource.get()
		.then(function(result){
			resourceInfos = format(result);
			cache.set('resourceInfos', resourceInfos);
			return resourceInfos;
		});
	};
	
	
	
	/**
	  *	@desp 格式化所有资源为key值对应
	*/
	var format = function(resourceInfos){
		var result = {};
		resourceInfos.forEach(function(item){
			result[item.id] = item;
			result[item.name] = item;
		});
		return result;
	};
	
	
	
	/**
	  *	@desp 获取指定操作的父级树
	*/
	var getParentTree = function(name){		
		return get().then(function(resourceInfos){
			var res = resourceInfos[name];
			var tree = res.id + '';
			if(res.tree) tree += ',' + res.tree
			return tree;
		});
	};
	
	
	
	/**
	  *	@desp 设置资源信息
	*/
	var set = function(resourceInfo){
		cache.set('resourceInfos', null);
		return db.resource.set(resourceInfo);
	};
	
	
	
	/**
	  *	@desp 删除资源
	*/
	var remove = function(query){
		cache.set('resourceInfos', null);
		return db.resource.del(query);
	};
	
	
	
	
	
	exports.create = create;
	exports.set = set;
	exports.get = get;
	exports.remove = remove;
	exports.getParentTree = getParentTree;