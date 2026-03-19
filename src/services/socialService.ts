import { seedComments, seedPosts, seedUsers } from '@/data/seed';

export const socialService = {
  async getInitialSocialData() {
    return { users: seedUsers, posts: seedPosts, comments: seedComments };
  },
};
