import { prisma } from '../lib/prisma.js';
import { walletService } from './walletService.js';
import { AppError } from '../utils/appError.js';

const dayStart = new Date(new Date().setHours(0, 0, 0, 0));

export const missionService = {
  async listForUser(userId: string) {
    const templates = await prisma.missionTemplate.findMany({ where: { active: true } });
    const progress = await Promise.all(
      templates.map((m) =>
        prisma.userMissionProgress.upsert({
          where: { userId_missionId_date: { userId, missionId: m.id, date: dayStart } },
          create: { userId, missionId: m.id, date: dayStart },
          update: {},
        }),
      ),
    );
    return templates.map((m, i) => ({ mission: m, progress: progress[i] }));
  },
  async claim(userId: string, missionProgressId: string) {
    const progress = await prisma.userMissionProgress.findUnique({ where: { id: missionProgressId }, include: { mission: true } });
    if (!progress || progress.userId !== userId) throw new AppError(404, 'Mission progress not found');
    if (progress.claimedAt) throw new AppError(400, 'Already claimed');
    if (progress.progressCount < progress.mission.targetCount) throw new AppError(400, 'Mission not completed');

    await prisma.userMissionProgress.update({ where: { id: missionProgressId }, data: { claimedAt: new Date() } });
    await walletService.addCoins(userId, progress.mission.rewardCoins, 'CHALLENGE_REWARD', `Mission: ${progress.mission.title}`);
    return { rewardCoins: progress.mission.rewardCoins };
  },
};
