import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMissionsStore } from '@/store/missionsStore';
import { useSocialStore } from '@/store/socialStore';
import { colors, spacing } from '@/constants/theme';

export default function MissionsScreen() {
  const me = useCurrentUser();
  const missions = useMissionsStore((s) => s.missions);
  const claimMission = useMissionsStore((s) => s.claimMission);
  const rewardCoins = useSocialStore((s) => s.rewardCoins);

  if (!me) return null;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Daily Missions</Text>
      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.meta}>{item.progress}/{item.goal} • Reward +{item.rewardCoins}</Text>
            <AppButton
              label={item.claimed ? 'Claimed' : item.completed ? 'Claim' : 'In progress'}
              disabled={!item.completed || item.claimed}
              onPress={() => {
                const mission = claimMission(item.id);
                if (!mission) return Alert.alert('Not ready', 'Complete mission first.');
                rewardCoins(me.id, mission.rewardCoins, `Mission: ${mission.title}`);
              }}
            />
          </AppCard>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, item: { color: colors.text, fontWeight: '700' }, meta: { color: colors.textMuted }, list: { gap: spacing.sm, paddingVertical: spacing.md } });
