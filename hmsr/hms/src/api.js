// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// // Request interceptor: add token if exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: log errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API response error:", error.response || error);
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API response error:", error.response || error);
    return Promise.reject(error);
  }
);

export default api;
