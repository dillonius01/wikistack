const router = require('express').Router();

const Page = require('../models').Page;
const User = require('../models').User;


router.get('/', (req, res, next) => {
	User.findAll()
	.then(users => {
		res.render('allusers', { users });
	})
	.catch(next);
});

router.get('/:userId', (req, res, next) => {
	console.log('HITTING THIS ROUTE!!!!')

	const findingUser = User.findById(req.params.userId);
	const findingPages = Page.findAll({
		where: {
			authorId: req.params.userId
		}
	});

	Promise.all([findingUser, findingPages])
	.then(([user, pages]) => {
		res.render('singleuser', { user, pages });
	})
	.catch(next);
});

module.exports = router;

// why can't Promise.all work with .spread when given an arrow function as a cb????
