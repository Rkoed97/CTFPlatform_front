import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

interface AuthResponse {
  access: string;
  refresh?: string;
  [key: string]: any;
}

interface ProfileData {
  [key: string]: any;
}

interface TeamData {
  [key: string]: any;
}

// Auth services
export const login = (username: string, password: string): Promise<AuthResponse> => {
  return axios.post<AuthResponse>(`${API_URL}token/`, { username, password })
    .then(response => {
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
      }
      return response.data;
    });
};

export const register = (username: string, email: string, password: string): Promise<AxiosResponse> => {
  return axios.post(`${API_URL}register/`, { username, email, password });
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

// Profile services
export const getProfile = (): Promise<AxiosResponse> => api.get('profile/');
export const updateProfile = (profileData: ProfileData): Promise<AxiosResponse> => api.put('profile/edit/', profileData);

// Team services
export const getTeams = (): Promise<AxiosResponse> => api.get('teams/');
export const getTeam = (id: number | string): Promise<AxiosResponse> => api.get(`teams/${id}/`);
export const createTeam = (teamData: TeamData): Promise<AxiosResponse> => api.post('teams/', teamData);
export const joinTeam = (inviteCode: string): Promise<AxiosResponse> => api.post('team/join/', { invite_code: inviteCode });

// Challenge services
export const getChallenges = (): Promise<AxiosResponse> => api.get('challenges/');
export const submitFlag = (challengeId: number | string, flag: string): Promise<AxiosResponse> => 
  api.post(`challenges/${challengeId}/submit/`, { flag });

// Leaderboard service
export const getLeaderboard = (): Promise<AxiosResponse> => api.get('leaderboard/');

export default api;