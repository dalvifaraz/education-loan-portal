// THIS IS FOR JWT BASED TO SEND TOKEN DIRECTLY
// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Automatically attach token if available
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;

//THIS IS FOR SENDING TOKEN IN SESSION AUTHENTICATION SYSTEM
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.SERVER_LOCAL_BASE_URL || 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Required for cookies to be sent/received
});

export default API;
