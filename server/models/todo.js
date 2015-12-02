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
		default: true
	},
	updated: {
		type: Date, 
		default: Date.now
	}
}, {
	collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);
