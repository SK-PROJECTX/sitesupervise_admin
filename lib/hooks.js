"use client";

import { useState, useEffect, useCallback } from "react";
import api from "./api";
import { adminDashboardService, projectOnboardingService } from "./services";

// Admin Auth Hook
export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("admin_access_token");
        if (token) {
          const response = await api.get("/api/v1/auth/profile/");
          setAdmin(response.data);
        }
      } catch (error) {
        console.error("Admin auth check failed:", error);
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/api/v1/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("admin_access_token", response.data.access_token);
      localStorage.setItem("admin_refresh_token", response.data.refresh_token);
      setAdmin(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/v1/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      setAdmin(null);
    }
  }, []);

  return {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };
};

// API Hook
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

// --- Mock Data for Demo Fallbacks ---
const MOCK_USERS = [
  {
    id: 1,
    username: "admin.primary",
    email: "admin@sitesupervise.com",
    role: "Admin",
    status: "active",
    company: "Site Supervise HQ",
  },
  {
    id: 2,
    username: "pm.john",
    email: "john.doe@abc.com",
    role: "Project Manager",
    status: "active",
    company: "ABC Construction",
  },
  {
    id: 3,
    username: "super.mike",
    email: "mike.s@buildcorp.com",
    role: "Superintendent",
    status: "active",
    company: "BuildCorp",
  },
  {
    id: 4,
    username: "field.tom",
    email: "tom.w@field.com",
    role: "Field Worker",
    status: "disabled",
    company: "External Contractors",
  },
];

const MOCK_ROLES = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access with all permissions.",
    is_system: true,
    permissions: [
      { module: "Tasks", create: true, read: true, update: true, delete: true },
      {
        module: "Documents",
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      {
        module: "Financial",
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      {
        module: "User management",
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    ],
  },
  {
    id: 2,
    name: "Project Manager",
    description: "Management level access for assigned projects.",
    is_system: true,
    permissions: [
      { module: "Tasks", create: true, read: true, update: true, delete: true },
      {
        module: "Documents",
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      {
        module: "Financial",
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      {
        module: "User management",
        create: false,
        read: true,
        update: false,
        delete: false,
      },
    ],
  },
  {
    id: 3,
    name: "Field Worker",
    description: "Basic access for task reporting and viewing documents.",
    is_system: true,
    permissions: [
      {
        module: "Tasks",
        create: false,
        read: true,
        update: true,
        delete: false,
      },
      {
        module: "Documents",
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      {
        module: "Financial",
        create: false,
        read: false,
        update: false,
        delete: false,
      },
      {
        module: "User management",
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    ],
  },
];

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "Downtown Plaza",
    location: "New York, NY",
    status: "In Progress",
    manager: "John Doe",
    start_date: "2024-01-15",
  },
  {
    id: 2,
    name: "Riverside Apartments",
    location: "Austin, TX",
    status: "Planning",
    manager: "Jane Smith",
    start_date: "2024-03-20",
  },
  {
    id: 3,
    name: "Tech Hub Office",
    location: "Palo Alto, CA",
    status: "Completed",
    manager: "Mike Johnson",
    start_date: "2023-06-10",
  },
];

const MOCK_ACTIVE_PROJECTS_GRID = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "Downtown Plaza",
      company: "ABC Construction",
      progress: 45,
      health_status_label: "Good",
    },
    {
      id: 2,
      name: "Riverside Apartments",
      company: "BuildCorp",
      progress: 20,
      health_status_label: "Risk",
    },
    {
      id: 3,
      name: "Highway Expansion",
      company: "City Infra",
      progress: 10,
      health_status_label: "Critical",
    },
  ],
};

const MOCK_PROJECT_DASHBOARD = {
  total_projects: 42,
  active_projects: 28,
  completed_projects: 10,
  at_risk: 4,
  critical_alerts: 2,
  budget_utilization: 75,
};

const MOCK_ACTIVE_ALERTS = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      priority: "MEDIUM",
      priority_color: "yellow-500",
      title: "Storage at 82% capacity",
      formatted_message: "Storage at 82% capacity",
      suggested_actions: "Consider upgrading storage or cleaning up old files.",
      created_at: "2026-03-19T06:05:26.296Z",
    },
    {
      id: 2,
      priority: "HIGH",
      priority_color: "red-500",
      title: "Unusual login pattern detected",
      formatted_message: "Unusual login pattern detected",
      suggested_actions:
        "Review security logs and contact the user if necessary.",
      created_at: "2026-03-19T06:10:26.296Z",
    },
    {
      id: 3,
      priority: "LOW",
      priority_color: "blue-500",
      title: "API response time increasing",
      formatted_message: "API response time increasing",
      suggested_actions: "Monitor system health and performance.",
      created_at: "2026-03-19T06:15:26.296Z",
    },
  ],
};

// Users Management Hook
export const useUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const { request, loading, error } = useApi();

  const fetchUsers = useCallback(async () => {
    try {
      const respData = await request(() => adminDashboardService.getUsers());
      // Handle nested data.data.results or data.results or data array
      const data = respData?.data || respData;
      const usersData = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : Array.isArray(respData)
            ? respData
            : [];
      setUsers(usersData);
      return usersData;
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("⚠️ Users API 404 - Falling back to mock data for demo.");
        setUsers(MOCK_USERS);
        return MOCK_USERS;
      }
      throw err;
    }
  }, [request]);

  const createUser = useCallback(
    async (userData) => {
      try {
        const data = await request(() =>
          adminDashboardService.createUser(userData),
        );
        setUsers((prev) => [...prev, data]);
        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          const newUser = { id: Date.now(), ...userData };
          setUsers((prev) => [...prev, newUser]);
          return newUser;
        }
        throw err;
      }
    },
    [request],
  );

  const updateUser = useCallback(
    async (id, userData) => {
      try {
        const data = await request(() =>
          adminDashboardService.updateUser(id, userData),
        );
        setUsers((prev) => prev.map((user) => (user.id === id ? data : user)));
        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === id ? { ...user, ...userData } : user,
            ),
          );
          return { id, ...userData };
        }
        throw err;
      }
    },
    [request],
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        await request(() => adminDashboardService.deleteUser(id));
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (err) {
        if (err.response?.status === 404) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        } else {
          throw err;
        }
      }
    },
    [request],
  );

  return {
    users,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    loading,
    error,
  };
};

// Projects Management Hook
export const useAdminProjects = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const { request, loading, error } = useApi();

  const fetchProjects = useCallback(async () => {
    try {
      const respData = await request(() => adminDashboardService.getProjects());
      const data = respData?.data || respData;
      const projectsData = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : Array.isArray(respData)
            ? respData
            : [];
      setProjects(projectsData);
      return projectsData;
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn(
          "⚠️ Projects API 404 - Falling back to mock data for demo.",
        );
        setProjects(MOCK_PROJECTS);
        return MOCK_PROJECTS;
      }
      throw err;
    }
  }, [request]);

  const createProject = useCallback(
    async (projectData) => {
      try {
        const data = await request(() =>
          adminDashboardService.createProject(projectData),
        );
        setProjects((prev) => [...prev, data]);
        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          const newProject = { id: Date.now(), ...projectData };
          setProjects((prev) => [...prev, newProject]);
          return newProject;
        }
        throw err;
      }
    },
    [request],
  );

  const updateProject = useCallback(
    async (id, projectData) => {
      try {
        const data = await request(() =>
          adminDashboardService.updateProject(id, projectData),
        );
        setProjects((prev) =>
          prev.map((project) => (project.id === id ? data : project)),
        );
        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          setProjects((prev) =>
            prev.map((project) =>
              project.id === id ? { ...project, ...projectData } : project,
            ),
          );
          return { id, ...projectData };
        }
        throw err;
      }
    },
    [request],
  );

  const deleteProject = useCallback(
    async (id) => {
      try {
        await request(() => adminDashboardService.deleteProject(id));
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } catch (err) {
        if (err.response?.status === 404) {
          setProjects((prev) => prev.filter((project) => project.id !== id));
        } else {
          throw err;
        }
      }
    },
    [request],
  );

  return {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
  };
};

// Active Projects Grid Hook
export const useActiveProjectsGrid = (initialParams = {}) => {
  const [data, setData] = useState(MOCK_ACTIVE_PROJECTS_GRID);
  const { request, loading, error } = useApi();

  const fetchActiveProjectsGrid = useCallback(
    async (params = initialParams) => {
      try {
        const resp = await request(() =>
          adminDashboardService.getActiveProjectsGrid(params),
        );
        setData(resp);
        return resp;
      } catch (err) {
        if (err.response?.status === 404) {
          console.warn(
            "⚠️ Active Projects Grid API 404 - Falling back to mock data.",
          );
          setData(MOCK_ACTIVE_PROJECTS_GRID);
          return MOCK_ACTIVE_PROJECTS_GRID;
        }
        throw err;
      }
    },
    [request, initialParams],
  );

  return {
    data,
    fetchActiveProjectsGrid,
    loading,
    error,
  };
};

// Project Dashboard Hook
export const useProjectDashboard = () => {
  const [stats, setStats] = useState(MOCK_PROJECT_DASHBOARD);
  const { request, loading, error } = useApi();

  const fetchProjectDashboard = useCallback(async () => {
    try {
      const data = await request(() =>
        adminDashboardService.getProjectDashboard(),
      );
      setStats(data);
      return data;
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn(
          "⚠️ Project Dashboard API 404 - Falling back to mock data.",
        );
        setStats(MOCK_PROJECT_DASHBOARD);
        return MOCK_PROJECT_DASHBOARD;
      }
      throw err;
    }
  }, [request]);

  return {
    stats,
    fetchProjectDashboard,
    loading,
    error,
  };
};

// Roles Management Hook
export const useRoles = () => {
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRoles(MOCK_ROLES);
    setLoading(false);
    return MOCK_ROLES;
  }, []);

  const createRole = useCallback(async (roleData) => {
    const newRole = { id: Date.now(), ...roleData, is_system: false };
    setRoles((prev) => [...prev, newRole]);
    return newRole;
  }, []);

  const updateRole = useCallback(async (id, roleData) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, ...roleData } : role)),
    );
    return { id, ...roleData };
  }, []);

  const deleteRole = useCallback(async (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  }, []);

  const applyRole = useCallback(async (id) => {
    console.log(`Applying role policy for ID: ${id}`);
    return { status: "success" };
  }, []);

  const auditRoles = useCallback(async () => {
    console.log("Auditing roles...");
    return { score: 94, findings: [] };
  }, []);

  const optimizeRoles = useCallback(async () => {
    console.log("Optimizing roles...");
    return { status: "optimized" };
  }, []);

  return {
    roles,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    applyRole,
    auditRoles,
    optimizeRoles,
    loading,
    error,
  };
};

// Project Onboarding Hook
export const useProjectOnboarding = () => {
  const [onboardings, setOnboardings] = useState([]);
  const { request, loading, error } = useApi();

  const fetchOnboardings = useCallback(
    async (page = 1) => {
      try {
        const respData = await request(() =>
          projectOnboardingService.getOnboardings(page),
        );
        const data = respData?.data || respData;
        const onboardingsData = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : Array.isArray(respData)
              ? respData
              : [];
        setOnboardings(onboardingsData);
        return onboardingsData;
      } catch (err) {
        if (err.response?.status === 404) {
          console.warn("⚠️ Onboarding API 404 - Falling back to empty data.");
          setOnboardings([]);
          return { results: [] };
        }
        throw err;
      }
    },
    [request],
  );

  const createOnboarding = useCallback(
    async (data) => {
      return await request(() =>
        projectOnboardingService.createOnboarding(data),
      );
    },
    [request],
  );

  const updateOnboarding = useCallback(
    async (id, data) => {
      return await request(() =>
        projectOnboardingService.updateOnboarding(id, data),
      );
    },
    [request],
  );

  const deleteOnboarding = useCallback(
    async (id) => {
      return await request(() => projectOnboardingService.deleteOnboarding(id));
    },
    [request],
  );

  return {
    onboardings,
    fetchOnboardings,
    createOnboarding,
    updateOnboarding,
    deleteOnboarding,
    loading,
    error,
  };
};

// Project Access Hook
export const useProjectAccess = () => {
  const { request, loading, error } = useApi();

  const grantAccess = useCallback(
    async (payload) => {
      return await request(() => projectOnboardingService.grantAccess(payload));
    },
    [request],
  );

  return {
    grantAccess,
    loading,
    error,
  };
};

// Active Alerts Hook
export const useActiveAlerts = () => {
  const [data, setData] = useState(MOCK_ACTIVE_ALERTS);
  const { request, loading, error } = useApi();

  const fetchActiveAlerts = useCallback(
    async (page = 1) => {
      try {
        const respData = await request(() =>
          adminDashboardService.getActiveAlerts(page),
        );
        const data = respData?.data || respData;
        setData(data);
        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          console.warn("⚠️ Active Alerts API 404 - Falling back to mock data.");
          setData(MOCK_ACTIVE_ALERTS);
          return MOCK_ACTIVE_ALERTS;
        }
        throw err;
      }
    },
    [request],
  );

  const dismissAlert = useCallback(async (id) => {
    // This is a placeholder for now as the endpoint isn't defined in the request
    console.log(`Dismissing alert ${id}`);
    setData((prev) => ({
      ...prev,
      results: prev.results.filter((a) => a.id !== id),
      count: prev.count - 1,
    }));
  }, []);

  return {
    alerts: Array.isArray(data.results) ? data.results : [],
    count: data.count || 0,
    fetchActiveAlerts,
    dismissAlert,
    loading,
    error,
  };
};
