import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from './AppCard';
import { CoinPill } from './CoinPill';
import { colors } from '@/constants/theme';

export const WalletCard = ({ coins }: { coins: number }) => (
  <AppCard>
    <Text style={styles.label}>Wallet</Text>
    <CoinPill value={coins} />
    <Text style={styles.sub}>Earn from posts, likes, games, challenges, and spins.</Text>
  </AppCard>
);

const styles = StyleSheet.create({ label: { color: colors.text, fontSize: 18, fontWeight: '800' }, sub: { color: colors.textMuted } });
