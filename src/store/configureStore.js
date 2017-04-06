import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
// import rootReducer from '../reducers/index'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// We will call this funtion in the applications entry point
// so the store will be configure on start up
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant())
    );
}