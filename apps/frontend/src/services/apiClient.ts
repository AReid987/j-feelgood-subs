import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Adjust baseURL as needed
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Placeholder: Retrieve the JWT token securely from your state management (e.g., Zustand)
    const token = 'YOUR_SECURELY_STORED_JWT_TOKEN'; // Replace with actual token retrieval logic

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;