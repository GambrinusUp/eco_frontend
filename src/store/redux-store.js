import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import profilesReducer from "./profilesReducer";
import blogsReducer from "./blogsReducer";
import postsReducer from "./postsReducer";
import threadsReducer from "./threadsReducer";
import commentsReducer from "./commentsReducer";
import subReducer from "./subReducer";
import categoriesReducer from "./categoriesReducer";
import reactionsReducer from "./reactionsReducer";
import ratingsReducer from "./ratingsReducer";
import markersReducer from "./markersReducer";
import feedReducer from "./feedReducer";


let reducers = combineReducers({
    authentication: authenticationReducer,
    blogs : blogsReducer,
    posts : postsReducer,
    profiles: profilesReducer,
    threads: threadsReducer,
    comments : commentsReducer,
    subs : subReducer,
    cats : categoriesReducer,
    reactions : reactionsReducer,
    ratings : ratingsReducer,
    profiles: profilesReducer,
    marks : markersReducer,
    feed : feedReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
