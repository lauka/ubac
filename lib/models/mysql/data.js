
exports.SQL_BUILD_DATABASE = ';CREATE TABLE IF NOT EXISTS ubac_user'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	name VARCHAR(50) NOT NULL,'
+'	password VARCHAR(50) NOT NULL,'
+'	mobile VARCHAR(50),'
+'	email VARCHAR(50),'
+'	audit BOOLEAN DEFAULT true'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE IF NOT EXISTS ubac_role_user'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	user_id INT NOT NULL,'
+'	role_id INT NOT NULL'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE IF NOT EXISTS ubac_role'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	name VARCHAR(50) NOT NULL,'
+'	title VARCHAR(50)'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE  IF NOT EXISTS ubac_permission'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	role_id INT NOT NULL,'
+'	resource_id INT NOT NULL,'
+'	operation_id INT NOT NULL,'
+'	resource_name VARCHAR(50) NOT NULL,'
+'	operation_name VARCHAR(50) NOT NULL'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE IF NOT EXISTS ubac_resource'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	pid INT NOT NULL DEFAULT 0,'
+'	name VARCHAR(50) NOT NULL,'
+'	title VARCHAR(50),'
+'	tree VARCHAR(200)'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE IF NOT EXISTS ubac_operation'
+'('
+'	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
+'	pid INT NOT NULL DEFAULT 0,'
+'	name VARCHAR(50) NOT NULL,'
+'	title VARCHAR(50),'
+'	tree VARCHAR(200)'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'



+';CREATE TABLE IF NOT EXISTS ubac_log'
+'('
+'	id INT NOT NULL PRIMARY KEY,'
+'	user_id INT NOT NULL,'
+'	desp VARCHAR(100) NOT NULL,'
+'	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
+')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

+';INSERT INTO ubac_role(name, title) SELECT \'root\', \'系统管理员\' WHERE NOT EXISTS(SELECT name, title FROM ubac_role WHERE name=\'root\');'
+';INSERT INTO ubac_user(name, password) SELECT \'root\', \'dc76e9f0c0006e8f919e0c515c66dbba3982f785\' WHERE NOT EXISTS(SELECT name, password FROM ubac_user WHERE name=\'root\');'
+';INSERT INTO ubac_role_user(user_id, role_id) SELECT 1, 1 WHERE NOT EXISTS(SELECT user_id, role_id FROM ubac_role_user WHERE user_id=1 AND role_id=1);';

