import {authorizeAPI} from "../api/authorizeAPI";
import {loginActionCreator} from "./authenticationReducer";
import {commentsAPI} from "../api/commentsAPI";
import {loadPostCommentsThunkCreator} from "./postsReducer";

let initialState = {
    comments : []
}

const commentsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        default:
            return state;
    }
}

export const createCommentThunkCreator = (userId, postId, text, token)  => (dispatch) => {
    return commentsAPI.createComment(userId, postId, text, token) .then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                dispatch(loadPostCommentsThunkCreator(postId, 1));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const editCommentThunkCreator = (commentId, postId, text, token)  => (dispatch) => {
    return commentsAPI.editComment(commentId, text, token) .then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                dispatch(loadPostCommentsThunkCreator(postId, 1));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const deleteCommentThunkCreator = (commentId, postId, token)  => (dispatch) => {
    return commentsAPI.deleteComment(commentId, token) .then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                dispatch(loadPostCommentsThunkCreator(postId, 1));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export default commentsReducer;