const router = require('express').Router();

const Page = require('../models').Page;


router.get('/', (req, res, next) => {
	res.redirect('/');
	// Page.findAll()
	// 	.then(res.json)
	// 	.catch(next)
});


router.post('/', (req, res, next) => {
	Page.create(req.body)
		.then(page => {
			res.redirect(`/wiki/${page.urlTitle}`);
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
