const express = require('express');
const router = express.Router();

// @route GET api/posts
// @desc Test routes
// @access Public

router.get('/', (req, res) => res.json('Posts Route is Working Fine!'));

module.exports = router;
