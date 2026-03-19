import { FlatList, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { useAchievementsStore } from '@/store/achievementsStore';
import { colors, spacing } from '@/constants/theme';

export default function AchievementsScreen() {
  const badges = useAchievementsStore((s) => s.badges);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.item}>{item.icon} {item.title}</Text>
            <Text style={styles.meta}>{item.description}</Text>
            <Text style={[styles.state, item.unlocked && styles.ok]}>{item.unlocked ? 'Unlocked' : 'Locked'}</Text>
          </AppCard>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, item: { color: colors.text, fontWeight: '700' }, meta: { color: colors.textMuted }, state: { color: '#F87171' }, ok: { color: '#4ADE80' }, list: { gap: spacing.sm, paddingVertical: spacing.md } });
