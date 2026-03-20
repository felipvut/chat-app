import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {

    const token = localStorage.getItem('@chat-app/token');
    if (token) {
      request.headers.Authorization = token;
    }

    return request;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@chat-app/token');
      window.dispatchEvent(new Event('unauthorized'));
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;