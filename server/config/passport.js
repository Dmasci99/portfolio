<!-- 
/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is used to create our Local Strategies for our 
* passport plugin. Both LOGIN and REGISTER are included here. This file 
* also handles errors and provides appropriate messages.
*/ 
-->


//Passport strategy
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

	/**
	* 	SESSION SETUP
	*/
	//serialize user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	//deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	/**
	*	LOGIN local strategy
	*/
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {

		//asyncronous process
		process.nextTick(function() {
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
				}

				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
				}

				return done(null, user);
			});
		});
	}));


	/**
	*	REGISTER local strategy
	*/
	passport.use('local-register', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		//asyncronous process
		process.nextTick(function() {
			User.findOne({
				'username':username
			},
			function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					//if username already exists
					return done(null, false, req.flash('registerMessage', 'The username is already taken'));
				}
				else {
					//create user
					var newUser = new User(req.body);
					newUser.password = newUser.generateHash(newUser.password);
					newUser.created = Date.now();
					newUser.save(function(err) {
						if(err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
}