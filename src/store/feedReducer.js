import {subAPI} from "../api/subAPI";
import {loadOwnerBlogsActionCreator} from "./blogsReducer";
import {feedAPI} from "../api/feedAPI";

const LOAD_POSTS = "LOAD_POSTS"

let initialState = {
    posts: [],
    maxPage : 1
}

const feedReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_POSTS:
            newState.posts = action.posts;
            newState.maxPage = action.maxPage;
            return newState;
        default:
            return state;
    }
}

export function loadFeedActionCreator(posts) {
    return {type: LOAD_POSTS, posts : posts.posts, maxPage : posts.maxPage}
}

export const loadFeedThunkCreator = (page, token) => (dispatch) => {
    return feedAPI.getFeedPosts(page, token).then(
        (data) => {
            if (data.status === 200 || data.status === 201 || data.status === 404) {
                dispatch(loadFeedActionCreator(data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export default feedReducer;
