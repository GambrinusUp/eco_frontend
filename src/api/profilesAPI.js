import axios from "axios"

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

function getMyProfile(token) {
    return axios.get(API_URL + "account/profile", {
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

function putProfile(token, first_name, last_name, email, password){
    console.log("FirstName: ", first_name)
    return axios.put(API_URL + 'account/profile',{
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        console.log(response);
        return {status: response.status, data: response.data};
    }).catch((error) => {
        console.log(error);
        return {status: error.response.status};
    })
}

export const profilesAPI = {
    getMyProfile: getMyProfile,
    putProfile: putProfile
}