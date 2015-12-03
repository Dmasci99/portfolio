/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Tom Tsiliopolous
* Purpose : Assignment 3 - Todo Application
* Website Name : MasciApps
* 
* The Following file is the Schema for our Todos.
*/

// Todo Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	note: {
		type: String,
		trim: true
	},
	username: {
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
