import {subAPI} from "../api/subAPI";
import {reactionsAPI} from "../api/reactionsAPI";

let initialState = {

}

const reactionsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        default:
            return state;
    }
}

export const createNewReactionThunkCreator = (userId, postId, commentId, reaction, token)  => (dispatch) => {
    return reactionsAPI.createReaction(userId, postId, commentId, reaction, token).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 201) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export const deleteReactionFromCommThunkCreator = (userId, commentId)  => (dispatch) => {
    return reactionsAPI.deleteReactionFromComment(userId, commentId).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 201) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export const deleteReactionFromPostThunkCreator = (userId, postId)  => (dispatch) => {
    return reactionsAPI.deleteReactionFromPost(userId, postId).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 201) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
}

export default reactionsReducer;
