// we are gonna have multiple reducers but it will combine reducers by taking an object having reducers
import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// Here we will pass all the reducers that we have created
export default combineReducers({
	alert,
	auth,
	profile,
	post
});
