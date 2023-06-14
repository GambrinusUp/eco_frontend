import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getBlogs(pageNumber) {
    return axios.get(API_URL + "blogs?page=" + pageNumber, null)
        .then((response) => {
            console.log(response);
            return {status: response.status, blogs: response.data.blogs};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getBlogById(id) {
    return axios.get(API_URL + "blogs/" + id, null)
        .then((response) => {
            console.log(response);
            return {status: response.status, blog: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function getBlogPosts(id, page) {
    return axios.get(API_URL + "blogs/" + id + "/posts?page=" + page, null)
        .then((response) => {
            console.log(response);
            return {status: response.status, blog_posts: response.data.posts_in_blog};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}


export const blogsAPI = {
    getBlogs : getBlogs,
    getBlogById : getBlogById,
    getBlogPosts
}