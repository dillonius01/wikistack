var express = require('express');
var router = express.Router();

var models = require('../models')
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res){
  res.redirect('/');
});

router.post('/', function(req, res, next){
  var page = Page.build({
  	title: req.body.title,
  	content: req.body.Page_Content
  });

  // redirect only after save is finished
  page.save()
  	.then(function() {
  		res.redirect(page.route);
  	})
  	.catch(console.error)

});

router.get('/add/', function(req, res){
  res.render('addpage');
});

router.post('/add/', function(req, res){
  res.json(req.body);
});

router.get('/:pageTitle', function(req, res){
	res.render('wikipage'); // need to send in nunjucks
})


// get users => get all users (does not change db)
// get users/123 => gets specific user (does not change db)
// post users => creates a user in db
// put users/123 => updates the db
// delete users/123 => remove from db