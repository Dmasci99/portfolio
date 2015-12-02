var express = require('express');
var passport = require('passport');
var router = express.Router();

//var mongoose = require('mongoose');
var Todo = require('../models/todo.js');

/* Utility function to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


/* CREATE TODOS */
router.post('/', requireAuth, function(req, res, next){
   Todo.create(req.body, function(err, post){
      if(err){
        return next(err);}

      res.json(post);
   });
});

/* READ TODOS */
router.get('/', requireAuth, function(req, res, next) {
  Todo.find(function(err,todos){
     if(err){return next(err);}
      res.json(todos);
  });
});

/* READ /todos/id */
router.get('/:id', requireAuth, function(req, res, next) {
   Todo.findById(req.params.id, function(err,post){
      if(err) {
        return next(err);}
       res.json(post);
   });
});

/* UPDATE /todos/:id */
router.put('/:id', requireAuth, function(req,res, next){
   Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if(err) {return next(err);}
       res.json(post);
   }); 
});

/* DELETE /todos/:id */
router.delete('/:id', requireAuth, function(req,res,next){
   Todo.findByIdAndRemove(req.params.id, req.body, function(err,post){
      if(err) {return next(err);}
       res.json(post);
   });
});


module.exports = router;
