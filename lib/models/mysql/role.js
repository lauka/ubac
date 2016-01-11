	/**
	  *	@fileOverView user model  
	*/
	
	var base = require('./base');
	var q = require('q');

	
	var sql_add = 'INSERT INTO rbac_role SET ?',
		sql_get = 'SELECT * FROM rbac_role',
		sql_get_by_user = 'SELECT b.* FROM rbac_role_user as a, rbac_role as b WHERE a.role_id=b.id and a.user_id in (?);',
		sql_set = 'UPDATE rbac_role SET ? WHERE ?',
		sql_del = 'DELETE FROM rbac_role WHERE id in(?)',
		sql_del_role_user = 'DELETE FROM rbac_role_user WHERE role_id in(?)';
	
	
	/**
	  *	@desp 添加角色
	*/
	var add = function(roleInfo){
		return base.excute(sql_add, roleInfo);
	};
	
	
	/**
	  *	@desp 获取所有角色及其权限
	*/
	var get = function(query){
		
		if(query && query.user_id)
			return base.excute(sql_get_by_user, query.user_id);

		return base.excute(sql_get);
	};
	
	
	
	
	
	/**
	  *	@desp 添加角色
	*/
	var set = function(roleInfo, query){
		return base.excute(sql_set,  [roleInfo, query]);
	};
	
	
	
	/**
	  *	@desp 添加角色
	*/
	var del = function(query){
		var role_id = query.id;
		return q.all([
			base.excute(sql_del, role_id),
			base.excute(sql_del_role_user, role_id)
		]);
	};
	
	
	
	
	
	
	
	exports.add = add;
	exports.get = get;
	exports.set = set;
	exports.del = del;