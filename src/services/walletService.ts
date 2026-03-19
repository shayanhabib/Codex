import { WalletTransaction } from '@/models/types';

export const walletService = {
  createEarn(userId: string, amount: number, source: string): WalletTransaction {
    return { id: `wt_${Date.now()}`, userId, amount, type: 'earn', source, createdAt: new Date().toISOString() };
  },
  createSpend(userId: string, amount: number, source: string): WalletTransaction {
    return { id: `wt_${Date.now()}`, userId, amount: -Math.abs(amount), type: 'spend', source, createdAt: new Date().toISOString() };
  },
};
