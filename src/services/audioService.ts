import { Audio } from 'expo-av';

let activeRecording: Audio.Recording | null = null;

export const audioService = {
  async startRecording() {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await recording.startAsync();
    activeRecording = recording;
    return recording;
  },

  async stopRecording() {
    if (!activeRecording) return null;
    await activeRecording.stopAndUnloadAsync();
    const uri = activeRecording.getURI();
    activeRecording = null;
    return uri;
  },

  async loadAndPlay(uri: string) {
    const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
    return sound;
  },
};
