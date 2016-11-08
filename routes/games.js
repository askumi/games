/**
 * Created by RFreeman on 10/6/2016.
 */
var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');

// reference the Game model
var Game = require('../models/game');

// GET handler for /games
router.get('/', function(req, res, next) {

    // use Game model to run a query
    Game.find(function(err, games) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the games view
            res.render('games', {
                title: 'Video Games',
                games: games,
				user: req.user
            });
        }
    });
});

router.get('/add', function(req, res, next) {
	res.render('add-game', {
		title: 'Add New Game'
	});
});

router.get('/edit/:_id', function(req, res, next) {
	var _id = req.params._id;
	game.findById(_id, function(err, game){
		if(err){
			console.log(err);
			res.render('error', {message: 'Delete Error'});
		}
		else{
			res.render('edit-game', {
				title: 'Edit Game',
				game: game,
				user: req.user
			});
		}
	});
});

router.get('/delete/:_id', function(req, res, next) {
	var _id = req.params._id;
	
	Game.remove({_id: _id}, function(err){
		if(err){
			console.log(err);
			res.render('error', {message: 'Delete Error'});
		}
		else{
			res.redirect('/games');
		}
	});
});

router.post('/add', function(req, res, next){
	Game.create({
		title: req.body.title,
		publisher: req.body.publisher,
		genre: req.body.genre,
		year: req.body.year
	}, function(err, Game){
		if(err){
			console.log(err)
			res.render('error');
		}
		else{
			res.redirect('/games');
		}
	})
});

router.post('/edit/:_id', function(req, res, next) {
    var _id = req.params._id;

    var game = new Game( {
       _id: _id,
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        year: req.body.year
    });

    Game.update( { _id: _id }, game, function(err) {
       if (err) {
           console.log(err);
           res.render('error', {message: 'Could not Update Game'});
       }
        else {
           res.redirect('/games');
       }
    });
});

// make controller public
module.exports = router;


