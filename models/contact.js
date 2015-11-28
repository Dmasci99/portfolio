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
* information about the Business Partners we will be displaying
* on the secured backend of the website.
*/ 
-->

var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: 'First Name must be provided'
	},
	lastName: {
		type: String,
		trim: true,
		required: 'Last Name must be provided'
	},
	number: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	created: Number
},
{
	collection: 'contactInfo'
});

module.exports = mongoose.model('Contact', ContactSchema);