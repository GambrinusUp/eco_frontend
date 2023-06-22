import {subAPI} from "../api/subAPI";

const LOAD_BLOGS_SUB = "LOAD_BLOGS_SUB"

let initialState = {
    blogsArr : [],
    maxPageNumber : 1,
}

const subReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_BLOGS_SUB:
            newState.blogsArr = action.blogs;
            newState.maxPageNumber = action.maxPage;
            return newState;
        default:
            return state;
    }
}

export function loadSubBlogsActionCreator(blogs) {
    return {type: LOAD_BLOGS_SUB, blogs : blogs.blogs, maxPage : blogs.maxPage}
}

export const loadSubBlogsThunkCreator = (userId, page, token) => (dispatch) => {
    return subAPI.getSubBlogs(userId, page, token).then(
        (data) => {
            if (data.status === 200 || data.status === 201 || data.status === 404) {
                dispatch(loadSubBlogsActionCreator(data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}


export const createNewSubThunkCreator = (userId, blogId, token)  => (dispatch) => {
    return subAPI.createNewSub(userId, blogId, token).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 201) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export const deleteSubThunkCreator = (userId, blogId)  => (dispatch) => {
    return subAPI.deleteSub(userId, blogId).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 201) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export default subReducer;
