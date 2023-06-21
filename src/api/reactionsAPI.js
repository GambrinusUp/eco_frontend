import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function createReaction(userId, postId, commentId, reaction,token) {
    return axios.post(API_URL + "reactions", {
        "user_id": userId,
        "post_id": postId,
        "comment_id" : commentId,
        "reaction": reaction
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response => {
            console.log(response);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteReaction(id,token) {
    return axios.delete(API_URL + "reactions/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response => {
            console.log(response);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteReactionFromComment(userId, commentId) {
    return axios.delete(API_URL + "reactions/users/" + userId +
        "/comments/" + commentId, null)
        .then((response => {
            console.log(response);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteReactionFromPost(userId, postId) {
    return axios.delete(API_URL + "reactions/users/" + userId +
        "/posts/" + postId, null)
        .then((response => {
            console.log(response);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

export const reactionsAPI = {
    createReaction : createReaction,
    deleteReaction : deleteReaction,
    deleteReactionFromComment : deleteReactionFromComment,
    deleteReactionFromPost : deleteReactionFromPost
}