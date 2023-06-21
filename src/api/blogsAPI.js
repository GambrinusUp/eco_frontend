import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getBlogs(pageNumber) {
    return axios.get(API_URL + "blogs?page=" + pageNumber, null)
        .then((response) => {
            console.log(response);
            return {status: response.status, blogs: response.data.blogs, maxPage: response.data.pageInfo.pageCount};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getBlogById(id, token) {
    return axios.get(API_URL + "blogs/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, blog: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getBlogPosts(id, page, token) {
    return axios.get(API_URL + "blogs/" + id + "/posts?page=" + page, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, blog_posts: response.data.posts_in_blog,
                postsMaxPage : response.data.pageInfo.pageCount};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function createBlog(userId, name, description, avatar, token) {
    return axios.post(API_URL + "blogs", {
        "user_id": userId,
        "blog_title": name,
        "blog_description": description,
        "blog_avatar": avatar
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.created_blog);
            return {status: response.status, blog: response.data.created_blog};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteBlog(token, id) {
    return axios.delete(API_URL + "blogs/" + id, {
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

function editBlog(blogId, userId, name, description, avatar, token) {
    return axios.put(API_URL + "blogs/" + blogId, {
        "user_id": userId,
        "blog_title": name,
        "blog_description": description,
        "blog_avatar": avatar
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

export const blogsAPI = {
    getBlogs : getBlogs,
    getBlogById : getBlogById,
    getBlogPosts : getBlogPosts,
    createBlog : createBlog,
    deleteBlog : deleteBlog,
    editBlog : editBlog
}