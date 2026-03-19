import { WalletTransactionType } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export const walletRepository = {
  async addCoins(userId: string, amount: number, type: WalletTransactionType, description?: string, metadata?: object) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.update({ where: { id: userId }, data: { coinBalance: { increment: amount } } });
      const transaction = await tx.walletTransaction.create({ data: { userId, amount, type, description, metadata } });
      return { user, transaction };
    });
  },
  async removeCoins(userId: string, amount: number, type: WalletTransactionType, description?: string, metadata?: object) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUniqueOrThrow({ where: { id: userId } });
      if (existing.coinBalance < amount) throw new Error('Insufficient balance');
      const user = await tx.user.update({ where: { id: userId }, data: { coinBalance: { decrement: amount } } });
      const transaction = await tx.walletTransaction.create({ data: { userId, amount: -amount, type, description, metadata } });
      return { user, transaction };
    });
  },
  getHistory(userId: string) {
    return prisma.walletTransaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },
};
