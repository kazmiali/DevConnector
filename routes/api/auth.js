const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Test routes
// @access Public

router.get('/', (req, res) => res.json('Auth Route is Working Fine!'));

module.exports = router;
