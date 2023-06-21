import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getPostReactions(id) {
    return axios.get(API_URL + "posts/" + id + "/stats", null)
        .then((response) => {
            console.log(response);
            return {status: response.status, reactions: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getPostById(id, token) {
    return axios.get(API_URL + "posts/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, post_details: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getPostCommentsById(id, page, token) {
    return axios.get(API_URL + "posts/" + id + "/comments?page=" + page, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, post_comments: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function createPostInBlog(id, title, text, token) {
    return axios.post(API_URL + "posts", {
        "blog_id": id,
        "post_title": title,
        "post_text": text
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, post: response.data.created_post.post_id};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function addCategories(postId, categoryId, token) {
    return axios.post(API_URL + "posts/" + postId + "/categories", {
        "category_id": categoryId,
        "post_id": postId
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
            console.log(error);
            return {status: error.response.status}
        });
}

function deletePost(postId, token) {
    return axios.delete(API_URL + "posts/" + postId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status}
        });
}

function editPost(postId, title, text, token) {
    return axios.put(API_URL + "posts/" + postId, {
        "post_title": title,
        "post_text": text
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
            console.log(error);
            return {status: error.response.status}
        });
}

export const postsAPI = {
    getPostReactions : getPostReactions,
    getPostById : getPostById,
    getPostCommentsById : getPostCommentsById,
    createPostInBlog : createPostInBlog,
    addCategories : addCategories,
    deletePost : deletePost,
    editPost : editPost
}