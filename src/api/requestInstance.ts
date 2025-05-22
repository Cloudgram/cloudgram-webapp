import axios from 'axios';
import { API_URL } from '../constants/apiUrl';

export const requestInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
