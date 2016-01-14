
	/**
	*	@fileOverView	數據控制器，初始化模型鏈
	*/
	(function(data){
		data.init = function(options){
			var model = options.model;
			var modelName = model.name || "mysql";
			data.base = require('./models/' + modelName + '/base.js');
			data.user = require('./models/' + modelName + '/user.js');
			data.role = require('./models/' + modelName + '/role.js');
			data.permission = require('./models/' + modelName + '/permission.js');
			data.resource = require('./models/' + modelName + '/resource.js');
			data.operation = require('./models/' + modelName + '/operation.js');
			data.log = require('./models/' + modelName + '/log.js');
			data.base.init(model);
		};
	})(exports);