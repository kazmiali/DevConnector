import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
	// Stored in localStorage and look for an item token
	token: localStorage.getItem('token'),
	// Its set to null but when we make a req to the api and we get a res of success then set to true
	isAuthenticated: null,
	// When we get a resp whether true or false its set to false so it mean that it has been loaded
	loading: true,
	// When we will get data from backend and we get name email avatar things like that then we will store it here till then its null
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// finding a thing called 'token' and set to 2nd param
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			};

		default:
			return state;
	}
}
