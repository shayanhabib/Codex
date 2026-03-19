import { prisma } from '../lib/prisma.js';

export const adminService = {
  users() {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  },
  setUserSuspended(userId: string, suspended: boolean) {
    return prisma.user.update({ where: { id: userId }, data: { suspended } });
  },
  reports() {
    return prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
  },
  moderationStats() {
    return prisma.$transaction([
      prisma.purchase.aggregate({ _sum: { amountCents: true }, where: { status: 'COMPLETED' } }),
      prisma.walletTransaction.count({ where: { type: 'REWARDED_AD_BONUS' } }),
      prisma.subscription.count({ where: { active: true } }),
    ]);
  },
};
