import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import profilesReducer from "./profilesReducer";

let reducers = combineReducers({
    authentication: authenticationReducer,
    profiles: profilesReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
