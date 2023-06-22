import axios from "axios"

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getRatingsUsers(token, pageNum) {
    return axios.get(API_URL + "ratings/users?page=" + pageNum, {
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

export const ratingsAPI = {
    getRatingsUsers: getRatingsUsers
}