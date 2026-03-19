import { COIN_RULES } from '@/constants/economy';

export const rewardEngineService = {
  dailyStreakReward(streak: number) {
    return COIN_RULES.DAILY_LOGIN + Math.min(20, streak * 2);
  },
  referralReward() {
    return COIN_RULES.REFERRAL_BONUS;
  },
  likeReward() {
    return COIN_RULES.RECEIVE_LIKE;
  },
};
