import { StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppButton } from '@/components/AppButton';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/constants/theme';

export default function SettingsScreen() {
  const settings = useSettingsStore((s) => s.settings);
  const setSetting = useSettingsStore((s) => s.setSetting);
  const logout = useAuthStore((s) => s.logout);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}><Text style={styles.label}>Push notifications</Text><Switch value={settings.pushNotifications} onValueChange={(v) => setSetting('pushNotifications', v)} /></View>
      <View style={styles.row}><Text style={styles.label}>Dark theme</Text><Switch value={settings.themeMode === 'dark'} onValueChange={(v) => setSetting('themeMode', v ? 'dark' : 'light')} /></View>
      <View style={styles.row}><Text style={styles.label}>Private account</Text><Switch value={settings.privateAccount} onValueChange={(v) => setSetting('privateAccount', v)} /></View>
      <View style={styles.row}><Text style={styles.label}>Personalized ads</Text><Switch value={settings.adPersonalization} onValueChange={(v) => setSetting('adPersonalization', v)} /></View>
      <AppButton label="Wallet" onPress={() => router.push('/wallet')} variant="secondary" />
      <AppButton label="Daily Rewards" onPress={() => router.push('/daily-rewards')} variant="secondary" />
      <AppButton label="Missions" onPress={() => router.push('/missions')} variant="secondary" />
      <AppButton label="Achievements" onPress={() => router.push('/achievements')} variant="secondary" />
      <AppButton label="Invite Friends" onPress={() => router.push('/invite-friends')} variant="secondary" />
      <AppButton label="Leaderboard" onPress={() => router.push('/leaderboard')} variant="secondary" />
      <AppButton label="Upgrade to Pro" onPress={() => router.push('/upgrade')} />
      <AppButton label="Logout" onPress={() => { logout(); router.replace('/(auth)/auth'); }} variant="ghost" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: spacing.md }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }, label: { color: colors.text } });
