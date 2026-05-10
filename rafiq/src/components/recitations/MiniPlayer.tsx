import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Fonts, FontSizes } from '../../constants/typography';

interface MiniPlayerProps {
  visible: boolean;
  surahName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  visible,
  surahName,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.surahName}>{surahName}</Text>
          <Text style={styles.status}>{isPlaying ? 'يتم التشغيل الآن' : 'متوقف'}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onTogglePlay} style={styles.controlButton}>
            <Text style={styles.controlIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.controlButton}>
            <Text style={styles.controlIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.green700,
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s3,
    paddingBottom: Spacing.s4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  surahName: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.white,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  status: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray100,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    gap: Spacing.s2,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 14,
    color: Colors.green700,
  },
});