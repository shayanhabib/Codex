import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export const CoinPill = ({ value }: { value: number }) => (
  <View style={styles.pill}>
    <Ionicons name="logo-bitcoin" size={14} color="#FFD54A" />
    <Text style={styles.text}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6 },
  text: { color: colors.text, fontWeight: '700' },
});
