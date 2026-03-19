import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export const SearchBar = ({ value, onChangeText }: { value: string; onChangeText: (v: string) => void }) => (
  <View style={styles.wrap}>
    <Ionicons name="search" color={colors.textMuted} size={18} />
    <TextInput value={value} onChangeText={onChangeText} placeholder="Search creators or vibes" placeholderTextColor={colors.textMuted} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({ wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: 12 }, input: { color: colors.text, flex: 1, height: 44 } });
