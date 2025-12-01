import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Change to your Render URL after deployment
});

// REQUEST INTERCEPTOR (Attach Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (Global Error Handler)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("Network Error: Backend is down.");
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.response.status === 500) {
      alert("Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;
