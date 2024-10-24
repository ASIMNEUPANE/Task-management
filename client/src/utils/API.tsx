import axios from "axios";
import { SERVER_URL } from "../constants";

// Create an Axios instance
const API = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies with requests (for refresh token)
});

// Flag to prevent multiple refresh token requests at the same time
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Add the access token before each request
API.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle access token expiration
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired"
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Call the refresh token API
          const data = await axios.post(
            `${SERVER_URL}/api/v1/auths/refresh`,
            {},
            { withCredentials: true },
          );

          const newAccessToken = data.access_token;

          // Store the new access token
          window.localStorage.setItem("access_token", newAccessToken);

          // Retry the original failed request with the new access token
          processQueue(null, newAccessToken);

          // Set the new token in the headers
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return API(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If a refresh token request is already in progress, queue up the failed request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    }

    return Promise.reject(error);
  },
);

export default API;
