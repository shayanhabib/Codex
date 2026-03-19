import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing } from '@/constants/theme';

export default function GamesHubScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Games Hub</Text>
      <Text style={styles.subtitle}>Play, earn coins, and climb the leaderboard.</Text>
      <View style={styles.stack}>
        <Link href="/games/tap-rush" asChild><AppButton label="Tap Rush" onPress={() => {}} /></Link>
        <Link href="/games/memory-flip" asChild><AppButton label="Memory Flip" onPress={() => {}} variant="secondary" /></Link>
        <Link href="/missions" asChild><AppButton label="Daily Missions" onPress={() => {}} variant="ghost" /></Link>
        <Link href="/shop" asChild><AppButton label="Buy Extra Attempt" onPress={() => {}} variant="ghost" /></Link>
        <Link href="/leaderboard" asChild><AppButton label="Leaderboard" onPress={() => {}} variant="ghost" /></Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 26, fontWeight: '800' }, subtitle: { color: colors.textMuted, marginTop: 6 }, stack: { marginTop: spacing.lg, gap: spacing.sm } });
