var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;


router.get('/', function(req, res, next) {
	User.findAll()
	 .then(function(users) {
	 	res.render('users', {
	 		users: users
	 	})
	 })
	 .catch(next)
})

router.get('/:userid/', function(req, res, next) {
	//render list of all pages written by that author (by id)
	var findingPages = Page.findAll({
		where: {
			authorId: req.params.userid
		}
	})

	var findingAuthor = User.findById(req.params.userid)

	Promise.all([findingPages, findingAuthor])
		.spread(function(pages, author) {
			res.render('userpage', {
				user: author,
				pages: pages
			})
		})
		.catch(next)

})




// get users => get all users (does not change db)
// get users/123 => gets specific user (does not change db)
// post users => creates a user in db
// put users/123 => updates the db
// delete users/123 => remove from db