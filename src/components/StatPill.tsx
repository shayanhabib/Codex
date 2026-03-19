import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export const StatPill = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.pill}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);
const styles = StyleSheet.create({ pill: { alignItems: 'center', padding: 10, backgroundColor: colors.surface, borderRadius: radius.md, minWidth: 92 }, value: { color: colors.text, fontWeight: '800' }, label: { color: colors.textMuted, fontSize: 12 } });
