import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export const LoadingState = ({ text = 'Loading...' }: { text?: string }) => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.primary} />
    <Text style={styles.text}>{text}</Text>
  </View>
);
const styles = StyleSheet.create({ container: { alignItems: 'center', gap: 8, paddingVertical: 20 }, text: { color: colors.textMuted } });
