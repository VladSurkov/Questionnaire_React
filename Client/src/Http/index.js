import axios from 'axios';

export const API_URL = `https://localhost:44309`;

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;
