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

export const postsAPI = {
    getPostReactions : getPostReactions
}