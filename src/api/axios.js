// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // This is mock api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
