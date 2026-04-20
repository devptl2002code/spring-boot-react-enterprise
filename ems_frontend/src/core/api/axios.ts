import axios from "axios";
import { env } from "@core/config/env";

const STORAGE_KEY = "ems_auth";

export const api = axios.create({
  baseURL: env.API_BASE_URL, // http://localhost:8080/api
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor → Attach JWT Automatically
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🚨 Response Interceptor → Handle 401 Globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);

      // Optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
