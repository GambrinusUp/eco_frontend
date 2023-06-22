import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import profilesReducer from "./profilesReducer";
import blogsReducer from "./blogsReducer";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";
import subReducer from "./subReducer";
import categoriesReducer from "./categoriesReducer";
import reactionsReducer from "./reactionsReducer";
import markersReducer from "./markersReducer";

let reducers = combineReducers({
    authentication: authenticationReducer,
    blogs : blogsReducer,
    posts : postsReducer,
    comments : commentsReducer,
    subs : subReducer,
    cats : categoriesReducer,
    reactions : reactionsReducer,
    profiles: profilesReducer,
    marks : markersReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
