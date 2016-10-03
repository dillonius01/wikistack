var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var hstore = require('pg-hstore');
var nunjucks = require('nunjucks');
var wikiRouter = require('./routes/wiki')
var usersRouter = require('./routes/users')

//set up express
var express = require('express');
var app = express();

//set up morgan logging
app.use(morgan('combined'));

//importing sequelize
var models = require('./models/index');
var Page = models.Page;
var User = models.User;

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//nunjucks configuration
var env = nunjucks.configure('views', {noCache: true}); //points all routes to 'views'
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

var AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));



//serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get('/', function(req, res){
	res.redirect('/wiki') //don't include /views/
});

app.use(function(err, req, res, next){
	console.error(err);
	res.status(500).send(err.message);
});


User.sync({})
	.then(function() {
		return models.Page.sync()
	})
	.then(function() {
		app.listen(3001, function() {
			console.log('Server is listening on port 3001!');
		});
	})
	.catch(console.error);
