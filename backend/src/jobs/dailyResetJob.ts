import { prisma } from '../lib/prisma.js';

export const runDailyResetJob = async () => {
  await prisma.userMissionProgress.deleteMany({ where: { claimedAt: { not: null } } });
};
