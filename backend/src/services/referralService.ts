import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/appError.js';
import { walletService } from './walletService.js';

export const referralService = {
  async applyCode(userId: string, code: string) {
    const invitee = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (invitee.referredById) throw new AppError(400, 'Referral already used');
    const inviter = await prisma.user.findFirst({ where: { referralCode: code } });
    if (!inviter || inviter.id === userId) throw new AppError(400, 'Invalid referral code');

    await prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: userId }, data: { referredById: inviter.id } });
      await tx.referral.create({ data: { inviterId: inviter.id, inviteeId: userId, code, rewardedAt: new Date() } });
    });

    await walletService.addCoins(inviter.id, 30, 'REFERRAL_BONUS', 'Invited user bonus');
    await walletService.addCoins(userId, 30, 'REFERRAL_BONUS', 'Referral welcome bonus');

    return { inviterId: inviter.id, inviteeId: userId };
  },
};
