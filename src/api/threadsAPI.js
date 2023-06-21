import axios from "axios"

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getAllThreads(token, pageNumber = 1) {
    return axios.get(API_URL + "threads?page=" + pageNumber, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        });
}

function getCommentsByID(token, id, pageNumber = 1){
    console.log("EVENTUALLY:")
    console.log(API_URL + "threads/" + id + '/comments' + '/?page=' + pageNumber)
    return axios.get(API_URL + "threads/" + id + '/comments' + '/?page=' + pageNumber,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        });

}
function postComment(token, userId, threadId, textMessage){
    console.log("threadId in request: ", threadId)
    return axios.post(API_URL + "comments", {
        "user_id": userId,
        "thread_id": threadId,
        "comment_text": textMessage
    }).then((response)=>{
        return {status: response.status, data: response.data};
    }).catch((error) => {
        console.log(error);
        if(error.response.status === 400) {
            return {status: error.response.status, errors: [error.response.data.message]}
        }
        return {status: error.response.status, errors: error.response.data.errors};
    });
}

export const threadsAPI = {
    getAllThreads: getAllThreads,
    getCommentsByID: getCommentsByID,
    postComment: postComment
}