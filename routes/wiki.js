const router = require('express').Router();

const Page = require('../models').Page;


router.get('/', (req, res, next) => {
	Page.findAll()
		.then(pages => {
			res.render('index', { pages })
		})
		.catch(next)
});


router.post('/', (req, res, next) => {
	Page.create(req.body)
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
