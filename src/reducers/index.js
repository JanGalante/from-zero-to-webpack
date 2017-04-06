import {combineReducers} from 'redux';
import courses from './courseReducer'; //since it exported default, we can alias it however we want

// The root reducer
const rootReducer = combineReducers({
    courses // short hand property name, same as courses: courses
});

export default rootReducer;