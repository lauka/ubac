	/**
	  *	@fileOverView
	  *	user controler  
	*/
	
	var db = require('./data.js');
	var util = require('./util.js');
	var role = require('./role.js');
	var permission = require('./permission.js');
	var resource = require('./resource.js');
	var operation = require('./operation.js');
	var q = require('q');

	
	/**
	  * @desp	用户登录
	  * 输入校验防注入
	  * 密码加密
	  * 建立session
	*/
	var login = function(query){
		
		if(!query.password || !query.account) 
			return util.error('login info is not enough!');
		
		var account = query.account;
		var password = util.sha1(query.password);
		var type = util.getType(query.account);
		query = {'password' : password};
		query[type] = account;
		return db.user.get(query).then(function(users){
			return users;
		});
	};
	
	
	
	
	/**
	  * @desp	用户注册
	*/
	var registor = function(userInfo){
		
		userInfo.password = util.sha1(userInfo.password);
		return db.user.add(userInfo)
			.then(function(result){
				return result;
			});
	};
	
	
	
	
	/**
	  * @desp	检测用户名是否重复
	*/
	var check = function(userInfo){
		return db.user.get(userInfo, true);
	};
	
	
	
	/**
	  * @desp	修改用户密码
	*/
	var changePassword = function(query){
		
		if(!query.password) return util.error('need password');
		var user_id = query.user_id;
		var password = util.sha1(query.password);
		var newpassword = util.sha1(query.newpassword);
		
		query.password = util.sha1(query.password);
		return db.user.get({'id':user_id,'password':password})
			.then(function(result){
				if(result.length){
					return db.user.set({'password':newpassword}, {'id':user_id});
				}
			});
	};
	
	
	
	/**
	  * @desp	修改用户信息
	*/
	var change = function(userInfo, query){
		return db.user.set(userInfo, query);
	};
	
	
	
	//判斷當前用戶是否擁有權限繼續操作，返回布爾值
	var can = function(user_id, permission_name){
		
		var arr = permission_name.split('_');
		var operation_name = arr[0];
		var resource_name = arr[1];

		return q.all([
			permission.get({'user_id':user_id}),
			resource.getParentTree(resource_name),
			operation.getParentTree(operation_name)
		]).spread(function(r1, r2, r3){
				
			var hasPermission = false;
			r1.forEach(function(item){
				var ind_res = r2.indexOf(item.resource_id);
				var ind_oper = r3.indexOf(item.operation_id);	
				if(ind_res>=0 && ind_oper>=0){
					hasPermission = true;
				}	
			});
			
			return hasPermission;
		});
	};
	
	

	
	exports.login = login;
	exports.registor = registor;
	exports.check = check;
	exports.changePassword = changePassword;
	exports.can = can;
