// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Set up axios instance with auth token
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const workerApi = {
  // Job Requests
  getJobRequests: () => api.get('/workers/get-job-requests'),
  getJobDetails: (id: string) => api.get(`/workers/${id}`),
  acceptJob: (id: string) => api.put(`/workers/${id}/accept`),
  rejectJob: (id: string) => api.put(`/workers/${id}/reject`),
  
  // Earnings
  getEarningsByMonth: (month: string) => {
    if (month === 'all') {
      return api.get('/workers/earnings/get-all');
    }
    return api.get(`/workers/earnings/${month}`);
  },
  getJobsForMonth: (month: string) => api.get(`/workers/earnings/${month}/jobs`),
  
  // Availability
  updateAvailability: (available: boolean) => 
    api.patch('/workers/availability', { available }),
};