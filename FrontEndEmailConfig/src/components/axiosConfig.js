// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/React/FullStackEmailTemplate/Datas/public/api', // Adjust this URL based on your XAMPP setup
});

export default axiosInstance;
