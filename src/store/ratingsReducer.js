import {ratingsAPI} from "../api/ratingsAPI";

const GET_RATINGS_USERS_SUCCESS = "GET_RATINGS_USERS_SUCCESS";

let initialState = {
    usersRatings: [],
    errors: []
}

const ratingsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_RATINGS_USERS_SUCCESS:
            newState.usersRatings = action.usersRatings
            return newState
        default:
            return state;
    }
}

export function ratingsUsersActionCreator(data) {
    console.log(data)
    if (data.status === 200)
        return {type: GET_RATINGS_USERS_SUCCESS, usersRatings: data.data}
    else
        return {type: GET_RATINGS_USERS_SUCCESS, errors: data.errors}
}

export const ratingsUsersThunkCreator = (token, pageNum) => (dispatch) => {
    return ratingsAPI.getRatingsUsers(token, pageNum).then(
        (data) => {
            console.log(data);
            dispatch(ratingsUsersActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};


export default ratingsReducer;