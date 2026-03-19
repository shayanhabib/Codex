import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { coinEngineService } from '@/services/coinEngineService';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { useWalletStore } from '@/store/walletStore';
import { colors } from '@/constants/theme';
import { useMissionsStore } from '@/store/missionsStore';
import { useAchievementsStore } from '@/store/achievementsStore';

export default function TapRushScreen() {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [taps, setTaps] = useState(0);
  const me = useCurrentUser();
  const addGameScore = useSocialStore((s) => s.addGameScore);
  const consumeGameAttempt = useWalletStore((s) => s.consumeGameAttempt);
  const gameAttemptsRemaining = useWalletStore((s) => s.gameAttemptsRemaining);
  const extraGameAttempts = useWalletStore((s) => s.extraGameAttempts);
  const incrementMission = useMissionsStore((s) => s.incrementMission);
  const unlockBadge = useAchievementsStore((s) => s.unlockBadge);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      const reward = coinEngineService.calcTapRushReward(taps);
      if (me) { addGameScore(me.id, 'tap-rush', taps, reward); incrementMission('m3', 1); unlockBadge('a2'); }
      Alert.alert('Round complete', `Score: ${taps}\nCoins earned: ${reward}`);
      return;
    }
    const id = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [running, timeLeft, taps, me, addGameScore]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Tap Rush</Text>
      <Text style={styles.meta}>Time left: {timeLeft}s</Text>
      <Text style={styles.score}>Taps: {taps}</Text>
      <Text style={styles.meta}>Free attempts: {gameAttemptsRemaining} • Extra: {extraGameAttempts}</Text>
      <Pressable
        style={styles.tap}
        onPress={async () => {
          if (!running) return;
          setTaps((v) => v + 1);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Text style={styles.tapText}>{running ? 'Tap!' : 'Press Start'}</Text>
      </Pressable>
      <View style={styles.row}>
        <AppButton label="Start" onPress={() => {
          if (!consumeGameAttempt()) return Alert.alert('No attempts', 'Buy an extra attempt from Shop.');
          setRunning(true); setTimeLeft(10); setTaps(0);
        }} />
        <AppButton label="Replay" onPress={() => { setRunning(false); setTimeLeft(10); setTaps(0); }} variant="secondary" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 26, fontWeight: '800' }, meta: { color: colors.textMuted }, score: { color: colors.text, fontSize: 22, fontWeight: '700' }, tap: { marginTop: 20, backgroundColor: colors.primary, borderRadius: 140, width: 220, height: 220, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }, tapText: { color: colors.text, fontWeight: '800', fontSize: 22 }, row: { flexDirection: 'row', gap: 8, marginTop: 20 } });
