import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getCategories() {
    return axios.get(API_URL + "categories", null)
        .then((response => {
            console.log(response);
            console.log(response.data);
            return {status: response.status, categories: response.data.categories};
        }))
        .catch((error) => {
            return {status: error.response.status}
        });
}

export const categoriesAPI = {
    getCategories : getCategories
}