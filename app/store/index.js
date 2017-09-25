import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import playerHand from './playerHand';
import stage from './stage';

const reducer = combineReducers({playerHand, stage})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './playerHand';
export * from './stage';
