import { prisma } from '../lib/prisma.js';
import { walletService } from './walletService.js';
import { AppError } from '../utils/appError.js';

export const premiumService = {
  plans() {
    return prisma.premiumPlan.findMany();
  },
  async subscribe(userId: string, planCode: string) {
    const plan = await prisma.premiumPlan.findUnique({ where: { code: planCode } });
    if (!plan) throw new AppError(404, 'Plan not found');
    await walletService.spendCoins(userId, Math.floor(plan.priceCents / 10), 'PREMIUM_PURCHASE', `Premium ${plan.title}`);
    const startsAt = new Date();
    const endsAt = new Date(Date.now() + plan.durationDays * 86400000);
    await prisma.subscription.create({ data: { userId, planId: plan.id, startsAt, endsAt, active: true, provider: 'mock' } });
    await prisma.user.update({ where: { id: userId }, data: { premiumStatus: true, premiumEndsAt: endsAt } });
    return { startsAt, endsAt };
  },
};
