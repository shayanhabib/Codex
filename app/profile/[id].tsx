import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ProfileHeader } from '@/components/ProfileHeader';
import { AppCard } from '@/components/AppCard';
import { EmptyState } from '@/components/EmptyState';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useSocialStore((s) => s.users.find((u) => u.id === id));
  const posts = useSocialStore((s) => s.posts.filter((p) => p.userId === id));

  if (!user) return <ScreenContainer><EmptyState title="User not found" subtitle="Try exploring again." /></ScreenContainer>;

  return (
    <ScreenContainer>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileHeader user={user} />}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <AppCard><Text style={styles.caption}>{item.caption}</Text></AppCard>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ list: { gap: spacing.sm, paddingBottom: 60 }, caption: { color: colors.text } });
