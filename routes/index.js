var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Game Database',
    message: 'CRUD with MongoDB',
	user: req.user
  });
});

/* Authentication */
router.get('/register', function(req, res, next) {
	if(req.user){
		res.redirect('/');
	} else {
		res.render('register', {
			title: 'Register Account',
			user: req.user
		});
	}
});

router.post('/register', function(req, res, next){
	Account.register(new Account({
		username: req.body.username
	}),
	req.body.password,
	function(err, accout){
		if(err){
			res.render('error');
		}
		else{
			res.redirect('/login');
		}
	});
});

router.get('/login', function(req, res, next) {
	if(req.user){
		res.redirect('/');
	} else {
		res.render('login', {
			title: 'Log in',
			user: req.user
		});
	}
});

router.post('/login',  passport.authenticate('local',{
	successRedirect: '/games/',
	failureRedirect: '/login',
	failureMessage: 'Invalid Credentials'
}));

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});

module.exports = router;