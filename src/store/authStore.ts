import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/models/types';

interface AuthState {
  user: User | null;
  hasOnboarded: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  completeOnboarding: () => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasOnboarded: false,
      loading: false,
      setUser: (user) => set({ user }),
      completeOnboarding: () => set({ hasOnboarded: true }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'loopup-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, hasOnboarded: state.hasOnboarded }),
    },
  ),
);
