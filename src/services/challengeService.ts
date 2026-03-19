import { Challenge } from '@/models/types';

export const challengeService = {
  increment(challenge: Challenge, by = 1): Challenge {
    const next = Math.min(challenge.goal, challenge.progress + by);
    return { ...challenge, progress: next, completed: next >= challenge.goal };
  },
};
