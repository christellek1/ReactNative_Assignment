import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
