var ubac = require('./../index.js'); 

ubac.init({
	model : {
		name : 'mysql',
		rebuild : true,
		connect : {
			connectionLimit : 10,
			host : 'localhost',
			database : 'rbac.lauka',
			user : 'root',
			password : '',
			port : '3306'
		}
	}
	
});

var userInfo_login = {'account':'test_user', 'password':'test_user'};
var userInfo = {'name':'test_user', 'password':'test_user'};
var userInfo_change = {'email':'test@gmail.com'};



describe('UBAC-All Function Test-List', function(){
	
	describe('User Functions', function(){
		describe('.registor()', function(){
			it('should registor user without error', function(done){
				ubac.registor(userInfo).then(function(userInfo){
					if(userInfo.id) done();
				});
			})
		});
		
		describe('.login()', function(){
			it('should login user without error', function(done){
				ubac.login(userInfo_login).then(function(userInfo){
					if(userInfo.id) done();
				}).catch(function(ex){console.log(ex);});
			})
		});
		
		describe('.check()', function(){
			it('should check user without error', function(done){
				ubac.check(userInfo).then(function(result){
					if(result) done();
				});
			})
		});
		
		describe('.change()', function(){
			it('should change user info without error', function(done){
				ubac.change(userInfo_change, {'name':'test_user'})
					.then(function(userInfo){
						if(userInfo.id) done();
					});
			})
		});
		
		describe('.remove()', function(){
			it('should remove user without error', function(done){
				ubac.removeUser({'name':'test_user'}).then(function(result){
					if(result) done();
				});
			})
		});
		
	});
	
	
	describe('Permission Functions', function(){
		
	});
});



