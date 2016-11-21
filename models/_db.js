const Sequelize = require('sequelize');

let db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

module.exports = db;