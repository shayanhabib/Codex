export const monetizationService = {
  async showRewardedAd(): Promise<{ rewarded: boolean; coins: number }> {
    return { rewarded: true, coins: 20 };
  },
  async maybeShowInterstitial(trigger: 'after-game' | 'between-games' | 'shop-open') {
    return { shown: trigger !== 'shop-open' };
  },
  async purchaseCoinPack(packId: string) {
    return { success: true, packId };
  },
  async startPremiumCheckout() {
    return { success: true, planId: 'pro' as const };
  },
};
