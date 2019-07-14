// Its our reducer that takes state and action and action is gonna dispach from action file

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// Here action will have two things 1. Type, 2.payload{id,msg}
// You can destructure {type, payload} = action
export default function(state = initialState, action) {
	switch (action.type) {
		// If action.type is SETALERT then it will return all the state and the payload as an array
		case SET_ALERT:
			return [...state, action.payload];
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== action.payload);
		default:
			return state;
	}
}
