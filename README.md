# LoopUp (Expo SDK 54)

LoopUp is a production-style social + gamified React Native app built with Expo Router, TypeScript, Zustand, and AsyncStorage.

## Updated Folder Structure

```text
.
├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── explore.tsx
│   │   ├── create.tsx
│   │   ├── games.tsx
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   ├── games/
│   │   ├── tap-rush.tsx
│   │   └── memory-flip.tsx
│   ├── wallet.tsx
│   ├── shop.tsx
│   ├── daily-spin.tsx
│   ├── daily-rewards.tsx
│   ├── missions.tsx
│   ├── achievements.tsx
│   ├── invite-friends.tsx
│   ├── leaderboard.tsx
│   ├── settings.tsx
│   ├── upgrade.tsx
│   └── ...social detail screens
├── src
│   ├── components/
│   ├── constants/
│   │   ├── economy.ts
│   │   ├── plans.ts
│   │   └── theme.ts
│   ├── data/
│   │   └── seed.ts
│   ├── models/
│   │   └── types.ts
│   ├── services/
│   │   ├── rewardEngineService.ts
│   │   ├── monetizationService.ts
│   │   ├── referralService.ts
│   │   ├── coinEngineService.ts
│   │   ├── walletService.ts
│   │   └── ...social services
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── socialStore.ts
│   │   ├── walletStore.ts
│   │   ├── missionsStore.ts
│   │   ├── achievementsStore.ts
│   │   ├── subscriptionStore.ts
│   │   └── settingsStore.ts
│   └── utils/
├── app.json
├── package.json
├── babel.config.js
├── metro.config.js
└── tsconfig.json
```

## Dependencies (Expo 54)

- `expo ~54.0.0`
- `react 19.1.0`
- `react-native 0.81.0`
- `expo-router ~6.0.23`
- `expo-av ~16.0.8`
- `expo-haptics ~15.0.8`
- `expo-notifications ~0.32.16`
- `expo-linear-gradient ~15.0.8`
- `react-native-gesture-handler ~2.28.0`
- `react-native-reanimated ~4.1.1`
- `@react-native-async-storage/async-storage 2.2.0`
- `zustand ^5.0.8`

## Key Retention + Monetization Features

- Daily streak rewards (claim once/day, streak progression).
- Daily missions with progress + claim.
- Lucky spin with daily free spin + extra spin tickets.
- Referral/invite flow with referral bonus logic.
- Wallet with transaction history + coin packs.
- Shop with purchasable items and unlock states.
- Achievements / badges screen.
- Rewarded ad mock hook for bonus coins.
- Premium upgrade flow + premium badge UI.
- Post boost spend logic and extra game attempt purchase.

## Run Instructions

```bash
npm install
npx expo install --fix
npm run start
```

Optional:

```bash
npm run typecheck
```

> If dependency installation is blocked in your environment, run the same commands in a network-enabled environment.
