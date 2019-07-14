import axios from 'axios';
// We aren't making a req, we are adding a global header like x-auth-token

// If we have a token in local storage then we are going to send it as a header with every req instead of picking and choosing which req to send it with
const setAuthToken = token => {
	// if token in local storage
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
