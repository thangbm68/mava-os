import { create } from 'zustand';
import api from '../api/client';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.data.token);
    set({ user: data.data.user, token: data.data.token, isLoading: false });
    return data.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.data });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    }
  },
}));

export default useAuthStore;
