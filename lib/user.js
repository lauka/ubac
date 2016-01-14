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
	  * 必须参数 query.account && query.password
	  * 密码加密
	  * 建立session
	  * return promise--userInfo
	*/
	var login = function(query){
		
		var account = query.account;
		var password = util.sha1(query.password);
		var type = util.getType(account);
		query = {'password' : password};
		query[type] = account;
		
		return db.user.get(query).then(function(userInfos){
			return userInfos[0];
		});
	};
	
	
	
	
	/**
	  * @desp	用户注册
	*/
	var registor = function(userInfo){
		
		var account = userInfo.name 
			|| userInfo.phone || userInfo.email,
		password = userInfo.password;
		userInfo.password = util.sha1(userInfo.password);
		return db.user.add(userInfo).then(function(){
			return login({'account':account, 'password':password});
		});
	};
	
	
	
	
	/**
	  * @desp	检测用户名是否重复
	*/
	var check = function(userInfo){
		return db.user.get(userInfo, true)
			.then(function(userInfos){
				return userInfos.length && 1;
			});
	};
	
	
	
	/**
	  * @desp	修改用户密码
	*/
	var changePassword = function(query){
		
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
		return db.user.set(userInfo, query)
			.then(function(){
				return db.user.get(query)
				.then(function(userInfos){
					return userInfos[0];
				});
			});
	};
	
	
	
	/**
	  * @desp 判斷當前用戶是否擁有權限繼續操作，返回布爾值
	*/
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
	
	
	/**
	  * @desp 删除用户
	*/
	var remove = function(query){
		return db.user.del(query);
	}
	

	
	exports.login = login;
	exports.registor = registor;
	exports.check = check;
	exports.changePassword = changePassword;
	exports.can = can;
	exports.change = change;
	exports.remove = remove;
