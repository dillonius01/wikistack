var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var hstore = require('pg-hstore');
var nunjucks = require('nunjucks');
var wikiRouter = require('./routes/wiki')

//set up express
var express = require('express');
var app = express();

//importing sequelize
var models = require('./models/index');

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//nunjucks configuration
var env = nunjucks.configure('views', {noCache: true}); //points all routs to 'views'
app.set('view engine', 'html');
app.engine('html', nunjucks.render);



//serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', wikiRouter);


// var server = app.listen(3001, function() {
// 	console.log('listening on port 3001')
// })

models.User.sync({})
	.then(function() {
		return models.Page.sync({})
	})
	.then(function() {
		app.listen(3001, function() {
			console.log('Server is listening on port 3001!');
		});
	})
	.catch(console.error);


app.get('/', function(req, res){
	res.render('index') //don't include /views/, see line 21
});
