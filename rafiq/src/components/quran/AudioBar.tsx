import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AudioPlayer } from '../shared/AudioPlayer';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, Fonts } from '../../constants/typography';

interface AudioBarProps {
  visible: boolean;
  surahName: string;
  surahEnglishName: string;
  audioUri: string;
  onClose: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  visible,
  surahName,
  surahEnglishName,
  audioUri,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.arabicTitle}>{surahName}</Text>
          <Text style={styles.englishTitle}>{surahEnglishName}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      <AudioPlayer uri={audioUri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.radiusLg,
    borderTopRightRadius: Spacing.radiusLg,
    padding: Spacing.s4,
    paddingTop: Spacing.s3,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s2,
  },
  info: {
    flex: 1,
  },
  arabicTitle: {
    fontSize: FontSizes.headingSm,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.textArabic,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  englishTitle: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 12,
    color: Colors.gray600,
  },
});