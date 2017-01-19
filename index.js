const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

const app = express();


const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');

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


app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);



app.get('/', (req, res) => {
	res.render('index');
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err);
});


const PORT = 8000;


Promise.all([
	models.Page.sync(),
	models.User.sync()
])
	.then(() => {
		console.log('SYNCED DATABASE');
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch(console.error);
