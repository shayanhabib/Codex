import { prisma } from '../lib/prisma.js';

export const engagementRepository = {
  getOrCreateMissionProgress(userId: string, missionId: string, date: Date) {
    return prisma.userMissionProgress.upsert({
      where: { userId_missionId_date: { userId, missionId, date } },
      create: { userId, missionId, date },
      update: {},
    });
  },
  incrementMissionProgress(id: string, value: number) {
    return prisma.userMissionProgress.update({ where: { id }, data: { progressCount: { increment: value } } });
  },
  claimMissionProgress(id: string) {
    return prisma.userMissionProgress.update({ where: { id }, data: { claimedAt: new Date() } });
  },
  getMissionTemplates() {
    return prisma.missionTemplate.findMany({ where: { active: true } });
  },
  createGameResult(userId: string, gameType: 'TAP_RUSH' | 'MEMORY_FLIP', score: number, accuracy?: number) {
    return prisma.gameResult.create({ data: { userId, gameType, score, accuracy } });
  },
  bestGameScore(userId: string, gameType: 'TAP_RUSH' | 'MEMORY_FLIP') {
    return prisma.gameResult.findFirst({ where: { userId, gameType }, orderBy: { score: 'desc' } });
  },
  addSpinHistory(userId: string, rewardType: string, rewardData: object, paidSpin: boolean) {
    return prisma.spinHistory.create({ data: { userId, rewardType, rewardData, paidSpin } });
  },
  userLastSpin(userId: string) {
    return prisma.spinHistory.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },
};
