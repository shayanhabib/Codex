import { prisma } from '../lib/prisma.js';
import { engagementRepository } from '../repositories/engagementRepository.js';
import { walletService } from './walletService.js';
import { AppError } from '../utils/appError.js';

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const gamificationService = {
  async claimDailyReward(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const today = startOfDay();
    if (user.lastLoginClaimAt && startOfDay(user.lastLoginClaimAt).getTime() === today.getTime()) throw new AppError(400, 'Already claimed today');
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const streak = user.lastLoginClaimAt && startOfDay(user.lastLoginClaimAt).getTime() === yesterday.getTime() ? user.streakCount + 1 : 1;
    const reward = 10 + Math.min(20, streak * 2);
    await prisma.user.update({ where: { id: userId }, data: { streakCount: streak, lastLoginClaimAt: new Date() } });
    await walletService.addCoins(userId, reward, 'DAILY_LOGIN_REWARD', 'Daily streak reward');
    await prisma.dailyRewardClaim.create({ data: { userId, day: today, reward } });
    return { streak, reward };
  },
  async spin(userId: string, paidSpin = false) {
    const lastSpin = await engagementRepository.userLastSpin(userId);
    const today = startOfDay();
    if (!paidSpin && lastSpin && startOfDay(lastSpin.createdAt).getTime() === today.getTime()) throw new AppError(400, 'Free spin already used today');
    if (paidSpin) await walletService.spendCoins(userId, 50, 'SHOP_PURCHASE', 'Paid lucky spin');

    const roll = Math.random();
    let rewardType = 'coins';
    let rewardValue = 15;
    if (roll < 0.6) rewardValue = 20;
    else if (roll < 0.8) rewardValue = 50;
    else if (roll < 0.9) rewardType = 'badge';
    else rewardType = 'extra_game_attempt';

    if (rewardType === 'coins') {
      await walletService.addCoins(userId, rewardValue, 'DAILY_SPIN_REWARD', 'Lucky spin reward');
    }

    await engagementRepository.addSpinHistory(userId, rewardType, { rewardValue }, paidSpin);
    return { rewardType, rewardValue };
  },
  async submitGameResult(userId: string, gameType: 'TAP_RUSH' | 'MEMORY_FLIP', score: number, accuracy?: number) {
    if (gameType === 'TAP_RUSH' && score > 2000) throw new AppError(422, 'Suspicious score rejected');
    if (gameType === 'MEMORY_FLIP' && score > 10000) throw new AppError(422, 'Suspicious score rejected');
    const reward = Math.max(10, Math.min(50, Math.floor(score / 25)));
    const result = await engagementRepository.createGameResult(userId, gameType, score, accuracy);
    await walletService.addCoins(userId, reward, 'GAME_REWARD', `${gameType} reward`);
    return { result, reward };
  },
  async leaderboard(period: 'daily' | 'weekly' | 'all') {
    const now = new Date();
    const from = period === 'daily' ? new Date(now.getTime() - 86400000) : period === 'weekly' ? new Date(now.getTime() - 7 * 86400000) : new Date(0);
    const rows = await prisma.user.findMany({
      include: { gameResults: { where: { createdAt: { gte: from } }, select: { score: true } }, posts: true, comments: true, likes: true },
    });
    return rows
      .map((u) => ({
        userId: u.id,
        username: u.username,
        coins: u.coinBalance,
        engagementPoints: u.posts.length * 5 + u.comments.length * 2 + u.likes.length,
        gameScore: u.gameResults.reduce((a, b) => a + b.score, 0),
      }))
      .sort((a, b) => b.coins + b.engagementPoints + b.gameScore - (a.coins + a.engagementPoints + a.gameScore));
  },
};
