import { z } from 'zod';

export const submitGameSchema = z.object({
  body: z.object({
    gameType: z.enum(['TAP_RUSH', 'MEMORY_FLIP']),
    score: z.number().int().nonnegative(),
    accuracy: z.number().min(0).max(1).optional(),
  }),
});
