import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function createNewSub(userId, blogId, token) {
    return axios.post(API_URL + "subscriptions", {
        "user_id": userId,
        "blog_id": blogId
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response => {
            console.log(response);
            console.log(response.data);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteSub(userId, blogId) {
    return axios.delete(API_URL + "subscriptions/users/" + userId + "/blogs/" + blogId, null)
        .then((response => {
            console.log(response);
            return {status: response.status};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getSubBlogs(userId, page, token) {
    return axios.get(API_URL + "subscriptions/" + userId + "?page=" + page, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response => {
            console.log(response);
            return {status: response.status, blogs: response.data.subscriptions_blogs,
                maxPage: response.data.pageInfo.pageCount};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

export const subAPI = {
    createNewSub : createNewSub,
    deleteSub : deleteSub,
    getSubBlogs : getSubBlogs
}