var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	content: {
		type: Sequelize.TEXT,
		defaultValue: "Under construction",
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed'),
		defaultValue: 'open'
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
},
{
	getterMethods : {
		route: function() {
			return '/wiki/' + this.urlTitle;
		}
	},
	hooks: {
		beforeValidate: function(page) {
			if (page.title) {
				page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
			} else {
				var alphanumbet = '0123456789abcdefghijklmnopqrstuvwxyz';
				var randomTitle = '';

				for (var i = 0; i < 15; i++) {
					var index = Math.floor((Math.random() * 36));
					randomTitle += alphanumbet[index];
				}
				page.urlTitle = randomTitle;	
			}
		}
	}
});


var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	}
});

module.exports = {
	Page: Page,
	User: User
};
