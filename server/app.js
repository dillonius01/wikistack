const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('../models');

const PORT = 8000;
const app = express();



// Middleware
app.use(morgan('combined')); 													// Morgan
app.use(bodyParser.json());														// Body Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../public'));			// Static Files

app.use('/api', routes);




app.use(function(err, req, res, next) {
	console.error(err);
	res.send(err);
});


app.listen(PORT, () => {
	console.log(`Wikistack is up on port ${PORT}!`);
	db.sync({force: true})
		.then( () => console.log('db synced!'))
		.catch(err => console.error('trouble with db', err));
});
