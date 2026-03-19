import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/theme';

export default function SplashRoute() {
  const hasOnboarded = useAuthStore((s) => s.hasOnboarded);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!hasOnboarded) router.replace('/(auth)/onboarding');
      else if (!user) router.replace('/(auth)/auth');
      else router.replace('/(tabs)/home');
    }, 1000);
    return () => clearTimeout(id);
  }, [hasOnboarded, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LoopUp</Text>
      <Text style={styles.tag}>Your voice. Your vibe.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  logo: { color: colors.text, fontSize: 40, fontWeight: '800' },
  tag: { color: colors.textMuted, marginTop: 8 },
});
