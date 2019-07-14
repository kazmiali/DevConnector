const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
// @route GET api/auth
// @desc Getting User
// @access Public

router.get('/', auth, async (req, res) => {
	try {
		// We are using a async because here we are getting promises
		//here we're finding by id of user and excluding the password
		const user = await User.findById(req.user.id).select('-passoword');
		// returning the userinfo
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/auth
// @desc   Authenticate User and get Token
// @access Public

router.post(
	'/',
	[
		check('email', 'Please include a valid Email').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (!user) {
				return (
					res
						.status(400)
						//here we are using this syntax for .json() to send the
						//error in a arrayObj like format
						.json({ errors: [{ msg: 'Invalid Credentials' }] })
				);
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return (
					res
						.status(400)
						//here we are using this syntax for .json() to send the
						//error in a arrayObj like format
						.json({ errors: [{ msg: 'Invalid Credentials' }] })
				);
			}

			// Return jsonwebtokens

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
