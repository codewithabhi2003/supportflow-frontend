import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Attach the JWT (if we have one) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supportflow-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Distinguish "the backend responded with an error" from
    // "we couldn't reach the backend at all" (offline, backend down,
    // DNS failure, CORS misconfig, cold-start timeout, etc).
    // isNetworkError lets hooks fall back to a graceful empty UI
    // instead of a scary error banner for the latter case.
    const isNetworkError = !err.response;

    if (err.response?.status === 401) {
      localStorage.removeItem('supportflow-token');
      localStorage.removeItem('supportflow-user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    const message = err.response?.data?.message || err.message || 'Something went wrong';
    const wrapped = new Error(message);
    wrapped.isNetworkError = isNetworkError;
    wrapped.status = err.response?.status;
    return Promise.reject(wrapped);
  }
);

export default api;
