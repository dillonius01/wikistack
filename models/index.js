const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

const Page = db.define('page', {
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
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
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
	},

	hooks: {
		beforeCreate: function(page) {

			const makeUrlTitle = title => {
			  if (title) {
			    return title.replace(/\s+/g, '_');
			  } else {
			    let str = '';
			    for (let i = 0; i < 8; i++) {
			      str += Math.round(Math.random() * 10);
			    }
			    return str;
			  }
			};

			page.urlTitle = makeUrlTitle(page.title);
		}
	}

});

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = {
	Page,
	User
}
