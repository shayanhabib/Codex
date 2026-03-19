import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { colors, radius } from '@/constants/theme';
import { formatDuration } from '@/utils/formatters';

export const AudioPlayerCard = ({ uri, durationMs }: { uri: string; durationMs: number }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => { sound?.unloadAsync(); }, [sound]);

  const toggle = async () => {
    if (!sound) {
      const { sound: created } = await Audio.Sound.createAsync({ uri });
      setSound(created);
      await created.playAsync();
      setPlaying(true);
      created.setOnPlaybackStatusUpdate((s) => {
        if ('didJustFinish' in s && s.didJustFinish) setPlaying(false);
      });
      return;
    }
    if (playing) {
      await sound.pauseAsync();
      setPlaying(false);
    } else {
      await sound.playAsync();
      setPlaying(true);
    }
  };

  return (
    <View style={styles.box}>
      <Pressable onPress={toggle}><Ionicons name={playing ? 'pause' : 'play'} size={22} color={colors.text} /></Pressable>
      <Text style={styles.time}>{formatDuration(durationMs)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.surfaceSoft, borderRadius: radius.md, padding: 10 },
  time: { color: colors.textMuted },
});
