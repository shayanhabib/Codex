import { GameScore } from '@/models/types';

export const gameService = {
  createScore(userId: string, game: GameScore['game'], score: number, accuracy?: number): GameScore {
    return { id: `gs_${Date.now()}`, userId, game, score, accuracy, createdAt: new Date().toISOString() };
  },
};
