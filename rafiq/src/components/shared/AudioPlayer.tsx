import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes } from '../../constants/typography';

interface AudioPlayerProps {
  uri: string;
  title?: string;
  style?: ViewStyle;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  uri,
  title,
  style,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(sound);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  useEffect(() => {
    loadSound();
  }, [uri]);

  const playPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={playPause} style={styles.playButton}>
        <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.time}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s3,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.green600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: Colors.white,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.s3,
  },
  title: {
    fontSize: FontSizes.bodyMd,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: Spacing.s1,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
    marginBottom: Spacing.s1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.green600,
    borderRadius: 2,
  },
  time: {
    fontSize: FontSizes.micro,
    color: Colors.gray600,
  },
});