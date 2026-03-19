import { seedComments, seedPosts, seedUsers } from '@/data/seed';
import { Comment, User, VoicePost } from '@/models/types';

export const mockPostService = {
  async fetchFeed(): Promise<VoicePost[]> {
    return seedPosts;
  },
  async fetchUsers(): Promise<User[]> {
    return seedUsers;
  },
  async fetchComments(): Promise<Comment[]> {
    return seedComments;
  },
};
