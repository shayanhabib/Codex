import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/appError.js';
import { walletService } from './walletService.js';

export const purchaseService = {
  async buyCoinPack(userId: string, coinPackCode: string) {
    const pack = await prisma.coinPack.findUnique({ where: { code: coinPackCode } });
    if (!pack || !pack.active) throw new AppError(404, 'Coin pack not found');

    const purchase = await prisma.purchase.create({
      data: {
        userId,
        coinPackId: pack.id,
        amountCents: pack.priceCents,
        status: 'COMPLETED',
        provider: 'mock',
      },
    });

    await walletService.addCoins(userId, pack.coins, 'COIN_PACK_PURCHASE', `Coin pack ${pack.code}`);
    return purchase;
  },
};
