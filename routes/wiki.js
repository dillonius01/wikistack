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
  console.log(req.body)
    

  User.findOrCreate({
    where:
      { 
        name: req.body.authorName,
        email: req.body.authorEmail
      }
    })
    .spread(function(user, wasCreatedBool) {

      var creatingPage = Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        tags: req.body.tags
      });

      var thenRelatingAuthor = creatingPage.then(function (createdPage) {
        return createdPage.setAuthor(user)
      })
    
      return thenRelatingAuthor;

    })
    .then(function(createdPage){
      res.redirect(createdPage.route)
    })
    .catch(next)

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

      page.getAuthor()
        .then(function(author) {

          page.author = author;

          return res.render('wikipage', {
            page: page   
          });

        })

      })
    .catch(next);
});

