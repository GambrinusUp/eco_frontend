import axios from "axios";

const API_URL = 'http://d.wolf.16.fvds.ru/api/';

export async function getMarkers() {
    try {
        const response = await axios.get(API_URL + "markers", null);
        console.log(response);
        return response.data.markers;
    } catch (error) {
        return null;
    }
}