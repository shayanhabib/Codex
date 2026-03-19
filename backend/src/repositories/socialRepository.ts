import { prisma } from '../lib/prisma.js';

export const socialRepository = {
  createPost(userId: string, data: { type: 'TEXT' | 'IMAGE' | 'VOICE'; text?: string; mediaUrl?: string; audioUrl?: string; caption?: string; visibility: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE' }) {
    return prisma.post.create({ data: { userId, ...data } });
  },
  getFeed(limit = 30) {
    return prisma.post.findMany({
      where: { moderation: 'ACTIVE', visibility: 'PUBLIC' },
      include: { user: true, _count: { select: { comments: true, likes: true } } },
      orderBy: [{ boostedUntil: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });
  },
  getPostById(postId: string) {
    return prisma.post.findUnique({ where: { id: postId }, include: { user: true, comments: true, likes: true } });
  },
  updateOwnPost(postId: string, userId: string, data: { caption?: string; text?: string }) {
    return prisma.post.updateMany({ where: { id: postId, userId }, data });
  },
  softDeletePost(postId: string, userId: string) {
    return prisma.post.updateMany({ where: { id: postId, userId }, data: { moderation: 'DELETED' } });
  },
  toggleLike(userId: string, postId: string) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.like.findUnique({ where: { userId_postId: { userId, postId } } });
      if (existing) {
        await tx.like.delete({ where: { userId_postId: { userId, postId } } });
        return { liked: false };
      }
      await tx.like.create({ data: { userId, postId } });
      return { liked: true };
    });
  },
  addComment(userId: string, postId: string, content: string) {
    return prisma.comment.create({ data: { userId, postId, content } });
  },
  deleteOwnComment(commentId: string, userId: string) {
    return prisma.comment.updateMany({ where: { id: commentId, userId }, data: { moderation: 'DELETED' } });
  },
  toggleFollow(followerId: string, followingId: string) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.follow.findUnique({ where: { followerId_followingId: { followerId, followingId } } });
      if (existing) {
        await tx.follow.delete({ where: { followerId_followingId: { followerId, followingId } } });
        return { following: false };
      }
      await tx.follow.create({ data: { followerId, followingId } });
      return { following: true };
    });
  },
  getFollowers(userId: string) {
    return prisma.follow.findMany({ where: { followingId: userId }, include: { follower: true } });
  },
  getFollowing(userId: string) {
    return prisma.follow.findMany({ where: { followerId: userId }, include: { following: true } });
  },
};
