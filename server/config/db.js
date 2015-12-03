/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is the config File that is used to connect
* to our Mongo DB without broadcasting the connection info.
*/

module.exports = {
	//Local
	// 'url':'mongodb://localhost/userDB'
	//MongoLab
	'url': 'mongodb://<minimasci>:<test>@ds063124.mongolab.com:63124/portfolio'
};
