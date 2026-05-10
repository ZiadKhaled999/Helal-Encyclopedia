import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Audio } from 'expo-av';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { MiniPlayer } from '../../src/components/recitations/MiniPlayer';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes, Fonts } from '../../src/constants/typography';
import recitersData from '../../src/data/reciters.json';
import quranData from '../../src/data/quran.json';

interface Reciter {
  id: number;
  name: string;
  Server: string;
  rewaya: string;
  letter: string;
  count: string;
  suras: string;
}

interface Surah {
  Name: string;
  English_Name: string;
  Number: number;
  Number_Verses: number;
}

export default function ReciterSurahsScreen() {
  const { reciterId } = useLocalSearchParams<{ reciterId: string }>();
  const [reciter, setReciter] = useState<Reciter | null>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingSurahId, setPlayingSurahId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const foundReciter = (recitersData as Reciter[]).find(
      (r) => r.id === parseInt(reciterId || '0')
    );
    setReciter(foundReciter || null);

    if (foundReciter) {
      const suraNumbers = foundReciter.suras.split(',').map(Number);
      const reciterSurahs = (quranData as Surah[]).filter((s) =>
        suraNumbers.includes(s.Number)
      );
      setSurahs(reciterSurahs);
    }
  }, [reciterId]);

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const getAudioUrl = (surahNumber: number) => {
    if (!reciter) return '';
    const paddedNumber = surahNumber.toString().padStart(3, '0');
    return `${reciter.Server}/${paddedNumber}.mp3`;
  };

  const playSurah = async (surahId: number) => {
    const surah = surahs.find((s) => s.Number === surahId);
    if (!surah) return;

    const audioUrl = getAudioUrl(surah.Number);

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlayingSurahId(surahId);
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
  };

  const togglePlay = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    setSound(null);
    setPlayingSurahId(null);
    setIsPlaying(false);
  };

  const renderSurah = ({ item }: { item: Surah }) => {
    const isCurrentPlaying = playingSurahId === item.Number;
    return (
      <View style={styles.surahCard}>
        <View style={styles.surahInfo}>
          <ArabicText variant="ui" style={styles.surahName}>
            {item.Name}
          </ArabicText>
          <Text style={styles.surahMeta}>
            {item.English_Name} • {item.Number_Verses} آية
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.playButton, isCurrentPlaying && styles.playButtonActive]}
          onPress={() => playSurah(item.Number)}
        >
          <Text style={styles.playButtonText}>
            {isCurrentPlaying && isPlaying ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!reciter) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="القارئ" />}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.green600} />
        </View>
      </ScreenWrapper>
    );
  }

  const currentSurah = surahs.find((s) => s.Number === playingSurahId);

  return (
    <View style={styles.container}>
      <ScreenWrapper headerComponent={<BackHeader title={`سور ${reciter.name}`} />}>
        <View style={styles.content}>
          <View style={styles.reciterHeader}>
            <ArabicText variant="ui" style={styles.reciterName}>
              {reciter.name}
            </ArabicText>
            <Text style={styles.rewaya}>{reciter.rewaya}</Text>
            <Text style={styles.surahCount}>{surahs.length} سورة</Text>
          </View>
          <FlashList
            data={surahs}
            keyExtractor={(item) => item.Number.toString()}
            renderItem={renderSurah}
contentContainerStyle={styles.listContent}
           showsVerticalScrollIndicator={false}
         />
        </View>
      </ScreenWrapper>
      <MiniPlayer
        visible={playingSurahId !== null}
        surahName={currentSurah?.Name || ''}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onClose={stopPlayback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reciterHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.s4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    marginBottom: Spacing.s3,
  },
  reciterName: {
    fontSize: FontSizes.headingSm,
    color: Colors.gray900,
    fontWeight: '600',
  },
  rewaya: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    marginTop: Spacing.s1,
  },
  surahCount: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray400,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 100,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s4,
    marginBottom: Spacing.s3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  surahInfo: {
    flex: 1,
    marginRight: Spacing.s3,
  },
  surahName: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    fontWeight: '500',
    marginBottom: Spacing.s1,
  },
  surahMeta: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.green600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: Colors.gray600,
  },
  playButtonText: {
    fontSize: 18,
    color: Colors.white,
  },
});