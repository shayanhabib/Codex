export const COIN_RULES = {
  DAILY_LOGIN: 10,
  CREATE_POST: 5,
  RECEIVE_LIKE: 2,
  GAME_WIN_MIN: 10,
  GAME_WIN_MAX: 50,
  REFERRAL_BONUS: 30,
  AD_REWARD: 20,
  SPIN_MIN: 5,
  SPIN_MAX: 100,
  BOOST_POST_COST: 50,
  PREMIUM_THEME_COST: 200,
} as const;

export const COIN_PACKS = [
  { id: 'cp1', coins: 100, price: '$0.99' },
  { id: 'cp2', coins: 500, price: '$3.99' },
  { id: 'cp3', coins: 1200, price: '$7.99' },
] as const;
