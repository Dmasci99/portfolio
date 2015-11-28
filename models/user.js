<!-- 
/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is the Schema that I have built to hold
* account information for people to login to the secured backend 
* of the website.
*/ 
-->

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: 'Username must be provided'
	},
	password: {
		type: String,
		required: 'Password must be provided'
	},
	email: {
		type: String,
		trim: true
	},
	created: Number
},
{
	collection: 'userInfo'	
});

// Hash the Password using methods' hash generator
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Is password valid?
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', UserSchema);