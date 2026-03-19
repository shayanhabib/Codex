import { Alert, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { referralService } from '@/services/referralService';
import { shareService } from '@/services/shareService';
import { rewardEngineService } from '@/services/rewardEngineService';
import { useSocialStore } from '@/store/socialStore';
import { colors } from '@/constants/theme';

export default function InviteFriendsScreen() {
  const me = useCurrentUser();
  const rewardCoins = useSocialStore((s) => s.rewardCoins);

  if (!me) return null;

  const code = referralService.buildInviteCode(me.id);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Invite Friends</Text>
      <AppCard>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.meta}>Share this code. Both of you receive bonus coins when they join (mock).</Text>
        <AppButton label="Share Invite" onPress={() => shareService.shareText(referralService.buildInviteMessage(code))} />
        <AppButton
          label="Simulate Successful Referral"
          variant="secondary"
          onPress={() => {
            const bonus = rewardEngineService.referralReward();
            rewardCoins(me.id, bonus, 'Referral bonus');
            Alert.alert('Referral credited', `+${bonus} coins`);
          }}
        />
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, code: { color: colors.secondary, fontSize: 18, fontWeight: '800' }, meta: { color: colors.textMuted } });
