import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { AppCard } from '@/components/AppCard';
import { Avatar } from '@/components/Avatar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

const chips = ['All', 'Trending', 'Storytime', 'Chill', 'Motivation'];

export default function ExploreScreen() {
  const [q, setQ] = useState('');
  const [chip, setChip] = useState('All');
  const users = useSocialStore((s) => s.users);
  const posts = useSocialStore((s) => s.posts);

  const filteredUsers = useMemo(() => users.filter((u) => `${u.name} ${u.username}`.toLowerCase().includes(q.toLowerCase())), [q, users]);
  const trendingPosts = [...posts].sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Explore</Text>
      <SearchBar value={q} onChangeText={setQ} />
      <FilterChips items={chips} selected={chip} onSelect={setChip} />
      <Text style={styles.section}>Trending Creators</Text>
      <FlatList
        data={filteredUsers}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.rowList}
        renderItem={({ item }) => (
          <AppCard>
            <Avatar uri={item.avatar} size={50} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>@{item.username}</Text>
          </AppCard>
        )}
      />
      <Text style={styles.section}>Trending Posts</Text>
      <View style={styles.stack}>
        {trendingPosts.map((p) => (
          <AppCard key={p.id}><Text style={styles.name}>{p.caption}</Text><Text style={styles.meta}>{p.likes.length} likes</Text></AppCard>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: spacing.sm }, section: { color: colors.text, fontWeight: '700', marginTop: spacing.md }, rowList: { gap: spacing.sm, paddingVertical: spacing.sm }, name: { color: colors.text, fontWeight: '700' }, meta: { color: colors.textMuted }, stack: { gap: spacing.sm, marginTop: spacing.sm } });
