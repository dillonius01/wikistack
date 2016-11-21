const Promise = require('bluebird');
const router = require('express').Router();
const db = require('../../models');
const { User, Wikipage } = db;

/////////////////////
//// PAGE ROUTES ////
/////////////////////

router.get('/page/', function(req, res, next) {
	Wikipage.findAll()
		.then(pages => res.send(pages))
		.catch(next);
});

router.post('/page/', function(req, res, next) {
	Wikipage.create(req.body)
		.then(page => res.send(page))
		.catch(next);
});

/////////////////////
//// USER ROUTES ////
/////////////////////

router.get('/user/:id', function(req, res, next) {
	User.findById(req.params.id)
		.then(user => res.send(user))
		.catch(next);
});

router.get('/user/', function(req, res, next) {
	User.findAll()
		.then(users => res.send(users))
		.catch(next);
});

router.post('/user/', function(req, res, next) {
	User.create(req.body)
		.then(user => res.send(user))
		.catch(next);
});

module.exports = router;
