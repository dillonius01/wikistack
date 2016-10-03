var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');


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
	},
	tags: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		set: function(value) {
			var arrayofTags;

			if (typeof value === 'string') {
				arrayofTags = value.split(',').map(function(i) {return i.trim()});
				this.setDataValue('tags', arrayofTags);
			} else {
				this.setDataValue('tags', value);
			}


		}

	}
},
{
	classMethods : {
		findMatchingTags: function(tag) {
			return Page.findAll({
				where: {
					tags: {
						$overlap: [tag]
					}
				}
			})
		}
	},

	instanceMethods : {
		findSimilar: function(page) {
			return Page.findAll({
				where: {
					tags: {
						$overlap: this.tags
					},
					id: {
						$ne: this.id
					}
				}
			})
		}
	},

	getterMethods : {
		route: function() {
			return '/wiki/' + this.urlTitle;
		},
		renderedContent: function() {
			return marked(this.content);
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

Page.belongsTo(User, {as: 'author'});

module.exports = {
	Page: Page,
	User: User
};
