import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { coinEngineService } from '@/services/coinEngineService';
import { useSocialStore } from '@/store/socialStore';
import { useWalletStore } from '@/store/walletStore';
import { colors } from '@/constants/theme';

export default function DailySpinScreen() {
  const me = useCurrentUser();
  const canSpinToday = useSocialStore((s) => s.canSpinToday);
  const recordSpin = useSocialStore((s) => s.recordSpin);
  const spinTickets = useWalletStore((s) => s.spinTickets);
  const consumeSpinTicket = useWalletStore((s) => s.consumeSpinTicket);

  if (!me) return null;

  const spin = () => {
    if (!canSpinToday()) {
      const usedTicket = consumeSpinTicket();
      if (!usedTicket) return Alert.alert('Done for today', 'No free spin left. Buy spin ticket in Shop.');
    }
    const reward = coinEngineService.dailySpinReward();
    recordSpin(me.id, reward);
    Alert.alert('Spin reward!', `You won ${reward} coins.`);
  };

  return (
    <ScreenContainer>
      <View style={styles.wheel}><Text style={styles.wheelText}>🎯</Text></View>
      <Text style={styles.title}>Daily Spin</Text>
      <Text style={styles.meta}>One free spin daily. Win coins, themes, badges, and entries. Tickets: {spinTickets}</Text>
      <AppButton label="Spin now" onPress={spin} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ wheel: { width: 220, height: 220, borderRadius: 110, backgroundColor: colors.surface, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20 }, wheelText: { fontSize: 70 }, title: { color: colors.text, fontSize: 26, fontWeight: '800', textAlign: 'center' }, meta: { color: colors.textMuted, textAlign: 'center', marginBottom: 20 } });
