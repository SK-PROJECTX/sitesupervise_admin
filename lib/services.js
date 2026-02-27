import api from "./api";

// Admin Authentication Services
export const adminAuthService = {
  login: (email, password) =>
    api.post("/api/v1/auth/login/", { email, password }),

  logout: (refreshToken) =>
    api.post("/api/v1/auth/logout/", { refresh_token: refreshToken }),

  getProfile: () => api.get("/api/v1/auth/profile/"),

  updateProfile: (data) => api.put("/api/v1/auth/profile/update/", data),

  changePassword: (data) => api.post("/api/v1/auth/change-password/", data),
};

// Admin Dashboard Services
export const adminDashboardService = {
  getUsers: () => api.get("/api/v1/admin/users/"),
  getUser: (id) => api.get(`/api/v1/admin/users/${id}/`),
  createUser: (data) => api.post("/api/v1/admin/users/", data),
  updateUser: (id, data) => api.put(`/api/v1/admin/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/api/v1/admin/users/${id}/`),

  getProjects: () => api.get("/api/v1/admin/projects/"),
  getProject: (id) => api.get(`/api/v1/admin/projects/${id}/`),
  createProject: (data) => api.post("/api/v1/admin/projects/", data),
  updateProject: (id, data) => api.put(`/api/v1/admin/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/api/v1/admin/projects/${id}/`),

  getBilling: () => api.get("/api/v1/admin/billing/"),

  getTickets: () => api.get("/api/v1/admin/tickets/"),
  createTicket: (data) => api.post("/api/v1/admin/tickets/", data),
  updateTicket: (id, data) => api.put(`/api/v1/admin/tickets/${id}/`, data),

  // Alerts
  getActiveAlerts: (page = 1) =>
    api.get(`/api/v1/admin/active-alerts/?page=${page}`),
  getAlertDashboard: () => api.get("/api/v1/admin/alert-dashboard/"),

  // Activity
  getActivityFeed: (params = {}) =>
    api.get("/api/v1/admin/activity-feed/", { params }),

  // Analytics
  getAnalyticsDashboard: () => api.get("/api/v1/admin/analytics/dashboard/"),

  // Infrastructure & Status
  getInfrastructureDashboard: () =>
    api.get("/api/v1/admin/dashboard/infrastructure/"),
  getInfrastructureStatus: () =>
    api.get("/api/v1/admin/infrastructure-status/"),
  getServiceMap: () => api.get("/api/v1/admin/service-map/"),

  // Integrations
  getIntegrations: (page = 1) =>
    api.get(`/api/v1/admin/integrations/?page=${page}`),
  createIntegration: (data) => api.post("/api/v1/admin/integrations/", data),
  getIntegration: (provider) =>
    api.get(`/api/v1/admin/integrations/${provider}/`),
  updateIntegration: (provider, data) =>
    api.put(`/api/v1/admin/integrations/${provider}/`, data),
  patchIntegration: (provider, data) =>
    api.patch(`/api/v1/admin/integrations/${provider}/`, data),

  // Maintenance
  getMaintenanceSchedule: (page = 1) =>
    api.get(`/api/v1/admin/maintenance-schedule/?page=${page}`),
  createMaintenanceWindow: (data) =>
    api.post("/api/v1/admin/maintenance-schedule/", data),

  // Configuration
  getModuleConfiguration: (page = 1) =>
    api.get(`/api/v1/admin/modules/configuration/?page=${page}`),

  // Settings
  getGeneralSettings: () => api.get("/api/v1/admin/settings/general/"),
  updateGeneralSettings: (data) =>
    api.put("/api/v1/admin/settings/general/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  patchGeneralSettings: (data) =>
    api.patch("/api/v1/admin/settings/general/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Legacy/Other Settings (Keeping if still used elsewhere)
  getSettings: () => api.get("/api/v1/admin/settings/"),
  updateSettings: (data) => api.put("/api/v1/admin/settings/", data),

  // Role Assignment (Dashboard Stats)
  getRoleAssignmentOverview: () =>
    api.get("/api/v1/admin/role-assignment-overview/"),
};

// System Health Services
export const systemHealthService = {
  getSystemHealth: () => api.get("/api/v1/auth/health/"),

  getSystemMetrics: () => api.get("/api/v1/admin/system-metrics/"),
};

export default {
  auth: adminAuthService,
  dashboard: adminDashboardService,
  system: systemHealthService,
};
