import {threadsAPI} from "../api/threadsAPI";

const GET_THREADS_SUCCESS = "GET_THREADS_SUCCESS";
const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS"

let initialState = {
    threads: [],
    comments: [],
    errors: []
}

const threadsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_THREADS_SUCCESS:
            newState.threads = action.threads
            return newState;
        case GET_COMMENTS_SUCCESS:
            console.log("LOOK HERE DUDE: ", action.comments)
            newState.comments = action.comments
            return newState;
        case POST_COMMENT_SUCCESS:
            newState.errors = action.errors;
            return newState
        default:
            return state;
    }
}

export function postCommentActionCreator(data) {
    if (data.status === 200)
        return {type: POST_COMMENT_SUCCESS}
}
export function threadsActionCreator(data) {
    console.log(data)
    if (data.status === 200)
        return {type: GET_THREADS_SUCCESS, threads: data.data}
    else
        return {type: GET_THREADS_SUCCESS, errors: data.errors}
}

export function commentsActionCreator(data) {
    console.log(data)
    console.log("data.data: ", data.data)
    if (data.status === 200)
        return {type: GET_COMMENTS_SUCCESS, comments: data.data}
    else
        return {type: GET_COMMENTS_SUCCESS, errors: data.errors}
}

export const postCommentThunkCreator = (token, userId, threadId, textMessage) => (dispatch) => {
    return threadsAPI.postComment(token, userId, threadId, textMessage).then(
        (data) => {
            console.log(data);
            dispatch(postCommentActionCreator(data));
            if(data.status === 200){
                return Promise.resolve();
            }
            return Promise.reject()
        }
    )
}
export const threadsThunkCreator = (token, pageNum) => (dispatch) => {
    return threadsAPI.getAllThreads(token, pageNum).then(
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

export const commentsThunkCreator = (token, id, pageNum) => (dispatch) =>{
    return threadsAPI.getCommentsByID(token, id, pageNum).then(
        (data)=>{
            console.log(data);
            dispatch(commentsActionCreator(data));
            if(data.status === 200){
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).catch(error => console.error(error));
};

export default threadsReducer;