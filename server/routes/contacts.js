/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 2 - Authentication
* Website Name : MasciApps
* 
* The Following file is the routing file for all our /contacts
* subpages. This file includes user authentication and is therefore
* restricted. It handles ADD / UPDATE / DELETE for our Business Contacts.
*/ 

var express = require('express');
var passport = require('passport');
var router = express.Router();

var auth = require('../config/auth.js');
var Contact = require('../models/contact.js');


/* GET contacts "Dashboard" page. */
router.get('/', auth.requireAuth, function (req, res, next) {
	Contact.find(function (err, contacts) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			res.render('contacts/index', { 
				title: 'Dashboard - Business Contacts | MasciApps',
				page: 'contacts',
				contacts: contacts,
		        username: req.user ? req.user.username : ''
	 		});
	    }
	}).sort( { firstName : 1, lastName: 1, email: 1 } ); //Sort the listing by firstName, then lastName, then email in ASCENDING order
});
/* GET contacts "Add Contact" page. */
router.get('/add', auth.requireAuth, function (req, res, next) {
	Contact.find(function (err, contacts) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			res.render('contacts/add', {
				title: 'Add - Business Contacts | MasciApps',
				page: 'add',
				username: req.user ? req.user.username : ''
			});
	    }
	});
});
/* Redirect from /contacts/update to /contacts. */
router.get('/update', auth.requireAuth, function (req, res, next) {
	res.redirect('/contacts');
});
/* GET contacts "Update Contact" page. */
router.get('/:id', auth.requireAuth, function (req, res, next) {

	//grab Contact ID
	var id = req.params.id;

	//Pull correct Contact Information based on ID
	Contact.findById(id, function (err, contact) {
		if (err) {
			//'catch' error
			console.log(err);
			res.end(err);
		}
		else {
			//Show the Update Form with Contact's information
			res.render('contacts/update', {
				title: 'Update - Business Contacts | MasciApps',
				page: 'update',
				username: req.user ? req.user.username : '',
				contact: contact
			});		
		}
	});	
});

/* GET - Process "Delete Contact" */
router.get('/delete/:id', auth.requireAuth, function (req, res, next) {

	//grab Contact ID
	var id = req.params.id;

	//Use Mongoose to Delete the Contact
	Contact.remove( { _id: id }, function(err) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			//redirect to dashboard after success
			res.redirect('/contacts');
		}
	});

});


////////////////////////////////////////////////////////
//				Process Form POSTS
////////////////////////////////////////////////////////
/* POST - Process "Add Contact" */
router.post('/add', function (req, res, next) {
	var valid = true;

	//create user from form inputs if form validation successful
	if (valid) {
		Contact.create( {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			number: req.body.number,
			email: req.body.email
		}, function (err, contact) {
			//'catch' error
			if (err) {
				console.log(err);
				res.end(err);
			}
			else {
				//redirect to list of contacts
				res.redirect('/contacts');
			}
		});
	}
	else {
		//if form validation fails
	}
});
/* POST - Process "Update Contact" */
router.post('/:id', function (req, res, next) {

	//grab Contact ID
	var id = req.params.id;

	//Create new Contact object
	var contact = new Contact( {
		_id: id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		number: req.body.number,
		email: req.body.email
	});

	//Use Mongoose to Update the Contact's information
	Contact.update( { _id: id }, contact, function (err) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			res.redirect('/contacts');
		}
	});
});


module.exports = router;