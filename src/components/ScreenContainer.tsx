import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/theme';

interface Props extends PropsWithChildren {
  scroll?: boolean;
  style?: ViewStyle;
}

export const ScreenContainer = ({ children, scroll, style }: Props) => {
  const content = <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
  if (!scroll) return content;
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {content}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.md, paddingTop: spacing.md },
  scroll: { flex: 1, backgroundColor: colors.bg },
  content: { flexGrow: 1 },
});
