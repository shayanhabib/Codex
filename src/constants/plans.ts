import { SubscriptionPlan } from '@/models/types';

export const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    title: 'Free',
    monthlyPrice: 0,
    features: ['Posting and social actions', 'Daily spin', 'Mini games', 'Basic profile customization'],
  },
  {
    id: 'pro',
    title: 'Pro Loop',
    monthlyPrice: 9,
    features: ['Ad-free experience', 'Double daily rewards', 'Premium badges and themes', 'Boosted visibility & analytics'],
  },
];
