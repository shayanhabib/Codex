import { shopRepository } from '../repositories/shopRepository.js';
import { walletService } from './walletService.js';
import { AppError } from '../utils/appError.js';
import { prisma } from '../lib/prisma.js';

export const shopService = {
  listItems() {
    return shopRepository.listActiveItems();
  },
  async purchase(userId: string, code: string) {
    const item = await shopRepository.getItem(code);
    if (!item || !item.active) throw new AppError(404, 'Item not found');
    await walletService.spendCoins(userId, item.priceCoins, 'SHOP_PURCHASE', `Shop purchase: ${item.title}`);
    return shopRepository.upsertInventory(userId, item.id);
  },
  async boostPost(userId: string, postId: string, durationHours = 24) {
    await walletService.spendCoins(userId, 50, 'BOOST_PURCHASE', 'Post boost');
    const boostedUntil = new Date(Date.now() + durationHours * 3600000);
    await prisma.post.updateMany({ where: { id: postId, userId }, data: { boostedUntil } });
    return { postId, boostedUntil };
  },
  getInventory(userId: string) {
    return shopRepository.getInventory(userId);
  },
};
