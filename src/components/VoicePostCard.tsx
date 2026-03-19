import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { AppCard } from './AppCard';
import { Avatar } from './Avatar';
import { AudioPlayerCard } from './AudioPlayerCard';
import { colors } from '@/constants/theme';
import { User, VoicePost } from '@/models/types';
import { formatRelativeTime } from '@/utils/formatters';

interface Props {
  post: VoicePost;
  user?: User;
  isLiked: boolean;
  onLike: () => void;
  onFollow?: () => void;
  canFollow?: boolean;
}

export const VoicePostCard = ({ post, user, isLiked, onLike, onFollow, canFollow }: Props) => (
  <AppCard>
    <View style={styles.header}>
      <View style={styles.userRow}>
        <Avatar uri={user?.avatar ?? 'https://i.pravatar.cc/100'} />
        <View>
          <Text style={styles.name}>{user?.name ?? 'Unknown'} {user?.isPro ? '✨' : ''}</Text>
          <Text style={styles.user}>@{user?.username ?? 'user'} • {formatRelativeTime(post.createdAt)}</Text>
        </View>
      </View>
      {canFollow && onFollow ? <Pressable onPress={onFollow}><Text style={styles.follow}>Follow</Text></Pressable> : null}
    </View>

    <LinearGradient colors={(post.gradient as [string, string]) ?? ['#222', '#333']} style={styles.gradient}>
      <Text style={styles.caption}>{post.caption}</Text>
      <AudioPlayerCard uri={post.audioUri} durationMs={post.durationMs} />
    </LinearGradient>

    <View style={styles.actions}>
      <Pressable style={styles.action} onPress={onLike}><Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={18} color={isLiked ? colors.danger : colors.textMuted} /><Text style={styles.meta}>{post.likes.length}</Text></Pressable>
      <Link href={`/post/${post.id}`} asChild><Pressable style={styles.action}><Ionicons name="chatbubble-outline" size={18} color={colors.textMuted} /><Text style={styles.meta}>{post.comments.length}</Text></Pressable></Link>
    </View>
  </AppCard>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  name: { color: colors.text, fontWeight: '700' },
  user: { color: colors.textMuted, fontSize: 12 },
  follow: { color: colors.secondary, fontWeight: '700' },
  gradient: { borderRadius: 16, padding: 12, gap: 12 },
  caption: { color: colors.text, fontSize: 15 },
  actions: { flexDirection: 'row', gap: 20 },
  action: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  meta: { color: colors.textMuted },
});
