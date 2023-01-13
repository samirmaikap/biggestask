import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const apiInstance = axios.create({
  baseURL: 'http://52.52.204.222/api',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  cancelToken: source.token,
});
