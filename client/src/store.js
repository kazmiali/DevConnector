import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// THIS IS A BOILER PLATE FOR REDUX STORE
// applyMiddleware is imported because we will use the thunk middleware
// root reducer mean that it will be the root of reducers
// on 8 we create a middleware with array containing thunk
