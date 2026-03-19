import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppInput } from '@/components/AppInput';
import { AppButton } from '@/components/AppButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSocialStore } from '@/store/socialStore';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/constants/theme';

export default function EditProfileScreen() {
  const me = useCurrentUser();
  const updateUser = useSocialStore((s) => s.updateUser);
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState(me?.name ?? '');
  const [username, setUsername] = useState(me?.username ?? '');
  const [bio, setBio] = useState(me?.bio ?? '');

  if (!me) return null;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Edit Profile</Text>
      <AppInput value={name} onChangeText={setName} placeholder="Name" />
      <AppInput value={username} onChangeText={setUsername} placeholder="Username" />
      <AppInput value={bio} onChangeText={setBio} placeholder="Bio" multiline />
      <AppButton
        label="Save"
        onPress={() => {
          updateUser(me.id, { name, username, bio });
          setUser({ ...me, name, username, bio });
          router.back();
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: spacing.md } });
