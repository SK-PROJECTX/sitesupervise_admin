import api from './api';

// Admin Authentication Services
export const adminAuthService = {
  login: (email, password) => 
    api.post('/api/v1/auth/login/', { email, password }),
  
  logout: () => 
    api.post('/api/v1/auth/logout/'),
  
  getProfile: () => 
    api.get('/api/v1/auth/profile/'),
  
  updateProfile: (data) => 
    api.put('/api/v1/auth/profile/update/', data),
  
  changePassword: (data) => 
    api.post('/api/v1/auth/change-password/', data),
};

// Admin Dashboard Services
export const adminDashboardService = {
  getUsers: () => 
    api.get('/api/v1/admin/users/'),
  
  getUser: (id) => 
    api.get(`/api/v1/admin/users/${id}/`),
  
  createUser: (data) => 
    api.post('/api/v1/admin/users/', data),
  
  updateUser: (id, data) => 
    api.put(`/api/v1/admin/users/${id}/`, data),
  
  deleteUser: (id) => 
    api.delete(`/api/v1/admin/users/${id}/`),
  
  getProjects: () => 
    api.get('/api/v1/admin/projects/'),
  
  getProject: (id) => 
    api.get(`/api/v1/admin/projects/${id}/`),
  
  createProject: (data) => 
    api.post('/api/v1/admin/projects/', data),
  
  updateProject: (id, data) => 
    api.put(`/api/v1/admin/projects/${id}/`, data),
  
  deleteProject: (id) => 
    api.delete(`/api/v1/admin/projects/${id}/`),
  
  getActivities: () => 
    api.get('/api/v1/admin/activities/'),
  
  getAlerts: () => 
    api.get('/api/v1/admin/alerts/'),
  
  createAlert: (data) => 
    api.post('/api/v1/admin/alerts/', data),
  
  updateAlert: (id, data) => 
    api.put(`/api/v1/admin/alerts/${id}/`, data),
  
  deleteAlert: (id) => 
    api.delete(`/api/v1/admin/alerts/${id}/`),
  
  getBilling: () => 
    api.get('/api/v1/admin/billing/'),
  
  getTickets: () => 
    api.get('/api/v1/admin/tickets/'),
  
  createTicket: (data) => 
    api.post('/api/v1/admin/tickets/', data),
  
  updateTicket: (id, data) => 
    api.put(`/api/v1/admin/tickets/${id}/`, data),
  
  getSettings: () => 
    api.get('/api/v1/admin/settings/'),
  
  updateSettings: (data) => 
    api.put('/api/v1/admin/settings/', data),
};

// System Health Services
export const systemHealthService = {
  getSystemHealth: () => 
    api.get('/api/v1/auth/health/'),
  
  getSystemMetrics: () => 
    api.get('/api/v1/admin/system-metrics/'),
};

export default {
  auth: adminAuthService,
  dashboard: adminDashboardService,
  system: systemHealthService,
};