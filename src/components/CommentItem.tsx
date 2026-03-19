import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';
import { Comment, User } from '@/models/types';
import { formatRelativeTime } from '@/utils/formatters';

export const CommentItem = ({ comment, user }: { comment: Comment; user?: User }) => (
  <View style={styles.row}>
    <Text style={styles.name}>{user?.username ?? 'user'}</Text>
    <Text style={styles.content}>{comment.content}</Text>
    <Text style={styles.time}>{formatRelativeTime(comment.createdAt)}</Text>
  </View>
);
const styles = StyleSheet.create({ row: { gap: 4 }, name: { color: colors.text, fontWeight: '700' }, content: { color: colors.textMuted }, time: { color: colors.textMuted, fontSize: 12 } });
