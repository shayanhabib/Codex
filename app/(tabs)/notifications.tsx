import { FlatList, StyleSheet, Text } from 'react-native';
import { NotificationItemCard } from '@/components/NotificationItemCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

export default function NotificationsScreen() {
  const notifications = useSocialStore((s) => s.notifications);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NotificationItemCard item={item} />}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: '800' }, list: { gap: spacing.sm, paddingVertical: spacing.md } });
