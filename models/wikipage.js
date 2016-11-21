const Sequelize = require('sequelize');
const db = require('./_db');

const Wikipage = db.define('wikipage', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},

	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},

	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		defaultValue: 'Coming soon...'
	},

	status: {
		type: Sequelize.ENUM('open', 'closed'),
		defaultValue: 'open'
	},

	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}

}, {
	getterMethods: {
		route: function() {
			return '/wiki/' + this.urlTitle;
		}
	}
});

module.exports = Wikipage;
