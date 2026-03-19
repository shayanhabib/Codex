import { Link } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { VoicePostCard } from '@/components/VoicePostCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppButton } from '@/components/AppButton';
import { CoinPill } from '@/components/CoinPill';
import { useSocialStore } from '@/store/socialStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { colors, spacing } from '@/constants/theme';
import { COIN_RULES } from '@/constants/economy';

export default function HomeScreen() {
  const posts = useSocialStore((s) => s.posts);
  const users = useSocialStore((s) => s.users);
  const likePost = useSocialStore((s) => s.likePost);
  const followUser = useSocialStore((s) => s.followUser);
  const claimDailyLogin = useSocialStore((s) => s.claimDailyLogin);
  const me = useCurrentUser();

  useEffect(() => {
    if (me) claimDailyLogin(me.id, COIN_RULES.DAILY_LOGIN);
  }, [me, claimDailyLogin]);

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Loop Feed</Text>
        <View style={styles.actions}>
          <CoinPill value={me?.coinBalance ?? 0} />
          <Link href="/wallet" asChild><AppButton label="Wallet" onPress={() => {}} variant="ghost" /></Link>
        </View>
      </View>
      <View style={styles.quickLinks}>
        <Link href="/daily-spin" asChild><AppButton label="Lucky Spin" onPress={() => {}} variant="secondary" /></Link>
        <Link href="/daily-rewards" asChild><AppButton label="Daily Rewards" onPress={() => {}} variant="secondary" /></Link>
        <Link href="/missions" asChild><AppButton label="Missions" onPress={() => {}} variant="secondary" /></Link>
        <Link href="/notifications" asChild><AppButton label="Alerts" onPress={() => {}} variant="secondary" /></Link>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const user = users.find((u) => u.id === item.userId);
          const canFollow = !!me && item.userId !== me.id;
          return (
            <VoicePostCard
              post={item}
              user={user}
              isLiked={!!me && item.likes.includes(me.id)}
              onLike={() => me && likePost(item.id, me.id)}
              onFollow={() => me && followUser(item.userId, me.id)}
              canFollow={canFollow}
            />
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  quickLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  list: { gap: spacing.md, paddingVertical: spacing.md, paddingBottom: 120 },
});
