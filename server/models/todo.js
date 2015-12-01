<!-- 
/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is the Schema for our "To-Do's".
*/ 
-->

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	note: {
		type: String,
		trim: true
	},
	userName: {
		type: String,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	updated: {
		type: Date, 
		default: Date.now
	}
}, {
	collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);