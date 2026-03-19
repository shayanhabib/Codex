import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { coinEngineService } from '@/services/coinEngineService';
import { colors } from '@/constants/theme';
import { useMissionsStore } from '@/store/missionsStore';

const base = ['A', 'B', 'C', 'D'];

export default function MemoryFlipScreen() {
  const initialCards = useMemo(() => [...base, ...base].sort(() => Math.random() - 0.5).map((label, idx) => ({ id: `${idx}`, label, matched: false })), []);
  const [cards, setCards] = useState(initialCards);
  const [open, setOpen] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [startedAt, setStartedAt] = useState(Date.now());
  const me = useCurrentUser();
  const addGameScore = useSocialStore((s) => s.addGameScore);
  const incrementMission = useMissionsStore((s) => s.incrementMission);

  const onFlip = async (id: string) => {
    if (open.includes(id) || open.length === 2) return;
    await Haptics.selectionAsync();
    const nextOpen = [...open, id];
    setOpen(nextOpen);
    if (nextOpen.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextOpen.map((n) => cards.find((c) => c.id === n)!);
      if (a.label === b.label) {
        setCards((prev) => prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, matched: true } : c)));
        setOpen([]);
        const willComplete = cards.filter((c) => c.matched).length + 2 === cards.length;
        if (willComplete) {
          const secs = (Date.now() - startedAt) / 1000;
          const accuracy = base.length / Math.max(1, moves);
          const reward = coinEngineService.calcMemoryReward(secs, accuracy);
          if (me) { addGameScore(me.id, 'memory-flip', Math.floor(1000 / secs), reward, accuracy); incrementMission('m3', 1); }
          Alert.alert('Memory cleared!', `Moves: ${moves + 1}\nReward: ${reward} coins`);
        }
      } else {
        setTimeout(() => setOpen([]), 650);
      }
    }
  };

  const reset = () => {
    setCards([...base, ...base].sort(() => Math.random() - 0.5).map((label, idx) => ({ id: `${idx}`, label, matched: false })));
    setOpen([]);
    setMoves(0);
    setStartedAt(Date.now());
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Memory Flip</Text>
      <Text style={styles.meta}>Match pairs in fewer moves for better rewards.</Text>
      <View style={styles.grid}>
        {cards.map((card) => {
          const visible = card.matched || open.includes(card.id);
          return <Pressable key={card.id} onPress={() => onFlip(card.id)} style={[styles.card, card.matched && styles.done]}><Text style={styles.cardText}>{visible ? card.label : '?'}</Text></Pressable>;
        })}
      </View>
      <AppButton label="Replay" onPress={reset} variant="secondary" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 26, fontWeight: '800' }, meta: { color: colors.textMuted, marginBottom: 10 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, card: { width: '22%', aspectRatio: 1, borderRadius: 12, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, done: { backgroundColor: colors.primary }, cardText: { color: colors.text, fontSize: 20, fontWeight: '800' } });
