import { FlatList, StyleSheet, Text } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { WalletCard } from '@/components/WalletCard';
import { COIN_PACKS } from '@/constants/economy';
import { colors, spacing } from '@/constants/theme';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { useWalletStore } from '@/store/walletStore';
import { monetizationService } from '@/services/monetizationService';

export default function WalletScreen() {
  const me = useCurrentUser();
  const walletTx = useSocialStore((s) => s.walletTx.filter((tx) => tx.userId === me?.id));
  const rewardCoins = useSocialStore((s) => s.rewardCoins);
  const currentStreak = useWalletStore((s) => s.currentStreak);
  const extraGameAttempts = useWalletStore((s) => s.extraGameAttempts);
  const gameAttemptsRemaining = useWalletStore((s) => s.gameAttemptsRemaining);

  if (!me) return null;

  return (
    <ScreenContainer>
      <WalletCard coins={me.coinBalance} />
      <AppCard><Text style={styles.meta}>Streak: {currentStreak} days • Free game attempts: {gameAttemptsRemaining} • Extra attempts: {extraGameAttempts}</Text></AppCard>
      <Text style={styles.section}>Coin Packs</Text>
      {COIN_PACKS.map((p) => (
        <AppCard key={p.id}>
          <Text style={styles.title}>{p.coins} coins</Text>
          <Text style={styles.meta}>{p.price}</Text>
          <AppButton label="Buy (Mock)" onPress={async () => {
            const checkout = await monetizationService.purchaseCoinPack(p.id);
            if (checkout.success) rewardCoins(me.id, p.coins, `Coin pack ${p.coins}`);
          }} />
        </AppCard>
      ))}
      <Text style={styles.section}>History</Text>
      <FlatList
        data={walletTx}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <AppCard><Text style={styles.title}>{item.amount > 0 ? '+' : ''}{item.amount} coins</Text><Text style={styles.meta}>{item.source}</Text></AppCard>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ section: { color: colors.text, fontWeight: '800', marginTop: spacing.md }, list: { gap: spacing.sm, paddingVertical: spacing.sm, paddingBottom: 60 }, title: { color: colors.text }, meta: { color: colors.textMuted } });
