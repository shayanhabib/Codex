import { Share } from 'react-native';

export const shareService = {
  sharePost: async (postId: string) => {
    await Share.share({
      message: `Check out this LoopUp post: https://loopup.app/post/${postId}`,
    });
  },
  shareText: async (message: string) => {
    await Share.share({ message });
  },
};
