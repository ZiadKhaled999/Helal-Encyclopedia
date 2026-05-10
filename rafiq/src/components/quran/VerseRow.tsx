import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArabicText } from '../shared/ArabicText';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Fonts, FontSizes } from '../../constants/typography';

interface VerseRowProps {
  verse: {
    id: number;
    ar: string;
    en: string;
  };
  showTranslation: boolean;
  onToggleTranslation?: () => void;
  onPlay?: () => void;
  isPlaying?: boolean;
}

export const VerseRow: React.FC<VerseRowProps> = ({
  verse,
  showTranslation,
  onToggleTranslation,
  onPlay,
  isPlaying,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPlay} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
        <View style={styles.verseBadge}>
          <Text style={styles.verseNumber}>{verse.id}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <ArabicText variant="quran" style={styles.arabicText}>
          {verse.ar}
        </ArabicText>
        {showTranslation && (
          <Text style={styles.translation}>{verse.en}</Text>
        )}
        <TouchableOpacity onPress={onToggleTranslation} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.s4,
    paddingHorizontal: Spacing.s4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s2,
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.green100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 10,
    color: Colors.green600,
  },
  verseBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumber: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyMedium,
    color: Colors.white,
  },
  content: {
    alignItems: 'flex-end',
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 32,
    color: Colors.textArabic,
    marginBottom: Spacing.s2,
  },
  translation: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    textAlign: 'left',
    writingDirection: 'ltr',
    marginBottom: Spacing.s2,
    lineHeight: 22,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.gray100,
    borderRadius: 4,
  },
  toggleText: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
  },
});