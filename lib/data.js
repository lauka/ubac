




(function(data){
	
	data.init = function(options){
		var model = options.model;
		data.base = require('./models/' + model + '/base.js');
		data.user = require('./models/' + model + '/user.js');
		data.role = require('./models/' + model + '/role.js');
		data.permission = require('./models/' + model + '/permission.js');
		data.resource = require('./models/' + model + '/resource.js');
		data.operation = require('./models/' + model + '/operation.js');
		data.log = require('./models/' + model + '/log.js');
		
		data.base.init();
	};
	
	
	
	
})(exports);