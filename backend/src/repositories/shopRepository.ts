import { prisma } from '../lib/prisma.js';

export const shopRepository = {
  listActiveItems() {
    return prisma.shopItem.findMany({ where: { active: true } });
  },
  getItem(code: string) {
    return prisma.shopItem.findUnique({ where: { code } });
  },
  upsertInventory(userId: string, shopItemId: string) {
    return prisma.userInventoryItem.upsert({
      where: { userId_shopItemId: { userId, shopItemId } },
      create: { userId, shopItemId, quantity: 1 },
      update: { quantity: { increment: 1 } },
    });
  },
  getInventory(userId: string) {
    return prisma.userInventoryItem.findMany({ where: { userId }, include: { shopItem: true } });
  },
  setEquipped(userId: string, shopItemId: string) {
    return prisma.userInventoryItem.updateMany({ where: { userId, shopItemId }, data: { equipped: true } });
  },
};
