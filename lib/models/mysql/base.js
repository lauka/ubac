
	var q = require("q");
	var mysql = require('mysql');
	var queues = require('mysql-queues');
	var core = require('../../../index.js');
	var fs = require("fs");  

	//生成链接池
	var pool  = mysql.createPool( core.options.connect );

	var excute = function( sqlString, query ){
		var deferred = q.defer();
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

	
	var init = function(){
		
		fs.readFile('d:/project/rbac/lib/models/mysql/data.js','utf-8',function(err,data){  
			if(err){  
				console.log(data);  
			}else{  
				var client = mysql.createConnection(core.options.connect);
				const DEBUG = true;
				queues(client, DEBUG);
				var que = client.createQueue();
				var sqls = data.split(";"), p = false;
				
				for(var i=0, j=sqls.length; i<j; i++){
					var sqlstr = sqls[i].trim();
					if(sqlstr){
						console.log('is:'+ sqlstr + '.');
						que.query(sqlstr);
					}
				}
				que.execute();
			}
		});
		
	};
	
	
	
	
	
	exports.init = init;
	exports.excute = excute;