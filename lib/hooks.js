"use client";

import { useState, useEffect } from "react";
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

  const login = async (email, password) => {
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
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      setAdmin(null);
    }
  };

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

  const request = async (apiCall) => {
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
  };

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

// Users Management Hook
export const useUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const { request, loading, error } = useApi();

  const fetchUsers = async () => {
    try {
      const data = await request(() => adminDashboardService.getUsers());
      const usersData = data.results || data;
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
  };

  const createUser = async (userData) => {
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
  };

  const updateUser = async (id, userData) => {
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
  };

  const deleteUser = async (id) => {
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
  };

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

  const fetchProjects = async () => {
    try {
      const data = await request(() => adminDashboardService.getProjects());
      const projectsData = data.results || data;
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
  };

  const createProject = async (projectData) => {
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
  };

  const updateProject = async (id, projectData) => {
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
  };

  const deleteProject = async (id) => {
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
  };

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

  const fetchActiveProjectsGrid = async (params = initialParams) => {
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
  };

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

  const fetchProjectDashboard = async () => {
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
  };

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

  const fetchRoles = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRoles(MOCK_ROLES);
    setLoading(false);
    return MOCK_ROLES;
  };

  const createRole = async (roleData) => {
    const newRole = { id: Date.now(), ...roleData, is_system: false };
    setRoles((prev) => [...prev, newRole]);
    return newRole;
  };

  const updateRole = async (id, roleData) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, ...roleData } : role)),
    );
    return { id, ...roleData };
  };

  const deleteRole = async (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const applyRole = async (id) => {
    console.log(`Applying role policy for ID: ${id}`);
    return { status: "success" };
  };

  const auditRoles = async () => {
    console.log("Auditing roles...");
    return { score: 94, findings: [] };
  };

  const optimizeRoles = async () => {
    console.log("Optimizing roles...");
    return { status: "optimized" };
  };

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

  const fetchOnboardings = async (page = 1) => {
    try {
      const data = await request(() =>
        projectOnboardingService.getOnboardings(page),
      );
      setOnboardings(data.results || data);
      return data;
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("⚠️ Onboarding API 404 - Falling back to empty data.");
        setOnboardings([]);
        return { results: [] };
      }
      throw err;
    }
  };

  const createOnboarding = async (data) => {
    return await request(() => projectOnboardingService.createOnboarding(data));
  };

  const updateOnboarding = async (id, data) => {
    return await request(() =>
      projectOnboardingService.updateOnboarding(id, data),
    );
  };

  const deleteOnboarding = async (id) => {
    return await request(() => projectOnboardingService.deleteOnboarding(id));
  };

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

  const grantAccess = async (payload) => {
    return await request(() => projectOnboardingService.grantAccess(payload));
  };

  return {
    grantAccess,
    loading,
    error,
  };
};
