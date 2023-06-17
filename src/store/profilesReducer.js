import authenticationReducer, {loginActionCreator} from "./authenticationReducer";
import {profilesAPI} from "../api/profilesAPI";

const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";

let initialState = {
    profile: [],
    errors: []
}

const profilesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            newState.profile = action.profile
            return newState
        default:
            return state;
    }
}

export function profileActionCreator(data) {
    console.log(data)
    if (data.status === 200)
        return {type: GET_PROFILE_SUCCESS, profile: data.data}
    else
        return {type: GET_PROFILE_SUCCESS, errors: data.errors}
}

export const profileThunkCreator = (token) => (dispatch) => {
    return profilesAPI.getMyProfile(token).then(
        (data) => {
            console.log(data);
            dispatch(profileActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};


export default profilesReducer;