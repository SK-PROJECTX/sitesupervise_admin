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
  getUsers: (page = 1) => api.get(`/users/directory/?page=${page}`),
  getUser: (id) => api.get(`/users/${id}/`),
  createUser: (data) => api.post("/users/", data),
  updateUser: (id, data) => api.put(`/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/users/${id}/`),

  getProjects: () => api.get("/projects/"),
  getProject: (id) => api.get(`/projects/${id}/`),
  createProject: (data) => api.post("/projects/", data),
  updateProject: (id, data) => api.put(`/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/projects/${id}/`),
  getActiveProjectsGrid: (params = {}) =>
    api.get("/projects/active-grid/", { params }),
  getProjectDashboard: () => api.get("/projects/dashboard/"),

  getBilling: () => api.get("/admin/billing/"),

  getTickets: () => api.get("/admin/tickets/"),
  createTicket: (data) => api.post("/admin/tickets/", data),
  updateTicket: (id, data) => api.put(`/admin/tickets/${id}/`, data),

  // Alerts
  getActiveAlerts: (page = 1) => api.get(`/admin/active-alerts/?page=${page}`),
  getAlertDashboard: () => api.get("/admin/alert-dashboard/"),

  // Activity
  getActivityFeed: (params = {}) =>
    api.get("/admin/activity-feed/", { params }),

  // Analytics
  getAnalyticsDashboard: () => api.get("/admin/analytics/dashboard/"),

  // Infrastructure & Status
  getInfrastructureDashboard: () => api.get("/admin/dashboard/infrastructure/"),
  getInfrastructureStatus: () => api.get("/admin/infrastructure-status/"),
  getServiceMap: () => api.get("/admin/service-map/"),

  // Integrations
  getIntegrations: (page = 1) => api.get(`/admin/integrations/?page=${page}`),
  createIntegration: (data) => api.post("/admin/integrations/", data),
  getIntegration: (provider) => api.get(`/admin/integrations/${provider}/`),
  updateIntegration: (provider, data) =>
    api.put(`/admin/integrations/${provider}/`, data),
  patchIntegration: (provider, data) =>
    api.patch(`/admin/integrations/${provider}/`, data),

  // Maintenance
  getMaintenanceSchedule: (page = 1) =>
    api.get(`/admin/maintenance-schedule/?page=${page}`),
  createMaintenanceWindow: (data) =>
    api.post("/admin/maintenance-schedule/", data),

  // Configuration
  getModuleConfiguration: (page = 1) =>
    api.get(`/admin/modules/configuration/?page=${page}`),

  // Settings
  getGeneralSettings: () => api.get("/admin/settings/general/"),
  updateGeneralSettings: (data) =>
    api.put("/admin/settings/general/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  patchGeneralSettings: (data) =>
    api.patch("/admin/settings/general/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Legacy/Other Settings (Keeping if still used elsewhere)
  getSettings: () => api.get("/admin/settings/"),
  updateSettings: (data) => api.put("/admin/settings/", data),

  // Role Assignment (Dashboard Stats)
};

// Project Onboarding & Access Services
export const projectOnboardingService = {
  grantAccess: (data) => api.post("/api/v1/auth/project-access/", data),

  getOnboardings: (page = 1) =>
    api.get(`/api/v1/auth/project-onboarding/?page=${page}`),

  createOnboarding: (data) =>
    api.post("/api/v1/auth/project-onboarding/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getOnboarding: (id) => api.get(`/api/v1/auth/project-onboarding/${id}/`),

  updateOnboarding: (id, data) =>
    api.put(`/api/v1/auth/project-onboarding/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  patchOnboarding: (id, data) =>
    api.patch(`/api/v1/auth/project-onboarding/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteOnboarding: (id) =>
    api.delete(`/api/v1/auth/project-onboarding/${id}/`),
};

// System Health Services
export const systemHealthService = {
  getSystemHealth: () => api.get("/api/v1/auth/health/"),

  getSystemMetrics: () => api.get("/admin/system-metrics/"),
};

const services = {
  auth: adminAuthService,
  dashboard: adminDashboardService,
  system: systemHealthService,
  onboarding: projectOnboardingService,
};

export default services;
