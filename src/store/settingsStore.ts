import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppSettings } from '@/models/types';

interface SettingsState {
  settings: AppSettings;
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        pushNotifications: true,
        themeMode: 'dark',
        privateAccount: false,
        adPersonalization: true,
      },
      setSetting: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
    }),
    {
      name: 'loopup-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
