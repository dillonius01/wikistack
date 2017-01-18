const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

const app = express();


// morgan logging
app.use(morgan('combined'));

// static files
app.use(express.static('public'));

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// nunjucks templating

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


app.get('/', (req, res) => {
	res.render('index');
});


const PORT = 8000;


models.Page.sync()
	.then((wat) => {
		console.log('Synced Pages')
		return models.User.sync()
	})
	.then((foo) => {
		console.log('Synced Users')
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		})
	})


