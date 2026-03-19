import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { dailyRewardsSeed, seedTransactions } from '@/data/seed';
import { DailyReward, WalletTransaction } from '@/models/types';

interface WalletState {
  transactions: WalletTransaction[];
  dailyRewards: DailyReward[];
  currentStreak: number;
  lastDailyClaimAt?: string;
  extraGameAttempts: number;
  gameAttemptsRemaining: number;
  spinTickets: number;
  addTransaction: (tx: WalletTransaction) => void;
  claimDailyStreakReward: (userId: string, amount: number) => WalletTransaction | null;
  purchaseExtraGameAttempt: (userId: string) => WalletTransaction;
  useExtraGameAttempt: () => boolean;
  consumeGameAttempt: () => boolean;
  addSpinTicket: (count?: number) => void;
  consumeSpinTicket: () => boolean;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      transactions: seedTransactions,
      dailyRewards: dailyRewardsSeed,
      currentStreak: 1,
      extraGameAttempts: 0,
      gameAttemptsRemaining: 3,
      spinTickets: 0,
      addTransaction: (tx) => set({ transactions: [tx, ...get().transactions] }),
      claimDailyStreakReward: (userId, amount) => {
        const last = get().lastDailyClaimAt;
        const today = new Date().toDateString();
        if (last && new Date(last).toDateString() === today) return null;
        const tx: WalletTransaction = {
          id: `wt_${Date.now()}`,
          userId,
          amount,
          type: 'earn',
          source: `Daily streak day ${get().currentStreak}`,
          createdAt: new Date().toISOString(),
        };
        const nextStreak = get().currentStreak >= 7 ? 1 : get().currentStreak + 1;
        set({ transactions: [tx, ...get().transactions], lastDailyClaimAt: new Date().toISOString(), currentStreak: nextStreak });
        return tx;
      },
      purchaseExtraGameAttempt: (userId) => {
        const tx: WalletTransaction = {
          id: `wt_${Date.now()}`,
          userId,
          amount: -30,
          type: 'spend',
          source: 'Extra game attempt',
          createdAt: new Date().toISOString(),
        };
        set({ transactions: [tx, ...get().transactions], extraGameAttempts: get().extraGameAttempts + 1 });
        return tx;
      },
      useExtraGameAttempt: () => {
        if (get().extraGameAttempts <= 0) return false;
        set({ extraGameAttempts: get().extraGameAttempts - 1 });
        return true;
      },
      consumeGameAttempt: () => {
        if (get().gameAttemptsRemaining > 0) {
          set({ gameAttemptsRemaining: get().gameAttemptsRemaining - 1 });
          return true;
        }
        if (get().extraGameAttempts > 0) {
          set({ extraGameAttempts: get().extraGameAttempts - 1 });
          return true;
        }
        return false;
      },
      addSpinTicket: (count = 1) => set({ spinTickets: get().spinTickets + count }),
      consumeSpinTicket: () => {
        if (get().spinTickets <= 0) return false;
        set({ spinTickets: get().spinTickets - 1 });
        return true;
      },
    }),
    { name: 'loopup-wallet', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
