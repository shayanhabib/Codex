import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post/[id]" options={{ headerShown: true, title: 'Post' }} />
        <Stack.Screen name="profile/[id]" options={{ headerShown: true, title: 'Profile' }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: true, title: 'Edit Profile' }} />
        <Stack.Screen name="follows/[type]" options={{ headerShown: true, title: 'Connections' }} />
        <Stack.Screen name="notifications" options={{ headerShown: true, title: 'Notifications' }} />
        <Stack.Screen name="wallet" options={{ headerShown: true, title: 'Wallet' }} />
        <Stack.Screen name="daily-rewards" options={{ headerShown: true, title: "Daily Rewards" }} />
        <Stack.Screen name="missions" options={{ headerShown: true, title: "Missions" }} />
        <Stack.Screen name="achievements" options={{ headerShown: true, title: "Achievements" }} />
        <Stack.Screen name="invite-friends" options={{ headerShown: true, title: "Invite Friends" }} />
        <Stack.Screen name="daily-spin" options={{ headerShown: true, title: 'Daily Spin' }} />
        <Stack.Screen name="challenges" options={{ headerShown: true, title: 'Challenges' }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: true, title: 'Leaderboard' }} />
        <Stack.Screen name="shop" options={{ headerShown: true, title: 'Shop' }} />
        <Stack.Screen name="games/tap-rush" options={{ headerShown: true, title: 'Tap Rush' }} />
        <Stack.Screen name="games/memory-flip" options={{ headerShown: true, title: 'Memory Flip' }} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: 'Settings' }} />
        <Stack.Screen name="upgrade" options={{ headerShown: true, title: 'Upgrade' }} />
      </Stack>
    </>
  );
}
