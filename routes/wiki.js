const router = require('express').Router();

const Page = require('../models').Page;
const User = require('../models').User;

router.get('/', (req, res, next) => {
	Page.findAll()
		.then(pages => {
			res.render('index', { pages })
		})
		.catch(next)
});


router.post('/', (req, res, next) => {
	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	})
	.spread((user, createdBool) => {
		return Page.create(req.body)
			.then(page => page.setAuthor(user));
	})
	.then(page => {
		res.redirect(page.route);
	})
	.catch(next);
});


router.get('/add', (req, res, next) => {
	res.render('addpage');
});


router.get('/:urlTitle', (req, res, next) => {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(page => {
		res.render('wikipage', { page })
	})
	.catch(next)
});

module.exports = router;
