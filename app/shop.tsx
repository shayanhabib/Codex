import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { useWalletStore } from '@/store/walletStore';
import { colors, spacing } from '@/constants/theme';

export default function ShopScreen() {
  const me = useCurrentUser();
  const shopItems = useSocialStore((s) => s.shopItems);
  const buyShopItem = useSocialStore((s) => s.buyShopItem);
  const purchaseExtraGameAttempt = useWalletStore((s) => s.purchaseExtraGameAttempt);
  const addSpinTicket = useWalletStore((s) => s.addSpinTicket);

  if (!me) return null;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Shop</Text>
      <FlatList
        data={shopItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.meta}>{item.cost} coins</Text>
            <AppButton label={item.owned && item.category !== 'game-life' && item.category !== 'spin' && item.category !== 'boost' ? 'Owned' : 'Buy'} onPress={() => {
              if (item.owned && item.category !== 'game-life' && item.category !== 'spin' && item.category !== 'boost') return;
              const ok = buyShopItem(me.id, item.id);
              if (!ok) return Alert.alert('Not enough coins', 'Play games or spin to earn more coins.');
              if (item.category === 'game-life') purchaseExtraGameAttempt(me.id);
              if (item.category === 'spin') addSpinTicket(1);
            }} disabled={item.owned && item.category !== 'game-life' && item.category !== 'spin' && item.category !== 'boost'} />
          </AppCard>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 25, fontWeight: '800' }, list: { gap: spacing.sm, paddingVertical: spacing.md }, name: { color: colors.text, fontWeight: '700' }, meta: { color: colors.textMuted } });
