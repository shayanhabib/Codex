import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppButton } from '@/components/AppButton';
import { colors, spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

const slides = [
  { title: 'Post your voice in seconds', subtitle: 'Share quick 30s statuses with expressive gradients.' },
  { title: 'Build your vibe community', subtitle: 'Follow creators, comment, and react in real-time.' },
  { title: 'Grow with Pro creator tools', subtitle: 'Unlock games, rewards, and boosted visibility.' },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const onNext = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else {
      completeOnboarding();
      router.replace('/(auth)/auth');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.wrap}>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.subtitle}>{slides[index].subtitle}</Text>
      </View>
      <View style={styles.footer}>
        <AppButton label={index === slides.length - 1 ? 'Get Started' : 'Next'} onPress={onNext} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', gap: spacing.md },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 16 },
  footer: { paddingBottom: spacing.lg },
});
