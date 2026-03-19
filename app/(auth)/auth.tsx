import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing } from '@/constants/theme';
import { mockAuthService } from '@/services/mockAuthService';
import { useAuthStore } from '@/store/authStore';

export default function AuthScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('lenatones');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const runAuth = async (mode: 'signin' | 'create' | 'guest') => {
    setLoading(true);
    const user =
      mode === 'signin' ? await mockAuthService.signIn(username) : mode === 'create' ? await mockAuthService.createAccount(name || 'New User', username) : await mockAuthService.guestLogin();
    setUser(user);
    setLoading(false);
    router.replace('/(tabs)/home');
  };

  return (
    <ScreenContainer>
      <View style={styles.head}><Text style={styles.title}>Welcome to LoopUp</Text></View>
      <View style={styles.form}>
        <AppInput placeholder="Name" value={name} onChangeText={setName} />
        <AppInput placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <AppButton label={loading ? 'Please wait...' : 'Sign In'} onPress={() => runAuth('signin')} disabled={loading} />
        <AppButton label="Create Account" onPress={() => runAuth('create')} variant="secondary" disabled={loading} />
        <AppButton label="Continue as Guest" onPress={() => runAuth('guest')} variant="ghost" disabled={loading} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ head: { paddingTop: spacing.xl }, title: { color: colors.text, fontSize: 28, fontWeight: '800' }, form: { marginTop: spacing.xl, gap: spacing.sm } });
