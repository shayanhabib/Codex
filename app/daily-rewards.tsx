import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWalletStore } from '@/store/walletStore';
import { useSocialStore } from '@/store/socialStore';
import { rewardEngineService } from '@/services/rewardEngineService';
import { colors, spacing } from '@/constants/theme';
import { useAchievementsStore } from '@/store/achievementsStore';

export default function DailyRewardsScreen() {
  const me = useCurrentUser();
  const dailyRewards = useWalletStore((s) => s.dailyRewards);
  const currentStreak = useWalletStore((s) => s.currentStreak);
  const claimDailyStreakReward = useWalletStore((s) => s.claimDailyStreakReward);
  const rewardCoins = useSocialStore((s) => s.rewardCoins);
  const unlockBadge = useAchievementsStore((s) => s.unlockBadge);

  if (!me) return null;

  const claimToday = () => {
    const reward = rewardEngineService.dailyStreakReward(currentStreak);
    const tx = claimDailyStreakReward(me.id, reward);
    if (!tx) return Alert.alert('Already claimed', 'Come back tomorrow for the next streak reward.');
    rewardCoins(me.id, reward, tx.source);
    if (currentStreak >= 3) unlockBadge('a3');
    Alert.alert('Reward claimed', `+${reward} coins`);
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Daily Rewards</Text>
      <Text style={styles.meta}>Current streak: {currentStreak} days</Text>
      <AppButton label="Claim Today" onPress={claimToday} />
      <FlatList
        data={dailyRewards}
        keyExtractor={(item) => item.day.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <AppCard><Text style={styles.item}>Day {item.day}</Text><Text style={styles.meta}>+{item.coins} coins</Text></AppCard>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, meta: { color: colors.textMuted }, item: { color: colors.text, fontWeight: '700' }, list: { gap: spacing.sm, paddingVertical: spacing.md } });
