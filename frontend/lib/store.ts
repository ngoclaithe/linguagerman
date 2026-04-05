import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN' | 'TEACHER';
  avatar?: string;
  bio?: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      login: (user) => set({ user }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);

interface DashboardStore {
  selectedCourse: string | null;
  setSelectedCourse: (courseId: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedCourse: null,
  setSelectedCourse: (courseId) => set({ selectedCourse: courseId }),
}));
