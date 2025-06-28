// import React from 'react';

// const AppRoutes = () => {
//   return (
//     <div style={{ display: 'none' }}>This file is not directly used in this setup.</div>
//   );
// };

// export default AppRoutes;


// // client/src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       window.location.href = '/auth';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

