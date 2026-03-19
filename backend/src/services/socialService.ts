import { socialRepository } from '../repositories/socialRepository.js';
import { walletRepository } from '../repositories/walletRepository.js';

export const socialService = {
  createPost(userId: string, body: { type: 'TEXT' | 'IMAGE' | 'VOICE'; text?: string; mediaUrl?: string; audioUrl?: string; caption?: string; visibility: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE' }) {
    return socialRepository.createPost(userId, body);
  },
  getFeed(limit?: number) {
    return socialRepository.getFeed(limit);
  },
  getPost(postId: string) {
    return socialRepository.getPostById(postId);
  },
  editPost(postId: string, userId: string, body: { caption?: string; text?: string }) {
    return socialRepository.updateOwnPost(postId, userId, body);
  },
  removePost(postId: string, userId: string) {
    return socialRepository.softDeletePost(postId, userId);
  },
  async toggleLike(userId: string, postId: string) {
    const result = await socialRepository.toggleLike(userId, postId);
    if (result.liked) {
      const post = await socialRepository.getPostById(postId);
      if (post && post.userId !== userId) {
        await walletRepository.addCoins(post.userId, 2, 'LIKE_REWARD', 'Like reward');
      }
    }
    return result;
  },
  addComment(userId: string, postId: string, content: string) {
    return socialRepository.addComment(userId, postId, content);
  },
  deleteComment(commentId: string, userId: string) {
    return socialRepository.deleteOwnComment(commentId, userId);
  },
  toggleFollow(followerId: string, followingId: string) {
    return socialRepository.toggleFollow(followerId, followingId);
  },
  getFollowers(userId: string) {
    return socialRepository.getFollowers(userId);
  },
  getFollowing(userId: string) {
    return socialRepository.getFollowing(userId);
  },
};
