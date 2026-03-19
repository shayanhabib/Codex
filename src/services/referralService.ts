export const referralService = {
  buildInviteCode(userId: string) {
    return `LOOP-${userId.slice(0, 4).toUpperCase()}-${new Date().getFullYear()}`;
  },
  buildInviteMessage(code: string) {
    return `Join me on LoopUp and use invite code ${code} for bonus coins.`;
  },
};
