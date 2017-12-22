import { combineReducers } from 'redux';
import counter from './counter';

const rootAppReducer = combineReducers({ counter });

export default rootAppReducer;
