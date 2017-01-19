const router = require('express').Router();

const Page = require('../models').Page;
const User = require('../models').User;


router.get('/', (req, res, next) => {

	if (!req.query.tag) {
		res.render('tagsearch');
	} else {
		Page.findByTag(req.query.tag)
		.then(pages => {
			console.log('----------WE FOUND PAGES!!!!!', pages);
			res.json(pages);
		})
		.catch(next)
	}
});


module.exports = router;
