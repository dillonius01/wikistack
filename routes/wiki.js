const router = require('express').Router();

const Page = require('../models').Page;

router.get('/', (req, res, next) => {
	res.redirect('/')
	// Page.findAll()
	// 	.then(res.json)
	// 	.catch(next)
});

router.post('/', (req, res, next) => {
	// res.json(req.body)
	Page.create(req.body)
		.then(console.log)
		.then(() => {
			res.redirect('/')
		})
		.catch(next)
});

router.get('/add', (req, res, next) => {
	res.render('addpage');
});


module.exports = router;
