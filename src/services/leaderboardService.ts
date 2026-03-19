import { LeaderboardEntry, User } from '@/models/types';

export const leaderboardService = {
  build(users: User[]): LeaderboardEntry[] {
    return [...users]
      .sort((a, b) => b.coinBalance - a.coinBalance || b.engagementPoints - a.engagementPoints)
      .map((u, index) => ({ userId: u.id, rank: index + 1, coins: u.coinBalance, gameScore: u.engagementPoints, engagementPoints: u.engagementPoints }));
  },
};
