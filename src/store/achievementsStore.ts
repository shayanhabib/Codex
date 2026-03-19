import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { seedBadges } from '@/data/seed';
import { AchievementBadge } from '@/models/types';

interface AchievementsState {
  badges: AchievementBadge[];
  unlockBadge: (badgeId: string) => void;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      badges: seedBadges,
      unlockBadge: (badgeId) => {
        set({ badges: get().badges.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b)) });
      },
    }),
    { name: 'loopup-achievements', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
