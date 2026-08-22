import api from './api';

export const authService = {
  register: (data)        => api.post('/auth/register', data),
  login:    (data)        => api.post('/auth/login', data),
  me:       ()             => api.get('/auth/me'),
  updateProfile: (data)   => api.put('/auth/me', data),
  listUsers: ()            => api.get('/auth/users'),
};
