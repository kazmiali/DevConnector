const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route GET api/profile/me
// @desc  Get current user's Profile
// @access Private

router.get('/me', auth, async (req, res) => {
	try {
		// We're gonna take profile model and findOne and find it by
		// User and we want to get it by Id and here the user is pertain to
		// user in the ProfileSchema
		// We will use populate method to add these to this query
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route GET api/profile
// @desc  Create or Update User Profile
// @access Private

//here we have to use 2 middleware of auth and check so we'll use []
router.post(
	'/',
	[
		auth,
		[
			check('status', 'status is required')
				.not()
				.isEmpty(),
			check('skills', 'skills are required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Do it when use express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//destructuring form req.body
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Build Profile Object
		// creating a profileFields and if there is a req.body.company
		// then assing the req.body.company to ProfileFields.company
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		// Build Social Object
		// If we didnt initialized social to be a object,
		// It would come as undefined
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			// Here we are finding a profile with userId
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				// Update
				// If there is a profile then we are using this to find and update
				// it and set profile fields
				// also read mongoose docs
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}
			// Create
			// if there is no profile then here we are creating a new
			// profile
			profile = new Profile(profileFields);

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route GET api/profile
// @desc  Create or Update User Profile
// @access Private

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(400).json('Server Error');
	}
});

module.exports = router;
