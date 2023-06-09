import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";

let reducers = combineReducers({
    authentication: authenticationReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
