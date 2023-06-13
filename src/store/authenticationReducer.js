import {authorizeAPI} from "../api/authorizeAPI";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

let initialState = {
    token: '',
    errors: []
}

const authenticationReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOGIN_SUCCESS:
            newState.token = action.token;
            newState.errors = [];
            return newState
        case LOGIN_FAIL:
            newState.token = '';
            newState.errors = action.errors;
            return newState
        default:
            return state;
    }
}

export function loginActionCreator(data) {
    if (data.status === 200)
        return {type: LOGIN_SUCCESS, token: data.token}
    else
        return {type: LOGIN_FAIL, errors: data.errors}
}

export const login = (email, password) => (dispatch) => {
    return authorizeAPI.login(email, password).then(
        (data) => {
            console.log(data);
            dispatch(loginActionCreator(data, email));
            if(data.status === 200) {
                localStorage.setItem("user", email);
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const registration1 = (first_name, last_name, birthDate, phone, city, email, password) => (dispatch) => {
    return authorizeAPI.registration(first_name, last_name, birthDate, phone, city, email, password).then(
        (data) => {
            dispatch(loginActionCreator(data));
            if(data.status === 200) {
                localStorage.setItem("token", data.token);
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const logout = (token) => () => {
    return authorizeAPI.logout(token).then (
        (status) => {
            localStorage.setItem("token", '');
            if(status !== 200) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    );
};

export default authenticationReducer;
