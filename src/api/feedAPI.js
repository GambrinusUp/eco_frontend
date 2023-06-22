import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getFeedPosts(page, token) {
    return axios.get(API_URL + "ratings/posts?page=" + page, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status,posts: response.data.posts_ratings,
                maxPage : response.data.pageInfo.pageCount};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}


export const feedAPI = {
    getFeedPosts : getFeedPosts
}