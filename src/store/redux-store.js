import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import profilesReducer from "./profilesReducer";
import blogsReducer from "./blogsReducer";
import postsReducer from "./postsReducer";

let reducers = combineReducers({
    authentication: authenticationReducer,
    blogs : blogsReducer,
    posts : postsReducer,
    profiles: profilesReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
