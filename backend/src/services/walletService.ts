import { walletRepository } from '../repositories/walletRepository.js';
import { AppError } from '../utils/appError.js';

export const walletService = {
  getHistory(userId: string) {
    return walletRepository.getHistory(userId);
  },
  addCoins(userId: string, amount: number, type: Parameters<typeof walletRepository.addCoins>[2], description?: string, metadata?: object) {
    if (amount <= 0) throw new AppError(400, 'Amount should be positive');
    return walletRepository.addCoins(userId, amount, type, description, metadata);
  },
  spendCoins(userId: string, amount: number, type: Parameters<typeof walletRepository.removeCoins>[2], description?: string, metadata?: object) {
    if (amount <= 0) throw new AppError(400, 'Amount should be positive');
    return walletRepository.removeCoins(userId, amount, type, description, metadata);
  },
};
