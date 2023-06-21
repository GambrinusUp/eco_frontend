import {subAPI} from "../api/subAPI";

let initialState = {

}

const subReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        default:
            return state;
    }
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
