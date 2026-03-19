import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { seedMissions } from '@/data/seed';
import { Mission } from '@/models/types';

interface MissionsState {
  missions: Mission[];
  incrementMission: (missionId: string, value?: number) => void;
  claimMission: (missionId: string) => Mission | null;
  resetDailyMissions: () => void;
}

export const useMissionsStore = create<MissionsState>()(
  persist(
    (set, get) => ({
      missions: seedMissions,
      incrementMission: (missionId, value = 1) => {
        set({
          missions: get().missions.map((m) => {
            if (m.id !== missionId || m.claimed) return m;
            const progress = Math.min(m.goal, m.progress + value);
            return { ...m, progress, completed: progress >= m.goal };
          }),
        });
      },
      claimMission: (missionId) => {
        const mission = get().missions.find((m) => m.id === missionId);
        if (!mission || !mission.completed || mission.claimed) return null;
        set({ missions: get().missions.map((m) => (m.id === missionId ? { ...m, claimed: true } : m)) });
        return mission;
      },
      resetDailyMissions: () => set({ missions: seedMissions.map((m) => ({ ...m })) }),
    }),
    { name: 'loopup-missions', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
