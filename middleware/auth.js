const jwt = require('jsonwebtoken');
const config = require('config');

// a middleware functions take req and res object and also a next
// which means next will be called
module.exports = function(req, res, next) {
	// Get token from req.header
	const token = req.header('x-auth-token');

	// Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, Authorization Failed' });
	}

	// Verify Token
	try {
		// Checks the token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		// If the token is not valid
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
