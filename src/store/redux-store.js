import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import blogsReducer from "./blogsReducer";
import postsReducer from "./postsReducer";

let reducers = combineReducers({
    authentication: authenticationReducer,
    blogs : blogsReducer,
    posts : postsReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
