import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE
} from '../actions/types';
// We will have action to create updatea and delete profile
const initialState = {
	// make req and get all our profile data in there and if we visit another profile it will get in here as well
	profile: null,
	// profile listing page profiles
	profiles: [],
	// github repos
	repos: [],
	loading: true,
	//object for errors
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				//current state
				...state,
				profile: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		default:
			return state;
	}
}
