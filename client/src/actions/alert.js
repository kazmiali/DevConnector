import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// To dispatch more than one action.type we use dispatch
// We will use this function is Auth/Register.js
export const setAlert = (msg, alertType, timeout = 6000) => dispatch => {
	// uuid gives us an random long string id
	const id = uuid.v4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id }
	});

	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// This funtion will dispatch the type SET_ALERT to the reducer alert.js and reducer will add the alert to the state which is initally an empty array
