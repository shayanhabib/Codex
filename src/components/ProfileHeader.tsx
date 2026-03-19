import { StyleSheet, Text, View } from 'react-native';
import { User } from '@/models/types';
import { Avatar } from './Avatar';
import { StatPill } from './StatPill';
import { CoinPill } from './CoinPill';
import { colors } from '@/constants/theme';

export const ProfileHeader = ({ user }: { user: User }) => (
  <View style={styles.wrap}>
    <Avatar uri={user.avatar} size={72} />
    <Text style={styles.name}>{user.name} {user.isPro ? '✨' : ''}</Text>
    <Text style={styles.handle}>@{user.username}</Text>
    <Text style={styles.bio}>{user.bio}</Text>
    <CoinPill value={user.coinBalance} />
    <View style={styles.stats}>
      <StatPill label="Followers" value={user.followers.length} />
      <StatPill label="Following" value={user.following.length} />
    </View>
  </View>
);
const styles = StyleSheet.create({ wrap: { alignItems: 'center', gap: 8 }, name: { color: colors.text, fontSize: 20, fontWeight: '700' }, handle: { color: colors.textMuted }, bio: { color: colors.text, textAlign: 'center' }, stats: { flexDirection: 'row', gap: 10 } });
