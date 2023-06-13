import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function registration(first_name, last_name, birthDate, phone, city, email, password) {
    return axios.post(API_URL + "account/register", {
        "first_name": first_name,
        "last_name": last_name,
        "birth_date": birthDate,
        "phone": phone,
        "email": email,
        "password": password
    })
        .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            return {status: response.status, token: response.data.token};
        })
        .catch((error) => {
            console.log(error);
            localStorage.setItem("token", '');
            if(error.response.status === 409) {
                return {status: error.response.status, errors: [error.response.data.message]}
            }
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function login(email, password) {
    return axios.post(API_URL + "account/login", {
        "email": email,
        "password": password
    })
        .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            return {status: response.status, token: response.data.token};
        })
        .catch((error) => {
            console.log(error);
            localStorage.setItem("token", '');
            if(error.response.status === 400) {
                return {status: error.response.status, errors: [error.response.data.message]}
            }
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function logout(token) {
    return axios.post(API_URL + "account/logout", null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return response.status;
        })
        .catch((error) => {
            return error.response.status;
        });
}

export const authorizeAPI = {
    registration : registration,
    login : login,
    logout : logout
}
