import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    type: z.enum(['TEXT', 'IMAGE', 'VOICE']),
    text: z.string().optional(),
    mediaUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    caption: z.string().max(280).optional(),
    visibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).default('PUBLIC'),
  }),
});

export const commentSchema = z.object({
  body: z.object({ content: z.string().min(1).max(400) }),
  params: z.object({ postId: z.string().cuid() }),
});
