# UBAC
(User & Role Based Access Control)

UBAC is the authorization library for NodeJS.
It also contains user management functions, like registor,login and other basic functions.
You can simply build a variety of systems based on it.
Almost all methods based on promise, to achieve q.js

## Documentation

UBAC Controller
	User	Role	Permission
	Resource	Operation

	
Other
	Util	Cache


	
## Model

At present, only the MySQL model is provided.


## Install

npm install ubac



## Usage

var ubac = require('ubac');

ubac.login({'account':'test', 'password':'abc123'})
	.then(function(result){
		console.log(result);
	});
	
ubac.can(1, "create_news")
	.then(function(result){
		console.log(result);
	});

...
	
## Running Tests

npm run test
