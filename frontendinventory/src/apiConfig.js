// src/apiConfig.js
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5050/api/';

export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});
