	/**
	  *	@fileOverView user model  
	*/

	var base = require('./base');
	var sql_get = 'select * from ubac_permission';
		sql_get_by_role = 'select * from ubac_permission where role_id=?;',
		sql_get_by_user = 'select * from ubac_permission where role_id in (select role_id from ubac_role_user where user_id=?);',
		sql_add = 'INSERT INTO ubac_permission SET ?',
		sql_set = 'UPDATE ubac_permission SET ? WHERE ?',
		sql_del = 'DELETE FROM ubac_permission WHERE id=?';
		sql_del_permission_role = 'DELETE FROM ubac_permission_role WHERE permission_id=?';
	
	
	
	
	/**
	  *	@desp 添加一个新的权限
	*/
	var add = function(permissionInfo){
		return base.excute(sql_add, permissionInfo);
	};
	
	
	
	/**
	  *	@desp 获取权限,判断传入参数类型，返回对应结果
	  * 若无参数则返回所有权限
	*/
	var get = function(query){
		
		if(query && query.user_id)
			return base.excute(sql_get_by_user, query.user_id);
		if(query && query.role_id)
			return base.excute(sql_get_by_role, query.role_id);
		
		return base.excute(sql_get);
	};
	


	
	
	/**
	  *	@desp 修改权限信息
	*/
	var set = function(permissionInfo, query){
		return base.excute(sql_set, [permissionInfo, query]);
	};
	
	
	
	/**
	  *	@desp 删除用户
	*/
	var del = function(query){
		var permission_id = query.id;
		return q.all([
			base.excute(sql_del, permission_id),
			base.excute(sql_del_permission_role, permission_id)
		]);
	};
	
	exports.add = add;
	exports.get = get;
	exports.set = set;
	exports.del = del;