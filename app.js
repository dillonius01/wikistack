var morgan = require('morgan');
var express = require('express');

var app = express();

// Middleware
app.use(morgan('combined')); 				// Morgan
app.use(express.static('public'));	// Static Files