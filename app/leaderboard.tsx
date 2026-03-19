import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FilterChips } from '@/components/FilterChips';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { leaderboardService } from '@/services/leaderboardService';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

const tabs = ['Daily', 'Weekly', 'All-time'];

export default function LeaderboardScreen() {
  const [tab, setTab] = useState('Daily');
  const users = useSocialStore((s) => s.users);
  const me = useCurrentUser();
  const rewardCoins = useSocialStore((s) => s.rewardCoins);
  const board = useMemo(() => leaderboardService.build(users), [users]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Leaderboard</Text>
      <FilterChips items={tabs} selected={tab} onSelect={setTab} />
      <FlatList
        data={board}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const user = users.find((u) => u.id === item.userId);
          if (!user) return null;
          return (
            <AppCard>
              <View style={styles.row}>
                <Text style={styles.rank}>#{item.rank}</Text>
                <Avatar uri={user.avatar} />
                <View><Text style={styles.name}>{user.name}</Text><Text style={styles.meta}>{item.coins} coins • {item.engagementPoints} pts</Text>{me?.id === user.id && item.rank <= 3 ? <AppButton label="Claim rank reward" onPress={() => rewardCoins(me.id, 15, 'Leaderboard bonus')} variant="ghost" /> : null}</View>
              </View>
            </AppCard>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, list: { gap: spacing.sm, paddingTop: spacing.sm }, row: { flexDirection: 'row', gap: 10, alignItems: 'center' }, rank: { color: colors.secondary, fontSize: 20, fontWeight: '800', width: 42 }, name: { color: colors.text, fontWeight: '700' }, meta: { color: colors.textMuted } });
