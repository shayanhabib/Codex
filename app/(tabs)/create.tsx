import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AudioPlayerCard } from '@/components/AudioPlayerCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, gradients, spacing } from '@/constants/theme';
import { audioService } from '@/services/audioService';
import { useSocialStore } from '@/store/socialStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMissionsStore } from '@/store/missionsStore';
import { useAchievementsStore } from '@/store/achievementsStore';

export default function CreateScreen() {
  const [caption, setCaption] = useState('');
  const [recording, setRecording] = useState(false);
  const [uri, setUri] = useState('');
  const [gradient, setGradient] = useState<[string, string]>(['#7A5CFF', '#38D8FF']);
  const [boosted, setBoosted] = useState(false);
  const createPost = useSocialStore((s) => s.createPost);
  const spendCoins = useSocialStore((s) => s.spendCoins);
  const me = useCurrentUser();
  const incrementMission = useMissionsStore((s) => s.incrementMission);
  const unlockBadge = useAchievementsStore((s) => s.unlockBadge);

  const toggleRecording = async () => {
    if (!recording) {
      setRecording(true);
      await audioService.startRecording();
    } else {
      const recordedUri = await audioService.stopRecording();
      setRecording(false);
      if (recordedUri) setUri(recordedUri);
    }
  };

  const publish = () => {
    if (!me || !uri) return Alert.alert('Record required', 'Please record a voice note first.');
    if (boosted) {
      const ok = spendCoins(me.id, 50, 'Boost post');
      if (!ok) return Alert.alert('Not enough coins', 'Boosting a post costs 50 coins.');
    }
    createPost({ userId: me.id, caption: caption || 'Untitled vibe', audioUri: uri, durationMs: 30000, gradient, boosted });
    incrementMission('m1', 1);
    unlockBadge('a1');
    setCaption('');
    setUri('');
    Alert.alert('Published', 'Your voice status is now live.');
  };

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>Create Vibe</Text>
      <AppButton label={recording ? 'Stop Recording' : 'Record (30s max)'} onPress={toggleRecording} />
      {uri ? <AudioPlayerCard uri={uri} durationMs={30000} /> : null}
      {uri ? <AppButton label="Delete Recording" onPress={() => setUri('')} variant="ghost" /> : null}
      <AppInput value={caption} onChangeText={setCaption} placeholder="Write a short caption" multiline />
      <Text style={styles.sub}>Background</Text>
      <View style={styles.row}>
        {gradients.map((g) => (
          <Pressable key={g.join('-')} onPress={() => setGradient([g[0], g[1]])} style={[styles.swatch, { backgroundColor: g[0] }]} />
        ))}
      </View>
      <AppButton label={boosted ? 'Boost enabled (50 coins)' : 'Enable Boost'} onPress={() => setBoosted((v) => !v)} variant="ghost" />
      <AppButton label="Publish" onPress={publish} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: '800' }, sub: { color: colors.text, fontWeight: '700' }, row: { flexDirection: 'row', gap: spacing.sm }, swatch: { width: 42, height: 42, borderRadius: 12 } });
