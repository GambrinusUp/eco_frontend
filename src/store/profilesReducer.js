import {profilesAPI} from "../api/profilesAPI";
import editProfile from "../pages/EditProfile";

const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const PUT_PROFILE_SUCCESS = "PUT_PROFILE_SUCCESS";

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
        case PUT_PROFILE_SUCCESS:
            newState.profile = action.profile
            return newState
        default:
            return state;
    }
}

export function profileEditActionCreator(data){
    console.log(data)
    if(data.status === 200)
        return {type: PUT_PROFILE_SUCCESS, profile: data.data}
    else
        return {type: PUT_PROFILE_SUCCESS, errors: data.errors}
}
export function profileActionCreator(data) {
    console.log(data)
    if (data.status === 200)
        return {type: GET_PROFILE_SUCCESS, profile: data.data}
    else
        return {type: GET_PROFILE_SUCCESS, errors: data.errors}
}

export const profileEditThunkCreator = (token, firstName, lastName, email, password) => (dispatch) =>{
    return profilesAPI.putProfile(token, firstName, lastName, email, password).then(
        (data) =>{
            console.log(data)
            dispatch(profileEditActionCreator(data));
            if(data.status === 200){
                return Promise.resolve();
            }
            return Promise.reject
        }
    )
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