import axios from "axios";
import { env } from "@core/config";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.url?.includes("/auth/login")) {
    return config;
  }

  const method = config.method?.toUpperCase();
  if (method && !["GET", "HEAD", "OPTIONS", "TRACE"].includes(method)) {
    const name = "XSRF-TOKEN";

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];

    if (csrfToken) {
      config.headers!["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
