	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');

	
	
	/**
	  *	@desp ����Ȩ��
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
	  *	@desp ��ȡ����Ȩ�޼���
	*/
	var get = function(query){
		return db.permission.get(query);
	};
	
	
	
	/**
	  *	@desp ����Ȩ������
	*/
	var set = function(permissionInfo, query){
		permissionInfo = {'desp' : permissionInfo.desp};
		return db.permission.set(permissionInfo, query);
	};
	
	
	/**
	  *	@desp ɾ��Ȩ��,һ��ɾ����Ȩ�����ɫ��ӳ���ϵ
	  * ����ӵ�и�Ȩ�޵��û�������ӵ�и�Ȩ��
	*/
	var remove = function(query){
		return db.permission.del(query);
	};
	
	
	
	
	
	exports.create = create;
	exports.get = get;
	exports.set = set;
	exports.remove = remove;