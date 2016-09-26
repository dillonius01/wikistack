var express = require('express');
var router = express.Router();

var models = require('../models')
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
  Page.findAll({})
  .then(function(allPages) {
  	res.render('index', {
  		pages: allPages
  	})
  })
  .catch(next)

});

router.post('/', function(req, res, next){
  var page = Page.build(req.body);

  // redirect only after save is finished
  page.save()
  	.then(function() {
  		res.redirect(page.route);
  	})
  	.catch(next);
});

router.get('/add/', function(req, res, next){
  res.render('addpage');
});

router.post('/add/', function(req, res, next){
  res.json(req.body);
});

//needs to be below /add route!
router.get('/:pageTitle', function(req, res, next){
	var urlTitleOfPage = req.params.pageTitle;

	Page.find({
		where: {
			urlTitle: urlTitleOfPage
		}
	})
		.then(function(page) {
			if (page === null) {
				return next(new Error('Page not found!'))
			}
			res.render('wikipage', {
				page: page
			});
		})
		.catch(next);
})


// get users => get all users (does not change db)
// get users/123 => gets specific user (does not change db)
// post users => creates a user in db
// put users/123 => updates the db
// delete users/123 => remove from db