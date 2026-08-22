import api from './api';

export const ticketService = {
  create:         (data)              => api.post('/tickets', data),
  getAll:         (params)            => api.get('/tickets', { params }),
  getById:        (ticketId)          => api.get(`/tickets/${ticketId}`),
  updateStatus:   (ticketId, status)  => api.put(`/tickets/${ticketId}`, { status }),
  addNote:        (ticketId, noteText)=> api.post(`/tickets/${ticketId}/notes`, { noteText }),
  triggerAnalysis:(ticketId)          => api.post(`/tickets/${ticketId}/analyze`),
};
