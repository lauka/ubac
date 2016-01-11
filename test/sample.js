

	var rbac = require('./../index.js');
	var user = require('./../lib/user.js');
	
	rbac.init({
		model : 'mysql',
		connect : {
			connectionLimit : 10,
			host : 'localhost',
			database : 'rbac.lauka',
			user : 'root',
			password : '',
			port : '3306'
		}
	});
	
	
	exports.registor = function(){
		user.registor({name:'lauka123', role_id:1, password:'afbc'})
			.then(function(result){
				console.log('registor success oh yeah!');
				console.log(result);
				console.log('----------');
			});
	};
	
	exports.login = function(){
		user.login({account:'zhaoxuan', password:'root'})
			.then(function(result){
				console.log('login success oh yeah!');
				console.log(result);
				console.log('----------');
			}).catch(function(result){
				console.log(result);
			}).done();
	};
	
	exports.loginError = function(){
		user.login({name:'lauka123'})
			.then(function(result){
				console.log('login success oh yeah!');
				console.log(result);
				console.log('----------');
			}).catch(function(errorInfo){
				console.log(errorInfo);
			});
	};
	
	
	exports.can = function(){
		rbac.can({id:1, name:'root',roles:',root,,customer,'},'create_role')
			.then(function(result){
				console.log('complete can method!');
				console.log(result);
				console.log('----------');
			}).catch(function(errorInfo){
				console.log(errorInfo);
			});

	};