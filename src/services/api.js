import axios from 'axios';

const API_URL = '/api/';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const login = (username, password) => {
  return axios.post(`${API_URL}token/`, { username, password })
    .then(response => {
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
      }
      return response.data;
    });
};

export const register = (username, email, password) => {
  return axios.post(`${API_URL}register/`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Profile services
export const getProfile = () => api.get('profile/');
export const updateProfile = (profileData) => api.put('profile/edit/', profileData);

// Team services
export const getTeams = () => api.get('teams/');
export const getTeam = (id) => api.get(`teams/${id}/`);
export const createTeam = (teamData) => api.post('teams/', teamData);
export const joinTeam = (inviteCode) => api.post('team/join/', { invite_code: inviteCode });

// Challenge services
export const getChallenges = () => api.get('challenges/');
export const submitFlag = (challengeId, flag) => api.post(`challenges/${challengeId}/submit/`, { flag });

// Leaderboard service
export const getLeaderboard = () => api.get('leaderboard/');

export default api;