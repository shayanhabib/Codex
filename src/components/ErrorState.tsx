import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export const ErrorState = ({ message }: { message: string }) => (
  <View style={styles.container}><Text style={styles.text}>{message}</Text></View>
);

const styles = StyleSheet.create({ container: { padding: 14, backgroundColor: '#2A1220', borderRadius: 12 }, text: { color: colors.danger } });
