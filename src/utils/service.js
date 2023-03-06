import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const apiInstance = axios.create({
    baseURL: 'https://api.thebiggestask.org/api',
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    cancelToken: source.token,
});
