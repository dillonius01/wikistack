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
const env = nunjucks.configure('views', {noCache: true});
const AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

app.set('view engine', 'html');
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
