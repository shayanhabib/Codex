import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async setItem<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async getItem<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
