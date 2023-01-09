import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'http://52.52.204.222/api',
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
