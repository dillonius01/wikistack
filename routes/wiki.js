var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
  res.redirect('/');
});

router.post('/', function(req, res){
  res.send('This is a post request');
});

router.get('/add/', function(req, res){
  res.render('addpage');
});

router.post('/add/', function(req, res){
  res.json(req.body);
});

// get users => get all users (does not change db)
// get users/123 => gets specific user (does not change db)
// post users => creates a user in db
// put users/123 => updates the db
// delete users/123 => remove from db