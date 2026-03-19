import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors, radius } from '@/constants/theme';

export const AppInput = (props: TextInputProps) => (
  <TextInput
    placeholderTextColor={colors.textMuted}
    style={[styles.input, props.multiline && styles.multiline]}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    height: 48,
  },
  multiline: { height: 100, textAlignVertical: 'top', paddingTop: 12 },
});
