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

export const threadsAPI = {
    getAllThreads: getAllThreads,
    getCommentsByID: getCommentsByID
}