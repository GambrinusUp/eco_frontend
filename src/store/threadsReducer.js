import {threadsAPI} from "../api/threadsAPI";

const GET_THREADS_SUCCESS = "GET_PROFILE_SUCCESS";

let initialState = {
    threads: [],
    errors: []
}

const threadsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_THREADS_SUCCESS:
            newState.threads = action.threads
            return newState
        default:
            return state;
    }
}

export function threadsActionCreator(data) {
    console.log(data)
    if (data.status === 200)
        return {type: GET_THREADS_SUCCESS, threads: data.data}
    else
        return {type: GET_THREADS_SUCCESS, errors: data.errors}
}

export const threadsThunkCreator = (token) => (dispatch) => {
    return threadsAPI.getAllThreads(token).then(
        (data) => {
            console.log(data);
            dispatch(threadsActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};


export default threadsReducer;