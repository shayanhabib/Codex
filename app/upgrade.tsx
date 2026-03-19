import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppCard } from '@/components/AppCard';
import { AppButton } from '@/components/AppButton';
import { plans } from '@/constants/plans';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { colors, spacing } from '@/constants/theme';
import { monetizationService } from '@/services/monetizationService';

export default function UpgradeScreen() {
  const planId = useSubscriptionStore((s) => s.planId);
  const setPlanId = useSubscriptionStore((s) => s.setPlanId);

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>LoopUp Premium</Text>
      <Text style={styles.sub}>Ad-free feed, double daily rewards, exclusive themes, premium badges.</Text>
      <View style={styles.stack}>
        {plans.map((plan) => (
          <AppCard key={plan.id}>
            <Text style={styles.plan}>{plan.title}</Text>
            <Text style={styles.price}>${plan.monthlyPrice}/mo</Text>
            {plan.features.map((f) => <Text key={f} style={styles.feature}>• {f}</Text>)}
            <AppButton label={planId === plan.id ? 'Current Plan' : `Switch to ${plan.title}`} onPress={async () => {
              if (plan.id === 'pro') {
                const result = await monetizationService.startPremiumCheckout();
                if (result.success) setPlanId('pro');
              } else {
                setPlanId('free');
              }
            }} disabled={planId === plan.id} />
          </AppCard>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 26, fontWeight: '800' }, sub: { color: colors.textMuted }, stack: { gap: spacing.md, marginTop: spacing.md }, plan: { color: colors.text, fontSize: 20, fontWeight: '700' }, price: { color: colors.secondary }, feature: { color: colors.textMuted } });
