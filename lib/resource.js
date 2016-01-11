	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var cache = require('./cache.js');
	var q = require('q');
	
	
	/**
	  *	@desp ������Դ
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
	  *	@desp ���������Դ,����ʽ��
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
	  *	@desp ��ʽ��������ԴΪkeyֵ��Ӧ
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
	  *	@desp ��ȡָ�������ĸ�����
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
	  *	@desp ������Դ��Ϣ
	*/
	var set = function(resourceInfo){
		cache.set('resourceInfos', null);
		return db.resource.set(resourceInfo);
	};
	
	
	
	/**
	  *	@desp ɾ����Դ
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