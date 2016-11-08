var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(!req.user){
		res.redirect('/login');
	} else {
		Account.find(function(err, users) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the games view
            res.render('users', {
                title: 'User List',
                users: users,
				user: req.user
            });
        }
    });
	}
});

module.exports = router;
