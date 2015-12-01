/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is the routing file for all our /todos
* subpages. This file 'requires' user authentication and is therefore
* restricted. It handles ADD / UPDATE / DELETE for our Todo List.
*/


var express = require('express');
var passport = require('passport');
var router = express.Router();

var auth = require('../config/auth.js');
var Todo = require('../models/todo.js');


/* Todos Dashboard */
router.get('/', auth.requireAuth, function(req, res, next) {
	Todo.find(function(err, todos){
		if(err){
			return next(err);
		}
		res.json(todos);
	});
});

/* Todo - CREATE */
router.post('/', auth.requireAuth, function(req, res, next) {
	Todo.create(req.body, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});

/* Todo Single - VIEW */
router.get('/:id', auth.requireAuth, function(req, res, next){
	Todo.findById(req.params.id, function(err, post) {
		if(err){
			return next(err);
		}
		res.json(post);
	});
});

/* Todo Single - UPDATE */
router.put('/:id', auth.requireAuth, function(req, res, next) {
	Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});

/* Todo Single - DELETE */
router.delete('/:id', auth.requireAuth, function(req, res, next) {
	Todo.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});


module.exports = router;