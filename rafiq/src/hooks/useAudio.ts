import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export interface AudioTrack {
  id: string;
  title: string;
  uri: string | number;
}

export function useAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const positionInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const load = async (uri: string | number) => {
    setLoading(true);
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error loading audio:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
    }
  };

  const play = async () => {
    if (sound) {
      await sound.playAsync();
      startPositionTracking();
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      stopPositionTracking();
    }
  };

  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      setIsPlaying(false);
      setPosition(0);
      stopPositionTracking();
    }
  };

  const seek = async (positionMs: number) => {
    if (sound) {
      await sound.setPositionAsync(positionMs);
    }
  };

  const startPositionTracking = () => {
    if (positionInterval.current) {
      clearInterval(positionInterval.current);
    }
    positionInterval.current = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }
    }, 100);
  };

  const stopPositionTracking = () => {
    if (positionInterval.current) {
      clearInterval(positionInterval.current);
      positionInterval.current = null;
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  return {
    isPlaying,
    position,
    duration,
    loading,
    load,
    play,
    pause,
    stop,
    seek,
    formatTime,
  };
}