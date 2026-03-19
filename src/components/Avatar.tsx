import { Image, StyleSheet, View } from 'react-native';

interface Props { uri: string; size?: number }

export const Avatar = ({ uri, size = 42 }: Props) => (
  <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
    <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
  </View>
);

const styles = StyleSheet.create({ wrap: { overflow: 'hidden' } });
