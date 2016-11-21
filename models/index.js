const db = require('./_db');
const Wikipage = require('./wikipage');
const User = require('./user');

Wikipage.belongsTo(User, {as: 'author'});
// adds authorId to wikipage

module.exports = db;
