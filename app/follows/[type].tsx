import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

export default function FollowListScreen() {
  const { type } = useLocalSearchParams<{ type: 'followers' | 'following' }>();
  const me = useCurrentUser();
  const users = useSocialStore((s) => s.users);
  const followUser = useSocialStore((s) => s.followUser);

  if (!me) return null;

  const ids = type === 'followers' ? me.followers : me.following;
  const list = users.filter((u) => ids.includes(u.id));

  return (
    <ScreenContainer>
      <Text style={styles.title}>{type}</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Avatar uri={item.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <AppButton label={item.followers.includes(me.id) ? 'Unfollow' : 'Follow'} onPress={() => followUser(item.id, me.id)} variant="ghost" />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 22, fontWeight: '800' }, list: { gap: spacing.sm, marginTop: spacing.md }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, name: { color: colors.text, flex: 1, marginLeft: 10 } });
