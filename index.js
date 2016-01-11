	/**
	  *	@fileOverView rbac service
	*/

	var db = require('./lib/data.js');
	var user = require('./lib/user.js');
	var role = require('./lib/role.js');
	var permission = require('./lib/permission.js');
	var resource = require('./lib/resource.js');
	var operation = require('./lib/operation.js');

	

	//全局初始化
	exports.init = function(options){
		this.options = options;
		db.init(options);
		return function(req, res, next){
			next();
		};
	};
	
	
	

	//註冊新用戶
	exports.registor = user.registor;
	
	//用戶登錄
	exports.login = user.login;
	
	//檢測用戶信息是否重複
	exports.check = user.check;
	
	//修改密碼
	exports.changPassword = user.changPassword;
	
	//判斷當前用戶是否擁有權限繼續操作，返回布爾值
	exports.can = user.can;
	
	//創建新角色
	exports.createRole = role.create;
	
	//獲取角色信息
	exports.getRoles = role.get;
	
	//刪除角色，并刪除映射關係
	exports.removeRole = role.remove;
	
	//創建新權限
	exports.createPermission = permission.create;
	
	//獲取權限
	exports.getPermissions = permission.get;
	
	//設置權限的描述,只允許修改desp描述項
	exports.setPermissions = permission.set;
	
	//刪除權限，并刪除與角色映射關係
	exports.removePermission = permission.remove;
	
	//創建新資源
	exports.createResource = resource.create;
	
	//獲取資源
	exports.getResources = resource.get;
	
	//刪除資源，并刪除對應權限及映射關係
	exports.removeResource = resource.remove;
	
	//創建操作
	exports.createOperation = operation.create;
	
	//獲取操作
	exports.getOperations = operation.get;
	
	//刪除操作，并刪除對應權限及映射關係
	exports.removeOperation = operation.remove;
	
	
	
	