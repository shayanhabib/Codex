import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);
const styles = StyleSheet.create({ container: { alignItems: 'center', gap: 6, paddingVertical: 28 }, title: { color: colors.text, fontWeight: '700' }, subtitle: { color: colors.textMuted } });
