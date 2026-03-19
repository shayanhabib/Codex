import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from './AppCard';
import { NotificationItem } from '@/models/types';
import { colors } from '@/constants/theme';
import { formatRelativeTime } from '@/utils/formatters';

export const NotificationItemCard = ({ item }: { item: NotificationItem }) => (
  <AppCard>
    <View style={styles.row}>
      <Text style={styles.content}>{item.content}</Text>
      {!item.read && <View style={styles.dot} />}
    </View>
    <Text style={styles.time}>{formatRelativeTime(item.createdAt)}</Text>
  </AppCard>
);

const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between' }, content: { color: colors.text, flex: 1 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }, time: { color: colors.textMuted } });
