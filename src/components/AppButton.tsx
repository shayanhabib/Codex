import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export const AppButton = ({ label, onPress, variant = 'primary', disabled }: Props) => (
  <Pressable
    style={[styles.base, variant === 'secondary' && styles.secondary, variant === 'ghost' && styles.ghost, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 12, alignItems: 'center' },
  secondary: { backgroundColor: colors.surface },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  disabled: { opacity: 0.5 },
  text: { color: colors.text, fontWeight: '700', letterSpacing: 0.2 },
  ghostText: { color: colors.textMuted },
});
