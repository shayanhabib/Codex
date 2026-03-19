import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { monetizationService } from '@/services/monetizationService';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { colors, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const me = useCurrentUser();
  const posts = useSocialStore((s) => s.posts.filter((p) => p.userId === me?.id));
  const rewardCoins = useSocialStore((s) => s.rewardCoins);
  const planId = useSubscriptionStore((s) => s.planId);

  if (!me) return null;

  return (
    <ScreenContainer>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <ProfileHeader user={me} />
            <View style={styles.actions}>
              <Link href="/edit-profile" asChild><AppButton label="Edit" onPress={() => {}} variant="secondary" /></Link>
              <Link href="/settings" asChild><AppButton label="Settings" onPress={() => {}} variant="ghost" /></Link>
              <Link href="/shop" asChild><AppButton label="Shop" onPress={() => {}} variant="ghost" /></Link>
              <Link href="/achievements" asChild><AppButton label="Badges" onPress={() => {}} variant="ghost" /></Link>
              <Link href="/invite-friends" asChild><AppButton label="Invite" onPress={() => {}} variant="ghost" /></Link>
              <Link href="/upgrade" asChild><AppButton label="Premium" onPress={() => {}} /></Link>
            </View>
            <Text style={styles.meta}>{planId === 'pro' ? 'Premium Member ✨' : 'Free Member'}</Text>
            <AppButton
              label="Watch ad to earn 20 coins"
              variant="secondary"
              onPress={async () => {
                const result = await monetizationService.showRewardedAd();
                if (result.rewarded) rewardCoins(me.id, result.coins, 'Rewarded ad');
              }}
            />
          </View>
        }
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.meta}>{item.likes.length} likes • {item.comments.length} comments</Text>
          </AppCard>
        )}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ header: { gap: spacing.md }, actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, list: { gap: spacing.sm, paddingBottom: 100 }, caption: { color: colors.text }, meta: { color: colors.secondary, fontWeight: '700' } });
