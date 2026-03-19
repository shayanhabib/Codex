import { COIN_RULES } from '@/constants/economy';

export const coinEngineService = {
  calcTapRushReward(score: number) {
    return Math.max(COIN_RULES.GAME_WIN_MIN, Math.min(COIN_RULES.GAME_WIN_MAX, Math.floor(score / 2)));
  },
  calcMemoryReward(seconds: number, accuracy: number) {
    const speedBonus = Math.max(5, 40 - Math.floor(seconds));
    const accuracyBonus = Math.floor(accuracy * 10);
    return Math.max(COIN_RULES.GAME_WIN_MIN, Math.min(COIN_RULES.GAME_WIN_MAX, speedBonus + accuracyBonus));
  },
  dailySpinReward() {
    return Math.floor(Math.random() * (COIN_RULES.SPIN_MAX - COIN_RULES.SPIN_MIN + 1)) + COIN_RULES.SPIN_MIN;
  },
};
