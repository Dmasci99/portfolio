// Todo Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: String,
	completed: Boolean,
	note: String,
	username: String,
	updated: {type: Date, default: Date.now}
}, {
	collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);
