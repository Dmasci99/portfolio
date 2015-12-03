/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Tom Tsiliopolous
* Purpose : Assignment 3 - Todo Application
* Website Name : MasciApps
* 
* The Following file is the routing file that processes all of our
* DB CRUD operations for our Angular Application. Rendering of
* Todolist Dashboard is done by routes/index.js.
*/ 

//modules
var express = require('express'),
    passport = require('passport'),
    router = express.Router();

//files
var auth = require('../config/auth.js'),
    Todo = require('../models/todo.js');


/* Todo VIEW - Dashboard */
router.get('/', auth.requireAuth, function(req, res, next) {
    Todo.find(function(err, todos){
        if(err) {
            return next(err);
        }
        res.json(todos);
    });
});

/* Todo VIEW - Single */
router.get('/:id', auth.requireAuth, function(req, res, next) {
    Todo.findById(req.params.id, function(err, post) {
        if(err) {
            return next(err);
        }
        res.json(post);
    });
});

/* Todo POST - CREATE */
router.post('/', auth.requireAuth, function(req, res, next) {
    Todo.create(req.body, function(err, post){
        if(err) {
            return next(err);
        }
        res.json(post);
    });
});

/* Todo PUT - UPDATE */
router.put('/:id', auth.requireAuth, function(req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if(err) {
            return next(err);
        }
        res.json(post);
    });        
});

/* Todo DELETE - DELETE */
router.delete('/:id', auth.requireAuth, function(req, res, next) {
    Todo.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if(err){
            return next(err);
        }
        res.json(post);
    });
});


module.exports = router;
