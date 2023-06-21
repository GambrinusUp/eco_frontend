import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function createComment(userId, postId, text, token) {
    return axios.post(API_URL + "comments", {
        "user_id": userId,
        "post_id": postId,
        "thread_id": "",
        "comment_text": text
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function editComment(commentId, text, token) {
    return axios.put(API_URL + "comments/" + commentId, {
        "comment_text": text
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteComment(commentId, token) {
    return axios.delete(API_URL + "comments/" + commentId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

export const commentsAPI = {
    createComment : createComment,
    editComment : editComment,
    deleteComment : deleteComment
}
