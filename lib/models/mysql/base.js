	var q = require("q");
	var mysql = require('mysql');
	var queues = require('mysql-queues');
	var data = require('./data.js');
	

	/**
	  *	@desp 初始化MYSQL数据模型
	*/
	var init = function(options){
		
		this.options = options;
		this.pool = mysql.createPool(options.connect);
		if(options.rebuild)
			rebuild(options);
	};
	
	
	
	/**
	  *	@desp 重新构建MYSQL数据库
	*/
	var rebuild = function(options){
		
		var client = mysql.createConnection(options.connect);
		const DEBUG = true;
		queues(client, DEBUG);
		var que = client.createQueue();
		var sqls = data.SQL_BUILD_DATABASE.split(";"), p = false;
		
		for(var i=0, j=sqls.length; i<j; i++){
			var sqlstr = sqls[i].trim();
			if(sqlstr){
				console.log('is:'+ sqlstr + '.');
				que.query(sqlstr);
			}
		}
		que.execute();
	};
	
	
	
	/**
	  *	@desp 执行SQL语句，返回结果
	*/
	var excute = function( sqlString, query ){
		
		var deferred = q.defer(), pool = this.pool;
		pool.getConnection(function(err, connection) {
			connection.query(sqlString, query,
				function(err, rows){
					if(err){
						console.log("debug:database excute error:"+err);
						deferred.reject(new Error(err));
					}else{
						deferred.resolve(rows);
						connection.release();
					}
				}
			);
		});
		return deferred.promise;
	};
	
	exports.init = init;
	exports.excute = excute;
	