import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/ScreenContainer';
import { VoicePostCard } from '@/components/VoicePostCard';
import { AppInput } from '@/components/AppInput';
import { AppButton } from '@/components/AppButton';
import { CommentItem } from '@/components/CommentItem';
import { useSocialStore } from '@/store/socialStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { EmptyState } from '@/components/EmptyState';
import { shareService } from '@/services/shareService';
import { colors, spacing } from '@/constants/theme';
import { useMissionsStore } from '@/store/missionsStore';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [comment, setComment] = useState('');
  const me = useCurrentUser();
  const users = useSocialStore((s) => s.users);
  const post = useSocialStore((s) => s.posts.find((p) => p.id === id));
  const comments = useSocialStore((s) => s.comments.filter((c) => c.postId === id));
  const likePost = useSocialStore((s) => s.likePost);
  const addComment = useSocialStore((s) => s.addComment);
  const incrementMission = useMissionsStore((s) => s.incrementMission);

  if (!post) return <ScreenContainer><EmptyState title="Post not found" subtitle="This vibe may have been removed." /></ScreenContainer>;
  const owner = users.find((u) => u.id === post.userId);

  return (
    <ScreenContainer scroll>
      <VoicePostCard post={post} user={owner} isLiked={!!me && post.likes.includes(me.id)} onLike={() => me && likePost(post.id, me.id)} />
      <AppButton label="Share" onPress={() => shareService.sharePost(post.id)} variant="secondary" />
      <Text style={styles.heading}>Comments</Text>
      <View style={styles.commentBox}>
        <AppInput value={comment} onChangeText={setComment} placeholder="Add a comment" />
        <AppButton label="Post" onPress={() => { if (me && comment.trim()) { addComment(post.id, me.id, comment.trim()); incrementMission('m4', 1); setComment(''); } }} />
      </View>
      <View style={styles.list}>{comments.map((c) => <CommentItem key={c.id} comment={c} user={users.find((u) => u.id === c.userId)} />)}</View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ heading: { color: colors.text, fontWeight: '800', fontSize: 18 }, commentBox: { gap: spacing.sm }, list: { gap: spacing.md } });
