import { prisma } from '../lib/prisma.js';

export const reportService = {
  create(userId: string, input: { type: 'POST' | 'COMMENT' | 'USER'; postId?: string; commentId?: string; reportedUserId?: string; reason: string }) {
    return prisma.report.create({ data: { reporterId: userId, ...input } });
  },
};
