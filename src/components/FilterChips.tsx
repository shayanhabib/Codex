import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, radius } from '@/constants/theme';

export const FilterChips = ({ items, selected, onSelect }: { items: string[]; selected: string; onSelect: (v: string) => void }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrap}>
    {items.map((item) => (
      <Pressable key={item} style={[styles.chip, selected === item && styles.active]} onPress={() => onSelect(item)}>
        <Text style={[styles.text, selected === item && styles.activeText]}>{item}</Text>
      </Pressable>
    ))}
  </ScrollView>
);
const styles = StyleSheet.create({ wrap: { gap: 8 }, chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.surface }, active: { backgroundColor: colors.primary }, text: { color: colors.textMuted }, activeText: { color: colors.text } });
