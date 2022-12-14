import axios from 'axios';
import React from 'react';

export const apiInstance = axios.create({
    baseURL: process.env.API_URL,
    params: {
        user_id: process.env.VUE_APP_API_KEY,
    },
    headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
