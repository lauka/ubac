;CREATE TABLE IF NOT EXISTS rbac_user
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	mobile VARCHAR(50),
	email VARCHAR(50),
	audit BOOLEAN DEFAULT true
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE IF NOT EXISTS rbac_role_user
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	role_id INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE IF NOT EXISTS rbac_role
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	title VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE  IF NOT EXISTS rbac_permission
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	role_id INT NOT NULL,
	resource_id INT NOT NULL,
	operation_id INT NOT NULL,
	resource_name VARCHAR(50) NOT NULL,
	operation_name VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE IF NOT EXISTS rbac_resource
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pid INT NOT NULL DEFAULT 0,
	name VARCHAR(50) NOT NULL,
	title VARCHAR(50),
	tree VARCHAR(200)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE IF NOT EXISTS rbac_operation
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pid INT NOT NULL DEFAULT 0,
	name VARCHAR(50) NOT NULL,
	title VARCHAR(50),
	tree VARCHAR(200)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;CREATE TABLE IF NOT EXISTS rbac_log
(
	id INT NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	desp VARCHAR(100) NOT NULL,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



;INSERT INTO rbac_role(name, title) SELECT 'root', '系统管理员，负责管理用户及权限' WHERE NOT EXISTS(SELECT name, title FROM rbac_role WHERE name='root');
;INSERT INTO rbac_role(name, title) SELECT 'customer', '客户，普通客户' WHERE NOT EXISTS(SELECT name, title FROM rbac_role WHERE name='customer');
;INSERT INTO rbac_user(name, password) SELECT 'root', 'dc76e9f0c0006e8f919e0c515c66dbba3982f785' WHERE NOT EXISTS(SELECT name, password FROM rbac_user WHERE name='root');
;INSERT INTO rbac_user(name, password) SELECT 'zhaoxuan', 'dc76e9f0c0006e8f919e0c515c66dbba3982f785' WHERE NOT EXISTS(SELECT name, password FROM rbac_user WHERE name='zhaoxuan');
;INSERT INTO rbac_role_user(user_id, role_id) SELECT 1, 1 WHERE NOT EXISTS(SELECT user_id, role_id FROM rbac_role_user WHERE user_id=1 AND role_id=1);
;INSERT INTO rbac_role_user(user_id, role_id) SELECT 2, 1 WHERE NOT EXISTS(SELECT user_id, role_id FROM rbac_role_user WHERE user_id=2 AND role_id=1);
;INSERT INTO rbac_role_user(user_id, role_id) SELECT 2, 2 WHERE NOT EXISTS(SELECT user_id, role_id FROM rbac_role_user WHERE user_id=2 AND role_id=2);
;INSERT INTO rbac_permission(role_id, resource_id, operation_id, resource_name, operation_name) SELECT 1, 1, 1,'create','role' WHERE NOT EXISTS(SELECT role_id, resource_id, operation_id, resource_name, operation_name FROM rbac_permission);
;INSERT INTO rbac_resource(name) SELECT 'role' WHERE NOT EXISTS(SELECT name FROM rbac_resource);
;INSERT INTO rbac_operation(name) SELECT 'create' WHERE NOT EXISTS(SELECT name FROM rbac_operation);
