import axios from 'axios';

const service = axios.create({
  timeout: 500000,
});

service.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = localStorage.getItem('AUTH_TOKEN');

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
  // return response.data;
});

export default service;
