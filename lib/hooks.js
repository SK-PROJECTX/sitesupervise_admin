'use client';

import { useState, useEffect } from 'react';
import api from './api';

// Admin Auth Hook
export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_access_token');
        if (token) {
          const response = await api.get('/api/v1/auth/profile/');
          setAdmin(response.data);
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/v1/auth/login/', { email, password });
      localStorage.setItem('admin_access_token', response.data.access_token);
      localStorage.setItem('admin_refresh_token', response.data.refresh_token);
      setAdmin(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/v1/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
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

// Users Management Hook
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { request, loading, error } = useApi();

  const fetchUsers = async () => {
    const data = await request(() => api.get('/api/v1/admin/users/'));
    setUsers(data.results || data);
    return data;
  };

  const createUser = async (userData) => {
    const data = await request(() => api.post('/api/v1/admin/users/', userData));
    setUsers(prev => [...prev, data]);
    return data;
  };

  const updateUser = async (id, userData) => {
    const data = await request(() => api.put(`/api/v1/admin/users/${id}/`, userData));
    setUsers(prev => prev.map(user => user.id === id ? data : user));
    return data;
  };

  const deleteUser = async (id) => {
    await request(() => api.delete(`/api/v1/admin/users/${id}/`));
    setUsers(prev => prev.filter(user => user.id !== id));
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
  const [projects, setProjects] = useState([]);
  const { request, loading, error } = useApi();

  const fetchProjects = async () => {
    const data = await request(() => api.get('/api/v1/admin/projects/'));
    setProjects(data.results || data);
    return data;
  };

  const createProject = async (projectData) => {
    const data = await request(() => api.post('/api/v1/admin/projects/', projectData));
    setProjects(prev => [...prev, data]);
    return data;
  };

  const updateProject = async (id, projectData) => {
    const data = await request(() => api.put(`/api/v1/admin/projects/${id}/`, projectData));
    setProjects(prev => prev.map(project => project.id === id ? data : project));
    return data;
  };

  const deleteProject = async (id) => {
    await request(() => api.delete(`/api/v1/admin/projects/${id}/`));
    setProjects(prev => prev.filter(project => project.id !== id));
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