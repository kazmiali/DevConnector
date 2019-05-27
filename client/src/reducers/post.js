import {
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST
} from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				// posts = array[existing state.posts, andTheNewPost]
				posts: [payload, ...state.posts],
				loading: false
			};
		case DELETE_POST:
			return {
				...state,
				// forEach post match post id != payloadId
				// it means return all exept the one that deleted
				posts: state.posts.filter(post => post._id !== payload),
				loading: false
			};
		case UPDATE_LIKES:
			return {
				...state,
				// here we are checking if for each post if post id = to the resp payload.id then return post and manipulate the existing likes with the new likes otherwise return post simple
				posts: state.posts.map(post =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false
			};
		default:
			return state;
	}
}
