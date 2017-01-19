const router = require('express').Router();

const Page = require('../models').Page;
const User = require('../models').User;


router.get('/', (req, res, next) => {

	if (!req.query.tag) {
		res.render('tagsearch');
	} else {

		const tags = req.query.tag.split(' ')
		Page.findByTag(tags)
		.then(pages => {
			res.render('tagsearch', { pages });
		})
		.catch(next)
	}
});


module.exports = router;
