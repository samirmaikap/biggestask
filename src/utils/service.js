import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'http://52.8.213.9/api',
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
