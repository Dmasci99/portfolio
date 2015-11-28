<!-- 
/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is our main routing file use to generate the majority
* of our front-end pages (HOME / ABOUT / SERVICES / PROJECTS / CONTACT etc).
* This is also used to process our LOGIN / REGISTER forms.
*/ 
-->

var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { 
		title: 'Home | MasciApps',
		page: 'home',
        name: req.user ? req.user.username : ''
	 });
});
/* GET about page. */
router.get('/about', function (req, res, next) {
	res.render('about', { 
		title: 'About Me | MasciApps',
		page: 'about',
        name: req.user ? req.user.username : ''
	 });
});
/* GET projects page. */
router.get('/projects', function (req, res, next) {
	res.render('projects', { 
		title: 'Projects | MasciApps',
		page: 'projects',
        name: req.user ? req.user.username : ''
	 });
});
/* GET services page. */
router.get('/services', function (req, res, next) {
	res.render('services', { 
		title: 'Services | MasciApps',
		page: 'services',
        name: req.user ? req.user.username : ''
	 });
});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
	res.render('contact', { 
		title: 'Contact Me | MasciApps',
		page: 'contact',
        name: req.user ? req.user.username : ''
	 });
});

/* User Login / Register / Authentication */
////////////////////////////////////////////////////
//				Render Page VIEWS
////////////////////////////////////////////////////
/* GET login page. */
router.get('/login', function(req, res, next) {
	if (!req.user) {
		//If there isn't a user already logged in - render Login page
		res.render('login', {
			title: 'Login | MasciApps',
			page: 'login',
			name: req.user ? req.user.username : '',
			messages: req.flash('loginMessage')
		});
	}
	else {
		//Otherwise redirect to Contacts View
		return res.redirect('/contacts');
	}
});
/* GET register page. */
router.get('/register', function(req, res, next) {
	if (!req.user) {
		//If there isn't a user already logged in - render Register page
		res.render('register', {
			title: 'Register | MasciApps',
			page: 'register',
			name: req.user ? req.user.username : '',
			messages: req.flash('registerMessage')
		});
	}
	else {
		//Otherwise redirect to Contacts View
		return res.redirect('/contacts');
	}
});


////////////////////////////////////////////////////
//				Process Form POSTS
////////////////////////////////////////////////////
/* POST - Process Login */
router.post('/login', passport.authenticate('local-login', {
    //Redirect appropriately depending on if valid or not
    successRedirect: '/contacts',
    failureRedirect: '/login',
    failureFlash: true
}));
/* POST - Process Registration */
router.post('/register', passport.authenticate('local-register', {
    //Redirect appropriately depending on if valid or not
    successRedirect : '/contacts',
    failureRedirect : '/register',
    failureFlash : true
}));
/* POST - Process Logout */
router.get('/logout', function (req, res){
	//Log User out and redirect to homepage
	req.logout();
	res.redirect('/');
});



module.exports = router;