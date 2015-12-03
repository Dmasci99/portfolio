/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Tom Tsiliopolous
* Purpose : Assignment 3 - Todo Application
* Website Name : MasciApps
* 
* The Following file is the config File that is used in our 
* routing files for user authentication. It is now in the 
* config file because we have multiple routes in need of
* authentication.
*/

//Check if user is authenticated
exports.requireAuth = function (req, res, next) {
	//check if user is logged in
	if (!req.isAuthenticated()){
		res.redirect('/login');
	}
	next();
};