const Sequelize = require('sequelize');
const db = require('./_db');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
}, {
	//
})

module.exports = User;
