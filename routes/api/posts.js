const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  POST api/posts
// @desc   Create a post
// @access Private

router.post(
	'/',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Usual express-validator way
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			// Finding a user by Id and excluding the password
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});

			// Saving Post
			const post = await newPost.save();

			// Returning the post
			await res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}
);

// @route  GET api/posts
// @desc   Get all posts
// @access Private

router.get('/', auth, async (req, res) => {
	try {
		// Finding all posts with sort of date but old date first
		const posts = await Post.find().sort({ date: -1 });
		await res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Private

router.get('/:id', auth, async (req, res) => {
	try {
		// Getting a post by finding in the Post by id from params
		const post = await Post.findById(req.params.id);

		if (!post) {
			return status(404).json({ msg: 'No post found' });
		}

		await res.json(post);
	} catch (err) {
		console.error(err.message);
		// Check if id is not valid
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No post found' });
		}
		res.status(500).json('Server Error');
	}
});

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private

router.delete('/:id', auth, async (req, res) => {
	try {
		// Getting a post by finding in the Post by id from params
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'No post found' });
		}
		// Check user isn't the owner of post
		if (post.user.toString() !== req.user.id) {
			//Not authorized is 401
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();

		await res.json({ msg: 'Post Successfully Removed' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No post found' });
		}
		res.status(500).json('Server Error');
	}
});

// NOW we are going to make like and unlike the post
// and the idea is that whenever a user likes something
// he gets added to the like array

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
	try {
		// Getting a post by finding in the Post by id from params
		const post = await Post.findById(req.params.id);
		// Here if post's likesArray has user whose id matches the login
		// user id and the return of the filter is greater than 0
		// then the post is already liked
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length > 0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		// Add the user object in like array
		post.likes.unshift({ user: req.user.id });

		await post.save();

		// Returning post.likes[]
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		// Getting a post by finding in the Post by id from params
		const post = await Post.findById(req.params.id);

		// Here if post's likesArray has user whose id matches the login
		// user id and the return of the filter is equal than 0
		// then the post is not liked
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length ===
			0
		) {
			return res.status(400).json({ msg: "Post hasn't yet been liked" });
		}

		// Remove Index
		const removeIndex = post.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		await post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private

router.post(
	'/comment/:id',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Usual express-validator way
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			// Finding a user by Id and excluding the password
			const user = await User.findById(req.user.id).select('-password');

			// Finding a post by params id
			const post = await Post.findById(req.params.id);
			// New Comment create
			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);
			// Saving Post
			await post.save();

			// Returning the post comments
			await res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete comment on a post
// @access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Pull out comment
		// This find() takes a func like a filter map etc
		const comment = post.comments.find(
			comment => comment.id === req.params.comment_id
		);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exists' });
		}

		// Check user is the owner of comment
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not Authorized' });
		}

		// Remove Index
		const removeIndex = post.comments
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		await post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
