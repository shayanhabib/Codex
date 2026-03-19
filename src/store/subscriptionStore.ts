import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SubscriptionState {
  planId: 'free' | 'pro';
  startedAt?: string;
  premiumBadgeEnabled: boolean;
  setPlanId: (planId: 'free' | 'pro') => void;
  togglePremiumBadge: (enabled: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      planId: 'free',
      premiumBadgeEnabled: false,
      setPlanId: (planId) => set({ planId, startedAt: new Date().toISOString(), premiumBadgeEnabled: planId === 'pro' }),
      togglePremiumBadge: (enabled) => set({ premiumBadgeEnabled: enabled }),
    }),
    {
      name: 'loopup-subscription',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
